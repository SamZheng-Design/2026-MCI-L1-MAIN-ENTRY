# ═══════════════════════════════════════════════════════════════
# 评估通 (Assess Connect) — 独立全栈应用搭建 Prompt
# 版本: V3.0 | 日期: 2026-03-01
# 来源: MicroConnect Product Bible V3.0 自动组装
# ═══════════════════════════════════════════════════════════════

## 你要做什么

从零搭建一个**独立的评估通 (Assess Connect) 全栈 Web 应用**。

这个应用是 Micro Connect 滴灌通平台"9个通"中的**第3个产品**——投资者的**"AI 评估筛子"**。投资者在这里自建个性化的多维度筛子（评估工作流），平台的 AI 引擎按筛子的配置自动对融资项目进行量化打分，生成尽调报告（含雷达图、财务预测、风险提示、同行对比、投资建议）。

**不需要 clone 任何主站代码**。这是一个全新的独立项目。
但是设计风格、颜色、字体、交互必须跟主站保持一致（下面会给你完整的设计系统）。

> 📚 **图书馆比喻**: 评估通 = **读者自建选书标准**。每个读者口味不同，图书馆允许读者自己搭一套选书规则：有人只看餐饮类，有人偏好月流水 50 万以上。这是投资者路径的第一个筛子。

---

## 产品档案

| 字段 | 值 |
|------|-----|
| **ID** | `assess` |
| **flowOrder** | 3 |
| **角色** | investor (投资者专属) |
| **阶段** | investor-filter |
| **状态** | `beta` Beta测试中 |
| **浅色** | `#E0E7FF` |
| **深色** | `#6366F1` |
| **分类** | 投资者路径 / Investor Path |
| **图标** | `fa-filter` |
| **Logo URL** | https://www.genspark.ai/api/files/s/UJuchZc6 |
| **核心功能** | 多Agent筛子工作流编排、pre-set维度可编辑、自定义投资标准、AI量化评估、尽调报告(PDF+JSON)生成、批量筛选 |
| **特殊标志** | `isFilter: true` (AI 筛子组件) |
| **一句话** | 投资者自建 AI 筛子 · 多 Agent 分析工作流 |

---

## 技术栈

- **框架**: Hono + TypeScript + JSX（SSR 服务端渲染）
- **部署**: Cloudflare Pages（通过 wrangler）
- **样式**: Tailwind CSS (CDN) + 内联 CSS Design Token
- **图标**: FontAwesome 6.4 (CDN)
- **字体**: Inter + Montserrat + Noto Sans SC (Google Fonts)
- **交互**: 纯原生 JS（inline script），不用 React/Vue
- **i18n**: 通过 `?lang=en` URL 参数切换中英文，默认中文
- **AI**: Demo 阶段统一使用 GPT-4o（通过 `c.env.OPENAI_API_KEY`），用于筛子运行时的项目评分和报告生成
- **数据存储**: localStorage (客户端) 保存筛子配置和评估报告（Demo 不需要数据库）

请用 `npm create hono@latest` 的 `cloudflare-pages` 模板创建项目：
```bash
npm create hono@latest . -- --template cloudflare-pages --install --pm npm
```

---

## 业务逻辑与核心机制

### 评估通在 Y 型业务流程中的位置

```
                    ┌─── 融资者路径 ──→ 发起通(上传数据)
  身份通(统一入口) ──┤                         ↓ 数据穿越管道
                    └─── 投资者路径 ──→ 【评估通(筛子1)】→ 风控通(筛子2) → 参与通(看板)
                                                                          ↓
                              Y型汇合点：条款通 → 合约通 → 结算通 → 履约通
```

评估通是 Y 型流程中**投资者路径的第一个筛子**。评估通的本质是一套**多 Agent 分析工作流**——即"筛子"。投资者从身份通解锁"参与身份"后进入评估通，自行搭建和配置筛子，对发起通提交的融资项目进行 AI 量化评估。

### 评估通 = 平台的 "AI 大脑"

评估通不仅仅是一个评分工具，它是整个平台的 **AI 大脑**——提供模型库和工作流编排能力。核心定位：
- **筛子由投资者自行编写和配置**，不是平台预设的固定模型
- 平台提供一些 pre-set 维度供用户**参考和编辑**，但**不预定维度**，投资者完全自主
- 一个发起通的 Application 可以被多个不同投资者的多个不同筛子分别筛选
- 筛子的评估标准完全透明化，所有评分规则可查看、可复制、可分享

### 核心机制

**第一大类：筛子工作流编排（核心功能）**
- 每个投资者可以创建多个筛子（如"高增长筛子"、"餐饮专用筛子"、"低风险筛子"）
- 每个筛子由多个**评估维度**组成，每个维度是一个独立的 AI Agent
- 维度类型三种：
  - `range`（数值范围型）：月收入 ≥ 30万、增长率 ≥ 5%、融资金额 ≤ 2000万
  - `select`（多选型）：行业选择——餐饮/零售/教育
  - `boolean`（布尔型）：是否有营业执照——必须为 true
- 每个维度可独立启用/禁用，可设置权重（0-100）
- 用户可新增自定义维度

**第二大类：多 Agent 协作评分**
- 每个分析维度可以是一个独立的 AI Agent
- 各 Agent 独立评分后按权重汇总为综合评分
- 例如：Agent-1 分析财务数据 → Agent-2 分析行业趋势 → Agent-3 分析团队背景 → 综合评分

**第三大类：自动生成尽调报告**
- PDF + JSON 格式
- 内含评分雷达图（维度由筛子定义）
- 财务预测、风险提示、同行对比、投资建议
- AI 生成综合评语

**第四大类：财务建模**
- IRR 计算（基于预测收入、分成比例、回收上限）
- 回收期预测
- 敏感性分析

**第五大类：筛子 API（供参与通调用）**
- 接收项目 ID 列表 + 筛子 ID
- 返回符合条件的项目 ID 列表 + 各项评分
- 是评估通对外提供的核心服务接口

### 双模式设计

**串联模式**:
- 接收发起通的项目 → 自动应用投资者配置的筛子
- 推送到风控通 + 参与通
- 触发 `assessment.completed` 事件

**独立模式**:
- 投资者**手动上传项目材料**，使用筛子获取 AI 评估报告
- 不进入平台流程，不推送到风控通
- 相当于一个独立的 AI 尽调报告生成器

### "无筛子"默认策略

- 如果投资者**没有配置任何筛子** → 参与通展示**所有**融资项目（全量浏览模式）
- 如果投资者设置了筛子 → 参与通只展示通过全部筛选标准的项目
- 这确保了：融资者的项目一定会被看到；投资者可以精准高效地筛选
- 投资者可随时补建筛子，实时刷新筛选结果

### 关键输出

- AI 评估报告 (PDF + JSON 格式)
- 筛子评分结果（各维度评分 + 综合评分，维度由投资者自定义）
- 筛子 API 响应（符合条件的项目 ID 列表 + 各项评分）
- 评估完成事件 (`assessment.completed`)

---

## Mock 数据

### TypeScript 类型定义

