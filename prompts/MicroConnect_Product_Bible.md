# Micro Connect 滴灌通 — AI可读产品手册 (Product Bible)

> **版本**: V20 | **日期**: 2026-02-26
> **用途**: 每次在 Genspark 全栈模式开发新的"xx通"独立应用时，先把本手册丢给 AI 学习。AI 读完后即可理解整个产品体系、设计系统、技术规范，然后精准地开发单个模块。
> **原则**: 本文档所有内容均从现有代码库提取，无任何幻想成分。

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

### 1.2 一句话定义

> 全球首个收入分成投资(RBF, Revenue-Based Financing)的统一操作系统。通过9个AI超级Agent矩阵，为投资者和中小企业提供高效、透明、全生命周期的投融资解决方案。

### 1.3 核心理念

1. **不按赛道造轮子，按流程环节抽象为通用Agent** — 传统RBF平台按行业（餐饮、零售、医美等）分别建系统，导致重复开发和数据孤岛。滴灌通按投资流程的关键环节抽象出9个通用Agent（"通"），每个Agent专注一个核心能力，通过灵活组合覆盖所有赛道。
2. **提纲挈领、以不变应万变** — 9个Agent + 统一底座，覆盖RBF投资全流程，同时保留针对不同赛道和不同投资者偏好的定制能力。
3. **每个"通"可独立部署、灵活组合** — 各Agent是独立微服务，可按需组合。已独立搭建的"通"通过 `externalUrl` 从主站跳转。

### 1.4 品牌标语 (Slogan)

- **中文**: 收入分成投资的基础设施级平台
- **英文**: Infrastructure-Grade RBF Investment Platform
- **闪屏**: One Pipeline · Nine Agents · Infinite Possibilities · 看见世界的机会

---

## 第二章：Y型业务流程（核心创新）

### 2.1 Y型架构总图

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

### 2.4 "无筛子"默认策略

**这是平台最重要的设计规则之一：**

- 如果投资者没有配置任何评估/风控筛子 → 参与通展示**所有**融资项目（全量浏览模式）
- 如果投资者设置了筛子 → 参与通只展示通过全部筛选标准的项目
- 这确保了：融资者的项目一定会被看到（至少出现在没有设筛子的投资者看板里）；投资者可以精准高效地筛选
- 投资者可随时补建筛子，实时刷新筛选结果

### 2.5 补充材料循环

如果风控通在核验中发现问题 → 系统自动通知融资者通过发起通补充材料 → 材料更新后重新触发评估/风控筛选流程 → 形成闭环。

---

## 第三章：9个"通"（Super Agent）完整档案

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
- 完成认证后，根据用户角色自动分流到两条不同路径（Y型分叉点）
- 投资者 → 进入评估通/风控通/参与通路径
- 融资者 → 进入发起通路径

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
- 融资者的专属工具
- 整理、上传经营信息（财务流水、门店信息、经营资质等）
- 系统自动标准化数据，AI生成Pitch Deck
- 标准化后的数据进入投资者的筛选池
- 这是融资者唯一需要做的事——上传真实的经营数据

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
| **特殊标志** | `isFilter: true` (AI筛子组件) |
| **一句话** | 自定义投资标准 · AI评估打分 |

**业务逻辑**:
- 投资者的AI评估**筛子**（筛子1）
- 每个投资者可自定义投资标准和评估模型
- 可设置的评估维度：行业偏好、财务指标（月流水门槛/毛利率/增长率）、经营能力（经营年限/门店数量/团队规模）、AI评估权重
- 自动对所有融资项目进行量化评分，产出评估报告
- 通过评估的项目 → 流入风控通

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
| **特殊标志** | `isFilter: true` (AI筛子组件) |
| **一句话** | 自定义风控规则 · 材料验真 |

**业务逻辑**:
- 投资者的AI风控**筛子**（筛子2）
- 每个投资者可设置自己的风控标准与核验方式
- 可设置的风控规则：POS流水验真/银行流水交叉核验、营业执照有效/无法律纠纷/税务正常、最大可接受杠杆率/最长回收期、黑名单规则（特定区域/行业排除）
- 自动执行合规审查，标记风险等级
- 通过风控的项目 → 流入参与通

