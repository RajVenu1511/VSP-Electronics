# Download and replace external images with local versions
$categoriesPath = "src\assets\images\categories"

Write-Host "Downloading category images from agarwalelectronics.com..." -ForegroundColor Cyan
Write-Host ""

# Create directories if they don't exist
if (-not (Test-Path $categoriesPath)) {
    New-Item -ItemType Directory -Path $categoriesPath -Force | Out-Null
}

# Download the 3D Printers image
try {
    Write-Host "Downloading 3D-PRINTERS-100x100.jpg..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri "https://www.agarwalelectronics.com/wp-content/uploads/2024/03/3D-PRINTERS-100x100.jpg" `
        -OutFile "$categoriesPath\3d-printers-original.jpg" -UseBasicParsing
    Write-Host "Downloaded: 3d-printers-original.jpg" -ForegroundColor Green
}
catch {
    Write-Host "Failed to download 3D Printers image: $_" -ForegroundColor Red
}

# Download higher resolution 3D printer image
try {
    Write-Host "Downloading higher resolution 3D-PRINTERS.jpg..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri "https://www.agarwalelectronics.com/wp-content/uploads/2024/03/3D-PRINTERS.jpg" `
        -OutFile "$categoriesPath\3d-printers-hq.jpg" -UseBasicParsing
    Write-Host "Downloaded: 3d-printers-hq.jpg" -ForegroundColor Green
    
    # Use the high quality one as the main image
    Copy-Item "$categoriesPath\3d-printers-hq.jpg" "$categoriesPath\3d-printers.jpg" -Force
    Write-Host "Replaced 3d-printers.jpg with high quality version" -ForegroundColor Green
}
catch {
    Write-Host "Failed to download high-res image, using placeholder" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Download complete!" -ForegroundColor Green
Write-Host "Images saved to: $categoriesPath" -ForegroundColor Cyan
