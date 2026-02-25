# 滴灌通超级Agent产品Demo

## 项目概述
- **项目名称**: 滴灌通超级Agent产品Demo
- **目标**: 展示滴灌通RBF超级Agent产品架构的设计思路，提供统一入口访问所有9个"通"的产品模块
- **技术栈**: Hono + TypeScript + Tailwind CSS (CDN) + Cloudflare Pages

## 在线访问
- **预览URL**: https://3000-ixims42i7je8tv9mypq1h-b32ec7bb.sandbox.novita.ai

## 页面路由

### 主页面
| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 重定向 | 自动跳转到 `/design` |
| `/design` | 产品设计思路 | 展示核心架构、9个"通"的分组、统一底座、设计思路手风琴、Y型业务流程图 |
| `/portal` | 产品统一入口 | 3x3产品卡片网格、角色筛选（全部/融资者/投资者）、底座展示 |

### 产品占位页面（9个"通"）
| 路径 | 产品名 | 英文名 | 状态 |
|------|--------|--------|------|
| `/identity` | 身份通 | Identity Connect | 已上线 |
| `/application` | 申请通 | Application Connect | Beta测试中 |
| `/opportunity` | 机会通 | Opportunity Connect | 已上线 |
| `/assess` | 评估通 | Assess Connect | Beta测试中 |
| `/risk` | 风控通 | Risk Connect | 已上线 |
| `/terms` | 条款通 | Terms Connect | 即将上线 |
| `/contract` | 合约通 | Contract Connect | Beta测试中 |
| `/performance` | 履约通 | Performance Connect | 即将上线 |
| `/settlement` | 结算通 | Settlement Connect | 即将上线 |

## 已完成功能
- Page 1: 完整的产品设计思路页面（Hero、架构总览4列网格、连接层、统一底座、5个可展开的设计思路手风琴、Y型业务流程图、CTA按钮）
- Page 2: 产品统一入口页面（Hero、角色筛选过滤器、3x3产品卡片网格、底座展示）
- 9个产品占位页面（Logo、状态标签、核心功能列表、开发中提示）
- 全局导航栏（Logo + 3个导航链接 + 移动端折叠菜单）
- 全局页脚（品牌信息、快速链接、联系方式、社交媒体）
- 响应式设计（桌面/平板/移动端适配）
- 动画效果（卡片悬停、Logo旋转、淡入、手风琴展开）
- 角色筛选功能（全部/融资者/投资者视角过滤）
- 9个3D球体Logo正确展示

## 数据架构
- **数据源**: 静态TypeScript数据层 (`src/data.ts`)
- **产品数据**: 9个产品的完整信息（Logo、描述、分类、角色、状态、功能列表）
- **架构分组**: 4个投资阶段分组（融资前端、项目评估、投资决策、投后管理）
- **底座数据**: 3个基础设施组件（Account、Data、AI）
- **设计思路**: 5个可展开的详细内容模块

## 项目结构
```
webapp/
├── src/
│   ├── index.tsx           # 主路由入口
│   ├── renderer.tsx        # HTML布局模板
│   ├── data.ts             # 产品数据层
│   ├── components/
│   │   ├── Navbar.tsx      # 导航栏组件
│   │   └── Footer.tsx      # 页脚组件
│   └── pages/
│       ├── DesignPage.tsx   # 设计思路页面
│       ├── PortalPage.tsx   # 产品入口页面
│       └── PlaceholderPage.tsx # 占位页面模板
├── ecosystem.config.cjs     # PM2配置
├── wrangler.jsonc           # Cloudflare配置
├── vite.config.ts           # Vite构建配置
└── package.json
```

## 颜色规范
- 主色: `#00C896` (青绿色)
- 融资前端: `#DBEAFE` / `#3B82F6` (蓝色系)
- 项目评估: `#E0E7FF` / `#6366F1` (靛蓝色系)
- 投资决策: `#EDE9FE` / `#8B5CF6` (紫色系)
- 投后管理: `#D1FAE5` / `#10B981` (绿色系)

## 部署
- **平台**: Cloudflare Pages
- **状态**: 开发中
- **最后更新**: 2026-02-25

## 未来开发计划
1. 对接真实产品模块替换占位页面
2. 添加用户认证系统
3. 添加多语言支持（中/英）
4. 接入实际数据源
5. 添加产品使用引导教程
