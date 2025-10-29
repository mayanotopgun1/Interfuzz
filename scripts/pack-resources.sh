#!/bin/bash

##############################################################################
# InterFuzz Web - 资源打包脚本
# 
# 此脚本用于打包大型资源文件（JDK 和种子文件）以便上传到云存储
##############################################################################

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 获取脚本所在目录的父目录（项目根目录）
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}InterFuzz Web - 资源打包脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查必要的目录是否存在
if [ ! -d "backend/jf-seeds" ]; then
    echo -e "${RED}错误: backend/jf-seeds 目录不存在${NC}"
    exit 1
fi

if [ ! -d "backend/temurin-17.0.7" ]; then
    echo -e "${RED}错误: backend/temurin-17.0.7 目录不存在${NC}"
    exit 1
fi

# 创建临时目录
TEMP_DIR="$PROJECT_ROOT/.temp-resources"
mkdir -p "$TEMP_DIR"

echo -e "${YELLOW}步骤 1: 准备打包目录...${NC}"
echo "目标目录: $TEMP_DIR"

# 复制目录到临时位置
echo -e "${YELLOW}步骤 2: 复制 jf-seeds...${NC}"
cp -r backend/jf-seeds "$TEMP_DIR/"
echo "✓ jf-seeds 复制完成"

echo -e "${YELLOW}步骤 3: 复制 temurin-17.0.7...${NC}"
cp -r backend/temurin-17.0.7 "$TEMP_DIR/"
echo "✓ temurin-17.0.7 复制完成"

# 创建输出目录
OUTPUT_DIR="$PROJECT_ROOT/resources"
mkdir -p "$OUTPUT_DIR"

# 生成时间戳
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ARCHIVE_NAME="interfuzz-resources-${TIMESTAMP}.zip"
ARCHIVE_PATH="$OUTPUT_DIR/$ARCHIVE_NAME"

echo -e "${YELLOW}步骤 4: 打包压缩...${NC}"
echo "输出文件: $ARCHIVE_PATH"

# 打包（使用 ZIP 格式，GitHub 和 Windows 原生支持）
cd "$TEMP_DIR"
zip -r -q "$ARCHIVE_PATH" jf-seeds temurin-17.0.7

# 清理临时目录
cd "$PROJECT_ROOT"
rm -rf "$TEMP_DIR"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}打包完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "文件位置: $ARCHIVE_PATH"
echo "文件大小: $(du -h "$ARCHIVE_PATH" | cut -f1)"
echo ""
echo -e "${YELLOW}下一步操作：${NC}"
echo "1. 将此文件上传到云存储（如阿里云OSS、腾讯云COS、GitHub Releases等）"
echo "2. 在 README.md 中添加下载链接"
echo "3. 用户克隆项目后运行 deploy.sh 脚本进行部署"
echo ""

# 计算 SHA256 校验和
if command -v sha256sum &> /dev/null; then
    echo -e "${YELLOW}SHA256 校验和:${NC}"
    sha256sum "$ARCHIVE_PATH" | tee "$OUTPUT_DIR/${ARCHIVE_NAME}.sha256"
    echo ""
fi