**评估通 + 风控通合体说明**:
这两个"通"本质上是投资者用AI搭建的个性化"筛子"，在众多融资者中自动筛出符合自己投资偏好的项目。它们不是简单的表单审批工具，而是每个投资者可以自行配置的AI Agent工作流。

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
- 投资者的统一项目看板
- 展示通过评估通+风控通双重筛选后的融资项目
- **核心规则**: 无筛子 = 展示全量项目（保证融资者曝光）；有筛子 = 只展示通过的项目
- 投资者在此浏览、对比、标记投资意向
- 选中项目后 → 进入条款通

**独立应用状态**: 已规划在 Genspark 全栈模式独立搭建

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
- **Y型汇合点** — 从这里开始，融资者和投资者两条路径汇合
- 基于评估通和风控通的结论，自动生成收入分成方案
- 投融资双方在线协商条款
- 协商完成后 → 进入合约通签署

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
| **独立应用** | **已在Genspark全栈模式独立搭建**，主站通过 `externalUrl` 跳转 |

**业务逻辑**:
- 电子合约签署平台
- 投融资双方在线协同完成合约签署，具有法律效力
- 签署完成后 → 进入结算通

**独立应用部署模式**:
合约通是**第一个**在 Genspark AI Developer 全栈模式独立搭建的"通"。在主站的 `data.ts` 中配置了 `externalUrl`，用户点击后在新标签页打开独立应用。这是后续所有"通"独立搭建的参考模板。

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
- 收入分成自动结算
- 按合约约定自动执行分成
- 透明化资金流转记录

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
- 投后履约监控与数据追踪
- 实时掌握项目运营状况
- 预警机制保障投资安全

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

## 第四章：统一底座（基础设施层）

三大底座支撑所有9个"通"共同运行：

| 底座 | 图标 | 功能 |
|------|------|------|
| **Account 身份体系** | `fa-users` | 统一认证 · 权限隔离 · 角色分流 |
| **Data 数据底座** | `fa-database` | 数据同源 · 清洗治理 · 标准化 |
| **AI 智能引擎** | `fa-brain` | NLP解析 · 量化算法 · 筛子工作流编排 |

技术架构特点：
- **事件驱动**: 所有Agent之间通过事件总线通信，松耦合
- **数据同源**: 融资者上传的数据标准化后存入统一数据池，所有Agent使用一致的数据
- **AI编排**: 为评估通和风控通的个性化AI筛子提供底层能力

---

## 第五章：设计系统（所有"通"必须100%遵守）

### 5.1 品牌色系（全局统一）

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

### 5.2 语义色

```
信息 (info):     #32ade6
成功 (success):  #34c759
警告 (warning):  #ff9f0a
错误 (error):    #ff375f
靛蓝 (indigo):   #6366F1
紫罗兰 (violet): #8B5CF6
```

### 5.3 文字层次（严格遵守，禁止纯黑 #000000）

```
标题/主文字 (primary):  #1d1d1f
标题2 (title):         #1a1a1a
二级文字 (secondary):   #6e6e73
三级文字 (tertiary):    #86868b
占位符 (placeholder):   #aeaeb2
```

**铁律**: 最深颜色为 `#1d1d1f`，永远不使用纯黑 `#000000`。

### 5.4 背景色

```
页面背景 (page):  #f5f5f7
卡片背景 (card):  rgba(255, 255, 255, 0.88)
导航栏 (navbar):  rgba(255, 255, 255, 0.92)
模态页脚:         #f8fafc
分割线 (divider): #f1f5f9
```

### 5.5 边框

```
默认边框:       rgba(0, 0, 0, 0.06)
输入框边框:     rgba(0, 0, 0, 0.12)
hover边框:     rgba(93, 196, 179, 0.2)   — 品牌色半透明
focus边框:     #5DC4B3                     — 品牌色实色
```

### 5.6 圆角

```
xs:   4px     sm:   8px     md:   12px
lg:   16px    xl:   20px    2xl:  24px
3xl:  32px    full: 9999px
```

### 5.7 阴影（Apple 风格多层深度）

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

### 5.8 动效

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

### 5.9 渐变

```css
--gradient-primary:  linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%);
--gradient-cyber:    linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);
--gradient-aurora:   radial-gradient(ellipse 120% 80% at 50% 45%, #13524a 0%, #0f3d36 30%, #0b312c 55%, #082420 80%, #061b18 100%);
--gradient-neon:     linear-gradient(135deg, #32ade6 0%, #5DC4B3 40%, #49A89A 70%, #3D8F83 100%);
--gradient-glass:    linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%);
--gradient-surface:  linear-gradient(180deg, #ffffff 0%, #f8f9fe 100%);
```

