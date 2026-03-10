@echo off
REM Build script for Windows
cd /d "%~dp0"
echo Building project...
npm run build
if %errorlevel% neq 0 (
  echo Build failed!
  exit /b %errorlevel%
)
echo Build completed successfully!

