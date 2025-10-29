# InterFuzz Web - Windows PowerShell 部署脚本

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Blue
Write-Host "InterFuzz Web - 部署脚本" -ForegroundColor Blue
Write-Host "========================================" -ForegroundColor Blue
Write-Host ""

# 获取项目根目录
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

# 配置资源文件下载地址
$ResourcesDir = Join-Path $ProjectRoot "resources"
$ResourcesUrl = $env:INTERFUZZ_RESOURCES_URL

# 检查资源文件是否存在
$ResourcesExist = (Test-Path "backend\jf-seeds") -and (Test-Path "backend\temurin-17.0.7")

if ($ResourcesExist) {
    Write-Host "检测到资源文件已存在" -ForegroundColor Green
    Write-Host ""
    $response = Read-Host "是否重新下载并覆盖？(y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "跳过资源文件下载"
        $SkipDownload = $true
    }
}

# 下载和解压资源
if (-not $SkipDownload) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "下载资源文件" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host ""
    
    # 检查是否提供了本地文件路径
    if ($args.Count -gt 0) {
        $ArchivePath = $args[0]
        if (-not (Test-Path $ArchivePath)) {
            Write-Host "错误: 指定的文件不存在: $ArchivePath" -ForegroundColor Red
            exit 1
        }
        Write-Host "使用本地文件: $ArchivePath"
    } elseif (Test-Path $ResourcesDir) {
        # 使用 resources 目录中的文件
        $resourceFiles = Get-ChildItem -Path $ResourcesDir -Filter "interfuzz-resources*.zip" | Sort-Object Name -Descending
        if ($resourceFiles.Count -eq 0) {
            Write-Host "错误: 在 resources\ 目录中未找到资源文件" -ForegroundColor Red
            exit 1
        }
        $ArchivePath = $resourceFiles[0].FullName
        Write-Host "使用 resources 目录中的文件: $($resourceFiles[0].Name)"
    } elseif ($ResourcesUrl) {
        # 下载资源文件
        $ArchivePath = Join-Path $ProjectRoot "interfuzz-resources.zip"
        
        Write-Host "下载地址: $ResourcesUrl"
        Write-Host "保存位置: $ArchivePath"
        Write-Host ""
        
        Write-Host "开始下载..." -ForegroundColor Yellow
        
        try {
            # 使用 .NET WebClient 下载
            $webClient = New-Object System.Net.WebClient
            $webClient.DownloadFile($ResourcesUrl, $ArchivePath)
            Write-Host "✓ 下载完成" -ForegroundColor Green
        } catch {
            Write-Host "下载失败: $_" -ForegroundColor Red
            Write-Host ""
            Write-Host "请手动下载资源文件并使用以下命令：" -ForegroundColor Yellow
            Write-Host "  .\scripts\deploy.ps1 C:\path\to\interfuzz-resources.zip"
            exit 1
        }
    } else {
        Write-Host "错误: 未找到资源文件" -ForegroundColor Red
        Write-Host ""
        Write-Host "请使用以下方式之一："
        Write-Host ""
        Write-Host "方式 1: 将资源文件放入 resources\ 目录"
        Write-Host "  Copy-Item C:\path\to\interfuzz-resources.zip resources\"
        Write-Host "  .\scripts\deploy.ps1"
        Write-Host ""
        Write-Host "方式 2: 设置下载 URL"
        Write-Host "  `$env:INTERFUZZ_RESOURCES_URL='https://github.com/Qeryu/Interfuzz-1/releases/download/v1.0.0/interfuzz-resources.zip'"
        Write-Host "  .\scripts\deploy.ps1"
        Write-Host ""
        Write-Host "方式 3: 直接指定本地文件"
        Write-Host "  .\scripts\deploy.ps1 C:\path\to\interfuzz-resources.zip"
        Write-Host ""
        exit 1
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host "解压资源文件" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Yellow
    Write-Host ""
    
    # 解压
    Write-Host "解压中..."
    $tempDir = Join-Path $ProjectRoot ".temp-extract"
    New-Item -ItemType Directory -Force -Path $tempDir | Out-Null
    
    # 使用 .NET 的 ZipFile 类解压（Windows 原生支持）
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($ArchivePath, $tempDir)
    
    # 移动到正确位置
    Write-Host "移动文件到 backend\ 目录..."
    Move-Item (Join-Path $tempDir "jf-seeds") "backend\"
    Move-Item (Join-Path $tempDir "temurin-17.0.7") "backend\"
    
    # 清理
    Remove-Item -Recurse -Force $tempDir
    if ($args.Count -eq 0) {
        Remove-Item $ArchivePath
    }
    
    Write-Host "✓ 解压完成" -ForegroundColor Green
}

# 验证安装
Write-Host ""
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "验证安装" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

# 检查 JDK
$javaPath = "backend\temurin-17.0.7\bin\java.exe"
if (Test-Path $javaPath) {
    Write-Host "✓ JDK 安装成功" -ForegroundColor Green
    Write-Host "  版本信息:"
    & $javaPath -version 2>&1 | ForEach-Object { Write-Host "    $_" }
} else {
    Write-Host "✗ JDK 未找到" -ForegroundColor Red
}

Write-Host ""

# 检查种子文件
$seedCount = (Get-ChildItem "backend\jf-seeds\tests\Test*.java" -ErrorAction SilentlyContinue).Count
if ($seedCount -gt 0) {
    Write-Host "✓ 种子文件安装成功" -ForegroundColor Green
    Write-Host "  找到 $seedCount 个种子文件"
} else {
    Write-Host "✗ 种子文件未找到" -ForegroundColor Red
}

# 安装 npm 依赖
Write-Host ""
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "安装项目依赖" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path "node_modules")) {
    Write-Host "安装 npm 依赖..."
    npm install
    Write-Host "✓ 依赖安装完成" -ForegroundColor Green
} else {
    Write-Host "✓ 依赖已存在" -ForegroundColor Green
    $response = Read-Host "是否重新安装依赖？(y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        npm install
        Write-Host "✓ 依赖安装完成" -ForegroundColor Green
    }
}

# 完成
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "部署完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "下一步操作："
Write-Host ""
Write-Host "1. 开发模式运行："
Write-Host "   npm run dev"
Write-Host ""
Write-Host "2. 构建生产版本："
Write-Host "   npm run build"
Write-Host ""
Write-Host "3. 预览生产版本："
Write-Host "   npm run preview"
Write-Host ""
Write-Host "提示: 访问 http://localhost:5173 查看应用" -ForegroundColor Yellow
Write-Host ""
