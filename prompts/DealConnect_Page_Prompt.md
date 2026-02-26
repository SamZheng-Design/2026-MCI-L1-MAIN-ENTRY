# ═══════════════════════════════════════════════════════════════
# 参与通 (Deal Connect) — 主站内独立页面实现 Prompt
# 版本: V20 | 日期: 2026-02-26
# ═══════════════════════════════════════════════════════════════
#
# 你只需要做一件事：
# 在现有主站中，把 /opportunity 路由从占位页升级为完整的参与通页面。
# 不做其他任何"通"，不改动任何其他页面。
# 参与通只是主站9个"通"中的第5个，其他"通"保持原有占位页不变。
#
# ═══════════════════════════════════════════════════════════════

---

## 一、你的任务（精确范围）

**你只需要修改/新建以下文件：**

1. **新建** `src/pages/DealConnectPage.tsx` — 参与通完整页面
2. **修改** `src/index.tsx` — 把 `/opportunity` 路由从 PlaceholderPage 改为 DealConnectPage
3. **可选修改** `src/i18n.ts` — 如果需要新增翻译键（也可以在页面内用 inline 方式处理）

**你不需要动的文件：**
- renderer.tsx（不改）
- data.ts（不改）
- Navbar.tsx（不改）
- Footer.tsx（不改）
- Logos.tsx（不改）
- PlaceholderPage.tsx（不改，其他8个"通"继续用它）
- style.css（不改）
- 其他任何页面（不改）

---

## 二、项目技术栈

- **框架**: Hono + TypeScript + JSX (SSR，服务端渲染，无客户端水合)
- **部署**: Cloudflare Pages (通过 wrangler)
- **样式**: Tailwind CSS (CDN) + 自定义 CSS Token (/static/style.css)
- **图标**: FontAwesome 6.4 (CDN)
- **字体**: Inter + Montserrat + Noto Sans SC (Google Fonts)
- **交互**: 纯原生 JS (inline script)，不使用 React/Vue 等客户端框架
- **i18n**: 通过 `?lang=en` URL 参数切换中英文

---

## 三、现有路由结构（index.tsx）

```typescript
// 当前 index.tsx 结构：
import { Hono } from 'hono'
import { renderer } from './renderer'
import { getLangFromQuery, tt, t } from './i18n'
import { HomePage } from './pages/HomePage'
import { DesignPage } from './pages/DesignPage'
import { PortalPage } from './pages/PortalPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { AboutPage } from './pages/AboutPage'
import { TeamPage } from './pages/TeamPage'
import { NewsPage } from './pages/NewsPage'
import { ContactPage } from './pages/ContactPage'

const app = new Hono()
app.use(renderer)

// 7个主页面路由
app.get('/', (c) => { /* HomePage */ })
app.get('/design', (c) => { /* DesignPage */ })
app.get('/portal', (c) => { /* PortalPage */ })
app.get('/about', (c) => { /* AboutPage */ })
app.get('/team', (c) => { /* TeamPage */ })
app.get('/news', (c) => { /* NewsPage */ })
app.get('/contact', (c) => { /* ContactPage */ })

// 9个产品占位页路由（动态循环生成）
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

**你需要做的改动：**
1. 从 `productIds` 数组中移除 `'opportunity'`
2. 在 `productIds.forEach` 之前，新增一个独立的 `/opportunity` 路由，渲染 `DealConnectPage`
3. 导入 `DealConnectPage`

改动后：
```typescript
import { DealConnectPage } from './pages/DealConnectPage'

// ... 其他主页面路由不变 ...

// 参与通独立路由（从占位页升级为完整页面）
app.get('/opportunity', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(
    <DealConnectPage lang={lang} />,
    { title: lang === 'en' ? 'Deal Connect - Micro Connect' : '参与通 - Micro Connect 滴灌通', lang }
  )
})

// 其余8个产品继续用占位页
const productIds = [
  'identity', 'application', 'assess',
  'risk', 'terms', 'contract',    // 注意: 'opportunity' 已移除
  'settlement', 'performance'
]
productIds.forEach((id) => {
  app.get(`/${id}`, (c) => {
    const lang = getLangFromQuery(c.req.url)
    return c.render(<PlaceholderPage productId={id} lang={lang} />, { title: `${id} - Micro Connect`, lang })
  })
})
```

---

## 四、参与通在产品体系中的位置

参与通是 Y 型业务流程中的第 5 步，位于"投资者路径"的末端：

```
身份通(1) ─┬─ 发起通(2) ────────────────────────────────────────→
            │                                                      ↓
            └─ 评估通(3) → 风控通(4) → 【参与通(5)】→ 条款通(6) → 合约通(7) → 结算通(8) → 履约通(9)
