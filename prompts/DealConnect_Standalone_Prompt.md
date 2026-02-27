# ═══════════════════════════════════════════════════════════════
# 参与通 (Deal Connect) — 独立全栈应用
# 版本: V20 | 日期: 2026-02-26
# ═══════════════════════════════════════════════════════════════

## 你要做什么

从零搭建一个**独立的参与通 (Deal Connect) 全栈 Web 应用**。

这个应用是 Micro Connect 滴灌通平台"9个通"中的第5个产品——投资者统一项目看板。
它是一个**独立部署的应用**（跟合约通 Contract Connect 一样），主站通过链接跳转过来。
用户打开这个应用后，看到的是一个完整的、可交互的投资项目看板。

**不需要 clone 任何主站代码**。这是一个全新的项目。
但是设计风格、颜色、字体、交互必须跟主站保持一致（下面会给你完整的设计系统）。

---

## 技术栈

- **框架**: Hono + TypeScript + JSX（SSR 服务端渲染）
- **部署**: Cloudflare Pages（通过 wrangler）
- **样式**: Tailwind CSS (CDN) + 内联 CSS Design Token
- **图标**: FontAwesome 6.4 (CDN)
- **字体**: Inter + Montserrat + Noto Sans SC (Google Fonts)
- **交互**: 纯原生 JS（inline script），不用 React/Vue
- **i18n**: 通过 `?lang=en` URL 参数切换中英文，默认中文

请用 `npm create hono@latest` 的 `cloudflare-pages` 模板创建项目。

---

## 参与通的业务定位

参与通在滴灌通 Y 型业务流程中的位置：

```
身份通(1) ─┬─ 发起通(2) [融资者上传数据] ──────────────────────→
            │                                                    ↓
            └─ 评估通(3) → 风控通(4) → 【参与通(5)】→ 条款通(6) → 合约通(7) → 结算通(8) → 履约通(9)
```

- **角色**: 投资者专属
- **功能**: 投资者的统一项目看板——浏览通过评估通+风控通筛选后的融资项目
- **核心规则**: 无筛子 = 展示全量项目（保证融资者曝光）；有筛子 = 只展示通过的项目
- **上一步**: 风控通 (Risk Connect)
- **下一步**: 条款通 (Terms Connect)
- **状态**: 已上线 (Live)
- **产品色**: 浅色 `#D1FAE5`，深色 `#10B981`

---

## 完整设计系统（必须100%遵守）

### 品牌色（全局统一，与主站一致）
```
主品牌色:     #5DC4B3
品牌浅:       #7DD4C7
品牌深:       #3D8F83 (hover)
品牌强调:     #49A89A
Logo亮:       #2EC4B6
Logo亮2:      #3DD8CA
Logo深:       #28A696
```

### 参与通专属色
```
浅色:   #D1FAE5  (背景、行业标签底色、KPI卡片强调)
深色:   #10B981  (标题、图标、进度条、CTA按钮)
```

### 语义色
```
信息:   #32ade6
成功:   #34c759  (筛选通过标记)
警告:   #ff9f0a
错误:   #ff375f
靛蓝:   #6366F1
紫罗兰: #8B5CF6
```

### 文字层次（严格遵守，禁止纯黑 #000000）
```
标题/主文字:   #1d1d1f
标题2:         #1a1a1a
二级文字:      #6e6e73
三级文字:      #86868b
占位符:        #aeaeb2
```

### 背景色
```
页面背景:   #f5f5f7
卡片背景:   rgba(255, 255, 255, 0.88)
导航栏:     rgba(255, 255, 255, 0.92)
分割线:     #f1f5f9
```

### 圆角
```
xs:  4px    sm:  8px    md:  12px
lg:  16px   xl:  20px   2xl: 24px
3xl: 32px   full: 9999px
```

### 阴影（Apple 风格多层深度）
```css
--shadow-xs: 0 1px 2px rgba(0,0,0,0.04);
--shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
--shadow-md: 0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06);
--shadow-lg: 0 4px 8px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08);
--shadow-card: 0 1px 1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.05);
--shadow-card-hover: 0 4px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(93,196,179,0.1);
```

### 动效
```css
--ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-apple: cubic-bezier(0.28, 0.11, 0.32, 1);
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
--duration-fast: 180ms;
--duration-normal: 280ms;
--duration-slow: 420ms;
```

