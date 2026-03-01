# ═══════════════════════════════════════════════════════════════
# 条款通 (Terms Connect) — 独立全栈应用搭建 Prompt
# 版本: V3.0 | 日期: 2026-03-01
# 来源: MicroConnect Product Bible V3.0 自动组装
# ═══════════════════════════════════════════════════════════════

## 你要做什么

从零搭建一个**独立的条款通 (Terms Connect) 全栈 Web 应用**。

这个应用是 Micro Connect 滴灌通平台"9个通"中的**第6个产品**——投融资双方的**"条款磋商台"**。核心交互是一个**三联动滑块**（融资金额 / 分成比例 / 联营期限），投融资双方在上面实时磋商 RBF 条款，系统自动计算 IRR、回收期等关键指标。

**不需要 clone 任何主站代码**。这是一个全新的独立项目。
但是设计风格、颜色、字体、交互必须跟主站保持一致（下面会给你完整的设计系统）。

> 📚 **图书馆比喻**: 条款通 = **坐下来细读，谈借阅条件**。读者挑中一本书，和作者坐下来谈：借多少、借多久、租金多少。这是 Y 型流程的**汇合点**，融资者和投资者两条路径在这里第一次碰面。

---

## 产品档案

| 字段 | 值 |
|------|-----|
| **ID** | `terms` |
| **flowOrder** | 6 |
| **角色** | collaborative (投融资协同) |
| **阶段** | deal (交易达成) |
| **状态** | `coming` 即将上线 |
| **浅色** | `#EDE9FE` |
| **深色** | `#8B5CF6` |
| **分类** | 交易达成 / Deal Making |
| **图标** | `fa-sliders-h` |
| **Logo URL** | https://www.genspark.ai/api/files/s/xnam27pA |
| **核心功能** | 三联动滑块（融资金额/分成比例/联营期限）、RBF条款公式计算、方案对比、模拟测算 |
| **特殊标志** | `isCollaborative: true` |
| **一句话** | 三联动滑块 · 投融资双方磋商 · RBF 条款达成 |

---

## 技术栈

- **框架**: Hono + TypeScript + JSX（SSR 服务端渲染）
- **部署**: Cloudflare Pages（通过 wrangler）
- **样式**: Tailwind CSS (CDN) + 内联 CSS Design Token
- **图标**: FontAwesome 6.4 (CDN)
- **字体**: Inter + Montserrat + Noto Sans SC (Google Fonts)
- **交互**: 纯原生 JS（inline script），不用 React/Vue
- **i18n**: 通过 `?lang=en` URL 参数切换中英文，默认中文
- **AI**: 条款通核心是公式计算（纯数学，不需要 AI）。可选 AI 功能：推荐合理方案区间（通过 `c.env.OPENAI_API_KEY`）
- **数据存储**: localStorage (客户端) 保存协商数据和方案配置（Demo 不需要数据库）

请用 `npm create hono@latest` 的 `cloudflare-pages` 模板创建项目：
```bash
npm create hono@latest . -- --template cloudflare-pages --install --pm npm
```

---

## 业务逻辑与核心机制

### 条款通在 Y 型业务流程中的位置

```
                    ┌─── 融资者路径 ──→ 发起通(上传数据)
  身份通(统一入口) ──┤                         ↓ 数据穿越管道
                    └─── 投资者路径 ──→ 评估通 → 风控通 → 参与通(看板)
                                                                ↓
                    Y型汇合点：【条款通】→ 合约通 → 结算通 → 履约通
```

条款通是 **Y 型汇合点** —— 从这里开始，融资者和投资者两条路径第一次汇合。投资者在参与通选中项目后进入条款通，与融资者实时磋商 RBF 条款。

### RBF 条款核心公式

```
融资金额 = (PCF × 分成比例 × 联营期限) / (1 + YITO)

其中:
- PCF = Projected Cash Flow (预估现金流，万元/月)
- 分成比例 = Revenue Share Ratio (收入分成百分比 %)
- 联营期限 = Co-operation Term (联营合作期限，月)
- YITO = Yield-to-Investor (投资者收益率)
```

### 核心机制

**第一大类：三联动滑块 UI（核心交互）**

```
投资方 vs 融资方

滑块 1: ──────────[●]──────────→  融资金额
         0                RBF最大融资金额

滑块 2: ──────────[●]──────────→  分成比例
         0          最大金额对应分成比例

滑块 3: ──────────[●]──────────→  联营期限
         0          最大金额对应联营期限
```

**联动逻辑**:
- 融资金额是**主变量**——拖动融资金额滑块，分成比例和联营期限自动联动调整
- 融资金额越高 → 分成比例越高（投资者需要更高回报）→ 联营期限越长（需要更长回收周期）
- 投融资双方的博弈：融资者希望金额高、比例低、期限短；投资者希望比例高、期限长
- 滑块上限由评估通和风控通的结论确定（串联模式），或由用户手动输入（独立模式）

**第二大类：实时计算引擎**
- 每次滑块变化，实时计算以下指标：
  - 累计回款总额（万元）= 分成比例 × PCF × 联营期限
  - 月均回款（万元）= 分成比例 × PCF
  - IRR 内部收益率（%）
  - 回收期（月）= 融资金额 / 月均回款
  - 回收倍数 = 累计回款 / 融资金额
- 公式透明展示在界面上，双方可以看到每一步计算

**第三大类：多方案对比**
- 可保存多组滑块配置（如"方案A: 500万/15%/36月" vs "方案B: 300万/10%/24月"）
- 对比表格：并排展示金额、比例、期限、IRR、回收期、回收倍数
- 实时高亮差异

**第四大类：历史条款库**
- 推荐同行业、同规模的历史成功案例
- 帮助双方快速建立价格锚点、达成共识

**第五大类：协商记录**
- 按时间线记录每一轮协商：谁在什么时候提了什么方案
- 支持添加协商备注

### 双模式设计

**串联模式**: 
- 接收评估通 + 风控通的结果，自动确定滑块上限（最大融资金额、分成比例上限、联营期限上限）
- 投融资双方在滑块上实时磋商
- 达成一致后推送给合约通生成合同
- 触发 `terms.agreed` 事件

**独立模式**: 
- 投资者和融资者**手动输入** PCF 和 YITO 等参数
- 使用三联动滑块和计算器自行测算
- 不依赖评估通，不推送到合约通
- 相当于一个独立的 RBF 条款计算器

### 关键输出

- 标准化条款 JSON（融资金额、分成比例、联营期限、PCF、YITO 等）
- 条款对比报告（多组滑块配置对比）
- 协商记录（时间戳、修改历史、备注）
- 条款达成事件 (`terms.agreed`)

---

## Mock 数据

### TypeScript 类型定义

