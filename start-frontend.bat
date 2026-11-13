@echo off
chcp 65001 >nul
title Smart Event (Eviq) - Frontend Server
color 0b

echo =========================================================
echo       Smart Event (Eviq) - Frontend Development Server
echo =========================================================
echo.

cd /d "%~dp0frontend"

if not exist "node_modules\" (
    echo [INFO] Installing frontend dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install npm packages.
        pause
        exit /b %errorlevel%
    )
)

echo [INFO] Starting Vite dev server on http://localhost:5173 ...
echo.

:: Open browser automatically after 1 second
start "" cmd /c "timeout /t 2 >nul & start http://localhost:5173"

:: Run development server
call npm run dev

pause
