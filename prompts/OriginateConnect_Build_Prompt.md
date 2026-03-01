# ═══════════════════════════════════════════════════════════════
# 发起通 (Originate Connect) — 独立全栈应用搭建 Prompt
# 版本: V3.0 | 日期: 2026-03-01
# 来源: MicroConnect Product Bible V3.0 自动组装
# ═══════════════════════════════════════════════════════════════

## 你要做什么

从零搭建一个**独立的发起通 (Originate Connect) 全栈 Web 应用**。

这个应用是 Micro Connect 滴灌通平台"9个通"中的**第2个产品**——融资者的**"项目发起台"**。融资者在这里上传各种经营材料（PPT、财报、营业执照等），AI 帮你整理成三件套（原始底稿归档、结构化材料包、精美 Pitch Deck），整理好后可导出 PDF 自用或发布到投资者筛选池。

**不需要 clone 任何主站代码**。这是一个全新的独立项目。
但是设计风格、颜色、字体、交互必须跟主站保持一致（下面会给你完整的设计系统）。

> 📚 **图书馆比喻**: 发起通 = **作者交稿上架**。作者把手稿丢给图书馆，AI 编辑帮你整理成三件套——原稿归档、内容摘要、精美封面，整理好后上架到书架上供读者挑选。

---

## 产品档案

| 字段 | 值 |
|------|-----|
| **ID** | `application` |
| **flowOrder** | 2 |
| **角色** | borrower (融资者专属) |
| **阶段** | borrower-upload |
| **状态** | `beta` Beta测试中 |
| **浅色** | `#FEF3C7` |
| **深色** | `#F59E0B` |
| **分类** | 融资者路径 / Borrower Path |
| **图标** | `fa-upload` |
| **Logo URL** | https://www.genspark.ai/api/files/s/sGTxJUcV |
| **核心功能** | 材料整理、数据上传、AI生成三层输出（底稿+材料包+Pitch Deck）、分享链接、信息标准化 |
| **一句话** | 发起融资 · 丢材料 · AI 打包成书 · 分享给潜在参与方 |

---

## 技术栈

- **框架**: Hono + TypeScript + JSX（SSR 服务端渲染）
- **部署**: Cloudflare Pages（通过 wrangler）
- **样式**: Tailwind CSS (CDN) + 内联 CSS Design Token
- **图标**: FontAwesome 6.4 (CDN)
- **字体**: Inter + Montserrat + Noto Sans SC (Google Fonts)
- **交互**: 纯原生 JS（inline script），不用 React/Vue
- **i18n**: 通过 `?lang=en` URL 参数切换中英文，默认中文
- **AI**: Demo 阶段统一使用 GPT-4o（通过 `c.env.OPENAI_API_KEY`），用于材料结构化处理和 Pitch Deck 生成
- **数据存储**: localStorage (客户端) 保存项目数据（Demo 不需要数据库）

请用 `npm create hono@latest` 的 `cloudflare-pages` 模板创建项目：
```bash
npm create hono@latest . -- --template cloudflare-pages --install --pm npm
```

---

## 业务逻辑与核心机制

### 发起通在 Y 型业务流程中的位置

```
                    ┌─── 融资者路径 ──→ 【发起通(上传数据)】
  身份通(统一入口) ──┤                         ↓ 数据穿越管道
                    └─── 投资者路径 ──→ 评估通 → 风控通 → 参与通(看板)
                                                                ↓
                              Y型汇合点：条款通 → 合约通 → 结算通 → 履约通
```

发起通是 Y 型流程中**融资者路径的唯一入口**。融资者从身份通解锁"发起身份"后进入发起通，上传材料、AI 处理、生成三层输出，然后可以选择发布到投资者筛选池（串联模式）或导出自用（独立模式）。

### 核心机制

**第一大类：多种材料采集**
- **文件上传**: 支持 PDF / Word / Excel / PPT / 图片，拖拽上传或点击上传
- **核心原则**: **客户不需要筛选，什么都往里丢**——用户无需分类整理，所有材料一股脑上传
- ⚠️ **Demo 阶段简化**: OCR 扫描和语音输入暂不实现，仅做文件上传功能

**第二大类：AI 结构化处理**
- 所有上传文件的文本内容提取后，送入 GPT-4o 进行结构化分析
- 自动提取关键信息：
  - 基础信息：公司名称、成立时间、法人代表、注册资本、地址、员工数
  - 融资需求：融资金额（万元）、预期分成比例（%）、用途、紧急程度
  - 财务数据：月收入（万元）、月增长率（%）、成本结构、利润率
  - 行业信息：所属行业、市场规模、竞争格局、竞争壁垒
  - 团队信息：创始人背景、团队规模、核心成员

**第三大类：AI 生成三层输出（核心功能）**
1. **原始底稿 (Raw Materials)**: 客户上传的所有原始文件，按类别归档索引——相当于图书馆的"原稿存档室"
2. **结构化材料包 (Structured Package)**: AI 按模板规范打包——公司概况、财务摘要、经营数据、团队信息、融资需求，输出标准化 JSON + 格式化文档——相当于图书馆的"内容摘要卡"
3. **精美 Pitch Deck (Presentation)**: 5-10 页可视化 BP，包含公司介绍、产品/服务、财务亮点、团队背景、融资需求——相当于图书馆的"精装封面"。Demo 阶段用 HTML 页面模拟 Pitch Deck（不生成真 PDF）

**第四大类：分享与发布**
- **分享链接**: 生成可外发的链接，融资者发给潜在投资人
- **一键发布**: 确认后发布到投资者筛选池（串联模式的出口）

### 双模式设计

**串联模式**: 
- 发布后自动推送到参与通全量项目池
- 触发评估通筛子进行自动分析
- 触发 `application.completed` 事件
- 底部操作栏显示"发布到投资者筛选池"按钮

**独立模式**: 
- 融资者仅使用发起通生成材料包和 Pitch Deck
- 可导出 PDF 自用（路演、BP 大赛、FA 对接等）
- 不发布到平台，不进入后续流程
- 底部操作栏显示"导出 PDF"按钮

