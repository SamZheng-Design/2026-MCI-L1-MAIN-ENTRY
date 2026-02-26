# Micro Connect 滴灌通 — AI 可读产品手册 (Product Bible)

> **版本**: V2.0 | **日期**: 2026-02-26
> **来源**: 整合自 L1 主站代码库 (V20)、MC-Revolution 合约通代码库、白皮书 V1.2
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
| **核心功能** | 统一认证、角色识别、投资者/融资者分流、多因素认证、账户安全 |
| **一句话** | 认证登录 · 角色分流 |

**业务逻辑**:
- 所有用户（投资者和融资者）的唯一入口
- 完成认证后，根据用户角色自动分流到两条不同路径（Y 型分叉点）
- 投资者 → 进入评估通/风控通/参与通路径
- 融资者 → 进入发起通路径

**核心机制**:
- **统一认证**: OAuth2.0 标准协议 + 多因素认证 (MFA)，支持企业认证（企业邮箱、工商信息）和个人认证（手机号、身份证）
- **JWT 令牌**: 有效期 24 小时，支持刷新，全平台通行（9 个"通"共享 Token）
- **多租户隔离**: 融资者空间（只能访问自己的数据）、投资者空间（可查看机会但只能访问自己投资的项目详细数据）、运营团队空间（全局管理权限）
- **细粒度权限控制 (RBAC)**: 字段级权限（如：风控通过前投资者看不到融资者联系方式）、操作级权限、时间窗口权限（合同签署后双方才能互看联系方式）
- **单点登录 (SSO)**: 一次登录全平台通行，支持跨域认证（移动端、Web 端、API 调用）

**串联模式**: 所有其他"通"都依赖身份通的认证服务，是全平台的前置依赖
**独立模式**: 可作为独立的企业级身份认证系统使用

**关键输出**:
- JWT 身份令牌 (Token)
- 用户权限清单 (Permission List)
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
| **核心功能** | 材料整理、数据上传、AI生成Pitch Deck、信息标准化、项目宣传 |
| **一句话** | 发起融资 · 上传经营数据 · 生成Pitch Deck |

**业务逻辑**:
- 融资者的专属工具——融资者的"项目发起台"
- 整理、上传经营信息（财务流水、门店信息、经营资质等）
- 系统自动标准化数据，AI 生成 Pitch Deck
- 标准化后的数据进入投资者的筛选池
- 这是融资者唯一需要做的事——上传真实的经营数据

**核心机制**:
- **多种采集方式**: OCR 扫描（营业执照、财务报表照片自动提取）、语音输入（口述转文字 + 结构化）、文件上传（PDF/Word/Excel）、标准化表单
- **AI 结构化处理**: 自动提取基础信息（公司名、成立时间、法人）、融资需求（金额、预期分成、用途）、财务数据（月收入、增长率、成本结构）、行业信息（类别、市场规模、竞争格局）→ 输出标准化 JSON
- **AI 生成 Pitch Deck**: 根据结构化数据自动生成 5-10 页可视化 BP (PDF)，包含公司介绍、产品/服务、财务数据、团队背景、融资需求，支持行业定制模板
- **一键发布**: 融资者确认后发布到投资者筛选池，可选自动触发评估通 AI 预评估

**串联模式**: 发布后自动推送到参与通全量项目池 → 触发评估通
**独立模式**: 融资者仅使用发起通生成 BP，不发布到平台（可导出 PDF 自用，如路演）

**关键输出**:
- 标准化申请包 (JSON 格式)
- Pitch Deck (PDF 格式)
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
| **核心功能** | 自定义投资标准、AI量化评估、尽调报告生成、投资者个性化模型、批量筛选 |
| **特殊标志** | `isFilter: true` (AI 筛子组件) |
| **一句话** | 自定义投资标准 · AI 评估打分 |

**业务逻辑**:
- 投资者的 AI 评估**筛子**（筛子 1）
- 每个投资者可自定义投资标准和评估模型
- 可设置的评估维度：行业偏好、财务指标（月流水门槛/毛利率/增长率）、经营能力（经营年限/门店数量/团队规模）、AI 评估权重
- 自动对所有融资项目进行量化评分，产出评估报告
- 通过评估的项目 → 流入风控通

**核心机制**:
- **多维度评分体系**: 行业维度（市场规模、增长率、竞争格局）、现金流维度（月收入、增长率、稳定性标准差）、团队维度（创始人背景、团队完整度）、市场维度（客户集中度、市场覆盖率），综合评分 0-100 分（加权平均，权重可调）
- **自动生成尽调报告**: PDF + JSON 格式，内含评分雷达图（5 维度可视化）、财务预测（未来 12 个月收入预测）、风险提示、同行对比、投资建议（建议分成比例、回收上限）
- **财务建模**: IRR 计算（基于预测收入、分成比例、回收上限）、回收期预测、敏感性分析（收入下降 10%/20%/30% 时的 IRR 变化）
- **筛子模型库 (核心功能)**: 提供多种预设筛子供参与通调用——高增长模型（月收入增长率 > 20%）、低风险模型（风险评分 < 30）、稳定收益模型（连续 6 个月收入增长，波动率 < 15%）、行业模型（按行业过滤）、自定义筛子（投资者自定义条件）
- **评估通是整个平台的"AI 大脑"**: 不同筛子对应不同投资策略，评估标准透明化，所有评分规则可查看

