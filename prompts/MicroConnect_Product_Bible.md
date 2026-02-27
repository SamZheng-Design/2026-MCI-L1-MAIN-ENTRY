# Micro Connect 滴灌通 — AI 可读产品手册 (Product Bible)

> **版本**: V2.2 | **日期**: 2026-02-27
> **来源**: 整合自 L1 主站代码库 (V20)、MC-Revolution 合约通代码库、白皮书 V1.2、产品负责人确认
> **用途**: 每次在 Genspark 全栈模式开发新的"xx通"独立应用时，先把本手册丢给 AI 学习。AI 读完后即可理解整个产品体系、设计系统、技术规范，然后精准地开发单个模块。
> **原则**: 本文档所有内容均来自现有代码库或白皮书，无任何幻想成分。

---

## 第一章：公司与产品概述

### 1.1 公司信息

- **公司全称**: Micro Connect Group
- **中文名**: 滴灌通
- **办公地址**: 香港中环康乐广场8号，交易广场2期 2105-2108室
- **联系邮箱**: info@microconnect.com
- **联系电话**: +852 2668 0268
- **工作时间**: 周一至周五 9:00 - 18:00 (HKT / GMT+8)
- **社交媒体**: LinkedIn / Twitter / WeChat / GitHub
- **廉洁举报**: fraudreport@microconnect.com

### 1.2 什么是 RBF（Revenue-Based Financing）

RBF（收入分成融资）是一种创新的融资模式——融资方无需稀释股权，而是按月度收入的固定比例分成给投资方，直至达到约定的回收上限（通常为融资金额的 1.5-3 倍）。

**RBF 特别适合**:
- 有稳定月度收入的企业（SaaS、电商、餐饮、零售、服务业、演出等）
- 不希望稀释股权的创始人
- 需要快速融资（7-14 天内到账）的企业

### 1.3 滴灌通的使命

通过 AI 超级 Agent 技术，将 RBF 融资流程从传统的"人工驱动"转变为"AI 驱动"，实现：
- 融资申请从 **30 天缩短到 7 天**
- 评估成本从 **10 万元降低到 1000 元**
- 投资决策从"拍脑袋"到"数据驱动"

### 1.4 一句话定义

> 全球首个收入分成投资(RBF)的统一操作系统。通过 9 个 AI 超级 Agent 矩阵 + 3 层基础底座（"9+3"架构），为投资者和中小企业提供高效、透明、全生命周期的投融资解决方案。

### 1.5 核心理念

1. **不按赛道造轮子，按流程环节抽象为通用 Agent** — 传统 RBF 平台按行业（餐饮、零售、医美等）分别建系统，导致重复开发和数据孤岛。滴灌通按投资流程的关键环节抽象出 9 个通用 Agent（"通"），每个 Agent 专注一个核心能力，通过灵活组合覆盖所有赛道。
2. **提纲挈领、以不变应万变** — 9 个 Agent + 统一底座，覆盖 RBF 投资全流程，同时保留针对不同赛道和不同投资者偏好的定制能力。
3. **每个"通"可独立部署、灵活组合** — 各 Agent 是独立微服务，可按需组合。已独立搭建的"通"通过 `externalUrl` 从主站跳转。
4. **AI 原生** — 所有核心功能都由 AI 驱动（生成、评估、风控、协商），而非传统规则引擎。

### 1.6 品牌标语 (Slogan)

- **中文**: 收入分成投资的基础设施级平台
- **英文**: Infrastructure-Grade RBF Investment Platform
- **闪屏**: One Pipeline · Nine Agents · Infinite Possibilities · 看见世界的机会

---

## 第二章：Y 型业务流程（核心创新）

### 2.1 Y 型架构总图

```
                    ┌─── 融资者路径 ──→ 发起通(上传数据)
  身份通(统一入口) ──┤                         ↓ 数据穿越管道
                    └─── 投资者路径 ──→ 评估通 → 风控通 → 参与通(看板)
                                                                ↓
                              Y型汇合点：条款通 → 合约通 → 结算通 → 履约通
```

### 2.2 五个阶段

| 阶段 | 英文标识 | 包含的"通" | 角色 |
|------|---------|-----------|------|
| 1. 统一入口 | entry | 身份通 | 共用 (shared) |
| 2. 融资者路径 | borrower-upload | 发起通 | 融资者专属 (borrower) |
| 3. 投资者路径 | investor-filter + investor-view | 评估通 + 风控通 + 参与通 | 投资者专属 (investor) |
| 4. 交易达成 | deal | 条款通 + 合约通 | 投融资协同 (collaborative) |
| 5. 投后管理 | post-investment | 结算通 + 履约通 | 投融资协同 (collaborative) |

### 2.3 关键数据流

```
融资者在发起通上传经营数据
         ↓
数据进入统一数据池
         ↓
投资者搭建的评估通筛子 → 第一轮筛选（投资标准匹配）
         ↓ 通过
投资者搭建的风控通筛子 → 第二轮筛选（风控标准核验）
         ↓ 通过
参与通看板展示（该投资者看到的筛后项目）
         ↓ 投资者选中项目
条款通 → 合约通 → 结算通 → 履约通
```

### 2.4 事件驱动数据流

各"通"之间通过事件总线（Event Bus）解耦通信：

```
application.completed   → 触发评估通开始评估
assessment.completed    → 触发风控通开始风控
risk.passed             → 项目进入参与通看板
risk.rejected           → 通知融资者补充材料（触发补材循环）
opportunity.viewed      → 记录投资者浏览行为
opportunity.favorited   → 记录投资者收藏行为
terms.agreed            → 触发合约通生成合同
contract.signed         → 触发履约通开始监控
performance.data_uploaded → 触发结算通计算分成
settlement.completed    → 当期结算完成
user.login / user.logout → 身份通认证事件
```

> **Demo 阶段重要说明**: Demo 阶段各"通"独立运行，**不互相通信**。每个"通"作为独立应用部署在 Cloudflare Pages 上，Cloudflare Workers 环境无法运行 RabbitMQ 等消息队列。事件总线在 Phase 3（连接各"通"）阶段启用，届时迁移到生产技术栈。Demo 阶段如需跨"通"数据，各"通"内置简化版逻辑或使用 mock 数据。

### 2.5 "无筛子"默认策略

**这是平台最重要的设计规则之一：**

- 如果投资者没有配置任何评估/风控筛子 → 参与通展示**所有**融资项目（全量浏览模式）
- 如果投资者设置了筛子 → 参与通只展示通过全部筛选标准的项目
- 这确保了：融资者的项目一定会被看到（至少出现在没有设筛子的投资者看板里）；投资者可以精准高效地筛选
- 投资者可随时补建筛子，实时刷新筛选结果

### 2.6 补充材料循环

如果风控通在核验中发现问题 → 系统自动通知融资者通过发起通补充材料 → 材料更新后重新触发评估/风控筛选流程 → 形成闭环。**最多循环 3 次**，如仍不通过，项目自动关闭。

---

## 第三章：9 个"通"（Super Agent）完整档案

### 3.0 数据模型

每个"通"在代码中遵循以下 TypeScript 接口：

```typescript
interface Product {
  id: string;              // 唯一标识(路由ID)
  name: string;            // 中文产品名
  englishName: string;     // 英文全称 (如 "Identity Connect")
  englishShort: string;    // 英文简称 (如 "Identity")，用于Logo
  logo: string;            // 产品Logo图片URL
  description: string;     // 中文描述
  category: string;        // 中文分类名
  categoryEn: string;      // 英文分类名
  status: 'live' | 'beta' | 'coming';  // 产品状态
  features: string[];      // 核心功能标签列表
  color: string;           // 浅色背景色 (用于卡片/分组)
  colorDark: string;       // 深色主题色 (用于标题/图标/CTA)
  role: 'shared' | 'borrower' | 'investor' | 'collaborative';
  phase: 'entry' | 'borrower-upload' | 'investor-filter' | 'investor-view' | 'deal' | 'post-investment';
  flowOrder: number;       // 主流程排序(1-9)
  isCollaborative?: boolean;
  isFilter?: boolean;
  externalUrl?: string;    // 已独立搭建的应用跳转URL
}
```

---

### 3.1 身份通 (Identity Connect)

