@echo off
REM Deploy script for Windows
cd /d "%~dp0"

echo Building project...
call npm run build
if %errorlevel% neq 0 (
  echo Build failed!
  exit /b %errorlevel%
)

echo Copying 404.html for SPA routing...
copy /Y public\404.html dist\404.html

echo Deploying to GitHub Pages...
call npx gh-pages -d dist

if %errorlevel% neq 0 (
  echo Deploy failed!
  exit /b %errorlevel%
)

echo Deploy completed successfully!
echo Your app will be live at: https://eduassist-ai.github.io/EduAssist-AI-FE/
echo Wait 2-5 minutes for GitHub Pages to update.
