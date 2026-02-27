# ═══════════════════════════════════════════════════════════════
# 身份通 (Identity Connect) — 独立全栈应用搭建 Prompt
# 版本: V3.0 | 日期: 2026-02-27
# 来源: MicroConnect Product Bible V3.0 自动组装
# ═══════════════════════════════════════════════════════════════

## 你要做什么

从零搭建一个**独立的身份通 (Identity Connect) 全栈 Web 应用**。

这个应用是 Micro Connect 滴灌通平台"9个通"中的**第1个产品**——整个平台的**统一入口**和**路由中枢**。它是一个**以人为单位的万能工作台**，用户注册后可以解锁不同的功能身份（发起身份/参与身份/机构身份），然后被路由到对应的"通"。

**不需要 clone 任何主站代码**。这是一个全新的独立项目。
但是设计风格、颜色、字体、交互必须跟主站保持一致（下面会给你完整的设计系统）。

> 📚 **图书馆比喻**: 身份通 = **办借书证**。走进图书馆，先办证，选择你是作者（融资者）、读者（投资者）还是机构会员。一张证多个身份，随时解锁。

---

## 产品档案

| 字段 | 值 |
|------|-----|
| **ID** | `identity` |
| **flowOrder** | 1 |
| **角色** | shared (共用) |
| **阶段** | entry (统一入口) |
| **状态** | `live` 已上线 |
| **浅色** | `#DBEAFE` |
| **深色** | `#3B82F6` |
| **分类** | 统一入口 / Unified Entry |
| **图标** | `fa-sign-in-alt` |
| **Logo URL** | https://www.genspark.ai/api/files/s/2UNypAIm |
| **核心功能** | 手机号/email注册、功能身份解锁（发起/参与/机构）、主体认证、协作空间、单点登录 |
| **一句话** | 以人为单位的万能工作台 · 解锁身份 · 路由中枢 |

---

## 技术栈

- **框架**: Hono + TypeScript + JSX（SSR 服务端渲染）
- **部署**: Cloudflare Pages（通过 wrangler）
- **样式**: Tailwind CSS (CDN) + 内联 CSS Design Token
- **图标**: FontAwesome 6.4 (CDN)
- **字体**: Inter + Montserrat + Noto Sans SC (Google Fonts)
- **交互**: 纯原生 JS（inline script），不用 React/Vue
- **i18n**: 通过 `?lang=en` URL 参数切换中英文，默认中文
- **AI**: Demo 阶段统一使用 GPT-4o（通过 `c.env.OPENAI_API_KEY`），身份通本身不需要 AI 调用
- **数据存储**: localStorage (客户端) 保存登录状态和用户数据

请用 `npm create hono@latest` 的 `cloudflare-pages` 模板创建项目：
```bash
npm create hono@latest . -- --template cloudflare-pages --install --pm npm
```

---

## 业务逻辑与核心机制

### 身份通在 Y 型业务流程中的位置

```
                    ┌─── 融资者路径 ──→ 发起通(上传数据)
  【身份通(统一入口)】──┤                         ↓ 数据穿越管道
                    └─── 投资者路径 ──→ 评估通 → 风控通 → 参与通(看板)
                                                                ↓
                              Y型汇合点：条款通 → 合约通 → 结算通 → 履约通
```

身份通是**起点**。所有用户从身份通进入，解锁身份后分流到融资者路径或投资者路径。

### 核心机制

**第一大类：功能身份（解锁平台功能）**
- **发起身份 (initiator)**: 认证后可使用发起通，上传经营数据、发起融资申请。对应图书馆的"作者"。
- **参与身份 (participant)**: 认证后可使用参与通，浏览投资项目、搭建评估筛子、参与投资。对应图书馆的"读者"。
- **机构身份 (organization)**: 更高级权限，是一个延展性接口。用于与未来机构使用方（如基金、银行、FA）的系统和规则对接，支持机构级批量操作和自定义工作流。对应图书馆的"机构会员"。

**第二大类：主体认证（进入协作空间）**
- 用户可以认证自己是某个"公司/项目/主体"的一员
- 平台支持按照该"公司/主体"的规则对这个人进行验证
- 验证通过后，该用户可以进入该"公司/主体"的**协作空间**（如：某个投资项目的多方协作工作区）
- 示例：张三认证为"ABC 餐饮连锁"的法人 → 进入 ABC 的协作空间 → 可以管理该公司在平台上的所有融资项目