### 字体栈
```
正文: -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display', 'Segoe UI', Roboto, 'Noto Sans SC', sans-serif
品牌: 'Montserrat', 'Inter', 'Futura', 'Helvetica Neue', sans-serif
```

### Tailwind 配置（放在 renderer 的 `<script>` 中）
```javascript
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Noto Sans SC', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
        mono: ['Montserrat', 'Inter', 'Futura', 'Helvetica Neue', 'sans-serif']
      },
      colors: {
        brand: { DEFAULT: '#5DC4B3', light: '#7DD4C7', dark: '#3D8F83', accent: '#49A89A' },
        logo: { bright: '#2EC4B6', bright2: '#3DD8CA', deep: '#28A696' },
        semantic: { info: '#32ade6', success: '#34c759', warning: '#ff9f0a', error: '#ff375f' },
        text: { primary: '#1d1d1f', title: '#1a1a1a', secondary: '#6e6e73', tertiary: '#86868b', placeholder: '#aeaeb2' },
        surface: { page: '#f5f5f7', card: 'rgba(255, 255, 255, 0.88)', divider: '#f1f5f9' }
      },
      borderRadius: { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '20px', '2xl': '24px', '3xl': '32px' }
    }
  }
}
```

---

## 品牌 Logo（SVG 组件）

参与通是滴灌通产品矩阵的一部分，需要显示品牌 Logo。Logo 由两个重叠的圆组成：

```html
<!-- 双圆 Logo SVG — 品牌标识 -->
<svg width="32" height="32" viewBox="0 0 80 80">
  <defs>
    <linearGradient id="gt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2EC4B6"/>
      <stop offset="100%" stop-color="#3DD8CA"/>
    </linearGradient>
    <linearGradient id="gb" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#28A696"/>
      <stop offset="100%" stop-color="#2EC4B6"/>
    </linearGradient>
  </defs>
  <circle cx="44" cy="28" r="22" fill="url(#gt)"/>
  <circle cx="36" cy="44" r="22" fill="url(#gb)" opacity="0.85"/>
</svg>
```

品牌全名显示：`MICRO CONNECT 滴灌通`（英文用 Montserrat 字体）

---

## 导航栏（Navbar）

独立应用自己实现一个轻量导航栏：

- 粘性顶部 `sticky top-0 z-50`
- 毛玻璃效果 `background: rgba(255,255,255,0.92); backdrop-filter: blur(24px) saturate(180%);`
- 底部细线 `border-bottom: 0.5px solid rgba(0,0,0,0.06)`
- 滚动后加阴影
- 高度 56px
- 内容：
  - 左侧：品牌 Logo + "MICRO CONNECT" 文字，点击跳回主站首页
  - 中间：产品名 "参与通 Deal Connect"
  - 右侧：语言切换按钮（中/EN）+ "返回主站"按钮

---

## 页脚（Footer）

轻量页脚：

- 深色 Aurora 背景：`radial-gradient(ellipse 130% 90% at 50% 20%, #0f3d36 0%, #0b312c 40%, #082420 70%, #061b18 100%)`
- 内容：品牌 Logo + 产品名 + 版权信息 `© 2026 Micro Connect Group`
- 链接：返回主站、隐私政策、服务条款（可用 # 占位）

---

## 页面结构（单页应用，一个主路由 `/`）

整个应用只有一个页面 `/`，从上到下包含以下 Section：

### Section 1: Hero 区
- 浅色渐变背景 `bg-gradient-to-br from-white via-gray-50 to-[#10B981]/5`
- 点阵背景图案叠加
- 居中布局，内容：
  1. 产品 Logo（双圆 + "Deal" + "参与通" 文字）
  2. 状态徽章：`已上线` / `Live`（绿色）
  3. 主标题：`参与通` / `Deal Connect`（`text-3xl font-extrabold text-[#1d1d1f]`）
  4. 副标题：`投资者统一项目看板` / `Unified Investor Deal Dashboard`
  5. 描述文字
  6. 标签行：`投资者路径` 分类标签 + `投资者专属` 角色标签
  7. 两个 CTA：主按钮 `bg-[#10B981] text-white` + 次按钮 `border-[#10B981]/30 text-[#10B981]`

### Section 2: KPI 概览卡片
- 4 个 KPI 横排（`grid grid-cols-2 md:grid-cols-4 gap-4`）
- 每个卡片白底 `bg-white rounded-xl border border-gray-100 p-5`
- Mock 数据：
  ```
  筛后项目: 47 ↑12%    全量项目: 238 +18新
  投资意向: 12          平均评分: 8.6/10
  ```