**与参与通的关系（重要）**: 参与通调用评估通的筛子 API 过滤项目——评估通是 AI 大脑提供模型库，参与通展示过滤结果。

**串联模式**: 接收发起通的项目 → 自动评估 → 推送到风控通 + 条款通
**独立模式**: 投资者手动上传项目材料，获取 AI 评估报告（不进入平台流程）

**关键输出**:
- AI 评估报告 (PDF + JSON 格式)
- 综合评分 (0-100 分)
- 筛子 API 响应（符合条件的项目 ID 列表）
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
- 投资者的 AI 风控**筛子**（筛子 2）
- 每个投资者可设置自己的风控标准与核验方式
- 可设置的风控规则：POS 流水验真/银行流水交叉核验、营业执照有效/无法律纠纷/税务正常、最大可接受杠杆率/最长回收期、黑名单规则（特定区域/行业排除）
- 自动执行合规审查，标记风险等级
- 通过风控的项目 → 流入参与通

**核心机制**:
- **材料真实性核验**: OCR 识别 + 第三方数据源校验（工商信息验证、税务信息验证、征信查询、造假检测——识别 PS 过的财务报表）
- **异常检测**: 收入突增（单月 > 100% 需解释）、收入突降（单月 > 50% 高风险）、客户集中度异常（单一客户 > 50%）、行业黑名单匹配、关联方交易异常
- **风险评分体系**: 综合风险评分 0-100 分（分数越高风险越高）。低风险 0-30（材料真实、收入稳定）、中风险 30-60（部分待确认、波动较大）、高风险 60-100（材料可疑、异常、黑名单匹配）。权重：材料真实性 30% / 收入稳定性 30% / 合规性 20% / 行业风险 20%
- **合规检查**: 资质完整性（营业执照、行业许可证）、法律诉讼记录、失信被执行人、行政处罚记录
- **风控循环机制**: 风控不通过 → 通知融资者补充材料 → 发起通重新提交 → 评估通重新评估 → 风控通重新审核，最多循环 3 次

**评估通 + 风控通合体说明**: 这两个"通"本质上是投资者用 AI 搭建的个性化"筛子"，在众多融资者中自动筛出符合自己投资偏好的项目。它们不是简单的表单审批工具，而是每个投资者可以自行配置的 AI Agent 工作流。

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
- **智能筛选**: 调用评估通的筛子 API 实时过滤。筛选流程：用户选择筛子 → 参与通调用评估通 API → 评估通返回符合条件的项目 ID → 参与通只展示这些项目。切换筛子时列表立即更新
- **项目收藏/关注**: 投资者可收藏项目，系统持续跟踪进展，有重要更新时自动通知
- **快速预览**: 点击项目卡片查看简化版评估报告（评分雷达图、关键财务指标、风险提示），感兴趣后可跳转到评估通查看完整报告

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
| **核心功能** | 收入分成方案、条款协商、方案对比、模拟测算 |
| **特殊标志** | `isCollaborative: true` |
| **一句话** | 收入分成方案 · 条款协商 |

**业务逻辑**:
- **Y 型汇合点** — 从这里开始，融资者和投资者两条路径汇合
- 基于评估通和风控通的结论，自动生成收入分成方案
- 投融资双方在线协商条款
- 协商完成后 → 进入合约通签署

**核心机制**:
- **分成比例计算器**: 基于评估分数动态调整——评分 80-100（优质）→ 建议 5-8%、评分 60-80（中等）→ 建议 8-12%、评分 40-60（较弱）→ 建议 12-15%。回收上限通常为融资金额的 1.5-3 倍（根据风险等级调整）
- **多方案对比 (A/B/C)**: A 方案（激进：分成高、回收上限低）、B 方案（平衡：适中）、C 方案（保守：分成低、回收上限高）。对比维度：回收期、IRR、融资者月度压力、投资者风险敞口
- **双方协商界面**: WebSocket 实时通信，可修改分成比例、回收上限、违约条款、提前终止条款等参数，实时显示修改后的回收期/IRR 等指标变化，保存全部协商历史
- **历史条款库**: 推荐同行业、同规模、同风险等级的历史成功案例，帮助双方快速达成共识

**串联模式**: 接收评估通 + 风控通的结果 → 生成条款 → 双方协商 → 推送给合约通
**独立模式**: 投资者和融资者手动输入参数，使用条款计算器和协商工具（不依赖评估通）

