# 滴灌通超级 Agent 产品 Demo — L1 主入口

## 项目概述
- **项目名称**: Micro Connect 滴灌通超级 Agent 产品 Demo（L1 主入口）
- **目标**: 展示滴灌通 RBF 超级 Agent 产品架构的 Y 型业务流程设计思路，提供统一入口访问所有 9 个"通"产品模块
- **技术栈**: Hono + TypeScript + Tailwind CSS (CDN) + Cloudflare Pages
- **GitHub**: https://github.com/SamZheng-Design/2026-MCI-L1-MAIN-ENTRY

## 本地部署指南

### 前置条件
- Node.js >= 18
- npm >= 9

### 快速启动

```bash
# 1. 克隆仓库
git clone https://github.com/SamZheng-Design/2026-MCI-L1-MAIN-ENTRY.git
cd 2026-MCI-L1-MAIN-ENTRY

# 2. 安装依赖
npm install

# 3. 构建项目
npm run build

# 4. 本地预览（方式一：使用 wrangler）
npx wrangler pages dev dist --port 3000

# 4. 本地预览（方式二：使用 PM2 守护进程）
pm2 start ecosystem.config.cjs

# 5. 打开浏览器访问
# http://localhost:3000
```

### 部署到 Cloudflare Pages（可选）

```bash
# 首次创建项目
npx wrangler pages project create my-project-name --production-branch main

# 部署
npm run build && npx wrangler pages deploy dist --project-name my-project-name
```

### 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run build` | Vite 构建，输出到 dist/ |
| `npm run dev` | Vite 开发模式（HMR） |
| `npm run preview` | Wrangler 本地预览 |
| `npm run deploy` | 构建 + 部署到 Cloudflare Pages |

## 首页设计

### 核心设计
1. **Splash 启屏动画** — 首次进入展示品牌动画 Connect Worldwide Opportunities
2. **Welcome 滑块弹窗** — 4 页产品设计精华介绍（操作系统→Y 型架构→AI 筛子→全流程闭环）
3. **全屏 Hero** — 深色科技感背景 + 品牌 Logo + 身份通 CTA
4. **叙事式产品旅程** — 5 个阶段按故事线展开，每个阶段含产品链接和可视化插图
5. **双通道价值主张** — 投资者 vs 融资企业各自工具链
6. **统一底座展示** — Account + Data + AI 三层基础设施

### 首页布局
```
┌─────────────────────────────────────┐
│  Splash Screen (品牌启屏, 首次进入)   │
├─────────────────────────────────────┤
│  Welcome Modal (4页滑块弹窗)         │
│  操作系统 → Y型架构 → AI筛子 → 闭环  │
├─────────────────────────────────────┤
│  Full-screen Hero (aurora背景)       │
│  • 品牌Logo + 标语                   │
│  • 身份通CTA + 探索旅程CTA           │
│  • 数据指标 (5阶段·9Agent·AI·∞行业)  │
├─────────────────────────────────────┤
│  Flow Overview (5阶段导航)           │
├─────────────────────────────────────┤
│  5个叙事区块 (每个含插图+产品链接)    │
│  STEP 01: 身份通 (入口分流)          │
│  STEP 02: 发起通 (融资者上传)        │
│  STEP 03: 评估通+风控通+参与通       │
│  STEP 04: 条款通+合约通 (交易达成)   │
│  STEP 05: 结算通+履约通 (投后管理)   │
├─────────────────────────────────────┤
│  Dual Channel (投资者 vs 融资企业)   │
├─────────────────────────────────────┤
│  Foundation (统一底座)               │
├─────────────────────────────────────┤
│  Final CTA — 身份通注册号召          │
└─────────────────────────────────────┘
```

## 核心业务逻辑（Y 型流程）

```
                    ┌──────────┐
                    │  身份通   │  ← 统一入口
                    │ Identity │
                    └────┬─────┘
                         │
                    ┌────┴────┐
                    │  Y分流   │
                    └─┬─────┬─┘
            ┌───────┘       └───────┐
            ▼                       ▼
    ┌──────────────┐      ┌──────────────────┐
    │   融资者路径   │      │    投资者路径      │
    │   发起通      │      │  评估通(筛子①)    │
    │  Originate   │      │  风控通(筛子②)    │
    └──────┬───────┘      │  参与通(看板)      │
           │              └─────────┬────────┘
           └──── 数据穿越管道 ──────┤
                                    ▼
                          ┌──────────────┐
                          │  条款通→合约通  │  ← Y型汇合
                          │  结算通→履约通  │
                          └──────────────┘
```

