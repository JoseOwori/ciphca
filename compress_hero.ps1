Add-Type -AssemblyName System.Drawing

$inputPath  = "c:\Users\User\ciphca\assets\img\abstract\abstract-1.webp"
$outputPath = "c:\Users\User\ciphca\assets\img\abstract\abstract-1.webp"
$backupPath = "c:\Users\User\ciphca\assets\img\abstract\abstract-1-original-backup.webp"

# Check the original file size
$originalSize = (Get-Item $inputPath).Length
Write-Host "Original size: $([math]::Round($originalSize / 1KB, 1)) KB"

# Back up the original first
Copy-Item $inputPath $backupPath
Write-Host "Backup saved to: $backupPath"

# Load image
$img = [System.Drawing.Image]::FromFile($inputPath)

# Set up JPEG encoder with quality 80 (good balance of size vs quality)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality, [long]75
)

# Resize if wider than 1200px (hero images don't need to be larger)
$maxWidth = 1200
if ($img.Width -gt $maxWidth) {
    $ratio     = $maxWidth / $img.Width
    $newWidth  = $maxWidth
    $newHeight = [int]($img.Height * $ratio)
    $resized   = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
    $graphics  = [System.Drawing.Graphics]::FromImage($resized)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
    $graphics.Dispose()
    $img.Dispose()
    $img = $resized
}

# Save as JPEG with optimized quality
$tempJpgPath = "c:\Users\User\ciphca\assets\img\abstract\abstract-1-opt.jpg"
$img.Save($tempJpgPath, $jpegCodec, $encoderParams)
$img.Dispose()

$newSize = (Get-Item $tempJpgPath).Length
Write-Host "Compressed JPEG size: $([math]::Round($newSize / 1KB, 1)) KB"
Write-Host "Reduction: $([math]::Round((1 - $newSize/$originalSize) * 100, 1))%"
Write-Host ""
Write-Host "DONE. New file: $tempJpgPath"
Write-Host "NOTE: Update index.html to use 'abstract-1-opt.jpg' or rename it."