| 字段 | 值 |
|------|-----|
| **ID** | `identity` |
| **flowOrder** | 1 |
| **角色** | shared (共用) |
| **阶段** | entry (统一入口) |
| **状态** | `live` 已上线 |
| **颜色** | 浅色 `#DBEAFE`，深色 `#3B82F6` |
| **分类** | 统一入口 / Unified Entry |
| **核心功能** | 手机号/email注册、功能身份解锁（发起/参与/机构）、主体认证、协作空间、单点登录 |
| **一句话** | 以人为单位的万能工作台 · 解锁身份 · 路由中枢 |

**业务逻辑**:
- 身份通是以**"人"为单位**的万能工作台，是整个滴灌通基础设施中最底层的 ID
- 一开始只需要**手机号或 email** 即可注册，无需金融级 KYC
- 注册后进入个人主页，通过认证可以"解锁"不同的身份和功能
- 身份通不是简单的登录页，而是一个**以"人"为单位的路由中枢**，可以在整个平台中导航

**核心机制**:

**第一大类：功能身份（解锁平台功能）**
- **发起身份**: 认证后可使用发起通，上传经营数据、发起融资申请
- **参与身份**: 认证后可使用参与通，浏览投资项目、搭建评估筛子、参与投资
- **机构身份**: 更高级权限，是一个延展性接口。用于与未来机构使用方（如基金、银行、FA）的系统和规则对接，支持机构级批量操作和自定义工作流

**第二大类：主体认证（进入协作空间）**
- 用户可以认证自己是某个"公司/项目/主体"的一员
- 平台支持按照该"公司/主体"的规则对这个人进行验证
- 验证通过后，该用户可以进入该"公司/主体"的**协作空间**（如：某个投资项目的多方协作工作区）
- 示例：张三认证为"ABC 餐饮连锁"的法人 -> 进入 ABC 的协作空间 -> 可以管理该公司在平台上的所有融资项目

**技术实现**:
- **认证层级**: 互联网产品级（非金融级），手机号/email -> 实名认证（可选）-> 企业主体认证（可选）
- **JWT 令牌**: 有效期 24 小时，支持刷新，全平台通行（9 个"通"共享 Token）
- **权限模型**: 基于角色 (RBAC) + 基于主体的权限隔离，字段级权限（如：风控通过前投资者看不到融资者联系方式）、时间窗口权限（合同签署后双方才能互看联系方式）
- **单点登录 (SSO)**: 一次登录全平台通行，支持跨域认证（移动端、Web 端、API 调用）

**串联模式**: 所有其他"通"都依赖身份通的认证服务，是全平台的前置依赖。身份通根据用户已解锁的功能身份，自动分流到对应路径（Y 型分叉点）
**独立模式**: 可作为独立的企业/团队级身份认证和权限管理系统使用

**关键输出**:
- JWT 身份令牌 (Token)，包含用户已解锁的功能身份列表
- 用户权限清单 (Permission List)
- 已认证的主体列表及协作空间访问权限
- 登录/登出事件 (`user.login` / `user.logout`)

---

### 3.2 发起通 (Originate Connect)

| 字段 | 值 |
|------|-----|
| **ID** | `application` |
| **flowOrder** | 2 |
| **角色** | borrower (融资者专属) |
| **阶段** | borrower-upload |
| **状态** | `beta` Beta测试中 |
| **颜色** | 浅色 `#FEF3C7`，深色 `#F59E0B` |
| **分类** | 融资者路径 / Borrower Path |
| **核心功能** | 材料整理、数据上传、AI生成三层输出（底稿+材料包+Pitch Deck）、分享链接、信息标准化 |
| **一句话** | 发起融资 · 丢材料 · AI 打包成书 · 分享给潜在参与方 |

**业务逻辑**:
- 融资者的专属工具——融资者的"项目发起台"
- 核心价值：融资者丢各种形式的材料/数据（PPT 商业计划书、财务报表、Excel 测算等），**无需自己筛选整理**
- AI 根据模板，帮助融资者整理成一本"书"——标准化的融资材料包
- 整理后的材料包支持分享，帮助融资者提前认识潜在的参与方
- 标准化后的数据同时进入投资者的筛选池

**核心机制**:
- **多种采集方式**: OCR 扫描（营业执照、财务报表照片自动提取）、语音输入（口述转文字 + 结构化）、文件上传（PDF/Word/Excel/PPT）、标准化表单。**核心原则：客户不需要筛选，什么都往里丢**
- **AI 结构化处理**: 自动提取基础信息（公司名、成立时间、法人）、融资需求（金额、预期分成、用途）、财务数据（月收入、增长率、成本结构）、行业信息（类别、市场规模、竞争格局）
- **AI 生成三层输出（核心功能）**:
  1. **原始底稿 (Raw Materials)**: 客户上传的所有原始文件，按类别归档索引
  2. **整理后的材料包 (Structured Package)**: AI 按模板规范打包——公司概况、财务摘要、经营数据、团队信息、融资需求，输出标准化 JSON + 格式化文档
  3. **精美 Pitch Deck (Presentation)**: 5-10 页可视化 BP (PDF)，包含公司介绍、产品/服务、财务亮点、团队背景、融资需求，支持行业定制模板
- **分享功能**: Pitch Deck 支持生成分享链接，融资者可发给潜在参与方（投资者），提前建立联系
- **一键发布**: 融资者确认后发布到投资者筛选池

**串联模式**: 发布后自动推送到参与通全量项目池，触发评估通筛子
**独立模式**: 融资者仅使用发起通生成材料包和 Pitch Deck，不发布到平台（可导出 PDF 自用，如路演、BP 大赛、FA 对接等）

**关键输出**:
- 原始底稿归档 (Raw Materials Archive)
- 标准化材料包 (Structured Package, JSON + 格式化文档)
- 精美 Pitch Deck (PDF 格式，5-10 页)
- 分享链接（可发给潜在参与方）
- 申请完成事件 (`application.completed`)

---

### 3.3 评估通 (Assess Connect)

| 字段 | 值 |
|------|-----|
| **ID** | `assess` |
| **flowOrder** | 3 |
| **角色** | investor (投资者专属) |
| **阶段** | investor-filter |
| **状态** | `beta` Beta测试中 |
| **颜色** | 浅色 `#E0E7FF`，深色 `#6366F1` |
| **分类** | 投资者路径 / Investor Path |
| **核心功能** | 多Agent筛子工作流编排、pre-set维度可编辑、自定义投资标准、AI量化评估、尽调报告生成、批量筛选 |
| **特殊标志** | `isFilter: true` (AI 筛子组件) |
| **一句话** | 投资者自建 AI 筛子 · 多 Agent 分析工作流 |

**业务逻辑**:
- 评估通的本质是一套**多 Agent 分析工作流**——即"筛子"
- **筛子由参与通的用户（投资者）自行编写和配置**，不是平台预设的固定模型
- 平台提供一些 pre-set 维度供用户参考和编辑，但**不预定维度**，投资者完全自主
- 工作流程：发起通收集的材料流转到参与通 -> 参与通用户通过评估通创建的"筛子"（多 Agent 分析工作流）过滤项目 -> 符合筛子规则的项目显示在参与通面板上
- 评估通是整个平台的**"AI 大脑"**——提供模型库和工作流编排能力

**核心机制**:
- **筛子工作流编排 (核心功能)**:
  - 每个投资者可以创建多个筛子（如"高增长筛子"、"餐饮专用筛子"、"低风险筛子"）
  - 每个筛子是一个多 Agent 分析工作流，由多个分析步骤串联组成
  - 平台提供 pre-set 分析维度供参考（如：财务健康度、行业前景、团队能力、经营稳定性、合规风险等），投资者可自由编辑、增减、调整权重
  - 筛子的评估标准完全透明化，所有评分规则可查看、可复制、可分享
- **多 Agent 协作**: 每个分析维度可以是一个独立的 AI Agent，各 Agent 独立评分后汇总。例如：Agent-1 分析财务数据 -> Agent-2 分析行业趋势 -> Agent-3 分析团队背景 -> 综合评分
- **自动生成尽调报告**: PDF + JSON 格式，内含评分雷达图（维度由筛子定义）、财务预测、风险提示、同行对比、投资建议
- **财务建模**: IRR 计算（基于预测收入、分成比例、回收上限）、回收期预测、敏感性分析
- **筛子 API（供参与通调用）**: 接收项目 ID 列表 + 筛子 ID -> 返回符合条件的项目 ID 列表 + 各项评分

