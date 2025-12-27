# PowerShell script to download DIY Kits product images
$ErrorActionPreference = "Continue"

# Define the output directory
$outputDir = "src\assets\images\products"

# Create directory if it doesn't exist
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Product URLs mapping - First page of DIY Kits
$products = @{
    "14-in-1-solar-transformers-robot" = "https://www.agarwalelectronics.com/product/14-in-1-educational-diy-solar-transformers-robot-toy/"
    "18dof-controller-board" = "https://www.agarwalelectronics.com/product/18dof-controller-board/"
    "2-module-23a-touch-switchboard" = "https://www.agarwalelectronics.com/product/2-module-23a-touch-switchboard-white-black/"
    "2-module-retrofit-device" = "https://www.agarwalelectronics.com/product/2-module-retrofit-device/"
    "2-wheel-round-kit" = "https://www.agarwalelectronics.com/product/2-wheel-round-kit/"
    "2dof-mg996r-servo-gripper" = "https://www.agarwalelectronics.com/product/2dof-mg996r-industrial-servo-gripper/"
    "2w-kit-single-box" = "https://www.agarwalelectronics.com/product/2w-kit-single-box-pack/"
    "3in1-acebott-esp32-smart-home-lv1" = "https://www.agarwalelectronics.com/product/3-in-1-acebott-esp32-stem-school-smart-home-education-kit-lv-1/"
    "3dof-servo-robotic-arm" = "https://www.agarwalelectronics.com/product/3dof-servo-robotic-arm-diy-kit-with-surface-mounting-bracket/"
    "4in1-transformation-robot" = "https://www.agarwalelectronics.com/product/4-in-1-self-assembled-transformation-robot/"
    "420pcs-diy-blocks-mechanical" = "https://www.agarwalelectronics.com/product/420pcs-diy-blocks-education-set-mechanical-assembly/"
    "4dof-robotic-arm-kit" = "https://www.agarwalelectronics.com/product/4dof-robotic-arm-kit/"
    "4w-diy-kit" = "https://www.agarwalelectronics.com/product/4w-diy-kit/"
    "4wd-3dof-pick-place-arm-chassis" = "https://www.agarwalelectronics.com/product/4wd-3dof-pick-and-place-programmable-metal-diy-arm-robotic-chassis-kit/"
    "4wd-mecannum-wheels-chassis" = "https://www.agarwalelectronics.com/product/4wd-mecannum-wheels-normal-chassis-kit/"
    "4wd-suspension-smart-car-chassis" = "https://www.agarwalelectronics.com/product/4wd-suspension-smart-car-chassis-with-125-rpm-bo-motors-kit/"
    "5in1-acebott-esp32-smart-home-lv2" = "https://www.agarwalelectronics.com/product/5-in-1-acebott-esp32-stem-school-smart-home-kit-level-2/"
    "5dof-industrial-robotic-arm" = "https://www.agarwalelectronics.com/product/5dof-industrial-robotic-arm-diy-kit/"
}

Write-Host "Starting download of DIY Kits product images..." -ForegroundColor Cyan
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($product in $products.GetEnumerator()) {
    $productName = $product.Key
    $productUrl = $product.Value
    $outputFile = Join-Path $outputDir "$productName.jpg"
    
    Write-Host "Processing: $productName" -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri $productUrl -UseBasicParsing -TimeoutSec 30
        $html = $response.Content
        
        # Extract og:image meta tag using regex
        $pattern = 'property="og:image" content="([^"]+)"'
        if ($html -match $pattern) {
            $imageUrl = $matches[1]
            Write-Host "  Found image: $imageUrl" -ForegroundColor Gray
            
            # Download the image
            Invoke-WebRequest -Uri $imageUrl -OutFile $outputFile -TimeoutSec 30
            Write-Host "  Downloaded to: $outputFile" -ForegroundColor Green
            $successCount++
        }
        else {
            Write-Host "  Could not find og:image meta tag" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
    
    Write-Host ""
    Start-Sleep -Milliseconds 500
}

Write-Host "Download Complete!" -ForegroundColor Green
Write-Host "Success: $successCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor Red