**技术实现**:
- **认证层级**: 互联网产品级（非金融级），手机号/email → 实名认证（可选）→ 企业主体认证（可选）
- **JWT 令牌**: 有效期 24 小时，支持刷新，全平台通行（9 个"通"共享 Token）
- **权限模型**: 基于角色 (RBAC) + 基于主体的权限隔离，字段级权限（如：风控通过前投资者看不到融资者联系方式）、时间窗口权限（合同签署后双方才能互看联系方式）
- **单点登录 (SSO)**: 一次登录全平台通行，支持跨域认证

### 双模式设计

**串联模式**: 所有其他"通"都依赖身份通的认证服务，是全平台的前置依赖。身份通根据用户已解锁的功能身份，自动分流到对应路径（Y 型分叉点）。
- 发起身份 → 直接进入发起通
- 参与身份 → 直接进入参与通
- 两个身份都有 → 选择身份后进入对应路径

**独立模式**: 可作为独立的企业/团队级身份认证和权限管理系统使用。不依赖其他"通"。

### 关键输出

- JWT 身份令牌 (Token)，包含用户已解锁的功能身份列表
- 用户权限清单 (Permission List)
- 已认证的主体列表及协作空间访问权限
- 登录事件 (`user.login`) / 登出事件 (`user.logout`)

---

## Mock 数据

### TypeScript 类型定义

```typescript
interface User {
  id: string                    // 用户唯一ID
  phone?: string                // 手机号（注册方式之一）
  email?: string                // 邮箱（注册方式之一）
  name: string                  // 用户姓名
  avatar?: string               // 头像URL
  identities: Identity[]        // 已解锁的功能身份
  entities: EntityAuth[]        // 已认证的主体
  createdAt: string             // 注册时间
}

type IdentityRole = 'initiator' | 'participant' | 'organization'

interface Identity {
  role: IdentityRole            // 身份类型
  unlockedAt: string            // 解锁时间
  status: 'active' | 'pending' | 'suspended'
}

interface EntityAuth {
  entityId: string              // 主体ID（公司/项目）
  entityName: string            // 主体名称
  role: string                  // 在主体中的角色（如：法人、财务、管理员）
  verifiedAt: string            // 认证时间
}
```

### 示例数据（3 条，覆盖典型用户类型）

```typescript
const mockUsers: User[] = [
  // 用户1: 融资者 + 投资者双身份，已认证一个公司主体
  {
    id: 'u-001',
    phone: '138****1234',
    name: '张三',
    avatar: undefined,
    identities: [
      { role: 'initiator', unlockedAt: '2026-01-15', status: 'active' },
      { role: 'participant', unlockedAt: '2026-02-01', status: 'active' }
    ],
    entities: [
      { entityId: 'e-001', entityName: 'ABC 餐饮连锁', role: '法人代表', verifiedAt: '2026-01-20' }
    ],
    createdAt: '2026-01-10'
  },
  // 用户2: 专业投资者 + 机构身份，已认证基金主体
  {
    id: 'u-002',
    email: 'investor@fund.com',
    name: '李四',
    avatar: undefined,
    identities: [
      { role: 'participant', unlockedAt: '2026-01-08', status: 'active' },
      { role: 'organization', unlockedAt: '2026-01-10', status: 'active' }
    ],
    entities: [
      { entityId: 'e-010', entityName: '新锐资本', role: '投资总监', verifiedAt: '2026-01-12' }
    ],
    createdAt: '2026-01-05'
  },
  // 用户3: 新注册的融资者，尚未认证任何主体
  {
    id: 'u-003',
    phone: '139****5678',
    name: '王五',
    avatar: undefined,
    identities: [
      { role: 'initiator', unlockedAt: '2026-02-20', status: 'active' }
    ],
    entities: [],
    createdAt: '2026-02-18'
  }
]
```

### Demo 简化说明

- 注册/登录**不接真实 SMS/邮箱服务**，验证码固定为 `123456`
- JWT 使用硬编码 secret（如 `'micro-connect-demo-secret-2026'`）
- 身份解锁**点击即生效**，无需审核流程
- 主体认证**提交即通过**（占位页，后续细化）
- 用户数据存储在 **localStorage**（Demo 不需要数据库）

---

## 页面布局

