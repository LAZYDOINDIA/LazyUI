@echo off
echo ========================================
echo LazyDo Frontend Setup Script
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    pause
    exit /b 1
)

echo Checking Expo CLI installation...
expo --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Expo CLI globally...
    npm install -g @expo/cli
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install Expo CLI
        pause
        exit /b 1
    )
)

echo.
echo Installing project dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Clearing Metro cache...
npm run clear
if %errorlevel% neq 0 (
    echo WARNING: Failed to clear cache, but continuing...
)

echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo To start the development server, run:
echo   npm start
echo.
echo To clear cache and reset, run:
echo   npm run reset
echo.
echo For troubleshooting, see TROUBLESHOOTING.md
echo.
pause 