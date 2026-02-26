# ═══════════════════════════════════════════════════════════════════════
# 参与通 (Deal Connect) — 全功能独立页面 系统级升级 Prompt
# 目标: 从 PlaceholderPage 占位页升级为 完整独立功能页面
# 属于: Micro Connect 滴灌通 超级Agent产品矩阵 · 第5通 (flowOrder: 5)
# 版本: V20
# 生成日期: 2026-02-26
# ═══════════════════════════════════════════════════════════════════════

## 一、你的角色

你是一名资深全栈产品设计工程师，为 **Micro Connect 滴灌通** 的 RBF (收入分成融资) 超级Agent平台工作。
你正在将「参与通」从现有的占位页 (PlaceholderPage.tsx) 升级为一个完整的独立功能页面。

**必须遵守的原则**：
- 与主站(V20)保持 100% 设计系统一致性
- 所有 UI 组件复用主站的 CSS 类和设计Token
- 中英双语完整支持 (?lang=en 切换)
- 响应式设计 (mobile-first, sm/md/lg/xl 断点)
- Apple 风格 UI 美学：大量留白、精致动效、毛玻璃质感、层次感

---

## 二、产品定位与Y型流程上下文

### 2.1 参与通在Y型流程中的位置

```
                   ┌─── 融资者路径 ──→ 发起通(上传数据)
  身份通(统一入口) ─┤
                   └─── 投资者路径 ──→ 评估通 → 风控通 → 【参与通(看板)】★ 你在这里
                                                ↓
                          Y型汇合点：条款通 → 合约通 → 结算通 → 履约通
```

### 2.2 参与通核心身份

| 属性 | 值 |
|---|---|
| 产品ID (路由) | `opportunity` → URL: `/opportunity` |
| 中文名 | 参与通 |
| 英文名 | Deal Connect |
| 英文简称 | Deal |
| 状态 | live (已上线) |
| 角色归属 | investor (投资者专属) |
| 流程阶段 | investor-view (投资者看板展示) |
| 流程序号 | flowOrder: 5 |
| 主题色-浅 | #D1FAE5 (浅绿) |
| 主题色-深 | #10B981 (翠绿) |
| Logo URL | https://www.genspark.ai/api/files/s/UJuchZc6 |
| 前一步 | 风控通 (Risk Connect, `/risk`, flowOrder: 4) |
| 后一步 | 条款通 (Terms Connect, `/terms`, flowOrder: 6) |

### 2.3 业务逻辑核心

参与通是投资者的**统一项目看板**——展示通过评估通和风控通筛选后的融资项目，投资者在此主动参与投资。

**关键规则**:
- **有筛子** → 只展示通过评估通+风控通双重筛选的项目
- **无筛子** → 展示全量融资项目（保证融资者曝光）
- **数据管道**: `发起通上传 → 评估通筛选 → 风控通筛选 → 参与通展示`

**核心机制**:
1. 融资者在发起通上传的经营数据，进入投资者的评估通进行第一轮筛选
2. 通过评估通的项目，流入风控通进行第二轮筛选
3. 通过双重筛选的项目，出现在参与通看板上
4. 如果投资者没有设置任何筛子，参与通展示所有融资项目（无筛子=全量曝光）

### 2.4 已有功能标签 (i18n定义)

**中文**: 筛后项目看板 / 全量项目浏览 / 项目对比 / 投资意向标记 / 智能推荐
**英文**: Filtered Deal Board / Full Pipeline Browse / Deal Comparison / Intent Marking / Smart Recommendations

---

## 三、现有代码基础 (必须兼容)

### 3.1 技术栈

- **框架**: Hono (v4+) + TypeScript + JSX (Hono内置JSX, 非React)
- **部署**: Cloudflare Pages (Workers运行时, 非Node.js)
- **前端**: Tailwind CSS (CDN运行时编译) + FontAwesome 6.4 + 自定义CSS设计系统 (`/static/style.css`)
- **字体**: Inter (英文主体) + Montserrat (品牌/Logo/数字) + Noto Sans SC (中文)
- **SSR**: Hono JSX服务端渲染 (无客户端水合, 纯HTML输出)
- **数据**: 纯静态 TypeScript mock数据 (无数据库, 无API调用)
- **i18n**: 自建双语系统, `?lang=en` URL参数切换, 默认中文

### 3.2 项目文件结构

```
webapp/
├── src/
│   ├── index.tsx          # Hono应用入口 & 路由注册
│   ├── renderer.tsx       # 全局HTML外壳 (head/meta/Tailwind配置)
│   ├── data.ts            # 产品数据层 (9个"通"的完整数据模型)
│   ├── i18n.ts            # 国际化翻译层 (全量中英双语)
│   ├── components/
│   │   ├── Navbar.tsx     # 全局顶部导航栏 (sticky, 毛玻璃, 移动端菜单)
│   │   ├── Footer.tsx     # 深色Aurora主题页脚
│   │   └── Logos.tsx      # SVG品牌Logo & 产品Logo组件
│   └── pages/
│       ├── HomePage.tsx       # 首页 (Splash+Welcome+Hero+叙事旅程)
│       ├── DesignPage.tsx     # 设计思路 (Y型流程图+架构总览)
│       ├── PortalPage.tsx     # 产品入口 (Tab切换5阶段+产品卡片)
│       ├── PlaceholderPage.tsx # 产品占位页 (当前参与通使用此模板)
│       ├── AboutPage.tsx
│       ├── TeamPage.tsx
│       ├── NewsPage.tsx
│       └── ContactPage.tsx
├── public/
│   └── static/
│       └── style.css      # 自定义设计系统CSS (1700行)
├── wrangler.jsonc
├── vite.config.ts
├── tsconfig.json
├── package.json
└── ecosystem.config.cjs
```

### 3.3 路由注册 (index.tsx) — 当前实现

