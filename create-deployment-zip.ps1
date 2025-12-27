# Script to create a clean deployment zip of the project
# Excludes node_modules, .angular cache, dist, and other unnecessary files

$projectPath = "C:\git\drone-frontend"
$zipName = "drone-frontend-$(Get-Date -Format 'yyyy-MM-dd-HHmm').zip"
$zipPath = "C:\git\$zipName"

# Folders and files to exclude
$excludeFolders = @(
    "node_modules",
    ".angular",
    "dist",
    ".git",
    ".vscode"
)

$excludeFiles = @(
    "*.log",
    "npm-debug.log*",
    "yarn-error.log*"
)

Write-Host "Creating deployment zip..." -ForegroundColor Cyan
Write-Host "Source: $projectPath" -ForegroundColor Yellow
Write-Host "Output: $zipPath" -ForegroundColor Yellow

# Create temporary directory for clean copy
$tempDir = "$env:TEMP\drone-frontend-clean"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy files excluding specified folders
Write-Host "`nCopying files (excluding cache folders)..." -ForegroundColor Cyan

Get-ChildItem -Path $projectPath -Recurse | Where-Object {
    $item = $_
    $relativePath = $item.FullName.Substring($projectPath.Length)
    
    # Check if item is in excluded folder
    $isExcluded = $false
    foreach ($excludeFolder in $excludeFolders) {
        if ($relativePath -like "*\$excludeFolder\*" -or $relativePath -like "*\$excludeFolder") {
            $isExcluded = $true
            break
        }
    }
    
    # Check if file matches excluded pattern
    if (-not $isExcluded -and $item -is [System.IO.FileInfo]) {
        foreach ($pattern in $excludeFiles) {
            if ($item.Name -like $pattern) {
                $isExcluded = $true
                break
            }
        }
    }
    
    -not $isExcluded
} | ForEach-Object {
    $relativePath = $_.FullName.Substring($projectPath.Length + 1)
    $targetPath = Join-Path $tempDir $relativePath
    
    if ($_ -is [System.IO.DirectoryInfo]) {
        if (-not (Test-Path $targetPath)) {
            New-Item -ItemType Directory -Path $targetPath -Force | Out-Null
        }
    } else {
        $targetDir = Split-Path $targetPath -Parent
        if (-not (Test-Path $targetDir)) {
            New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        }
        Copy-Item $_.FullName -Destination $targetPath -Force
    }
}

# Create zip file
Write-Host "`nCreating zip archive..." -ForegroundColor Cyan
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -CompressionLevel Optimal

# Cleanup
Remove-Item $tempDir -Recurse -Force

# Show results
$zipSize = (Get-Item $zipPath).Length / 1MB
Write-Host "`nZip created successfully!" -ForegroundColor Green
Write-Host "Location: $zipPath" -ForegroundColor Yellow
Write-Host "Size: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Yellow

Write-Host "`nTo restore this project:" -ForegroundColor Cyan
Write-Host "1. Extract the zip file" -ForegroundColor White
Write-Host "2. Run: npm install" -ForegroundColor White
Write-Host "3. Run: npm start or ng serve" -ForegroundColor White
