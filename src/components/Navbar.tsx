import type { FC } from 'hono/jsx'

export const Navbar: FC<{ active: string }> = ({ active }) => {
  return (
    <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          {/* Logo - Micro Connect Style */}
          <a href="/design" class="flex items-center gap-2.5 no-underline">
            <div class="flex items-center">
              <svg viewBox="0 0 200 56" width="140" height="40" xmlns="http://www.w3.org/2000/svg">
                {/* MICRO */}
                <text
                  x="0" y="20"
                  font-family="Inter,'Helvetica Neue',Arial,sans-serif"
                  font-size="20"
                  font-weight="800"
                  fill="#1A1A1A"
                  letter-spacing="-0.3"
                >MICRO</text>
                {/* Teal circle */}
                <circle cx="93" cy="12" r="5.5" fill="#4ECDC4" />
                {/* CONNECT */}
                <text
                  x="0" y="42"
                  font-family="Inter,'Helvetica Neue',Arial,sans-serif"
                  font-size="20"
                  font-weight="800"
                  fill="#1A1A1A"
                  letter-spacing="-0.3"
                >CONNECT</text>
                {/* Second small circle */}
                <circle cx="155" cy="12" r="3.5" fill="#4ECDC4" opacity="0.5" />
              </svg>
            </div>
            <div class="border-l border-gray-200 pl-2.5 ml-0.5">
              <div class="text-sm font-bold text-gray-900 leading-tight" style="font-family:'Noto Sans SC','PingFang SC',sans-serif">滴灌通</div>
              <div class="text-[8px] text-gray-400 tracking-wider font-medium">SUPER AGENT</div>
            </div>
          </a>

          {/* Nav Links */}
          <div class="hidden md:flex items-center gap-1">
            <a
              href="/design"
              class={`px-4 py-2 text-sm font-medium rounded-lg transition-all no-underline ${
                active === 'design'
                  ? 'text-[#4ECDC4] bg-[#4ECDC4]/5'
                  : 'text-gray-600 hover:text-[#4ECDC4] hover:bg-gray-50'
              }`}
            >
              <i class="fas fa-compass mr-1.5"></i>设计思路
            </a>
            <a
              href="/portal"
              class={`px-4 py-2 text-sm font-medium rounded-lg transition-all no-underline ${
                active === 'portal'
                  ? 'text-[#4ECDC4] bg-[#4ECDC4]/5'
                  : 'text-gray-600 hover:text-[#4ECDC4] hover:bg-gray-50'
              }`}
            >
              <i class="fas fa-th-large mr-1.5"></i>产品入口
            </a>
            <a
              href="#about"
              class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#4ECDC4] hover:bg-gray-50 rounded-lg transition-all no-underline"
            >
              <i class="fas fa-info-circle mr-1.5"></i>关于我们
            </a>
          </div>

          {/* Mobile menu button */}
          <button class="md:hidden p-2 text-gray-500 hover:text-[#4ECDC4]" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
            <i class="fas fa-bars text-lg"></i>
          </button>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" class="hidden md:hidden pb-4 border-t border-gray-100 mt-2 pt-3">
          <a href="/design" class={`block px-4 py-2 text-sm rounded-lg no-underline ${active === 'design' ? 'text-[#4ECDC4] bg-[#4ECDC4]/5' : 'text-gray-600'}`}>
            <i class="fas fa-compass mr-2"></i>设计思路
          </a>
          <a href="/portal" class={`block px-4 py-2 text-sm rounded-lg no-underline ${active === 'portal' ? 'text-[#4ECDC4] bg-[#4ECDC4]/5' : 'text-gray-600'}`}>
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
