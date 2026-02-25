import { Hono } from 'hono'
import { renderer } from './renderer'
import { HomePage } from './pages/HomePage'
import { DesignPage } from './pages/DesignPage'
import { PortalPage } from './pages/PortalPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { AboutPage } from './pages/AboutPage'
import { TeamPage } from './pages/TeamPage'
import { NewsPage } from './pages/NewsPage'
import { ContactPage } from './pages/ContactPage'

const app = new Hono()

app.use(renderer)

// ════════ Landing / Home ════════
app.get('/', (c) => {
  return c.render(<HomePage />, { title: 'Micro Connect | 收入分成投资基础设施平台' })
})

// ════════ L1 Core Pages (UNCHANGED) ════════
// Page 1: Design philosophy
app.get('/design', (c) => {
  return c.render(<DesignPage />, { title: '产品设计思路 - Micro Connect' })
})

// Page 2: Product portal
app.get('/portal', (c) => {
  return c.render(<PortalPage />, { title: '产品入口 - Micro Connect' })
})

// Product placeholder pages - 9个通
const productIds = [
  'identity', 'application', 'assess',
  'risk', 'opportunity', 'terms', 'contract',
  'settlement', 'performance'
]

productIds.forEach((id) => {
  app.get(`/${id}`, (c) => {
    return c.render(<PlaceholderPage productId={id} />, { title: `${id} - Micro Connect` })
  })
})

// ════════ Corporate Pages (新增骨架) ════════
app.get('/about', (c) => {
  return c.render(<AboutPage />, { title: '关于我们 - Micro Connect' })
})

app.get('/team', (c) => {
  return c.render(<TeamPage />, { title: '核心团队 - Micro Connect' })
})

app.get('/news', (c) => {
  return c.render(<NewsPage />, { title: '新闻动态 - Micro Connect' })
})

app.get('/contact', (c) => {
  return c.render(<ContactPage />, { title: '联系我们 - Micro Connect' })
})

export default app
