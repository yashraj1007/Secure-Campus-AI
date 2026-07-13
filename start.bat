@echo off
title Secure Campus AI - Local Server
echo.
echo  Secure Campus AI - Starting local server...
echo  Open: http://localhost:8080
echo  Press Ctrl+C to stop
echo.
cd /d "%~dp0"
python -m http.server 8080
pause
