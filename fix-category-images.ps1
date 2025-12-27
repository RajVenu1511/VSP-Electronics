# Quick fix: Copy existing placeholder to missing category images
$categoriesPath = "src\assets\images\categories"
$placeholderSource = "src\assets\images\placeholder.jpg"

# Check if placeholder exists
if (-not (Test-Path $placeholderSource)) {
    Write-Host "Placeholder image not found at: $placeholderSource" -ForegroundColor Red
    exit
}

# List of missing category images
$missingImages = @(
    "3d-printers.jpg",
    "ac-motor.jpg",
    "accessories.jpg",
    "antenna.jpg",
    "audio-jack.jpg",
    "battery.jpg"
)

Write-Host "Creating placeholder category images..." -ForegroundColor Cyan
Write-Host ""

foreach ($image in $missingImages) {
    $destination = Join-Path $categoriesPath $image
    
    if (Test-Path $destination) {
        Write-Host "Already exists: $image" -ForegroundColor Green
    }
    else {
        Copy-Item -Path $placeholderSource -Destination $destination -Force
        Write-Host "Created: $image" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "All category images ready!" -ForegroundColor Green
Write-Host "Refresh your browser to see the images load" -ForegroundColor Yellow

