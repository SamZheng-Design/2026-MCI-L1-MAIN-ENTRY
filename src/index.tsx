import { Hono } from 'hono'
import { renderer } from './renderer'
import { getLangFromQuery, tt, t } from './i18n'
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

// Homepage
app.get('/', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(<HomePage lang={lang} />, { title: tt(t.titles.home, lang), lang })
})

// Design philosophy
app.get('/design', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(<DesignPage lang={lang} />, { title: tt(t.titles.design, lang), lang })
})

// Product portal
app.get('/portal', (c) => {
  const lang = getLangFromQuery(c.req.url)
  return c.render(<PortalPage lang={lang} />, { title: tt(t.titles.portal, lang), lang })
})

// Company pages
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

// Product placeholder pages - 9个通
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
