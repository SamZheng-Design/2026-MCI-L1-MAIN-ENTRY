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

// Homepage — 官网首页
app.get('/', (c) => {
  return c.render(<HomePage />, { title: 'Micro Connect 滴灌通 | 收入分成投资的操作系统' })
})

// Page 1: Design philosophy — 产品设计思路（L1核心页面，不动）
app.get('/design', (c) => {
  return c.render(<DesignPage />, { title: '产品设计思路 - Micro Connect 滴灌通' })
})

// Page 2: Product portal — 产品入口（L1核心页面，不动）
app.get('/portal', (c) => {
  return c.render(<PortalPage />, { title: '产品入口 - Micro Connect 滴灌通' })
})

// Company pages
app.get('/about', (c) => {
  return c.render(<AboutPage />, { title: '关于我们 - Micro Connect 滴灌通' })
})

app.get('/team', (c) => {
  return c.render(<TeamPage />, { title: '核心团队 - Micro Connect 滴灌通' })
})

app.get('/news', (c) => {
  return c.render(<NewsPage />, { title: '新闻动态 - Micro Connect 滴灌通' })
})

app.get('/contact', (c) => {
  return c.render(<ContactPage />, { title: '联系我们 - Micro Connect 滴灌通' })
})

// Product placeholder pages - 9个通（L1核心页面，不动）
const productIds = [
  'identity', 'application', 'assess',
  'risk', 'opportunity', 'terms', 'contract',
  'settlement', 'performance'
]

productIds.forEach((id) => {
  app.get(`/${id}`, (c) => {
    return c.render(<PlaceholderPage productId={id} />, { title: `${id} - Micro Connect 滴灌通` })
  })
})

export default app
