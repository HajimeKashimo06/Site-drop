$ErrorActionPreference = 'Stop'

$projectRoot = 'C:\Users\harri\OneDrive\Bureau\Site drop'
$webRoot = Join-Path $projectRoot 'apps\web-next'
$webStandaloneRoot = Join-Path $webRoot '.next\standalone'
$webStaticRoot = Join-Path $webRoot '.next\static'
$webPublicRoot = Join-Path $webRoot 'public'
$deployPath = 'C:\inetpub\wwwroot\hproweb'
$siteName = 'hproweb.fr'
$hostName = 'hproweb.fr'
$appPool = 'hproweb.fr'
$wacs = 'C:\Users\harri\OneDrive\Bureau\winacme\wacs.exe'
$email = 'contact@hproweb.fr'
$nextPort = 3000

function Write-CmdLauncher {
  param(
    [string]$Path,
    [string[]]$Lines
  )

  $parent = Split-Path -Path $Path -Parent
  New-Item -Path $parent -ItemType Directory -Force | Out-Null
  Set-Content -LiteralPath $Path -Value $Lines -Encoding ascii
}

function Stop-ListeningProcess {
  param(
    [int]$Port
  )

  $connection = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
  if (-not $connection) {
    return
  }

  try {
    Stop-Process -Id $connection.OwningProcess -Force -ErrorAction Stop
    Start-Sleep -Seconds 1
  } catch {
  }
}

function Register-StartupTaskCmd {
  param(
    [string]$TaskName,
    [string]$LauncherPath
  )

  cmd /c "schtasks /Delete /TN $TaskName /F" | Out-Null
  cmd /c "schtasks /Create /TN $TaskName /SC ONSTART /RU SYSTEM /RL HIGHEST /TR `"cmd.exe /c $LauncherPath`" /F" | Out-Null
}

Write-Host '1) Build Next.js app...'
Push-Location $projectRoot
npm run build --workspace @sitedrop/web-next
Pop-Location

Write-Host '2) Publish standalone files to IIS folder...'
New-Item -Path $deployPath -ItemType Directory -Force | Out-Null
robocopy $webStandaloneRoot $deployPath /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
New-Item -Path (Join-Path $deployPath 'apps\web-next\.next') -ItemType Directory -Force | Out-Null
robocopy $webStaticRoot (Join-Path $deployPath 'apps\web-next\.next\static') /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
robocopy $webPublicRoot (Join-Path $deployPath 'apps\web-next\public') /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
Copy-Item (Join-Path $webRoot 'web.config') (Join-Path $deployPath 'web.config') -Force

Import-Module WebAdministration

Write-Host '3) Create/update IIS app pool and website...'
if (-not (Test-Path "IIS:\AppPools\$appPool")) {
  New-WebAppPool -Name $appPool | Out-Null
}
Set-ItemProperty "IIS:\AppPools\$appPool" -Name managedRuntimeVersion -Value ''
Set-ItemProperty "IIS:\AppPools\$appPool" -Name processModel.identityType -Value 4

if (-not (Get-Website -Name $siteName -ErrorAction SilentlyContinue)) {
  New-Website -Name $siteName -PhysicalPath $deployPath -ApplicationPool $appPool -Port 80 -HostHeader $hostName | Out-Null
} else {
  Set-ItemProperty "IIS:\Sites\$siteName" -Name physicalPath -Value $deployPath
  Set-ItemProperty "IIS:\Sites\$siteName" -Name applicationPool -Value $appPool
}

$httpBinding = Get-WebBinding -Name $siteName -Protocol 'http' -ErrorAction SilentlyContinue | Where-Object { $_.bindingInformation -eq "*:80:$hostName" }
if (-not $httpBinding) {
  New-WebBinding -Name $siteName -Protocol 'http' -Port 80 -HostHeader $hostName | Out-Null
}

try {
  $appcmd = Join-Path $env:windir 'System32\inetsrv\appcmd.exe'
  & $appcmd set config -section:system.webServer/proxy /enabled:'True' /preserveHostHeader:'True' /commit:apphost | Out-Null
} catch {
  Write-Warning 'Impossible d activer ARR Proxy automatiquement. Verifie URL Rewrite + ARR dans IIS.'
}

Start-Website -Name $siteName

Write-Host '4) Install/start Next.js standalone app...'
$nodeCommand = Get-Command node -ErrorAction Stop
$nodeExe = $nodeCommand.Source
$taskName = 'SiteDropWebNext'
$logDir = Join-Path $deployPath 'logs'
$outLog = Join-Path $logDir 'web-out.log'
$errLog = Join-Path $logDir 'web-err.log'
New-Item -Path $logDir -ItemType Directory -Force | Out-Null
$launcherPath = Join-Path $deployPath 'start-web-next.cmd'

$webEntry = Join-Path $deployPath 'apps\web-next\server.js'
Write-CmdLauncher -Path $launcherPath -Lines @(
  '@echo off',
  "cd /d `"$deployPath\apps\web-next`"",
  "set PORT=$nextPort",
  'set HOSTNAME=127.0.0.1',
  "`"$nodeExe`" `"$webEntry`" 1>>`"$outLog`" 2>>`"$errLog`""
)
Register-StartupTaskCmd -TaskName $taskName -LauncherPath $launcherPath
Stop-ListeningProcess -Port $nextPort
Start-Process -FilePath 'cmd.exe' -WindowStyle Hidden -ArgumentList "/c $launcherPath"

Write-Host '5) Check Next.js health...'
$frontendHealthUrl = "http://127.0.0.1:$nextPort/"
$frontendHealthy = $false
for ($i = 0; $i -lt 15; $i += 1) {
  Start-Sleep -Seconds 1
  try {
    $response = Invoke-WebRequest -Uri $frontendHealthUrl -UseBasicParsing -TimeoutSec 3
    if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
      $frontendHealthy = $true
      break
    }
  } catch {
  }
}

if (-not $frontendHealthy) {
  Write-Warning "Frontend Next.js non joignable sur $frontendHealthUrl. Verifie logs: $outLog et $errLog"
}

Write-Host '6) Request and install Let''s Encrypt certificate with win-acme...'
if (-not (Test-Path $wacs)) {
  throw "wacs.exe not found at $wacs"
}

$siteId = (Get-Website -Name $siteName).Id
& $wacs `
  --source iis `
  --siteid $siteId `
  --host $hostName `
  --validation filesystem `
  --validationmode http-01 `
  --store certificatestore `
  --installation iis `
  --installationsiteid $siteId `
  --emailaddress $email `
  --accepttos `
  --closeonfinish

Write-Host ''
Write-Host 'Done. Verify in browser:'
Write-Host 'https://hproweb.fr'