### 页面 1: 登录/注册页（首页 `/`）

```
┌──────────────────────────────────────────────────────────┐
│  ┌─ Hero 区 ──────────────────────────────────────────┐  │
│  │  品牌 Logo (SVG 双圆标识)                            │  │
│  │  "欢迎来到滴灌通"                                    │  │
│  │  "收入分成投资的基础设施级平台"                        │  │
│  │  📚 办借书证 — 选择你的身份，开启投融资之旅             │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─ 登录/注册表单卡片 ──────────────────────────────────┐ │
│  │  [Tab: 手机号登录] [Tab: 邮箱登录]                     │ │
│  │                                                       │ │
│  │  手机号 Tab:                                          │ │
│  │    ┌─ 手机号输入框 ──────────┐ ┌ 获取验证码 ┐          │ │
│  │    └─────────────────────────┘ └──────────┘          │ │
│  │    ┌─ 验证码输入框 ──────────┐                        │ │
│  │    └─────────────────────────┘                        │ │
│  │                                                       │ │
│  │  邮箱 Tab:                                           │ │
│  │    ┌─ 邮箱输入框 ────────────┐                        │ │
│  │    └─────────────────────────┘                        │ │
│  │    ┌─ 密码输入框 ────────────┐                        │ │
│  │    └─────────────────────────┘                        │ │
│  │                                                       │ │
│  │  ┌──────────── 登录 / 注册 ────────────┐              │ │
│  │  └─────────────────────────────────────┘              │ │
│  │  没有账号？点此注册 / 已有账号？点此登录                 │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌─ Footer（简化版）────────────────────────────────────┐ │
│  │  品牌 Logo + © 2026 Micro Connect Group              │ │
│  └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

**交互逻辑**:
- 首次访问且未登录 → 显示此页面
- 已登录（localStorage 有 token） → 自动跳转到工作台 `/dashboard`
- Tab 切换手机号/邮箱登录模式
- "获取验证码"按钮点击后显示 60s 倒计时（Demo 固定返回成功）
- 登录/注册共用同一表单，后端自动判断：手机号/邮箱已存在 → 登录；不存在 → 注册
- 登录成功 → 存储 JWT Token 到 localStorage → 跳转 `/dashboard`

### 页面 2: 个人工作台（`/dashboard`，登录后主页）

```
┌──────────────────────────────────────────────────────────┐
│  Navbar（简化版）                                         │
│  [Logo MICRO CONNECT 滴灌通] [身份通 Identity Connect] [中/EN] [退出登录] │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─ 欢迎区 ───────────────────────────────────────────┐  │
│  │  👤 头像占位 + "你好，张三" + 注册时间 2026-01-10     │  │
│  │  "管理你的身份，开启不同的工作流"                       │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─ 身份卡片区 (3 列网格) ─────────────────────────────┐  │
│  │                                                      │  │
│  │  ┌── 发起身份 ──┐  ┌── 参与身份 ──┐  ┌── 机构身份 ──┐ │  │
│  │  │ 🚀 发起身份   │  │ 🔍 参与身份   │  │ 🏢 机构身份   │ │  │
│  │  │ Initiator    │  │ Participant  │  │ Organization │ │  │
│  │  │              │  │              │  │              │ │  │
│  │  │ 已解锁 ✓     │  │ 已解锁 ✓     │  │ 未解锁       │ │  │
│  │  │ 2026-01-15   │  │ 2026-02-01   │  │              │ │  │
│  │  │              │  │              │  │              │ │  │
│  │  │ [进入发起通]  │  │ [进入参与通]  │  │ [解锁身份]   │ │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌─ 主体认证区 ──────────────────────────────────────────┐ │
│  │  "已认证主体"                                         │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │ 🏬 ABC 餐饮连锁 | 法人代表 | 2026-01-20 | [进入协作空间] │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │  [+ 认证新主体]                                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌─ 快捷导航 (9 个通的图标网格) ────────────────────────┐  │
│  │                                                      │  │
│  │  🔵身份通  🟡发起通  🟣评估通  🟣风控通  🟢参与通      │  │
│  │  🟣条款通  🟣合约通  🔴结算通  🔴履约通               │  │
│  │                                                      │  │
│  │  已解锁身份对应的通 → 高亮可点击                        │  │
│  │  未解锁身份对应的通 → 灰色 + 提示"需先解锁xx身份"       │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                          │
│  Footer（简化版）                                         │
└──────────────────────────────────────────────────────────┘
```

**交互逻辑**:
- 未登录访问 `/dashboard` → 重定向到 `/`
- 身份卡片根据 `user.identities` 动态渲染：已解锁的显示绿色 ✓ + CTA 按钮；未解锁的显示灰色 + "解锁"按钮
- "解锁身份"点击后：Demo 阶段直接解锁（无审核），页面刷新显示新状态
- "进入发起通"/"进入参与通"点击后：**Demo 阶段显示 Toast 提示"即将跳转到 xx 通（独立应用开发中）"**，不做真实跳转
- 快捷导航的 9 个通：根据已解锁身份判断可达性
  - 发起身份 → 解锁发起通
  - 参与身份 → 解锁评估通、风控通、参与通
  - 机构身份 → 解锁全部
  - 条款通、合约通、结算通、履约通 → 需要任一身份即可（协同模块）
- "退出登录" → 清除 localStorage → 跳转 `/`

### 页面 3: 主体认证页（`/entity-verify`，占位页，后续细化）

```
┌──────────────────────────────────────────────────────────┐
│  Navbar                                                  │
├──────────────────────────────────────────────────────────┤
│  面包屑: 身份通 > 主体认证                                │
│                                                          │
│  ┌─ 认证表单卡片 ─────────────────────────────────────┐   │
│  │  "认证你的公司/项目主体"                              │   │
│  │                                                     │   │
│  │  公司/项目名称:  ┌───────────────────────┐           │   │
│  │                  └───────────────────────┘           │   │
│  │  统一社会信用代码: ┌───────────────────────┐          │   │
│  │                   └───────────────────────┘          │   │
│  │  你在该主体的角色: ┌─ 下拉选择 ────────────┐          │   │
│  │                   │ 法人代表/财务/管理员/其他│          │   │
│  │                   └───────────────────────┘          │   │
│  │  上传证明材料:     ┌─ 拖拽上传区 ──────────┐          │   │
│  │                   │  营业执照/授权书等      │          │   │
│  │                   └───────────────────────┘          │   │
│  │                                                     │   │
│  │  ┌──────────── 提交认证 ────────────┐                │   │
│  │  └──────────────────────────────────┘                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                          │
│  Footer                                                  │
└──────────────────────────────────────────────────────────┘
```

**交互逻辑**:
- Demo 阶段：提交即通过，返回 `/dashboard` 并显示新认证的主体
- 后续细化：接入真实验证流程（企查查 API 等）

---

## API 路由

### 认证相关

```
POST /api/auth/register
  描述: 注册新用户
  请求: { phone?: string, email?: string, verifyCode?: string, password?: string, name: string }
  响应: { success: true, token: string, user: User }
  逻辑: Demo 阶段验证码固定 123456；邮箱密码不做复杂度校验；自动生成 JWT