**关键输出**:
- 标准化条款 JSON（分成比例、回收上限、违约条款等）
- 条款对比报告 (A/B/C 方案对比)
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
| **核心功能** | 自动结算、资金流转、账单管理、对账核销 |
| **一句话** | 自动结算 · 资金流转 |

**业务逻辑**:
- 收入分成自动结算——整个 RBF 流程的"收银台"
- 按合约约定自动执行分成
- 透明化资金流转记录

**核心机制**:
- **分成计算 (自动化)**: 基于合同条款（分成比例、回收上限）+ 履约数据（月度收入）。计算公式：若累计回收 < 回收上限 → 分成金额 = 月度收入 × 分成比例；若累计回收 ≥ 回收上限 → 分成 = 0（合同完成，停止分成）。示例：融资 100 万，分成 10%，回收上限 150 万 → 每月按实际收入 × 10% 结算，直至累计达 150 万
- **月度账单生成**: 每月 1 日自动生成 PDF 账单（账单期间、月度收入、分成比例、应分金额、累计回收、预计回收时间），自动发送给双方（邮件 + 站内信）
- **支付流程**: 银行转账 / 在线支付（支付宝、微信、平台代扣），支付凭证上传 + 投资者确认收款
- **对账管理**: 双方对账（融资者确认收入 vs 投资者确认分成），争议处理流程（系统标记"待对账"→ 双方协商 → 重新生成账单）

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
| **核心功能** | 履约监控、数据追踪、预警提示、报表生成 |
| **一句话** | 履约监控 · 预警追踪 |

**业务逻辑**:
- 投后履约监控与数据追踪——投资者的"监控摄像头"
- 实时掌握项目运营状况
- 预警机制保障投资安全
- 履约数据是结算的唯一依据

**核心机制**:
- **收入数据接入**: API 对接（支付宝、微信支付、银行流水、POS 系统，OAuth 授权自动同步）、手动上传（Excel/CSV，自动解析字段）
- **履约指标监控**: 月度收入趋势（折线图）、同比/环比增长率、分成金额自动计算、累计回收金额占回收上限百分比、回收进度预测（基于当前收入趋势）
- **异常预警 (自动触发)**: 收入下滑预警（连续 3 个月下降 > 20%，黄色）、逾期预警（未按时上传数据，每月 5 日前，橙色）、合同违约预警（收入低于约定最低线，红色 → 启动违约处理）
- **可视化 Dashboard**: 收入趋势图 + 预测、履约健康度评分 (0-100)、对比合同预期 vs 实际表现（预期回收期 vs 实际、预期 IRR vs 实际）

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

### 4.4 架构特点总结

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
| 身份通 | 所有"通"的前置认证 | 独立企业级身份认证系统 |
| 发起通 | 发布后推送到筛选池 + 触发评估 | 仅生成 BP 导出 PDF 自用（如路演） |
| 评估通 | 接收项目自动评估 + 推送风控 | 手动上传材料获取 AI 评估报告 |
| 风控通 | 接收评估报告自动风控 | 手动上传材料获取风控报告 |
| 参与通 | 展示筛后项目 + 跳转条款通 | 仅浏览项目（市场调研） |
| 条款通 | 接收评估+风控结果生成条款 | 手动输入参数使用计算器 |
| 合约通 | 接收条款 JSON 自动生成合同 | 上传现有合同 + 自然语言修改 |
| 结算通 | 接收履约数据自动结算 | 手动录入收入和分成规则 |
| 履约通 | 接收合同信息监控履约 | 手动上传收入数据查看分析 |

### 5.4 典型应用场景

**场景 1：完整 RBF 流程 (串联)**
SaaS 企业需要 100 万融资 → 发起通上传材料 → AI 生成 BP → 评估通评分 78 → 风控通评分 25（低风险）→ 条款通生成 A/B/C 方案 → 双方协商确定 10% 分成、150 万回收上限 → 合约通生成合同签署 → 履约通每月监控 → 结算通每月自动结算

**场景 2：独立使用发起通生成 BP**
创业者需要一份专业 BP 参加路演 → 访问发起通（独立模式）→ 上传材料 → AI 生成 10 页可视化 BP → 下载 PDF 自用，不进入后续流程

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

### Phase 1（MVP，3 个月）
**目标**: 验证核心流程可行性
优先级最高的 4 个"通"：身份通、发起通（原申请通）、评估通、合约通

### Phase 2（完整流程，6 个月）
**目标**: 完成完整 RBF 流程
新增 5 个"通"：参与通（原机会通）、风控通、条款通、履约通、结算通

### Phase 3（规模化，12 个月）
**目标**: 支持大规模用户和复杂场景
- AI 模型优化：评估准确率 > 90%
- 性能优化：支持并发 1000+ 项目
- 国际化：支持英文、日文、韩文
- 开放 API：允许第三方平台调用

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