### 5.10 字体

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

### 5.11 Tailwind CSS 运行时配置

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

## 第六章：UI组件规范

### 6.1 导航栏 (Navbar)

- **定位**: `sticky top-0 z-50`，高度 56px
- **毛玻璃效果**: `background: rgba(255,255,255,0.92); backdrop-filter: blur(24px) saturate(180%);`
- **底部边线**: `border-bottom: 0.5px solid rgba(0,0,0,0.06)`
- **滚动效果**: 滚动距离 >10px 时添加 `.scrolled` 类，加阴影
- **品牌Logo**: 双圆叠合标识 + "MICRO CONNECT 滴灌通" 文字
- **语言切换**: 按钮切换 中/EN，修改 URL `?lang=en` 参数

**独立应用的Navbar简化版**:
- 左侧：品牌Logo（点击跳主站首页 `https://microconnect.com`）
- 中间：当前产品名（如"参与通 Deal Connect"）
- 右侧：语言切换 + "返回主站"按钮

### 6.2 页脚 (Footer)

- **Aurora深色背景**: `radial-gradient(ellipse 130% 90% at 50% 20%, #0f3d36 0%, #0b312c 40%, #082420 70%, #061b18 100%)`
- **四栏布局**: 品牌区(Logo+描述+社交图标) | 产品链接 | 公司链接 | 联系方式
- **底部**: 免责声明 + 版权 `© 2026 Micro Connect Group` + 法律链接

**独立应用的Footer简化版**:
- 品牌Logo + 产品名 + 版权信息
- 链接：返回主站、隐私政策、服务条款

### 6.3 品牌Logo (SVG)

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

### 6.4 卡片 (Card)

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

### 6.5 滚动渐现动画

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

### 6.6 状态徽章

| 状态 | CSS类 |
|------|-------|
| live (已上线) | `bg-green-100 text-green-700 border-green-200` |
| beta (Beta测试中) | `bg-yellow-100 text-yellow-700 border-yellow-200` |
| coming (即将上线) | `bg-gray-100 text-gray-500 border-gray-200` |

### 6.7 角色徽章

| 角色 | CSS类 |
|------|-------|
| shared (共用) | `bg-blue-100 text-blue-600` |
| borrower (融资者) | `bg-amber-100 text-amber-700` |
| investor (投资者) | `bg-indigo-100 text-indigo-600` |
| collaborative (协同) | `bg-[#5DC4B3]/15 text-[#0d9488]` |

### 6.8 点阵背景图案

```css
.dot-pattern {
  background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
}
```

---

## 第七章：国际化 (i18n) 规范

### 7.1 语言体系

- **支持语言**: 中文 (zh) 和英文 (en)
- **默认语言**: 中文
- **切换机制**: URL 查询参数 `?lang=en`
- **链接生成**: `langLink(href, lang)` — zh 不加参数，en 追加 `?lang=en`

### 7.2 双语类型

```typescript
type Lang = 'zh' | 'en'
type Bi = { zh: string; en: string }       // 双语字符串
type BiArr = { zh: string[]; en: string[] } // 双语数组
```

### 7.3 工具函数

```typescript
tt(obj: Bi, lang: Lang): string       // 取文本
ta(obj: BiArr, lang: Lang): string[]  // 取数组
getLangFromQuery(url: string): Lang    // 从URL解析语言
langLink(href: string, lang: Lang): string  // 生成带语言参数的链接
```

### 7.4 产品信息查询

```typescript
getProductName(id, lang)      // 按ID获取产品名称
getProductDesc(id, lang)      // 按ID获取产品描述
getProductFeatures(id, lang)  // 按ID获取功能标签
getProductShort(id, lang)     // 按ID获取一句话简述
getCategoryName(zhName, lang) // 分类名翻译
getStatusLabel(status, lang)  // 状态标签翻译
getRoleBadge(role, lang)      // 角色徽章翻译
```

### 7.5 独立应用的 i18n

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

### 7.6 金额格式规范

- 中文: `¥68万`
- 英文: `¥680K`

---

## 第八章：技术栈与部署架构