```typescript
interface Sieve {
  id: string                       // 筛子ID
  userId: string                   // 创建者（投资者）ID
  name: string                     // 筛子名称
  description: string              // 筛子描述
  dimensions: SieveDimension[]     // 评估维度列表
  createdAt: string
  updatedAt: string
}

interface SieveDimension {
  id: string                       // 维度ID
  name: string                     // 维度中文名
  nameEn: string                   // 维度英文名
  enabled: boolean                 // 是否启用
  weight: number                   // 权重 0-100
  type: 'range' | 'select' | 'boolean'  // 维度类型
  config: RangeConfig | SelectConfig | BooleanConfig  // 具体配置
}

interface RangeConfig {
  min: number                      // 最小值
  max: number                      // 最大值
  unit: string                     // 单位：万元 / % / 个月 / 人 / 年
  threshold: number                // 通过阈值
  direction: 'gte' | 'lte'        // ≥ 或 ≤
}

interface SelectConfig {
  options: string[]                // 可选项列表
  selected: string[]               // 已选项（通过条件）
}

interface BooleanConfig {
  requiredValue: boolean           // 需要为 true 或 false 才通过
}

interface AssessReport {
  id: string                       // 报告ID
  projectId: string                // 项目ID（来自发起通）
  projectName: string              // 项目名称
  industry: Industry               // 行业
  sieveId: string                  // 使用的筛子ID
  sieveName: string                // 筛子名称
  overallScore: number             // 0-100 综合评分
  passed: boolean                  // 是否通过筛选
  dimensionScores: DimensionScore[]  // 各维度评分
  summary: string                  // AI 综合评语
  financialModeling?: FinancialModeling  // 财务建模（可选）
  generatedAt: string
}

interface DimensionScore {
  dimensionId: string              // 维度ID
  dimensionName: string            // 维度名称
  score: number                    // 0-100 维度评分
  passed: boolean                  // 是否通过该维度
  detail: string                   // AI 生成的评语
}

interface FinancialModeling {
  estimatedIRR: number             // 预估 IRR (%)
  paybackMonths: number            // 预估回收期（月）
  sensitivityAnalysis: {           // 敏感性分析
    optimistic: { irr: number; payback: number }   // 乐观情景
    baseline: { irr: number; payback: number }     // 基准情景
    pessimistic: { irr: number; payback: number }  // 悲观情景
  }
}

type Industry = 'concert' | 'catering' | 'retail' | 'healthcare' | 'education' | 'saas' | 'ecommerce' | 'service'
```

### 示例数据

```typescript
// 预设评估维度（用户可编辑、增减、调整权重）
const presetDimensions: SieveDimension[] = [
  {
    id: 'd-1', name: '行业', nameEn: 'Industry', enabled: true, weight: 15,
    type: 'select',
    config: {
      options: ['餐饮', '零售', '教育', '医美', '演出', 'SaaS', '电商', '服务'],
      selected: ['餐饮', '零售', '教育']
    }
  },
  {
    id: 'd-2', name: '月收入', nameEn: 'Monthly Revenue', enabled: true, weight: 20,
    type: 'range',
    config: { min: 0, max: 1000, unit: '万元', threshold: 30, direction: 'gte' }
  },
  {
    id: 'd-3', name: '月增长率', nameEn: 'Monthly Growth', enabled: true, weight: 15,
    type: 'range',
    config: { min: -50, max: 100, unit: '%', threshold: 5, direction: 'gte' }
  },
  {
    id: 'd-4', name: '融资金额', nameEn: 'Financing Amount', enabled: true, weight: 10,
    type: 'range',
    config: { min: 0, max: 5000, unit: '万元', threshold: 2000, direction: 'lte' }
  },
  {
    id: 'd-5', name: '团队规模', nameEn: 'Team Size', enabled: false, weight: 10,
    type: 'range',
    config: { min: 0, max: 500, unit: '人', threshold: 10, direction: 'gte' }
  },
  {
    id: 'd-6', name: '盈利能力', nameEn: 'Profitability', enabled: true, weight: 15,
    type: 'range',
    config: { min: -100, max: 100, unit: '%', threshold: 5, direction: 'gte' }
  },
  {
    id: 'd-7', name: '经营年限', nameEn: 'Years in Business', enabled: true, weight: 10,
    type: 'range',
    config: { min: 0, max: 30, unit: '年', threshold: 2, direction: 'gte' }
  },
  {
    id: 'd-8', name: '有营业执照', nameEn: 'Business License', enabled: true, weight: 5,
    type: 'boolean',
    config: { requiredValue: true }
  }
]

// 筛子示例
const mockSieves: Sieve[] = [
  {
    id: 'sieve-001',
    userId: 'u-002',
    name: '稳健型餐饮筛选',
    description: '偏好稳定收入的餐饮类项目，月收入≥30万，增长率≥5%，有营业执照',
    dimensions: presetDimensions,
    createdAt: '2026-02-01',
    updatedAt: '2026-02-15'
  },
  {
    id: 'sieve-002',
    userId: 'u-002',
    name: '高增长科技筛选',
    description: '偏好高增长的科技类项目，月增长率≥15%，融资金额≤1000万',
    dimensions: [
      {
        id: 'd-1', name: '行业', nameEn: 'Industry', enabled: true, weight: 10,
        type: 'select',
        config: { options: ['餐饮', '零售', '教育', '医美', '演出', 'SaaS', '电商', '服务'], selected: ['SaaS', '电商', '教育'] }
      },
      {
        id: 'd-2', name: '月收入', nameEn: 'Monthly Revenue', enabled: true, weight: 15,
        type: 'range',
        config: { min: 0, max: 1000, unit: '万元', threshold: 10, direction: 'gte' }
      },
      {
        id: 'd-3', name: '月增长率', nameEn: 'Monthly Growth', enabled: true, weight: 30,
        type: 'range',
        config: { min: -50, max: 100, unit: '%', threshold: 15, direction: 'gte' }
      },
      {
        id: 'd-4', name: '融资金额', nameEn: 'Financing Amount', enabled: true, weight: 15,
        type: 'range',
        config: { min: 0, max: 5000, unit: '万元', threshold: 1000, direction: 'lte' }
      },
      {
        id: 'd-6', name: '盈利能力', nameEn: 'Profitability', enabled: false, weight: 10,
        type: 'range',
        config: { min: -100, max: 100, unit: '%', threshold: 0, direction: 'gte' }
      },
      {
        id: 'd-8', name: '有营业执照', nameEn: 'Business License', enabled: true, weight: 5,
        type: 'boolean',
        config: { requiredValue: true }
      }
    ],
    createdAt: '2026-02-10',
    updatedAt: '2026-02-20'
  }
]

// 评估报告示例
const mockAssessReports: AssessReport[] = [
  {
    id: 'ar-001',
    projectId: 'proj-001',
    projectName: '星火餐饮连锁',
    industry: 'catering',
    sieveId: 'sieve-001',
    sieveName: '稳健型餐饮筛选',
    overallScore: 82,
    passed: true,
    dimensionScores: [
      { dimensionId: 'd-1', dimensionName: '行业', score: 100, passed: true, detail: '餐饮行业，符合筛选条件' },
      { dimensionId: 'd-2', dimensionName: '月收入', score: 85, passed: true, detail: '月收入85万元，高于阈值30万，处于行业中上水平' },
      { dimensionId: 'd-3', dimensionName: '月增长率', score: 90, passed: true, detail: '月增长率12%，增速强劲，连续6个月保持双位数增长' },
      { dimensionId: 'd-4', dimensionName: '融资金额', score: 75, passed: true, detail: '融资500万元，低于上限2000万，金额合理' },
      { dimensionId: 'd-6', dimensionName: '盈利能力', score: 75, passed: true, detail: '利润率18%，行业中上水平，成本结构合理' },
      { dimensionId: 'd-7', dimensionName: '经营年限', score: 80, passed: true, detail: '成立约6年，经营稳定，已过初创期风险' },
      { dimensionId: 'd-8', dimensionName: '有营业执照', score: 100, passed: true, detail: '营业执照齐全' }
    ],
    summary: '星火餐饮连锁综合评分82分，各项指标均通过筛选标准。月收入稳定增长，盈利能力良好，团队经验丰富。建议重点关注供应链扩张计划的执行风险。',
    financialModeling: {
      estimatedIRR: 18.2,
      paybackMonths: 32,
      sensitivityAnalysis: {
        optimistic: { irr: 24.5, payback: 26 },
        baseline: { irr: 18.2, payback: 32 },
        pessimistic: { irr: 11.8, payback: 42 }
      }
    },
    generatedAt: '2026-02-15'
  },
  {
    id: 'ar-002',
    projectId: 'proj-003',
    projectName: '优学教育科技',
    industry: 'education',
    sieveId: 'sieve-001',
    sieveName: '稳健型餐饮筛选',
    overallScore: 68,
    passed: false,
    dimensionScores: [
      { dimensionId: 'd-1', dimensionName: '行业', score: 100, passed: true, detail: '教育行业，符合筛选条件' },
      { dimensionId: 'd-2', dimensionName: '月收入', score: 60, passed: true, detail: '月收入38万元，高于阈值30万，但处于行业中等偏下水平' },
      { dimensionId: 'd-3', dimensionName: '月增长率', score: 95, passed: true, detail: '月增长率22%，增速出色' },
      { dimensionId: 'd-4', dimensionName: '融资金额', score: 90, passed: true, detail: '融资200万元，金额较小，风险可控' },
      { dimensionId: 'd-6', dimensionName: '盈利能力', score: 65, passed: true, detail: '利润率15%，教育行业中等水平' },
      { dimensionId: 'd-7', dimensionName: '经营年限', score: 40, passed: false, detail: '成立约5年，但在线教育业务仅运营2年，稳定性待验证' }
    ],
    summary: '优学教育科技综合评分68分，增速出色但经营年限不足。线上业务运营时间较短，建议关注获客成本和续费率。',
    financialModeling: {
      estimatedIRR: 14.5,
      paybackMonths: 44,
      sensitivityAnalysis: {
        optimistic: { irr: 20.3, payback: 30 },
        baseline: { irr: 14.5, payback: 44 },
        pessimistic: { irr: 6.2, payback: 60 }
      }
    },
    generatedAt: '2026-02-16'
  },
  {
    id: 'ar-003',
    projectId: 'proj-002',
    projectName: '悦声文化传媒',
    industry: 'concert',
    sieveId: 'sieve-002',
    sieveName: '高增长科技筛选',
    overallScore: 45,
    passed: false,
    dimensionScores: [
      { dimensionId: 'd-1', dimensionName: '行业', score: 0, passed: false, detail: '演出行业不在筛选范围（SaaS/电商/教育）内' },
      { dimensionId: 'd-2', dimensionName: '月收入', score: 70, passed: true, detail: '月收入约50万元，高于阈值10万' },
      { dimensionId: 'd-3', dimensionName: '月增长率', score: 55, passed: false, detail: '月增长率8%，低于15%阈值' }
    ],
    summary: '悦声文化传媒不符合"高增长科技筛选"条件：行业不匹配（演出 ≠ SaaS/电商/教育），增长率未达标。建议使用其他筛子评估。',
    generatedAt: '2026-02-22'
  }
]

// 模拟项目数据（来自发起通，用于筛子运行时的输入）
const mockProjects = [
  {
    id: 'proj-001',
    companyName: '星火餐饮连锁',
    industry: 'catering',
    monthlyRevenue: 85,
    monthlyGrowthRate: 12,
    financingAmount: 500,
    profitMargin: 18,
    teamSize: 120,
    yearsInBusiness: 6,
    hasBusinessLicense: true
  },
  {
    id: 'proj-002',
    companyName: '悦声文化传媒',
    industry: 'concert',
    monthlyRevenue: 50,
    monthlyGrowthRate: 8,
    financingAmount: 800,
    profitMargin: 22,
    teamSize: 35,
    yearsInBusiness: 3,
    hasBusinessLicense: true
  },
  {
    id: 'proj-003',
    companyName: '优学教育科技',
    industry: 'education',
    monthlyRevenue: 38,
    monthlyGrowthRate: 22,
    financingAmount: 200,
    profitMargin: 15,
    teamSize: 45,
    yearsInBusiness: 5,
    hasBusinessLicense: true
  }
]
```

