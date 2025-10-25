# InterFuzz 前端展示系统

以 React 18 + TypeScript + Vite + Tailwind 实现的展示站点，包含宏观介绍、原理说明、图对比 Demo（seed → mut）与效果展示（bug 案例）。

## 开发

```powershell
# Windows PowerShell
npm i
npm run dev
```

## 构建

```powershell
npm run build
npm run preview
```

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
