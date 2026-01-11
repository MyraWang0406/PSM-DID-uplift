# Cloudflare Pages 部署指南

## 📋 部署前准备

### 1. 构建配置检查

项目已配置为静态导出（`output: 'export'`），可以直接部署到 Cloudflare Pages。

**构建输出目录：** `out/`

**构建命令：** `npm run build`

---

## 🚀 方法一：通过 GitHub 自动部署（推荐）

### 步骤：

1. **登录 Cloudflare Dashboard**
   - 访问：https://dash.cloudflare.com/
   - 登录你的账户

2. **创建 Pages 项目**
   - 点击左侧菜单 "Workers & Pages"
   - 点击 "Create application" → "Pages" → "Connect to Git"
   - 选择 GitHub，授权访问你的仓库

3. **选择仓库**
   - 选择：`MyraWang0406/PSM-DID-uplift`
   - 点击 "Begin setup"

4. **配置构建设置**
   - **Project name**: `psm-did-uplift`（或自定义）
   - **Production branch**: `main`
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Root directory**: `/`（默认）

5. **环境变量（可选）**
   - 通常不需要环境变量
   - 如果有需要，可以在这里添加

6. **点击 "Save and Deploy"**

### 自动部署

- 每次推送到 `main` 分支，Cloudflare 会自动重新部署
- 部署完成后会给你一个 URL，格式：`https://psm-did-uplift.pages.dev`

---

## 🖥️ 方法二：通过 Wrangler CLI 部署

### 安装 Wrangler

```bash
npm install -g wrangler
```

### 登录 Cloudflare

```bash
wrangler login
```

### 本地构建

```bash
npm run build
```

### 部署到 Cloudflare Pages

```bash
wrangler pages deploy out --project-name=psm-did-uplift
```

---

## ⚙️ 方法三：使用 Cloudflare Pages 配置文件

创建 `wrangler.toml` 文件（可选）：

```toml
name = "psm-did-uplift"
compatibility_date = "2024-01-01"

[env.production]
pages_build_output_dir = "out"
```

然后使用：

```bash
npm run build
wrangler pages deploy out
```

---

## 📝 部署命令总结

### 完整部署流程：

```bash
# 1. 安装依赖（如果还没有）
npm install

# 2. 构建项目
npm run build

# 3. 部署到 Cloudflare Pages
wrangler pages deploy out --project-name=psm-did-uplift
```

### 一键部署脚本：

```bash
npm install && npm run build && wrangler pages deploy out --project-name=psm-did-uplift
```

---

## ✅ 验证部署

部署成功后，访问 Cloudflare 提供的 URL，检查：
- ✅ 页面正常加载
- ✅ 蓝色水波标题显示正常
- ✅ 表格和图表正常显示
- ✅ 右下角联系信息显示正常

---

## 🔄 持续部署

### 通过 GitHub 自动部署（推荐）

1. 在 Cloudflare Pages 中连接 GitHub 仓库
2. 配置构建设置（如上）
3. 每次 `git push` 到 `main` 分支，Cloudflare 会自动：
   - 拉取最新代码
   - 运行 `npm install`
   - 运行 `npm run build`
   - 部署 `out/` 目录

### 手动部署

```bash
# 本地修改后
git add .
git commit -m "Update: 描述你的修改"
git push origin main

# 如果使用 CLI
npm run build
wrangler pages deploy out --project-name=psm-did-uplift
```

---

## 🆚 GitHub Pages vs Cloudflare Pages

### GitHub Pages
- ✅ 免费
- ✅ 与 GitHub 集成
- ⚠️ 构建时间可能较长
- ⚠️ 需要配置 GitHub Actions

### Cloudflare Pages
- ✅ 免费
- ✅ 全球 CDN，速度快
- ✅ 自动 HTTPS
- ✅ 构建速度快
- ✅ 支持预览部署
- ✅ 更好的性能

---

## 📞 需要帮助？

如果遇到问题：
1. 检查构建日志中的错误信息
2. 确认 `out/` 目录已生成
3. 检查 `package.json` 中的构建脚本
4. 查看 Cloudflare Pages 的部署日志