### 筛子状态映射

```typescript
const SIEVE_STATUS: Record<string, { zh: string; en: string; color: string; bgColor: string }> = {
  active:   { zh: '已启用', en: 'Active', color: '#6366F1', bgColor: '#E0E7FF' },
  draft:    { zh: '草稿', en: 'Draft', color: '#86868b', bgColor: '#f5f5f7' },
  archived: { zh: '已归档', en: 'Archived', color: '#6e6e73', bgColor: '#f1f5f9' }
}

const REPORT_STATUS: Record<string, { zh: string; en: string; color: string; bgColor: string }> = {
  passed:  { zh: '通过', en: 'Passed', color: '#34c759', bgColor: '#dcfce7' },
  failed:  { zh: '未通过', en: 'Failed', color: '#ff375f', bgColor: '#fee2e2' },
  pending: { zh: '待评估', en: 'Pending', color: '#6366F1', bgColor: '#E0E7FF' }
}
```

### Demo 简化说明

- **筛子配置是纯前端实现**：维度的启用/禁用、权重调节、阈值设定全部在浏览器完成
- **AI 评估**：有 API Key 时调用 GPT-4o 逐维度评分生成报告；无 API Key 时使用 Mock 数据直接返回预设报告
- **雷达图**：用纯 CSS + SVG 实现简易雷达图，不引入 Chart.js（保持轻量）
- **PDF 导出**：Demo 阶段用 `window.print()` 打印报告页面模拟导出
- **数据存储使用 localStorage**：筛子配置和评估报告保存在客户端
- **"运行筛子"是模拟的**：Demo 阶段在前端按维度配置对 Mock 项目数据进行简单评分，不做真实的多 Agent 调用
- **与其他"通"不通信**：Demo 阶段各通独立运行

---

## 页面布局

### 页面 1: 筛子管理页（评估通主页 `/`）

