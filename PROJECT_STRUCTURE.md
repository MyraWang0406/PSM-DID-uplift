# 项目结构说明

## 📁 完整项目结构

```
AI 导购 渠道质量评判 PSM DID uplift/
│
├── app/                                    # Next.js App Router 目录
│   ├── layout.tsx                         # 根布局组件（包含 metadata）
│   ├── page.tsx                            # 首页（Dashboard 入口）
│   └── globals.css                        # 全局样式文件
│
├── components/                             # React 组件目录
│   ├── Dashboard.tsx                       # Dashboard 主组件（数据加载和布局）
│   ├── FunnelTable.tsx                     # 渠道漏斗表组件
│   ├── UpliftTable.tsx                     # PSM Uplift 表组件（含可信度标签）
│   └── DIDChart.tsx                        # DID 折线图组件（Lead/Order 对比）
│
├── public/                                 # 静态资源目录
│   ├── funnel_by_channel.json              # 渠道漏斗数据（会话/询单/下单）
│   ├── uplift_by_channel.json             # PSM Uplift 数据（提升率+可信度）
│   └── did_timeseries.json                 # DID 时间序列数据（周级数据）
│
├── package.json                            # 项目依赖配置
├── tsconfig.json                           # TypeScript 配置
├── next.config.js                          # Next.js 配置
├── .gitignore                              # Git 忽略文件
│
├── README.md                               # 项目说明文档
├── QUICKSTART.md                           # 快速启动指南
└── PROJECT_STRUCTURE.md                    # 本文件
```

## 📄 文件说明

### App Router 文件

#### `app/layout.tsx`
- Next.js 根布局组件
- 设置页面 metadata（标题、描述）
- 引入全局样式

#### `app/page.tsx`
- Dashboard 首页
- 包含页面标题和描述
- 渲染 Dashboard 主组件

#### `app/globals.css`
- 全局样式定义
- SaaS 风格的基础样式
- 浅色主题配色

### 组件文件

#### `components/Dashboard.tsx`
- **功能**：主 Dashboard 组件
- **职责**：
  - 从 `/public` 加载三个 JSON 文件
  - 管理加载状态
  - 布局三个子模块
- **数据流**：使用 `useEffect` 和 `useState` 管理数据

#### `components/FunnelTable.tsx`
- **功能**：渠道漏斗表
- **展示**：
  - 渠道名称
  - 会话数、询单数、下单数
  - 询单率、下单率、转化率
- **样式**：SaaS 风格表格

#### `components/UpliftTable.tsx`
- **功能**：PSM Uplift 表
- **展示**：
  - 渠道名称
  - Lead 提升率、Order 提升率（带颜色）
  - 样本量
  - 可信度标签（高/中/低，带颜色）
- **排序**：按可信度（高→中→低）+ Lead 提升率（高→低）

#### `components/DIDChart.tsx`
- **功能**：DID 时间序列折线图
- **展示**：
  - Lead 率对比图（AI On vs AI Off）
  - Order 率对比图（AI On vs AI Off）
- **图表库**：Recharts
- **特性**：标注活动周

### 配置文件

#### `package.json`
- 项目依赖：
  - `next`: Next.js 框架
  - `react`: React 库
  - `react-dom`: React DOM
  - `recharts`: 图表库
- 开发依赖：
  - `typescript`: TypeScript 编译器
  - `@types/*`: TypeScript 类型定义

#### `tsconfig.json`
- TypeScript 编译配置
- 路径别名：`@/*` 指向项目根目录

#### `next.config.js`
- Next.js 配置
- 启用 React Strict Mode

### 数据文件（public/）

#### `funnel_by_channel.json`
```json
[
  {
    "channel": "SEM",
    "sessions": 4225,
    "leads": 241,
    "orders": 69,
    "lead_rate": 5.70,
    "order_rate": 1.63,
    "conversion_rate": 28.63
  },
  ...
]
```

#### `uplift_by_channel.json`
```json
[
  {
    "channel": "YouTube",
    "lead_uplift": 166.67,
    "order_uplift": 166.67,
    "sample_size": 1233,
    "confidence": "中"
  },
  ...
]
```

#### `did_timeseries.json`
```json
[
  {
    "week": 1,
    "week_range": "2025-01-01 至 2025-01-07",
    "group": "treatment",
    "period": "pre",
    "lead_rate": 4.35,
    "order_rate": 1.51,
    "lead_count": 1724,
    "order_count": 1724,
    "is_campaign_week": false
  },
  ...
]
```

## 🎨 设计规范

### 颜色方案
- **背景色**：`#f5f7fa`（浅灰）
- **卡片背景**：`#ffffff`（白色）
- **主文字**：`#1a202c`（深灰）
- **次要文字**：`#718096`（中灰）
- **边框**：`#e2e8f0`（浅灰边框）
- **正向效果**：`#10b981`（绿色）
- **负向效果**：`#ef4444`（红色）

### 可信度标签颜色
- **高**：绿色系（`#d4edda` 背景，`#155724` 文字）
- **中**：黄色系（`#fff3cd` 背景，`#856404` 文字）
- **低**：红色系（`#f8d7da` 背景，`#721c24` 文字）

### 间距规范
- **卡片间距**：`24px`
- **卡片内边距**：`24px`
- **表格单元格内边距**：`12px`
- **标题下边距**：`20px`

## 🚀 启动流程

1. **安装依赖**：`npm install`
2. **启动开发服务器**：`npm run dev`
3. **访问应用**：`http://localhost:3000`

## 📊 数据流程

```
CSV 文件 (psm_uplift_results.csv, did_time_series.csv, raw_comparison_results.csv)
    ↓
generate_json_data.py (Python 脚本)
    ↓
JSON 文件 (public/*.json)
    ↓
Dashboard.tsx (fetch 数据)
    ↓
子组件 (FunnelTable, UpliftTable, DIDChart)
    ↓
渲染到页面
```

## 🔄 更新数据

如果需要更新数据：

1. 更新 CSV 文件
2. 运行 `python generate_json_data.py`
3. JSON 文件会自动更新到 `public/` 目录
4. 刷新浏览器即可看到新数据


