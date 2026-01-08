# Cloudflare Pages 部署配置

## ✅ 已完成的修改

1. ✅ 修改了 `next.config.js`，根据环境变量自动切换 basePath
2. ✅ 添加了 `build:gh` 和 `build:cf` 构建脚本
3. ✅ 安装了 `cross-env` 依赖
4. ✅ 更新了 GitHub Actions 工作流

---

## 🚀 Cloudflare Pages 配置步骤

### 1. 连接 GitHub 仓库

1. 访问：https://dash.cloudflare.com/
2. 左侧菜单：**Workers & Pages**
3. 点击 **"Create application"** → **"Pages"** → **"Connect to Git"**
4. 选择 **GitHub**，授权访问
5. 选择仓库：**`MyraWang0406/PSM-DID-uplift`**

### 2. 配置构建设置

在 Cloudflare Pages 配置页面填写：

```
Project name: psm-did-uplift
Production branch: main

Framework preset: Next.js (Static HTML Export)

Build command: npm run build:cf

Build output directory: out

Root directory: / (默认，留空)

Node version: 20 (或默认)
```

### 3. 环境变量（可选）

通常不需要环境变量，但如果需要可以添加：
- `DEPLOY_TARGET=cloudflare`（已在构建命令中设置，不需要单独添加）

### 4. 保存并部署

点击 **"Save and Deploy"**，等待 2-3 分钟完成部署。

---

## 📋 Cloudflare Pages 配置总结

### 关键配置项：

| 配置项 | 值 |
|--------|-----|
| **Build command** | `npm run build:cf` |
| **Build output directory** | `out` |
| **Framework preset** | `Next.js (Static HTML Export)` |
| **Node version** | `20` (或默认) |

---

## 🔄 自动部署

配置完成后，每次推送到 `main` 分支，Cloudflare Pages 会自动：
1. 检测代码变更
2. 运行 `npm install`
3. 运行 `npm run build:cf`（使用 Cloudflare 配置）
4. 部署 `out/` 目录

---

## ✅ 验证部署

部署成功后访问 Cloudflare 提供的 URL（如：`https://psm-did-uplift.pages.dev`），检查：
- ✅ 页面正常加载（不再有 404 错误）
- ✅ 蓝色水波标题显示正常
- ✅ 表格和图表正常显示
- ✅ JSON 数据正常加载
- ✅ 右下角联系信息显示正常

---

## 🆚 双平台支持

现在项目同时支持：

### GitHub Pages
- 构建命令：`npm run build:gh`
- basePath: `/PSM-DID-uplift`
- 访问地址：`https://myrawang0406.github.io/PSM-DID-uplift/`

### Cloudflare Pages
- 构建命令：`npm run build:cf`
- basePath: ``（空，根路径）
- 访问地址：`https://psm-did-uplift.pages.dev`（或自定义域名）

---

## 🐛 如果还有问题

1. **检查构建日志**：在 Cloudflare Pages 的部署日志中查看是否有错误
2. **确认构建命令**：确保使用的是 `npm run build:cf`
3. **检查输出目录**：确保 `out/` 目录存在且包含文件
4. **清除缓存**：如果还有问题，尝试清除 Cloudflare 缓存

---

## 📝 本地测试

如果想在本地测试 Cloudflare 构建：

```bash
npm run build:cf
```

然后检查 `out/` 目录中的文件，确保路径都是相对路径（没有 `/PSM-DID-uplift` 前缀）。