POST /api/auth/login
  描述: 用户登录
  请求: { phone?: string, email?: string, verifyCode?: string, password?: string }
  响应: { success: true, token: string, user: User }
  逻辑: 匹配 mockUsers 中的手机号/邮箱；Demo 阶段验证码固定 123456

POST /api/auth/verify-code
  描述: 发送验证码
  请求: { phone: string }
  响应: { success: true, message: '验证码已发送' }
  逻辑: Demo 阶段固定返回成功，不发送真实短信
```

### 用户信息

```
GET /api/user/profile
  描述: 获取当前用户信息（需 Authorization header）
  请求: Headers: { Authorization: 'Bearer <token>' }
  响应: { success: true, user: User }
  逻辑: 从 JWT 解析 userId，返回完整用户信息

POST /api/user/unlock
  描述: 解锁功能身份
  请求: { role: 'initiator' | 'participant' | 'organization' }
  响应: { success: true, identity: Identity }
  逻辑: Demo 阶段直接解锁，写入 user.identities
```

### 主体认证

```
POST /api/entity/verify
  描述: 提交主体认证
  请求: { entityName: string, creditCode: string, role: string }
  响应: { success: true, entity: EntityAuth }
  逻辑: Demo 阶段提交即通过，写入 user.entities

GET /api/entity/list
  描述: 获取已认证主体列表
  请求: Headers: { Authorization: 'Bearer <token>' }
  响应: { success: true, entities: EntityAuth[] }
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