**与参与通的关系（核心）**: 参与通调用评估通的筛子 API 过滤项目——评估通是 AI 大脑提供模型库和工作流编排能力，参与通展示过滤结果。一个发起通的 Application 可以被多个不同投资者的多个不同筛子分别筛选。

**串联模式**: 接收发起通的项目 -> 自动应用投资者配置的筛子 -> 推送到风控通 + 参与通
**独立模式**: 投资者手动上传项目材料，使用筛子获取 AI 评估报告（不进入平台流程）

**关键输出**:
- AI 评估报告 (PDF + JSON 格式)
- 筛子评分结果（各维度评分 + 综合评分，维度由投资者自定义）
- 筛子 API 响应（符合条件的项目 ID 列表 + 各项评分）
- 评估完成事件 (`assessment.completed`)

---

### 3.4 风控通 (Risk Connect)

| 字段 | 值 |
|------|-----|
| **ID** | `risk` |
| **flowOrder** | 4 |
| **角色** | investor (投资者专属) |
| **阶段** | investor-filter |
| **状态** | `live` 已上线 |
| **颜色** | 浅色 `#E0E7FF`，深色 `#6366F1` |
| **分类** | 投资者路径 / Investor Path |
| **核心功能** | 自定义风控标准、材料验真、合规审查、风险评分、核验方式配置 |
| **特殊标志** | `isFilter: true` (AI 筛子组件) |
| **一句话** | 自定义风控规则 · 材料验真 |

**业务逻辑**:
- 风控通的核心定位是**材料复审和验真**——在评估通把材料"当真的"分析之后，风控通负责验证材料的真实性
- 通过接入外部公开渠道 API（如企查查等），对材料进行核验
- 示例：客户上传的股权架构图和营业执照，评估通分析时当作真实材料评估，风控通则通过企查查 API 验证股权架构是否与工商登记一致
- 每个投资者可设置自己的风控标准与核验方式

**核心机制**:
- **材料复审（基于风控规范审核）**: 检查材料完整性、逻辑一致性、格式规范性。对照风控规范清单逐项审核
- **验真（外接公开渠道 API）**: 企查查/天眼查 API（工商信息验证、股权架构核验、法人信息核验、关联企业查询）、税务信息验证、征信查询、银行流水验真（POS 流水交叉核验）
- **白名单/黑名单机制**: 白名单——已通过验真的企业/主体自动通过、黑名单——特定区域/行业/企业排除
- **造假检测**: OCR + AI 识别 PS 过的财务报表、收入突增/突降异常检测、客户集中度异常、关联方交易异常
- **风险评分体系**: 综合风险评分 0-100 分（分数越高风险越高）。低风险 0-30 / 中风险 30-60 / 高风险 60-100。权重：材料真实性 30% / 收入稳定性 30% / 合规性 20% / 行业风险 20%
- **合规检查**: 资质完整性（营业执照、行业许可证）、法律诉讼记录、失信被执行人、行政处罚记录
- **风控循环机制**: 风控不通过 -> 通知融资者补充材料 -> 发起通重新提交 -> 评估通重新评估 -> 风控通重新审核，最多循环 3 次

**评估通 + 风控通合体说明**: 评估通 = 分析材料内容（当真的分析）+ 打分；风控通 = 验证材料真实性（验真）+ 合规审查。两者是投资者用 AI 搭建的个性化"筛子"的两个阶段。

**串联模式**: 接收评估通的报告 → 风控审核 → 通过后推送给参与通/条款通
**独立模式**: 融资者/投资者手动上传材料，获取风控报告（不进入平台流程）

**关键输出**:
- 风控报告 (PDF + JSON 格式)
- 风险评分 (0-100 分) + 风险等级 (低/中/高)
- 风控决策事件 (`risk.passed` / `risk.rejected`)

---

### 3.5 参与通 (Deal Connect)

| 字段 | 值 |
|------|-----|
| **ID** | `opportunity` |
| **flowOrder** | 5 |
| **角色** | investor (投资者专属) |
| **阶段** | investor-view |
| **状态** | `live` 已上线 |
| **颜色** | 浅色 `#D1FAE5`，深色 `#10B981` |
| **分类** | 投资者路径 / Investor Path |
| **核心功能** | 筛后项目看板、全量项目浏览、项目对比、投资意向标记、智能推荐 |
| **一句话** | 参与投资 · 筛后项目看板 · 投资决策 |

**业务逻辑**:
- 投资者的统一项目看板——像"投资项目淘宝"
- 展示通过评估通 + 风控通双重筛选后的融资项目
- **核心规则**: 无筛子 = 展示全量项目（保证融资者曝光）；有筛子 = 只展示通过的项目
- 投资者在此浏览、对比、标记投资意向
- 选中项目后 → 进入条款通

**核心机制**:
- **项目展示**: 卡片式布局，展示公司名称、行业、融资金额、月收入、融资进度、AI 评分、风险等级
- **智能筛选 (双模式)**:
  - **生产阶段（通间联通）**: 调用评估通的筛子 API 实时过滤。API 设计：`POST /api/assess/sieve` 接收 `{ projectIds: string[], sieveId: string }` 返回 `{ filtered: [{ projectId, scores, passed }] }`
  - **Demo 阶段（内置简化版筛子）**: 参与通内置简化版筛选逻辑（行业、融资金额范围、评分区间等基础过滤），不调用外部评估通，基于 mock 数据或本地数据过滤
- **项目收藏/关注**: 投资者可收藏项目，系统持续跟踪进展，有重要更新时自动通知
- **快速预览**: 点击项目卡片查看简化版评估报告（评分雷达图、关键财务指标、风险提示），感兴趣后可查看完整报告

**通间联通 API 设计（规划中，生产阶段启用）**:
```
参与通 <-> 评估通:
  POST /api/assess/sieve       — 调用筛子过滤项目
  GET  /api/assess/sieves       — 获取当前用户的筛子列表
  GET  /api/assess/report/:id   — 获取指定项目的评估报告

参与通 <-> 风控通:
  GET  /api/risk/status/:id     — 获取指定项目的风控状态
  GET  /api/risk/report/:id     — 获取指定项目的风控报告

参与通 -> 条款通:
  POST /api/terms/initiate      — 发起条款协商（传入项目ID + 投资者ID）
```

**串联模式**: 接收发起通的项目 → 调用评估通筛选 → 用户跳转到条款通
**独立模式**: 投资者仅浏览项目，不进入后续评估流程（如：市场调研用途）

**独立应用状态**: 已规划在 Genspark 全栈模式独立搭建（第二个独立应用）

**关键输出**:
- 过滤后的项目列表
- 项目浏览事件 (`opportunity.viewed`)
- 项目收藏事件 (`opportunity.favorited`)

---

### 3.6 条款通 (Terms Connect)

| 字段 | 值 |
|------|-----|
| **ID** | `terms` |
| **flowOrder** | 6 |
| **角色** | collaborative (投融资协同) |
| **阶段** | deal |
| **状态** | `coming` 即将上线 |
| **颜色** | 浅色 `#EDE9FE`，深色 `#8B5CF6` |
| **分类** | 交易达成 / Deal Making |
| **核心功能** | 三联动滑块（融资金额/分成比例/联营期限）、RBF条款公式计算、方案对比、模拟测算 |
| **特殊标志** | `isCollaborative: true` |
| **一句话** | 三联动滑块 · 投融资双方磋商 · RBF 条款达成 |

**业务逻辑**:
- **Y 型汇合点** — 从这里开始，融资者和投资者两条路径汇合
- 条款通是经过评估通、风控通分析的材料，转化为收入分成的主要商业条款的工具
- 核心交互：一个**三联动滑块**，投融资双方在上面磋商
- 协商完成后 -> 进入合约通签署

**核心机制**:

**RBF 条款核心公式**:
```
融资金额 = (PCF x 分成比例 x 联营期限) / (1 + YITO)

其中:
- PCF = Projected Cash Flow (预估现金流)
- 分成比例 = Revenue Share Ratio (收入分成百分比)
- 联营期限 = Co-operation Term (联营合作期限)
- YITO = Yield-to-Investor (投资者收益率)
```