**⚠️ Demo 阶段简化**: 
- "发布到投资者筛选池"按钮点击后显示 Toast 提示"已发布到筛选池（Demo 演示）"，不做真实推送
- "导出 PDF"按钮点击后打开 Pitch Deck 的 HTML 预览页面，用户可通过浏览器打印为 PDF

### 关键输出

- 原始底稿归档 (Raw Materials Archive)
- 标准化材料包 (Structured Package, JSON + 格式化文档)
- 精美 Pitch Deck (HTML 页面模拟，5-10 页)
- 分享链接（可发给潜在参与方）
- 申请完成事件 (`application.completed`)

---

## Mock 数据

### TypeScript 类型定义

```typescript
interface OriginateProject {
  id: string                          // 项目ID
  userId: string                      // 发起人ID
  companyName: string                 // 公司名称
  industry: Industry                  // 行业
  status: 'draft' | 'processing' | 'ready' | 'published'  // 状态
  rawMaterials: UploadedFile[]        // 原始上传文件
  structuredPackage?: StructuredPackage  // AI 整理后的材料包
  pitchDeck?: PitchDeck               // AI 生成的 Pitch Deck
  shareLink?: string                  // 分享链接
  createdAt: string
  updatedAt: string
}

type Industry = 'concert' | 'catering' | 'retail' | 'healthcare' | 'education' | 'saas' | 'ecommerce' | 'service'

interface UploadedFile {
  id: string
  name: string
  type: 'pdf' | 'word' | 'excel' | 'ppt' | 'image' | 'other'
  size: number                        // bytes
  url: string
  uploadedAt: string
}

interface StructuredPackage {
  companyOverview: {
    name: string                      // 公司名称
    legalPerson: string               // 法人代表
    foundedDate: string               // 成立日期
    registeredCapital: string         // 注册资本
    address: string                   // 办公地址
    employees: number                 // 员工人数
  }
  financials: {
    monthlyRevenue: number            // 月收入（万元）
    monthlyGrowthRate: number         // 月增长率（%）
    costStructure: string             // 成本结构描述
    profitMargin: number              // 利润率（%）
  }
  financingNeed: {
    amount: number                    // 融资金额（万元）
    expectedShareRatio: number        // 预期分成比例（%）
    purpose: string                   // 融资用途
    urgency: 'high' | 'medium' | 'low'  // 紧急程度
  }
  industryInfo: {
    category: Industry                // 行业类别
    marketSize: string                // 市场规模描述
    competitors: string               // 竞争格局
    moat: string                      // 竞争壁垒
  }
  teamInfo: {
    founderBackground: string         // 创始人背景
    teamSize: number                  // 团队规模
    keyMembers: string[]              // 核心成员列表
  }
}

interface PitchDeck {
  pages: number                       // 页数（5-10）
  htmlContent: string                 // HTML 内容（Demo 用 HTML 模拟）
  generatedAt: string                 // 生成时间
  templateUsed: string                // 使用的行业模板名
}
```

### 示例数据（3 条，覆盖典型项目状态）

```typescript
const mockProjects: OriginateProject[] = [
  // 项目1: 餐饮行业，已完成 AI 处理，状态 ready
  {
    id: 'proj-001',
    userId: 'u-001',
    companyName: '星火餐饮连锁',
    industry: 'catering',
    status: 'ready',
    rawMaterials: [
      { id: 'f-1', name: '商业计划书.pptx', type: 'ppt', size: 5242880, url: '/mock/bp.pptx', uploadedAt: '2026-02-10' },
      { id: 'f-2', name: '2025年财务报表.xlsx', type: 'excel', size: 1048576, url: '/mock/fin.xlsx', uploadedAt: '2026-02-10' },
      { id: 'f-3', name: '营业执照.pdf', type: 'pdf', size: 524288, url: '/mock/license.pdf', uploadedAt: '2026-02-10' }
    ],
    structuredPackage: {
      companyOverview: {
        name: '星火餐饮连锁',
        legalPerson: '张三',
        foundedDate: '2020-06-15',
        registeredCapital: '500万',
        address: '深圳市南山区科技园路88号',
        employees: 120
      },
      financials: {
        monthlyRevenue: 85,
        monthlyGrowthRate: 12,
        costStructure: '食材40%、人工25%、租金20%、其他15%',
        profitMargin: 18
      },
      financingNeed: {
        amount: 500,
        expectedShareRatio: 15,
        purpose: '开设新店 + 供应链升级',
        urgency: 'medium'
      },
      industryInfo: {
        category: 'catering',
        marketSize: '4.7万亿',
        competitors: '海底捞、西贝等',
        moat: '独家供应链+标准化出品'
      },
      teamInfo: {
        founderBackground: '10年餐饮连锁管理经验，曾任某知名连锁品牌区域总经理',
        teamSize: 120,
        keyMembers: ['张三-创始人/CEO', '李四-CFO', '王五-COO']
      }
    },
    pitchDeck: {
      pages: 8,
      htmlContent: '', // 由 AI 动态生成
      generatedAt: '2026-02-11',
      templateUsed: '餐饮行业模板'
    },
    shareLink: 'https://mc.link/p/proj-001',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-11'
  },

  // 项目2: 演出行业，AI 处理中，状态 processing
  {
    id: 'proj-002',
    userId: 'u-003',
    companyName: '悦声文化传媒',
    industry: 'concert',
    status: 'processing',
    rawMaterials: [
      { id: 'f-4', name: '演出计划.pdf', type: 'pdf', size: 3145728, url: '/mock/plan.pdf', uploadedAt: '2026-02-20' }
    ],
    createdAt: '2026-02-20',
    updatedAt: '2026-02-20'
  },

  // 项目3: 教育行业，已发布到筛选池，状态 published
  {
    id: 'proj-003',
    userId: 'u-001',
    companyName: '优学教育科技',
    industry: 'education',
    status: 'published',
    rawMaterials: [
      { id: 'f-5', name: 'BP.pptx', type: 'ppt', size: 4194304, url: '/mock/edu-bp.pptx', uploadedAt: '2026-01-25' },
      { id: 'f-6', name: '财务预测.xlsx', type: 'excel', size: 819200, url: '/mock/edu-fin.xlsx', uploadedAt: '2026-01-25' }
    ],
    structuredPackage: {
      companyOverview: {
        name: '优学教育科技',
        legalPerson: '王五',
        foundedDate: '2021-03-01',
        registeredCapital: '200万',
        address: '北京市海淀区中关村大街1号',
        employees: 45
      },
      financials: {
        monthlyRevenue: 38,
        monthlyGrowthRate: 22,
        costStructure: '师资50%、场地20%、营销15%、其他15%',
        profitMargin: 15
      },
      financingNeed: {
        amount: 200,
        expectedShareRatio: 12,
        purpose: '扩大在线课程产能',
        urgency: 'high'
      },
      industryInfo: {
        category: 'education',
        marketSize: '3.2万亿',
        competitors: '新东方、好未来',
        moat: 'AI个性化教学+线上线下融合'
      },
      teamInfo: {
        founderBackground: '前新东方区域总监，15年教育行业经验',
        teamSize: 45,
        keyMembers: ['王五-创始人', '赵六-CTO']
      }
    },
    pitchDeck: {
      pages: 6,
      htmlContent: '',
      generatedAt: '2026-01-26',
      templateUsed: '教育行业模板'
    },
    shareLink: 'https://mc.link/p/proj-003',
    createdAt: '2026-01-25',
    updatedAt: '2026-01-26'
  }
]
```

