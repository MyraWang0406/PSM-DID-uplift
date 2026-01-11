# PowerShell 部署脚本

Write-Host "🚀 开始部署到 GitHub..." -ForegroundColor Green

# 检查 git 是否初始化
if (-not (Test-Path ".git")) {
    Write-Host "📦 初始化 Git 仓库..." -ForegroundColor Yellow
    git init
}

# 添加远程仓库（如果不存在）
$remoteExists = git remote | Select-String -Pattern "origin"
if (-not $remoteExists) {
    Write-Host "🔗 添加远程仓库..." -ForegroundColor Yellow
    git remote add origin https://github.com/MyraWang0406/PSM-DID-uplift.git
}

# 添加所有文件
Write-Host "📝 添加文件..." -ForegroundColor Yellow
git add .

# 提交
Write-Host "💾 提交更改..." -ForegroundColor Yellow
git commit -m "Deploy: AI导购效果分析看板 - 添加蓝色水波标题和联系信息"

# 推送到 main 分支
Write-Host "🚀 推送到 GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host "🌐 访问地址: https://myrawang0406.github.io/PSM-DID-uplift/" -ForegroundColor Cyan


