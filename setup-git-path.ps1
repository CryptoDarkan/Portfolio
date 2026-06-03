# Jednokratno: dodaj Git u PATH (User) i provjeri verziju
$gitBin = "C:\Program Files\Git\bin"
$gitCmd = "C:\Program Files\Git\cmd"

if (-not (Test-Path "$gitBin\git.exe")) {
  Write-Host "Git nije na ocekivanoj putanji. Reinstaliraj sa https://git-scm.com/download/win" -ForegroundColor Red
  exit 1
}

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$toAdd = @($gitBin, $gitCmd) | Where-Object { $userPath -notlike "*$_*" }

if ($toAdd.Count -gt 0) {
  $newPath = $userPath.TrimEnd(";") + ";" + ($toAdd -join ";")
  [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
  $env:Path = $env:Path + ";" + ($toAdd -join ";")
  Write-Host "Dodano u PATH: $($toAdd -join ', ')" -ForegroundColor Green
} else {
  Write-Host "Git je vec u PATH." -ForegroundColor Yellow
}

Write-Host ""
git --version
Write-Host ""
Write-Host "Zatvori SVE terminale, pa Cursor (File -> Exit), otvori opet." -ForegroundColor Cyan
Write-Host "Zatim u novom terminalu: git config --global user.name `"Tvoje Ime`""