### 身份通专属色

```
浅色:   #DBEAFE  (功能卡片浅色底纹、功能区背景)
深色:   #3B82F6  (CTA按钮、功能标题/图标、进度条/标签/徽章)
```

**⚠️ 关键规则 — 颜色使用铁律**:
- 品牌色 `#5DC4B3` 用于**全部全局元素**：导航栏链接、品牌 Logo、返回按钮、hover 边框、focus 边框、卡片 hover 阴影、渐变等
- 身份通专属色 `#3B82F6` **仅限以下 4 种场景**：
  1. CTA 按钮背景色
  2. 功能区标题和图标色
  3. 身份卡片的浅色背景底纹（用 `#DBEAFE`）
  4. 进度条/标签/徽章等功能性色块
- **绝不用 `#3B82F6` 替换任何全局 Design Token**（边框、阴影、渐变等全部保持品牌色 `#5DC4B3`）

### 语义色

```
信息 (info):     #32ade6
成功 (success):  #34c759    (身份已解锁标记)
警告 (warning):  #ff9f0a
错误 (error):    #ff375f    (登录失败)
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

```

### 字体

```
正文字体栈:
  -apple-system, BlinkMacSystemFont, 'Inter', 'SF Pro Display',
  'Segoe UI', Roboto, 'Noto Sans SC', sans-serif

品牌/Logo字体栈:
  'Montserrat', 'Inter', 'Futura', 'Helvetica Neue', sans-serif
```

### Tailwind CSS 运行时配置

所有页面的 `<head>` 中必须包含：

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

## UI 组件

### 导航栏 (Navbar) — 独立应用简化版

- **定位**: `sticky top-0 z-50`，高度 56px
- **毛玻璃效果**: `background: rgba(255,255,255,0.92); backdrop-filter: blur(24px) saturate(180%);`
- **底部边线**: `border-bottom: 0.5px solid rgba(0,0,0,0.06)`
- **滚动效果**: 滚动距离 >10px 时添加 `.scrolled` 类，加阴影
- **布局**:
  - 左侧：品牌 Logo（SVG 双圆标识，点击跳主站首页）
  - 中间：**"身份通 Identity Connect"**（身份通专属色 #3B82F6）
  - 右侧：语言切换 (中/EN) + "返回主站"按钮（品牌色 #5DC4B3）
- **登录后追加**: 用户名 + "退出登录"按钮

### 页脚 (Footer) — 独立应用简化版

- **Aurora 深色背景**: `radial-gradient(ellipse 130% 90% at 50% 20%, #0f3d36 0%, #0b312c 40%, #082420 70%, #061b18 100%)`
- **内容**: 品牌 Logo + "身份通 Identity Connect" + 版权 `© 2026 Micro Connect Group`
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
live (已上线):        bg-green-100 text-green-700 border-green-200
beta (Beta测试中):    bg-yellow-100 text-yellow-700 border-yellow-200
coming (即将上线):    bg-gray-100 text-gray-500 border-gray-200
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

### 双语文本对象