参与通当前通过 productIds 数组动态注册，渲染通用 PlaceholderPage:
```typescript
import { Hono } from 'hono'
import { renderer } from './renderer'
import { getLangFromQuery, tt, t } from './i18n'
import { PlaceholderPage } from './pages/PlaceholderPage'

const app = new Hono()
app.use(renderer)

// 产品占位页路由 — 动态生成9个产品路由
const productIds = [
  'identity', 'application', 'assess',
  'risk', 'opportunity', 'terms', 'contract',
  'settlement', 'performance'
]
productIds.forEach((id) => {
  app.get(`/${id}`, (c) => {
    const lang = getLangFromQuery(c.req.url)
    return c.render(<PlaceholderPage productId={id} lang={lang} />, { title: `${id} - Micro Connect`, lang })
  })
})

export default app
```

**升级后**: 需要将 `opportunity` 从 productIds 数组中移除，单独注册路由指向新的 DealConnectPage 组件:
```typescript
import { DealConnectPage } from './pages/DealConnectPage'

// 从 productIds 中移除 'opportunity'
const productIds = [
  'identity', 'application', 'assess',
  'risk', /* 'opportunity' 已独立 */ 'terms', 'contract',
  'settlement', 'performance'
]

// 参与通独立路由
app.get('/opportunity', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(<DealConnectPage lang={lang} />, { title: tt(t.titles.dealConnect ?? { zh: '参与通 - Micro Connect 滴灌通', en: 'Deal Connect - Micro Connect' }, lang), lang })
})
```

### 3.4 必须复用的共享组件

```typescript
// 全局导航栏 — sticky顶部, 毛玻璃, 移动端汉堡菜单, 语言切换
import { Navbar } from '../components/Navbar'
// 用法: <Navbar active="opportunity" lang={l} />

// 深色Aurora页脚 — 品牌/产品链接/联系方式/免责声明
import { Footer } from '../components/Footer'
// 用法: <Footer lang={l} />

// 产品Logo — SVG双圆叠合标识, 大尺寸版(PlaceholderPage头部)
import { ProductLogo } from '../components/Logos'
// 用法: <ProductLogo name="参与通" englishShort="Deal" size={96} />

// 产品Logo — 小尺寸版(卡片/列表)
import { ProductLogoSmall } from '../components/Logos'
// 用法: <ProductLogoSmall name="参与通" englishShort="Deal" size={48} />
```

### 3.5 必须复用的数据层

```typescript
// 产品数据 — 9个"通"的完整数据模型
import { products, getProductUrl, isExternalProduct, mainFlowProducts } from '../data'
// products: Product[] — 全部9个产品
// getProductUrl(product): string — 返回内部URL或externalUrl
// isExternalProduct(product): boolean — 是否跳转外部应用
// mainFlowProducts: Product[] — 按flowOrder排序的产品列表

// 国际化工具
import type { Lang } from '../i18n'
import {
  langLink,           // (href, lang) => 带?lang参数的URL
  tt,                 // (biObj, lang) => 取对应语言的字符串
  t,                  // 翻译树根对象
  getProductName,     // (id, lang) => 产品名称
  getProductDesc,     // (id, lang) => 产品描述
  getProductFeatures, // (id, lang) => 功能标签数组
  getProductShort,    // (id, lang) => 一句话简述
  getCategoryName,    // (zhName, lang) => 分类名翻译
  getStatusLabel,     // (status, lang) => { text, class }
  getRoleLabel,       // (role, lang) => { text, icon, class }
} from '../i18n'
```

### 3.6 现有PlaceholderPage结构 (参与通当前渲染此页面, 需要被替换)

当前 `/opportunity` 渲染 PlaceholderPage，包含:
1. **面包屑导航** — 首页 > 产品入口 > 参与通
2. **Hero Section** — ProductLogo(96px) + 状态徽章(live/绿) + 名称 + 英文简称 + 描述 + 分类/角色/AI筛子标签
3. **Features Grid** — 5个功能编号卡片 (grid-cols-1 sm:grid-cols-2)
4. **Coming Soon 提示区** — "功能开发中" + 返回产品入口按钮
5. **Prev/Next 前后导航** — 风控通(←) / 条款通(→), 支持外部链接检测

---

## 四、设计系统规范 (必须严格遵守)

### 4.1 品牌色系 (Tailwind自定义色 — renderer.tsx中定义)

| Tailwind Token | 色值 | 用途 |
|---|---|---|
| `brand` / `brand-DEFAULT` | #5DC4B3 | 主品牌色 (按钮/链接/CTA/强调) |
| `brand-light` | #7DD4C7 | 浅品牌色 (hover背景) |
| `brand-dark` | #3D8F83 | 深品牌色 (hover文字/active) |
| `brand-accent` | #49A89A | 辅助品牌色 |
| `logo-bright` | #2EC4B6 | Logo亮绿 |
| `logo-bright2` | #3DD8CA | Logo渐变终点 |
| `logo-deep` | #28A696 | Logo渐变起点 |

### 4.2 参与通专属色 (硬编码, 不在Tailwind配置中)

| Token | 色值 | 用途 |
|---|---|---|
| color (浅) | #D1FAE5 | 参与通浅背景/高亮区 |
| colorDark (深) | #10B981 | 参与通标题/图标/强调色 |

### 4.3 语义色 (Tailwind自定义: `semantic-*`)

| Tailwind Token | 色值 | 用途 |
|---|---|---|
| `semantic-info` | #32ade6 | 信息提示/链接 |
| `semantic-success` | #34c759 | 成功/已通过/在线 |
| `semantic-warning` | #ff9f0a | 警告/待审核 |
| `semantic-error` | #ff375f | 错误/拒绝/高风险 |

**额外色值** (CSS变量):
| 名称 | 色值 | 用途 |
|---|---|---|
| Indigo | #6366F1 | AI筛子/评估通/风控通相关 |
| Violet | #8B5CF6 | 协同/条款通/合约通相关 |

### 4.4 文字层次 (Tailwind自定义: `text-*`)

