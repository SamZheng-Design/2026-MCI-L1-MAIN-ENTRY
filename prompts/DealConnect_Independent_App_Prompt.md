# 关于你提出的方案的重要澄清

## 不要复制L1主站架构文件

你理解错了我的需求。请注意以下关键点：

### 我要的是什么

1. **这个项目是一个独立的全栈应用，只做「参与通 (Deal Connect)」这一个产品**
2. 参与通是 Micro Connect 滴灌通主站（L1仓库）9个"通"中的第5个
3. 主站（L1）已经有一个完整的产品矩阵和统一入口，参与通在主站里目前只是一个占位页
4. **我要你做的是：把这个独立项目打造成参与通的完整功能页面**，做好之后主站可以通过链接跳转过来

### 我不需要什么

- **不要**复制 L1 主站的 renderer.tsx、data.ts、i18n.ts、Navbar.tsx、Footer.tsx、Logos.tsx、PlaceholderPage.tsx 到这个项目
- **不要**改造成 L1 的路由模式
- **不要**搭建 L1 的页面系统
- **不要**做其他任何"通"（身份通、评估通、风控通等都不需要）
- **不要**影响当前项目已有的任何功能

### 正确的理解

这个独立项目 = **参与通的完整功能实现**

它需要做到：
1. **设计风格与主站一致** — 使用相同的品牌色(#5DC4B3)、设计Token、Apple风格UI美学、动效规范（这些信息我在下面的Prompt里已经全部提供了，你照着做就行，不需要去复制主站文件）
2. **是一个完整独立的Web应用** — 有自己的路由、自己的组件、自己的数据层
3. **只做参与通这一个产品的功能页面** — 投资者项目看板、筛选、对比、意向标记等
4. **做好后主站通过URL跳转过来** — 就像现在主站的合约通(Contract Connect)一样，点击就跳到独立应用

### 合约通的先例

主站的合约通(Contract Connect)就是这样做的：它是一个独立部署的全栈应用，主站通过 externalUrl 字段配置跳转链接。用户在主站点击"合约通"就会新标签页打开独立应用。**参与通要做的事情和合约通一模一样——独立应用，主站跳转过来。**

---

## 所以请你这样做

1. **保留当前项目已有的所有功能不变**
2. **在当前项目中，按照下面Prompt里的设计规范和页面结构，实现参与通(Deal Connect)的完整功能页面**
3. **设计风格参考下面Prompt中提供的品牌色系、设计Token、CSS规范**（不是去复制主站文件，而是在这个项目里按照同样的设计规范来写）
4. **做成一个投资者可以直接使用的项目看板应用**

以下是完整的参与通设计与功能规范（你需要的所有信息都在里面了）：

---

# ═══════════════════════════════════════════════════════════════════════
# 参与通 (Deal Connect) — 独立全栈应用 完整功能规范
# 这是 Micro Connect 滴灌通 超级Agent产品矩阵中第5通的独立应用
# 主站通过URL跳转到本应用（与合约通模式相同）
# ═══════════════════════════════════════════════════════════════════════

## 一、你的角色

你是一名资深全栈产品设计工程师，正在为 **Micro Connect 滴灌通** 的 RBF（收入分成融资）平台开发「参与通 (Deal Connect)」的**独立全栈应用**。

这个应用是滴灌通主站9个"通"中的第5个，独立部署，主站通过链接跳转过来。

**必须遵守的原则**：
- 与主站保持设计风格一致（品牌色、设计Token、UI美学，但不是复制主站代码）
- 这是一个独立应用，有自己的组件体系和页面结构
- 中英双语支持 (?lang=en 切换)
- 响应式设计 (mobile-first)
- Apple 风格 UI 美学：大量留白、精致动效、毛玻璃质感

---

## 二、产品定位

### 2.1 参与通在Y型流程中的位置

```
                   ┌─── 融资者路径 ──→ 发起通(上传数据)
  身份通(统一入口) ─┤
                   └─── 投资者路径 ──→ 评估通 → 风控通 → 【参与通(看板)】★ 这个应用
                                                ↓
                          Y型汇合点：条款通 → 合约通 → 结算通 → 履约通
```

### 2.2 核心身份

| 属性 | 值 |
|---|---|
| 中文名 | 参与通 |
| 英文名 | Deal Connect |
| 英文简称 | Deal |
| 角色归属 | investor (投资者专属) |
| 流程阶段 | investor-view (投资者看板展示) |
| 主题色-浅 | #D1FAE5 (浅绿) |
| 主题色-深 | #10B981 (翠绿) |
| 上游 | 风控通 (Risk Connect) 筛选通过的项目流入 |
| 下游 | 投资者选中项目后进入条款通 (Terms Connect) 协商 |

### 2.3 业务逻辑核心

参与通是投资者的**统一项目看板**——展示通过评估通和风控通筛选后的融资项目，投资者在此主动参与投资。

**关键规则**:
- **有筛子** → 只展示通过评估通+风控通双重筛选的项目
- **无筛子** → 展示全量融资项目（保证融资者曝光）
- **数据管道**: `发起通上传 → 评估通筛选 → 风控通筛选 → 参与通展示`

**核心功能**: 筛后项目看板 / 全量项目浏览 / 项目对比 / 投资意向标记 / 智能推荐

---

## 三、设计系统规范（与主站保持一致，在本项目中自行实现）

以下是主站的设计规范，你需要在这个独立项目中**按照相同规范来写CSS和组件**，而不是复制主站文件。

### 3.1 品牌色系

| 名称 | 色值 | 用途 |
|---|---|---|
| 品牌主色 | #5DC4B3 | 主按钮/链接/CTA/强调 |
| 品牌浅色 | #7DD4C7 | hover背景 |
| 品牌深色 | #3D8F83 | hover文字/active状态 |
| Logo亮绿 | #2EC4B6 | Logo渐变/装饰 |
| Logo浅绿 | #3DD8CA | Logo渐变终点 |
| Logo深绿 | #28A696 | Logo渐变起点 |

### 3.2 参与通专属色

| 名称 | 色值 | 用途 |
|---|---|---|
| 浅色 | #D1FAE5 | 参与通背景/高亮区/图标背景 |
| 深色 | #10B981 | 参与通标题/图标/强调/选中态 |

### 3.3 语义色

| 名称 | 色值 | 用途 |
|---|---|---|
| Info | #32ade6 | 信息提示 |
| Success | #34c759 | 成功/已通过 |
| Warning | #ff9f0a | 警告/待审核 |
| Error | #ff375f | 错误/拒绝 |
| Indigo | #6366F1 | AI筛子相关（评估通/风控通） |

### 3.4 文字层次

| 层级 | 色值 | 用途 |
|---|---|---|
| primary | #1d1d1f | 标题/正文（禁止使用纯黑#000） |
| secondary | #6e6e73 | 辅助说明文字 |
| tertiary | #86868b | 三级文字/标签 |
| placeholder | #aeaeb2 | 占位符/极浅灰 |

### 3.5 字体

```
英文主体: Inter
品牌/Logo/数字: Montserrat
中文: Noto Sans SC
系统回退: -apple-system, BlinkMacSystemFont, SF Pro Display, Segoe UI, Roboto
```

### 3.6 圆角

| 等级 | 值 | 用途 |
|---|---|---|
| xs | 4px | 小标签 |
| sm | 8px | 按钮/输入框 |
| md | 12px | 卡片内元素 |
| lg | 16px | 中型卡片 |
| xl | 20px | 大型卡片 |
| 2xl | 24px | 弹窗/面板 |

### 3.7 阴影 (Apple风格分层)

```css
卡片默认: 0 1px 1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.05);
卡片hover: 0 4px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(93,196,179,0.1);
大阴影:   0 4px 8px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08);
```

### 3.8 动效

| 名称 | 值 | 用途 |
|---|---|---|
| spring | cubic-bezier(0.22, 1, 0.36, 1) | 卡片浮起 |
| smooth | cubic-bezier(0.25, 0.1, 0.25, 1) | 颜色过渡 |
| apple | cubic-bezier(0.28, 0.11, 0.32, 1) | 模态/滑块 |
| fast | 180ms | 按钮hover |
| normal | 280ms | 卡片过渡 |

### 3.9 核心UI模式

- **毛玻璃卡片**: `background: rgba(255,255,255,0.88); backdrop-filter: blur(24px) saturate(180%);` + 1px半透明边框 + hover浮起4px + 顶部3px渐变彩条显现
- **深色科技背景 (Aurora)**: `radial-gradient(ellipse 120% 80% at 50% 45%, #13524a 0%, #0f3d36 30%, #0b312c 55%, #082420 80%, #061b18 100%)` + 呼吸光晕
- **滚动渐现**: 元素初始opacity:0 + translateY(32px)，IntersectionObserver触发动画入场
- **按钮**: 品牌渐变 `linear-gradient(135deg, #5DC4B3, #49A89A)` + 内嵌高光 + hover浮起1px

### 3.10 导航栏样式

- Sticky顶部，高度56px
- 毛玻璃: `background: rgba(255,255,255,0.92); backdrop-filter: blur(24px) saturate(180%);`
- 滚动后添加阴影
- 包含: Logo + 导航链接 + 语言切换(中/EN) + CTA按钮
- 导航栏应包含"返回主站"链接（指向主站URL）

### 3.11 页脚样式

- 深色Aurora背景
- 品牌Logo + 简介 + 社交图标
- 产品链接 + 公司链接 + 联系方式
- 版权信息 + 合规文案

---

## 四、页面结构设计 (从上到下, 12个Section)

### Section 1: 导航栏
- 本应用自己的导航栏（按照3.10规范实现）
- 包含"返回主站"的链接

### Section 2: 面包屑导航
- 路径: `主站首页 > 产品入口 > 参与通`
- "主站首页"和"产品入口"链接指向主站URL（外部链接）

### Section 3: Hero 区
- **布局**: 左文右图 (大屏并排) / 上文下图 (移动端)
- **左侧**:
  - 产品Logo
  - 状态徽章 (已上线/绿色)
  - 大标题: "参与通" / "Deal Connect"
  - 描述: 投资者统一项目看板
  - 角色标签 (投资者) + 分类标签 (投资者路径)
  - CTA: "查看项目看板" → 锚点到看板区
- **右侧**: 数据管道迷你图示
  - 发起通(黄) → 评估通(靛) → 风控通(靛) → **参与通(绿,高亮)**

### Section 4: KPI 数据总览
- 4张KPI卡片 (grid 1/2/4列响应式):
  - 筛后项目: 47 (↑12%)
  - 项目总池: 238 (+18本月)
  - 投资意向: 12 (已标记)
  - 平均评分: 8.6/10

### Section 5: 筛选控制条
- Sticky（导航栏下方）
- 搜索框 + 筛选模式(全量/筛后) + 排序 + 视图切换(卡片/列表)

### Section 6: 项目看板 (核心功能区)
#### 卡片视图 (默认):
- 3列网格，每张卡片包含:
  - 行业色带(3px) + 项目名 + 行业标签
  - 描述 + 关键指标(月流水/毛利率/年限/门店)
  - AI评分进度条
  - 筛选状态徽章(评估通过/风控通过)
  - 操作: 查看详情 / 标记意向 / 对比勾选

#### 列表视图:
- 表格: 序号/名称/行业/月流水/毛利率/AI评分/状态/操作
- 交替行背景

### Section 7: 项目对比浮层
- 已选≥2项目时底部滑入
- 显示已选项目 + "开始对比"按钮

### Section 8: 智能推荐区
- 横向滚动推荐卡片
- 推荐原因标签: 高评分/行业匹配/增长强劲

### Section 9: 投资意向汇总
- 已标记意向的项目列表
- 快捷操作: 进入条款通 / 移除

### Section 10: 数据管道可视化 (大型)
- 4节点流程图: 发起通 → 评估通 → 风控通 → **参与通(高亮)**
- 当前节点放大+光晕效果

### Section 11: 空状态
- 筛后无结果时显示
- 引导: 调整筛子策略 / 切换全量浏览

### Section 12: 页脚
- 按照3.11规范实现

---

## 五、Mock 数据

```typescript
const INDUSTRIES = [
  { id: 'catering', zh: '餐饮', en: 'Catering', color: '#F59E0B', icon: 'fa-utensils' },
  { id: 'retail', zh: '零售', en: 'Retail', color: '#3B82F6', icon: 'fa-store' },
  { id: 'beauty', zh: '医美', en: 'Beauty', color: '#EC4899', icon: 'fa-spa' },
  { id: 'education', zh: '教育', en: 'Education', color: '#8B5CF6', icon: 'fa-graduation-cap' },
  { id: 'fitness', zh: '健身', en: 'Fitness', color: '#10B981', icon: 'fa-dumbbell' },
  { id: 'healthcare', zh: '大健康', en: 'Healthcare', color: '#06B6D4', icon: 'fa-heartbeat' },
]

interface DealProject {
  id: string
  name: { zh: string; en: string }
  industry: string
  monthlyRevenue: number       // 万元/月
  grossMargin: number          // 百分比
  operatingYears: number
  storeCount: number
  aiScore: number              // 0-10
  assessPassed: boolean
  riskPassed: boolean
  status: 'screening' | 'passed' | 'intent' | 'negotiating'
  description: { zh: string; en: string }
  location: { zh: string; en: string }
  requestAmount: number        // 融资金额(万)
  revenueShareRate: number     // 收入分成比例(%)
  submittedAt: string
}

// 至少8条Mock数据
const MOCK_PROJECTS: DealProject[] = [
  {
    id: 'p001',
    name: { zh: '沪上阿姨鲜果茶', en: 'Auntie Shanghai Fresh Tea' },
    industry: 'catering',
    monthlyRevenue: 85, grossMargin: 62, operatingYears: 4, storeCount: 12,
    aiScore: 9.2, assessPassed: true, riskPassed: true, status: 'passed',
    description: { zh: '华东地区领先的鲜果茶连锁品牌，月均流水稳定增长，复购率超过45%', en: 'Leading fresh fruit tea chain in East China with stable monthly revenue growth and over 45% repeat purchase rate' },
    location: { zh: '上海·静安', en: 'Shanghai, Jing\'an' },
    requestAmount: 500, revenueShareRate: 8.5, submittedAt: '2026-02-20'
  },
  {
    id: 'p002',
    name: { zh: '悦动健身工坊', en: 'JoyFit Studio' },
    industry: 'fitness',
    monthlyRevenue: 42, grossMargin: 55, operatingYears: 2, storeCount: 3,
    aiScore: 7.8, assessPassed: true, riskPassed: true, status: 'intent',
    description: { zh: '专注团课+私教模式的精品健身房，单店人效高于行业均值30%', en: 'Boutique fitness studio focusing on group classes and personal training, 30% above industry average in per-store efficiency' },
    location: { zh: '深圳·南山', en: 'Shenzhen, Nanshan' },
    requestAmount: 200, revenueShareRate: 10.0, submittedAt: '2026-02-18'
  },
  {
    id: 'p003',
    name: { zh: '颜值密码医美', en: 'BeautyCode MedSpa' },
    industry: 'beauty',
    monthlyRevenue: 120, grossMargin: 71, operatingYears: 5, storeCount: 6,
    aiScore: 8.9, assessPassed: true, riskPassed: true, status: 'negotiating',
    description: { zh: '轻医美连锁品牌，聚焦皮肤管理和非手术项目，会员留存率68%', en: 'Light medical aesthetics chain focused on skin management and non-surgical treatments, 68% member retention' },
    location: { zh: '杭州·西湖', en: 'Hangzhou, Xihu' },
    requestAmount: 800, revenueShareRate: 7.0, submittedAt: '2026-02-15'
  },
  {
    id: 'p004',
    name: { zh: '鲜味坊社区食堂', en: 'FreshBite Community Kitchen' },
    industry: 'catering',
    monthlyRevenue: 35, grossMargin: 48, operatingYears: 1, storeCount: 2,
    aiScore: 6.5, assessPassed: true, riskPassed: false, status: 'screening',
    description: { zh: '社区型中式快餐，翻台率高但风控材料待补充', en: 'Community Chinese fast food with high turnover rate but risk documentation needs completion' },
    location: { zh: '成都·武侯', en: 'Chengdu, Wuhou' },
    requestAmount: 150, revenueShareRate: 12.0, submittedAt: '2026-02-22'
  },
  {
    id: 'p005',
    name: { zh: '星途教育科技', en: 'StarPath EdTech' },
    industry: 'education',
    monthlyRevenue: 68, grossMargin: 58, operatingYears: 3, storeCount: 8,
    aiScore: 8.1, assessPassed: true, riskPassed: true, status: 'passed',
    description: { zh: 'K12素质教育综合体，编程+美术+音乐三线并行，续费率72%', en: 'K12 quality education complex with coding, art, and music programs, 72% renewal rate' },
    location: { zh: '北京·朝阳', en: 'Beijing, Chaoyang' },
    requestAmount: 350, revenueShareRate: 9.0, submittedAt: '2026-02-12'
  },
  {
    id: 'p006',
    name: { zh: '潮流便利GO', en: 'TrendyMart GO' },
    industry: 'retail',
    monthlyRevenue: 95, grossMargin: 32, operatingYears: 6, storeCount: 25,
    aiScore: 8.4, assessPassed: true, riskPassed: true, status: 'passed',
    description: { zh: '新零售便利店，自有供应链+线上线下一体化，日均客流超2000人次', en: 'New retail convenience chain with proprietary supply chain and O2O integration, 2,000+ daily visitors' },
    location: { zh: '广州·天河', en: 'Guangzhou, Tianhe' },
    requestAmount: 600, revenueShareRate: 6.5, submittedAt: '2026-02-08'
  },
  {
    id: 'p007',
    name: { zh: '康养源大健康', en: 'VitaWell Health' },
    industry: 'healthcare',
    monthlyRevenue: 55, grossMargin: 65, operatingYears: 3, storeCount: 4,
    aiScore: 7.3, assessPassed: true, riskPassed: false, status: 'screening',
    description: { zh: '中医理疗+养生调理连锁，回头客占比超60%，部分资质待核验', en: 'TCM therapy and wellness chain, 60%+ repeat customers, some certifications pending' },
    location: { zh: '南京·鼓楼', en: 'Nanjing, Gulou' },
    requestAmount: 280, revenueShareRate: 9.5, submittedAt: '2026-02-19'
  },
  {
    id: 'p008',
    name: { zh: '味蕾工坊烘焙', en: 'TasteBud Bakery' },
    industry: 'catering',
    monthlyRevenue: 28, grossMargin: 58, operatingYears: 2, storeCount: 3,
    aiScore: 7.0, assessPassed: true, riskPassed: true, status: 'passed',
    description: { zh: '精品烘焙连锁，主打现烤面包和定制蛋糕，社交媒体粉丝12万+', en: 'Artisan bakery chain specializing in fresh-baked bread and custom cakes, 120K+ social media followers' },
    location: { zh: '苏州·工业园', en: 'Suzhou, SIP' },
    requestAmount: 180, revenueShareRate: 11.0, submittedAt: '2026-02-25'
  },
]
```

---

## 六、i18n 双语文案

```typescript
const TEXT = {
  heroTitle: { zh: '参与通', en: 'Deal Connect' },
  heroSubtitle: { zh: '投资者统一项目看板', en: 'Unified Deal Dashboard for Investors' },
  heroDesc: { zh: '展示通过评估通和风控通筛选后的融资项目，助力投资者主动参与投资决策', en: 'Display borrower projects that pass both Assess and Risk screening, empowering investors to make active deal decisions' },
  heroCta: { zh: '查看项目看板', en: 'View Deal Board' },
  backToMain: { zh: '返回主站', en: 'Back to Main Site' },
  breadHome: { zh: '主站首页', en: 'Main Site' },
  breadPortal: { zh: '产品入口', en: 'Product Suite' },
  breadCurrent: { zh: '参与通', en: 'Deal Connect' },
  kpiFiltered: { zh: '筛后项目', en: 'Filtered Deals' },
  kpiTotal: { zh: '项目总池', en: 'Total Pipeline' },
  kpiIntent: { zh: '投资意向', en: 'Deal Intents' },
  kpiAvgScore: { zh: '平均评分', en: 'Avg. AI Score' },
  filterAll: { zh: '全量浏览', en: 'Full Pipeline' },
  filterScreened: { zh: '筛后项目', en: 'Filtered Only' },
  searchPlaceholder: { zh: '搜索项目名称、行业...', en: 'Search deal name, industry...' },
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
  viewDetail: { zh: '查看详情', en: 'View Detail' },
  markIntent: { zh: '标记意向', en: 'Mark Intent' },
  removeIntent: { zh: '移除意向', en: 'Remove' },
  compare: { zh: '对比', en: 'Compare' },
  compareSelected: { zh: '已选 {n} 个项目', en: '{n} deals selected' },
  compareStart: { zh: '开始对比', en: 'Start Comparison' },
  emptyTitle: { zh: '暂无匹配项目', en: 'No Matching Deals' },
  emptyDesc: { zh: '当前筛子策略未筛出项目，尝试调整筛选标准', en: 'No deals match your current filter criteria. Try adjusting your filter parameters.' },
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
  pipelineStep2: { zh: 'AI投资标准筛选', en: 'AI investment screening' },
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
  colNo: { zh: '#', en: '#' },
  colName: { zh: '项目名称', en: 'Deal Name' },
  colIndustry: { zh: '行业', en: 'Industry' },
  colRevenue: { zh: '月流水', en: 'Monthly Rev.' },
  colMargin: { zh: '毛利率', en: 'Margin' },
  colScore: { zh: 'AI评分', en: 'AI Score' },
  colStatus: { zh: '状态', en: 'Status' },
  colAction: { zh: '操作', en: 'Action' },
  footerBrand: { zh: 'Micro Connect 滴灌通 · 参与通', en: 'Micro Connect · Deal Connect' },
  footerDesc: { zh: '收入分成投资的基础设施级平台 — 投资者统一项目看板', en: 'Infrastructure-grade platform for revenue-based financing — Unified deal dashboard for investors' },
}
```

---

## 七、交互要求

1. **筛选模式切换** — "全量浏览" vs "筛后项目" tab切换，控制项目显示
2. **视图切换** — 卡片视图/列表视图切换
3. **投资意向标记** — 点击心形图标标记/取消，更新意向汇总区
4. **项目对比** — 勾选多个项目，底部浮层显示，可开始对比
5. **搜索** — 按项目名称/行业关键词搜索
6. **排序** — 最新提交/AI评分/融资金额/行业
7. **滚动渐现** — 所有Section使用IntersectionObserver触发入场动画
8. **语言切换** — ?lang=en 参数切换中英文

---

## 八、关键注意事项

1. **这是独立应用** — 不要去复制或依赖L1主站的任何文件，按照上面的设计规范在本项目中自行实现
2. **保留现有功能** — 不要影响当前项目已有的任何路由和功能
3. **主站跳转链接** — 面包屑中"主站首页"和"产品入口"应该是外部链接（指向主站的URL），可以先用占位符 `#` 或注释标注
4. **只做参与通** — 不需要做其他8个"通"，不需要搭建产品矩阵
5. **Mock数据** — 所有数据用静态Mock，不需要数据库
6. **中英双语** — 每一个用户可见的文字都必须支持中英切换