```typescript
interface TermsNegotiation {
  id: string                        // 协商ID
  projectId: string                 // 项目ID（来自发起通）
  projectName: string               // 项目名称
  industry: Industry                // 行业
  investorId: string                // 投资者ID
  investorName: string              // 投资者名称
  borrowerId: string                // 融资者ID
  borrowerName: string              // 融资者名称
  status: 'negotiating' | 'agreed' | 'rejected' | 'expired'  // 协商状态
  sliderConfig: SliderConfig        // 滑块上限配置
  currentProposal: TermsProposal   // 当前方案
  proposals: TermsProposal[]       // 历史协商记录
  savedScenarios: TermsProposal[]  // 保存的对比方案
  createdAt: string
  updatedAt: string
}

type Industry = 'concert' | 'catering' | 'retail' | 'healthcare' | 'education' | 'saas' | 'ecommerce' | 'service'

interface TermsProposal {
  id: string                        // 方案ID
  proposedBy: 'investor' | 'borrower'  // 提出方
  financingAmount: number           // 融资金额（万元）
  revenueShareRatio: number         // 分成比例（%）
  cooperationTerm: number           // 联营期限（月）
  pcf: number                       // 预估现金流（万元/月）
  yito: number                      // 投资者收益率
  calculatedMetrics: CalculatedMetrics  // 计算指标
  note?: string                     // 协商备注
  createdAt: string
}

interface CalculatedMetrics {
  totalRepayment: number            // 累计回款总额（万元）
  monthlyRepayment: number          // 月均回款（万元）
  irr: number                       // 内部收益率（%）
  paybackMonths: number             // 回收期（月）
  recoveryMultiple: number          // 回收倍数
}

// 三联动滑块配置（串联模式由评估通+风控通确定上限，独立模式手动输入）
interface SliderConfig {
  maxFinancingAmount: number        // RBF 最大融资金额（万元）
  maxRevenueShareRatio: number      // 最大金额对应的分成比例上限（%）
  maxCooperationTerm: number        // 最大金额对应的联营期限上限（月）
  pcf: number                       // 预估现金流（万元/月）
  yito: number                      // 投资者目标收益率
}

interface HistoryCase {
  industry: string                  // 行业
  amount: number                    // 融资金额（万元）
  ratio: number                     // 分成比例（%）
  term: number                      // 联营期限（月）
  irr: number                       // IRR（%）
  outcome: string                   // 结果
}
```

### 示例数据

```typescript
// 滑块上限配置（来自评估通+风控通，或独立模式手动输入）
const mockSliderConfig: SliderConfig = {
  maxFinancingAmount: 500,          // 最高可融 500 万
  maxRevenueShareRatio: 20,         // 最高分成 20%
  maxCooperationTerm: 48,           // 最长 48 个月
  pcf: 85,                          // 月现金流 85 万
  yito: 0.15                        // 目标收益率 15%
}

// 协商记录（1 条正在进行的协商，包含 3 轮提案）
const mockNegotiations: TermsNegotiation[] = [
  {
    id: 'tn-001',
    projectId: 'proj-001',
    projectName: '星火餐饮连锁',
    industry: 'catering',
    investorId: 'u-002',
    investorName: '李四（新锐资本）',
    borrowerId: 'u-001',
    borrowerName: '张三（星火餐饮）',
    status: 'negotiating',
    sliderConfig: mockSliderConfig,
    currentProposal: {
      id: 'tp-003',
      proposedBy: 'investor',
      financingAmount: 400,
      revenueShareRatio: 15,
      cooperationTerm: 36,
      pcf: 85,
      yito: 0.15,
      calculatedMetrics: {
        totalRepayment: 459,
        monthlyRepayment: 12.75,
        irr: 18.2,
        paybackMonths: 32,
        recoveryMultiple: 1.15
      },
      note: '建议分成比例从18%降至15%，期限可延长至36个月',
      createdAt: '2026-02-18T14:30:00'
    },
    proposals: [
      {
        id: 'tp-001',
        proposedBy: 'borrower',
        financingAmount: 500,
        revenueShareRatio: 10,
        cooperationTerm: 24,
        pcf: 85,
        yito: 0.15,
        calculatedMetrics: {
          totalRepayment: 204,
          monthlyRepayment: 8.5,
          irr: 8.5,
          paybackMonths: 24,
          recoveryMultiple: 0.41
        },
        note: '希望融资500万，分成比例控制在10%以内',
        createdAt: '2026-02-17T10:00:00'
      },
      {
        id: 'tp-002',
        proposedBy: 'investor',
        financingAmount: 350,
        revenueShareRatio: 18,
        cooperationTerm: 30,
        pcf: 85,
        yito: 0.15,
        calculatedMetrics: {
          totalRepayment: 459,
          monthlyRepayment: 15.3,
          irr: 22.1,
          paybackMonths: 23,
          recoveryMultiple: 1.31
        },
        note: '融资金额可到350万，但分成比例至少18%',
        createdAt: '2026-02-17T15:00:00'
      },
      {
        id: 'tp-003',
        proposedBy: 'investor',
        financingAmount: 400,
        revenueShareRatio: 15,
        cooperationTerm: 36,
        pcf: 85,
        yito: 0.15,
        calculatedMetrics: {
          totalRepayment: 459,
          monthlyRepayment: 12.75,
          irr: 18.2,
          paybackMonths: 32,
          recoveryMultiple: 1.15
        },
        note: '建议分成比例从18%降至15%，期限可延长至36个月',
        createdAt: '2026-02-18T14:30:00'
      }
    ],
    savedScenarios: [],
    createdAt: '2026-02-17',
    updatedAt: '2026-02-18'
  },
  {
    id: 'tn-002',
    projectId: 'proj-003',
    projectName: '优学教育科技',
    industry: 'education',
    investorId: 'u-002',
    investorName: '李四（新锐资本）',
    borrowerId: 'u-003',
    borrowerName: '王五（优学教育）',
    status: 'agreed',
    sliderConfig: {
      maxFinancingAmount: 200,
      maxRevenueShareRatio: 15,
      maxCooperationTerm: 36,
      pcf: 38,
      yito: 0.12
    },
    currentProposal: {
      id: 'tp-010',
      proposedBy: 'borrower',
      financingAmount: 200,
      revenueShareRatio: 12,
      cooperationTerm: 30,
      pcf: 38,
      yito: 0.12,
      calculatedMetrics: {
        totalRepayment: 136.8,
        monthlyRepayment: 4.56,
        irr: 14.5,
        paybackMonths: 44,
        recoveryMultiple: 0.68
      },
      note: '双方达成一致',
      createdAt: '2026-02-15T16:00:00'
    },
    proposals: [],
    savedScenarios: [],
    createdAt: '2026-02-14',
    updatedAt: '2026-02-15'
  }
]

// 历史参考案例
const mockHistoryCases: HistoryCase[] = [
  { industry: '餐饮', amount: 300, ratio: 12, term: 24, irr: 15.5, outcome: '成功回收' },
  { industry: '餐饮', amount: 500, ratio: 16, term: 36, irr: 19.2, outcome: '成功回收' },
  { industry: '零售', amount: 200, ratio: 10, term: 18, irr: 12.8, outcome: '成功回收' },
  { industry: '教育', amount: 150, ratio: 8, term: 24, irr: 11.5, outcome: '成功回收' },
  { industry: '演出', amount: 800, ratio: 18, term: 12, irr: 25.3, outcome: '成功回收' },
  { industry: 'SaaS', amount: 400, ratio: 14, term: 30, irr: 17.8, outcome: '成功回收' }
]
```

