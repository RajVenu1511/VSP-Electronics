# Download Product Images Script
# This script downloads all product images and saves them locally

$productImagesDir = "src/assets/images/products"

# Create directory if it doesn't exist
if (-not (Test-Path $productImagesDir)) {
    New-Item -ItemType Directory -Path $productImagesDir -Force
    Write-Host "Created directory: $productImagesDir" -ForegroundColor Green
}

Write-Host "`n=== Product Image Downloader ===" -ForegroundColor Cyan
Write-Host "This script will help you download product images from localStorage`n" -ForegroundColor Yellow

Write-Host "INSTRUCTIONS:" -ForegroundColor Cyan
Write-Host "1. Open http://localhost:4200/admin/products in your browser" -ForegroundColor White
Write-Host "2. Press F12 to open Developer Console" -ForegroundColor White
Write-Host "3. Go to the 'Console' tab" -ForegroundColor White
Write-Host "4. Paste this command and press Enter:" -ForegroundColor White
Write-Host ""
Write-Host "   JSON.stringify(JSON.parse(localStorage.getItem('drone_shop_products')))" -ForegroundColor Green
Write-Host ""
Write-Host "5. Copy the entire output (right-click -> Copy)" -ForegroundColor White
Write-Host "6. Save it to a file named 'products-export.json' in this directory" -ForegroundColor White
Write-Host "`nPress any key when you've created products-export.json..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Check if export file exists
if (-not (Test-Path "products-export.json")) {
    Write-Host "`nError: products-export.json not found!" -ForegroundColor Red
    Write-Host "Please create the file and run this script again." -ForegroundColor Red
    exit 1
}

# Read products
try {
    $productsJson = Get-Content "products-export.json" -Raw
    $products = $productsJson | ConvertFrom-Json
    Write-Host "`nFound $($products.Count) products" -ForegroundColor Green
} catch {
    Write-Host "`nError reading products-export.json: $_" -ForegroundColor Red
    exit 1
}

# Download images
$downloadedCount = 0
$skippedCount = 0
$updatedProducts = @()

foreach ($product in $products) {
    Write-Host "`nProcessing: $($product.name)" -ForegroundColor Cyan
    
    $imageUrl = $product.image
    
    # Skip if already a local path
    if ($imageUrl -match '^/?assets/') {
        Write-Host "  Already local path: $imageUrl" -ForegroundColor Yellow
        $updatedProducts += $product
        $skippedCount++
        continue
    }
    
    # Skip base64 images
    if ($imageUrl -match '^data:') {
        Write-Host "  Base64 image detected, converting..." -ForegroundColor Yellow
        
        # Extract extension from base64 mime type
        $extension = "jpg"
        if ($imageUrl -match 'data:image/([^;]+)') {
            $extension = $matches[1]
            if ($extension -eq "jpeg") { $extension = "jpg" }
        }
        
        # Generate filename from product name
        $fileName = $product.name -replace '[^a-zA-Z0-9]', '-' -replace '-+', '-'
        $fileName = $fileName.ToLower().Trim('-')
        $fileName = "$fileName-$($product.id).$extension"
        
        # Save base64 to file
        try {
            $base64Data = $imageUrl -replace '^data:image/[^;]+;base64,', ''
            $bytes = [Convert]::FromBase64String($base64Data)
            $filePath = Join-Path $productImagesDir $fileName
            [System.IO.File]::WriteAllBytes($filePath, $bytes)
            
            Write-Host "  Saved base64 image: $fileName" -ForegroundColor Green
            $product.image = "/assets/images/products/$fileName"
            $downloadedCount++
        } catch {
            Write-Host "  Error saving base64: $_" -ForegroundColor Red
        }
        
        $updatedProducts += $product
        continue
    }
    
    # Download from URL
    if ($imageUrl -match '^https?://') {
        try {
            # Extract filename from URL
            $uri = [System.Uri]$imageUrl
            $fileName = [System.IO.Path]::GetFileName($uri.LocalPath)
            
            # Clean filename
            if ([string]::IsNullOrWhiteSpace($fileName) -or $fileName -notmatch '\.(jpg|jpeg|png|gif|webp)$') {
                $fileName = $product.name -replace '[^a-zA-Z0-9]', '-' -replace '-+', '-'
                $fileName = $fileName.ToLower().Trim('-')
                $fileName = "$fileName-$($product.id).jpg"
            }
            
            $filePath = Join-Path $productImagesDir $fileName
            
            Write-Host "  Downloading: $fileName" -ForegroundColor White
            Invoke-WebRequest -Uri $imageUrl -OutFile $filePath -ErrorAction Stop
            Write-Host "  Downloaded: $fileName" -ForegroundColor Green
            
            # Update product with local path
            $product.image = "/assets/images/products/$fileName"
            $downloadedCount++
            
        } catch {
            Write-Host "  Error downloading: $_" -ForegroundColor Red
        }
    }
    
    $updatedProducts += $product
}

# Save updated products
$updatedProductsJson = $updatedProducts | ConvertTo-Json -Depth 10
Set-Content "products-updated.json" -Value $updatedProductsJson

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Downloaded: $downloadedCount images" -ForegroundColor Green
Write-Host "Skipped: $skippedCount (already local)" -ForegroundColor Yellow
Write-Host "Total Products: $($products.Count)" -ForegroundColor White

Write-Host "`n=== Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Open http://localhost:4200/admin/products" -ForegroundColor White
Write-Host "2. Press F12 -> Console tab" -ForegroundColor White
Write-Host "3. Paste this command:" -ForegroundColor White
Write-Host ""
Write-Host "   localStorage.setItem('drone_shop_products', '$($updatedProductsJson -replace "'", "\'")')" -ForegroundColor Green
Write-Host ""
Write-Host "4. Refresh the page to see local images!" -ForegroundColor White
Write-Host "`nUpdated products saved to: products-updated.json" -ForegroundColor Yellow