```
┌──────────────────────────────────────────────────────────────┐
│  Navbar（简化版）                                              │
│  [Logo MICRO CONNECT 滴灌通] [评估通 Assess Connect] [中/EN] [返回主站] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─ Hero 区 ────────────────────────────────────────────────┐ │
│  │  🔍 评估通 Logo (来自 Logo URL)                            │ │
│  │  "构建你的 AI 筛子"                                        │ │
│  │  "定义投资标准 · 让 AI 帮你筛选 · 自动生成尽调报告"          │ │
│  │  📚 读者自建选书标准 — 搭一套你自己的选书规则                 │ │
│  │                                                           │ │
│  │  ┌──── + 新建筛子 ────────────┐                            │ │
│  │  └────────────────────────────┘                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 筛子统计栏 ────────────────────────────────────────────┐  │
│  │  全部 (2)  |  已启用 (2)  |  草稿 (0)  |  已归档 (0)      │  │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 我的筛子列表 ───────────────────────────────────────────┐ │
│  │                                                           │ │
│  │  ┌── 筛子卡片 1 ──────────────────────────────────────────┐ │
│  │  │  🔍 稳健型餐饮筛选               [已启用]                │ │
│  │  │  "偏好稳定收入的餐饮类项目"                               │ │
│  │  │  已启用维度: 7/8 | 权重总和: 90                          │ │
│  │  │  上次更新: 2026-02-15                                   │ │
│  │  │  [✏️ 编辑] [▶️ 运行筛子] [📋 复制]                       │ │
│  │  └────────────────────────────────────────────────────────┘ │
│  │                                                           │ │
│  │  ┌── 筛子卡片 2 ──────────────────────────────────────────┐ │
│  │  │  🚀 高增长科技筛选               [已启用]                │ │
│  │  │  "偏好高增长的科技类项目"                                 │ │
│  │  │  已启用维度: 5/6 | 权重总和: 75                          │ │
│  │  │  上次更新: 2026-02-20                                   │ │
│  │  │  [✏️ 编辑] [▶️ 运行筛子] [📋 复制]                       │ │
│  │  └────────────────────────────────────────────────────────┘ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 最近评估报告 ───────────────────────────────────────────┐ │
│  │  "最近生成的评估报告"                                       │ │
│  │                                                           │ │
│  │  | 项目名          | 筛子       | 综合评分 | 结果    | 日期       |
│  │  |----------------|------------|---------|---------|-----------|
│  │  | 星火餐饮连锁     | 稳健型餐饮  | 82分    | ✅ 通过 | 2026-02-15 |
│  │  | 优学教育科技     | 稳健型餐饮  | 68分    | ❌ 未通过| 2026-02-16 |
│  │  | 悦声文化传媒     | 高增长科技  | 45分    | ❌ 未通过| 2026-02-22 |
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  Footer（简化版，Aurora 深色背景）                               │
└──────────────────────────────────────────────────────────────┘
```

**交互逻辑**:
- "新建筛子"按钮 → 从预设维度模板创建新筛子，跳转到 `/sieve/:id`
- "编辑"按钮 → 跳转到 `/sieve/:id`（筛子编辑器）
- "运行筛子"按钮 → 弹出运行面板：选择要评估的项目列表（Demo 用 Mock 项目），确认后跳转到报告页
- "复制"按钮 → 复制筛子配置为新筛子
- 报告列表行点击 → 跳转到 `/report/:id`

### 页面 2: 筛子编辑器（`/sieve/:id`，核心页面）

```
┌──────────────────────────────────────────────────────────────┐
│  Navbar                                                      │
├──────────────────────────────────────────────────────────────┤
│  面包屑: 评估通 > 稳健型餐饮筛选                                 │
│                                                              │
│  ┌─ 筛子基本信息 ───────────────────────────────────────────┐ │
│  │  筛子名称: [稳健型餐饮筛选                           ]      │ │
│  │  描述:     [偏好稳定收入的餐饮类项目，月收入≥30万...  ]      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 维度配置区（可折叠列表）━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┐ │
│  │                                                           │ │
│  │  ┌── 维度 1: 行业 ──────────────────────────────────────┐ │ │
│  │  │  [✅ 启用]  行业 (Industry)       权重: ──[●]── 15    │ │ │
│  │  │  类型: select                                         │ │ │
│  │  │  ┌────────────────────────────────────────────────┐   │ │ │
│  │  │  │ ☑ 餐饮  ☑ 零售  ☑ 教育  ☐ 医美  ☐ 演出       │   │ │ │
│  │  │  │ ☐ SaaS  ☐ 电商  ☐ 服务                        │   │ │ │
│  │  │  └────────────────────────────────────────────────┘   │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌── 维度 2: 月收入 ────────────────────────────────────┐ │ │
│  │  │  [✅ 启用]  月收入 (Monthly Revenue)   权重: ──[●]── 20│ │ │
│  │  │  类型: range | 范围: 0 - 1000 万元                    │ │ │
│  │  │  通过条件: ≥ 30 万元                                  │ │ │
│  │  │  阈值滑块: ├────[●]──────────────────────┤            │ │ │
│  │  │           0                            1000           │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌── 维度 3: 月增长率 ──────────────────────────────────┐ │ │
│  │  │  [✅ 启用]  月增长率 (Monthly Growth)  权重: ──[●]── 15│ │ │
│  │  │  类型: range | 范围: -50% - 100%                      │ │ │
│  │  │  通过条件: ≥ 5%                                       │ │ │
│  │  │  阈值滑块: ├──[●]─────────────────────────┤           │ │ │
│  │  │           -50%                          100%          │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌── 维度 4: 融资金额 ──────────────────────────────────┐ │ │
│  │  │  [✅ 启用]  融资金额 (Financing Amount)  权重: ─[●]─ 10│ │ │
│  │  │  类型: range | 范围: 0 - 5000 万元                    │ │ │
│  │  │  通过条件: ≤ 2000 万元                                │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌── 维度 5: 团队规模 (已禁用) ─────────────────────────┐ │ │
│  │  │  [☐ 禁用]  团队规模 (Team Size)       权重: ---       │ │ │
│  │  │  (折叠状态，点击启用后展开配置)                          │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌── 维度 6: 盈利能力 ──────────────────────────────────┐ │ │
│  │  │  [✅ 启用]  盈利能力 (Profitability)   权重: ──[●]── 15│ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌── 维度 7: 经营年限 ──────────────────────────────────┐ │ │
│  │  │  [✅ 启用]  经营年限 (Years in Business)  权重: ─[●]─ 10│ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌── 维度 8: 有营业执照 ────────────────────────────────┐ │ │
│  │  │  [✅ 启用]  有营业执照 (Business License)  权重: ─[●]─ 5│ │ │
│  │  │  类型: boolean | 要求: 必须为 是                       │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌──── + 添加自定义维度 ────┐                              │ │
│  │  └──────────────────────────┘                             │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 权重预览 ──────────────────────────────────────────────┐ │
│  │  "维度权重分布（已启用维度）"                                │ │
│  │                                                           │ │
│  │  行业        ████████░░░░░░░  15%                         │ │
│  │  月收入      ████████████░░░  20%                         │ │
│  │  月增长率    ████████████░░░  15%                         │ │
│  │  融资金额    ██████░░░░░░░░░  10%                         │ │
│  │  盈利能力    ████████████░░░  15%                         │ │
│  │  经营年限    ██████░░░░░░░░░  10%                         │ │
│  │  营业执照    ███░░░░░░░░░░░░   5%                         │ │
│  │                                    总权重: 90/100         │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 操作按钮 ───────────────────────────────────────────────┐ │
│  │  [💾 保存筛子]  [▶️ 立即运行（筛选全部项目）]                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  Footer                                                      │
└──────────────────────────────────────────────────────────────┘
```