**三联动滑块 UI（核心交互）**:
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
- 融资金额越高 -> 分成比例越高（投资者需要更高回报）-> 联营期限越长（需要更长回收周期）
- 投融资双方的博弈：融资者希望金额高、比例低、期限短；投资者希望比例高、期限长
- 滑块上限由评估通和风控通的结论确定（RBF 最大融资金额、对应的分成比例上限和联营期限上限）

**多方案对比**: 可保存多组滑块配置进行对比，实时显示修改后的回收期、IRR 等指标变化
**历史条款库**: 推荐同行业、同规模的历史成功案例，帮助双方快速达成共识

**串联模式**: 接收评估通 + 风控通的结果（确定滑块上限）-> 双方滑块协商 -> 推送给合约通
**独立模式**: 投资者和融资者手动输入 PCF 和 YITO 等参数，使用条款滑块和计算器（不依赖评估通）

**关键输出**:
- 标准化条款 JSON（融资金额、分成比例、联营期限、PCF、YITO 等）
- 条款对比报告（多组滑块配置对比）
- 协商记录（时间戳、修改历史）
- 条款达成事件 (`terms.agreed`)

---

### 3.7 合约通 (Contract Connect)

| 字段 | 值 |
|------|-----|
| **ID** | `contract` |
| **flowOrder** | 7 |
| **角色** | collaborative (投融资协同) |
| **阶段** | deal |
| **状态** | `beta` Beta测试中 |
| **颜色** | 浅色 `#EDE9FE`，深色 `#8B5CF6` |
| **分类** | 交易达成 / Deal Making |
| **核心功能** | 电子签署、合约管理、版本控制、法律合规 |
| **特殊标志** | `isCollaborative: true` |
| **一句话** | 电子合约签署 · 法律合规 |
| **独立应用** | **已在 Genspark 全栈模式独立搭建（第一个独立应用）**，主站通过 `externalUrl` 跳转 |

**业务逻辑**:
- 电子合约签署平台——既是条款的"执行器"（串联模式），也是独立的"合同编辑器"（独立模式）
- 投融资双方在线协同完成合约签署，具有法律效力
- 签署完成后 → 进入结算通

**核心机制**:
- **合同生成 (串联模式)**: 接收条款通的条款 JSON → AI 生成标准 RBF 合同模板 → 自动填充甲方（融资者）、乙方（投资者）信息及全部条款数据 → 输出 PDF
- **自然语言改合同 (独立模式 / 核心差异化功能)**: 用户直接上传现有合同 (PDF/Word) → AI 解析合同内容 (OCR + NLP) → 用户用自然语言修改（如"把第3条的分成比例改成8%"、"增加一条违约条款"、"删除第5条"）→ AI 实时修改并生成新版本（高亮修改内容）
- **行业合同模板系统 (已实现)**: 已实现演唱会/演出、餐饮连锁、零售门店、医美/健康、教育培训五大行业模板。每个模板包含预设参数（投资金额、分成比例、终止回报率、违约金等）、模块化条款结构、完整合同文本（支持参数替换）
- **AI 协商助手 (已实现)**: 用户用自然语言描述条款变动 → AI 识别对应模块和参数 → 转换为专业合同条款语言 → 输出结构化修改指令，并从双方利益角度提供建议
- **电子签名**: CA 认证电子签名（法律有效），签署时需二次验证（短信/人脸）
- **版本管理**: 修订记录、版本对比 (diff)、版本回滚
- **区块链存证**: 签署后哈希值上链，防篡改

**串联模式**: 接收条款通的条款 JSON → 自动生成合同 → 双方签署 → 推送给结算通
**独立模式**: 用户上传现有合同 → 自然语言修改 → 双方签署（不依赖条款通）

**独立应用部署模式**: 合约通是**第一个**在 Genspark AI Developer 全栈模式独立搭建的"通"。在主站的 `data.ts` 中配置了 `externalUrl`，用户点击后在新标签页打开独立应用。这是后续所有"通"独立搭建的参考模板。

**关键输出**:
- 电子合同 PDF（带电子签章）
- 合同信息 JSON（关键条款结构化数据）
- 合同签署事件 (`contract.signed`)
- 区块链存证哈希

---

### 3.8 结算通 (Settlement Connect)

| 字段 | 值 |
|------|-----|
| **ID** | `settlement` |
| **flowOrder** | 8 |
| **角色** | collaborative |
| **阶段** | post-investment |
| **状态** | `coming` 即将上线 |
| **颜色** | 浅色 `#FEE2E2`，深色 `#EF4444` |
| **分类** | 投后管理 / Post-Investment |
| **核心功能** | 交易数据记录、账单生成、对账管理、数据可视化（大账本模式） |
| **一句话** | 大账本 · 记录所有交易数据 · 唯一币种人民币 |

**业务逻辑**:
- 结算通类似于一个**大账本**——记录所有交易的数据
- **暂不行使清结算交收等实际功能**，纯记录和展示
- **唯一币种：人民币 (CNY)**，暂不涉及跨境结算
- 透明化所有资金流转记录

**核心机制**:
- **交易数据记录**: 记录每笔收入分成的发生时间、金额、对应合同、对应项目。按合同条款（分成比例）计算应分金额，计算公式：应分金额 = 月度收入 x 分成比例
- **月度账单生成**: 每月自动生成 PDF 账单（账单期间、月度收入、分成比例、应分金额、累计金额），自动发送给双方
- **对账管理**: 双方对账（融资者确认收入 vs 投资者确认分成），争议标记和处理流程
- **数据可视化**: 累计收入/分成趋势图、合同进度追踪（累计分成 vs 合同总额）

**重要说明**: 结算通当前阶段是纯记录工具（大账本），不执行实际的资金清结算和交收。实际资金划转由线下或第三方支付系统完成。

**串联模式**: 接收履约通的数据 + 合约通的条款 → 自动结算 → 生成账单
**独立模式**: 用户手动录入收入和分成规则，使用结算计算器（不依赖履约通和合约通）

**关键输出**:
- 月度账单 (PDF 格式)
- 分成金额（当月应支付金额）
- 结算记录 (JSON: 收入、分成、累计回收)
- 结算完成事件 (`settlement.completed`)

---

### 3.9 履约通 (Performance Connect)

| 字段 | 值 |
|------|-----|
| **ID** | `performance` |
| **flowOrder** | 9 |
| **角色** | collaborative |
| **阶段** | post-investment |
| **状态** | `coming` 即将上线 |
| **颜色** | 浅色 `#FEE2E2`，深色 `#EF4444` |
| **分类** | 投后管理 / Post-Investment |
| **核心功能** | 每日履约监控、收入数据追踪、回款异常预警、Dashboard |
| **一句话** | 每日监控 · 回款预警 · 投后追踪 |

**业务逻辑**:
- 投后履约监控与数据追踪——投资者的"监控摄像头"
- **收入分成是每日的**，因此监控频率也是**每日**
- 预警主要针对回款问题（现金流、数据流对不上等）
- 履约数据是结算通记录账单的唯一依据

**核心机制**:
- **收入数据接入**: API 对接（支付宝、微信支付、银行流水、POS 系统，OAuth 授权自动同步）、手动上传（Excel/CSV，自动解析字段）
- **每日履约指标监控**: 日收入数据追踪、收入趋势（日/周/月折线图）、同比/环比增长率、分成金额自动计算、累计分成金额追踪
- **异常预警（回款问题导向）**: 现金流异常（实际收入与预期严重偏差）、数据流异常（POS 数据与银行流水对不上）、逾期预警（未按时上传每日数据）、合同违约预警（收入低于约定最低线 -> 启动违约处理）
- **可视化 Dashboard**: 收入趋势图 + 预测、履约健康度评分、对比合同预期 vs 实际表现

**串联模式**: 接收合约通的合同信息 → 监控履约数据 → 推送给结算通
**独立模式**: 融资者/投资者手动上传收入数据，查看履约分析（不依赖合约通）

**关键输出**:
- 履约数据 JSON（月度收入、增长率、分成金额）
- 履约健康度评分 (0-100 分)
- 异常预警（收入下滑/逾期/违约）
- 履约数据上传事件 (`performance.data_uploaded`)

---

### 3.10 九通总览表