### 行业选项映射

```typescript
const INDUSTRIES: Record<Industry, { zh: string; en: string; icon: string }> = {
  concert:    { zh: '演出', en: 'Concert/Events', icon: 'fa-music' },
  catering:   { zh: '餐饮', en: 'Catering', icon: 'fa-utensils' },
  retail:     { zh: '零售', en: 'Retail', icon: 'fa-store' },
  healthcare: { zh: '医美健康', en: 'Healthcare', icon: 'fa-heartbeat' },
  education:  { zh: '教育', en: 'Education', icon: 'fa-graduation-cap' },
  saas:       { zh: 'SaaS', en: 'SaaS', icon: 'fa-cloud' },
  ecommerce:  { zh: '电商', en: 'E-Commerce', icon: 'fa-shopping-cart' },
  service:    { zh: '服务业', en: 'Services', icon: 'fa-concierge-bell' }
}
```

### 项目状态映射

```typescript
const PROJECT_STATUS: Record<string, { zh: string; en: string; color: string; bgColor: string }> = {
  draft:      { zh: '草稿', en: 'Draft', color: '#6e6e73', bgColor: '#f5f5f7' },
  processing: { zh: 'AI 处理中', en: 'Processing', color: '#F59E0B', bgColor: '#FEF3C7' },
  ready:      { zh: '已就绪', en: 'Ready', color: '#34c759', bgColor: '#dcfce7' },
  published:  { zh: '已发布', en: 'Published', color: '#5DC4B3', bgColor: '#d1fae5' }
}
```

### Demo 简化说明

- **文件上传**: Demo 阶段不做真实文件存储，上传后记录文件名、类型、大小到 localStorage，模拟上传成功
- **AI 处理**: 调用 GPT-4o API（通过 `c.env.OPENAI_API_KEY`）。如果没有配置 API Key，则使用 Mock 数据直接返回预设的 StructuredPackage
- **Pitch Deck**: 用 HTML 页面模拟 Pitch Deck（不生成真 PDF），使用行业模板填充数据
- **分享链接**: 生成格式化的链接字符串，但不做真实短链接服务
- **项目数据**: 存储在 localStorage，页面刷新不丢失

---

## 页面布局

### 页面 1: 项目列表页（发起通主页 `/`）

```
┌──────────────────────────────────────────────────────────────┐
│  Navbar（简化版）                                              │
│  [Logo MICRO CONNECT 滴灌通] [发起通 Originate Connect] [中/EN] [返回主站] │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─ Hero 区 ────────────────────────────────────────────────┐ │
│  │  📤 发起通 Logo (来自 Logo URL)                            │ │
│  │  "发起融资"                                                │ │
│  │  "丢材料 · AI 打包成书 · 分享给潜在参与方"                   │ │
│  │  📚 作者交稿上架 — 把手稿丢给图书馆，AI 编辑帮你整理         │ │
│  │                                                           │ │
│  │  ┌──────────── + 新建项目 ────────────┐                    │ │
│  │  └──────────────────────────────────┘                    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 项目统计栏 ───────────────────────────────────────────┐   │
│  │  全部 (3)  |  草稿 (0)  |  处理中 (1)  |  已就绪 (1)  |  已发布 (1) │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 项目卡片网格 (3 列，响应式) ──────────────────────────────┐ │
│  │                                                           │ │
│  │  ┌── 项目卡片 1 ────────┐  ┌── 项目卡片 2 ────────┐       │ │
│  │  │ 🍜 星火餐饮连锁       │  │ 🎵 悦声文化传媒       │       │ │
│  │  │ [餐饮] [已就绪 ✓]    │  │ [演出] [AI处理中 ⏳]  │       │ │
│  │  │ 融资: ¥500万         │  │ 融资: 处理中...       │       │ │
│  │  │ 月收入: ¥85万        │  │ 材料: 1 个文件        │       │ │
│  │  │ 3 个文件             │  │                      │       │ │
│  │  │ 2026-02-11 更新      │  │ 2026-02-20 更新      │       │ │
│  │  │                      │  │                      │       │ │
│  │  │ [查看详情]            │  │ [继续处理]            │       │ │
│  │  └──────────────────────┘  └──────────────────────┘       │ │
│  │                                                           │ │
│  │  ┌── 项目卡片 3 ────────┐                                  │ │
│  │  │ 📚 优学教育科技       │                                  │ │
│  │  │ [教育] [已发布 🚀]    │                                  │ │
│  │  │ 融资: ¥200万         │                                  │ │
│  │  │ 月收入: ¥38万        │                                  │ │
│  │  │ 2 个文件             │                                  │ │
│  │  │ 2026-01-26 更新      │                                  │ │
│  │  │                      │                                  │ │
│  │  │ [查看详情]            │                                  │ │
│  │  └──────────────────────┘                                  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 空状态（无项目时显示）────────────────────────────────────┐ │
│  │  📦 插图区                                                │ │
│  │  "还没有任何项目"                                          │ │
│  │  "上传你的经营材料，AI 帮你整理成标准融资包"                  │ │
│  │  [开始你的第一个项目]                                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  Footer（简化版，Aurora 深色背景）                               │
└──────────────────────────────────────────────────────────────┘
```

