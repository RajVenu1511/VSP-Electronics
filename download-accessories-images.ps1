# Download Accessories Product Images from Agarwal Electronics
# This script scrapes accessories product pages and downloads images

$ErrorActionPreference = "Continue"

# Define accessories subcategories
$categories = @(
    @{
        Name = "Connectors"
        Url = "https://www.agarwalelectronics.com/product-category/accessories/connectors/"
        Products = 47
    },
    @{
        Name = "DIP Converters"
        Url = "https://www.agarwalelectronics.com/product-category/accessories/dip-converters/"
        Products = 3
    },
    @{
        Name = "IOT"
        Url = "https://www.agarwalelectronics.com/product-category/accessories/iot/"
        Products = 2
    },
    @{
        Name = "Keypad"
        Url = "https://www.agarwalelectronics.com/product-category/accessories/keypad/"
        Products = 6
    },
    @{
        Name = "Silicone Wires"
        Url = "https://www.agarwalelectronics.com/product-category/accessories/silicone-wires/"
        Products = 19
    },
    @{
        Name = "Twezzers"
        Url = "https://www.agarwalelectronics.com/product-category/accessories/twezzers/"
        Products = 5
    },
    @{
        Name = "USB Cables"
        Url = "https://www.agarwalelectronics.com/product-category/accessories/usb/"
        Products = 1
    }
)

# Output directory
$outputDir = "src\assets\images\products"
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$totalSuccess = 0
$totalFailed = 0
$allProducts = @()

# Function to sanitize filename
function Get-SafeFilename {
    param([string]$name)
    $safe = $name -replace '[^a-zA-Z0-9\-]', '-'
    $safe = $safe -replace '-+', '-'
    $safe = $safe.Trim('-').ToLower()
    return $safe
}

# Function to extract product info from page
function Get-ProductsFromPage {
    param(
        [string]$url,
        [string]$categoryName
    )
    
    Write-Host "`nFetching $categoryName from: $url" -ForegroundColor Cyan
    
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
        $html = $response.Content
        
        # Extract product links - looking for product URLs
        $productLinks = [regex]::Matches($html, 'href="(https://www\.agarwalelectronics\.com/product/[^"]+/)"') | 
            ForEach-Object { $_.Groups[1].Value } | 
            Select-Object -Unique
        
        Write-Host "Found $($productLinks.Count) product links" -ForegroundColor Yellow
        
        $products = @()
        $count = 0
        
        foreach ($productUrl in $productLinks) {
            $count++
            Write-Host "[$count/$($productLinks.Count)] Processing: $productUrl" -ForegroundColor Gray
            
            try {
                $productPage = Invoke-WebRequest -Uri $productUrl -UseBasicParsing -TimeoutSec 20
                $productHtml = $productPage.Content
                
                # Extract product name from title
                $productName = ""
                if ($productHtml -match '<title>([^<]+?)\s*[-|]\s*Agarwal Electronics') {
                    $productName = $matches[1].Trim()
                }
                
                # Extract image URL from og:image meta tag
                $imageUrl = ""
                if ($productHtml -match 'property="og:image"\s+content="([^"]+)"') {
                    $imageUrl = $matches[1]
                }
                
                # Extract price
                $price = 0
                if ($productHtml -match '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">[^<]+</span>([0-9,]+)') {
                    $priceStr = $matches[1] -replace ',', ''
                    $price = [int]$priceStr
                }
                
                # Extract description from meta description
                $description = ""
                if ($productHtml -match 'name="description"\s+content="([^"]+)"') {
                    $description = $matches[1].Trim()
                }
                
                if ($productName -and $imageUrl) {
                    $products += @{
                        Name = $productName
                        ImageUrl = $imageUrl
                        Price = $price
                        Description = $description
                        Category = $categoryName
                        ProductUrl = $productUrl
                    }
                    Write-Host "  [OK] Extracted: $productName" -ForegroundColor Green
                } else {
                    Write-Host "  [X] Failed to extract data from: $productUrl" -ForegroundColor Red
                }
                
                Start-Sleep -Milliseconds 500
                
            } catch {
                Write-Host "  [X] Error processing product page: $_" -ForegroundColor Red
            }
        }
        
        return $products
        
    } catch {
        Write-Host "Error fetching category page: $_" -ForegroundColor Red
        return @()
    }
}

# Function to download image
function Download-ProductImage {
    param(
        [string]$imageUrl,
        [string]$productName,
        [string]$outputPath
    )
    
    try {
        $safeFilename = Get-SafeFilename -name $productName
        $extension = ".jpg"
        if ($imageUrl -match '\.(png|jpg|jpeg|webp)(\?|$)') {
            $extension = "." + $matches[1].ToLower()
            if ($extension -eq ".jpeg") { $extension = ".jpg" }
            if ($extension -eq ".webp") { $extension = ".jpg" }
        }
        
        $filename = "$safeFilename$extension"
        $filepath = Join-Path $outputPath $filename
        
        # Check if image is a placeholder
        if ($imageUrl -match 'placeholder|woocommerce-placeholder') {
            Write-Host "  [!] Skipping placeholder image: $productName" -ForegroundColor Yellow
            return @{ Success = $false; Filename = $filename; IsPlaceholder = $true }
        }
        
        Invoke-WebRequest -Uri $imageUrl -OutFile $filepath -TimeoutSec 30
        
        # Verify file was downloaded
        if (Test-Path $filepath) {
            $fileSize = (Get-Item $filepath).Length
            if ($fileSize -gt 1000) {
                Write-Host "  [OK] Downloaded: $filename ($([math]::Round($fileSize/1KB, 2)) KB)" -ForegroundColor Green
                return @{ Success = $true; Filename = $filename; IsPlaceholder = $false }
            } else {
                Remove-Item $filepath -Force
                Write-Host "  [X] File too small (likely error): $filename" -ForegroundColor Red
                return @{ Success = $false; Filename = $filename; IsPlaceholder = $false }
            }
        }
        
        return @{ Success = $false; Filename = $filename; IsPlaceholder = $false }
        
    } catch {
        Write-Host "  [X] Failed to download image: $_" -ForegroundColor Red
        return @{ Success = $false; Filename = ""; IsPlaceholder = $false }
    }
}

# Process each category
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Accessories Image Download" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

foreach ($category in $categories) {
    Write-Host "`n========================================" -ForegroundColor Magenta
    Write-Host "Processing: $($category.Name)" -ForegroundColor Magenta
    Write-Host "Expected: $($category.Products) products" -ForegroundColor Magenta
    Write-Host "========================================" -ForegroundColor Magenta
    
    $products = Get-ProductsFromPage -url $category.Url -categoryName $category.Name
    
    Write-Host "`nDownloading images for $($products.Count) products..." -ForegroundColor Cyan
    
    foreach ($product in $products) {
        $result = Download-ProductImage -imageUrl $product.ImageUrl -productName $product.Name -outputPath $outputDir
        
        if ($result.Success) {
            $totalSuccess++
            $product['LocalImage'] = $result.Filename
        } else {
            $totalFailed++
        }
        
        $allProducts += $product
        Start-Sleep -Milliseconds 300
    }
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Download Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total Products Processed: $($allProducts.Count)" -ForegroundColor White
Write-Host "Successfully Downloaded: $totalSuccess" -ForegroundColor Green
Write-Host "Failed: $totalFailed" -ForegroundColor Red

# Export product data to JSON for reference
$jsonPath = "accessories-products-data.json"
$allProducts | ConvertTo-Json -Depth 10 | Set-Content $jsonPath
Write-Host "`nProduct data exported to: $jsonPath" -ForegroundColor Yellow

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Download Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
