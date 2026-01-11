# 部署说明

## 部署到 GitHub Pages

### 1. 准备工作

确保你的 GitHub 仓库已创建：https://github.com/MyraWang0406/PSM-DID-uplift

### 2. 配置 GitHub Pages

1. 进入仓库 Settings
2. 找到 Pages 设置
3. Source 选择 "GitHub Actions"

### 3. 推送代码

```bash
# 初始化 git（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/MyraWang0406/PSM-DID-uplift.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: AI导购效果分析看板"

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 4. 自动部署

推送代码后，GitHub Actions 会自动：
1. 安装依赖
2. 构建项目
3. 部署到 GitHub Pages

### 5. 访问地址

部署完成后，访问地址为：
```
https://myrawang0406.github.io/PSM-DID-uplift/
```

## 本地开发

```bash
npm install
npm run dev
```

访问：http://localhost:3000

## 构建生产版本

```bash
npm run build
```

构建输出在 `out/` 目录。