**交互逻辑**:
- "新建项目"按钮 → 弹出模态框，填写公司名称 + 选择行业 → 创建后跳转到 `/project/:id`
- 项目统计栏：Tab 切换过滤，显示对应状态的项目
- 项目卡片：hover 浮起 + 阴影变化（品牌色 `rgba(93,196,179,0.1)`）
- 项目卡片点击 → 跳转到 `/project/:id`
- 状态不同，卡片 CTA 按钮不同：draft → "继续编辑"、processing → "查看进度"、ready → "查看详情"、published → "查看详情"

### 页面 2: 项目工作区（`/project/:id`，创建/编辑项目）

```
┌──────────────────────────────────────────────────────────────┐
│  Navbar                                                      │
├──────────────────────────────────────────────────────────────┤
│  面包屑: 发起通 > 星火餐饮连锁                                  │
│                                                              │
│  ┌─ 步骤指示器 (Step Indicator) ─────────────────────────────┐ │
│  │                                                           │ │
│  │  ① 上传材料         ② AI 处理中         ③ 查看成果         │ │
│  │  ●━━━━━━━━━━━━━━━━━━━○━━━━━━━━━━━━━━━━━━━○                │ │
│  │  (已完成)            (进行中)             (待完成)           │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ═══ Step 1: 上传材料 ═══════════════════════════════════════ │
│                                                              │
│  ┌─ 项目基本信息 ─────────────────────────────────────────────┐ │
│  │  公司名称: [星火餐饮连锁]    行业: [餐饮 ▼]                  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 拖拽上传区 ──────────────────────────────────────────────┐ │
│  │  ╔══════════════════════════════════════════════════════╗  │ │
│  │  ║                                                      ║  │ │
│  │  ║   📁  拖拽文件到此处，或点击上传                        ║  │ │
│  │  ║                                                      ║  │ │
│  │  ║   支持 PDF、Word、Excel、PPT、图片                     ║  │ │
│  │  ║   什么都往里丢，AI 帮你整理                             ║  │ │
│  │  ║                                                      ║  │ │
│  │  ╚══════════════════════════════════════════════════════╝  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 已上传文件列表 ──────────────────────────────────────────┐ │
│  │  📊 商业计划书.pptx    | PPT | 5.0 MB | 2026-02-10 | [🗑] │ │
│  │  📈 2025年财务报表.xlsx | XLS | 1.0 MB | 2026-02-10 | [🗑] │ │
│  │  📄 营业执照.pdf       | PDF | 512 KB | 2026-02-10 | [🗑] │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌───────────── 🤖 开始 AI 整理 ─────────────┐               │
│  └───────────────────────────────────────────┘               │
│                                                              │
│  ═══ Step 2: AI 处理中 ═════════════════════════════════════ │
│                                                              │
│  ┌─ 处理进度动画 ────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │  ✅ 提取基础信息        (已完成)                            │ │
│  │  ✅ 分析财务数据        (已完成)                            │ │
│  │  ⏳ 整理行业信息        (进行中...)                         │ │
│  │  ○ 生成 Pitch Deck     (等待中)                            │ │
│  │                                                           │ │
│  │  ┌─── 进度条 ──────────────── 65% ─────┐                  │ │
│  │  └────────────────────────────────────┘                  │ │
│  │  "AI 正在分析你的材料，请稍候..."                            │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ═══ Step 3: 查看成果 ═════════════════════════════════════ │
│                                                              │
│  ┌─ 三栏 Tab ────────────────────────────────────────────────┐ │
│  │  [Tab: 原始底稿]  [Tab: 材料包]  [Tab: Pitch Deck]         │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │                                                           │ │
│  │  Tab 1 — 原始底稿:                                        │ │
│  │  ┌─ PPT 类 ─────────────────────────────────────────────┐ │ │
│  │  │ 📊 商业计划书.pptx   5.0 MB   [下载]                   │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌─ Excel 类 ───────────────────────────────────────────┐ │ │
│  │  │ 📈 2025年财务报表.xlsx   1.0 MB   [下载]               │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌─ PDF 类 ─────────────────────────────────────────────┐ │ │
│  │  │ 📄 营业执照.pdf   512 KB   [下载]                      │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  Tab 2 — 材料包 (结构化信息):                               │ │
│  │  ┌─ 公司概况 ───────────────────────────────────────────┐ │ │
│  │  │ 公司: 星火餐饮连锁 | 法人: 张三 | 成立: 2020-06-15    │ │ │
│  │  │ 注册资本: 500万 | 员工: 120人 | 地址: 深圳南山区       │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌─ 财务概况 ───────────────────────────────────────────┐ │ │
│  │  │ 月收入: ¥85万 | 增长率: 12% | 利润率: 18%             │ │ │
│  │  │ 成本结构: 食材40% 人工25% 租金20% 其他15%              │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌─ 融资需求 ───────────────────────────────────────────┐ │ │
│  │  │ 金额: ¥500万 | 预期分成: 15% | 紧急度: 中等            │ │ │
│  │  │ 用途: 开设新店 + 供应链升级                             │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌─ 行业信息 ───────────────────────────────────────────┐ │ │
│  │  │ 行业: 餐饮 | 市场: 4.7万亿 | 壁垒: 独家供应链+标准化  │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌─ 团队信息 ───────────────────────────────────────────┐ │ │
│  │  │ 创始人: 10年餐饮连锁管理经验                            │ │ │
│  │  │ 团队: 120人 | 核心: 张三(CEO), 李四(CFO), 王五(COO)    │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  Tab 3 — Pitch Deck (预览):                               │ │
│  │  ┌─ 幻灯片缩略图 (水平滚动) ─────────────────────────────┐ │ │
│  │  │ [封面] [公司简介] [产品/服务] [财务亮点] [融资需求]       │ │ │
│  │  │ [团队背景] [市场分析] [竞争优势]                         │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │  ┌────── 全屏预览 ──────┐  ┌──── 生成分享链接 ────┐       │ │
│  │  └──────────────────────┘  └─────────────────────┘       │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 底部操作栏 ──────────────────────────────────────────────┐ │
│  │  [保存草稿]  [导出 PDF（独立模式）]  [🚀 发布到投资者筛选池] │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  Footer                                                      │
└──────────────────────────────────────────────────────────────┘
```