| # | ID | 中文名 | 英文名 | 简称 | 状态 | 角色 | 阶段 | 浅色 | 深色 | 筛子 | 协同 | 独立部署 |
|---|-----|--------|--------|------|------|------|------|------|------|------|------|---------|
| 1 | identity | 身份通 | Identity Connect | Identity | live | shared | entry | #DBEAFE | #3B82F6 | - | - | - |
| 2 | application | 发起通 | Originate Connect | Originate | beta | borrower | borrower-upload | #FEF3C7 | #F59E0B | - | - | - |
| 3 | assess | 评估通 | Assess Connect | Assess | beta | investor | investor-filter | #E0E7FF | #6366F1 | Yes | - | - |
| 4 | risk | 风控通 | Risk Connect | Risk | live | investor | investor-filter | #E0E7FF | #6366F1 | Yes | - | - |
| 5 | opportunity | 参与通 | Deal Connect | Deal | live | investor | investor-view | #D1FAE5 | #10B981 | - | - | 规划中 |
| 6 | terms | 条款通 | Terms Connect | Terms | coming | collaborative | deal | #EDE9FE | #8B5CF6 | - | Yes | - |
| 7 | contract | 合约通 | Contract Connect | Contract | beta | collaborative | deal | #EDE9FE | #8B5CF6 | - | Yes | **已部署** |
| 8 | settlement | 结算通 | Settlement Connect | Settlement | coming | collaborative | post-investment | #FEE2E2 | #EF4444 | - | - | - |
| 9 | performance | 履约通 | Performance Connect | Performance | coming | collaborative | post-investment | #FEE2E2 | #EF4444 | - | - | - |

---

## 第四章：统一底座（"3"基础设施层）

三大底座支撑所有 9 个"通"共同运行：

### 4.1 Account 身份体系（账户通）

| 维度 | 说明 |
|------|------|
| **图标** | `fa-users` |
| **功能** | 统一认证 · 权限隔离 · 角色分流 |
| **详细** | 多租户账户体系（融资者/投资者/运营团队三方独立空间）、账户注册与认证（企业/个人）、账户信息管理、租户隔离（数据隔离 + 权限隔离）、账户余额管理（充值/提现） |

### 4.2 Data 数据底座（数据通）

| 维度 | 说明 |
|------|------|
| **图标** | `fa-database` |
| **功能** | 数据同源 · 清洗治理 · 标准化 |
| **详细** | 统一数据中台，存储所有业务数据，支持跨"通"查询。数据存储（结构化 + 非结构化）、数据查询（SQL + 全文搜索）、数据备份与恢复、数据权限控制（基于身份通的权限）。融资者上传的数据标准化后存入统一数据池，所有 Agent 使用一致的数据 |

### 4.3 AI 智能引擎

| 维度 | 说明 |
|------|------|
| **图标** | `fa-brain` |
| **功能** | NLP 解析 · 量化算法 · 筛子工作流编排 |
| **详细** | OCR 识别（营业执照、财务报表）、NLP 理解（合同解析、自然语言修改）、生成式 AI（生成 BP、生成合同、协商助手）、评分模型（风险评分、评估评分）、预测模型（收入预测、回收期预测）。为评估通和风控通的个性化 AI 筛子提供底层能力 |

**Demo 阶段 AI 模型策略**:
- **统一模型**: Demo 阶段所有"通"的 AI 功能统一使用 **GPT-4o**，以功能实现为优先，不做模型分化
- **各通 AI 功能对应**:
  - 身份通: 无 AI（纯认证逻辑）
  - 发起通: GPT-4o（材料结构化提取、Pitch Deck 内容生成）
  - 评估通: GPT-4o（多 Agent 筛子工作流、评分分析、报告生成）
  - 风控通: GPT-4o（材料复审、异常检测）+ 企查查等外部 API（验真）
  - 参与通: GPT-4o（智能推荐、项目摘要生成）
  - 条款通: GPT-4o（条款建议、历史案例匹配）
  - 合约通: GPT-4o（自然语言改合同、合同生成）— 已实现
  - 结算通: 无 AI（纯计算逻辑）
  - 履约通: GPT-4o（趋势分析、异常诊断）
- **生产阶段**: 根据各"通"的具体需求选择最优模型（如 OCR 用专用模型、评分用微调模型等），在生产技术栈中分化

### 4.4 核心数据关系

**关键实体关系**:
- **一个 Application（发起通）可以被多个 Assess 筛子筛选**: 参与通的不同投资者可以用各自创建的不同筛子，对同一个发起通的 Application 进行独立筛选。筛子结果互不影响。
- **一个投资者可以创建多个筛子**: 如"高增长筛子"、"餐饮专用筛子"等，灵活切换使用
- **一个 Deal（参与通选中）对应一个 Terms -> 一个 Contract**: 条款通协商后生成合同
- **一个 Contract 对应多个 Settlement 记录**: 按日/月产生多笔结算记录
- **一个 Contract 对应一个 Performance 监控**: 持续监控直至合同结束

### 4.5 架构特点总结

- **事件驱动**: 所有 Agent 之间通过事件总线通信，松耦合
- **数据同源**: 融资者上传的数据标准化后存入统一数据池，所有 Agent 使用一致的数据
- **AI 编排**: 为评估通和风控通的个性化 AI 筛子提供底层能力
- **模块化**: 每个"通"是独立微服务，可单独部署、升级、替换
- **可扩展**: 可新增"通"、替换某个"通"的实现、跨平台复用（API 开放）

---

## 第五章：双模式设计（串联 + 独立）

这是滴灌通架构的核心特色：每个"通"既可以作为完整 RBF 流程的一部分（串联模式），也可以作为独立工具使用（独立模式）。

### 5.1 为什么需要双模式？

用户的需求是多样化的：
- **完整流程用户**: 需要从融资申请到分成结算的全流程支持（串联模式）
- **单点需求用户**: 只需要某个环节的工具，如：只需要 AI 生成 BP，不需要后续评估（独立模式）
- **灵活组合用户**: 部分环节使用平台，部分环节自己处理（混合模式）

### 5.2 双模式设计原则

**串联模式 (Chain Mode)**:
- 上游"通"完成后，自动触发下游"通"
- 数据自动传递，无需用户手动操作
- 适合完整流程用户

**独立模式 (Standalone Mode)**:
- 用户直接访问某个"通"，手动输入数据
- 不依赖上游"通"的数据
- 输出结果可导出，不自动推送给下游"通"
- 适合单点需求用户

### 5.3 各"通"双模式一览

| 通 | 串联模式 | 独立模式 |
|----|---------|---------|
| 身份通 | 所有"通"的前置认证，根据已解锁身份分流 | 独立企业/团队级身份认证和权限管理系统 |
| 发起通 | 发布后推送到筛选池 + 触发评估 | 仅生成材料包和 Pitch Deck 导出自用（路演、BP 大赛、FA 对接） |
| 评估通 | 接收项目自动应用投资者筛子 + 推送风控 | 手动上传材料获取 AI 评估报告 |
| 风控通 | 接收评估报告自动风控验真 | 手动上传材料获取风控报告 |
| 参与通 | 展示筛后项目 + 跳转条款通 | 仅浏览项目（市场调研） |
| 条款通 | 接收评估+风控结果确定滑块上限 + 双方协商 | 手动输入参数使用三联动滑块和计算器 |
| 合约通 | 接收条款 JSON 自动生成合同 | 上传现有合同 + 自然语言修改 |
| 结算通 | 接收履约数据记录账单 | 手动录入收入和分成规则查看账本 |
| 履约通 | 接收合同信息每日监控履约 | 手动上传收入数据查看分析 |

> **商业化说明**: 目前没有定价计划，但每个"通"的独立模式场景都具备独立收费的能力。

### 5.4 典型应用场景

**场景 1：完整 RBF 流程 (串联)**
餐饮连锁企业需要 500 万融资 -> 发起通上传材料（财报、商业计划书、Excel 测算）-> AI 整理为三层输出（底稿+材料包+Pitch Deck）-> 评估通：投资者配置的筛子自动分析 -> 风控通：企查查 API 验真营业执照和股权架构 -> 参与通看板展示 -> 条款通三联动滑块协商（融资金额 500 万、分成比例 15%、联营期限 36 个月）-> 合约通生成合同签署 -> 履约通每日监控收入 -> 结算通记录每笔分成账单

**场景 2：独立使用发起通生成材料包和 Pitch Deck**
创业者需要融资材料参加路演 -> 访问发起通（独立模式）-> 上传各种材料（PPT、财报、测算表）-> AI 整理为原始底稿归档 + 标准化材料包 + 5-10 页精美 Pitch Deck -> 下载 PDF 自用 -> 生成分享链接发给潜在投资人，不进入后续流程

