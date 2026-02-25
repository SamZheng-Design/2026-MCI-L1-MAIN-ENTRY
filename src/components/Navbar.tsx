import type { FC } from 'hono/jsx'
import { BrandLogo } from './Logos'

export const Navbar: FC<{ active: string }> = ({ active }) => {
  const mainLinks = [
    { id: 'home', href: '/', label: '首页' },
    { id: 'product', href: '#', label: '产品', hasDropdown: true },
    { id: 'about', href: '/about', label: '关于' },
    { id: 'team', href: '/team', label: '团队' },
    { id: 'news', href: '/news', label: '动态' },
    { id: 'contact', href: '/contact', label: '联系' },
  ]

  const productDropdown = [
    { href: '/design', icon: 'fa-compass', label: '设计思路', desc: 'Y型业务流程 · Agent架构设计' },
    { href: '/portal', icon: 'fa-th-large', label: '产品入口', desc: '9大超级Agent · 进入各产品' },
    { href: '/#product-entry', icon: 'fa-layer-group', label: '产品概览', desc: '5阶段产品矩阵总览' },
  ]

  const isProductActive = active === 'design' || active === 'portal'

  return (
    <>
    <nav class="sticky top-0 z-50 navbar-glass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-[64px]">
          {/* Logo */}
          <a href="/" class="flex items-center no-underline flex-shrink-0">
            <BrandLogo height={32} />
          </a>

          {/* Desktop Nav — Apple-style spacing */}
          <div class="hidden lg:flex items-center gap-1">
            {mainLinks.map((l) => {
              const isActive = l.id === active || (l.id === 'product' && isProductActive)
              
              if (l.hasDropdown) {
                return (
                  <div class="relative group/dropdown">
                    <button
                      class={`px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'text-[#5DC4B3] bg-[#5DC4B3]/8 font-semibold'
                          : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.03]'
                      }`}
                    >
                      {l.label}
                      <i class="fas fa-chevron-down text-[7px] ml-0.5 transition-transform group-hover/dropdown:rotate-180"></i>
                    </button>
                    {/* Dropdown — more refined */}
                    <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200">
                      <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100/80 p-2 min-w-[260px]" style="box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08);">
                        {productDropdown.map((item) => (
                          <a href={item.href} class="flex items-start gap-3 px-3.5 py-3 rounded-xl hover:bg-gray-50 transition-colors no-underline group/item">
                            <div class="w-9 h-9 rounded-xl bg-[#5DC4B3]/8 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#5DC4B3]/12 transition-colors">
                              <i class={`fas ${item.icon} text-[#5DC4B3] text-xs`}></i>
                            </div>
                            <div>
                              <div class="text-[13px] font-semibold text-[#1d1d1f] group-hover/item:text-[#5DC4B3] transition-colors">{item.label}</div>
                              <div class="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{item.desc}</div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <a
                  href={l.href}
                  class={`px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all no-underline ${
                    isActive
                      ? 'text-[#5DC4B3] bg-[#5DC4B3]/8 font-semibold'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.03]'
                  }`}
                >
                  {l.label}
                </a>
              )
            })}
          </div>

          {/* Desktop CTA — 更精致 */}
          <div class="hidden lg:flex items-center gap-3">
            <a
              href="/contact"
              class="inline-flex items-center px-4 py-2 text-[#6e6e73] hover:text-[#5DC4B3] text-[13px] font-medium rounded-lg transition-all no-underline"
            >
              申请演示
            </a>
            <a
              href="/portal"
              class="inline-flex items-center px-5 py-2.5 text-white text-[13px] font-bold rounded-xl shadow-sm transition-all no-underline hover:shadow-md"
              style="background: linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%); box-shadow: 0 2px 8px rgba(93,196,179,0.25);"
            >
              进入平台
              <i class="fas fa-arrow-right ml-2 text-[10px]"></i>
            </a>
          </div>

          {/* Mobile toggle */}
          <button class="lg:hidden p-2 text-[#86868b] hover:text-[#5DC4B3]" onclick="toggleMobileMenu()">
            <i id="mobile-menu-icon" class="fas fa-bars text-lg"></i>
          </button>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" class="hidden lg:hidden pb-4 border-t border-gray-100 mt-2 pt-3">
          <a href="/" class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${active === 'home' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-home text-xs w-4 text-center"></i>首页
          </a>
          
          <div class="px-4 py-2">
            <span class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">产品</span>
          </div>
          <a href="/design" class={`flex items-center gap-2.5 px-6 py-2 text-sm rounded-lg no-underline ${active === 'design' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-compass text-xs w-4 text-center"></i>设计思路
          </a>
          <a href="/portal" class={`flex items-center gap-2.5 px-6 py-2 text-sm rounded-lg no-underline ${active === 'portal' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-th-large text-xs w-4 text-center"></i>产品入口
          </a>
          
          <a href="/about" class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${active === 'about' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-building text-xs w-4 text-center"></i>关于
          </a>
          <a href="/team" class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${active === 'team' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-users text-xs w-4 text-center"></i>团队
          </a>
          <a href="/news" class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${active === 'news' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-newspaper text-xs w-4 text-center"></i>动态
          </a>
          <a href="/contact" class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${active === 'contact' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-envelope text-xs w-4 text-center"></i>联系
          </a>

          <div class="mt-3 px-4 flex gap-2">
            <a href="/portal" class="flex-1 flex items-center justify-center py-2.5 text-[#5DC4B3] text-sm font-semibold rounded-lg border border-[#5DC4B3]/20 no-underline">
              进入产品
            </a>
            <a href="/contact" class="flex-1 flex items-center justify-center py-2.5 bg-[#5DC4B3] text-white text-sm font-bold rounded-lg no-underline">
              申请演示
            </a>
          </div>
        </div>
      </div>
    </nav>

    <script dangerouslySetInnerHTML={{ __html: `
      function toggleMobileMenu() {
        var menu = document.getElementById('mobile-menu');
        var icon = document.getElementById('mobile-menu-icon');
        menu.classList.toggle('hidden');
        icon.className = menu.classList.contains('hidden') ? 'fas fa-bars text-lg' : 'fas fa-times text-lg';
      }
      function closeMobileMenu() {
        var menu = document.getElementById('mobile-menu');
        var icon = document.getElementById('mobile-menu-icon');
        if (menu && !menu.classList.contains('hidden')) {
          menu.classList.add('hidden');
          if (icon) icon.className = 'fas fa-bars text-lg';
        }
      }
      document.addEventListener('DOMContentLoaded', function() {
        var mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
          mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', closeMobileMenu);
          });
        }
        // Navbar scroll state — enhanced
        var navbar = document.querySelector('.navbar-glass');
        if (navbar) {
          var scrolled = false;
          function onNavScroll() {
            var y = window.scrollY || window.pageYOffset;
            if (y > 30 && !scrolled) {
              scrolled = true;
              navbar.classList.add('scrolled');
            } else if (y <= 30 && scrolled) {
              scrolled = false;
              navbar.classList.remove('scrolled');
            }
          }
          window.addEventListener('scroll', onNavScroll, { passive: true });
          onNavScroll();
        }
      });
    `}} />
    </>
  )
}
