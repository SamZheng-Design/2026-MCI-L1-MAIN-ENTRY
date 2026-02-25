import type { FC } from 'hono/jsx'
import { BrandLogo } from './Logos'

export const Navbar: FC<{ active: string }> = ({ active }) => {
  return (
    <nav class="sticky top-0 z-50 navbar-glass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/design" class="flex items-center no-underline">
            <BrandLogo height={42} />
          </a>

          {/* Nav Links */}
          <div class="hidden md:flex items-center gap-1">
            <a
              href="/design"
              class={`px-4 py-2 text-sm font-medium rounded-xl transition-all no-underline ${
                active === 'design'
                  ? 'text-[#5DC4B3] bg-[#5DC4B3]/8 font-semibold'
                  : 'text-[#6e6e73] hover:text-[#5DC4B3] hover:bg-[#5DC4B3]/5'
              }`}
            >
              <i class="fas fa-compass mr-1.5"></i>设计思路
            </a>
            <a
              href="/portal"
              class={`px-4 py-2 text-sm font-medium rounded-xl transition-all no-underline ${
                active === 'portal'
                  ? 'text-[#5DC4B3] bg-[#5DC4B3]/8 font-semibold'
                  : 'text-[#6e6e73] hover:text-[#5DC4B3] hover:bg-[#5DC4B3]/5'
              }`}
            >
              <i class="fas fa-th-large mr-1.5"></i>产品入口
            </a>
            <a
              href="#about"
              class="px-4 py-2 text-sm font-medium text-[#6e6e73] hover:text-[#5DC4B3] hover:bg-[#5DC4B3]/5 rounded-xl transition-all no-underline"
            >
              <i class="fas fa-info-circle mr-1.5"></i>关于我们
            </a>
          </div>

          {/* Mobile */}
          <button class="md:hidden p-2 text-[#86868b] hover:text-[#5DC4B3]" onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
            <i class="fas fa-bars text-lg"></i>
          </button>
        </div>

        <div id="mobile-menu" class="hidden md:hidden pb-4 border-t border-[#f1f5f9] mt-2 pt-3">
          <a href="/design" class={`block px-4 py-2 text-sm rounded-xl no-underline ${active === 'design' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-compass mr-2"></i>设计思路
          </a>
          <a href="/portal" class={`block px-4 py-2 text-sm rounded-xl no-underline ${active === 'portal' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-th-large mr-2"></i>产品入口
          </a>
          <a href="#about" class="block px-4 py-2 text-sm text-[#6e6e73] rounded-xl no-underline">
            <i class="fas fa-info-circle mr-2"></i>关于我们
          </a>
        </div>
      </div>
    </nav>
  )
}
