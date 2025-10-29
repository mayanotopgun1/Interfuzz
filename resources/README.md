# InterFuzz 资源文件

此目录用于存放 InterFuzz 项目所需的大型资源文件。

## 📦 资源包内容

- **jf-seeds/**: Java 种子测试文件（9999个测试用例）
- **temurin-17.0.7/**: Eclipse Temurin JDK 17.0.7

## 📥 如何获取资源文件

### 方式 1: 使用部署脚本（推荐）

资源文件已包含在此目录中，运行部署脚本即可：

```bash
# Linux/macOS
./scripts/deploy.sh

# Windows PowerShell
.\scripts\deploy.ps1
```

### 方式 2: 从云存储下载

如果 resources 目录为空，可以从以下位置下载：

- GitHub Releases: [下载链接待添加]
- 云存储链接: [待添加]

下载后将 ZIP 文件放入此目录，然后运行部署脚本。

## 🔐 文件校验

使用 SHA256 校验和验证下载的文件完整性：

```bash
# Linux/macOS
sha256sum -c interfuzz-resources-*.zip.sha256

# Windows PowerShell
Get-FileHash interfuzz-resources-*.zip -Algorithm SHA256
```

## 📝 资源打包

如果需要重新打包资源文件（开发者用）：

```bash
./scripts/pack-resources.sh
```

这将创建一个新的 ZIP 文件及其 SHA256 校验和文件。

## ⚠️ 注意事项

- ZIP 文件较大（约 210MB），不会被 Git 跟踪（已在 .gitignore 中配置）
- SHA256 校验和文件会被 Git 跟踪，用于验证文件完整性
- 部署脚本会自动从此目录查找并使用最新的资源包