**交互逻辑**:
- 步骤指示器：根据项目 status 自动高亮对应步骤
  - `draft` → Step 1 高亮
  - `processing` → Step 2 高亮
  - `ready` / `published` → Step 3 高亮
- Step 1 上传区：
  - 拖拽文件到虚线区域 → 添加到文件列表
  - 点击虚线区域 → 打开文件选择器
  - 文件列表每行显示文件类型图标 + 文件名 + 大小 + 删除按钮
  - "开始 AI 整理"按钮 → 至少上传 1 个文件后才可点击（否则灰色不可用）
- Step 2 处理进度：
  - 4 个步骤依次从"等待中"变为"进行中"再变为"已完成"
  - 进度条从 0% 平滑增长到 100%
  - 完成后自动切换到 Step 3
  - **Demo 实现**: 如果有 API Key，真实调用 GPT-4o；如果没有，用 setTimeout 模拟进度，最终使用 Mock 数据填充
- Step 3 三栏 Tab：
  - Tab 切换展示不同内容
  - "全屏预览"按钮 → 打开 Pitch Deck 的全屏 HTML 预览页面
  - "生成分享链接"按钮 → 生成链接并显示在弹窗中，支持一键复制
- 底部操作栏：
  - "保存草稿" → 保存到 localStorage
  - "导出 PDF" → 打开 Pitch Deck 的 HTML 预览页面（用户可 Ctrl+P 打印）
  - "发布到投资者筛选池" → Toast 提示"已发布（Demo）"，项目状态变为 `published`

### 页面 3: Pitch Deck 全屏预览页（`/project/:id/deck`）

```
┌──────────────────────────────────────────────────────────────┐
│  ┌─ 顶部工具栏 ──────────────────────────────────────────────┐ │
│  │  [← 返回项目]  星火餐饮连锁 - Pitch Deck  [🔗 分享] [📄 打印] │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 幻灯片展示区（居中，卡片式，可翻页）────────────────────────┐ │
│  │                                                           │ │
│  │  ┌────────────────────────────────────────────────────┐   │ │
│  │  │                                                    │   │ │
│  │  │              [当前幻灯片内容]                        │   │ │
│  │  │                                                    │   │ │
│  │  │   第1页: 封面                                       │   │ │
│  │  │   - 公司名 + Logo 占位                              │   │ │
│  │  │   - 一句话简介                                      │   │ │
│  │  │   - 行业标签                                        │   │ │
│  │  │                                                    │   │ │
│  │  └────────────────────────────────────────────────────┘   │ │
│  │                                                           │ │
│  │         [← 上一页]    1 / 8    [下一页 →]                  │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌─ 底部缩略图导航 ─────────────────────────────────────────┐ │
│  │  [1] [2] [3] [4] [5] [6] [7] [8]                        │ │
│  └───────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**Pitch Deck 默认页面结构（8 页餐饮行业模板）**:
1. **封面** — 公司名称 + 行业 + 一句话定位 + Logo 占位
2. **公司简介** — 成立时间、注册资本、地址、员工数、发展历程
3. **产品与服务** — 核心业务描述、服务模式、客户群体
4. **财务亮点** — 月收入、增长率、利润率（可视化图表用简单 CSS 条形图实现）
5. **市场分析** — 市场规模、竞争格局、行业趋势
6. **竞争优势** — 核心壁垒、差异化优势
7. **团队背景** — 创始人简介、核心成员
8. **融资需求** — 融资金额、预期分成、资金用途、联系方式

**交互逻辑**:
- 左右键盘快捷键翻页
- 底部缩略图点击跳转
- "分享"按钮 → 复制分享链接
- "打印"按钮 → 调用 `window.print()`

---

## API 路由

### 项目管理

```
GET /api/projects
  描述: 获取当前用户的项目列表
  请求: 无（Demo 不做身份验证，返回所有 mock 项目）
  响应: { success: true, projects: OriginateProject[] }
  逻辑: 从 mock 数据返回项目列表

POST /api/projects
  描述: 新建项目
  请求: { companyName: string, industry: Industry }
  响应: { success: true, project: OriginateProject }
  逻辑: 创建新项目，status 为 'draft'，rawMaterials 为空数组

GET /api/projects/:id
  描述: 获取项目详情
  请求: URL 参数 id
  响应: { success: true, project: OriginateProject }
  逻辑: 从 mock 数据或 localStorage 查找项目

PUT /api/projects/:id
  描述: 更新项目（修改公司名、行业等）
  请求: { companyName?: string, industry?: Industry }
  响应: { success: true, project: OriginateProject }

DELETE /api/projects/:id
  描述: 删除项目
  请求: URL 参数 id
  响应: { success: true }
```

### 文件管理

```
POST /api/projects/:id/upload
  描述: 上传文件到项目
  请求: multipart/form-data (file 字段)
  响应: { success: true, file: UploadedFile }
  逻辑: Demo 阶段不做真实文件存储。接收文件元信息（name, type, size），生成唯一 ID，
        添加到项目的 rawMaterials 数组。返回文件信息。
        ⚠️ 注意: Cloudflare Workers 无 fs 模块，文件内容暂存在内存中用于 AI 处理

DELETE /api/projects/:id/files/:fileId
  描述: 删除已上传文件
  请求: URL 参数 id, fileId
  响应: { success: true }
  逻辑: 从项目的 rawMaterials 中移除指定文件
```

### AI 处理

```
POST /api/projects/:id/process
  描述: 触发 AI 结构化处理（核心 API）
  请求: URL 参数 id
  响应: { success: true, package: StructuredPackage, deck: PitchDeck }
  逻辑:
    1. 获取项目的所有上传文件信息
    2. 将文件名列表和任何可提取的文本内容拼接为 prompt
    3. 调用 GPT-4o（system prompt 要求按 StructuredPackage 的 JSON schema 输出）
    4. 解析 AI 返回的 JSON，填充到项目的 structuredPackage 字段
    5. 基于 structuredPackage 数据，使用行业模板生成 Pitch Deck 的 HTML 内容
    6. 更新项目 status 为 'ready'
    ⚠️ 如果没有配置 OPENAI_API_KEY，直接使用 Mock 数据填充

  AI 调用详情:
    - 模型: gpt-4o
    - System Prompt 示例:
      "你是一个专业的融资材料整理专家。请根据以下融资者上传的材料信息，
       按照给定的 JSON Schema 输出结构化的融资材料包。要求：
       1. 所有字段都必须填写
       2. 金额单位为万元
       3. 比例单位为百分比
       4. 分析要专业、简洁、有数据支撑
       JSON Schema: {StructuredPackage 的完整结构}"
    - User Prompt: 拼接用户上传的文件名列表 + 公司名 + 行业
