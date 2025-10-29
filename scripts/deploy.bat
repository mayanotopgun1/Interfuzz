@echo off
REM InterFuzz Web - Windows 部署脚本

setlocal

echo ========================================
echo InterFuzz Web - 部署脚本 (Windows)
echo ========================================
echo.

REM 检查 PowerShell 是否可用
where powershell >nul 2>nul
if %errorlevel% neq 0 (
    echo 错误: 未找到 PowerShell
    exit /b 1
)

REM 调用 PowerShell 脚本
powershell -ExecutionPolicy Bypass -File "%~dp0deploy.ps1" %*

endlocal
