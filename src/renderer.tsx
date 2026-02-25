import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || '滴灌通超级Agent产品Demo'}</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%234ECDC4'/></svg>" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Inter', 'Noto Sans SC', 'sans-serif'],
                  display: ['Inter', 'Futura', 'Helvetica Neue', 'sans-serif']
                }
              }
            }
          }
        `}} />
        <style dangerouslySetInnerHTML={{ __html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', 'Noto Sans SC', sans-serif; }
          
          /* Card Hover - 品牌teal阴影 */
          .card-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
          .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(78,205,196,0.15); }
          
          /* Portal Card - teal边框 */
          .portal-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
          .portal-card:hover { border-color: #4ECDC4 !important; transform: translateY(-6px); box-shadow: 0 20px 60px rgba(78,205,196,0.2); }
          
          /* Fade animation */
          .fade-in { animation: fadeIn 0.6s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          
          /* Accordion */
          .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
          .accordion-content.open { max-height: 2000px; }
          
          /* Dot pattern background */
          .dot-pattern { background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px); background-size: 20px 20px; }
          
          /* Line clamp */
          .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
          
          /* Smooth scroll */
          html { scroll-behavior: smooth; }
        `}} />
      </head>
      <body class="bg-gray-50 text-gray-800 antialiased">
        {children}
      </body>
    </html>
  )
})
