#!/bin/bash

##############################################################################
# InterFuzz Web - 部署脚本
# 
# 此脚本用于部署 InterFuzz Web 项目
# 会自动下载并解压必要的资源文件（JDK 和种子文件）
##############################################################################

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 获取脚本所在目录的父目录（项目根目录）
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}InterFuzz Web - 部署脚本${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 配置：资源文件下载地址
# 默认从 resources 文件夹读取
RESOURCES_DIR="$PROJECT_ROOT/resources"
RESOURCES_URL="${INTERFUZZ_RESOURCES_URL:-}"

# 检查是否已经存在资源文件
RESOURCES_EXIST=true
if [ ! -d "backend/jf-seeds" ] || [ ! -d "backend/temurin-17.0.7" ]; then
    RESOURCES_EXIST=false
fi

if [ "$RESOURCES_EXIST" = true ]; then
    echo -e "${GREEN}检测到资源文件已存在${NC}"
    echo ""
    read -p "是否重新下载并覆盖？(y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "跳过资源文件下载"
        SKIP_DOWNLOAD=true
    else
        SKIP_DOWNLOAD=false
    fi
else
    echo -e "${YELLOW}未检测到资源文件，需要下载${NC}"
    SKIP_DOWNLOAD=false
fi

# 下载和解压资源
if [ "$SKIP_DOWNLOAD" != true ]; then
    echo ""
    echo -e "${YELLOW}========================================${NC}"
    echo -e "${YELLOW}下载资源文件${NC}"
    echo -e "${YELLOW}========================================${NC}"
    echo ""
    
    # 检查是否提供了本地文件路径
    if [ -n "$1" ]; then
        ARCHIVE_PATH="$1"
        if [ ! -f "$ARCHIVE_PATH" ]; then
            echo -e "${RED}错误: 指定的文件不存在: $ARCHIVE_PATH${NC}"
            exit 1
        fi
        echo "使用本地文件: $ARCHIVE_PATH"
    elif [ -d "$RESOURCES_DIR" ]; then
        # 使用 resources 目录中的文件
        ARCHIVE_PATH=$(find "$RESOURCES_DIR" -name "interfuzz-resources*.zip" | sort -r | head -n 1)
        if [ -z "$ARCHIVE_PATH" ]; then
            echo -e "${RED}错误: 在 resources/ 目录中未找到资源文件${NC}"
            exit 1
        fi
        echo "使用 resources 目录中的文件: $(basename $ARCHIVE_PATH)"
    elif [ -n "$RESOURCES_URL" ]; then
        # 下载资源文件
        ARCHIVE_PATH="$PROJECT_ROOT/interfuzz-resources.zip"
        
        echo "下载地址: $RESOURCES_URL"
        echo "保存位置: $ARCHIVE_PATH"
        echo ""
        
        echo -e "${YELLOW}开始下载...${NC}"
        if command -v wget &> /dev/null; then
            wget -O "$ARCHIVE_PATH" "$RESOURCES_URL"
        elif command -v curl &> /dev/null; then
            curl -L -o "$ARCHIVE_PATH" "$RESOURCES_URL"
        else
            echo -e "${RED}错误: 需要 wget 或 curl 来下载文件${NC}"
            exit 1
        fi
        echo -e "${GREEN}✓ 下载完成${NC}"
    else
        echo -e "${RED}错误: 未找到资源文件${NC}"
        echo ""
        echo "请使用以下方式之一："
        echo ""
        echo "方式 1: 将资源文件放入 resources/ 目录"
        echo "  cp /path/to/interfuzz-resources.zip resources/"
        echo "  ./scripts/deploy.sh"
        echo ""
        echo "方式 2: 设置下载 URL"
        echo "  export INTERFUZZ_RESOURCES_URL='https://github.com/Qeryu/Interfuzz-1/releases/download/v1.0.0/interfuzz-resources.zip'"
        echo "  ./scripts/deploy.sh"
        echo ""
        echo "方式 3: 直接指定本地文件"
        echo "  ./scripts/deploy.sh /path/to/interfuzz-resources.zip"
        echo ""
        exit 1
    fi
    
    echo ""
    echo -e "${YELLOW}========================================${NC}"
    echo -e "${YELLOW}解压资源文件${NC}"
    echo -e "${YELLOW}========================================${NC}"
    echo ""
    
    # 备份现有目录（如果存在）
    if [ -d "backend/jf-seeds" ]; then
        echo "备份现有 jf-seeds..."
        mv backend/jf-seeds "backend/jf-seeds.backup.$(date +%Y%m%d_%H%M%S)"
    fi
    
    if [ -d "backend/temurin-17.0.7" ]; then
        echo "备份现有 temurin-17.0.7..."
        mv backend/temurin-17.0.7 "backend/temurin-17.0.7.backup.$(date +%Y%m%d_%H%M%S)"
    fi
    
    # 解压到临时目录
    TEMP_DIR="$PROJECT_ROOT/.temp-extract"
    mkdir -p "$TEMP_DIR"
    
    echo "解压中..."
    
    # 使用 unzip 解压
    if command -v unzip &> /dev/null; then
        unzip -q "$ARCHIVE_PATH" -d "$TEMP_DIR"
    else
        echo -e "${RED}错误: 未找到 unzip 命令${NC}"
        echo "请安装 unzip: sudo apt-get install unzip"
        exit 1
    fi
    
    # 移动到正确位置
    echo "移动文件到 backend/ 目录..."
    mv "$TEMP_DIR/jf-seeds" backend/
    mv "$TEMP_DIR/temurin-17.0.7" backend/
    
    # 清理
    rm -rf "$TEMP_DIR"
    if [ -z "$1" ]; then
        rm -f "$ARCHIVE_PATH"
    fi
    
    echo -e "${GREEN}✓ 解压完成${NC}"
fi

# 设置 JDK 执行权限
echo ""
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}设置文件权限${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

if [ -d "backend/temurin-17.0.7/bin" ]; then
    echo "设置 JDK 可执行权限..."
    chmod +x backend/temurin-17.0.7/bin/*
    echo -e "${GREEN}✓ JDK 权限设置完成${NC}"
fi

# 验证安装
echo ""
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}验证安装${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# 检查 JDK
if [ -f "backend/temurin-17.0.7/bin/java" ]; then
    echo -e "${GREEN}✓ JDK 安装成功${NC}"
    echo "  版本信息:"
    backend/temurin-17.0.7/bin/java -version 2>&1 | sed 's/^/    /'
else
    echo -e "${RED}✗ JDK 未找到${NC}"
fi

echo ""

# 检查种子文件
SEED_COUNT=$(find backend/jf-seeds/tests -name "Test*.java" 2>/dev/null | wc -l)
if [ "$SEED_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓ 种子文件安装成功${NC}"
    echo "  找到 $SEED_COUNT 个种子文件"
else
    echo -e "${RED}✗ 种子文件未找到${NC}"
fi

# 安装 npm 依赖
echo ""
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}安装项目依赖${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

if [ ! -d "node_modules" ]; then
    echo "安装 npm 依赖..."
    npm install
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
else
    echo -e "${GREEN}✓ 依赖已存在${NC}"
    read -p "是否重新安装依赖？(y/N) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install
        echo -e "${GREEN}✓ 依赖安装完成${NC}"
    fi
fi

# 完成
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "下一步操作："
echo ""
echo "1. 开发模式运行："
echo "   npm run dev"
echo ""
echo "2. 构建生产版本："
echo "   npm run build"
echo ""
echo "3. 预览生产版本："
echo "   npm run preview"
echo ""
echo -e "${YELLOW}提示: 访问 http://localhost:5173 查看应用${NC}"
echo ""