### 8.1 主站技术栈

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

### 8.2 项目初始化命令

```bash
npm create hono@latest webapp -- --template cloudflare-pages --install --pm npm
```

### 8.3 独立应用部署模式

每个"通"可以作为独立的全栈应用搭建和部署。部署后：
1. 在主站 `data.ts` 中为该产品设置 `externalUrl` 字段
2. 主站的产品卡片/链接检测到 `externalUrl` 后，在新标签页 `_blank` 打开独立应用
3. 没有 `externalUrl` 的产品继续走主站内部占位页 `/{id}`

**合约通是第一个这样做的。参与通是第二个。**

### 8.4 项目结构标准

```
webapp/
├── src/
│   ├── index.tsx          # 入口：Hono应用 + 路由注册
│   ├── renderer.tsx       # JSX渲染器 (HTML外壳/head/Tailwind配置)
│   ├── i18n.ts            # 国际化数据层
│   ├── data.ts            # 产品数据层 (Single Source of Truth)
│   ├── pages/             # 页面组件
│   │   ├── HomePage.tsx
│   │   ├── DesignPage.tsx
│   │   ├── PortalPage.tsx
│   │   ├── PlaceholderPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── TeamPage.tsx
│   │   ├── NewsPage.tsx
│   │   └── ContactPage.tsx
│   └── components/        # 共享组件
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── Logos.tsx
├── public/
│   └── static/
│       └── style.css      # 设计系统CSS
├── ecosystem.config.cjs   # PM2配置
├── wrangler.jsonc         # Cloudflare配置
├── vite.config.ts         # Vite构建配置
├── tsconfig.json
└── package.json
```

### 8.5 路由结构

**主页面**:
- `/` → HomePage (叙事式首页)
- `/design` → DesignPage (Y型流程设计思路)
- `/portal` → PortalPage (产品入口)
- `/about` → AboutPage
- `/team` → TeamPage
- `/news` → NewsPage
- `/contact` → ContactPage

**产品占位页** (9个，动态生成):
- `/{productId}` → PlaceholderPage (如 `/identity`, `/assess`, `/risk` 等)
- 有 `externalUrl` 的产品（如合约通）在占位页提示跳转

### 8.6 CDN 依赖

```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- FontAwesome 6.4 -->
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@700;800;900&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

---

## 第九章：主站页面结构概览

### 9.1 首页 (HomePage) — 叙事式产品展示

1. **Splash Screen** — 全屏Logo动画 (One Pipeline / Nine Agents / Infinite Possibilities)
2. **Welcome Modal** — 4页滑动介绍弹窗
3. **Hero Section** — 品牌Banner + "收入分成投资的基础设施级平台"
4. **Flow Overview** — 5阶段流程导航 (锚点跳转)
5. **5个叙事Section** — 每个阶段配插图 + 产品卡片
6. **Dual Channel** — 投资者 vs 融资者双通道价值主张
7. **Foundation** — 三层统一底座展示
8. **Final CTA** — "从身份通开始" 号召行动

### 9.2 设计思路页 (DesignPage)

1. **Hero** — "9个通如何串联成Super Agent"
2. **Y-Flow Diagram** — 完整Y型业务流程图 (5个Phase可视化)
3. **Architecture Grid** — 按5组展示9个产品
4. **Foundation Layer** — 三大底座
5. **Design Accordion** — 5章节设计文档 (背景/Y型流程/筛子/数据流/技术架构)
6. **CTA** — 引导进入产品入口

### 9.3 产品入口页 (PortalPage) — Tab式产品浏览

按5个阶段分Tab，每个Tab展示对应的产品卡片。用户可直接点击进入各产品。

### 9.4 产品占位页 (PlaceholderPage) — 统一模板

1. **面包屑** — 首页 > 产品入口 > 当前产品
2. **Hero** — 产品大Logo + 状态徽章 + 名称 + 描述 + 分类/角色/筛子标签
3. **Features Grid** — 核心功能列表 (编号展示)
4. **Coming Soon** — "功能开发中"提示 + 返回按钮
5. **Prev/Next Nav** — 按flowOrder的前后产品导航

---

## 第十章：设计原则总结

1. **Apple 风格** — 大量留白、文字层次分明、动效克制优雅
2. **品牌色 #5DC4B3 用于全局** — 导航栏、返回按钮、品牌相关元素
3. **每个"通"的专属色仅用于内容区** — 如参与通的 #10B981 用于CTA/进度条/行业标签
4. **禁止纯黑 #000000** — 最深颜色为 #1d1d1f
5. **所有交互元素有 hover/active 状态** — 使用 transition 280ms cubic-bezier
6. **响应式** — mobile / tablet / desktop 全适配
7. **毛玻璃** — 导航栏、筛选条等固定元素使用 backdrop-filter: blur(24px)
8. **Aurora深色** — 页脚统一使用深色Aurora渐变背景
9. **双语全覆盖** — 所有UI文本必须有中英文版本

---

## 第十一章：开发新"通"的标准流程

当你在 Genspark 全栈模式开发一个新的"xx通"独立应用时，按以下流程操作：

### 步骤 1: 确认产品定位

从本手册第三章找到对应产品的完整档案，确认：
- 产品ID、中英文名、简称
- flowOrder、角色、阶段
- 专属颜色（浅色 + 深色）
- 核心功能列表
- 业务逻辑和上下游关系

### 步骤 2: 创建项目

```bash
npm create hono@latest . -- --template cloudflare-pages --install --pm npm
```

### 步骤 3: 实现设计系统

- 复制第五章的完整设计系统到项目中
- Tailwind配置照抄第5.11节
- 品牌色 `#5DC4B3` 用于全局（导航栏、品牌Logo）
- 该"通"的专属色用于内容区域