### 协商状态映射

```typescript
const NEGOTIATION_STATUS: Record<string, { zh: string; en: string; color: string; bgColor: string }> = {
  negotiating: { zh: '协商中', en: 'Negotiating', color: '#8B5CF6', bgColor: '#EDE9FE' },
  agreed:      { zh: '已达成', en: 'Agreed', color: '#34c759', bgColor: '#dcfce7' },
  rejected:    { zh: '已拒绝', en: 'Rejected', color: '#ff375f', bgColor: '#fee2e2' },
  expired:     { zh: '已过期', en: 'Expired', color: '#86868b', bgColor: '#f5f5f7' }
}
```

### Demo 简化说明

- **三联动滑块是纯前端 JS 实现**，不需要后端计算（所有公式在浏览器实时运算）
- **协商是模拟的**: Demo 阶段不做双方实时通信，用切换视角（投资方/融资方）模拟双方操作
- **"接受条款"是模拟的**: 点击后状态变为 `agreed`，显示 Toast 提示"条款已达成"，不推送合约通
- **数据存储使用 localStorage**: 协商记录和方案配置保存在客户端
- **独立模式直接可用**: 独立计算器页面无需登录、无需项目数据，手动输入参数即可使用

---

## 页面布局

### 页面 1: 协商列表页（条款通主页 `/`）

```
┌──────────────────────────────────────────────────────────────┐
│  Navbar（简化版）                                              │
│  [Logo MICRO CONNECT 滴灌通] [条款通 Terms Connect] [中/EN] [返回主站] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─ Hero 区 ────────────────────────────────────────────────┐ │
│  │  ⚖️ 条款通 Logo (来自 Logo URL)                            │ │
│  │  "条款协商"                                                │ │
│  │  "三联动滑块 · 投融资双方实时磋商 · RBF 条款达成"              │ │
│  │  📚 坐下来细读，谈借阅条件 — Y 型汇合点                       │ │
│  │                                                           │ │
│  │  ┌──── 快速计算器（独立模式）────┐                           │ │
│  │  └───────────────────────────┘                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ RBF 核心公式展示卡片 ────────────────────────────────────┐ │
│  │  融资金额 = (PCF × 分成比例 × 联营期限) / (1 + YITO)       │ │
│  │  [ PCF=预估现金流 | YITO=投资者收益率 ]                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 协商列表 ────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │  ┌── 协商卡片 1 ─────────────────────────────────────────┐ │ │
│  │  │ 🍜 星火餐饮连锁         [协商中 ⏳]                    │ │ │
│  │  │ 对手方: 李四（新锐资本）                                │ │ │
│  │  │ 当前方案: ¥400万 | 15% | 36月                         │ │ │
│  │  │ IRR: 18.2% | 回收期: 32月 | 倍数: 1.15x              │ │ │
│  │  │ 第3轮提案 · 2026-02-18 更新                            │ │ │
│  │  │ [进入协商]                                             │ │ │
│  │  └───────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌── 协商卡片 2 ─────────────────────────────────────────┐ │ │
│  │  │ 📚 优学教育科技         [已达成 ✓]                     │ │ │
│  │  │ 对手方: 李四（新锐资本）                                │ │ │
│  │  │ 最终方案: ¥200万 | 12% | 30月                         │ │ │
│  │  │ IRR: 14.5% | 回收期: 44月 | 倍数: 0.68x              │ │ │
│  │  │ 2026-02-15 达成                                       │ │ │
│  │  │ [查看详情]                                             │ │ │
│  │  └───────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  Footer（简化版，Aurora 深色背景）                               │
└──────────────────────────────────────────────────────────────┘
```

**交互逻辑**:
- "快速计算器"按钮 → 跳转到 `/calculator`（独立模式）
- 协商卡片点击 → 跳转到 `/negotiation/:id`
- 状态不同显示不同 CTA：negotiating → "进入协商"、agreed → "查看详情"

### 页面 2: 协商工作区（`/negotiation/:id`，核心页面）

```
┌──────────────────────────────────────────────────────────────┐
│  Navbar                                                      │
├──────────────────────────────────────────────────────────────┤
│  面包屑: 条款通 > 星火餐饮连锁                                  │
│                                                              │
│  ┌─ 视角切换 ────────────────────────────────────────────────┐ │
│  │  [🔍 投资方视角]  [🚀 融资方视角]                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 项目信息卡片 ─────────────────────────────────────────────┐ │
│  │  🍜 星火餐饮连锁 | 餐饮行业 | 月收入 ¥85万                  │ │
│  │  PCF: ¥85万/月 | YITO: 15% | 最大融资: ¥500万              │ │
│  │  评估评分: 82分 | 风险等级: 中低（串联模式显示，独立模式隐藏）   │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 三联动滑块区（核心交互）━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┐ │
│  │                                                           │ │
│  │  投资方 ◄──────────────────────────────────────► 融资方    │ │
│  │                                                           │ │
│  │  💰 融资金额          ¥400 万                              │ │
│  │  ├─────────────────[●]─────────┤                          │ │
│  │  0                            500 万                      │ │
│  │                                                           │ │
│  │  📊 分成比例          15%                                  │ │
│  │  ├────────[●]──────────────────┤                          │ │
│  │  0%                           20%                         │ │
│  │                                                           │ │
│  │  📅 联营期限          36 个月                               │ │
│  │  ├──────────────[●]────────────┤                          │ │
│  │  0                            48 月                       │ │
│  │                                                           │ │
│  │  ┌─ 公式展示 ──────────────────────────────────────────┐  │ │
│  │  │  融资金额 = (85 × 15% × 36) / (1 + 0.15) = ¥400万  │  │ │
│  │  └─────────────────────────────────────────────────────┘  │ │
│  │                                                           │ │
│  │  ┌─ 实时计算面板 (4 列指标) ────────────────────────────┐  │ │
│  │  │  累计回款      月均回款      IRR        回收期         │  │ │
│  │  │  ¥459万       ¥12.75万     18.2%      32个月         │  │ │
│  │  │                                                     │  │ │
│  │  │  回收倍数                                             │  │ │
│  │  │  1.15x                                               │  │ │
│  │  └─────────────────────────────────────────────────────┘  │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 协商备注输入 ─────────────────────────────────────────────┐ │
│  │  [请输入协商备注...                                    ]    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 操作按钮 ─────────────────────────────────────────────────┐ │
│  │  [💾 保存方案] [📤 提交新方案] [✅ 接受条款] [❌ 拒绝]      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 协商记录时间线 ──────────────────────────────────────────┐ │
│  │                                                           │ │
│  │  📌 第3轮 · 投资方 · 2026-02-18 14:30                     │ │
│  │  ├── ¥400万 | 15% | 36月 | IRR 18.2%                     │ │
│  │  └── "建议分成比例从18%降至15%，期限可延长至36个月"           │ │
│  │                                                           │ │
│  │  📌 第2轮 · 投资方 · 2026-02-17 15:00                     │ │
│  │  ├── ¥350万 | 18% | 30月 | IRR 22.1%                     │ │
│  │  └── "融资金额可到350万，但分成比例至少18%"                   │ │
│  │                                                           │ │
│  │  📌 第1轮 · 融资方 · 2026-02-17 10:00                     │ │
│  │  ├── ¥500万 | 10% | 24月 | IRR 8.5%                      │ │
│  │  └── "希望融资500万，分成比例控制在10%以内"                   │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 多方案对比区 ────────────────────────────────────────────┐ │
│  │  [+ 保存当前配置到对比] [清空对比]                           │ │
│  │                                                           │ │
│  │  | 指标     | 方案 A    | 方案 B    | 方案 C    |          │ │
│  │  |----------|-----------|-----------|-----------|          │ │
│  │  | 融资金额  | ¥500万    | ¥400万    | ¥300万    |          │ │
│  │  | 分成比例  | 10%       | 15%       | 12%       |          │ │
│  │  | 联营期限  | 24月      | 36月      | 24月      |          │ │
│  │  | IRR      | 8.5%      | 18.2%     | 15.5%     |          │ │
│  │  | 回收期    | 24月      | 32月      | 25月      |          │ │
│  │  | 倍数     | 0.41x     | 1.15x     | 0.72x     |          │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 历史参考区 ──────────────────────────────────────────────┐ │
│  │  "同行业历史成功案例"                                       │ │
│  │  ┌── 餐饮 ¥300万 12% 24月 IRR 15.5% 成功回收 ────────┐    │ │
│  │  ┌── 餐饮 ¥500万 16% 36月 IRR 19.2% 成功回收 ────────┐    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  Footer                                                      │
└──────────────────────────────────────────────────────────────┘
```