```

### Pitch Deck 生成

```
GET /api/projects/:id/deck
  描述: 获取 Pitch Deck HTML 内容
  请求: URL 参数 id
  响应: { success: true, deck: PitchDeck }
  逻辑: 返回已生成的 Pitch Deck。如果尚未生成，返回 404

  Pitch Deck HTML 生成逻辑:
    - 使用行业模板（餐饮/教育/零售等不同模板样式）
    - 将 StructuredPackage 的数据填充到模板中
    - 每页是一个 div，使用幻灯片式布局
    - 样式使用发起通的专属色 #F59E0B 作为重点色
    - 品牌色 #5DC4B3 用于装饰线、背景纹理
```

### 材料包

```
GET /api/projects/:id/package
  描述: 获取结构化材料包
  请求: URL 参数 id
  响应: { success: true, package: StructuredPackage }
  逻辑: 返回项目的 structuredPackage。如果尚未生成，返回 404
```

### 发布与分享

```
POST /api/projects/:id/publish
  描述: 发布项目到投资者筛选池（串联模式出口）
  请求: URL 参数 id
  响应: { success: true, message: '已发布到筛选池' }
  逻辑: Demo 阶段仅更新项目 status 为 'published'，不做真实推送

POST /api/projects/:id/share
  描述: 生成分享链接
  请求: URL 参数 id
  响应: { success: true, shareLink: string }
  逻辑: 生成格式化链接 `https://mc.link/p/{projectId}`（Demo 不做真实短链接服务）
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

### 发起通专属色

```
浅色:   #FEF3C7  (功能卡片浅色底纹、功能区背景、步骤指示器浅色背景)
深色:   #F59E0B  (CTA按钮、功能标题/图标、进度条/标签/徽章、状态处理中色)
```

**⚠️ 关键规则 — 颜色使用铁律**:
- 品牌色 `#5DC4B3` 用于**全部全局元素**：导航栏链接、品牌 Logo、返回按钮、hover 边框、focus 边框、卡片 hover 阴影、渐变等
- 发起通专属色 `#F59E0B` **仅限以下 4 种场景**：
  1. CTA 按钮背景色（如"开始 AI 整理"、"发布到筛选池"）
  2. 功能区标题和图标色（如步骤指示器 active 状态、项目卡片的行业图标）
  3. 项目卡片/Hero 的浅色背景底纹（用 `#FEF3C7`）
  4. 进度条/标签/徽章等功能性色块（如"AI处理中"状态标签、上传进度条）
- **绝不用 `#F59E0B` 替换任何全局 Design Token**（边框、阴影、渐变等全部保持品牌色 `#5DC4B3`）

### 语义色