```

参与通的核心定位：
- **角色**: 投资者专属 (role: 'investor')
- **阶段**: investor-view (投资者看板)
- **flowOrder**: 5
- **上一步**: 风控通 (risk, flowOrder 4)
- **下一步**: 条款通 (terms, flowOrder 6)
- **状态**: live (已上线)
- **核心色**: 浅色 #D1FAE5，深色 #10B981

**业务逻辑**：
- 投资者的统一项目看板
- 展示通过评估通 + 风控通筛选后的融资项目
- 关键规则：如果投资者没有设置任何筛子，则展示全量融资项目（无筛子 = 全量曝光）
- 投资者在此浏览、比较、标记投资意向

---

## 五、参与通在 data.ts 中的定义（不要修改此文件）

```typescript
// data.ts 中参与通的完整数据：
{
  id: "opportunity",
  name: "参与通",
  englishName: "Deal Connect",
  englishShort: "Deal",
  logo: "https://www.genspark.ai/api/files/s/UJuchZc6",
  description: "投资者的统一项目看板——展示通过评估通和风控通筛选后的融资项目，主动参与投资。若未设置任何筛子，则展示所有融资项目",
  category: "投资者路径",
  categoryEn: "Investor Path",
  status: "live",
  features: ["筛后项目看板", "全量项目浏览", "项目对比", "投资意向标记", "智能推荐"],
  color: "#D1FAE5",
  colorDark: "#10B981",
  role: "investor",
  phase: "investor-view",
  flowOrder: 5
}
```

---

## 六、已有的 i18n 翻译键（直接可用，不需要修改 i18n.ts）

以下翻译键已存在于 `i18n.ts` 中，你可以直接用 `tt()` 函数引用：

```typescript
// 产品名称
t.data.opportunityName     // { zh: '参与通', en: 'Deal Connect' }

// 产品描述
t.data.opportunityDesc     // { zh: '投资者的统一项目看板...', en: 'The investor\'s unified deal dashboard...' }

// 一句话简述
t.data.opportunityShort    // { zh: '参与投资 · 筛后项目看板 · 投资决策', en: 'Deal Participation · Filtered Board · Investment Decision' }

// 功能标签数组
t.data.opportunityFeatures // { zh: ['筛后项目看板','全量项目浏览','项目对比','投资意向标记','智能推荐'], en: [...] }

// 状态标签
t.data.statusLive          // { zh: '已上线', en: 'Live' }

// 角色标签
t.data.roleBadgeInvestor   // { zh: '投资者', en: 'Investor' }
t.data.roleInvestorExclusive // { zh: '投资者专属', en: 'Investor Exclusive' }

// 面包屑
t.placeholder.breadHome    // { zh: '首页', en: 'Home' }
t.placeholder.breadPortal  // { zh: '产品入口', en: 'Product Suite' }