**交互逻辑**:
- **视角切换**: 投资方/融资方 Tab 切换，Demo 模拟双方视角
- **三联动滑块**: 拖动滑块 1（融资金额），滑块 2（分成比例）和滑块 3（联营期限）自动联动
  - 联动算法: `revenueShareRatio = (financingAmount / maxFinancingAmount) × maxRevenueShareRatio`
  - 联动算法: `cooperationTerm = (financingAmount / maxFinancingAmount) × maxCooperationTerm`
  - 用户也可以手动拖动滑块 2 或 3 解除联动（独立调节）
- **实时计算**: 每次滑块变化即时更新 5 个指标
- **保存方案**: 将当前滑块配置保存到"多方案对比区"
- **提交新方案**: 将当前滑块值 + 备注作为新一轮提案，追加到时间线
- **接受条款**: 状态变为 `agreed`，Toast 提示"条款已达成（Demo）"
- **拒绝**: 状态变为 `rejected`

### 页面 3: 独立计算器（`/calculator`，独立模式）

```
┌──────────────────────────────────────────────────────────────┐
│  Navbar                                                      │
├──────────────────────────────────────────────────────────────┤
│  面包屑: 条款通 > 快速计算器                                    │
│                                                              │
│  ┌─ 参数输入表单 ─────────────────────────────────────────────┐ │
│  │  "手动输入参数，使用三联动滑块测算 RBF 条款"                  │ │
│  │                                                           │ │
│  │  PCF 预估现金流 (万元/月):  ┌───────┐                      │ │
│  │                            │  85   │                      │ │
│  │                            └───────┘                      │ │
│  │  YITO 投资者收益率 (%):     ┌───────┐                      │ │
│  │                            │  15   │                      │ │
│  │                            └───────┘                      │ │
│  │  融资金额上限 (万元):       ┌───────┐                      │ │
│  │                            │  500  │                      │ │
│  │                            └───────┘                      │ │
│  │  分成比例上限 (%):          ┌───────┐                      │ │
│  │                            │  20   │                      │ │
│  │                            └───────┘                      │ │
│  │  联营期限上限 (月):         ┌───────┐                      │ │
│  │                            │  48   │                      │ │
│  │                            └───────┘                      │ │
│  │                                                           │ │
│  │  ┌──────── 开始计算 ────────┐                              │ │
│  │  └─────────────────────────┘                              │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 三联动滑块 + 实时计算面板（同页面2的滑块区）─────────────────┐ │
│  │  （输入参数后显示，交互逻辑同协商工作区）                       │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  Footer                                                      │
└──────────────────────────────────────────────────────────────┘
```

**交互逻辑**:
- 填写 5 个参数 → 点击"开始计算" → 展开三联动滑块区
- 滑块区的交互逻辑与协商工作区完全相同
- 无协商记录和时间线，但保留多方案对比功能
- 支持"重新输入参数"按钮

---

## API 路由

### 协商管理

```
GET /api/terms/negotiations
  描述: 获取协商列表
  请求: 无（Demo 返回所有 mock 协商）
  响应: { success: true, negotiations: TermsNegotiation[] }

POST /api/terms/negotiations
  描述: 新建协商
  请求: { projectId: string, projectName: string, industry: string, investorId: string, investorName: string, borrowerId: string, borrowerName: string, sliderConfig: SliderConfig }
  响应: { success: true, negotiation: TermsNegotiation }
  逻辑: 创建新协商，status 为 'negotiating'

GET /api/terms/negotiations/:id
  描述: 获取协商详情
  响应: { success: true, negotiation: TermsNegotiation }

POST /api/terms/negotiations/:id/propose
  描述: 提交新方案
  请求: { proposedBy: 'investor' | 'borrower', financingAmount: number, revenueShareRatio: number, cooperationTerm: number, note?: string }
  响应: { success: true, proposal: TermsProposal }
  逻辑: 根据 sliderConfig 的 pcf/yito 自动计算 calculatedMetrics，追加到 proposals 数组

PUT /api/terms/negotiations/:id/accept
  描述: 接受当前条款
  响应: { success: true, message: '条款已达成' }
  逻辑: 更新 status 为 'agreed'

PUT /api/terms/negotiations/:id/reject
  描述: 拒绝条款
  响应: { success: true, message: '条款已拒绝' }
  逻辑: 更新 status 为 'rejected'
```

### 计算引擎

