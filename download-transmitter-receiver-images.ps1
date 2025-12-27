# PowerShell script to download drone transmitter and receiver product images
$ErrorActionPreference = "Continue"

# Define the output directory
$outputDir = "src\assets\images\products"

# Create directory if it doesn't exist
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Product URLs mapping
$products = @{
    "ct6b-transmitter-fs-r6b-receiver" = "https://www.agarwalelectronics.com/product/ct6b-2-4ghz-6ch-transmitter-with-fs-r6b-receiver/"
    "fs-i6-x" = "https://www.agarwalelectronics.com/product/fs-i6-x/"
    "fs-ia6b-receiver" = "https://www.agarwalelectronics.com/product/fs-ia6b-rf-2-4ghz-6ch-ppm-output-with-ibus-port-receiver/"
    "fs-sm100-simulator-cable" = "https://www.agarwalelectronics.com/product/fs-sm100-simulator-cable/"
    "fs-i6-transmitter-ia6b-receiver" = "https://www.agarwalelectronics.com/product/fs-i6-2-4g-6ch-ppm-rc-transmitter-with-fs-ia6b-receiver/"
    "fs-i6s-ia10b" = "https://www.agarwalelectronics.com/product/fs-i6sfs-ia10b/"
    "fs-ia10b-receiver" = "https://www.agarwalelectronics.com/product/fs-ia10b-radio-receiver/"
    "fs-r6b-receiver" = "https://www.agarwalelectronics.com/product/fs-r6b-flysky-2-4ghz-6ch-receiver-for-rc-fs-ct6b-th9x/"
    "fs-sm600-simulator-remote" = "https://www.agarwalelectronics.com/product/fs-sm600-remote/"
    "fs-th9x-transmitter-ia10b-receiver" = "https://www.agarwalelectronics.com/product/fs-th9x-2-4ghz-9ch-upgrade-transmitter-with-fs-ia10b-receiver/"
    "h16-rc-skydroid" = "https://www.agarwalelectronics.com/product/h16-rc-skydroid/"
    "hglrc-m80-pro-gps" = "https://www.agarwalelectronics.com/product/hglrc-m80-pro-gps-module/"
    "radiomaster-tx16s-mkii-elrs" = "https://www.agarwalelectronics.com/product/radio-master-tx16s-mkii-with-elrs-nano-receiver/"
    "radiomaster-pocket-cc2500" = "https://www.agarwalelectronics.com/product/radiomaster-pocket-radio-controller-cc2500/"
    "rp1-elss-receiver" = "https://www.agarwalelectronics.com/product/rp1-elss-reciever/"
    "skydroid-h12-remote-camera" = "https://www.agarwalelectronics.com/product/skydroid-h12-inbuilt-display-remote-control-with-camera/"
}

Write-Host "Starting download of transmitter/receiver product images..." -ForegroundColor Cyan
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
