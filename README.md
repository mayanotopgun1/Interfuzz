# InterFuzz 前端展示系统

以 React 18 + TypeScript + Vite + Tailwind 实现的展示站点，包含宏观介绍、原理说明、图对比 Demo（seed → mut）与效果展示（bug 案例）。

## 快速开始

### 使用部署脚本（推荐）

本项目包含大型资源文件（JDK 和种子文件，约 422MB），需要通过部署脚本自动下载：

```bash
# 1. 克隆项目
git clone https://github.com/Qeryu/Interfuzz-1.git
cd Interfuzz-1

# 2. 运行部署脚本
export INTERFUZZ_RESOURCES_URL='https://github.com/Qeryu/Interfuzz-1/releases/download/v1.0.0/interfuzz-resources.zip'
chmod +x scripts/deploy.sh
./scripts/deploy.sh

# 3. 启动开发服务器
npm run dev
```

**或使用本地资源文件：**

```bash
./scripts/deploy.sh /path/to/interfuzz-resources.zip
npm run dev
```

详细部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 资源文件下载

- **下载地址**: [interfuzz-resources.zip](https://github.com/Qeryu/Interfuzz-1/releases/latest) (~200MB)
- **包含内容**: JDK 17.0.7 + 种子文件
- **SHA256**: 见 releases 页面

## 开发

```bash
npm install
npm run dev
```

访问 http://localhost:5173

## 构建

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 功能特性

### 核心功能
- 🎯 **种子生成**: 批量生成测试用例，支持自定义数量和迭代次数
- 📊 **实时进度**: 显示生成进度和预计完成时间
- 📦 **智能打包**: 每个测试用例自动打包为 ZIP 文件
- 📥 **批量下载**: 一键下载所有测试用例
- 🔄 **自动重试**: 生成失败自动重试，确保成功率
- 📝 **详细日志**: 完整的生成日志，便于调试

### 内置资源
- ☕ **内置 JDK**: Eclipse Temurin 17.0.7，无需单独安装
- 🌱 **种子文件**: 预置多个 Java 测试种子
- 🚀 **开箱即用**: 运行部署脚本即可使用

## 技术栈
- React 18 + TypeScript
- Vite
- Tailwind CSS（暗色主题）
- react-router-dom
- d3 v7（绘图）
- elkjs（可选，自动布局；CDN 回退可用）
- lucide-react（图标）

## 目录结构（节选）
```
public/
  graphs/seed.json
  graphs/mut.json
src/
  pages/{Home,Principle,Demo,Effects}.tsx
  components/{GraphViewer,Toolbar,Card,BugCase}.tsx
  hooks/useFetchJSON.ts
  lib/d3Interop.ts
  styles/globals.css
  data/bug-cases.json
```

## 备注
- ELK 可通过 npm 包（elkjs）或在 `index.html` 启用 CDN 脚本。
- 所有术语/概念以 “InterFuzz 论文” 为准；页脚注明来源。