### 步骤 4: 实现导航栏和页脚

- 导航栏：简化版（品牌Logo + 产品名 + 语言切换 + 返回主站）
- 页脚：简化版（品牌Logo + 版权 + 链接）
- 参考第6.1和6.2节的规范

### 步骤 5: 实现品牌Logo

直接使用第6.3节的SVG代码。

### 步骤 6: 实现页面内容

根据该"通"的业务逻辑设计页面结构。参考现有占位页的面包屑和Hero区布局保持一致性。

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

在主站 `data.ts` 中为该产品添加 `externalUrl` 字段，指向独立应用的URL。

---

## 第十二章：已完成的独立应用参考

### 12.1 合约通 (Contract Connect) — 第一个独立应用

- **状态**: 已部署，主站通过 externalUrl 跳转
- **参考价值**: 项目结构、导航栏/页脚实现、设计系统应用方式

### 12.2 参与通 (Deal Connect) — 第二个独立应用

- **状态**: Prompt已撰写，待开发
- **页面结构**: Hero + KPI卡片 + 筛选条 + 项目看板(卡片/列表) + 对比浮层 + 智能推荐 + 意向汇总 + 数据管道可视化 + 核心功能展示 + Y型流程导航
- **Mock数据**: 8条融资项目，覆盖6个行业
- **参考价值**: 完整的独立应用Prompt模板

---

## 附录A：产品名称变更历史

| 原名 | 现名 | 版本 | 说明 |
|------|------|------|------|
| 申请通 | 发起通 (Originate Connect) | V20 | 强调融资者主动"发起"而非被动"申请" |
| 机会通 | 参与通 (Deal Connect) | V20 | 强调投资者主动"参与"投资 |

注意：路由ID保持不变 (`application`, `opportunity`)，确保URL兼容性。

---

## 附录B：架构分组（DesignPage使用）

| 分组 | 英文 | 主题色 | 背景色 | 图标 | 包含产品 |
|------|------|--------|--------|------|---------|
| 统一入口 | Unified Entry | #3B82F6 | #DBEAFE | fa-sign-in-alt | identity |
| 融资者路径 | Borrower Path | #F59E0B | #FEF3C7 | fa-upload | application |
| 投资者路径 | Investor Path | #6366F1 | #E0E7FF | fa-filter | assess, risk, opportunity |
| 交易达成 | Deal Making | #8B5CF6 | #EDE9FE | fa-handshake | terms, contract |
| 投后管理 | Post-Investment | #EF4444 | #FEE2E2 | fa-chart-line | settlement, performance |

---

## 附录C：产品Logo图片URL

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

**本文档终。**

> 使用说明：每次在 Genspark 全栈模式开新项目时，把本文档完整粘贴给 AI，然后告诉它"我要做 xx通"即可。AI 会自动理解整个产品体系、设计系统、技术栈，然后精准开发。