**场景 3：独立使用合约通修改合同**
投融双方已线下谈好条款 → 访问合约通（独立模式）→ 上传 RBF 合同模板 → 自然语言修改"把分成比例改成 8%，回收上限改成 180 万"→ AI 实时修改 → 双方在线签署下载 → 不依赖条款通

---

## 第六章：设计系统（所有"通"必须 100% 遵守）

### 6.1 品牌色系（全局统一）

```
主品牌色:     #5DC4B3
品牌浅色:     #7DD4C7
品牌深色:     #3D8F83  (hover状态)
品牌强调:     #49A89A
Logo亮色:     #2EC4B6
Logo亮色2:    #3DD8CA
Logo深色:     #28A696
```

**关键规则**: 品牌色 `#5DC4B3` 用于全局元素（导航栏链接、品牌相关、返回按钮等），每个"通"的专属色仅用于该"通"的内容区域。

### 6.2 语义色

```
信息 (info):     #32ade6
成功 (success):  #34c759
警告 (warning):  #ff9f0a
错误 (error):    #ff375f
靛蓝 (indigo):   #6366F1
紫罗兰 (violet): #8B5CF6
```

### 6.3 文字层次（严格遵守，禁止纯黑 #000000）

```
标题/主文字 (primary):  #1d1d1f
标题2 (title):         #1a1a1a
二级文字 (secondary):   #6e6e73
三级文字 (tertiary):    #86868b
占位符 (placeholder):   #aeaeb2
```

**铁律**: 最深颜色为 `#1d1d1f`，永远不使用纯黑 `#000000`。

### 6.4 背景色

```
页面背景 (page):  #f5f5f7
卡片背景 (card):  rgba(255, 255, 255, 0.88)
导航栏 (navbar):  rgba(255, 255, 255, 0.92)
模态页脚:         #f8fafc
分割线 (divider): #f1f5f9
```

### 6.5 边框

```
默认边框:       rgba(0, 0, 0, 0.06)
输入框边框:     rgba(0, 0, 0, 0.12)
hover边框:     rgba(93, 196, 179, 0.2)   — 品牌色半透明
focus边框:     #5DC4B3                     — 品牌色实色
```

### 6.6 圆角

```
xs:   4px     sm:   8px     md:   12px
lg:   16px    xl:   20px    2xl:  24px
3xl:  32px    full: 9999px
```

### 6.7 阴影（Apple 风格多层深度）

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

### 6.8 动效

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

### 6.9 渐变

```css
--gradient-primary:  linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%);
--gradient-cyber:    linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);
--gradient-aurora:   radial-gradient(ellipse 120% 80% at 50% 45%, #13524a 0%, #0f3d36 30%, #0b312c 55%, #082420 80%, #061b18 100%);
--gradient-neon:     linear-gradient(135deg, #32ade6 0%, #5DC4B3 40%, #49A89A 70%, #3D8F83 100%);
--gradient-glass:    linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
--gradient-surface:  linear-gradient(180deg, #ffffff 0%, #f8f9fe 100%);
```

### 6.10 字体

```
正文字体栈:
  -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display',
  'Segoe UI', Roboto, 'Noto Sans SC', sans-serif

品牌/Logo字体栈:
  'Montserrat', 'Inter', 'Futura', 'Helvetica Neue', sans-serif

Google Fonts 加载:
  Inter:        wght@300;400;500;600;700;800;900
  Montserrat:   wght@700;800;900
  Noto Sans SC: wght@300;400;500;600;700
```

### 6.11 Tailwind CSS 运行时配置

所有页面的 `<head>` 中必须包含以下 Tailwind 配置：

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

## 第七章：UI 组件规范

### 7.1 导航栏 (Navbar)

- **定位**: `sticky top-0 z-50`，高度 56px
- **毛玻璃效果**: `background: rgba(255,255,255,0.92); backdrop-filter: blur(24px) saturate(180%);`
- **底部边线**: `border-bottom: 0.5px solid rgba(0,0,0,0.06)`
- **滚动效果**: 滚动距离 >10px 时添加 `.scrolled` 类，加阴影
- **品牌 Logo**: 双圆叠合标识 + "MICRO CONNECT 滴灌通" 文字
- **语言切换**: 按钮切换 中/EN，修改 URL `?lang=en` 参数

**独立应用的 Navbar 简化版**:
- 左侧：品牌 Logo（点击跳主站首页 `https://microconnect.com`）
- 中间：当前产品名（如"参与通 Deal Connect"）
- 右侧：语言切换 + "返回主站"按钮

### 7.2 页脚 (Footer)

- **Aurora 深色背景**: `radial-gradient(ellipse 130% 90% at 50% 20%, #0f3d36 0%, #0b312c 40%, #082420 70%, #061b18 100%)`
- **四栏布局**: 品牌区(Logo+描述+社交图标) | 产品链接 | 公司链接 | 联系方式
- **底部**: 免责声明 + 版权 `© 2026 Micro Connect Group` + 法律链接

**独立应用的 Footer 简化版**:
- 品牌 Logo + 产品名 + 版权信息
- 链接：返回主站、隐私政策、服务条款

### 7.3 品牌 Logo (SVG)

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

品牌全名显示格式：`MICRO CONNECT 滴灌通` (英文部分用 Montserrat 字体)

### 7.4 卡片 (Card)

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

### 7.5 滚动渐现动画

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

### 7.6 状态徽章

| 状态 | CSS 类 |
|------|-------|
| live (已上线) | `bg-green-100 text-green-700 border-green-200` |
| beta (Beta测试中) | `bg-yellow-100 text-yellow-700 border-yellow-200` |
| coming (即将上线) | `bg-gray-100 text-gray-500 border-gray-200` |

### 7.7 角色徽章

| 角色 | CSS 类 |
|------|-------|
| shared (共用) | `bg-blue-100 text-blue-600` |
| borrower (融资者) | `bg-amber-100 text-amber-700` |
| investor (投资者) | `bg-indigo-100 text-indigo-600` |
| collaborative (协同) | `bg-[#5DC4B3]/15 text-[#0d9488]` |

### 7.8 点阵背景图案

```css
.dot-pattern {
  background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
}
```

---

## 第八章：国际化 (i18n) 规范

### 8.1 语言体系

- **支持语言**: 中文 (zh) 和英文 (en)
- **默认语言**: 中文
- **切换机制**: URL 查询参数 `?lang=en`
- **链接生成**: `langLink(href, lang)` — zh 不加参数，en 追加 `?lang=en`

### 8.2 双语类型

```typescript
type Lang = 'zh' | 'en'
type Bi = { zh: string; en: string }       // 双语字符串
type BiArr = { zh: string[]; en: string[] } // 双语数组
```

### 8.3 工具函数

```typescript
tt(obj: Bi, lang: Lang): string       // 取文本
ta(obj: BiArr, lang: Lang): string[]  // 取数组
getLangFromQuery(url: string): Lang    // 从URL解析语言
langLink(href: string, lang: Lang): string  // 生成带语言参数的链接
```

### 8.4 产品信息查询

```typescript
getProductName(id, lang)      // 按ID获取产品名称
getProductDesc(id, lang)      // 按ID获取产品描述
getProductFeatures(id, lang)  // 按ID获取功能标签
getProductShort(id, lang)     // 按ID获取一句话简述
getCategoryName(zhName, lang) // 分类名翻译
getStatusLabel(status, lang)  // 状态标签翻译
getRoleBadge(role, lang)      // 角色徽章翻译
```

### 8.5 独立应用的 i18n

独立应用内部自行定义 `TEXT` 对象，格式与主站一致：

```typescript
const TEXT = {
  hero: {
    title: { zh: '参与通', en: 'Deal Connect' },
    subtitle: { zh: '投资者统一项目看板', en: 'Unified Investor Deal Dashboard' },
    // ...
  },
  // ...
}
const tt = (obj: {zh:string;en:string}, lang: 'zh'|'en') => obj[lang]
```

### 8.6 金额格式规范

- 中文: `¥68万`
- 英文: `¥680K`

---

## 第九章：技术栈与部署架构

### 9.1 Demo/展示型技术栈（当前实现）

这是在 Genspark 全栈模式快速搭建 Demo 用的技术栈，已在 L1 主站和 MC-Revolution 合约通中验证：