```
POST /api/terms/calculate
  描述: 纯计算接口（核心 API，独立模式和串联模式共用）
  请求: { financingAmount: number, revenueShareRatio: number, cooperationTerm: number, pcf: number, yito: number }
  响应: { success: true, metrics: CalculatedMetrics }
  逻辑:
    totalRepayment = revenueShareRatio / 100 * pcf * cooperationTerm
    monthlyRepayment = revenueShareRatio / 100 * pcf
    paybackMonths = Math.ceil(financingAmount / monthlyRepayment)
    recoveryMultiple = totalRepayment / financingAmount
    irr = ((totalRepayment / financingAmount) ^ (12 / cooperationTerm) - 1) * 100
  注意: 这个 API 是纯数学计算，不需要 AI
```

### 历史参考

```
GET /api/terms/history
  描述: 获取历史参考案例
  请求: 可选 query 参数 ?industry=catering
  响应: { success: true, cases: HistoryCase[] }
  逻辑: 返回 mockHistoryCases，可按行业过滤
```

### AI 建议（可选）

```
POST /api/terms/ai-suggest
  描述: AI 推荐合理方案区间（可选功能，有 API Key 时启用）
  请求: { sliderConfig: SliderConfig, historyCases: HistoryCase[], currentProposal?: TermsProposal }
  响应: { success: true, suggestion: { recommendedAmount: [min, max], recommendedRatio: [min, max], recommendedTerm: [min, max], reasoning: string } }
  逻辑: 调用 GPT-4o，根据滑块配置 + 历史案例，推荐合理区间
  ⚠️ 如果没有配置 OPENAI_API_KEY，返回基于历史数据的简单统计推荐
```

### 通间 API（规划中）

```
POST /api/terms/initiate
  描述: 供参与通调用，发起条款协商（传入项目ID + 投资者ID）
  请求: { projectId: string, investorId: string }
  响应: { success: true, negotiationId: string, redirectUrl: string }
  逻辑: Demo 阶段直接创建协商并返回 URL
```

---

## 完整设计系统（必须 100% 遵守）

### 品牌色（全局统一，与主站一致）

```
主品牌色:     #5DC4B3
品牌浅色:     #7DD4C7
品牌深色:     #3D8F83  (hover状态)
品牌强调:     #49A89A
Logo亮色:     #2EC4B6
Logo亮色2:    #3DD8CA
Logo深色:     #28A696
```

### 条款通专属色

```
浅色:   #EDE9FE  (功能卡片浅色底纹、滑块区域背景、方案对比表头)
深色:   #8B5CF6  (CTA按钮、功能标题/图标、滑块手柄active色、进度条/标签/徽章)
```

**⚠️ 关键规则 — 颜色使用铁律**:
- 品牌色 `#5DC4B3` 用于**全部全局元素**：导航栏链接、品牌 Logo、返回按钮、hover 边框、focus 边框、卡片 hover 阴影、渐变等
- 条款通专属色 `#8B5CF6` **仅限以下 4 种场景**：
  1. CTA 按钮背景色（如"提交方案"、"接受条款"）
  2. 功能区标题和图标色（如滑块标签、指标标题）
  3. 滑块区/对比区的浅色背景底纹（用 `#EDE9FE`）
  4. 进度条/标签/徽章等功能性色块（如"协商中"状态标签）
- **绝不用 `#8B5CF6` 替换任何全局 Design Token**（边框、阴影、渐变等全部保持品牌色 `#5DC4B3`）

### 语义色

```
信息 (info):     #32ade6
成功 (success):  #34c759    (已达成标记)
警告 (warning):  #ff9f0a
错误 (error):    #ff375f    (已拒绝标记)
靛蓝 (indigo):   #6366F1
紫罗兰 (violet): #8B5CF6
```

### 文字层次（严格遵守，禁止纯黑 #000000）

```
标题/主文字 (primary):  #1d1d1f
标题2 (title):         #1a1a1a
二级文字 (secondary):   #6e6e73
三级文字 (tertiary):    #86868b
占位符 (placeholder):   #aeaeb2
```

**铁律**: 最深颜色为 `#1d1d1f`，永远不使用纯黑 `#000000`。

### 背景色

```
页面背景 (page):  #f5f5f7
卡片背景 (card):  rgba(255, 255, 255, 0.88)
导航栏 (navbar):  rgba(255, 255, 255, 0.92)
模态页脚:         #f8fafc
分割线 (divider): #f1f5f9
```

### 边框

```
默认边框:       rgba(0, 0, 0, 0.06)
输入框边框:     rgba(0, 0, 0, 0.12)
hover边框:     rgba(93, 196, 179, 0.2)   — 品牌色半透明（全局统一，不因专属色改变）
focus边框:     #5DC4B3                     — 品牌色实色（全局统一，不因专属色改变）
```

### 圆角

```
xs:   4px     sm:   8px     md:   12px
lg:   16px    xl:   20px    2xl:  24px
3xl:  32px    full: 9999px
```

### 阴影（Apple 风格多层深度）

```css
--shadow-xs:         0 1px 2px rgba(0,0,0,0.04);
--shadow-sm:         0 1px 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
--shadow-md:         0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06);
--shadow-lg:         0 4px 8px rgba(0,0,0,0.04), 0 16px 40px rgba(0,0,0,0.08);
--shadow-xl:         0 8px 16px rgba(0,0,0,0.06), 0 24px 64px rgba(0,0,0,0.1);
--shadow-2xl:        0 12px 24px rgba(0,0,0,0.06), 0 40px 80px rgba(0,0,0,0.12);
--shadow-card:       0 1px 1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.05);
--shadow-card-hover: 0 4px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(93,196,179,0.1);
```

### 动效

```css
--ease-spring:    cubic-bezier(0.22, 1, 0.36, 1);
--ease-smooth:    cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-bounce:    cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-apple:     cubic-bezier(0.28, 0.11, 0.32, 1);
--ease-out-expo:  cubic-bezier(0.19, 1, 0.22, 1);

--duration-fast:   180ms;
--duration-normal: 280ms;
--duration-slow:   420ms;
--duration-slower: 600ms;
```

### 渐变

```css
--gradient-primary:  linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%);
--gradient-cyber:    linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);
--gradient-aurora:   radial-gradient(ellipse 120% 80% at 50% 45%, #13524a 0%, #0f3d36 30%, #0b312c 55%, #082420 80%, #061b18 100%);
--gradient-neon:     linear-gradient(135deg, #32ade6 0%, #5DC4B3 40%, #49A89A 70%, #3D8F83 100%);
--gradient-glass:    linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
--gradient-surface:  linear-gradient(180deg, #ffffff 0%, #f8f9fe 100%);
```

### 字体

```
Google Fonts 加载:
  Inter:        wght@300;400;500;600;700;800;900
  Montserrat:   wght@700;800;900
  Noto Sans SC: wght@300;400;500;600;700

正文字体栈:
  -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display',
  'Segoe UI', Roboto, 'Noto Sans SC', sans-serif

品牌/Logo字体栈:
  'Montserrat', 'Inter', 'Futura', 'Helvetica Neue', sans-serif
```