### Section 3: 筛选控制条
- 粘性定位 `sticky top-[56px] z-30`
- 毛玻璃背景
- 搜索框 + 全量/筛后 Toggle + 排序下拉 + 卡片/列表视图切换

### Section 4: 项目看板（核心）
- **卡片视图**（默认）：`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`
- **列表视图**：表格式每行一条
- JS 切换视图

**单个项目卡片：**
```
┌─────────────────────────────┐
│ ▀▀▀▀▀▀▀▀▀▀▀▀ (绿色顶部色条)  │
│ 餐饮          2026-02-15    │
│ 张记川菜连锁                 │
│ 成都地区知名川菜品牌...       │
│ ┌────────┐ ┌────────┐      │
│ │月均流水 │ │毛利率   │      │
│ │¥68万   │ │42%     │      │
│ ├────────┤ ├────────┤      │
│ │经营年限 │ │门店数   │      │
│ │5年     │ │12家    │      │
│ └────────┘ └────────┘      │
│ AI 8.6 ████████░░           │
│ ✓评估通过  ✓风控通过         │
│ [标记意向]         [对比]    │
└─────────────────────────────┘
```

卡片关键样式：
- 整体 `card-hover bg-white rounded-xl border border-gray-100`（card-hover 的 CSS 需要在 style 中定义）
- 顶部色条 `h-1 bg-gradient-to-r from-[#10B981] to-[#34d399]`
- 行业标签 `bg-[#D1FAE5] text-[#10B981]`
- 指标网格 `bg-gray-50 rounded-lg`
- AI 评分进度条 `from-[#10B981] to-[#34d399]`
- 筛选通过徽章 `bg-green-50 text-green-600 border-green-100`
- 主按钮 `bg-[#10B981] text-white hover:bg-[#059669]`

### Section 5: 项目对比浮层
- 底部固定 `fixed bottom-0 left-0 right-0`
- 选择 ≥2 个项目时显示
- "开始对比"按钮 + "清空"按钮
- 默认隐藏

### Section 6: 智能推荐区
- 横向滚动 `flex gap-4 overflow-x-auto`
- 3-4 张小卡片

### Section 7: 投资意向汇总
- 已标记项目列表
- CTA "进入条款协商" → `#`（占位链接）

### Section 8: 数据管道可视化
- 横向 4 节点流程图：
  ```
  发起通(238) → 评估通(128通过) → 风控通(72通过) → 参与通(47项目)
  ```
- 每节点显示通过数/淘汰数
- 参与通节点高亮 `bg-[#D1FAE5] border-[#10B981]`
- 标注："无筛子 = 展示全部238个项目"

### Section 9: 核心功能展示
- 5 个功能卡片（编号 01-05）
- 功能：筛后项目看板、全量项目浏览、项目对比、投资意向标记、智能推荐

### Section 10: Y 型流程导航
- 简化版流程条：显示参与通在 9 个"通"中的位置
- 上一步：风控通（链接到 `#`）
- 下一步：条款通（链接到 `#`）
- 当前步高亮

### Section 11: Footer

---

## Mock 数据

在应用内定义 8 条 Mock 项目数据：

```typescript
interface MockDeal {
  id: string
  name: { zh: string; en: string }
  industry: { zh: string; en: string }
  location: { zh: string; en: string }
  monthlyRevenue: number     // 万元
  grossMargin: number        // 百分比
  operatingYears: number
  storeCount: number
  aiScore: number            // 1-10
  assessPassed: boolean
  riskPassed: boolean
  requestAmount: number      // 万元
  revenueShareRate: number   // 百分比
  description: { zh: string; en: string }
  submittedAt: string
  status: 'active' | 'reviewing' | 'intent-marked'
}
```

8 条数据覆盖 6 个行业：

