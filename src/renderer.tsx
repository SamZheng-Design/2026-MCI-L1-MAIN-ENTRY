import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || '滴灌通超级Agent产品Demo'}</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%235DC4B3'/></svg>" />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Noto Sans SC', 'sans-serif'],
                  display: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'SF Pro Display', 'Segoe UI', 'sans-serif']
                },
                colors: {
                  brand: {
                    DEFAULT: '#5DC4B3',
                    light: '#7DD4C7',
                    dark: '#3D8F83',
                    accent: '#49A89A'
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
        <style dangerouslySetInnerHTML={{ __html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
        `}} />
      </head>
      <body class="antialiased">
        {children}
      </body>
    </html>
  )
})
