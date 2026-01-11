#!/bin/bash

# 部署脚本 - 推送到 GitHub

echo "🚀 开始部署到 GitHub..."

# 检查 git 是否初始化
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
fi

# 添加远程仓库（如果不存在）
if ! git remote | grep -q "origin"; then
    echo "🔗 添加远程仓库..."
    git remote add origin https://github.com/MyraWang0406/PSM-DID-uplift.git
fi

# 添加所有文件
echo "📝 添加文件..."
git add .

# 提交
echo "💾 提交更改..."
git commit -m "Deploy: AI导购效果分析看板 - 添加蓝色水波标题和联系信息"

# 推送到 main 分支
echo "🚀 推送到 GitHub..."
git branch -M main
git push -u origin main

echo "✅ 部署完成！"
echo "🌐 访问地址: https://myrawang0406.github.io/PSM-DID-uplift/"


