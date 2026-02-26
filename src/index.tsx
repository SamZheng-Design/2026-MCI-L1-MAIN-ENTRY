/**
 * ===================================================================
 * index.tsx -- Hono应用入口 & 路由注册 (V20)
 * ===================================================================
 *
 * 本文件是整个Web应用的入口点，负责：
 * 1. 创建Hono应用实例
 * 2. 注册JSX渲染中间件(renderer)
 * 3. 注册所有页面路由（7个主页面 + 9个产品占位页）
 *
 * --- 路由结构 ---
 *
 * 主页面路由:
 *   /         → HomePage    (首页，叙事式产品展示)
 *   /design   → DesignPage  (设计思路，Y型流程详解)
 *   /portal   → PortalPage  (产品入口，Tab式产品浏览)
 *   /about    → AboutPage   (关于我们)
 *   /team     → TeamPage    (核心团队)
 *   /news     → NewsPage    (新闻动态)
 *   /contact  → ContactPage (联系我们)
 *
 * 产品占位页路由(动态生成):
 *   /identity    → 身份通
 *   /application → 发起通 (原名"申请通"，V20改名)
 *   /assess      → 评估通
 *   /risk        → 风控通
 *   /opportunity → 参与通 (原名"机会通"，V20改名)
 *   /terms       → 条款通
 *   /contract    → 合约通 (注意：有externalUrl时会跳转外部应用)
 *   /settlement  → 结算通
 *   /performance → 履约通
 *
 * --- 语言切换 ---
 * 所有路由通过 getLangFromQuery(url) 解析 ?lang=en 参数
 * 默认语言为中文(zh)
 */
import { Hono } from 'hono'
import { renderer } from './renderer'
import { getLangFromQuery } from './i18n'
import { tt, t } from './i18n'
import { HomePage } from './pages/HomePage'
import { DesignPage } from './pages/DesignPage'
import { PortalPage } from './pages/PortalPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { AboutPage } from './pages/AboutPage'
import { TeamPage } from './pages/TeamPage'
import { NewsPage } from './pages/NewsPage'
import { ContactPage } from './pages/ContactPage'

const app = new Hono()

// 注册JSX渲染中间件 — 提供HTML外壳(head/meta/CSS/字体/Tailwind配置)
app.use(renderer)

// === 主页面路由 ===
app.get('/', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(<HomePage lang={lang} />, { title: tt(t.titles.home, lang), lang })
})

app.get('/design', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(<DesignPage lang={lang} />, { title: tt(t.titles.design, lang), lang })
})

app.get('/portal', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(<PortalPage lang={lang} />, { title: tt(t.titles.portal, lang), lang })
})

app.get('/about', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(<AboutPage lang={lang} />, { title: tt(t.titles.about, lang), lang })
})

app.get('/team', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(<TeamPage lang={lang} />, { title: tt(t.titles.team, lang), lang })
})

app.get('/news', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(<NewsPage lang={lang} />, { title: tt(t.titles.news, lang), lang })
})

app.get('/contact', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(<ContactPage lang={lang} />, { title: tt(t.titles.contact, lang), lang })
})

// === 产品占位页路由 ===
// 动态生成9个产品的路由，每个产品渲染PlaceholderPage
// 路由ID保持不变(即使中文名已改名)以确保URL兼容性
// 注意：合约通(contract)有externalUrl，PlaceholderPage会提示跳转
const productIds = [
  'identity', 'application', 'assess',
  'risk', 'opportunity', 'terms', 'contract',
  'settlement', 'performance'
]

productIds.forEach((id) => {
  app.get(`/${id}`, (c) => {
    const lang = getLangFromQuery(c.req.url)
    return c.render(<PlaceholderPage productId={id} lang={lang} />, { title: `${id} - Micro Connect`, lang })
  })
})

export default app
