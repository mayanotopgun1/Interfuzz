# InterFuzz Web - 部署指南

本指南介绍如何部署 InterFuzz Web 项目。

## 快速开始

由于项目包含大型资源文件（JDK 和种子文件，约 422MB），这些文件不包含在 Git 仓库中。需要通过部署脚本自动下载。

### 方式 1: 自动下载（推荐）

```bash
# 克隆项目
git clone https://github.com/Qeryu/Interfuzz-1.git
cd Interfuzz-1

# 2. 设置资源文件下载地址
export INTERFUZZ_RESOURCES_URL='https://github.com/Qeryu/Interfuzz-1/releases/download/v1.0.0/interfuzz-resources.zip'

# 3. 运行部署脚本
chmod +x scripts/deploy.sh
./scripts/deploy.sh

# 4. 启动开发服务器
npm run dev
```

### 方式 2: 使用本地资源文件

如果你已经下载了资源文件包：

```bash
# 1. 克隆项目
git clone https://github.com/Qeryu/Interfuzz-1.git
cd Interfuzz-1

# 2. 使用本地文件部署
chmod +x scripts/deploy.sh
./scripts/deploy.sh /path/to/interfuzz-resources.zip

# 3. 启动开发服务器
npm run dev
```

## 资源文件说明

资源文件包包含以下内容：

- **backend/jf-seeds/** (~107MB): InterFuzz 的种子文件
  - 包含 9999 个 Java 测试用例种子
  - 用于生成测试用例
  
- **backend/temurin-17.0.7/** (~315MB): 内置 JDK
  - Eclipse Temurin OpenJDK 17.0.7
  - 确保环境一致性
  - 无需单独安装 Java

**压缩格式**: ZIP (约 210MB)
- ✅ GitHub 原生支持
- ✅ Windows 原生支持，无需额外工具
- ✅ Linux/macOS 内置 unzip 命令

## 维护指南

### 为维护者：打包资源文件

如果你是项目维护者，需要更新资源文件：

```bash
# 1. 确保 backend/jf-seeds 和 backend/temurin-17.0.7 目录存在
# 2. 运行打包脚本
chmod +x scripts/pack-resources.sh
./scripts/pack-resources.sh

# 3. 上传生成的文件
# 文件位置: releases/interfuzz-resources-YYYYMMDD_HHMMSS.tar.gz
```

### 上传到云存储

推荐的云存储服务：

#### GitHub Releases（免费，推荐）

```bash
# 1. 在 GitHub 仓库创建新 Release
# 2. 上传 interfuzz-resources-*.zip
# 3. 获取下载链接
# 格式: https://github.com/Qeryu/Interfuzz-1/releases/download/v1.0.0/interfuzz-resources.zip
```

#### 阿里云 OSS

```bash
# 使用 ossutil 上传
ossutil cp releases/interfuzz-resources-*.tar.gz oss://your-bucket/
```

#### 腾讯云 COS

```bash
# 使用 coscmd 上传
coscmd upload releases/interfuzz-resources-*.tar.gz /
```

### 更新 README.md

在主 README.md 中添加下载链接：

```markdown
## 资源文件下载

资源文件（422MB）: [下载链接](https://github.com/Qeryu/Interfuzz-1/releases/download/v1.0.0/interfuzz-resources.zip)

SHA256: [校验和]
```

## 脚本说明

### scripts/pack-resources.sh

打包脚本，用于创建资源文件压缩包。

**功能：**
- 复制 jf-seeds 和 temurin-17.0.7 到临时目录
- 打包为 tar.gz 格式
- 生成 SHA256 校验和
- 输出到 releases/ 目录

**使用：**
```bash
./scripts/pack-resources.sh
```

### scripts/deploy.sh

部署脚本，用于自动化部署流程。

**功能：**
- 检查资源文件是否已存在
- 下载（或使用本地）资源文件包
- 解压到正确位置
- 设置文件权限
- 安装 npm 依赖
- 验证安装

**使用：**
```bash
# 自动下载
export INTERFUZZ_RESOURCES_URL='https://...'
./scripts/deploy.sh

# 使用本地文件
./scripts/deploy.sh /path/to/file.tar.gz
```

## 手动部署

如果自动部署脚本无法使用，可以手动部署：

```bash
# 1. 克隆项目
git clone https://github.com/Qeryu/Interfuzz-1.git
cd Interfuzz-1

# 2. 下载资源文件
wget https://github.com/Qeryu/Interfuzz-1/releases/download/v1.0.0/interfuzz-resources.zip

# 3. 解压
unzip interfuzz-resources.zip

# 4. 移动到正确位置
mv jf-seeds backend/
mv temurin-17.0.7 backend/

# 5. 设置 JDK 权限
chmod +x backend/temurin-17.0.7/bin/*

# 6. 安装依赖
npm install

# 7. 运行
npm run dev
```

## 验证安装

运行以下命令验证安装：

```bash
# 验证 JDK
backend/temurin-17.0.7/bin/java -version

# 验证种子文件
ls backend/jf-seeds/tests/Test*.java | wc -l

# 验证项目构建
npm run build
```

## 常见问题

### Q: 下载资源文件失败

**A:** 尝试以下解决方案：
1. 检查网络连接
2. 使用代理或 VPN
3. 下载到本地后使用本地文件方式部署
4. 联系维护者获取备用下载链接

### Q: JDK 权限错误

**A:** 运行以下命令设置权限：
```bash
chmod +x backend/temurin-17.0.7/bin/*
```

### Q: 找不到种子文件

**A:** 检查目录结构：
```bash
ls -la backend/jf-seeds/tests/
```
应该看到多个 Test*.java 文件。

### Q: 资源文件已存在，如何更新？

**A:** 重新运行部署脚本时选择覆盖：
```bash
./scripts/deploy.sh
# 当提示时输入 'y' 确认覆盖
```

## 生产环境部署

### 使用 Docker（推荐）

TODO: Docker 镜像构建脚本待添加

### 使用 PM2

```bash
# 构建项目
npm run build

# 使用 PM2 运行
pm2 start npm --name "interfuzz-web" -- run preview

# 开机自启
pm2 startup
pm2 save
```

### 使用 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 开发环境设置

```bash
# 1. 完成部署（见上文）
# 2. 启动开发服务器
npm run dev

# 3. 访问
# http://localhost:5173
```

## 构建生产版本

```bash
# 构建
npm run build

# 预览
npm run preview
```

## 技术支持

如有问题，请：
1. 查看本文档
2. 检查 GitHub Issues
3. 联系维护者

## 许可证

与 InterFuzz 项目保持一致