```
信息 (info):     #32ade6
成功 (success):  #34c759    (已就绪标记、文件上传成功)
警告 (warning):  #ff9f0a    (处理中提示)
错误 (error):    #ff375f    (上传失败、处理错误)
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
--shadow-card:       0 1px 1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.05);
--shadow-card-hover: 0 4px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(93,196,179,0.1);
--shadow-2xl:        0 12px 24px rgba(0,0,0,0.06), 0 40px 80px rgba(0,0,0,0.12);
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
        originate: { light:'#FEF3C7', DEFAULT:'#F59E0B', dark:'#D97706' },
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
  - 中间：**"发起通 Originate Connect"**（发起通专属色 #F59E0B）
  - 右侧：语言切换 (中/EN) + "返回主站"按钮（品牌色 #5DC4B3）

### 页脚 (Footer) — 独立应用简化版

- **Aurora 深色背景**: `radial-gradient(ellipse 130% 90% at 50% 20%, #0f3d36 0%, #0b312c 40%, #082420 70%, #061b18 100%)`
- **内容**: 品牌 Logo + "发起通 Originate Connect" + 版权 `© 2026 Micro Connect Group`
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

### 上传区样式

```css
.upload-zone {
  border: 2px dashed rgba(0,0,0,0.12);
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  transition: all 280ms cubic-bezier(0.22,1,0.36,1);
  cursor: pointer;
}
.upload-zone:hover {
  border-color: #5DC4B3;
  background: rgba(93,196,179,0.04);
}
.upload-zone.dragging {
  border-color: #F59E0B;
  background: rgba(245,158,11,0.06);
  transform: scale(1.01);
}
```

### 步骤指示器样式

```css
.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}
.step {
  display: flex;
  align-items: center;
  gap: 8px;
}
.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}
.step-circle.active {
  background: #F59E0B;        /* 发起通专属色 */
  color: white;
}
.step-circle.completed {
  background: #34c759;        /* 成功色 */
  color: white;
}
.step-circle.pending {
  background: #f5f5f7;        /* 页面背景色 */
  color: #86868b;             /* 三级文字 */
  border: 1px solid rgba(0,0,0,0.06);
}
.step-line {
  width: 80px;
  height: 2px;
  background: rgba(0,0,0,0.06);
}
.step-line.active {
  background: #F59E0B;        /* 发起通专属色 */
}
.step-line.completed {
  background: #34c759;        /* 成功色 */
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
ready (已就绪):       bg-green-100 text-green-700 border-green-200
processing (处理中):  背景 #FEF3C7 文字 #F59E0B 边框 rgba(245,158,11,0.2)  — 发起通专属色
published (已发布):   bg-brand/10 text-brand border-brand/20  — 品牌色
draft (草稿):         bg-gray-100 text-gray-500 border-gray-200
```

### 文件类型图标

```
pdf:    fa-file-pdf     text-red-500
word:   fa-file-word    text-blue-500
excel:  fa-file-excel   text-green-600
ppt:    fa-file-powerpoint  text-orange-500
image:  fa-file-image   text-purple-500
other:  fa-file         text-gray-400
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
    title: { zh: '发起通', en: 'Originate Connect' },
    subtitle: { zh: '发起融资 · AI 打包成书', en: 'Initiate Financing · AI-Powered Packaging' },
    backToMain: { zh: '返回主站', en: 'Back to Main' },
    langSwitch: { zh: 'EN', en: '中' }
  },
  hero: {
    title: { zh: '发起融资', en: 'Initiate Financing' },
    subtitle: { zh: '丢材料 · AI 打包成书 · 分享给潜在参与方', en: 'Upload materials · AI packages them · Share with potential investors' },
    libraryHint: { zh: '📚 作者交稿上架 — 把手稿丢给图书馆，AI 编辑帮你整理', en: '📚 Author submits manuscript — Let AI editors organize your materials' },
    newProject: { zh: '+ 新建项目', en: '+ New Project' }
  },
  stats: {
    all: { zh: '全部', en: 'All' },
    draft: { zh: '草稿', en: 'Draft' },
    processing: { zh: '处理中', en: 'Processing' },
    ready: { zh: '已就绪', en: 'Ready' },
    published: { zh: '已发布', en: 'Published' }
  },
  project: {
    financing: { zh: '融资', en: 'Financing' },
    monthlyRevenue: { zh: '月收入', en: 'Monthly Revenue' },
    files: { zh: '个文件', en: 'files' },
    updated: { zh: '更新', en: 'Updated' },
    viewDetail: { zh: '查看详情', en: 'View Details' },
    continueEdit: { zh: '继续编辑', en: 'Continue Editing' },
    checkProgress: { zh: '查看进度', en: 'Check Progress' }
  },
  empty: {
    title: { zh: '还没有任何项目', en: 'No projects yet' },
    subtitle: { zh: '上传你的经营材料，AI 帮你整理成标准融资包', en: 'Upload your business materials, let AI create a standard financing package' },
    cta: { zh: '开始你的第一个项目', en: 'Start Your First Project' }
  },
  workspace: {
    step1: { zh: '上传材料', en: 'Upload Materials' },
    step2: { zh: 'AI 处理中', en: 'AI Processing' },
    step3: { zh: '查看成果', en: 'View Results' },
    companyName: { zh: '公司名称', en: 'Company Name' },
    industry: { zh: '行业', en: 'Industry' },
    uploadTitle: { zh: '拖拽文件到此处，或点击上传', en: 'Drag files here, or click to upload' },
    uploadHint: { zh: '支持 PDF、Word、Excel、PPT、图片\n什么都往里丢，AI 帮你整理', en: 'Supports PDF, Word, Excel, PPT, Images\nJust upload everything, AI will organize it' },
    startProcess: { zh: '🤖 开始 AI 整理', en: '🤖 Start AI Processing' },
    needFiles: { zh: '请先上传至少 1 个文件', en: 'Please upload at least 1 file first' }
  },
  processing: {
    step1: { zh: '提取基础信息', en: 'Extracting basic info' },
    step2: { zh: '分析财务数据', en: 'Analyzing financials' },
    step3: { zh: '整理行业信息', en: 'Organizing industry data' },
    step4: { zh: '生成 Pitch Deck', en: 'Generating Pitch Deck' },
    hint: { zh: 'AI 正在分析你的材料，请稍候...', en: 'AI is analyzing your materials, please wait...' },
    completed: { zh: '已完成', en: 'Completed' },
    inProgress: { zh: '进行中...', en: 'In progress...' },
    waiting: { zh: '等待中', en: 'Waiting' }
  },
  results: {
    tab1: { zh: '原始底稿', en: 'Raw Materials' },
    tab2: { zh: '材料包', en: 'Structured Package' },
    tab3: { zh: 'Pitch Deck', en: 'Pitch Deck' },
    companyOverview: { zh: '公司概况', en: 'Company Overview' },
    financials: { zh: '财务概况', en: 'Financial Overview' },
    financingNeed: { zh: '融资需求', en: 'Financing Need' },
    industryInfo: { zh: '行业信息', en: 'Industry Info' },
    teamInfo: { zh: '团队信息', en: 'Team Info' },
    fullPreview: { zh: '全屏预览', en: 'Full Screen Preview' },
    generateLink: { zh: '生成分享链接', en: 'Generate Share Link' },
    download: { zh: '下载', en: 'Download' }
  },
  actions: {
    saveDraft: { zh: '保存草稿', en: 'Save Draft' },
    exportPdf: { zh: '导出 PDF', en: 'Export PDF' },
    publish: { zh: '🚀 发布到投资者筛选池', en: '🚀 Publish to Investor Pool' },
    publishedToast: { zh: '已发布到筛选池（Demo 演示）', en: 'Published to investor pool (Demo)' },
    savedToast: { zh: '草稿已保存', en: 'Draft saved' },
    linkCopied: { zh: '分享链接已复制', en: 'Share link copied' }
  },
  deck: {
    back: { zh: '← 返回项目', en: '← Back to Project' },
    share: { zh: '🔗 分享', en: '🔗 Share' },
    print: { zh: '📄 打印', en: '📄 Print' },
    prev: { zh: '← 上一页', en: '← Previous' },
    next: { zh: '下一页 →', en: 'Next →' },
    page: { zh: '页', en: 'Page' }
  },
  modal: {
    newProject: { zh: '新建项目', en: 'New Project' },
    companyNamePlaceholder: { zh: '请输入公司名称', en: 'Enter company name' },
    selectIndustry: { zh: '选择行业', en: 'Select industry' },
    create: { zh: '创建项目', en: 'Create Project' },
    cancel: { zh: '取消', en: 'Cancel' }
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
originate-connect/
├── src/
│   ├── index.tsx          # Hono应用入口 + API路由 + 3个页面HTML
│   └── renderer.tsx       # JSX渲染器 (HTML壳 + head + Tailwind配置)
├── public/
│   └── static/
│       └── style.css      # 自定义CSS (Design Token变量 + 上传区 + 步骤指示器 + 卡片样式)
├── ecosystem.config.cjs   # PM2配置
├── wrangler.jsonc         # Cloudflare配置（含 OPENAI_API_KEY binding）
├── .dev.vars              # 本地开发环境变量（OPENAI_API_KEY=xxx）
├── vite.config.ts         # Vite构建配置
├── tsconfig.json
└── package.json
```

### wrangler.jsonc 配置模板

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "originate-connect",
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
      name: 'originate-connect',
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
2. **CSS Design Tokens** — `public/static/style.css`（阴影、动效、渐变、上传区、步骤指示器、卡片样式）
3. **API 路由** — 13 个接口：
   - 项目管理: projects (GET/POST), projects/:id (GET/PUT/DELETE)
   - 文件管理: projects/:id/upload (POST), projects/:id/files/:fileId (DELETE)
   - AI 处理: projects/:id/process (POST)
   - 材料包: projects/:id/package (GET), projects/:id/deck (GET)
   - 发布分享: projects/:id/publish (POST), projects/:id/share (POST)
4. **项目列表页** — `GET /` 渲染项目列表 + Hero + 统计栏 + 卡片网格 + inline JS
5. **项目工作区** — `GET /project/:id` 渲染三步骤工作区 + inline JS 处理上传/处理/展示
6. **Pitch Deck 预览** — `GET /project/:id/deck` 渲染全屏幻灯片预览
7. **Navbar + Footer** — 独立应用简化版，所有页面复用
8. **i18n** — TEXT 对象 + `?lang=en` 切换
9. **滚动动画** — IntersectionObserver + reveal 类

### 步骤 4: 路由结构

```typescript
// 页面路由
app.get('/', (c) => { /* 项目列表页 */ })
app.get('/project/:id', (c) => { /* 项目工作区 */ })
app.get('/project/:id/deck', (c) => { /* Pitch Deck 全屏预览 */ })

// API 路由 - 项目管理
app.get('/api/projects', (c) => { /* 项目列表 */ })
app.post('/api/projects', (c) => { /* 新建项目 */ })
app.get('/api/projects/:id', (c) => { /* 项目详情 */ })
app.put('/api/projects/:id', (c) => { /* 更新项目 */ })
app.delete('/api/projects/:id', (c) => { /* 删除项目 */ })

// API 路由 - 文件管理
app.post('/api/projects/:id/upload', (c) => { /* 上传文件 */ })
app.delete('/api/projects/:id/files/:fileId', (c) => { /* 删除文件 */ })

// API 路由 - AI 处理
app.post('/api/projects/:id/process', (c) => { /* AI 结构化处理 */ })

// API 路由 - 材料包 & Pitch Deck
app.get('/api/projects/:id/package', (c) => { /* 获取材料包 */ })
app.get('/api/projects/:id/deck', (c) => { /* 获取 Pitch Deck */ })

// API 路由 - 发布 & 分享
app.post('/api/projects/:id/publish', (c) => { /* 发布到筛选池 */ })
app.post('/api/projects/:id/share', (c) => { /* 生成分享链接 */ })
```

### 步骤 5: AI 集成

```typescript
// wrangler.jsonc 或 .dev.vars 配置
// OPENAI_API_KEY=sk-xxx

// 在 API 路由中使用
app.post('/api/projects/:id/process', async (c) => {
  const apiKey = c.env.OPENAI_API_KEY
  
  if (!apiKey) {
    // 无 API Key → 使用 Mock 数据
    return c.json({ success: true, package: mockStructuredPackage, deck: mockPitchDeck })
  }
  
  // 有 API Key → 调用 GPT-4o
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: '你是专业的融资材料整理专家...' },
        { role: 'user', content: '以下是上传的材料信息...' }
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

在主站 `data.ts` 中为发起通添加 `externalUrl` 字段，指向独立应用的部署 URL。

---

## 设计原则（必须遵守）

1. **Apple 风格** — 大量留白、文字层次分明、动效克制优雅
2. **品牌色 #5DC4B3 用于全局** — 导航栏、返回按钮、品牌相关元素
3. **发起通专属色 #F59E0B 仅用于 4 种场景** — CTA 按钮、功能标题/图标、卡片浅色底纹(#FEF3C7)、进度条/标签/徽章。**所有 Design Token（边框、阴影、渐变）保持品牌色 #5DC4B3 不变**
4. **禁止纯黑 #000000** — 最深颜色为 #1d1d1f
5. **所有交互元素有 hover/active 状态** — 使用 transition 280ms cubic-bezier
6. **响应式** — mobile / tablet / desktop 全适配
7. **毛玻璃** — 导航栏使用 backdrop-filter: blur(24px)
8. **Aurora 深色** — 页脚统一使用深色 Aurora 渐变背景
9. **双语全覆盖** — 所有 UI 文本必须有中英文版本

---

## 注意事项

1. **发起通是融资者路径的唯一入口** — 融资者从身份通解锁"发起身份"后直接进入
2. **Demo 阶段不实现 OCR 和语音输入** — 仅做文件上传功能
3. **AI 处理有两种模式** — 有 API Key 时调用 GPT-4o，无 API Key 时使用 Mock 数据
4. **Pitch Deck 用 HTML 模拟** — 不生成真 PDF，用户可通过浏览器打印功能导出
5. **文件上传是模拟的** — Demo 阶段不做真实文件存储，仅记录文件元信息
6. **数据存储使用 localStorage** — 页面刷新不丢失，但不跨浏览器
7. **"发布到筛选池"是模拟的** — 仅改变项目状态，不做真实推送
8. **分享链接是格式化字符串** — 不做真实短链接服务
9. **与其他"通"不通信** — Demo 阶段各通独立运行

---

## 与其他"通"的关系（未来规划）

| 上游/下游 | 通 | 交互方式 |
|----------|-----|---------|
| **上游** | 身份通 (Identity Connect) | 用户从身份通解锁"发起身份"后进入发起通 |
| **下游** | 参与通 (Deal Connect) | 发布后项目进入参与通的全量项目池 |
| **下游** | 评估通 (Assess Connect) | 发布后触发投资者配置的筛子进行评估 |
| **下游** | 风控通 (Risk Connect) | 评估通过后风控通对材料进行验真 |

---

*此 Prompt 可直接交给 Genspark 全栈模式生成代码，无需额外补充信息。*