**交互逻辑**:
- **维度折叠/展开**：每个维度可折叠，点击标题展开详细配置
- **启用/禁用开关**：Toggle 切换，禁用时维度折叠变灰
- **权重滑块**：0-100 滑块，实时更新右侧权重预览图
- **阈值滑块（range 类型）**：拖动滑块设置通过阈值
- **多选框（select 类型）**：勾选/取消勾选行业
- **"添加自定义维度"**：弹出对话框输入维度名、选择类型、配置参数
- **"保存筛子"**：保存到 localStorage + Toast 提示
- **"立即运行"**：弹出选择项目面板 → 运行评估 → 跳转到报告列表

### 页面 3: 评估报告页（`/report/:id`）

```
┌──────────────────────────────────────────────────────────────┐
│  Navbar                                                      │
├──────────────────────────────────────────────────────────────┤
│  面包屑: 评估通 > 评估报告                                     │
│                                                              │
│  ┌─ 项目基本信息 ───────────────────────────────────────────┐ │
│  │  🍜 星火餐饮连锁 | 餐饮行业 | 融资 ¥500万                  │ │
│  │  使用筛子: 稳健型餐饮筛选                                   │ │
│  │  评估时间: 2026-02-15                                     │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 综合评分区 ─────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │        ┌────────────────┐                                 │ │
│  │        │                │                                 │ │
│  │        │      82        │     ✅ 通过筛选                  │ │
│  │        │     /100       │     "综合评分优秀"               │ │
│  │        │                │                                 │ │
│  │        └────────────────┘                                 │ │
│  │        (圆形进度环动画)                                     │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 雷达图（各维度得分可视化）──────────────────────────────┐  │
│  │                                                           │ │
│  │              行业 100                                     │ │
│  │               /\                                          │ │
│  │   经营年限   /  \    月收入                                │ │
│  │     80     /    \     85                                  │ │
│  │           / 评分区 \                                      │ │
│  │   盈利能力 \      / 月增长率                               │ │
│  │     75     \    /     90                                  │ │
│  │            \  /                                           │ │
│  │             \/                                            │ │
│  │         融资金额 75                                       │ │
│  │                                                           │ │
│  │  (SVG 雷达图 — 用评估通专属色 #6366F1 填充)                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 维度明细 ───────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │  ┌── 行业 ─────────────────────────────── 100分 ✅ ──────┐ │
│  │  │  ████████████████████████████████████████████████ 100% │ │
│  │  │  "餐饮行业，符合筛选条件"                                │ │
│  │  └──────────────────────────────────────────────────────┘ │
│  │                                                           │ │
│  │  ┌── 月收入 ───────────────────────────── 85分 ✅ ───────┐ │
│  │  │  ████████████████████████████████████████████░░░░ 85%  │ │
│  │  │  "月收入85万元，高于阈值30万，处于行业中上水平"            │ │
│  │  └──────────────────────────────────────────────────────┘ │
│  │                                                           │ │
│  │  ┌── 月增长率 ─────────────────────────── 90分 ✅ ───────┐ │
│  │  │  ██████████████████████████████████████████████░░ 90%  │ │
│  │  │  "月增长率12%，增速强劲，连续6个月保持双位数增长"          │ │
│  │  └──────────────────────────────────────────────────────┘ │
│  │                                                           │ │
│  │  ┌── 经营年限 ─────────────────────────── 40分 ❌ ───────┐ │
│  │  │  ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░ 40%     │ │
│  │  │  "成立约5年，但在线教育业务仅运营2年，稳定性待验证"        │ │
│  │  └──────────────────────────────────────────────────────┘ │
│  │  ...                                                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 财务建模（可选区域）────────────────────────────────────┐ │
│  │  预估 IRR: 18.2% | 预估回收期: 32个月                     │ │
│  │                                                           │ │
│  │  敏感性分析:                                               │ │
│  │  | 情景   | IRR     | 回收期 |                             │ │
│  │  |--------|---------|--------|                             │ │
│  │  | 乐观   | 24.5%   | 26月   |                             │ │
│  │  | 基准   | 18.2%   | 32月   |                             │ │
│  │  | 悲观   | 11.8%   | 42月   |                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ AI 综合评语 ────────────────────────────────────────────┐ │
│  │  "星火餐饮连锁综合评分82分，各项指标均通过筛选标准。        │ │
│  │   月收入稳定增长，盈利能力良好，团队经验丰富。              │ │
│  │   建议重点关注供应链扩张计划的执行风险。"                   │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 操作按钮 ───────────────────────────────────────────────┐ │
│  │  [📄 导出报告]  [🔄 重新评估]  [← 返回列表]                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  Footer                                                      │
└──────────────────────────────────────────────────────────────┘
```

**交互逻辑**:
- **综合评分圆环**：加载时播放从 0 到最终分数的动画（CSS transition）
- **雷达图**：SVG 实现，填充色用评估通专属色 `#6366F1` 半透明
- **维度得分条**：进度条动画，通过的用绿色，未通过的用红色
- **"导出报告"**：调用 `window.print()` 打印当前页面（Demo 简化）
- **"重新评估"**：跳转回筛子编辑器
- **"返回列表"**：回到首页

---

## API 路由

### 筛子管理

```
GET /api/sieves
  描述: 获取当前用户的筛子列表
  请求: 无（Demo 返回所有 mock 筛子）
  响应: { success: true, sieves: Sieve[] }

POST /api/sieves
  描述: 新建筛子（可从预设模板创建）
  请求: { name: string, description: string, dimensions?: SieveDimension[] }
  响应: { success: true, sieve: Sieve }
  逻辑: 如不传 dimensions，使用 presetDimensions 作为默认模板

GET /api/sieves/:id
  描述: 获取筛子详情（含维度配置）
  请求: URL 参数 id
  响应: { success: true, sieve: Sieve }

PUT /api/sieves/:id
  描述: 更新筛子配置（修改名称、描述、维度）
  请求: { name?: string, description?: string, dimensions?: SieveDimension[] }
  响应: { success: true, sieve: Sieve }

DELETE /api/sieves/:id
  描述: 删除筛子
  请求: URL 参数 id
  响应: { success: true }
```

### 评估运行

```
POST /api/assess/run
  描述: 运行筛子评估（核心 API）
  请求: { sieveId: string, projectIds: string[] }
  响应: { success: true, reports: AssessReport[] }
  逻辑:
    1. 获取指定筛子的维度配置
    2. 获取指定项目的 StructuredPackage 数据
    3. 逐项目 × 逐维度评分:
       - select 维度: 项目行业是否在 selected 列表中 → 100/0 分
       - range 维度: 根据阈值和方向评分（线性映射）
       - boolean 维度: 匹配 requiredValue → 100/0 分
    4. 按权重加权汇总得出 overallScore
    5. 所有启用维度都通过 → passed = true
    6. 生成 summary（有 API Key 时调用 GPT-4o 生成评语，无则使用模板化评语）
    7. 可选：生成 financialModeling
  
  AI 调用详情（有 API Key 时）:
    - 模型: gpt-4o
    - System Prompt:
      "你是一个专业的投资尽调分析师。请根据以下融资项目数据和投资者的筛子配置，
       对每个评估维度进行打分（0-100）并撰写评语。最后给出综合评语和投资建议。
       输出 JSON 格式，符合 AssessReport schema。"
    - User Prompt: 项目数据 + 筛子维度配置
```

### 评估报告