### CDN 依赖（放在每个页面的 `<head>` 中）

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- FontAwesome 6.4 -->
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@700;800;900&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

### Tailwind CSS 运行时配置

所有页面的 `<head>` 中必须包含（紧跟在 Tailwind CDN `<script>` 之后）：

```javascript
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system','BlinkMacSystemFont','Inter','SF Pro Display','Segoe UI','Roboto','Noto Sans SC','sans-serif'],
        display: ['-apple-system','BlinkMacSystemFont','Inter','SF Pro Display','Segoe UI','sans-serif'],
        mono: ['Montserrat','Inter','Futura','Helvetica Neue','sans-serif']
      },
      colors: {
        brand: { DEFAULT:'#5DC4B3', light:'#7DD4C7', dark:'#3D8F83', accent:'#49A89A' },
        logo: { bright:'#2EC4B6', bright2:'#3DD8CA', deep:'#28A696' },
        terms: { light:'#EDE9FE', DEFAULT:'#8B5CF6', dark:'#7C3AED' },
        semantic: { info:'#32ade6', success:'#34c759', warning:'#ff9f0a', error:'#ff375f' },
        text: { primary:'#1d1d1f', title:'#1a1a1a', secondary:'#6e6e73', tertiary:'#86868b', placeholder:'#aeaeb2' },
        surface: { page:'#f5f5f7', card:'rgba(255,255,255,0.88)', divider:'#f1f5f9' }
      },
      borderRadius: { xs:'4px', sm:'8px', md:'12px', lg:'16px', xl:'20px', '2xl':'24px', '3xl':'32px' }
    }
  }
}
```

---

## UI 组件

### 导航栏 (Navbar) — 独立应用简化版

- **定位**: `sticky top-0 z-50`，高度 56px
- **毛玻璃效果**: `background: rgba(255,255,255,0.92); backdrop-filter: blur(24px) saturate(180%);`
- **底部边线**: `border-bottom: 0.5px solid rgba(0,0,0,0.06)`
- **滚动效果**: 滚动距离 >10px 时添加 `.scrolled` 类，加阴影
- **布局**:
  - 左侧：品牌 Logo（SVG 双圆标识，点击跳主站首页）
  - 中间：**"条款通 Terms Connect"**（条款通专属色 #8B5CF6）
  - 右侧：语言切换 (中/EN) + "返回主站"按钮（品牌色 #5DC4B3）

### 页脚 (Footer) — 独立应用简化版

- **Aurora 深色背景**: `radial-gradient(ellipse 130% 90% at 50% 20%, #0f3d36 0%, #0b312c 40%, #082420 70%, #061b18 100%)`
- **内容**: 品牌 Logo + "条款通 Terms Connect" + 版权 `© 2026 Micro Connect Group`
- **链接**: 返回主站 | 隐私政策 | 服务条款

### 品牌 Logo (SVG)

双圆叠合标识，纯代码渲染：

```html
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

品牌全名：`MICRO CONNECT 滴灌通`（英文部分用 Montserrat 字体）

### 卡片样式

```css
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
```

### 三联动滑块样式

```css
/* 滑块轨道 */
.slider-track {
  width: 100%;
  height: 6px;
  background: #f1f5f9;
  border-radius: 3px;
  position: relative;
}

/* 滑块已填充部分 */
.slider-fill {
  height: 100%;
  background: linear-gradient(90deg, #5DC4B3, #8B5CF6);  /* 品牌色到专属色渐变 */
  border-radius: 3px;
  transition: width 60ms ease;
}

/* 滑块手柄 */
.slider-thumb {
  width: 24px;
  height: 24px;
  background: white;
  border: 3px solid #8B5CF6;  /* 条款通专属色 */
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  cursor: grab;
  transition: transform 180ms cubic-bezier(0.22,1,0.36,1), box-shadow 180ms;
}
.slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(139,92,246,0.3);  /* 专属色阴影 */
}
.slider-thumb:active {
  cursor: grabbing;
  transform: scale(1.1);
  border-color: #7C3AED;
}

