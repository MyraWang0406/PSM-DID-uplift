# Cloudflare Pages 快速部署指南

## ✅ 当前状态

代码已成功推送到 GitHub，但 GitHub Pages 需要：
1. 在 Settings → Pages 中启用 GitHub Actions
2. 等待 Actions 自动构建和部署

---

## 🚀 Cloudflare Pages 部署（推荐，更快更简单）

### 方式一：通过 Web 界面（最简单，推荐）

#### 步骤：

1. **访问 Cloudflare Dashboard**
   - https://dash.cloudflare.com/
   - 登录你的账户

2. **创建 Pages 项目**
   - 左侧菜单：**Workers & Pages**
   - 点击 **"Create application"**
   - 选择 **"Pages"** → **"Connect to Git"**

3. **连接 GitHub**
   - 选择 **GitHub**
   - 授权 Cloudflare 访问你的仓库
   - 选择仓库：**`MyraWang0406/PSM-DID-uplift`**

4. **配置构建设置**
   ```
   Project name: psm-did-uplift
   Production branch: main
   Framework preset: Next.js (Static HTML Export)
   Build command: npm run build
   Build output directory: out
   Root directory: / (默认)
   ```

5. **点击 "Save and Deploy"**

6. **等待部署完成**（通常 2-3 分钟）

7. **访问你的网站**
   - URL 格式：`https://psm-did-uplift.pages.dev`
   - 或者你可以自定义域名

---

### 方式二：通过命令行（CLI）

#### 安装 Wrangler

```bash
npm install -g wrangler
```

#### 登录 Cloudflare

```bash
wrangler login
```
（会打开浏览器让你登录）

#### 部署命令

```bash
# 1. 构建项目
npm run build

# 2. 部署到 Cloudflare Pages
wrangler pages deploy out --project-name=psm-did-uplift
```

#### 一键部署脚本

```bash
npm run build && wrangler pages deploy out --project-name=psm-did-uplift
```

---

## ⚙️ 重要配置说明

### 当前配置（GitHub Pages）

你的 `next.config.js` 中有：
```javascript
basePath: '/PSM-DID-uplift'
```

**如果部署到 Cloudflare Pages，需要修改：**

#### 选项 1：修改为 Cloudflare 配置

```javascript
basePath: '',  // Cloudflare Pages 不需要 basePath
```

#### 选项 2：创建两个配置文件

- `next.config.js` - GitHub Pages 用
- `next.config.cloudflare.js` - Cloudflare Pages 用

---

## 📝 快速部署命令（Cloudflare）

### 完整流程：

```bash
# 1. 安装 Wrangler（如果还没有）
npm install -g wrangler

# 2. 登录 Cloudflare
wrangler login

# 3. 构建项目
npm run build

# 4. 部署
wrangler pages deploy out --project-name=psm-did-uplift
```

### 或者使用默认项目名：

```bash
npm run build && wrangler pages deploy out
```

---

## 🆚 GitHub Pages vs Cloudflare Pages

| 特性 | GitHub Pages | Cloudflare Pages |
|------|-------------|------------------|
| 速度 | 中等 | ⚡ 很快（全球 CDN） |
| 构建时间 | 2-5 分钟 | 1-3 分钟 |
| 自动部署 | ✅ 需要配置 Actions | ✅ 自动 |
| 自定义域名 | ✅ 支持 | ✅ 支持 |
| HTTPS | ✅ 自动 | ✅ 自动 |
| 预览部署 | ❌ | ✅ 支持 |

---

## ✅ 验证部署

部署成功后检查：
- ✅ 页面正常加载
- ✅ 蓝色水波标题显示
- ✅ 表格和图表正常
- ✅ 右下角联系信息显示
- ✅ 所有 JSON 数据正常加载

---

## 🔄 持续部署

### Cloudflare Pages 自动部署

一旦连接了 GitHub 仓库，每次 `git push` 到 `main` 分支，Cloudflare 会自动：
1. 检测代码变更
2. 运行 `npm install`
3. 运行 `npm run build`
4. 部署 `out/` 目录

**无需额外配置！**

---

## 💡 推荐

**建议使用 Cloudflare Pages**，因为：
- ✅ 部署更快
- ✅ 全球 CDN，访问速度快
- ✅ 自动 HTTPS
- ✅ 支持预览部署
- ✅ 配置更简单

