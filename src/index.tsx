import { Hono } from 'hono'
import { renderer } from './renderer'
import { DesignPage } from './pages/DesignPage'
import { PortalPage } from './pages/PortalPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

const app = new Hono()

app.use(renderer)

// Redirect root to design page
app.get('/', (c) => c.redirect('/design'))

// Page 1: Design philosophy
app.get('/design', (c) => {
  return c.render(<DesignPage />, { title: '产品设计思路 - 滴灌通超级Agent' })
})

// Page 2: Product portal
app.get('/portal', (c) => {
  return c.render(<PortalPage />, { title: '产品入口 - 滴灌通超级Agent' })
})

// Product placeholder pages - 9个通
const productIds = [
  'identity', 'application', 'assess',
  'risk', 'opportunity', 'terms', 'contract',
  'settlement', 'performance'
]

productIds.forEach((id) => {
  app.get(`/${id}`, (c) => {
    return c.render(<PlaceholderPage productId={id} />, { title: `${id} - 滴灌通超级Agent` })
  })
})

export default app
