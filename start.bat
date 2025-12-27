@echo off
echo ============================================
echo   VSP Electronics - Angular App
echo ============================================
echo.
echo Checking if dependencies are installed...
echo.

if not exist "node_modules\" (
    echo Dependencies not found. Installing...
    echo.
    call npm install
    echo.
    echo Installation complete!
    echo.
) else (
    echo Dependencies already installed.
    echo.
)

echo Starting development server...
echo.
echo The application will open at http://localhost:4200
echo Press Ctrl+C to stop the server
echo.
echo ============================================

call npm start
