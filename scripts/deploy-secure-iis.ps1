param(
  [string]$ProjectRoot = 'C:\Users\harri\OneDrive\Bureau\Site drop',
  [string]$DeployPath = 'C:\inetpub\wwwroot\hproweb',
  [string]$SiteName = 'hproweb.fr',
  [string]$HostName = 'hproweb.fr',
  [string]$AppPool = 'hproweb.fr',
  [int]$ApiPort = 8787,
  [int]$NextPort = 3000,
  [switch]$UseHttps
)

$ErrorActionPreference = 'Stop'

function Ensure-Admin {
  $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = New-Object Security.Principal.WindowsPrincipal($identity)
  $isAdmin = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

  if ($isAdmin) {
    return
  }

  Write-Host 'Relance en mode administrateur...'
  $args = @(
    '-NoProfile',
    '-ExecutionPolicy', 'Bypass',
    '-File', "`"$PSCommandPath`"",
    '-ProjectRoot', "`"$ProjectRoot`"",
    '-DeployPath', "`"$DeployPath`"",
    '-SiteName', "`"$SiteName`"",
    '-HostName', "`"$HostName`"",
    '-AppPool', "`"$AppPool`"",
    '-ApiPort', "$ApiPort",
    '-NextPort', "$NextPort"
  )
  if ($UseHttps) {
    $args += '-UseHttps'
  }

  Start-Process -FilePath 'powershell.exe' -ArgumentList $args -Verb RunAs | Out-Null
  exit
}

function Update-Or-AddEnvValue {
  param(
    [string]$FilePath,
    [string]$Key,
    [string]$Value
  )

  if (-not (Test-Path $FilePath)) {
    "$Key=$Value" | Out-File -LiteralPath $FilePath -Encoding utf8
    return
  }

  $lines = Get-Content -LiteralPath $FilePath
  $prefix = "$Key="
  $index = -1
  for ($i = 0; $i -lt $lines.Count; $i += 1) {
    if ($lines[$i].StartsWith($prefix)) {
      $index = $i
      break
    }
  }

  if ($index -ge 0) {
    $lines[$index] = "$Key=$Value"
  } else {
    $lines += "$Key=$Value"
  }

  Set-Content -LiteralPath $FilePath -Value $lines -Encoding utf8
}

function Ensure-EnvKey {
  param(
    [string]$FilePath,
    [string]$Key,
    [string]$DefaultValue = ''
  )

  if (-not (Test-Path $FilePath)) {
    "$Key=$DefaultValue" | Out-File -LiteralPath $FilePath -Encoding utf8
    return
  }

  $lines = Get-Content -LiteralPath $FilePath
  $prefix = "$Key="
  foreach ($line in $lines) {
    if ($line.StartsWith($prefix)) {
      return
    }
  }

  $lines += "$Key=$DefaultValue"
  Set-Content -LiteralPath $FilePath -Value $lines -Encoding utf8
}

function Invoke-RobocopyMirror {
  param(
    [string]$Source,
    [string]$Destination
  )

  robocopy $Source $Destination /MIR /R:1 /W:1 /NFL /NDL /NJH /NJS /NP | Out-Null
  if ($LASTEXITCODE -gt 7) {
    throw "Echec robocopy (code $LASTEXITCODE)."
  }
}

function Test-InstalledProduct {
  param(
    [string]$NameLike
  )

  $uninstallPaths = @(
    'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*',
    'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*'
  )

  foreach ($path in $uninstallPaths) {
    $match = Get-ItemProperty -Path $path -ErrorAction SilentlyContinue | Where-Object {
      $_.DisplayName -like "*$NameLike*"
    } | Select-Object -First 1

    if ($match) {
      return $true
    }
  }

  return $false
}

