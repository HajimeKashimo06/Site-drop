$ErrorActionPreference = 'Stop'

$projectRoot = 'C:\Users\harri\OneDrive\Bureau\Site drop'
$webRoot = Join-Path $projectRoot 'apps\web'
$deployPath = 'C:\inetpub\wwwroot\hproweb'
$siteName = 'hproweb.fr'
$hostName = 'hproweb.fr'
$appPool = 'hproweb.fr'
$wacs = 'C:\Users\harri\OneDrive\Bureau\winacme\wacs.exe'
$email = 'contact@hproweb.fr'

Write-Host '1) Build Vite app...'
Push-Location $projectRoot
npm run build --workspace @sitedrop/web
Pop-Location

Write-Host '2) Publish files to IIS folder...'
New-Item -Path $deployPath -ItemType Directory -Force | Out-Null
robocopy (Join-Path $webRoot 'dist') $deployPath /MIR /NFL /NDL /NJH /NJS /NP | Out-Null

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

Start-Website -Name $siteName

Write-Host '4) Request and install Let''s Encrypt certificate with win-acme...'
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
