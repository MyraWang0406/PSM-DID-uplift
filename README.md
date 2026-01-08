# AI导购效果分析 Dashboard

基于 Next.js + React 的数据看板，展示AI导购在各渠道的效果分析。

🌐 **在线访问**: [https://myrawang0406.github.io/PSM-DID-uplift/](https://myrawang0406.github.io/PSM-DID-uplift/)

📧 **联系作者**: myrawzm0406@163.com | 15301052620

## 功能模块

1. **渠道漏斗表** - 展示各渠道的会话、询单、下单数据及转化率
2. **PSM Uplift 表** - 展示精准匹配后的提升率，包含可信度标签
3. **DID 折线图** - 展示AI开启/关闭组的时间序列对比（Lead率和Order率）

## 技术栈

- Next.js 14 (App Router)
- React 18
- TypeScript
- Recharts (图表库)

## 项目结构

```
.
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   └── globals.css         # 全局样式
├── components/
│   ├── Dashboard.tsx       # Dashboard 主组件
│   ├── FunnelTable.tsx     # 渠道漏斗表组件
│   ├── UpliftTable.tsx     # PSM Uplift 表组件
│   └── DIDChart.tsx        # DID 折线图组件
├── public/
│   ├── funnel_by_channel.json    # 渠道漏斗数据
│   ├── uplift_by_channel.json    # PSM Uplift 数据
│   └── did_timeseries.json       # DID 时间序列数据
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 安装和启动

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 访问应用

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 构建生产版本

```bash
npm run build
```

构建输出在 `out/` 目录。

## 部署到 GitHub Pages

详细部署说明请查看 [DEPLOY.md](./DEPLOY.md)

快速部署步骤：

1. 推送代码到 GitHub 仓库
2. 在仓库 Settings 中启用 GitHub Pages（选择 GitHub Actions）
3. GitHub Actions 会自动构建和部署

访问地址：`https://myrawang0406.github.io/PSM-DID-uplift/`

## 数据文件

数据文件位于 `/public` 目录：

- `funnel_by_channel.json` - 渠道漏斗数据
- `uplift_by_channel.json` - PSM Uplift 数据
- `did_timeseries.json` - DID 时间序列数据

这些文件可以通过运行 `generate_json_data.py` 脚本从 CSV 文件生成。

## 设计风格

- 浅色主题（SaaS风格）
- 卡片式布局
- 清晰的表格展示
- 标签（Tag）用于可信度标识
- 响应式设计

## 开发说明

- 使用 TypeScript 确保类型安全
- 组件采用函数式组件 + Hooks
- 样式使用内联样式（可替换为 CSS Modules 或 Tailwind CSS）
- 图表使用 Recharts 库