| Tailwind Token | 色值 | 用途 |
|---|---|---|
| `text-primary` | #1d1d1f | 标题/正文主色 (**禁止使用纯黑#000000**) |
| `text-title` | #1a1a1a | 大标题 |
| `text-secondary` | #6e6e73 | 辅助文字/说明 |
| `text-tertiary` | #86868b | 三级文字/标签 |
| `text-placeholder` | #aeaeb2 | 占位/极浅灰 |

### 4.5 容器色 (Tailwind自定义: `surface-*`)

| Token | 值 | 用途 |
|---|---|---|
| `surface-page` | #f5f5f7 | 页面背景 |
| `surface-card` | rgba(255,255,255,0.88) | 卡片背景(毛玻璃) |
| `surface-divider` | #f1f5f9 | 分割线/分隔区 |

### 4.6 圆角预设 (Tailwind扩展)

| Tailwind类 | 值 | 用途 |
|---|---|---|
| `rounded-xs` | 4px | 小标签/badge |
| `rounded-sm` | 8px | 按钮/输入框 |
| `rounded-md` | 12px | 卡片内元素 |
| `rounded-lg` | 16px | 中型卡片 |
| `rounded-xl` | 20px | 大型卡片 |
| `rounded-2xl` | 24px | 弹窗/面板 |
| `rounded-3xl` | 32px | 全宽区块 |

### 4.7 阴影层次 (CSS变量 — style.css)

```css
--shadow-xs:    0 1px 2px rgba(0,0,0,0.04);
--shadow-sm:    0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
--shadow-md:    0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06);
--shadow-lg:    0 4px 8px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08);
--shadow-xl:    0 8px 16px rgba(0,0,0,0.06), 0 24px 56px rgba(0,0,0,0.1);
--shadow-card:  0 1px 1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.05);
--shadow-card-hover: 0 4px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(93,196,179,0.1);
```

### 4.8 已有CSS类 (直接使用, 不要重新定义 — 在style.css中)

