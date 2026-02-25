import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || '滴灌通超级Agent产品Demo'}</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💧</text></svg>" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: { DEFAULT: '#00C896', light: '#0DE3A5', dark: '#00A876' },
                  mc: {
                    blue: '#DBEAFE', indigo: '#E0E7FF',
                    purple: '#EDE9FE', green: '#D1FAE5'
                  }
                },
                fontFamily: {
                  sans: ['Inter', 'Noto Sans SC', 'sans-serif'],
                  chinese: ['Noto Sans SC', 'sans-serif']
                }
              }
            }
          }
        `}} />
        <style dangerouslySetInnerHTML={{ __html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', 'Noto Sans SC', sans-serif; }
          .card-hover { transition: all 0.3s ease; }
          .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,200,150,0.15); }
          .logo-hover { transition: transform 0.3s ease; }
          .logo-hover:hover { transform: rotate(8deg) scale(1.05); }
          .fade-in { animation: fadeIn 0.6s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
          .accordion-content.open { max-height: 2000px; }
          .dot-pattern { background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px); background-size: 20px 20px; }
          .gradient-border { border-image: linear-gradient(135deg, #00C896, #3B82F6) 1; }
          .nav-active { color: #00C896; border-bottom: 2px solid #00C896; }
          .portal-card { border: 2px solid transparent; transition: all 0.3s ease; }
          .portal-card:hover { border-color: #00C896; transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,200,150,0.2); }
          .group-line { position: relative; }
          .group-line::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, transparent, #e5e7eb, transparent); }
          /* smooth scroll */
          html { scroll-behavior: smooth; }
        `}} />
      </head>
      <body class="bg-gray-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  )
})