| # | 名称 | 行业 | 城市 | 月流水(万) | 毛利率 | 年限 | 门店 | AI评分 | 评估 | 风控 | 融资(万) | 分成 |
|---|------|------|------|-----------|--------|------|------|--------|------|------|---------|------|
| 1 | 张记川菜连锁 | 餐饮 | 成都 | 68 | 42% | 5 | 12 | 8.6 | ✓ | ✓ | 500 | 8% |
| 2 | 优品生鲜超市 | 零售 | 深圳 | 120 | 28% | 3 | 8 | 7.9 | ✓ | ✓ | 800 | 6% |
| 3 | 悦颜医美诊所 | 医美 | 上海 | 95 | 55% | 4 | 3 | 8.2 | ✓ | ✓ | 600 | 10% |
| 4 | 智学教育科技 | 教育 | 北京 | 45 | 62% | 2 | 5 | 7.5 | ✓ | ✗ | 300 | 7% |
| 5 | 乐活健身工厂 | 健身 | 杭州 | 38 | 48% | 3 | 6 | 7.8 | ✓ | ✓ | 250 | 9% |
| 6 | 康源大药房 | 大健康 | 广州 | 85 | 35% | 7 | 20 | 9.1 | ✓ | ✓ | 1000 | 5% |
| 7 | 鲜茶道 | 餐饮 | 长沙 | 52 | 65% | 2 | 15 | 8.0 | ✓ | ✓ | 400 | 8% |
| 8 | 潮童乐园 | 教育 | 南京 | 30 | 58% | 1 | 2 | 6.8 | ✓ | ✗ | 150 | 12% |

其中：评估全部通过，风控有 2 个未通过（#4、#8）。
筛后视图显示 6 个（评估+风控都通过的），全量视图显示全部 8 个。

---

## i18n 双语

所有 UI 文本都用 `{ zh: '中文', en: 'English' }` 对象定义，通过一个 `tt(obj, lang)` 函数取值。
语言通过 URL `?lang=en` 切换，默认中文。

---

## 交互（纯原生 JS inline script）

1. **滚动渐现** — IntersectionObserver 给 `.reveal` 元素添加 `.visible` 类
2. **全量/筛后切换** — Toggle 按钮切换显示不同数据集，更新 KPI 数字
3. **卡片/列表视图切换** — 切换 display
4. **标记投资意向** — 切换按钮状态和文本
5. **对比选择** — 选择 ≥2 项时底部浮层出现
6. **语言切换** — 修改 URL 参数刷新页面

---

## 关键 CSS 类（需要在 style 中定义）

以下是必须实现的核心 CSS 类：

```css
/* 毛玻璃导航 */
.navbar-glass {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(24px) saturate(180%);
  border-bottom: 0.5px solid rgba(0,0,0,0.06);
  transition: box-shadow 0.3s cubic-bezier(0.25,0.1,0.25,1);
}
.navbar-glass.scrolled {
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
}

/* 卡片 hover */
.card-hover {
  background: rgba(255,255,255,0.88);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.05);
  transition: transform 280ms cubic-bezier(0.22,1,0.36,1), box-shadow 280ms cubic-bezier(0.22,1,0.36,1);
  position: relative; overflow: hidden;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(93,196,179,0.1);
  border-color: rgba(93,196,179,0.2);
}

/* 滚动渐现 */
.reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s cubic-bezier(0.19,1,0.22,1), transform 0.7s cubic-bezier(0.19,1,0.22,1); }
.reveal.visible { opacity: 1; transform: translateY(0); }
.stagger-1 { transition-delay: 0.05s; }
.stagger-2 { transition-delay: 0.10s; }
.stagger-3 { transition-delay: 0.15s; }
.stagger-4 { transition-delay: 0.20s; }
.stagger-5 { transition-delay: 0.25s; }
.stagger-6 { transition-delay: 0.30s; }

/* Aurora 深色背景（Footer） */
.aurora-footer {
  background: radial-gradient(ellipse 130% 90% at 50% 20%, #0f3d36 0%, #0b312c 40%, #082420 70%, #061b18 100%);
  position: relative; overflow: hidden;
}

/* 点阵图案 */
.dot-pattern {
  background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
}

/* 文本截断 */
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* 计数动画 */
@keyframes countUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.count-animate { animation: countUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }
```

---

## 设计原则

1. **Apple 风格** — 大量留白、文字层次分明、动效克制优雅
2. **品牌色 #5DC4B3 用于全局**（导航栏链接、返回按钮、品牌相关）
3. **参与通专属色 #10B981 用于内容区**（CTA、进度条、行业标签、KPI强调）
4. **禁止纯黑 #000000** — 最深颜色为 #1d1d1f
5. **所有交互元素有 hover/active 状态**
6. **响应式** — mobile/tablet/desktop 全适配
7. **金额格式** — 中文 `¥68万`，英文 `¥680K`

---

## 交付要求

请创建完整可运行的 Hono 项目，项目能 build 并通过 wrangler pages dev 启动。
主路由 `/` 渲染参与通完整页面，所有 Section 功能可交互。