| 类名 | 效果 |
|---|---|
| `card-hover` | 毛玻璃卡片 + hover浮起4px + 阴影增强 + 顶部渐变线显现 |
| `portal-card` | 产品卡片样式 (hover变色+浮起) |
| `feature-card` | 功能卡片 (FAFAFA底/hover白底+浮起+渐变顶线) |
| `aurora-bg` / `aurora-hero` | 深色科技径向渐变背景 + 呼吸光晕 |
| `hero-dark` | 深色Hero区 (与aurora-bg同源, 带光晕+暗角) |
| `aurora-footer` | 深色页脚背景 |
| `navbar-glass` | 毛玻璃导航 (Navbar组件已封装, 无需手动使用) |
| `reveal` | 滚动渐现: translateY(32px)→0 + 透明→不透明 |
| `reveal-left` | 从左滑入 (-40px→0) |
| `reveal-right` | 从右滑入 (40px→0) |
| `reveal-scale` | 缩放渐现 (0.92→1) |
| `visible` | 配合reveal使用, IntersectionObserver触发添加 |
| `stagger-1` ~ `stagger-8` | 交错延迟 (0.05s递增) |
| `btn-primary` | 品牌渐变按钮 (绿色, 浮起+阴影+内嵌光) |
| `btn-secondary` | 白底描边按钮 |
| `skeleton` / `skeleton-text` / `skeleton-card` | 骨架屏shimmer |
| `gradient-text-brand` | 品牌渐变文字 (#5DC4B3渐变) |
| `gradient-text-premium` | 高级渐变文字 (#5DC4B3→#32ade6→#6366F1) |
| `badge-primary` / `badge-success` / `badge-warning` / `badge-danger` | 圆角徽章 |
| `dot-pattern` | 点阵背景纹理 |
| `section-divider` | 渐变分割线 (品牌色→靛色) |
| `shimmer-sweep` | 光泽扫过效果 |
| `glow-pulse` | 呼吸光晕脉冲 |
| `spinner` / `spinner-lg` | 加载旋转圆环 |
| `fade-in` | 基础淡入动画 |
| `count-animate` | 数字计数入场 |
| `list-item-hover` | 列表项hover (浅品牌色背景+阴影+微平移) |
| `tooltip` | CSS纯tooltip (data-tooltip属性) |
| `status-dot-live` | 在线状态绿点 (脉冲动画) |
| `line-clamp-2` / `line-clamp-3` | 文字截断 |

### 4.9 响应式断点

| Tailwind前缀 | 宽度 | 设备 |
|---|---|---|
| `sm:` | ≥640px | 手机横屏 |
| `md:` | ≥768px | 平板 |
| `lg:` | ≥1024px | 笔记本 |
| `xl:` | ≥1280px | 桌面显示器 |

### 4.10 动效规范 (CSS变量)

| 变量 | 值 | 用途 |
|---|---|---|
| `--ease-spring` | cubic-bezier(0.22, 1, 0.36, 1) | 弹性交互 (卡片浮起) |
| `--ease-smooth` | cubic-bezier(0.25, 0.1, 0.25, 1) | 平滑过渡 (颜色/透明度) |
| `--ease-bounce` | cubic-bezier(0.34, 1.56, 0.64, 1) | 弹跳效果 (强调) |
| `--ease-apple` | cubic-bezier(0.28, 0.11, 0.32, 1) | Apple品质曲线 (模态/滑块) |
| `--ease-out-expo` | cubic-bezier(0.19, 1, 0.22, 1) | 快出指数 (reveal动画) |
| `--duration-fast` | 180ms | 按钮/链接hover |
| `--duration-normal` | 280ms | 卡片/面板过渡 |
| `--duration-slow` | 420ms | 手风琴/展开 |
| `--duration-slower` | 600ms | 大型动画 |

---

## 五、页面结构设计 (从上到下, 12个Section)

### Section 1: 面包屑导航
- 复用 PlaceholderPage 面包屑结构
- 路径: `首页 > 产品入口 > 参与通` / `Home > Product Suite > Deal Connect`
- 容器: `bg-gray-50 border-b border-gray-100`, `max-w-4xl mx-auto px-4 py-3`
- 文字: `text-xs text-gray-400`, 当前页面 `text-[#1d1d1f] font-semibold`
- 图标: `fa-home` (首页), `fa-chevron-right` (分隔符, 8px)
- 所有链接使用 `langLink()` 保持语言参数

### Section 2: Hero 区 (参与通专属)
- **布局**: 左文右图 (lg以上并排) / 上文下图 (移动端堆叠)
- **背景**: `bg-gradient-to-br from-white via-gray-50 to-[#D1FAE5]/20` (参与通浅绿渐变)
- **左侧内容**:
  - `ProductLogo` (size=80, name 和 englishShort 从产品数据获取)
  - 状态徽章: 使用 `getStatusLabel(product.status, l)` 获取文字和CSS类
  - 大标题: `text-3xl md:text-4xl font-extrabold text-[#1d1d1f]`
  - 英文副标题: `text-sm text-gray-400`
  - 完整描述: `text-base text-gray-500 max-w-lg leading-relaxed`
  - 标签行: 分类标签 + 角色标签 (使用 `getCategoryName`, `getRoleLabel`)
  - CTA按钮: "查看项目看板" → 锚点 `#deal-board`
- **右侧**: 数据管道迷你图示 (CSS/SVG)
  - 4个节点: 发起通(黄) → 评估通(靛) → 风控通(靛) → **参与通(绿,高亮放大)**
  - 连接线带箭头, 当前节点发光

### Section 3: KPI 数据总览
- **容器**: `py-12 bg-white`
- **网格**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto`
- **4张KPI卡片** (每张使用 `card-hover` 类):
  | KPI | 数值 | 图标 | 趋势 |
  |---|---|---|---|
  | 筛后项目 / Filtered Deals | 47 | fa-filter | ↑12% |
  | 项目总池 / Total Pipeline | 238 | fa-database | +18 本月 |
  | 投资意向 / Deal Intents | 12 | fa-heart | 已标记 |
  | 平均评分 / Avg. Score | 8.6 | fa-star | /10 AI评分 |
- 数字: `font-mono text-3xl font-extrabold` (Montserrat字体)
- 图标容器: 40x40 圆角方块, 参与通绿色背景 `bg-[#D1FAE5]`, 图标 `text-[#10B981]`
- 趋势: 上涨绿色 `text-green-500`, 下降红色 `text-red-500`

### Section 4: 筛选控制条
- **容器**: `sticky top-[56px] z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 py-3`
- **布局**: `max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-3`
- **元素**:
  - **搜索框**: `input` 类 + `fa-search` 前置图标, placeholder从i18n获取
  - **筛选模式**: 两个tab按钮 "全量浏览" / "筛后项目", 选中状态: `bg-[#10B981] text-white rounded-lg`, 未选: `text-gray-500`
  - **排序下拉**: `<select>` 样式, 选项: 最新提交/AI评分/融资金额/行业
  - **视图切换**: 两个图标按钮 `fa-th-large` (卡片) / `fa-list` (列表), 选中: `text-[#10B981]`
- **交互**: 纯JS函数 `switchFilterMode()`, `switchViewMode()` 控制下方内容切换

### Section 5: 项目看板 (核心功能区) `id="deal-board"`
- **容器**: `py-8 bg-gray-50/50 min-h-[400px]`
- **内容区**: `max-w-6xl mx-auto px-4`

#### 5A: 卡片视图 (默认显示)
- **网格**: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5`
- **每张项目卡片** (使用 `card-hover` 类):
  - **顶部色带**: 3px高, 行业主题色 (餐饮黄#F59E0B, 零售蓝#3B82F6, 医美粉#EC4899 等)
  - **头部**: 项目名称 (`text-lg font-bold`) + 行业小标签 (圆角pill, 行业色背景)
  - **位置**: `text-xs text-gray-400` + `fa-map-marker-alt`
  - **一句话描述**: `text-sm text-gray-500 line-clamp-2`
  - **关键指标网格** (2x2):
    - 月流水: `¥XX万` / `¥XXw`
    - 毛利率: `XX%`
    - 经营年限: `X年` / `X yrs`
    - 门店数: `X家` / `X stores`
    - 每个指标: 浅灰标签 + 深色数值
  - **AI评分条**: 横向进度条 `h-2 rounded-full`, 背景`bg-gray-100`, 填充渐变 (绿→蓝, 宽度=score/10*100%)
    - 评分数字: `text-sm font-bold text-[#10B981]`
  - **筛选状态**: 两个小徽章 `✅评估通过` `✅风控通过` (badge-success风格)
  - **底部操作栏**: 灰色分隔线上方
    - "查看详情" 文字按钮 (品牌色)
    - 心形意向按钮 `fa-heart` (hover变红, 已标记实心)
    - 对比checkbox (方框勾选)
  - 使用 `reveal stagger-N` 实现交错入场

#### 5B: 列表视图 (切换显示)
- **表格容器**: `overflow-x-auto rounded-xl border border-gray-200 bg-white`
- **表头**: `bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 font-semibold`
- **列**: 序号 / 项目名称 / 行业 / 月流水 / 毛利率 / AI评分 / 筛选状态 / 操作
- **行**: 交替 `bg-white` / `bg-gray-50/50`, hover: `bg-[#D1FAE5]/20`
- **操作列**: 小型按钮/图标 (查看/意向/对比)

### Section 6: 项目对比浮层
- **条件显示**: 已选择 ≥2 个项目时, 从底部滑入
- **容器**: `fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-2xl border-t border-gray-200 py-3 px-4`
- **内容**: `max-w-6xl mx-auto flex items-center justify-between`
  - 左: "已选 X 个项目" + 缩略Logo/名称列表
  - 右: "开始对比" 按钮 (btn-primary风格, `bg-[#10B981]`)
- **动画**: `transform transition-transform` 滑入/滑出

### Section 7: 智能推荐区
- **容器**: `py-16 bg-white`
- **标题**: "智能推荐" + "基于您的投资偏好" 副标题
- **横向滚动**: `flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4`
  - 隐藏滚动条: `-webkit-scrollbar { display: none; }`
- **推荐卡片** (3-5张, 比看板卡片稍窄):
  - 推荐原因标签: "高评分" / "行业匹配" / "增长强劲" (小pill, 参与通绿色)
  - 项目名 + 行业 + AI评分 + CTA
- 使用 `reveal` 动画

### Section 8: 投资意向汇总
- **容器**: `py-12 bg-gray-50`
- **标题**: "我的投资意向" / "My Deal Intents"
- **列表**: 水平flex排列, 每个意向项:
  - 小Logo + 项目名 + 行业标签 + AI评分
  - 操作: "进入条款通" (链接到 `/terms`) / "移除" (灰色叉)
- **空状态**: 无意向时显示鼓励文案 + 引导回看板
- 使用 `reveal` 动画

### Section 9: 数据管道可视化 (大型)
- **容器**: `py-20 bg-white`
- **标题**: "数据管道" + "从发起到参与的完整数据流"
- **SVG/CSS动画**: 大型水平流程图
  - 4个节点 (圆角方块):
    1. 发起通 (黄, `#F59E0B`) — "融资者上传数据"
    2. 评估通 (靛, `#6366F1`) — "AI投资标准筛选"
    3. 风控通 (靛, `#6366F1`) — "AI风控合规审查"
    4. **参与通** (绿, `#10B981`, 放大+光晕) — "投资者项目看板"
  - 连接线: 渐变箭头, 带动画流动效果
  - 每个节点可点击 → 使用 `langLink()` 跳转到对应产品页
  - 当前节点(参与通): 放大1.1倍 + `glow-pulse` 效果
  - 移动端: 垂直排列
- 使用 `reveal-scale` 动画

### Section 10: 空状态设计
- **条件显示**: 筛后模式且无匹配项目时, 替代Section 5的项目看板
- **容器**: `py-20 text-center`
- **内容**:
  - 大型图标: `fa-search` 80px, `text-gray-200`
  - 标题: "暂无匹配项目" (`text-xl font-bold text-gray-400`)
  - 描述: 引导调整筛子 (`text-sm text-gray-400`)
  - 两个CTA:
    1. "调整筛子策略" → 链接到评估通 `/assess` (btn-secondary)
    2. "切换全量浏览" → 调用 `switchFilterMode('all')` (btn-primary, 参与通绿)

### Section 11: 前后步骤导航
- **完全复用** PlaceholderPage 的前后导航结构和逻辑
- 容器: `py-8 bg-white border-t border-gray-100`
- 双列卡片: 左=风控通(Risk), 右=条款通(Terms)
- 使用 `getProductUrl()` 和 `isExternalProduct()` 处理链接
- 外部链接: `target="_blank"` + `rel="noopener noreferrer"`
- hover: `border-[#5DC4B3]/30 shadow-md`, 文字变品牌色

### Section 12: Footer
- `<Footer lang={l} />` (直接使用共享组件)

---

## 六、Mock 数据设计

在 `DealConnectPage.tsx` 文件内部定义所有mock数据 (**不修改 data.ts**)：

```typescript
// ═══ 行业数据 ═══
const INDUSTRIES = [
  { id: 'catering', zh: '餐饮', en: 'Catering', color: '#F59E0B', icon: 'fa-utensils' },
  { id: 'retail', zh: '零售', en: 'Retail', color: '#3B82F6', icon: 'fa-store' },
  { id: 'beauty', zh: '医美', en: 'Beauty', color: '#EC4899', icon: 'fa-spa' },
  { id: 'education', zh: '教育', en: 'Education', color: '#8B5CF6', icon: 'fa-graduation-cap' },
  { id: 'fitness', zh: '健身', en: 'Fitness', color: '#10B981', icon: 'fa-dumbbell' },
  { id: 'healthcare', zh: '大健康', en: 'Healthcare', color: '#06B6D4', icon: 'fa-heartbeat' },
]

// ═══ 项目数据接口 ═══
interface DealProject {
  id: string
  name: { zh: string; en: string }
  industry: string                    // 对应 INDUSTRIES 的 id
  monthlyRevenue: number              // 万元/月
  grossMargin: number                 // 百分比 (0-100)
  operatingYears: number              // 经营年限
  storeCount: number                  // 门店数量
  aiScore: number                     // AI综合评分 (0-10, 一位小数)
  assessPassed: boolean               // 评估通是否通过
  riskPassed: boolean                 // 风控通是否通过
  status: 'screening' | 'passed' | 'intent' | 'negotiating'
  description: { zh: string; en: string }
  location: { zh: string; en: string }
  requestAmount: number               // 融资金额 (万元)
  revenueShareRate: number            // 预估收入分成比例 (%)
  submittedAt: string                 // 提交日期 YYYY-MM-DD
}

// ═══ Mock项目数据 (至少8条, 覆盖不同行业/状态/评分) ═══
const MOCK_PROJECTS: DealProject[] = [
  {
    id: 'p001',
    name: { zh: '沪上阿姨鲜果茶', en: 'Auntie Shanghai Fresh Tea' },
    industry: 'catering',
    monthlyRevenue: 85,
    grossMargin: 62,
    operatingYears: 4,
    storeCount: 12,
    aiScore: 9.2,
    assessPassed: true,
    riskPassed: true,
    status: 'passed',
    description: {
      zh: '华东地区领先的鲜果茶连锁品牌，月均流水稳定增长，复购率超过45%',
      en: 'Leading fresh fruit tea chain in East China with stable monthly revenue growth and over 45% repeat purchase rate'
    },
    location: { zh: '上海·静安', en: 'Shanghai, Jing\'an' },
    requestAmount: 500,
    revenueShareRate: 8.5,
    submittedAt: '2026-02-20'
  },
  {
    id: 'p002',
    name: { zh: '悦动健身工坊', en: 'JoyFit Studio' },
    industry: 'fitness',
    monthlyRevenue: 42,
    grossMargin: 55,
    operatingYears: 2,
    storeCount: 3,
    aiScore: 7.8,
    assessPassed: true,
    riskPassed: true,
    status: 'intent',
    description: {
      zh: '专注团课+私教模式的精品健身房，单店人效高于行业均值30%',
      en: 'Boutique fitness studio focusing on group classes and personal training, 30% above industry average in per-store efficiency'
    },
    location: { zh: '深圳·南山', en: 'Shenzhen, Nanshan' },
    requestAmount: 200,
    revenueShareRate: 10.0,
    submittedAt: '2026-02-18'
  },
  {
    id: 'p003',
    name: { zh: '颜值密码医美', en: 'BeautyCode MedSpa' },
    industry: 'beauty',
    monthlyRevenue: 120,
    grossMargin: 71,
    operatingYears: 5,
    storeCount: 6,
    aiScore: 8.9,
    assessPassed: true,
    riskPassed: true,
    status: 'negotiating',
    description: {
      zh: '轻医美连锁品牌，聚焦皮肤管理和非手术项目，会员留存率68%',
      en: 'Light medical aesthetics chain focused on skin management and non-surgical treatments, 68% member retention'
    },
    location: { zh: '杭州·西湖', en: 'Hangzhou, Xihu' },
    requestAmount: 800,
    revenueShareRate: 7.0,
    submittedAt: '2026-02-15'
  },
  {
    id: 'p004',
    name: { zh: '鲜味坊社区食堂', en: 'FreshBite Community Kitchen' },
    industry: 'catering',
    monthlyRevenue: 35,
    grossMargin: 48,
    operatingYears: 1,
    storeCount: 2,
    aiScore: 6.5,
    assessPassed: true,
    riskPassed: false,
    status: 'screening',
    description: {
      zh: '社区型中式快餐，主打性价比午晚餐，翻台率高但风控材料待补充',
      en: 'Community Chinese fast food focusing on value lunch/dinner, high turnover rate but risk documentation needs completion'
    },
    location: { zh: '成都·武侯', en: 'Chengdu, Wuhou' },
    requestAmount: 150,
    revenueShareRate: 12.0,
    submittedAt: '2026-02-22'
  },
  {
    id: 'p005',
    name: { zh: '星途教育科技', en: 'StarPath EdTech' },
    industry: 'education',
    monthlyRevenue: 68,
    grossMargin: 58,
    operatingYears: 3,
    storeCount: 8,
    aiScore: 8.1,
    assessPassed: true,
    riskPassed: true,
    status: 'passed',
    description: {
      zh: 'K12素质教育综合体，编程+美术+音乐三线并行，续费率72%',
      en: 'K12 quality education complex with coding, art, and music programs running in parallel, 72% renewal rate'
    },
    location: { zh: '北京·朝阳', en: 'Beijing, Chaoyang' },
    requestAmount: 350,
    revenueShareRate: 9.0,
    submittedAt: '2026-02-12'
  },
  {
    id: 'p006',
    name: { zh: '潮流便利GO', en: 'TrendyMart GO' },
    industry: 'retail',
    monthlyRevenue: 95,
    grossMargin: 32,
    operatingYears: 6,
    storeCount: 25,
    aiScore: 8.4,
    assessPassed: true,
    riskPassed: true,
    status: 'passed',
    description: {
      zh: '新零售便利店，自有供应链+线上线下一体化，日均客流超2000人次',
      en: 'New retail convenience chain with proprietary supply chain and O2O integration, daily traffic exceeding 2,000 visitors'
    },
    location: { zh: '广州·天河', en: 'Guangzhou, Tianhe' },
    requestAmount: 600,
    revenueShareRate: 6.5,
    submittedAt: '2026-02-08'
  },
  {
    id: 'p007',
    name: { zh: '康养源大健康', en: 'VitaWell Health' },
    industry: 'healthcare',
    monthlyRevenue: 55,
    grossMargin: 65,
    operatingYears: 3,
    storeCount: 4,
    aiScore: 7.3,
    assessPassed: true,
    riskPassed: false,
    status: 'screening',
    description: {
      zh: '中医理疗+养生调理连锁，客单价高，回头客占比超60%，部分资质待核验',
      en: 'TCM therapy and wellness chain with high average transaction value, 60%+ repeat customers, some certifications pending verification'
    },
    location: { zh: '南京·鼓楼', en: 'Nanjing, Gulou' },
    requestAmount: 280,
    revenueShareRate: 9.5,
    submittedAt: '2026-02-19'
  },
  {
    id: 'p008',
    name: { zh: '味蕾工坊烘焙', en: 'TasteBud Bakery' },
    industry: 'catering',
    monthlyRevenue: 28,
    grossMargin: 58,
    operatingYears: 2,
    storeCount: 3,
    aiScore: 7.0,
    assessPassed: true,
    riskPassed: true,
    status: 'passed',
    description: {
      zh: '精品烘焙连锁，主打现烤面包和定制蛋糕，社交媒体粉丝12万+',
      en: 'Artisan bakery chain specializing in fresh-baked bread and custom cakes, 120K+ social media followers'
    },
    location: { zh: '苏州·工业园', en: 'Suzhou, SIP' },
    requestAmount: 180,
    revenueShareRate: 11.0,
    submittedAt: '2026-02-25'
  },
]
```

---

## 七、i18n 双语要求

所有用户可见文字必须支持中英双语。

**推荐方式**: 在页面内用内联双语对象 (避免修改全局 i18n.ts):

```typescript
const TEXT = {
  heroTitle: { zh: '参与通', en: 'Deal Connect' },
  heroSubtitle: { zh: '投资者统一项目看板', en: 'Unified Deal Dashboard for Investors' },
  heroDesc: { zh: '展示通过评估通和风控通筛选后的融资项目，助力投资者主动参与投资决策', en: 'Display borrower projects that pass both Assess and Risk screening, empowering investors to make active deal decisions' },
  heroCta: { zh: '查看项目看板', en: 'View Deal Board' },
  kpiFiltered: { zh: '筛后项目', en: 'Filtered Deals' },
  kpiTotal: { zh: '项目总池', en: 'Total Pipeline' },
  kpiIntent: { zh: '投资意向', en: 'Deal Intents' },
  kpiAvgScore: { zh: '平均评分', en: 'Avg. AI Score' },
  filterAll: { zh: '全量浏览', en: 'Full Pipeline' },
  filterScreened: { zh: '筛后项目', en: 'Filtered Only' },
  searchPlaceholder: { zh: '搜索项目名称、行业关键词...', en: 'Search deal name, industry...' },
  sortLatest: { zh: '最新提交', en: 'Latest' },
  sortScore: { zh: 'AI评分', en: 'AI Score' },
  sortAmount: { zh: '融资金额', en: 'Amount' },
  sortIndustry: { zh: '行业', en: 'Industry' },
  viewCard: { zh: '卡片', en: 'Cards' },
  viewList: { zh: '列表', en: 'List' },
  assessPassed: { zh: '评估通过', en: 'Assess ✓' },
  riskPassed: { zh: '风控通过', en: 'Risk ✓' },
  assessPending: { zh: '评估中', en: 'Assessing' },
  riskPending: { zh: '风控中', en: 'Reviewing' },
  monthlyRev: { zh: '月流水', en: 'Monthly Rev.' },
  grossMargin: { zh: '毛利率', en: 'Gross Margin' },
  years: { zh: '经营年限', en: 'Years' },
  stores: { zh: '门店', en: 'Stores' },
  unit10k: { zh: '万', en: 'w' },
  unitYear: { zh: '年', en: 'yr' },
  unitStore: { zh: '家', en: '' },
  viewDetail: { zh: '查看详情', en: 'View Detail' },
  markIntent: { zh: '标记意向', en: 'Mark Intent' },
  removeIntent: { zh: '移除意向', en: 'Remove' },
  compare: { zh: '对比', en: 'Compare' },
  compareSelected: { zh: '已选 {n} 个项目', en: '{n} deals selected' },
  compareStart: { zh: '开始对比', en: 'Start Comparison' },
  emptyTitle: { zh: '暂无匹配项目', en: 'No Matching Deals' },
  emptyDesc: { zh: '当前筛子策略未筛出项目，尝试调整评估通或风控通的筛选标准', en: 'No deals match your current filter criteria. Try adjusting your Assess or Risk Connect parameters.' },
  emptyAction1: { zh: '调整筛子策略', en: 'Adjust Filters' },
  emptyAction2: { zh: '切换全量浏览', en: 'Browse All Deals' },
  recommendTitle: { zh: '智能推荐', en: 'Smart Recommendations' },
  recommendSubtitle: { zh: '基于您的投资偏好', en: 'Based on Your Investment Preferences' },
  recommendReason1: { zh: '高评分', en: 'Top Rated' },
  recommendReason2: { zh: '行业匹配', en: 'Industry Match' },
  recommendReason3: { zh: '增长强劲', en: 'Strong Growth' },
  intentTitle: { zh: '我的投资意向', en: 'My Deal Intents' },
  intentEmpty: { zh: '暂未标记投资意向，浏览项目后点击❤️标记', en: 'No intents marked yet. Browse deals and click ❤️ to mark.' },
  intentToTerms: { zh: '进入条款通', en: 'Go to Terms' },
  pipelineTitle: { zh: '数据管道', en: 'Data Pipeline' },
  pipelineSubtitle: { zh: '从发起到参与的完整数据流', en: 'Complete data flow from Originate to Deal' },
  pipelineStep1: { zh: '融资者上传数据', en: 'Borrower uploads data' },
  pipelineStep2: { zh: 'AI投资标准筛选', en: 'AI investment criteria screening' },
  pipelineStep3: { zh: 'AI风控合规审查', en: 'AI risk compliance review' },
  pipelineStep4: { zh: '投资者项目看板', en: 'Investor deal dashboard' },
  requestAmount: { zh: '融资金额', en: 'Request Amount' },
  revenueShare: { zh: '预估分成', en: 'Est. Rev. Share' },
  submittedAt: { zh: '提交时间', en: 'Submitted' },
  location: { zh: '所在地', en: 'Location' },
  statusScreening: { zh: '筛选中', en: 'Screening' },
  statusPassed: { zh: '已通过', en: 'Passed' },
  statusIntent: { zh: '已意向', en: 'Intent' },
  statusNegotiating: { zh: '协商中', en: 'Negotiating' },
  // 列表视图表头
  colNo: { zh: '#', en: '#' },
  colName: { zh: '项目名称', en: 'Deal Name' },
  colIndustry: { zh: '行业', en: 'Industry' },
  colRevenue: { zh: '月流水', en: 'Monthly Rev.' },
  colMargin: { zh: '毛利率', en: 'Margin' },
  colScore: { zh: 'AI评分', en: 'AI Score' },
  colStatus: { zh: '状态', en: 'Status' },
  colAction: { zh: '操作', en: 'Action' },
}

// 用法: tt(TEXT.heroTitle, l)
```

---

## 八、交互与动效要求

### 8.1 滚动渐现 (IntersectionObserver)
所有Section元素使用 `reveal` / `reveal-left` / `reveal-right` / `reveal-scale` 类。
子元素使用 `stagger-1` ~ `stagger-8` 实现交错入场。

客户端脚本 (内联 `<script dangerouslySetInnerHTML>`):
```javascript
document.addEventListener('DOMContentLoaded', function() {
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale')
    .forEach(function(el) { io.observe(el); });
});
```

### 8.2 Tab/筛选切换 (纯JS, 无框架)
```javascript
// 筛选模式切换: 全量 vs 筛后
function switchFilterMode(mode) {
  // mode: 'all' | 'filtered'
  // 1. 更新tab按钮样式
  // 2. 切换显示/隐藏项目卡片 (data-filtered="true"/"false")
  // 3. 更新KPI数字
}

// 视图切换: 卡片 vs 列表
function switchViewMode(mode) {
  // mode: 'card' | 'list'
  // 1. 更新视图按钮样式
  // 2. 切换card-view / list-view的display
}

// 投资意向标记
function markIntent(projectId) {
  // 1. 切换心形图标 (空心/实心)
  // 2. 更新意向列表区
  // 3. 更新KPI意向计数
}

// 对比勾选
function toggleCompare(projectId) {
  // 1. 切换checkbox状态
  // 2. 更新底部对比浮层显示/隐藏
  // 3. 更新已选计数
}
```

### 8.3 注意事项
- **所有客户端脚本** 通过 `<script dangerouslySetInnerHTML={{ __html: \`...\` }} />` 内联
- **不能import** 任何客户端npm包 (Hono SSR, 无水合)
- **语言读取**: `window.__LANG__` (renderer.tsx 已在全局设置)
- **DOM操作**: 原生 `document.getElementById()` / `document.querySelector()`
- **事件绑定**: `onclick="functionName()"` 内联事件
- **CSS动画优先**: 尽量用CSS而非JS做动画 (GPU加速)

---

## 九、导航集成要求

### 9.1 面包屑
```
首页 > 产品入口 > 参与通
Home > Product Suite > Deal Connect
```
所有链接使用 `langLink(href, l)` (`ll()` 简写) 确保语言参数传递。

### 9.2 底部前后步骤导航
- 完全复用 PlaceholderPage 的导航逻辑代码:
  ```typescript
  const sortedProducts = [...products].sort((a, b) => a.flowOrder - b.flowOrder)
  const currentIdx = sortedProducts.findIndex(p => p.id === 'opportunity')
  const prevProduct = currentIdx > 0 ? sortedProducts[currentIdx - 1] : null   // 风控通
  const nextProduct = currentIdx < sortedProducts.length - 1 ? sortedProducts[currentIdx + 1] : null  // 条款通
  ```
- 支持 `getProductUrl()` 获取URL (内部/外部)
- 支持 `isExternalProduct()` 检测是否外部链接 → `target="_blank"` + `rel="noopener noreferrer"`

### 9.3 Navbar
```typescript
<Navbar active="opportunity" lang={l} />
```

### 9.4 回主站链接
- 面包屑 "产品入口" → `/portal`
- 所有 "返回" 按钮 → `/portal`
- 数据管道中的其他产品节点 → 各自的 `/${id}` 路由

---

## 十、技术实现要求

### 10.1 输出文件

```
src/pages/DealConnectPage.tsx   ← 新建 (核心页面, 包含所有mock数据和内联脚本)
src/index.tsx                    ← 修改 (注册独立路由, 从productIds移除opportunity)
```

### 10.2 组件签名

```typescript
import type { FC } from 'hono/jsx'
import { products, getProductUrl, isExternalProduct } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogo } from '../components/Logos'
import type { Lang } from '../i18n'
import { langLink, tt, t, getProductName, getProductDesc, getProductFeatures, getCategoryName, getStatusLabel, getRoleLabel } from '../i18n'

export const DealConnectPage: FC<{ lang?: Lang }> = ({ lang = 'zh' }) => {
  const l = lang
  const ll = (href: string) => langLink(href, l)

  const product = products.find(p => p.id === 'opportunity')!
  // ... mock数据定义 ...
  // ... 页面JSX ...
}
```

### 10.3 性能要求
- 首次渲染 < 2秒
- 交互响应 < 100ms
- CSS动画而非JS动画 (GPU加速)
- 图片使用lazy loading (`loading="lazy"`)
- 避免大型内联SVG阻塞渲染

### 10.4 代码质量要求
- 文件顶部必须有完整JSDoc注释块 (参考PlaceholderPage.tsx风格)
- 关键函数和数据结构有中文注释
- Tailwind类名组织: 布局 → 间距 → 文字 → 颜色 → 动效
- 无 `console.log` / 无 TODO 残留
- 所有颜色使用设计系统Token (参与通专属色 #D1FAE5/#10B981 除外, 这两个可以硬编码)

---

## 十一、视觉一致性检查清单

完成后请逐项确认:

- [ ] Navbar 与主站完全一致 (使用共享 Navbar 组件)
- [ ] Footer 与主站完全一致 (使用共享 Footer 组件)
- [ ] 品牌色 #5DC4B3 在按钮/链接中使用正确
- [ ] 参与通专属色 #D1FAE5(浅) / #10B981(深) 应用一致
- [ ] 文字层次清晰: primary(#1d1d1f) / secondary(#6e6e73) / tertiary(#86868b)
- [ ] 卡片使用 `card-hover` 类 (毛玻璃+hover浮起)
- [ ] 所有按钮有 hover/active 状态
- [ ] 中英文切换无遗漏 (每一个可见文字)
- [ ] 移动端 (< 768px) 布局正常、可用
- [ ] 前后导航正确链接到风控通/条款通
- [ ] 面包屑路径正确且可点击
- [ ] 数据管道中各节点可点击跳转
- [ ] Mock数据真实可信 (金额/比率/行业/地点合理)
- [ ] 滚动渐现动画正常工作
- [ ] Tab/筛选切换功能正常
- [ ] 空状态有引导性CTA

---

## 十二、参考: 主站其他已完成页面的设计模式

为确保一致性, 以下是主站中已实现的页面设计模式供参考:

1. **HomePage.tsx (47K行)** — Splash动画 + Welcome滑块 + 全屏Hero + 5阶段叙事 + 双通道 + 底座
2. **DesignPage.tsx (27K行)** — Y型流程SVG + 数据管道可视化 + 架构网格 + 手风琴
3. **PortalPage.tsx (16K行)** — Tab切换5阶段 + 产品卡片网格 + 底座展示
4. **PlaceholderPage.tsx (9.6K行)** — 面包屑 + Hero + 功能网格 + Coming Soon + 前后导航

参与通页面的复杂度应该介于 PortalPage 和 DesignPage 之间, 预估 20K-30K 行代码。
