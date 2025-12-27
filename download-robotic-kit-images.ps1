# Download Robotic DIY Kit Images from Agarwal Electronics

$productImagesDir = "src/assets/images/products"

# Create directory if it doesn't exist
if (-not (Test-Path $productImagesDir)) {
    New-Item -ItemType Directory -Path $productImagesDir -Force
}

Write-Host "`n=== Downloading Robotic DIY Kit Images ===" -ForegroundColor Cyan

# Product URLs to download
$products = @(
    @{name="14-in-1-educational-solar-robot"; url="https://www.agarwalelectronics.com/product/14-in-1-educational-diy-solar-transformers-robot-toy/"},
    @{name="2-wheel-round-kit"; url="https://www.agarwalelectronics.com/product/2-wheel-round-kit/"},
    @{name="4wd-mecannum-wheels-chassis"; url="https://www.agarwalelectronics.com/product/4wd-mecannum-wheels-normal-chassis-kit/"},
    @{name="aluminium-alloy-2wd-kit"; url="https://www.agarwalelectronics.com/product/aluminium-alloy-2wd-kit/"},
    @{name="diy-bluetooth-controlled-robot"; url="https://www.agarwalelectronics.com/product/diy-bluetooth-controlled-robot/"},
    @{name="diy-kit-air-car-rod3"; url="https://www.agarwalelectronics.com/product/diy-kit-air-car-rod3/"},
    @{name="diy-kit-wind-urja-rod5"; url="https://www.agarwalelectronics.com/product/diy-kit-wind-urja-rod5/"},
    @{name="diy-kit-16no-tank"; url="https://www.agarwalelectronics.com/product/diy-kit-16no-tank/"},
    @{name="diy-kit-scan-machine-rod4"; url="https://www.agarwalelectronics.com/product/diy-kit-scan-machine-rod4/"},
    @{name="diy-kit-standard-robot-rod11"; url="https://www.agarwalelectronics.com/product/diy-kit-standard-robot-kit-rod11/"},
    @{name="diy-line-follower-robot"; url="https://www.agarwalelectronics.com/product/diy-line-follower-robot/"},
    @{name="diy-obstacle-avoidance-robot"; url="https://www.agarwalelectronics.com/product/diy-obstacle-avoidance-robot/"},
    @{name="diy-rf-controlled-robot"; url="https://www.agarwalelectronics.com/product/diy-rf-controlled-robot/"},
    @{name="diy-wind-mill-rod68"; url="https://www.agarwalelectronics.com/product/diy-wind-mill-rod-68/"}
)

$downloaded = 0
$failed = 0

foreach ($product in $products) {
    Write-Host "`nProcessing: $($product.name)" -ForegroundColor Yellow
    
    try {
        # Fetch the product page
        $response = Invoke-WebRequest -Uri $product.url -UseBasicParsing
        $html = $response.Content
        
        # Extract image URL from meta og:image tag
        if ($html -match 'property="og:image"\s+content="([^"]+)"') {
            $imageUrl = $matches[1]
            Write-Host "  Found image: $imageUrl" -ForegroundColor White
            
            # Get file extension
            $extension = "jpg"
            if ($imageUrl -match '\.([a-z]{3,4})(\?|$)') {
                $extension = $matches[1]
            }
            
            $fileName = "$($product.name).$extension"
            $filePath = Join-Path $productImagesDir $fileName
            
            # Download image
            Write-Host "  Downloading..." -ForegroundColor White
            Invoke-WebRequest -Uri $imageUrl -OutFile $filePath
            Write-Host "  Saved: $fileName" -ForegroundColor Green
            $downloaded++
        }
        # Try alternate image extraction
        elseif ($html -match '<img[^>]+wp-post-image[^>]+src="([^"]+)"') {
            $imageUrl = $matches[1]
            Write-Host "  Found image: $imageUrl" -ForegroundColor White
            
            $extension = "jpg"
            if ($imageUrl -match '\.([a-z]{3,4})(\?|$)') {
                $extension = $matches[1]
            }
            
            $fileName = "$($product.name).$extension"
            $filePath = Join-Path $productImagesDir $fileName
            
            Write-Host "  Downloading..." -ForegroundColor White
            Invoke-WebRequest -Uri $imageUrl -OutFile $filePath
            Write-Host "  Saved: $fileName" -ForegroundColor Green
            $downloaded++
        }
        else {
            Write-Host "  Could not find image URL" -ForegroundColor Red
            $failed++
        }
        
        Start-Sleep -Milliseconds 500
        
    } catch {
        Write-Host "  Error: $_" -ForegroundColor Red
        $failed++
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Successfully downloaded: $downloaded images" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
Write-Host "`nImages saved to: $productImagesDir" -ForegroundColor Yellow
Write-Host "`nYou can now use these images in your product management!" -ForegroundColor Cyan