```
GET /api/assess/reports
  描述: 获取评估报告列表
  请求: 可选 query 参数 ?sieveId=xxx
  响应: { success: true, reports: AssessReport[] }

GET /api/assess/report/:id
  描述: 获取单份评估报告
  请求: URL 参数 id
  响应: { success: true, report: AssessReport }
```

### 通间 API（供参与通调用）

```
POST /api/assess/sieve
  描述: [通间 API] 供参与通调用的筛选接口
  请求: { sieveId: string, projectIds: string[] }
  响应: { success: true, filtered: [{ projectId: string, scores: DimensionScore[], passed: boolean, overallScore: number }] }
  逻辑: 与 /api/assess/run 类似，但返回格式更精简，面向服务间调用
```

### AI 建议（可选）

```
POST /api/assess/ai-suggest
  描述: AI 推荐筛子配置（可选功能，有 API Key 时启用）
  请求: { investorProfile?: string, preferredIndustries?: string[] }
  响应: { success: true, suggestedDimensions: SieveDimension[], reasoning: string }
  逻辑: 调用 GPT-4o，根据投资者偏好推荐筛子配置
  ⚠️ 如果没有配置 OPENAI_API_KEY，返回 presetDimensions 作为默认推荐
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

### 评估通专属色

```
浅色:   #E0E7FF  (功能卡片浅色底纹、维度配置区背景、雷达图浅色区域、报告表头)
深色:   #6366F1  (CTA按钮、功能标题/图标、维度权重条active色、进度条/标签/徽章)
```

**⚠️ 关键规则 — 颜色使用铁律**:
- 品牌色 `#5DC4B3` 用于**全部全局元素**：导航栏链接、品牌 Logo、返回按钮、hover 边框、focus 边框、卡片 hover 阴影、渐变等
- 评估通专属色 `#6366F1` **仅限以下 4 种场景**：
  1. CTA 按钮背景色（如"运行筛子"、"保存筛子"）
  2. 功能区标题和图标色（如维度名称图标、评分标题、雷达图轮廓/填充）
  3. 维度配置区/报告区的浅色背景底纹（用 `#E0E7FF`）
  4. 进度条/标签/徽章等功能性色块（如"已启用"状态标签、权重进度条、评分条）
- **绝不用 `#6366F1` 替换任何全局 Design Token**（边框、阴影、渐变等全部保持品牌色 `#5DC4B3`）

### 语义色

