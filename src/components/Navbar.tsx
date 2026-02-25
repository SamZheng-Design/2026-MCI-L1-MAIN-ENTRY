import type { FC } from 'hono/jsx'

export const Navbar: FC<{ active: string }> = ({ active }) => {
  return (
    <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/design" class="flex items-center gap-3 no-underline">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <i class="fas fa-droplet text-white text-lg"></i>
            </div>
            <div>
              <div class="text-lg font-bold text-gray-900 leading-tight">滴灌通</div>
              <div class="text-[10px] text-gray-400 tracking-wider">MICRO CONNECT GROUP</div>
            </div>
          </a>

          {/* Nav Links */}
          <div class="hidden md:flex items-center gap-1">
            <a
              href="/design"
              class={`px-4 py-2 text-sm font-medium rounded-lg transition-all no-underline ${
                active === 'design'
                  ? 'text-primary bg-primary/5 border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
            >
              <i class="fas fa-compass mr-1.5"></i>设计思路
            </a>
            <a
              href="/portal"
              class={`px-4 py-2 text-sm font-medium rounded-lg transition-all no-underline ${
                active === 'portal'
                  ? 'text-primary bg-primary/5 border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
            >
              <i class="fas fa-grid-2 mr-1.5"></i>产品入口
            </a>
            <a
              href="#about"
              class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all no-underline"
            >
              <i class="fas fa-info-circle mr-1.5"></i>关于我们
            </a>
          </div>

          {/* Mobile menu button */}
          <button class="md:hidden p-2 text-gray-500 hover:text-primary" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
            <i class="fas fa-bars text-lg"></i>
          </button>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" class="hidden md:hidden pb-4 border-t border-gray-100 mt-2 pt-3">
          <a href="/design" class={`block px-4 py-2 text-sm rounded-lg no-underline ${active === 'design' ? 'text-primary bg-primary/5' : 'text-gray-600'}`}>
            <i class="fas fa-compass mr-2"></i>设计思路
          </a>
          <a href="/portal" class={`block px-4 py-2 text-sm rounded-lg no-underline ${active === 'portal' ? 'text-primary bg-primary/5' : 'text-gray-600'}`}>
            <i class="fas fa-th-large mr-2"></i>产品入口
          </a>
          <a href="#about" class="block px-4 py-2 text-sm text-gray-600 rounded-lg no-underline">
            <i class="fas fa-info-circle mr-2"></i>关于我们
          </a>
        </div>
      </div>
    </nav>
  )
}
