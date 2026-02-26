/**
 * ===================================================================
 * renderer.tsx -- Hono JSX渲染器 & HTML外壳 (V20)
 * ===================================================================
 *
 * 本文件定义全局HTML外壳模板，所有页面共享此渲染器。
 * 由Hono的jsxRenderer中间件加载，为每个页面提供统一的：
 *
 * 1. HTML <head> 配置:
 *    - SEO meta标签(description, OG)
 *    - 移动端适配(viewport, apple-mobile-web-app)
 *    - 主题色(#0a2e2a 深墨绿)
 *
 * 2. 字体加载:
 *    - Inter (英文主字体)
 *    - Montserrat (品牌/Logo字体)
 *    - Noto Sans SC (中文字体)
 *
 * 3. 外部依赖:
 *    - Tailwind CSS (CDN实时编译)
 *    - FontAwesome 6.4 (图标库)
 *    - /static/style.css (自定义设计系统CSS)
 *
 * 4. Tailwind运行时配置:
 *    - 自定义字体族(sans/display/mono)
 *    - 品牌色系(brand: #5DC4B3 墨绿色系)
 *    - Logo色系(logo: bright/bright2/deep)
 *    - 语义色(info/success/warning/error)
 *    - 文字层次色(primary/title/secondary/tertiary/placeholder)
 *    - 容器色(page/card/divider)
 *    - 圆角预设(xs~3xl)
 *
 * 5. 全局JS状态:
 *    - window.__LANG__ = 当前语言('zh'或'en')
 *    - 供客户端脚本读取语言状态
 *
 * --- 多语言支持 ---
 * 渲染器根据lang参数动态设置:
 * - html[lang] 属性: 'zh-CN' 或 'en'
 * - meta description / OG标签: 对应语言文案
 * - page title: 对应语言标题
 */
import { jsxRenderer } from 'hono/jsx-renderer'
import type { Lang } from './i18n'
import { tt, t } from './i18n'

export const renderer = jsxRenderer(({ children, title, lang }) => {
  const l: Lang = (lang as Lang) || 'zh'
  const htmlLang = l === 'en' ? 'en' : 'zh-CN'
  const metaDesc = tt(t.meta.description, l)
  const ogTitle = title || tt(t.meta.ogTitle, l)
  const ogDesc = tt(t.meta.ogDescription, l)

  return (
    <html lang={htmlLang}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="description" content={metaDesc} />
        <meta name="theme-color" content="#0a2e2a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Open Graph */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Micro Connect" />
        
        <title>{title || ogTitle}</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%235DC4B3'/></svg>" />
        
        {/* Fonts — preconnect for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@700;800;900&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Tailwind + Icons */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Design System CSS */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Noto Sans SC', 'sans-serif'],
                  display: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
                  mono: ['Montserrat', 'Inter', 'Futura', 'Helvetica Neue', 'sans-serif']
                },
                colors: {
                  brand: {
                    DEFAULT: '#5DC4B3',
                    light: '#7DD4C7',
                    dark: '#3D8F83',
                    accent: '#49A89A'
                  },
                  logo: {
                    bright: '#2EC4B6',
                    bright2: '#3DD8CA',
                    deep: '#28A696'
                  },
                  semantic: {
                    info: '#32ade6',
                    success: '#34c759',
                    warning: '#ff9f0a',
                    error: '#ff375f'
                  },
                  text: {
                    primary: '#1d1d1f',
                    title: '#1a1a1a',
                    secondary: '#6e6e73',
                    tertiary: '#86868b',
                    placeholder: '#aeaeb2'
                  },
                  surface: {
                    page: '#f5f5f7',
                    card: 'rgba(255, 255, 255, 0.88)',
                    divider: '#f1f5f9'
                  }
                },
                borderRadius: {
                  'xs': '4px',
                  'sm': '8px',
                  'md': '12px',
                  'lg': '16px',
                  'xl': '20px',
                  '2xl': '24px',
                  '3xl': '32px',
                }
              }
            }
          }
        `}} />

        {/* Global language state for client-side scripts */}
        <script dangerouslySetInnerHTML={{ __html: `window.__LANG__ = '${l}';` }} />
      </head>
      <body class="antialiased">
        {children}
      </body>
    </html>
  )
})