```
信息 (info):     #32ade6
成功 (success):  #34c759    (通过标记、维度通过)
警告 (warning):  #ff9f0a
错误 (error):    #ff375f    (未通过标记、维度失败)
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
        assess: { light:'#E0E7FF', DEFAULT:'#6366F1', dark:'#4F46E5' },
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
  - 中间：**"评估通 Assess Connect"**（评估通专属色 #6366F1）
  - 右侧：语言切换 (中/EN) + "返回主站"按钮（品牌色 #5DC4B3）

### 页脚 (Footer) — 独立应用简化版

- **Aurora 深色背景**: `radial-gradient(ellipse 130% 90% at 50% 20%, #0f3d36 0%, #0b312c 40%, #082420 70%, #061b18 100%)`
- **内容**: 品牌 Logo + "评估通 Assess Connect" + 版权 `© 2026 Micro Connect Group`
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

### 维度配置卡片样式

```css
.dimension-card {
  background: white;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 20px;
  transition: all 280ms cubic-bezier(0.22,1,0.36,1);
}
.dimension-card.enabled {
  border-left: 4px solid #6366F1;  /* 评估通专属色 */
}
.dimension-card.disabled {
  opacity: 0.5;
  border-left: 4px solid #e5e7eb;
}
.dimension-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
```

### 权重滑块样式

```css
/* 权重滑块轨道 */
.weight-track {
  width: 100%;
  height: 6px;
  background: #f1f5f9;
  border-radius: 3px;
  position: relative;
}

/* 权重已填充部分 */
.weight-fill {
  height: 100%;
  background: linear-gradient(90deg, #5DC4B3, #6366F1);  /* 品牌色到专属色渐变 */
  border-radius: 3px;
  transition: width 60ms ease;
}

/* 权重滑块手柄 */
.weight-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border: 3px solid #6366F1;  /* 评估通专属色 */
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  cursor: grab;
  transition: transform 180ms cubic-bezier(0.22,1,0.36,1), box-shadow 180ms;
}
.weight-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(99,102,241,0.3);  /* 专属色阴影 */
}
.weight-thumb:active {
  cursor: grabbing;
  transform: scale(1.1);
  border-color: #4F46E5;
}
```

### 权重进度条样式

```css
.weight-bar {
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}
.weight-bar-fill {
  height: 100%;
  background: #6366F1;  /* 评估通专属色 */
  border-radius: 4px;
  transition: width 420ms cubic-bezier(0.22,1,0.36,1);
}
```

### 评分进度条样式

```css
.score-bar {
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}
.score-bar-fill.passed {
  background: #34c759;  /* 成功色 */
}
.score-bar-fill.failed {
  background: #ff375f;  /* 错误色 */
}
```

### 雷达图样式（SVG）

```css
.radar-chart {
  width: 300px;
  height: 300px;
}
.radar-area {
  fill: rgba(99, 102, 241, 0.15);    /* 评估通专属色半透明填充 */
  stroke: #6366F1;                     /* 评估通专属色轮廓 */
  stroke-width: 2;
}
.radar-grid {
  stroke: #e5e7eb;
  stroke-width: 0.5;
  fill: none;
}
.radar-label {
  font-size: 12px;
  fill: #6e6e73;
  font-family: 'Inter', sans-serif;
}
.radar-score {
  font-size: 14px;
  font-weight: 600;
  fill: #1d1d1f;
}
```

### 综合评分圆环样式

```css
.score-ring {
  width: 160px;
  height: 160px;
  position: relative;
}
.score-ring svg circle {
  fill: none;
  stroke-width: 12;
  stroke-linecap: round;
}
.score-ring .ring-bg {
  stroke: #f1f5f9;
}
.score-ring .ring-fill {
  stroke: #6366F1;  /* 评估通专属色 */
  transition: stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.score-ring .ring-fill.passed {
  stroke: #34c759;  /* 通过时用成功色 */
}
.score-ring .ring-fill.failed {
  stroke: #ff375f;  /* 未通过时用错误色 */
}
.score-ring .score-text {
  font-size: 42px;
  font-weight: 800;
  font-family: 'Montserrat', 'Inter', sans-serif;
  color: #1d1d1f;
}
```

### Toggle 开关样式

```css
.toggle {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: #e5e7eb;
  position: relative;
  cursor: pointer;
  transition: background 280ms cubic-bezier(0.22,1,0.36,1);
}
.toggle.active {
  background: #6366F1;  /* 评估通专属色 */
}
.toggle::after {
  content: '';
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  position: absolute;
  top: 2px;
  left: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform 280ms cubic-bezier(0.22,1,0.36,1);
}
.toggle.active::after {
  transform: translateX(20px);
}
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
active (已启用):    背景 #E0E7FF 文字 #6366F1 边框 rgba(99,102,241,0.2)  — 评估通专属色
passed (通过):      bg-green-100 text-green-700 border-green-200
failed (未通过):    bg-red-100 text-red-700 border-red-200
draft (草稿):       bg-gray-100 text-gray-500 border-gray-200
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
    title: { zh: '评估通', en: 'Assess Connect' },
    subtitle: { zh: '投资者AI筛子 · 多Agent分析工作流', en: 'Investor AI Sieve · Multi-Agent Analysis Workflow' },
    backToMain: { zh: '返回主站', en: 'Back to Main' },
    langSwitch: { zh: 'EN', en: '中' }
  },
  hero: {
    title: { zh: '构建你的 AI 筛子', en: 'Build Your AI Sieve' },
    subtitle: { zh: '定义投资标准 · 让 AI 帮你筛选 · 自动生成尽调报告', en: 'Define investment criteria · Let AI filter for you · Auto-generate due diligence reports' },
    libraryHint: { zh: '📚 读者自建选书标准 — 搭一套你自己的选书规则', en: '📚 Build your own book selection criteria — Create your personal reading rules' },
    newSieve: { zh: '+ 新建筛子', en: '+ New Sieve' }
  },
  stats: {
    all: { zh: '全部', en: 'All' },
    active: { zh: '已启用', en: 'Active' },
    draft: { zh: '草稿', en: 'Draft' },
    archived: { zh: '已归档', en: 'Archived' }
  },
  sieve: {
    dimensions: { zh: '已启用维度', en: 'Active Dimensions' },
    totalWeight: { zh: '权重总和', en: 'Total Weight' },
    lastUpdated: { zh: '上次更新', en: 'Last Updated' },
    edit: { zh: '✏️ 编辑', en: '✏️ Edit' },
    run: { zh: '▶️ 运行筛子', en: '▶️ Run Sieve' },
    copy: { zh: '📋 复制', en: '📋 Copy' },
    delete: { zh: '🗑️ 删除', en: '🗑️ Delete' }
  },
  editor: {
    basicInfo: { zh: '筛子基本信息', en: 'Sieve Basic Info' },
    nameLabel: { zh: '筛子名称', en: 'Sieve Name' },
    namePlaceholder: { zh: '输入筛子名称', en: 'Enter sieve name' },
    descLabel: { zh: '描述', en: 'Description' },
    descPlaceholder: { zh: '描述投资偏好和筛选策略', en: 'Describe investment preferences and filtering strategy' },
    dimensionsTitle: { zh: '维度配置', en: 'Dimension Configuration' },
    enabled: { zh: '启用', en: 'Enabled' },
    disabled: { zh: '禁用', en: 'Disabled' },
    weight: { zh: '权重', en: 'Weight' },
    threshold: { zh: '阈值', en: 'Threshold' },
    condition: { zh: '通过条件', en: 'Pass Condition' },
    gte: { zh: '≥ 大于等于', en: '≥ Greater than or equal' },
    lte: { zh: '≤ 小于等于', en: '≤ Less than or equal' },
    addDimension: { zh: '+ 添加自定义维度', en: '+ Add Custom Dimension' },
    weightPreview: { zh: '维度权重分布', en: 'Dimension Weight Distribution' },
    totalWeightLabel: { zh: '总权重', en: 'Total Weight' },
    saveSieve: { zh: '💾 保存筛子', en: '💾 Save Sieve' },
    runNow: { zh: '▶️ 立即运行（筛选全部项目）', en: '▶️ Run Now (Filter All Projects)' },
    savedToast: { zh: '筛子已保存', en: 'Sieve saved' }
  },
  report: {
    projectInfo: { zh: '项目信息', en: 'Project Info' },
    sieveUsed: { zh: '使用筛子', en: 'Sieve Used' },
    assessTime: { zh: '评估时间', en: 'Assessment Time' },
    overallScore: { zh: '综合评分', en: 'Overall Score' },
    passed: { zh: '通过筛选', en: 'Passed' },
    failed: { zh: '未通过筛选', en: 'Failed' },
    radarChart: { zh: '评分雷达图', en: 'Score Radar Chart' },
    dimensionDetail: { zh: '维度明细', en: 'Dimension Details' },
    financialModeling: { zh: '财务建模', en: 'Financial Modeling' },
    estimatedIRR: { zh: '预估IRR', en: 'Estimated IRR' },
    paybackPeriod: { zh: '预估回收期', en: 'Est. Payback Period' },
    sensitivityAnalysis: { zh: '敏感性分析', en: 'Sensitivity Analysis' },
    optimistic: { zh: '乐观', en: 'Optimistic' },
    baseline: { zh: '基准', en: 'Baseline' },
    pessimistic: { zh: '悲观', en: 'Pessimistic' },
    aiSummary: { zh: 'AI 综合评语', en: 'AI Summary' },
    exportReport: { zh: '📄 导出报告', en: '📄 Export Report' },
    reassess: { zh: '🔄 重新评估', en: '🔄 Re-assess' },
    backToList: { zh: '← 返回列表', en: '← Back to List' }
  },
  recentReports: {
    title: { zh: '最近评估报告', en: 'Recent Assessment Reports' },
    project: { zh: '项目名', en: 'Project' },
    sieve: { zh: '筛子', en: 'Sieve' },
    score: { zh: '综合评分', en: 'Score' },
    result: { zh: '结果', en: 'Result' },
    date: { zh: '日期', en: 'Date' },
    viewDetail: { zh: '查看详情', en: 'View Details' }
  },
  runPanel: {
    title: { zh: '运行筛子', en: 'Run Sieve' },
    selectProjects: { zh: '选择要评估的项目', en: 'Select projects to assess' },
    selectAll: { zh: '全选', en: 'Select All' },
    runAssess: { zh: '开始评估', en: 'Start Assessment' },
    cancel: { zh: '取消', en: 'Cancel' },
    running: { zh: '评估中...', en: 'Assessing...' },
    completed: { zh: '评估完成', en: 'Assessment Complete' }
  },
  dimension: {
    industry: { zh: '行业', en: 'Industry' },
    monthlyRevenue: { zh: '月收入', en: 'Monthly Revenue' },
    monthlyGrowth: { zh: '月增长率', en: 'Monthly Growth' },
    financingAmount: { zh: '融资金额', en: 'Financing Amount' },
    teamSize: { zh: '团队规模', en: 'Team Size' },
    profitability: { zh: '盈利能力', en: 'Profitability' },
    yearsInBusiness: { zh: '经营年限', en: 'Years in Business' },
    businessLicense: { zh: '有营业执照', en: 'Business License' }
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
assess-connect/
├── src/
│   ├── index.tsx          # Hono应用入口 + API路由 + 3个页面HTML
│   └── renderer.tsx       # JSX渲染器 (HTML壳 + head + Tailwind配置)
├── public/
│   └── static/
│       └── style.css      # 自定义CSS (Design Token变量 + 维度卡片 + 滑块 + 雷达图 + Toggle样式)
├── ecosystem.config.cjs   # PM2配置
├── wrangler.jsonc         # Cloudflare配置
├── .dev.vars              # 本地开发环境变量（OPENAI_API_KEY=xxx）
├── vite.config.ts         # Vite构建配置
├── tsconfig.json
└── package.json
```

### wrangler.jsonc 配置模板

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "assess-connect",
  "compatibility_date": "2024-01-01",
  "pages_build_output_dir": "./dist",
  "compatibility_flags": ["nodejs_compat"]
}
```

### .dev.vars 本地环境变量

```
OPENAI_API_KEY=sk-xxx
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
      name: 'assess-connect',
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
2. **CSS Design Tokens** — `public/static/style.css`（阴影、动效、渐变、维度卡片、滑块、雷达图、Toggle、评分进度条样式）
3. **评分计算引擎** — 纯 JS 函数实现维度评分逻辑:
   - select 维度: 项目值在 selected 中 → 100分，否则 → 0分
   - range 维度: 线性映射 + 阈值判断
   - boolean 维度: 匹配 requiredValue → 100分，否则 → 0分
   - 加权汇总: overallScore = Σ(dimensionScore × weight) / Σ(enabledWeights)