/* 滑块标签（当前值显示） */
.slider-value {
  font-size: 28px;
  font-weight: 700;
  color: #1d1d1f;
  font-family: 'Montserrat', 'Inter', sans-serif;
}
```

### 时间线样式

```css
.timeline-item {
  position: relative;
  padding-left: 32px;
  padding-bottom: 24px;
  border-left: 2px solid #f1f5f9;
}
.timeline-item::before {
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #8B5CF6;  /* 条款通专属色 */
  position: absolute;
  left: -7px;
  top: 4px;
}
.timeline-item:last-child {
  border-left: none;
}
.timeline-item.investor { }
.timeline-item.investor::before { background: #6366F1; }
.timeline-item.borrower::before { background: #F59E0B; }
```

### 滚动渐现动画

```css
.reveal {
  opacity: 0; transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.19,1,0.22,1), transform 0.7s cubic-bezier(0.19,1,0.22,1);
}
.reveal.visible { opacity: 1; transform: translateY(0); }
.stagger-1 { transition-delay: 0.05s; }
.stagger-2 { transition-delay: 0.10s; }
.stagger-3 { transition-delay: 0.15s; }
.stagger-4 { transition-delay: 0.20s; }
.stagger-5 { transition-delay: 0.25s; }
.stagger-6 { transition-delay: 0.30s; }
```

配合 IntersectionObserver 触发：
```javascript
document.querySelectorAll('.reveal').forEach(el => {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  }, { threshold: 0.15 }).observe(el);
});
```

### 状态徽章

```
negotiating (协商中):  背景 #EDE9FE 文字 #8B5CF6 边框 rgba(139,92,246,0.2)  — 条款通专属色
agreed (已达成):       bg-green-100 text-green-700 border-green-200
rejected (已拒绝):     bg-red-100 text-red-700 border-red-200
expired (已过期):      bg-gray-100 text-gray-500 border-gray-200
```

### 点阵背景图案

```css
.dot-pattern {
  background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
}
```

---

## i18n 国际化

### 规范

- **支持语言**: 中文 (zh) 和英文 (en)
- **默认语言**: 中文
- **切换机制**: URL 查询参数 `?lang=en`
- **金额格式**: 中文 `¥68万`，英文 `¥680K`

### 双语文本对象

```typescript
const TEXT = {
  nav: {
    title: { zh: '条款通', en: 'Terms Connect' },
    subtitle: { zh: '三联动滑块 · RBF 条款磋商', en: 'Triple-Linked Sliders · RBF Terms Negotiation' },
    backToMain: { zh: '返回主站', en: 'Back to Main' },
    langSwitch: { zh: 'EN', en: '中' }
  },
  hero: {
    title: { zh: '条款协商', en: 'Terms Negotiation' },
    subtitle: { zh: '三联动滑块 · 投融资双方实时磋商 · RBF 条款达成', en: 'Triple-linked sliders · Real-time negotiation · RBF terms agreement' },
    libraryHint: { zh: '📚 坐下来细读，谈借阅条件 — Y 型汇合点', en: '📚 Sit down and negotiate — The Y-junction convergence point' },
    calculator: { zh: '⚡ 快速计算器（独立模式）', en: '⚡ Quick Calculator (Standalone)' }
  },
  formula: {
    title: { zh: 'RBF 核心公式', en: 'RBF Core Formula' },
    formula: { zh: '融资金额 = (PCF × 分成比例 × 联营期限) / (1 + YITO)', en: 'Financing = (PCF × Share Ratio × Term) / (1 + YITO)' },
    pcf: { zh: 'PCF = 预估现金流', en: 'PCF = Projected Cash Flow' },
    yito: { zh: 'YITO = 投资者收益率', en: 'YITO = Yield-to-Investor' }
  },
  negotiation: {
    counterparty: { zh: '对手方', en: 'Counterparty' },
    currentProposal: { zh: '当前方案', en: 'Current Proposal' },
    round: { zh: '轮', en: 'Round' },
    enterNegotiation: { zh: '进入协商', en: 'Enter Negotiation' },
    viewDetail: { zh: '查看详情', en: 'View Details' }
  },
  status: {
    negotiating: { zh: '协商中', en: 'Negotiating' },
    agreed: { zh: '已达成', en: 'Agreed' },
    rejected: { zh: '已拒绝', en: 'Rejected' },
    expired: { zh: '已过期', en: 'Expired' }
  },
  workspace: {
    perspective: { zh: '视角', en: 'Perspective' },
    investorView: { zh: '🔍 投资方视角', en: '🔍 Investor View' },
    borrowerView: { zh: '🚀 融资方视角', en: '🚀 Borrower View' },
    projectInfo: { zh: '项目信息', en: 'Project Info' },
    monthlyRevenue: { zh: '月收入', en: 'Monthly Revenue' },
    maxFinancing: { zh: '最大融资', en: 'Max Financing' },
    assessScore: { zh: '评估评分', en: 'Assessment Score' },
    riskLevel: { zh: '风险等级', en: 'Risk Level' }
  },
  slider: {
    financingAmount: { zh: '💰 融资金额', en: '💰 Financing Amount' },
    revenueShareRatio: { zh: '📊 分成比例', en: '📊 Revenue Share Ratio' },
    cooperationTerm: { zh: '📅 联营期限', en: '📅 Cooperation Term' },
    wan: { zh: '万', en: '0K' },
    months: { zh: '个月', en: 'months' },
    investorSide: { zh: '投资方', en: 'Investor' },
    borrowerSide: { zh: '融资方', en: 'Borrower' }
  },
  metrics: {
    totalRepayment: { zh: '累计回款', en: 'Total Repayment' },
    monthlyRepayment: { zh: '月均回款', en: 'Monthly Repayment' },
    irr: { zh: 'IRR', en: 'IRR' },
    paybackMonths: { zh: '回收期', en: 'Payback Period' },
    recoveryMultiple: { zh: '回收倍数', en: 'Recovery Multiple' }
  },
  actions: {
    saveScenario: { zh: '💾 保存方案', en: '💾 Save Scenario' },
    submitProposal: { zh: '📤 提交新方案', en: '📤 Submit Proposal' },
    acceptTerms: { zh: '✅ 接受条款', en: '✅ Accept Terms' },
    rejectTerms: { zh: '❌ 拒绝', en: '❌ Reject' },
    agreedToast: { zh: '条款已达成（Demo 演示）', en: 'Terms agreed (Demo)' },
    rejectedToast: { zh: '条款已拒绝', en: 'Terms rejected' },
    savedToast: { zh: '方案已保存', en: 'Scenario saved' },
    submittedToast: { zh: '新方案已提交', en: 'Proposal submitted' },
    notePlaceholder: { zh: '请输入协商备注...', en: 'Enter negotiation note...' }
  },
  timeline: {
    title: { zh: '协商记录', en: 'Negotiation History' },
    investor: { zh: '投资方', en: 'Investor' },
    borrower: { zh: '融资方', en: 'Borrower' }
  },
  compare: {
    title: { zh: '多方案对比', en: 'Scenario Comparison' },
    addCurrent: { zh: '+ 保存当前配置到对比', en: '+ Save Current to Compare' },
    clear: { zh: '清空对比', en: 'Clear All' },
    scenario: { zh: '方案', en: 'Scenario' }
  },
  history: {
    title: { zh: '同行业历史成功案例', en: 'Industry Historical Cases' },
    outcome: { zh: '结果', en: 'Outcome' }
  },
  calculator: {
    title: { zh: '快速计算器', en: 'Quick Calculator' },
    subtitle: { zh: '手动输入参数，使用三联动滑块测算 RBF 条款', en: 'Enter parameters manually, use triple-linked sliders to calculate RBF terms' },
    pcfLabel: { zh: 'PCF 预估现金流 (万元/月)', en: 'PCF Projected Cash Flow (¥10K/month)' },
    yitoLabel: { zh: 'YITO 投资者收益率 (%)', en: 'YITO Yield-to-Investor (%)' },
    maxAmountLabel: { zh: '融资金额上限 (万元)', en: 'Max Financing Amount (¥10K)' },
    maxRatioLabel: { zh: '分成比例上限 (%)', en: 'Max Revenue Share Ratio (%)' },
    maxTermLabel: { zh: '联营期限上限 (月)', en: 'Max Cooperation Term (months)' },
    startCalc: { zh: '开始计算', en: 'Start Calculation' },
    resetParams: { zh: '重新输入参数', en: 'Reset Parameters' }
  },
  industries: {
    concert: { zh: '演出', en: 'Concert/Events' },
    catering: { zh: '餐饮', en: 'Catering' },
    retail: { zh: '零售', en: 'Retail' },
    healthcare: { zh: '医美健康', en: 'Healthcare' },
    education: { zh: '教育', en: 'Education' },
    saas: { zh: 'SaaS', en: 'SaaS' },
    ecommerce: { zh: '电商', en: 'E-Commerce' },
    service: { zh: '服务业', en: 'Services' }
  },
  footer: {
    copyright: { zh: '© 2026 Micro Connect Group. 保留所有权利。', en: '© 2026 Micro Connect Group. All rights reserved.' },
    privacy: { zh: '隐私政策', en: 'Privacy Policy' },
    terms: { zh: '服务条款', en: 'Terms of Service' },
    backToMain: { zh: '返回主站', en: 'Back to Main Site' }
  }
}

