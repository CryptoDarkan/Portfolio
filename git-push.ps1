# Push portfolio na GitHub — zamijeni $repoUrl prije pokretanja
param(
  [Parameter(Mandatory = $true)]
  [string]$RepoUrl
)

$git = "C:\Program Files\Git\bin\git.exe"
if (-not (Test-Path $git)) {
  Write-Host "git.exe nije pronaden." -ForegroundColor Red
  exit 1
}

Set-Location $PSScriptRoot

& $git add .
& $git status
$status = & $git status --porcelain
if ($status) {
  & $git commit -m "Initial portfolio site"
}
& $git branch -M main

$remotes = & $git remote 2>$null
if ($remotes -contains "origin") {
  & $git remote set-url origin $RepoUrl
} else {
  & $git remote add origin $RepoUrl
}

Write-Host "Pusham na GitHub..." -ForegroundColor Cyan
& $git push -u origin main
Write-Host "Gotovo. Otvori repo na GitHubu i provjeri fajlove." -ForegroundColor Green