## 页面路由

### 主页面
| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 官网首页 | Splash + Welcome 弹窗 + Hero + 叙事旅程 + 双通道 + CTA |
| `/design` | 产品设计思路 | Y 型业务流程图、架构总览、设计思路手风琴详解 |
| `/portal` | 产品统一入口 | Tab 切换 5 阶段、阶段化产品卡片 |
| `/about` | 关于我们 | 公司使命、愿景、里程碑、价值观 |
| `/team` | 核心团队 | 管理团队 + 顾问团队 |
| `/news` | 新闻动态 | 新闻列表 |
| `/contact` | 联系我们 | 投资者/融资企业/一般查询 + 办公地址 |

### 产品占位页面（9 个"通"）
| 路径 | 中文名 | 英文名 | 角色归属 | 阶段 |
|------|--------|--------|---------|------|
| `/identity` | 身份通 | Identity Connect | 统一入口 | 入口 |
| `/application` | 发起通 | Originate Connect | 融资者 | 数据上传 |
| `/assess` | 评估通 | Assess Connect | 投资者 | AI 筛子 |
| `/risk` | 风控通 | Risk Connect | 投资者 | AI 筛子 |
| `/opportunity` | 参与通 | Deal Connect | 投资者 | 看板展示 |
| `/terms` | 条款通 | Terms Connect | 双方协同 | 交易达成 |
| `/contract` | 合约通 | Contract Connect | 双方协同 | 交易达成 |
| `/settlement` | 结算通 | Settlement Connect | 双方协同 | 投后管理 |
| `/performance` | 履约通 | Performance Connect | 双方协同 | 投后管理 |

## 已完成功能
- ✅ Splash 启屏动画（sessionStorage 控制不重复）
- ✅ Welcome 滑块弹窗（4 页 + 键盘/触摸支持）
- ✅ 全屏 Hero（aurora 背景 + 品牌 Logo + 双 CTA）
- ✅ 叙事式 5 阶段产品旅程（插图 + 产品链接 + 状态标签）
- ✅ 双通道价值主张（投资者 vs 融资企业）
- ✅ 统一底座展示（Account + Data + AI）
- ✅ /design 页：完整 Y 型流程图 + 数据管道可视化 + 架构总览 + 设计思路手风琴
- ✅ /portal 页：Tab 切换 5 阶段 + 产品卡片详情
- ✅ 9 个产品占位页面（上下产品导航 + 状态/角色标签）
- ✅ 全站中英双语（?lang=en 切换）
- ✅ 全局导航栏（Products 下拉菜单）+ 页脚
- ✅ 响应式设计 + CSS 动画（reveal/fade）

## 数据架构
- **数据源**: 静态 TypeScript 数据层 (`src/data.ts`)
- **i18n**: 全量中英双语 (`src/i18n.ts`)
- **产品角色**: shared / borrower / investor / collaborative
- **产品阶段**: entry / borrower-upload / investor-filter / investor-view / deal / post-investment
- **底座**: Account（角色分流）、Data（数据标准化）、AI（筛子编排）

## 项目结构
```
├── src/
│   ├── index.tsx          # Hono 路由入口
│   ├── renderer.tsx       # HTML 渲染器
│   ├── data.ts            # 产品数据定义
│   ├── i18n.ts            # 中英双语文本
│   ├── components/
│   │   ├── Navbar.tsx     # 全局导航栏
│   │   ├── Footer.tsx     # 全局页脚
│   │   └── Logos.tsx      # Logo 组件
│   └── pages/
│       ├── HomePage.tsx       # 官网首页
│       ├── DesignPage.tsx     # 产品设计思路
│       ├── PortalPage.tsx     # 产品统一入口
│       ├── AboutPage.tsx      # 关于我们
│       ├── TeamPage.tsx       # 核心团队
│       ├── NewsPage.tsx       # 新闻动态
│       ├── ContactPage.tsx    # 联系我们
│       └── PlaceholderPage.tsx # 产品占位模板
├── public/
│   └── static/
│       └── style.css      # 全局样式
├── ecosystem.config.cjs   # PM2 配置
├── wrangler.jsonc         # Cloudflare 配置
├── vite.config.ts         # Vite 构建配置
├── tsconfig.json          # TypeScript 配置
└── package.json           # 项目依赖
```

## 许可
Private — Micro Connect Group © 2026
