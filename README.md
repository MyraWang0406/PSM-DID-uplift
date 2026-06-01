# PSM-DID-Uplift: Causal Reasoning Prototype for Traffic Attribution

This repository contains a research prototype for exploring how causal inference concepts can support more inspectable traffic attribution and operational decision-making.

The system is not intended as a production causal inference platform. It is a prototype for studying how methods such as PSM, DID, and uplift modeling can be translated into decision-support workflows for product and growth teams.

## Project Information

| Item | Description |
|---|---|
| Status | Research prototype / Work in progress |
| Repository | https://github.com/MyraWang0406/PSM-DID-uplift |
| Live Demo | https://traffic-attribution.myrawzm0406.online/ |
| Research Area | Causal Reasoning, Decision Support, Product Analytics, Human-AI Collaboration |
| Main Methods | PSM, DID, uplift reasoning, dashboard-based interpretation |
| Intended Use | Research demonstration, not production deployment |

## Research Motivation

Product and growth teams often need to evaluate whether a traffic source, campaign, notification strategy, or intervention actually caused an outcome.

In practice, many decisions are made from surface-level metrics such as conversion rate, click-through rate, or retention change. These metrics are useful, but they can be misleading when user groups differ, interventions are not randomly assigned, or external factors change over time.

This prototype explores how causal inference concepts can be represented in a more understandable and inspectable decision-support interface.

## Research Questions

RQ1. How can causal inference concepts be presented to non-expert operators in an interpretable decision-support workflow?

RQ2. How can traffic attribution systems help users distinguish correlation, selection bias, and possible causal effect?

RQ3. How can dashboards support causal reasoning without overstating statistical certainty?

## System Overview

The prototype demonstrates a traffic attribution workflow that connects business questions with causal reasoning methods.

It explores how users can inspect:

- treatment and control groups
- before-and-after changes
- possible selection bias
- matched comparison groups
- uplift differences
- uncertainty in interpretation
- recommended next analysis steps

## Core Features

- Traffic source comparison
- Treatment / control group view
- PSM-inspired matching explanation
- DID-inspired before-after comparison
- Uplift-oriented segment interpretation
- Dashboard-based causal diagnosis
- Decision-support summary

## System Contribution

This prototype is not only a dashboard. Its main contribution is translating causal reasoning into an interaction workflow.

It explores how product or growth operators can move from:

```text
metric changed

# AI导购效果分析 Dashboard

基于 Next.js + React 的数据看板，展示AI导购在各渠道的效果分析。

🌐 **在线访问**: [https://myrawang0406.github.io/PSM-DID-uplift/]

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