```typescript
const TEXT = {
  nav: {
    title: { zh: '身份通', en: 'Identity Connect' },
    subtitle: { zh: '以人为单位的万能工作台', en: 'Universal Personal Workstation' },
    backToMain: { zh: '返回主站', en: 'Back to Main' },
    logout: { zh: '退出登录', en: 'Logout' },
    langSwitch: { zh: 'EN', en: '中' }
  },
  auth: {
    welcome: { zh: '欢迎来到滴灌通', en: 'Welcome to Micro Connect' },
    subtitle: { zh: '收入分成投资的基础设施级平台', en: 'Infrastructure-Grade RBF Investment Platform' },
    libraryHint: { zh: '📚 办借书证 — 选择你的身份，开启投融资之旅', en: '📚 Get your library card — Choose your identity, start your journey' },
    phoneTab: { zh: '手机号登录', en: 'Phone Login' },
    emailTab: { zh: '邮箱登录', en: 'Email Login' },
    phonePlaceholder: { zh: '请输入手机号', en: 'Enter phone number' },
    codePlaceholder: { zh: '请输入验证码', en: 'Enter verification code' },
    getCode: { zh: '获取验证码', en: 'Get Code' },
    emailPlaceholder: { zh: '请输入邮箱', en: 'Enter email' },
    passwordPlaceholder: { zh: '请输入密码', en: 'Enter password' },
    namePlaceholder: { zh: '请输入姓名', en: 'Enter your name' },
    loginBtn: { zh: '登录', en: 'Login' },
    registerBtn: { zh: '注册', en: 'Register' },
    noAccount: { zh: '没有账号？点此注册', en: "Don't have an account? Register" },
    hasAccount: { zh: '已有账号？点此登录', en: 'Already have an account? Login' }
  },
  dashboard: {
    greeting: { zh: '你好', en: 'Hello' },
    manageIdentity: { zh: '管理你的身份，开启不同的工作流', en: 'Manage your identities, unlock different workflows' },
    identitySection: { zh: '功能身份', en: 'Functional Identities' },
    entitySection: { zh: '已认证主体', en: 'Verified Entities' },
    quickNav: { zh: '快捷导航', en: 'Quick Navigation' },
    unlocked: { zh: '已解锁', en: 'Unlocked' },
    locked: { zh: '未解锁', en: 'Not Unlocked' },
    unlock: { zh: '解锁身份', en: 'Unlock' },
    enter: { zh: '进入', en: 'Enter' },
    addEntity: { zh: '+ 认证新主体', en: '+ Verify New Entity' },
    enterWorkspace: { zh: '进入协作空间', en: 'Enter Workspace' }
  },
  identities: {
    initiator: {
      name: { zh: '发起身份', en: 'Initiator' },
      desc: { zh: '上传经营数据，发起融资申请', en: 'Upload data, initiate financing' },
      icon: 'fa-rocket',
      targetConnect: { zh: '发起通', en: 'Originate Connect' }
    },
    participant: {
      name: { zh: '参与身份', en: 'Participant' },
      desc: { zh: '浏览投资项目，搭建评估筛子', en: 'Browse deals, build assessment sieves' },
      icon: 'fa-search',
      targetConnect: { zh: '参与通', en: 'Deal Connect' }
    },
    organization: {
      name: { zh: '机构身份', en: 'Organization' },
      desc: { zh: '机构级批量操作和自定义工作流', en: 'Institutional batch operations & custom workflows' },
      icon: 'fa-building',
      targetConnect: { zh: '全部通', en: 'All Connects' }
    }
  },
  connects: [
    { id: 'identity', name: { zh: '身份通', en: 'Identity' }, color: '#3B82F6', icon: 'fa-id-card', requires: [] },
    { id: 'application', name: { zh: '发起通', en: 'Originate' }, color: '#F59E0B', icon: 'fa-upload', requires: ['initiator'] },
    { id: 'assess', name: { zh: '评估通', en: 'Assess' }, color: '#6366F1', icon: 'fa-filter', requires: ['participant'] },
    { id: 'risk', name: { zh: '风控通', en: 'Risk' }, color: '#6366F1', icon: 'fa-shield-alt', requires: ['participant'] },
    { id: 'opportunity', name: { zh: '参与通', en: 'Deal' }, color: '#10B981', icon: 'fa-handshake', requires: ['participant'] },
    { id: 'terms', name: { zh: '条款通', en: 'Terms' }, color: '#8B5CF6', icon: 'fa-sliders-h', requires: ['initiator', 'participant'] },
    { id: 'contract', name: { zh: '合约通', en: 'Contract' }, color: '#8B5CF6', icon: 'fa-file-contract', requires: ['initiator', 'participant'] },
    { id: 'settlement', name: { zh: '结算通', en: 'Settlement' }, color: '#EF4444', icon: 'fa-calculator', requires: ['initiator', 'participant'] },
    { id: 'performance', name: { zh: '履约通', en: 'Performance' }, color: '#EF4444', icon: 'fa-chart-line', requires: ['initiator', 'participant'] }
  ],
  entity: {
    title: { zh: '主体认证', en: 'Entity Verification' },
    companyName: { zh: '公司/项目名称', en: 'Company/Project Name' },
    creditCode: { zh: '统一社会信用代码', en: 'Unified Credit Code' },
    yourRole: { zh: '你在该主体的角色', en: 'Your Role in Entity' },
    roles: {
      legal: { zh: '法人代表', en: 'Legal Representative' },
      finance: { zh: '财务', en: 'Finance' },
      admin: { zh: '管理员', en: 'Administrator' },
      other: { zh: '其他', en: 'Other' }
    },
    uploadProof: { zh: '上传证明材料', en: 'Upload Proof Documents' },
    submit: { zh: '提交认证', en: 'Submit Verification' }
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
identity-connect/
├── src/
│   ├── index.tsx          # Hono应用入口 + API路由 + 3个页面HTML
│   └── renderer.tsx       # JSX渲染器 (HTML壳 + head + Tailwind配置)
├── public/
│   └── static/
│       └── style.css      # 自定义CSS (Design Token变量)
├── ecosystem.config.cjs   # PM2配置
├── wrangler.jsonc         # Cloudflare配置
├── vite.config.ts         # Vite构建配置
├── tsconfig.json
└── package.json
```

