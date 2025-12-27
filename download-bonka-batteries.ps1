# PowerShell script to download Bonka battery product images
$ErrorActionPreference = "Continue"

# Define the output directory
$outputDir = "src\assets\images\products"

# Create directory if it doesn't exist
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Product URLs mapping
$products = @{
    "bonka-11-1v-10000mah-25c-3s" = "https://www.agarwalelectronics.com/product/11-1v-10000mah-25c-bonka-3s/"
    "bonka-11-1v-1000mah-35c-3s" = "https://www.agarwalelectronics.com/product/11-1v-1000mah-35c-bonka-3s/"
    "bonka-11-1v-2200mah-35c-3s" = "https://www.agarwalelectronics.com/product/11-1v-2200mah-35c-bonka-3s/"
    "bonka-11-1v-3300mah-35c-3s" = "https://www.agarwalelectronics.com/product/11-1v-3300mah-35c-bonka-3s/"
    "bonka-11-1v-4200mah-35c-3s" = "https://www.agarwalelectronics.com/product/11-1v-4200mah-35c-bonka-3s/"
    "bonka-11-1v-8000mah-25c-3s" = "https://www.agarwalelectronics.com/product/11-1v-8000mah-25c-bonka-3s/"
    "bonka-14-8v-10000mah-45c-4s" = "https://www.agarwalelectronics.com/product/14-8v-10000mah-45c-bonka-4s/"
    "bonka-14-8v-5200mah-35c-4s" = "https://www.agarwalelectronics.com/product/14-8v-5200mah-35c-bonka-4s/"
    "bonka-22-2v-1300mah-100c-6s" = "https://www.agarwalelectronics.com/product/22-2v-1300mah-100c-bonka-6s/"
    "tattu-22-2v-16000mah-15c-6s" = "https://www.agarwalelectronics.com/product/tattu-22-2v-16000mah-25c-6s/"
    "bonka-11-1v-1500mah-75c-3s" = "https://www.agarwalelectronics.com/product/bonka-11-1v-1500mah-75c-3s/"
    "bonka-11-1v-1500mah-35c-3s" = "https://www.agarwalelectronics.com/product/bonka-11-1v-1500mah-35c-3s/"
    "bonka-11-1v-5200mah-65c-3s" = "https://www.agarwalelectronics.com/product/bonka-11-1v-5200mah-65c-3s/"
    "bonka-11-1v-2200mah-35c-3s-lithium" = "https://www.agarwalelectronics.com/product/bonka-11-1v-2200mah-35c-3s-lithium/"
    "bonka-11-1v-5200mah-35c-3s-polymer" = "https://www.agarwalelectronics.com/product/bonka-11-1v-5200mah-35c-3s-lithium-polymer-battery-pack/"
    "bonka-14-8v-1500mah-75c-4s" = "https://www.agarwalelectronics.com/product/bonka-14-8v-1500mah-75c-4s-2/"
    "bonka-14-8v-2200mah-35c-4s" = "https://www.agarwalelectronics.com/product/bonka-14-8v-2200mah-35c-4s-2/"
}

Write-Host "Starting download of Bonka battery product images..." -ForegroundColor Cyan
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