4. **API 路由** — 10 个接口：
   - 筛子管理: sieves (GET/POST), sieves/:id (GET/PUT/DELETE)
   - 评估运行: assess/run (POST)
   - 评估报告: assess/reports (GET), assess/report/:id (GET)
   - 通间 API: assess/sieve (POST)
   - AI 建议: assess/ai-suggest (POST，可选)
5. **筛子管理页** — `GET /` 渲染筛子列表 + Hero + 最近报告 + inline JS
6. **筛子编辑器** — `GET /sieve/:id` 渲染维度配置 + 权重预览 + inline JS 处理 Toggle/滑块/多选
7. **评估报告页** — `GET /report/:id` 渲染评分圆环 + 雷达图(SVG) + 维度明细 + 财务建模 + AI 评语
8. **雷达图 JS** — 纯 SVG 生成：多边形顶点计算 + 填充 + 标签定位
9. **Navbar + Footer** — 独立应用简化版，所有页面复用
10. **i18n** — TEXT 对象 + `?lang=en` 切换
11. **滚动动画** — IntersectionObserver + reveal 类

### 步骤 4: 路由结构

```typescript
// 页面路由
app.get('/', (c) => { /* 筛子管理页 */ })
app.get('/sieve/:id', (c) => { /* 筛子编辑器 */ })
app.get('/report/:id', (c) => { /* 评估报告页 */ })

// API 路由 - 筛子管理
app.get('/api/sieves', (c) => { /* 筛子列表 */ })
app.post('/api/sieves', (c) => { /* 新建筛子 */ })
app.get('/api/sieves/:id', (c) => { /* 筛子详情 */ })
app.put('/api/sieves/:id', (c) => { /* 更新筛子 */ })
app.delete('/api/sieves/:id', (c) => { /* 删除筛子 */ })

// API 路由 - 评估运行
app.post('/api/assess/run', (c) => { /* 运行筛子评估 */ })

// API 路由 - 评估报告
app.get('/api/assess/reports', (c) => { /* 报告列表 */ })
app.get('/api/assess/report/:id', (c) => { /* 报告详情 */ })

// API 路由 - 通间 API
app.post('/api/assess/sieve', (c) => { /* 供参与通调用 */ })

// API 路由 - AI（可选）
app.post('/api/assess/ai-suggest', (c) => { /* AI 推荐筛子配置 */ })
```

### 步骤 5: AI 集成

```typescript
// wrangler.jsonc 或 .dev.vars 配置
// OPENAI_API_KEY=sk-xxx

// 在 API 路由中使用
app.post('/api/assess/run', async (c) => {
  const apiKey = c.env.OPENAI_API_KEY
  const { sieveId, projectIds } = await c.req.json()
  
  // 1. 获取筛子配置和项目数据
  // 2. 逐维度评分（纯计算逻辑，不依赖 AI）
  
  if (!apiKey) {
    // 无 API Key → 使用纯计算评分 + 模板化评语
    return c.json({ success: true, reports: calculatedReports })
  }
  
  // 有 API Key → 调用 GPT-4o 生成更丰富的评语
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: '你是专业的投资尽调分析师。请根据项目数据和筛子配置，对每个维度评分并撰写评语...' },
        { role: 'user', content: JSON.stringify({ sieve, projects }) }
      ],
      response_format: { type: 'json_object' }
    })
  })
  
  const result = await response.json()
  // 解析并返回
})
```

### 步骤 6: 构建和部署

```bash
npm run build
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### 步骤 7: 回主站配置跳转

在主站 `data.ts` 中为评估通添加 `externalUrl` 字段，指向独立应用的部署 URL。

---

## 设计原则（必须遵守）

1. **Apple 风格** — 大量留白、文字层次分明、动效克制优雅
2. **品牌色 #5DC4B3 用于全局** — 导航栏、返回按钮、品牌相关元素
3. **评估通专属色 #6366F1 仅用于 4 种场景** — CTA 按钮、功能标题/图标、维度配置区浅色底纹(#E0E7FF)、进度条/标签/徽章。**所有 Design Token（边框、阴影、渐变）保持品牌色 #5DC4B3 不变**
4. **禁止纯黑 #000000** — 最深颜色为 #1d1d1f
5. **所有交互元素有 hover/active 状态** — 使用 transition 280ms cubic-bezier
6. **响应式** — mobile / tablet / desktop 全适配
7. **毛玻璃** — 导航栏使用 backdrop-filter: blur(24px)
8. **Aurora 深色** — 页脚统一使用深色 Aurora 渐变背景
9. **双语全覆盖** — 所有 UI 文本必须有中英文版本

---

## 注意事项

1. **评估通是投资者路径的第一个筛子** — 投资者从身份通解锁"参与身份"后可以使用
2. **筛子由投资者自行编写和配置** — 平台仅提供 pre-set 维度作为参考，不预定维度
3. **一个项目可被多个不同筛子分别筛选** — 不同投资者的筛子互不影响
4. **核心评分是纯前端计算** — 不依赖 AI，AI 仅用于增强评语质量
5. **Demo 用 Mock 项目数据模拟** — 不从发起通真实获取项目
6. **雷达图用 SVG 实现** — 不引入 Chart.js，保持轻量
7. **"导出报告"是模拟的** — 仅调用 `window.print()`
8. **数据存储使用 localStorage** — 筛子配置和报告保存在客户端
9. **与其他"通"不通信** — Demo 阶段各通独立运行
10. **"无筛子"默认策略** — 没有配置筛子时，参与通展示全量项目（此逻辑在参与通实现）

---

## 与评估通 + 风控通的合体说明

评估通和风控通是投资者用 AI 搭建的个性化"筛子"的**两个阶段**：
- **评估通** = 分析材料内容（当真的分析）+ 打分
- **风控通** = 验证材料真实性（验真）+ 合规审查

示例：客户上传的股权架构图和营业执照——
- 评估通分析时**当作真实材料评估**（分析内容、打分）
- 风控通则通过企查查 API **验证材料真实性**（股权架构是否与工商登记一致）

---

## 与其他"通"的关系（未来规划）

| 上游/下游 | 通 | 交互方式 |
|----------|-----|---------|
| **上游** | 身份通 (Identity Connect) | 投资者从身份通解锁"参与身份"后可使用评估通 |
| **上游** | 发起通 (Originate Connect) | 融资者在发起通提交的项目，经评估通筛选 |
| **下游** | 风控通 (Risk Connect) | 评估通过后触发风控通进行材料验真 |
| **下游** | 参与通 (Deal Connect) | 评估+风控通过后，项目显示在参与通看板 |
| **事件** | `assessment.completed` | 评估完成后触发此事件，通知风控通和参与通 |

---

*此 Prompt 可直接交给 Genspark 全栈模式生成代码，无需额外补充信息。*