// 导航
t.placeholder.prevStep     // { zh: '上一步', en: 'Previous' }
t.placeholder.nextStep     // { zh: '下一步', en: 'Next' }
t.placeholder.backToPortal // { zh: '返回产品入口', en: 'Back to Product Suite' }
t.placeholder.featuresTitle // { zh: '核心功能', en: 'Core Capabilities' }
```

**参与通页面专属的翻译**，建议在页面内用 inline 对象处理（与主站其他页面如 HomePage 的做法一致）：

```typescript
// 在 DealConnectPage.tsx 内定义：
const TEXT = {
  heroTitle: { zh: '参与通', en: 'Deal Connect' },
  heroSubtitle: { zh: '投资者统一项目看板', en: 'Unified Investor Deal Dashboard' },
  heroDesc: { zh: '浏览通过评估通和风控通筛选后的融资项目，主动参与投资决策。若未设置筛子，可浏览全量项目。', en: 'Browse borrower projects that passed Assess and Risk screening, and actively participate in investment decisions. If no filters are set, all projects are displayed.' },
  ctaViewAll: { zh: '浏览全量项目', en: 'Browse All Deals' },
  ctaFilteredView: { zh: '查看筛后项目', en: 'View Filtered Deals' },
  
  // KPI 区
  kpiFilteredDeals: { zh: '筛后项目', en: 'Filtered Deals' },
  kpiTotalPipeline: { zh: '全量项目', en: 'Total Pipeline' },
  kpiIntents: { zh: '投资意向', en: 'Intents Marked' },
  kpiAvgScore: { zh: '平均AI评分', en: 'Avg AI Score' },
  
  // 筛选控制条
  filterSearch: { zh: '搜索项目...', en: 'Search deals...' },
  filterAll: { zh: '全量', en: 'All' },
  filterFiltered: { zh: '筛后', en: 'Filtered' },
  filterSortBy: { zh: '排序', en: 'Sort by' },
  filterSortScore: { zh: 'AI评分', en: 'AI Score' },
  filterSortRevenue: { zh: '月流水', en: 'Revenue' },
  filterSortRecent: { zh: '最新', en: 'Recent' },
  viewCard: { zh: '卡片视图', en: 'Card View' },
  viewList: { zh: '列表视图', en: 'List View' },
  
  // 项目卡片
  cardMonthlyRev: { zh: '月均流水', en: 'Monthly Revenue' },
  cardGrossMargin: { zh: '毛利率', en: 'Gross Margin' },
  cardYears: { zh: '经营年限', en: 'Operating Years' },
  cardStores: { zh: '门店数', en: 'Stores' },
  cardAiScore: { zh: 'AI评分', en: 'AI Score' },
  cardRequestAmt: { zh: '融资金额', en: 'Funding Request' },
  cardRevenueShare: { zh: '分成比例', en: 'Revenue Share' },
  cardAssessPassed: { zh: '评估通过', en: 'Assess Passed' },
  cardRiskPassed: { zh: '风控通过', en: 'Risk Passed' },
  cardMarkIntent: { zh: '标记意向', en: 'Mark Intent' },
  cardMarked: { zh: '已标记', en: 'Marked' },
  cardViewDetail: { zh: '查看详情', en: 'View Details' },
  cardCompare: { zh: '加入对比', en: 'Compare' },
  
  // 项目对比
  compareTitle: { zh: '项目对比', en: 'Deal Comparison' },
  compareSelected: { zh: '已选', en: 'Selected' },
  compareStart: { zh: '开始对比', en: 'Start Comparison' },
  compareClear: { zh: '清空', en: 'Clear' },
  
  // 智能推荐
  recommendTitle: { zh: '智能推荐', en: 'Smart Recommendations' },
  recommendSubtitle: { zh: '基于您的投资偏好和历史行为，AI 为您推荐', en: 'AI recommendations based on your investment preferences and history' },
  
  // 投资意向汇总
  intentTitle: { zh: '投资意向汇总', en: 'Investment Intent Summary' },
  intentSubtitle: { zh: '您已标记投资意向的项目', en: 'Projects you have marked with investment intent' },
  intentNextStep: { zh: '进入条款协商', en: 'Proceed to Term Negotiation' },
  
  // 数据管道可视化
  pipelineTitle: { zh: '数据管道', en: 'Data Pipeline' },
  pipelineSubtitle: { zh: '从发起通到参与通的完整筛选流程', en: 'The complete screening flow from Originate to Deal Connect' },
  pipelineOriginate: { zh: '发起通', en: 'Originate' },
  pipelineAssess: { zh: '评估通', en: 'Assess' },
  pipelineRisk: { zh: '风控通', en: 'Risk' },
  pipelineDeal: { zh: '参与通', en: 'Deal' },
  pipelineTotal: { zh: '总申请', en: 'Total Applications' },
  pipelinePassed: { zh: '通过', en: 'Passed' },
  
  // 空状态
  emptyTitle: { zh: '暂无符合条件的项目', en: 'No Matching Deals Found' },
  emptyDesc: { zh: '尝试调整筛选条件，或浏览全量项目', en: 'Try adjusting your filters, or browse all projects' },
  emptyCtaAll: { zh: '浏览全量项目', en: 'Browse All Deals' },
  emptyCtaFilter: { zh: '修改筛子设置', en: 'Modify Filter Settings' },
} as const
```

---

## 七、必须复用的组件和函数（直接 import）

```typescript
// 页面头部的 import：
import type { FC } from 'hono/jsx'
import { products, getProductUrl, isExternalProduct } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogo } from '../components/Logos'
import type { Lang } from '../i18n'
import { langLink, tt, t, getProductName, getProductDesc, getProductFeatures, getStatusLabel, getRoleLabel } from '../i18n'
```

**组件用法：**
- `<Navbar active="" lang={l} />` — 导航栏（active 传空字符串，因为参与通不是主导航项）
- `<Footer lang={l} />` — 页脚
- `<ProductLogo name="参与通" englishShort="Deal" size={96} />` — 产品大 Logo
- `tt(TEXT.heroTitle, l)` — 双语文本取值
- `langLink('/portal', l)` — 生成带语言参数的链接
- `getProductName('risk', l)` — 获取任意产品名称
- `getProductUrl(product)` — 获取产品链接（处理 externalUrl）
- `isExternalProduct(product)` — 判断是否外部链接

---

## 八、设计系统（必须100%遵守，不要自己发明颜色或样式）

### 8.1 品牌色（全局统一）
```
主品牌色:     #5DC4B3  (所有按钮、链接、强调色)
品牌浅:       #7DD4C7
品牌深:       #3D8F83  (hover 状态)
Logo亮:       #2EC4B6
Logo亮2:      #3DD8CA
Logo深:       #28A696
```

### 8.2 参与通专属色
```
参与通浅色:   #D1FAE5  (背景、卡片底色)
参与通深色:   #10B981  (标题、图标、强调)
```

### 8.3 文字层次（必须严格遵守）
```
标题/主文字:   #1d1d1f  (text-[#1d1d1f])
二级文字:      #6e6e73  (text-[#6e6e73])
三级文字:      #86868b  (text-[#86868b])
占位符:        #aeaeb2  (text-[#aeaeb2])
```

### 8.4 语义色
```
信息:   #32ade6
成功:   #34c759  (评估/风控通过标记)
警告:   #ff9f0a
错误:   #ff375f
```

### 8.5 圆角 (Tailwind 已配置)
```
xs:  4px   (rounded-xs)
sm:  8px   (rounded-sm 或 rounded-lg)
md:  12px  (rounded-md 或 rounded-xl)
lg:  16px  (rounded-lg 或 rounded-2xl)
xl:  20px  (rounded-xl)
2xl: 24px  (rounded-2xl)
3xl: 32px  (rounded-3xl)
```

### 8.6 阴影
```
卡片:       shadow-card (CSS var)   或 Tailwind: shadow-sm
卡片hover:  shadow-card-hover       或 Tailwind: shadow-lg shadow-[#5DC4B3]/10
```

### 8.7 必须使用的 CSS 类（来自 style.css）
```css
.navbar-glass          — Navbar 的毛玻璃效果（不用管，Navbar 组件自己处理）
.aurora-bg             — 深色背景（不用，参与通是亮色页面）
.aurora-footer         — Footer 深色背景（不用管，Footer 组件自己处理）
.card-hover            — 卡片 hover 效果（浮起 + 阴影增加）
.reveal / .revealed    — 滚动渐现动画（需配合 IntersectionObserver）
.stagger-1 ~ .stagger-8 — 延迟动画（配合 reveal 使用）
.dot-pattern           — 微点阵背景图案
.display-xl / .display-lg — 超大显示文字
```

### 8.8 Tailwind 颜色快捷 (renderer.tsx 已配置)
```
brand / brand-light / brand-dark / brand-accent
logo-bright / logo-bright2 / logo-deep
semantic-info / semantic-success / semantic-warning / semantic-error
text-primary (#1d1d1f) / text-secondary (#6e6e73) / text-tertiary (#86868b)
surface-page / surface-card / surface-divider
```

---

## 九、DealConnectPage.tsx 页面结构（12 个 Section）

### Section 1: 面包屑导航
```
首页 > 产品入口 > 参与通
```
- 与 PlaceholderPage 的面包屑完全一致的样式
- 背景 `bg-gray-50 border-b border-gray-100`
- 文字 `text-xs text-gray-400`
- 当前页高亮 `text-[#1d1d1f] font-semibold`
- 分隔符 `fa-chevron-right text-[8px] text-gray-300`
- 首页图标 `fa-home`
- 链接使用 `langLink()` 处理

### Section 2: Hero 区
- 背景 `bg-gradient-to-br from-white via-gray-50 to-[#10B981]/5`
- 叠加 `dot-pattern opacity-20`
- 居中布局 `max-w-4xl mx-auto px-4 text-center`
- 内容从上到下：
  1. `<ProductLogo name="参与通" englishShort="Deal" size={96} />`
  2. 状态徽章 `bg-green-100 text-green-700 border-green-200` (已上线)
  3. 主标题 `text-3xl font-extrabold text-[#1d1d1f]`
  4. 英文副标题 `text-sm text-gray-400`
  5. 描述段落 `text-base text-gray-500`
  6. 标签行：分类标签 + 角色标签（与 PlaceholderPage 一致样式）
  7. 两个 CTA 按钮：主按钮 `bg-[#10B981] hover:bg-[#059669] text-white rounded-xl`、次按钮 `border border-[#10B981]/30 text-[#10B981] rounded-xl`

### Section 3: KPI 概览卡片
- 4 个 KPI 卡片横排 (`grid grid-cols-2 md:grid-cols-4 gap-4`)
- 每个卡片：白底 `bg-white rounded-xl border border-gray-100 p-5`
- 数字：`text-2xl font-extrabold text-[#1d1d1f]`
- 标签：`text-xs text-[#6e6e73]`
- 趋势指示：小箭头 + 百分比
- Mock 数据：
  ```
  筛后项目: 47 ↑12%
  全量项目: 238 +18新
  投资意向: 12
  平均评分: 8.6/10
  ```

### Section 4: 筛选控制条
- 粘性定位 `sticky top-[56px] z-30 bg-white/95 backdrop-blur-xl border-b border-gray-100`
- 内容：
  1. 搜索框（左侧）：`fa-search` 图标 + input
  2. 全量/筛后切换 Toggle（中间）：两个按钮组，活跃态 `bg-[#10B981] text-white`
  3. 排序下拉（右侧）：AI评分/月流水/最新
  4. 视图切换（最右）：卡片 `fa-th-large` / 列表 `fa-list` 图标按钮

### Section 5: 项目看板（核心区域）
- **卡片视图**（默认）：`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`
- **列表视图**：表格样式，每行一条
- 通过 JS 切换 `display:none` / `display:grid` 或 `display:block`

**单个项目卡片结构**（卡片视图）：
```html
<div class="card-hover bg-white rounded-xl border border-gray-100 overflow-hidden">
  <!-- 顶部色条 -->
  <div class="h-1 bg-gradient-to-r from-[#10B981] to-[#34d399]"></div>
  
  <!-- 卡片内容 -->
  <div class="p-5">
    <!-- 行业标签 + 状态 -->
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs px-2 py-0.5 rounded-md bg-[#D1FAE5] text-[#10B981] font-medium">餐饮</span>
      <span class="text-xs text-gray-400">2026-02-15</span>
    </div>
    
    <!-- 项目名称 -->
    <h3 class="text-base font-bold text-[#1d1d1f] mb-1">张记川菜连锁</h3>
    <p class="text-xs text-[#6e6e73] mb-3 line-clamp-2">成都地区知名川菜品牌...</p>
    
    <!-- 关键指标 2x2 grid -->
    <div class="grid grid-cols-2 gap-2 mb-3">
      <div class="bg-gray-50 rounded-lg p-2">
        <div class="text-[10px] text-[#86868b]">月均流水</div>
        <div class="text-sm font-bold text-[#1d1d1f]">¥68万</div>
      </div>
      <div class="bg-gray-50 rounded-lg p-2">
        <div class="text-[10px] text-[#86868b]">毛利率</div>
        <div class="text-sm font-bold text-[#1d1d1f]">42%</div>
      </div>
      <div class="bg-gray-50 rounded-lg p-2">
        <div class="text-[10px] text-[#86868b]">经营年限</div>
        <div class="text-sm font-bold text-[#1d1d1f]">5年</div>
      </div>
      <div class="bg-gray-50 rounded-lg p-2">
        <div class="text-[10px] text-[#86868b]">门店数</div>
        <div class="text-sm font-bold text-[#1d1d1f]">12家</div>
      </div>
    </div>
    
    <!-- AI评分条 -->
    <div class="flex items-center gap-2 mb-3">
      <div class="text-xs font-semibold text-[#10B981]">AI 8.6</div>
      <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-[#10B981] to-[#34d399] rounded-full" style="width:86%"></div>
      </div>
    </div>
    
    <!-- 筛选通过徽章 -->
    <div class="flex gap-1.5 mb-3">
      <span class="text-[10px] px-2 py-0.5 rounded-md bg-green-50 text-green-600 border border-green-100">
        <i class="fas fa-check-circle mr-0.5"></i>评估通过
      </span>
      <span class="text-[10px] px-2 py-0.5 rounded-md bg-green-50 text-green-600 border border-green-100">
        <i class="fas fa-shield-alt mr-0.5"></i>风控通过
      </span>
    </div>
    
    <!-- 操作按钮 -->
    <div class="flex gap-2">
      <button class="flex-1 text-xs py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#059669] transition-colors">
        <i class="fas fa-hand-pointer mr-1"></i>标记意向
      </button>
      <button class="text-xs px-3 py-2 rounded-lg border border-gray-200 text-[#6e6e73] hover:border-[#10B981] hover:text-[#10B981] transition-colors">
        <i class="fas fa-balance-scale"></i>
      </button>
    </div>
  </div>
</div>
```

### Section 6: 项目对比浮层（底部固定）
- 当用户选择 ≥2 个项目时显示
- 底部固定 `fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg`
- 显示已选项目数量 + "开始对比"按钮 + "清空"按钮
- 默认隐藏

### Section 7: 智能推荐区
- 横向滚动卡片 `flex gap-4 overflow-x-auto pb-4`
- 标题 `text-xl font-extrabold text-[#1d1d1f]`
- 副标题 `text-sm text-[#6e6e73]`
- 3-4 张推荐卡片（比主看板卡片小）

### Section 8: 投资意向汇总
- 标题 + 已标记项目列表（横向小卡片）
- 底部 CTA "进入条款协商" → 链接到 `/terms`

### Section 9: 数据管道可视化
- 横向 4 节点流程图（SVG 或 div 实现）：
  ```
  发起通(238) → 评估通(通过128/淘汰110) → 风控通(通过72/淘汰56) → 参与通(47个项目)
  ```
- 节点之间有箭头连线
- 每个节点显示产品名 + 通过数 + 淘汰数
- 参与通节点高亮 `bg-[#D1FAE5] border-[#10B981]`
- 底部标注"无筛子 = 展示全部238个项目"

### Section 10: 空状态设计
- 当 Mock 数据中无匹配项目时显示（可选实现）
- 大图标 + 标题 + 描述 + 两个 CTA（浏览全量 / 修改筛子）

### Section 11: 前后步骤导航
- 与 PlaceholderPage **完全一致**的样式
- 上一步：风控通 (risk)
- 下一步：条款通 (terms)
- 使用 `getProductUrl()` 和 `isExternalProduct()` 处理链接
- 使用 `getProductName()` 获取翻译后的名称

### Section 12: Footer
```typescript
<Footer lang={l} />
```

---

## 十、Mock 数据（在 DealConnectPage.tsx 内定义）

```typescript
interface MockDeal {
  id: string
  name: { zh: string; en: string }
  industry: { zh: string; en: string }
  location: { zh: string; en: string }
  monthlyRevenue: number    // 万元
  grossMargin: number       // 百分比
  operatingYears: number
  storeCount: number
  aiScore: number           // 1-10
  assessPassed: boolean
  riskPassed: boolean
  requestAmount: number     // 万元
  revenueShareRate: number  // 百分比
  description: { zh: string; en: string }
  submittedAt: string       // YYYY-MM-DD
  status: 'active' | 'reviewing' | 'intent-marked'
}

const INDUSTRIES = {
  catering: { zh: '餐饮', en: 'Catering' },
  retail: { zh: '零售', en: 'Retail' },
  beauty: { zh: '医美', en: 'Beauty' },
  education: { zh: '教育', en: 'Education' },
  fitness: { zh: '健身', en: 'Fitness' },
  healthcare: { zh: '大健康', en: 'Healthcare' },
}

const MOCK_DEALS: MockDeal[] = [
  {
    id: 'deal-001',
    name: { zh: '张记川菜连锁', en: 'Zhang\'s Sichuan Cuisine' },
    industry: INDUSTRIES.catering,
    location: { zh: '成都', en: 'Chengdu' },
    monthlyRevenue: 68,
    grossMargin: 42,
    operatingYears: 5,
    storeCount: 12,
    aiScore: 8.6,
    assessPassed: true,
    riskPassed: true,
    requestAmount: 500,
    revenueShareRate: 8,
    description: { zh: '成都地区知名川菜品牌，5年稳健经营，12家直营门店', en: 'Well-known Sichuan cuisine brand in Chengdu, 5 years of stable operations, 12 direct-operated stores' },
    submittedAt: '2026-02-15',
    status: 'active',
  },
  {
    id: 'deal-002',
    name: { zh: '优品生鲜超市', en: 'UPin Fresh Market' },
    industry: INDUSTRIES.retail,
    location: { zh: '深圳', en: 'Shenzhen' },
    monthlyRevenue: 120,
    grossMargin: 28,
    operatingYears: 3,
    storeCount: 8,
    aiScore: 7.9,
    assessPassed: true,
    riskPassed: true,
    requestAmount: 800,
    revenueShareRate: 6,
    description: { zh: '深圳社区生鲜连锁，聚焦最后一公里', en: 'Shenzhen community fresh food chain, focusing on last-mile delivery' },
    submittedAt: '2026-02-12',
    status: 'active',
  },
  {
    id: 'deal-003',
    name: { zh: '悦颜医美诊所', en: 'YueYan MedSpa' },
    industry: INDUSTRIES.beauty,
    location: { zh: '上海', en: 'Shanghai' },
    monthlyRevenue: 95,
    grossMargin: 55,
    operatingYears: 4,
    storeCount: 3,
    aiScore: 8.2,
    assessPassed: true,
    riskPassed: true,
    requestAmount: 600,
    revenueShareRate: 10,
    description: { zh: '上海高端医美诊所，客单价高，复购率强', en: 'Shanghai premium medical aesthetics clinic, high AOV, strong repeat rate' },
    submittedAt: '2026-02-10',
    status: 'active',
  },
  {
    id: 'deal-004',
    name: { zh: '智学教育科技', en: 'SmartLearn EdTech' },
    industry: INDUSTRIES.education,
    location: { zh: '北京', en: 'Beijing' },
    monthlyRevenue: 45,
    grossMargin: 62,
    operatingYears: 2,
    storeCount: 5,
    aiScore: 7.5,
    assessPassed: true,
    riskPassed: false,
    requestAmount: 300,
    revenueShareRate: 7,
    description: { zh: '在线+线下融合教育品牌，主攻K12素质教育', en: 'Online-offline hybrid education brand, focused on K12 quality education' },
    submittedAt: '2026-02-08',
    status: 'reviewing',
  },
  {
    id: 'deal-005',
    name: { zh: '乐活健身工厂', en: 'LOHAS Fitness Factory' },
    industry: INDUSTRIES.fitness,
    location: { zh: '杭州', en: 'Hangzhou' },
    monthlyRevenue: 38,
    grossMargin: 48,
    operatingYears: 3,
    storeCount: 6,
    aiScore: 7.8,
    assessPassed: true,
    riskPassed: true,
    requestAmount: 250,
    revenueShareRate: 9,
    description: { zh: '杭州连锁健身品牌，会员留存率85%', en: 'Hangzhou chain fitness brand, 85% member retention rate' },
    submittedAt: '2026-02-05',
    status: 'active',
  },
  {
    id: 'deal-006',
    name: { zh: '康源大药房', en: 'KangYuan Pharmacy' },
    industry: INDUSTRIES.healthcare,
    location: { zh: '广州', en: 'Guangzhou' },
    monthlyRevenue: 85,
    grossMargin: 35,
    operatingYears: 7,
    storeCount: 20,
    aiScore: 9.1,
    assessPassed: true,
    riskPassed: true,
    requestAmount: 1000,
    revenueShareRate: 5,
    description: { zh: '广州连锁药房，20家门店，政府医保定点', en: 'Guangzhou chain pharmacy, 20 stores, government medical insurance designated' },
    submittedAt: '2026-02-01',
    status: 'active',
  },
  {
    id: 'deal-007',
    name: { zh: '鲜茶道', en: 'FreshTea Way' },
    industry: INDUSTRIES.catering,
    location: { zh: '长沙', en: 'Changsha' },
    monthlyRevenue: 52,
    grossMargin: 65,
    operatingYears: 2,
    storeCount: 15,
    aiScore: 8.0,
    assessPassed: true,
    riskPassed: true,
    requestAmount: 400,
    revenueShareRate: 8,
    description: { zh: '长沙新式茶饮品牌，15家门店覆盖核心商圈', en: 'Changsha new-style tea brand, 15 stores covering key commercial areas' },
    submittedAt: '2026-01-28',
    status: 'active',
  },
  {
    id: 'deal-008',
    name: { zh: '潮童乐园', en: 'TrendyKids Park' },
    industry: INDUSTRIES.education,
    location: { zh: '南京', en: 'Nanjing' },
    monthlyRevenue: 30,
    grossMargin: 58,
    operatingYears: 1,
    storeCount: 2,
    aiScore: 6.8,
    assessPassed: true,
    riskPassed: false,
    requestAmount: 150,
    revenueShareRate: 12,
    description: { zh: '儿童室内游乐+早教综合体，坪效优秀', en: 'Children indoor play + early education complex, excellent space efficiency' },
    submittedAt: '2026-01-25',
    status: 'reviewing',
  },
]
```

---

## 十一、交互逻辑（内联 JS 脚本）

参与通页面需要以下纯原生 JS 交互，全部通过 `<script dangerouslySetInnerHTML={{ __html: `...` }} />` 实现：

### 11.1 滚动渐现 (reveal)
```javascript
// 与 HomePage 使用完全相同的 IntersectionObserver 模式
document.addEventListener('DOMContentLoaded', function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.reveal').forEach(function(el) {
    observer.observe(el);
  });
});
```

### 11.2 全量/筛后切换
```javascript
function switchFilterMode(mode) {
  // mode: 'all' | 'filtered'
  // 切换按钮激活状态
  // 显示/隐藏不同数据集
  // 更新 KPI 数字
}
```

### 11.3 视图切换
```javascript
function switchView(view) {
  // view: 'card' | 'list'
  var cardView = document.getElementById('card-view');
  var listView = document.getElementById('list-view');
  // 切换 display
}
```

### 11.4 标记意向
```javascript
function toggleIntent(dealId) {
  // 切换按钮文本和样式
  // 更新意向数量计数
}
```

### 11.5 对比选择
```javascript
function toggleCompare(dealId) {
  // 添加/移除对比项
  // 显示/隐藏底部对比浮层
  // 更新已选计数
}
```

---

## 十二、PlaceholderPage 完整参考（你需要保持一致的部分）

以下是 PlaceholderPage 的结构，参与通的**面包屑、Hero 区顶部、前后步骤导航**必须与之保持视觉一致性：

```typescript
// PlaceholderPage 关键结构（简化版）：

// 1. 面包屑
<div class="bg-gray-50 border-b border-gray-100">
  <div class="max-w-4xl mx-auto px-4 py-3">
    <nav class="flex items-center gap-2 text-xs text-gray-400">
      <a href={ll('/')}><i class="fas fa-home text-[10px]"></i></a>
      <i class="fas fa-chevron-right text-[8px] text-gray-300"></i>
      <a href={ll('/portal')}>{产品入口}</a>
      <i class="fas fa-chevron-right text-[8px] text-gray-300"></i>
      <span class="text-[#1d1d1f] font-semibold">{当前产品名}</span>
    </nav>
  </div>
</div>

// 2. Hero 区
<section class="relative overflow-hidden pt-16 pb-12 bg-gradient-to-br from-white via-gray-50 to-[#5DC4B3]/5">
  <div class="absolute inset-0 dot-pattern opacity-20"></div>
  <div class="max-w-4xl mx-auto px-4 relative text-center">
    <ProductLogo ... size={96} />
    <span class="badge ...">{状态}</span>
    <h1 class="text-3xl font-extrabold text-[#1d1d1f]">{产品名}</h1>
    <p class="text-sm text-gray-400">{英文名}</p>
    <p class="text-base text-gray-500">{描述}</p>
    <div class="flex gap-2">{分类标签} {角色标签}</div>
  </div>
</section>

// 3. 前后步骤导航
<section class="py-8 bg-white border-t border-gray-100">
  <div class="max-w-4xl mx-auto px-4">
    <div class="flex items-stretch gap-4">
      <!-- 上一步卡片 -->
      <a class="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#5DC4B3]/30 hover:shadow-md transition-all no-underline group">
        <i class="fas fa-chevron-left text-xs text-gray-300 group-hover:text-[#5DC4B3]"></i>
        <div>
          <div class="text-[10px] text-gray-400">上一步</div>
          <div class="text-sm font-bold text-[#1d1d1f] group-hover:text-[#5DC4B3]">风控通</div>
          <div class="text-[10px] text-gray-400">Risk</div>
        </div>
      </a>
      <!-- 下一步卡片 -->
      <a class="flex items-center gap-3 p-4 rounded-xl border ... justify-end text-right">
        <div>
          <div class="text-[10px] text-gray-400">下一步</div>
          <div class="text-sm font-bold ...">条款通</div>
          <div class="text-[10px] text-gray-400">Terms</div>
        </div>
        <i class="fas fa-chevron-right ..."></i>
      </a>
    </div>
  </div>
</section>
```

---

## 十三、关键设计原则

1. **不要创造新的设计语言** — 所有颜色、圆角、阴影、字号、字重都从上面的设计系统中选取
2. **面包屑和前后导航与 PlaceholderPage 100% 一致** — 这些是全站统一组件
3. **参与通专属色仅用于参与通的内容区域**（卡片色条、行业标签底色、KPI 数字、AI 评分条等），全局元素（按钮、链接、Navbar）仍用品牌色 #5DC4B3
4. **Apple 风格** — 大量留白、文字层次清晰、动效克制优雅
5. **响应式** — 所有 Section 必须适配 mobile/tablet/desktop（sm/md/lg/xl 断点）
6. **渐现动画** — 每个 Section 使用 `class="reveal"` + stagger 延迟
7. **无状态 SSR** — 所有交互通过 inline JS 实现，不依赖客户端框架状态
8. **金额格式** — 中文用 `¥68万`，英文用 `¥680K`

---

## 十四、组件签名（FC 类型）

```typescript
export const DealConnectPage: FC<{ lang?: Lang }> = ({ lang = 'zh' }) => {
  const l = lang
  const ll = (href: string) => langLink(href, l)
  
  // ... Mock 数据定义 ...
  // ... 筛选/排序后的数据计算 ...
  // ... 上一步/下一步产品查找 ...
  
  return (
    <div class="min-h-screen">
      <Navbar active="" lang={l} />
      {/* Section 1-11 */}
      <Footer lang={l} />
      
      {/* 内联交互脚本 */}
      <script dangerouslySetInnerHTML={{ __html: `...` }} />
    </div>
  )
}
```

---

## 十五、最终检查清单

- [ ] Navbar 和 Footer 与主站所有其他页面完全一致
- [ ] 面包屑样式与 PlaceholderPage 完全一致
- [ ] 前后步骤导航样式与 PlaceholderPage 完全一致
- [ ] 所有品牌色使用 #5DC4B3，不使用其他自创绿色
- [ ] 参与通专属色仅用 #D1FAE5(浅)和 #10B981(深)，范围限定在内容区
- [ ] 文字层次严格遵守：#1d1d1f / #6e6e73 / #86868b / #aeaeb2
- [ ] 卡片使用 card-hover 类
- [ ] 所有按钮有 hover/active 状态
- [ ] 完整中英双语覆盖（每个文本都有 zh/en 版本）
- [ ] 移动端布局正常（grid 在小屏幕降为单列）
- [ ] 导航链接正确（面包屑回首页/产品入口，上一步 /risk，下一步 /terms）
- [ ] 所有链接使用 langLink() 处理语言参数
- [ ] Mock 数据真实合理（金额、比例、年限、评分都在合理范围）
- [ ] 滚动渐现动画正常工作
- [ ] 视图切换（卡片/列表）功能正常
- [ ] 意向标记交互正常
- [ ] 数据管道可视化清晰可读
- [ ] 空状态有 CTA 引导
- [ ] index.tsx 中 'opportunity' 从 productIds 移除，独立路由注册

---

**总结：你只做一件事——新建 DealConnectPage.tsx + 改一行 index.tsx 路由。参与通是主站中的一个页面，跟主站用一样的 Navbar、Footer、设计系统、颜色、字体、动效。不要改其他任何文件。**