function Ensure-MsiInstalled {
  param(
    [Parameter(Mandatory = $true)][string]$ProductNameLike,
    [Parameter(Mandatory = $true)][string]$DownloadUrl,
    [Parameter(Mandatory = $true)][string]$FileName
  )

  if (Test-InstalledProduct -NameLike $ProductNameLike) {
    Write-Host "- Deja installe: $ProductNameLike"
    return
  }

  Write-Host "- Installation: $ProductNameLike"
  $downloadsDir = Join-Path $env:TEMP 'site-drop-iis-deps'
  New-Item -Path $downloadsDir -ItemType Directory -Force | Out-Null
  $msiPath = Join-Path $downloadsDir $FileName

  if ([string]::IsNullOrWhiteSpace($DownloadUrl)) {
    throw "DownloadUrl vide pour $ProductNameLike"
  }

  Invoke-WebRequest -Uri $DownloadUrl -OutFile $msiPath -UseBasicParsing
  $install = Start-Process -FilePath 'msiexec.exe' -ArgumentList @('/i', "`"$msiPath`"", '/qn', '/norestart') -Wait -PassThru
  if ($install.ExitCode -ne 0 -and $install.ExitCode -ne 3010) {
    throw "Echec installation $ProductNameLike (ExitCode=$($install.ExitCode))."
  }
}

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

Ensure-Admin

$webRoot = Join-Path $ProjectRoot 'apps\web-next'
$webStandaloneRoot = Join-Path $webRoot '.next\standalone'
$webStaticRoot = Join-Path $webRoot '.next\static'
$webPublicRoot = Join-Path $webRoot 'public'
$apiRoot = Join-Path $ProjectRoot 'apps\api'
$apiEnvPath = Join-Path $apiRoot '.env'
$apiEnvExamplePath = Join-Path $apiRoot '.env.example'
$apiDistEntry = Join-Path $apiRoot 'dist\server.js'
$scheme = if ($UseHttps) { 'https' } else { 'http' }
$appUrl = "${scheme}://$HostName"
$cookieSecure = if ($UseHttps) { 'true' } else { 'false' }

Write-Host '0) Verify/install IIS prerequisites (URL Rewrite + ARR)...'
Ensure-MsiInstalled -ProductNameLike 'IIS URL Rewrite Module 2' -DownloadUrl 'https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_en-US.msi' -FileName 'rewrite_amd64_en-US.msi'
Ensure-MsiInstalled -ProductNameLike 'IIS Application Request Routing 3' -DownloadUrl 'https://download.microsoft.com/download/E/9/8/E9849D6A-020E-47E4-9FD0-A023E99B54EB/requestRouter_amd64.msi' -FileName 'requestRouter_amd64.msi'

Write-Host '1) Build API + Web...'
Push-Location $ProjectRoot
npm run build --workspace @sitedrop/api
npm run build --workspace @sitedrop/web-next
Pop-Location

Write-Host '2) Prepare API .env...'
if (-not (Test-Path $apiEnvPath)) {
  Copy-Item -LiteralPath $apiEnvExamplePath -Destination $apiEnvPath -Force
}

$secretBytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($secretBytes)
$secret = [Convert]::ToBase64String($secretBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_')

Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'PORT' -Value "$ApiPort"
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'APP_URL' -Value $appUrl
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'MONGO_URI' -Value 'mongodb://127.0.0.1:27017'
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'MONGO_DB_NAME' -Value 'sitedrop'
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'MONGO_USERS_COLLECTION' -Value 'users'
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'AUTH_DEMO_USERNAME' -Value 'coiffure1'
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'AUTH_DEMO_PASSWORD' -Value '1234'
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'AUTH_ADMIN_USERNAME' -Value 'admin'
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'AUTH_ADMIN_PASSWORD' -Value 'Hproweb@2026!'
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'AUTH_SESSION_SECRET' -Value $secret
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'AUTH_SESSION_TTL_SECONDS' -Value '28800'
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'AUTH_COOKIE_SECURE' -Value $cookieSecure
Update-Or-AddEnvValue -FilePath $apiEnvPath -Key 'CONTACT_TO_EMAIL' -Value 'contact@hproweb.fr'
Ensure-EnvKey -FilePath $apiEnvPath -Key 'SMTP_HOST'
Ensure-EnvKey -FilePath $apiEnvPath -Key 'SMTP_PORT' -DefaultValue '587'
Ensure-EnvKey -FilePath $apiEnvPath -Key 'SMTP_SECURE' -DefaultValue 'false'
Ensure-EnvKey -FilePath $apiEnvPath -Key 'SMTP_USER'
Ensure-EnvKey -FilePath $apiEnvPath -Key 'SMTP_PASS'
Ensure-EnvKey -FilePath $apiEnvPath -Key 'SMTP_FROM'

Write-Host '3) Publish web files to IIS folder...'
New-Item -Path $DeployPath -ItemType Directory -Force | Out-Null
Invoke-RobocopyMirror -Source $webStandaloneRoot -Destination $DeployPath
New-Item -Path (Join-Path $DeployPath 'apps\web-next\.next') -ItemType Directory -Force | Out-Null
Invoke-RobocopyMirror -Source $webStaticRoot -Destination (Join-Path $DeployPath 'apps\web-next\.next\static')
Invoke-RobocopyMirror -Source $webPublicRoot -Destination (Join-Path $DeployPath 'apps\web-next\public')
Copy-Item -LiteralPath (Join-Path $webRoot 'web.config') -Destination (Join-Path $DeployPath 'web.config') -Force

Write-Host '4) Configure IIS site + app pool...'
Import-Module WebAdministration

if (-not (Test-Path "IIS:\AppPools\$AppPool")) {
  New-WebAppPool -Name $AppPool | Out-Null
}
Set-ItemProperty "IIS:\AppPools\$AppPool" -Name managedRuntimeVersion -Value ''
Set-ItemProperty "IIS:\AppPools\$AppPool" -Name processModel.identityType -Value 4

if (-not (Get-Website -Name $SiteName -ErrorAction SilentlyContinue)) {
  New-Website -Name $SiteName -PhysicalPath $DeployPath -ApplicationPool $AppPool -Port 80 -HostHeader $HostName | Out-Null
} else {
  Set-ItemProperty "IIS:\Sites\$SiteName" -Name physicalPath -Value $DeployPath
  Set-ItemProperty "IIS:\Sites\$SiteName" -Name applicationPool -Value $AppPool
}

$httpBinding = Get-WebBinding -Name $SiteName -Protocol 'http' -ErrorAction SilentlyContinue | Where-Object {
  $_.bindingInformation -eq "*:80:$HostName"
}
if (-not $httpBinding) {
  New-WebBinding -Name $SiteName -Protocol 'http' -Port 80 -HostHeader $HostName | Out-Null
}

try {
  $appcmd = Join-Path $env:windir 'System32\inetsrv\appcmd.exe'
  & $appcmd set config -section:system.webServer/proxy /enabled:'True' /preserveHostHeader:'True' /commit:apphost | Out-Null
} catch {
  Write-Warning 'Impossible d activer ARR Proxy automatiquement. Verifie URL Rewrite + ARR dans IIS.'
}

iisreset | Out-Null
Start-Website -Name $SiteName

Write-Host '5) Install/start API scheduled task...'
$nodeCommand = Get-Command node -ErrorAction Stop
$nodeExe = $nodeCommand.Source
$taskName = 'SiteDropApi'
$logDir = Join-Path $apiRoot 'logs'
$outLog = Join-Path $logDir 'api-out.log'
$errLog = Join-Path $logDir 'api-err.log'
New-Item -Path $logDir -ItemType Directory -Force | Out-Null
$apiLauncherPath = Join-Path $DeployPath 'start-api.cmd'

Write-CmdLauncher -Path $apiLauncherPath -Lines @(
  '@echo off',
  "cd /d `"$apiRoot`"",
  "`"$nodeExe`" `"$apiDistEntry`" 1>>`"$outLog`" 2>>`"$errLog`""
)
Register-StartupTaskCmd -TaskName $taskName -LauncherPath $apiLauncherPath

Write-Host '6) Install/start Next.js scheduled task...'
$nextTaskName = 'SiteDropWebNext'
$nextLogDir = Join-Path $DeployPath 'logs'
$nextOutLog = Join-Path $nextLogDir 'web-out.log'
$nextErrLog = Join-Path $nextLogDir 'web-err.log'
New-Item -Path $nextLogDir -ItemType Directory -Force | Out-Null
$nextLauncherPath = Join-Path $DeployPath 'start-web-next.cmd'

$nextEntry = Join-Path $DeployPath 'apps\web-next\server.js'
Write-CmdLauncher -Path $nextLauncherPath -Lines @(
  '@echo off',
  "cd /d `"$DeployPath\apps\web-next`"",
  "set PORT=$NextPort",
  'set HOSTNAME=127.0.0.1',
  "`"$nodeExe`" `"$nextEntry`" 1>>`"$nextOutLog`" 2>>`"$nextErrLog`""
)
Register-StartupTaskCmd -TaskName $nextTaskName -LauncherPath $nextLauncherPath

Stop-ListeningProcess -Port $ApiPort
Stop-ListeningProcess -Port $NextPort
Start-Process -FilePath 'cmd.exe' -WindowStyle Hidden -ArgumentList "/c $apiLauncherPath"
Start-Process -FilePath 'cmd.exe' -WindowStyle Hidden -ArgumentList "/c $nextLauncherPath"

Write-Host '7) Check Next.js health...'
$frontendHealthUrl = "http://127.0.0.1:$NextPort/"
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
  Write-Warning "Frontend Next.js non joignable sur $frontendHealthUrl. Verifie logs: $nextOutLog et $nextErrLog"
}

Write-Host '8) Check API health...'
$healthUrl = "http://127.0.0.1:$ApiPort/api/health"
$isHealthy = $false
for ($i = 0; $i -lt 12; $i += 1) {
  Start-Sleep -Seconds 1
  try {
    $response = Invoke-RestMethod -Uri $healthUrl -Method Get -TimeoutSec 2
    if ($response.ok -eq $true) {
      $isHealthy = $true
      break
    }
  } catch {
  }
}

if (-not $isHealthy) {
  Write-Warning "API non joignable sur $healthUrl. Verifie logs: $outLog et $errLog"
}

Write-Host ''
Write-Host 'Deploiement termine.'
Write-Host "Site: $appUrl"
Write-Host "Login page: $appUrl/demo-site"
Write-Host "API health: $healthUrl"