### 步骤 3: 实现顺序

1. **renderer.tsx** — HTML 外壳 + `<head>`（Tailwind CDN + 配置 + Google Fonts + FontAwesome）
2. **CSS Design Tokens** — `public/static/style.css`（阴影、动效、渐变变量）
3. **API 路由** — 7 个接口（auth/register, auth/login, auth/verify-code, user/profile, user/unlock, entity/verify, entity/list）
4. **登录/注册页** — `GET /` 渲染完整 HTML + inline JS 处理表单提交和 Tab 切换
5. **工作台页** — `GET /dashboard` 渲染工作台 + inline JS 处理身份解锁和导航
6. **主体认证页** — `GET /entity-verify` 渲染认证表单 + inline JS 处理提交
7. **Navbar + Footer** — 独立应用简化版，所有页面复用
8. **i18n** — TEXT 对象 + `?lang=en` 切换
9. **滚动动画** — IntersectionObserver + reveal 类

### 步骤 4: 路由结构

```typescript
// 页面路由
app.get('/', (c) => { /* 登录/注册页 */ })
app.get('/dashboard', (c) => { /* 个人工作台 */ })
app.get('/entity-verify', (c) => { /* 主体认证 */ })

// API 路由
app.post('/api/auth/register', (c) => { /* 注册 */ })
app.post('/api/auth/login', (c) => { /* 登录 */ })
app.post('/api/auth/verify-code', (c) => { /* 发送验证码 */ })
app.get('/api/user/profile', (c) => { /* 获取用户信息 */ })
app.post('/api/user/unlock', (c) => { /* 解锁身份 */ })
app.post('/api/entity/verify', (c) => { /* 主体认证 */ })
app.get('/api/entity/list', (c) => { /* 主体列表 */ })
```

### 步骤 5: 构建和部署

```bash
npm run build
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### 步骤 6: 回主站配置跳转

在主站 `data.ts` 中为身份通添加 `externalUrl` 字段，指向独立应用的部署 URL。

---

## 设计原则（必须遵守）

1. **Apple 风格** — 大量留白、文字层次分明、动效克制优雅
2. **品牌色 #5DC4B3 用于全局** — 导航栏、返回按钮、品牌相关元素
3. **身份通专属色 #3B82F6 仅用于 4 种场景** — CTA 按钮、功能标题/图标、卡片浅色底纹(#DBEAFE)、进度条/标签/徽章。**所有 Design Token（边框、阴影、渐变）保持品牌色 #5DC4B3 不变**
4. **禁止纯黑 #000000** — 最深颜色为 #1d1d1f
5. **所有交互元素有 hover/active 状态** — 使用 transition 280ms cubic-bezier
6. **响应式** — mobile / tablet / desktop 全适配
7. **毛玻璃** — 导航栏使用 backdrop-filter: blur(24px)
8. **Aurora 深色** — 页脚统一使用深色 Aurora 渐变背景
9. **双语全覆盖** — 所有 UI 文本必须有中英文版本

---

## 注意事项

1. **身份通是唯一一个所有用户都必须经过的"通"** — 是平台的大门
2. **Demo 阶段各"通"之间不通信** — "进入发起通"等按钮只显示 Toast 提示，不做真实跳转
3. **数据存储在 localStorage** — 注册的用户、解锁的身份、认证的主体都存在浏览器本地
4. **JWT 仅在 Demo 内有效** — 不需要考虑跨域、跨"通"共享 Token 的问题
5. **主体认证页是占位页** — 基本表单和提交功能即可，后续细化
6. **9 个通的快捷导航** — 使用各通的专属色和 FontAwesome 图标，灰色表示不可达