const tt = (obj: { zh: string; en: string }, lang: 'zh' | 'en') => obj[lang]
```

---

## 项目初始化与开发流程

### 步骤 1: 创建项目

```bash
npm create hono@latest . -- --template cloudflare-pages --install --pm npm
```

### 步骤 2: 项目结构

```
terms-connect/
├── src/
│   ├── index.tsx          # Hono应用入口 + API路由 + 3个页面HTML
│   └── renderer.tsx       # JSX渲染器 (HTML壳 + head + Tailwind配置)
├── public/
│   └── static/
│       └── style.css      # 自定义CSS (Design Token变量 + 滑块 + 时间线 + 卡片样式)
├── ecosystem.config.cjs   # PM2配置
├── wrangler.jsonc         # Cloudflare配置
├── .dev.vars              # 本地开发环境变量（OPENAI_API_KEY=xxx，可选）
├── vite.config.ts         # Vite构建配置
├── tsconfig.json
└── package.json
```

### wrangler.jsonc 配置模板

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "terms-connect",
  "compatibility_date": "2024-01-01",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"]
}
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import pages from '@hono/vite-cloudflare-pages'

export default defineConfig({
  plugins: [pages()],
  build: {
    outDir: 'dist'
  }
})
```

### ecosystem.config.cjs (PM2 配置)

```javascript
module.exports = {
  apps: [
    {
      name: 'terms-connect',
      script: 'npx',
      args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
```

### package.json scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "wrangler pages dev dist",
    "deploy": "npm run build && wrangler pages deploy dist"
  }
}
```

### 步骤 3: 实现顺序

1. **renderer.tsx** — HTML 外壳 + `<head>`（Tailwind CDN + 配置 + Google Fonts + FontAwesome）
2. **CSS Design Tokens** — `public/static/style.css`（阴影、动效、渐变、滑块、时间线、卡片样式）
3. **计算引擎** — 纯 JS 函数实现 RBF 公式计算（totalRepayment, monthlyRepayment, irr, paybackMonths, recoveryMultiple）
4. **API 路由** — 10 个接口：
   - 协商管理: negotiations (GET/POST), negotiations/:id (GET), negotiations/:id/propose (POST), negotiations/:id/accept (PUT), negotiations/:id/reject (PUT)
   - 计算引擎: terms/calculate (POST)
   - 历史参考: terms/history (GET)
   - AI 建议: terms/ai-suggest (POST，可选)
   - 通间 API: terms/initiate (POST，规划中)
5. **协商列表页** — `GET /` 渲染列表 + Hero + 公式卡片 + inline JS
6. **协商工作区** — `GET /negotiation/:id` 渲染三联动滑块 + 实时计算 + 时间线 + 对比区 + inline JS
7. **独立计算器** — `GET /calculator` 渲染参数输入 + 滑块 + 计算面板 + inline JS
8. **三联动滑块 JS** — 核心交互：拖动联动、实时计算、值显示、联动算法
9. **Navbar + Footer** — 独立应用简化版，所有页面复用
10. **i18n** — TEXT 对象 + `?lang=en` 切换
11. **滚动动画** — IntersectionObserver + reveal 类

### 步骤 4: 路由结构

```typescript
// 页面路由
app.get('/', (c) => { /* 协商列表页 */ })
app.get('/negotiation/:id', (c) => { /* 协商工作区 */ })
app.get('/calculator', (c) => { /* 独立计算器 */ })

// API 路由 - 协商管理
app.get('/api/terms/negotiations', (c) => { /* 协商列表 */ })
app.post('/api/terms/negotiations', (c) => { /* 新建协商 */ })
app.get('/api/terms/negotiations/:id', (c) => { /* 协商详情 */ })
app.post('/api/terms/negotiations/:id/propose', (c) => { /* 提交方案 */ })
app.put('/api/terms/negotiations/:id/accept', (c) => { /* 接受条款 */ })
app.put('/api/terms/negotiations/:id/reject', (c) => { /* 拒绝 */ })

// API 路由 - 计算 & 历史
app.post('/api/terms/calculate', (c) => { /* 纯计算接口 */ })
app.get('/api/terms/history', (c) => { /* 历史案例 */ })

// API 路由 - AI（可选）
app.post('/api/terms/ai-suggest', (c) => { /* AI 推荐 */ })

// API 路由 - 通间（规划中）
app.post('/api/terms/initiate', (c) => { /* 供参与通调用 */ })
```

### 步骤 5: 构建和部署

```bash
npm run build
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### 步骤 6: 回主站配置跳转

在主站 `data.ts` 中为条款通添加 `externalUrl` 字段，指向独立应用的部署 URL。

---

## 设计原则（必须遵守）

1. **Apple 风格** — 大量留白、文字层次分明、动效克制优雅
2. **品牌色 #5DC4B3 用于全局** — 导航栏、返回按钮、品牌相关元素
3. **条款通专属色 #8B5CF6 仅用于 4 种场景** — CTA 按钮、功能标题/图标、滑块区浅色底纹(#EDE9FE)、进度条/标签/徽章。**所有 Design Token（边框、阴影、渐变）保持品牌色 #5DC4B3 不变**
4. **禁止纯黑 #000000** — 最深颜色为 #1d1d1f
5. **所有交互元素有 hover/active 状态** — 使用 transition 280ms cubic-bezier
6. **响应式** — mobile / tablet / desktop 全适配
7. **毛玻璃** — 导航栏使用 backdrop-filter: blur(24px)
8. **Aurora 深色** — 页脚统一使用深色 Aurora 渐变背景
9. **双语全覆盖** — 所有 UI 文本必须有中英文版本

---

## 注意事项

1. **条款通是 Y 型汇合点** — 融资者和投资者在此第一次碰面协商
2. **三联动滑块是纯前端实现** — 所有计算在浏览器实时运算，不需要后端 AI
3. **Demo 用视角切换模拟双方** — 不做实时双人通信，用"投资方视角/融资方视角"Tab 切换
4. **"接受条款"是模拟的** — 仅改变协商状态，不推送合约通
5. **独立计算器无需登录** — 任何人都可直接使用，手动输入参数即可
6. **数据存储使用 localStorage** — 协商记录和方案保存在客户端
7. **AI 建议是可选功能** — 有 API Key 时启用，无 API Key 时使用简单统计推荐
8. **滑块手柄用条款通专属色** — 但滑块轨道填充用品牌色到专属色渐变
9. **与其他"通"不通信** — Demo 阶段各通独立运行

---

## 与其他"通"的关系（未来规划）

| 上游/下游 | 通 | 交互方式 |
|----------|-----|---------|
| **上游** | 评估通 (Assess Connect) | 提供 PCF、评分等数据，确定滑块上限 |
| **上游** | 风控通 (Risk Connect) | 提供风险评级，影响滑块上限和条款建议 |
| **上游** | 参与通 (Deal Connect) | 投资者选中项目后进入条款通协商 |
| **下游** | 合约通 (Contract Connect) | 条款达成后，标准化条款 JSON 传给合约通生成合同 |

---

*此 Prompt 可直接交给 Genspark 全栈模式生成代码，无需额外补充信息。*