| 层面 | 技术 |
|------|------|
| **框架** | Hono + TypeScript + JSX (服务端渲染 SSR) |
| **部署** | Cloudflare Pages (通过 wrangler) |
| **样式** | Tailwind CSS (CDN) + 自定义 CSS Design Token |
| **图标** | FontAwesome 6.4 (CDN) |
| **字体** | Google Fonts: Inter + Montserrat + Noto Sans SC |
| **交互** | 纯原生 JS (inline `<script dangerouslySetInnerHTML>`)，不用 React/Vue |
| **构建** | Vite + @hono/vite-cloudflare-pages |
| **包管理** | npm |
| **AI 集成** | OpenAI API (通过 Cloudflare Bindings `c.env.OPENAI_API_KEY`) |
| **数据存储** | localStorage (客户端) / Cloudflare D1 / KV (服务端) |

### 9.2 生产级技术栈（白皮书愿景）

这是未来正式产品化、规模化后的迁移目标：

| 层面 | 技术 |
|------|------|
| **前端** | React.js + TypeScript + Tailwind CSS + Chart.js |
| **后端** | Node.js + Express (API 服务) + Python + FastAPI (AI 服务) |
| **数据库** | PostgreSQL (关系型) + MongoDB (文档型) |
| **缓存/队列** | Redis (缓存 + 消息队列) + RabbitMQ (事件总线) |
| **AI** | OpenAI GPT-4 (生成式 AI) + Tesseract OCR + Scikit-learn (评分模型) + TensorFlow (预测模型) |
| **基础设施** | Docker (容器化) + Kubernetes (编排) + AWS / 阿里云 |

**两种技术栈不冲突**: Demo 栈用于快速验证和展示，生产栈是规模化后的迁移方向。在 Genspark 全栈模式开发新"通"时，统一使用 Demo 技术栈。

### 9.3 项目初始化命令

```bash
npm create hono@latest webapp -- --template cloudflare-pages --install --pm npm
```

### 9.4 独立应用部署模式

每个"通"可以作为独立的全栈应用搭建和部署。部署后：
1. 在主站 `data.ts` 中为该产品设置 `externalUrl` 字段
2. 主站的产品卡片/链接检测到 `externalUrl` 后，在新标签页 `_blank` 打开独立应用
3. 没有 `externalUrl` 的产品继续走主站内部占位页 `/{id}`

**合约通是第一个这样做的。参与通是第二个。**

### 9.5 项目结构标准

**主站结构 (L1)**:
```
webapp/
├── src/
│   ├── index.tsx          # 入口：Hono应用 + 路由注册
│   ├── renderer.tsx       # JSX渲染器 (HTML外壳/head/Tailwind配置)
│   ├── i18n.ts            # 国际化数据层
│   ├── data.ts            # 产品数据层 (Single Source of Truth)
│   ├── pages/             # 页面组件
│   └── components/        # 共享组件 (Navbar/Footer/Logos)
├── public/static/style.css
├── ecosystem.config.cjs
├── wrangler.jsonc
├── vite.config.ts
├── tsconfig.json
└── package.json
```

**独立应用结构 (MC-Revolution 合约通)**:
```
webapp/
├── src/
│   ├── index.tsx          # 入口：Hono应用 + API路由 + 主页面HTML
│   ├── renderer.tsx       # JSX渲染器 (极简，仅HTML壳)
│   ├── knowledge.ts       # 领域知识库（合同条款结构化数据）
│   └── templates.ts       # 行业模板系统（合同参数、条款、全文）
├── wrangler.jsonc
├── vite.config.ts
└── package.json
```

### 9.6 路由结构

**主站路由**:
- `/` → HomePage (叙事式首页)
- `/design` → DesignPage (Y 型流程设计思路)
- `/portal` → PortalPage (产品入口)
- `/about` → AboutPage
- `/team` → TeamPage
- `/news` → NewsPage
- `/contact` → ContactPage
- `/{productId}` → PlaceholderPage (9 个产品占位页，有 externalUrl 的提示跳转)

**独立应用路由 (合约通为例)**:
- `/` → 主页面（项目列表 + 协商界面）
- `/api/templates` → GET 获取行业模板列表
- `/api/templates/:id` → GET 获取指定模板详情
- `/api/parse-change` → POST AI 解析自然语言条款变动

### 9.7 CDN 依赖

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- FontAwesome 6.4 -->
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@700;800;900&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

---

## 第十章：主站页面结构概览

### 10.1 首页 (HomePage) — 叙事式产品展示

1. **Splash Screen** — 全屏 Logo 动画 (One Pipeline / Nine Agents / Infinite Possibilities)
2. **Welcome Modal** — 4 页滑动介绍弹窗
3. **Hero Section** — 品牌 Banner + "收入分成投资的基础设施级平台"
4. **Flow Overview** — 5 阶段流程导航 (锚点跳转)
5. **5 个叙事 Section** — 每个阶段配插图 + 产品卡片
6. **Dual Channel** — 投资者 vs 融资者双通道价值主张
7. **Foundation** — 三层统一底座展示
8. **Final CTA** — "从身份通开始" 号召行动

### 10.2 设计思路页 (DesignPage)

1. **Hero** — "9 个通如何串联成 Super Agent"
2. **Y-Flow Diagram** — 完整 Y 型业务流程图 (5 个 Phase 可视化)
3. **Architecture Grid** — 按 5 组展示 9 个产品
4. **Foundation Layer** — 三大底座
5. **Design Accordion** — 5 章节设计文档
6. **CTA** — 引导进入产品入口

### 10.3 产品入口页 (PortalPage) — Tab 式产品浏览

按 5 个阶段分 Tab，每个 Tab 展示对应的产品卡片。

### 10.4 产品占位页 (PlaceholderPage) — 统一模板

1. **面包屑** — 首页 > 产品入口 > 当前产品
2. **Hero** — 产品大 Logo + 状态徽章 + 名称 + 描述 + 分类/角色/筛子标签
3. **Features Grid** — 核心功能列表
4. **Coming Soon** — "功能开发中"提示 + 返回按钮
5. **Prev/Next Nav** — 按 flowOrder 的前后产品导航

---

## 第十一章：设计原则总结

1. **Apple 风格** — 大量留白、文字层次分明、动效克制优雅
2. **品牌色 #5DC4B3 用于全局** — 导航栏、返回按钮、品牌相关元素
3. **每个"通"的专属色仅用于内容区** — 如参与通的 #10B981 用于 CTA/进度条/行业标签
4. **禁止纯黑 #000000** — 最深颜色为 #1d1d1f
5. **所有交互元素有 hover/active 状态** — 使用 transition 280ms cubic-bezier
6. **响应式** — mobile / tablet / desktop 全适配
7. **毛玻璃** — 导航栏、筛选条等固定元素使用 backdrop-filter: blur(24px)
8. **Aurora 深色** — 页脚统一使用深色 Aurora 渐变背景
9. **双语全覆盖** — 所有 UI 文本必须有中英文版本

---

## 第十二章：开发新"通"的标准流程

当你在 Genspark 全栈模式开发一个新的"xx通"独立应用时，按以下流程操作：

### 步骤 1: 确认产品定位

从本手册第三章找到对应产品的完整档案，确认：
- 产品 ID、中英文名、简称
- flowOrder、角色、阶段
- 专属颜色（浅色 + 深色）
- 核心功能列表
- 业务逻辑和上下游关系
- **串联模式和独立模式的具体行为**

### 步骤 2: 创建项目

```bash
npm create hono@latest . -- --template cloudflare-pages --install --pm npm
```

### 步骤 3: 实现设计系统

- 复制第六章的完整设计系统到项目中
- Tailwind 配置照抄第 6.11 节
- 品牌色 `#5DC4B3` 用于全局（导航栏、品牌 Logo）
- 该"通"的专属色用于内容区域

### 步骤 4: 实现导航栏和页脚

- 导航栏：简化版（品牌 Logo + 产品名 + 语言切换 + 返回主站）
- 页脚：简化版（品牌 Logo + 版权 + 链接）
- 参考第 7.1 和 7.2 节的规范

### 步骤 5: 实现品牌 Logo

直接使用第 7.3 节的 SVG 代码。

### 步骤 6: 实现页面内容

