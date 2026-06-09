Add-Type -AssemblyName System.Drawing

function Save-Crop($srcPath, $destPath, $yRatio, $hRatio) {
  $img = [System.Drawing.Image]::FromFile($srcPath)
  $w = $img.Width
  $h = $img.Height

  $x = 0
  $y = [int]($h * $yRatio)
  $cropW = $w
  $cropH = [int]($h * $hRatio)

  if ($y + $cropH -gt $h) {
    $cropH = $h - $y
  }

  $rect = New-Object System.Drawing.Rectangle $x, $y, $cropW, $cropH
  $bmp = New-Object System.Drawing.Bitmap $cropW, $cropH
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.DrawImage($img, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $img.Dispose()

  $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()

  Write-Output "Saved $destPath (${cropW}x${cropH})"
}

$root = Join-Path $PSScriptRoot ".."

Save-Crop `
  (Join-Path $root "images\multibank-x.png") `
  (Join-Path $root "images\multibank-x-proof.png") `
  0.34 0.56

Save-Crop `
  (Join-Path $root "images\multibank-tge.png") `
  (Join-Path $root "images\multibank-tge-proof.png") `
  0.17 0.52