根据该"通"的业务逻辑设计页面结构。参考现有占位页的面包屑和 Hero 区布局保持一致性。如有 AI 能力需求，参考合约通的实现模式（`c.env.OPENAI_API_KEY` + API 路由）。

### 步骤 7: 实现 i18n

定义内部 TEXT 对象，所有文本用 `{ zh, en }` 格式，通过 `?lang=en` 切换。

### 步骤 8: 实现交互

纯原生 JS (inline script)，不用 React/Vue。典型交互：
- IntersectionObserver 滚动渐现
- 视图切换（卡片/列表）
- 筛选/排序
- 语言切换

### 步骤 9: 构建和部署

```bash
npm run build
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### 步骤 10: 回主站配置跳转

在主站 `data.ts` 中为该产品添加 `externalUrl` 字段，指向独立应用的 URL。

---

## 第十三章：已完成的独立应用参考

### 13.1 合约通 (Contract Connect) — 第一个独立应用

- **仓库**: `SamZheng-Design/MC-Revolution`
- **状态**: 已部署，主站通过 externalUrl 跳转
- **技术栈**: Hono + Vite + Cloudflare Pages + OpenAI API
- **核心实现**:
  - 行业合同模板系统（5 大行业：演唱会、餐饮、零售、医美、教育）
  - AI 自然语言协商助手（用户描述变动 → AI 识别参数 → 生成合同语言）
  - 双页面架构（项目列表页 + 协商界面页）
  - 投资方/融资方视角切换
  - 卡片视图 + 完整合同视图
  - 本地存储 (localStorage) 保存项目状态
- **参考价值**: 项目结构、AI 集成模式、行业模板数据结构、导航/页脚实现、设计系统应用方式

### 13.2 参与通 (Deal Connect) — 第二个独立应用

- **状态**: Prompt 已撰写，待开发
- **页面结构**: Hero + KPI 卡片 + 筛选条 + 项目看板(卡片/列表) + 对比浮层 + 智能推荐 + 意向汇总 + 数据管道可视化 + 核心功能展示 + Y 型流程导航
- **Mock 数据**: 8 条融资项目，覆盖 6 个行业
- **参考价值**: 完整的独立应用 Prompt 模板

---

## 第十四章：产品路线图

### Phase 1：统一入口
**目标**: 建立统一入口和核心"通"
- 身份通（统一入口、身份解锁）
- 发起通（材料采集、Pitch Deck 生成）
- 评估通（筛子工作流）
- 合约通（已独立部署）

### Phase 2：独立搭建各"通"
**目标**: 每个"通"作为独立应用搭建和部署
- 参与通（第二个独立应用，待开发）
- 风控通、条款通、履约通、结算通逐一独立搭建
- 每个"通"搭建后通过 `externalUrl` 从主站跳转

### Phase 3：连接各"通"
**目标**: 实现通间联通
- 各"通"之间通过 API 互相调用（如参与通调用评估通筛子 API）
- 实现事件总线，串联完整 RBF 流程
- 数据在各"通"之间自动流转

### Phase 4：打通基座
**目标**: 统一基础设施
- Account 身份体系打通（统一账户跨所有"通"）
- Data 数据底座打通（统一数据池，跨"通"查询）
- AI Engine 统一调度（模型注册、推理 API、A/B 测试）
- 性能优化、国际化扩展、开放 API

---

## 附录 A：产品名称变更历史

| 原名 | 现名 | 版本 | 说明 |
|------|------|------|------|
| 申请通 (Application Connect) | 发起通 (Originate Connect) | V20 | 强调融资者主动"发起"而非被动"申请" |
| 机会通 (Opportunity Connect) | 参与通 (Deal Connect) | V20 | 强调投资者主动"参与"投资 |

注意：路由 ID 保持不变 (`application`, `opportunity`)，确保 URL 兼容性。

---

## 附录 B：架构分组（DesignPage 使用）

| 分组 | 英文 | 主题色 | 背景色 | 图标 | 包含产品 |
|------|------|--------|--------|------|---------|
| 统一入口 | Unified Entry | #3B82F6 | #DBEAFE | fa-sign-in-alt | identity |
| 融资者路径 | Borrower Path | #F59E0B | #FEF3C7 | fa-upload | application |
| 投资者路径 | Investor Path | #6366F1 | #E0E7FF | fa-filter | assess, risk, opportunity |
| 交易达成 | Deal Making | #8B5CF6 | #EDE9FE | fa-handshake | terms, contract |
| 投后管理 | Post-Investment | #EF4444 | #FEE2E2 | fa-chart-line | settlement, performance |

---

## 附录 C：产品 Logo 图片 URL

| 产品 | Logo URL |
|------|---------|
| 身份通 | https://www.genspark.ai/api/files/s/2UNypAIm |
| 发起通 | https://www.genspark.ai/api/files/s/sGTxJUcV |
| 评估通 | https://www.genspark.ai/api/files/s/UJuchZc6 |
| 风控通 | https://www.genspark.ai/api/files/s/SrCHke7M |
| 参与通 | https://www.genspark.ai/api/files/s/UJuchZc6 |
| 条款通 | https://www.genspark.ai/api/files/s/xnam27pA |
| 合约通 | https://www.genspark.ai/api/files/s/8qGcHXYE |
| 结算通 | https://www.genspark.ai/api/files/s/AONkBaFh |
| 履约通 | https://www.genspark.ai/api/files/s/goK923ZW |

---

## 附录 D：术语表

| 术语 | 说明 |
|------|------|
| **RBF (Revenue-Based Financing)** | 收入分成融资，融资方按月度收入固定比例分成给投资方，直至达到回收上限（通常 1.5-3 倍） |
| **PCF (Projected Cash Flow)** | 预估现金流，条款通核心公式的输入参数 |
| **YITO (Yield-to-Investor)** | 投资者收益率，条款通核心公式的输入参数 |
| **联营期限 (Co-operation Term)** | 投融资双方联合经营的期限，条款通三联动滑块的第三个变量 |
| **"通" (Connect)** | 滴灌通平台的业务模块，每个"通"负责一个特定环节 |
| **串联模式 (Chain Mode)** | 各"通"按完整流程自动串联，数据自动传递 |
| **独立模式 (Standalone Mode)** | 单个"通"独立使用，不依赖上下游 |
| **双模式 (Dual-Mode)** | 既支持串联又支持独立 |
| **筛子模型 (Sieve Model)** | 评估通提供的 AI 筛选工作流，供参与通调用过滤项目 |
| **BP (Business Plan)** | 商业计划书/Pitch Deck |
| **IRR (Internal Rate of Return)** | 内部收益率 |
| **回收上限 (Recovery Cap)** | 投资者可收回的最大金额 |
| **分成比例 (Revenue Share %)** | 投资者从月度收入中分成的百分比 |
| **事件总线 (Event Bus)** | 各"通"之间解耦通信的机制 |
| **AI 原生 (AI-Native)** | 所有核心功能由 AI 驱动 |

---

**本文档终。**

> **使用说明**: 每次在 Genspark 全栈模式开新项目时，把本文档完整粘贴给 AI，然后告诉它"我要做 xx 通"即可。AI 会自动理解整个产品体系、设计系统、技术栈，然后精准开发。
>
> **版本历史**:
> - V1.0 (2026-02-26): 初始版本，从 L1 代码库提取
> - V2.0 (2026-02-26): 整合白皮书 V1.2，新增 RBF 基础知识、双模式设计、详细核心机制、事件驱动数据流、技术栈（Demo + 生产双版本）、产品路线图、术语表、合约通已实现功能详解
> - V2.2 (2026-02-27): 产品负责人确认 12 项问题后的重大更新。身份通重写为以人为单位的万能工作台（三大功能身份+主体认证）；发起通补充 AI 三层输出机制（底稿+材料包+Pitch Deck）；评估通重写为多Agent筛子工作流（投资者自建，pre-set可编辑）；风控通明确为材料复审+验真（企查查等API）；条款通重写为三联动滑块UI（融资金额/分成比例/联营期限）+RBF核心公式；结算通定位为大账本（唯一币种人民币，暂不行使清结算交收）；履约通更新为每日监控频率+回款预警导向；参与通补充Demo阶段内置简化版筛子+通间联通API设计；AI引擎补充Demo阶段统一GPT-4o策略；数据模型补充核心实体关系；路线图改为四阶段渐进式（统一入口→独立搭建→连接各通→打通基座）；Demo阶段各通不通信明确标注
