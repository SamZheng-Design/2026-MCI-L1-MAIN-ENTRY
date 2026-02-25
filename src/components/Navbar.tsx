import type { FC } from 'hono/jsx'
import { BrandLogo } from './Logos'
import type { Lang } from '../i18n'
import { tt, t, langLink } from '../i18n'

export const Navbar: FC<{ active: string; lang?: Lang }> = ({ active, lang = 'zh' }) => {
  const l = lang
  const ll = (href: string) => langLink(href, l)

  const mainLinks = [
    { id: 'home', href: ll('/'), label: tt(t.nav.home, l) },
    { id: 'product', href: '#', label: tt(t.nav.product, l), hasDropdown: true },
    { id: 'about', href: ll('/about'), label: tt(t.nav.about, l) },
    { id: 'team', href: ll('/team'), label: tt(t.nav.team, l) },
    { id: 'news', href: ll('/news'), label: tt(t.nav.news, l) },
    { id: 'contact', href: ll('/contact'), label: tt(t.nav.contact, l) },
  ]

  const productDropdown = [
    { href: ll('/design'), icon: 'fa-compass', label: tt(t.nav.designPhilosophy, l), desc: tt(t.nav.designPhilosophyDesc, l) },
    { href: ll('/portal'), icon: 'fa-th-large', label: tt(t.nav.productPortal, l), desc: tt(t.nav.productPortalDesc, l) },
    { href: '/#product-entry', icon: 'fa-layer-group', label: tt(t.nav.productOverview, l), desc: tt(t.nav.productOverviewDesc, l) },
  ]

  const isProductActive = active === 'design' || active === 'portal'

  // 语言切换URL — 当前页面切换到另一种语言
  const switchLangLabel = l === 'zh' ? 'EN' : '中'
  const switchLangFull = l === 'zh' ? 'English' : '中文'

  return (
    <>
    <nav class="sticky top-0 z-50 navbar-glass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-[56px]">
          {/* Logo */}
          <a href={ll('/')} class="flex items-center no-underline flex-shrink-0">
            <BrandLogo height={30} />
          </a>

          {/* Desktop Nav */}
          <div class="hidden lg:flex items-center gap-0.5">
            {mainLinks.map((link) => {
              const isActive = link.id === active || (link.id === 'product' && isProductActive)
              
              if (link.hasDropdown) {
                return (
                  <div class="relative group/dropdown">
                    <button
                      class={`px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all flex items-center gap-1 ${
                        isActive
                          ? 'text-[#5DC4B3] font-semibold'
                          : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                      }`}
                    >
                      {link.label}
                      <i class="fas fa-chevron-down text-[7px] ml-0.5 opacity-40 transition-transform group-hover/dropdown:rotate-180"></i>
                    </button>
                    <div class="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200">
                      <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100/80 p-2 min-w-[260px]" style="box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08);">
                        {productDropdown.map((item) => (
                          <a href={item.href} class="flex items-start gap-3 px-3.5 py-3 rounded-xl hover:bg-gray-50/80 transition-colors no-underline group/item">
                            <div class="w-9 h-9 rounded-xl bg-[#5DC4B3]/8 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#5DC4B3]/12 transition-colors">
                              <i class={`fas ${item.icon} text-[#5DC4B3] text-xs`}></i>
                            </div>
                            <div>
                              <div class="text-[13px] font-semibold text-[#1d1d1f] group-hover/item:text-[#5DC4B3] transition-colors">{item.label}</div>
                              <div class="text-[11px] text-gray-400 mt-0.5 leading-snug">{item.desc}</div>
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
                  href={link.href}
                  class={`px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all no-underline ${
                    isActive
                      ? 'text-[#5DC4B3] font-semibold'
                      : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Desktop CTA + Language Switcher */}
          <div class="hidden lg:flex items-center gap-2">
            {/* Language Switch — 右上角中英文切换 */}
            <button
              onclick="switchLanguage()"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-lg border border-gray-200/60 text-[#6e6e73] hover:text-[#5DC4B3] hover:border-[#5DC4B3]/30 transition-all bg-white/60 backdrop-blur-sm"
              title={switchLangFull}
            >
              <i class="fas fa-globe text-[10px] opacity-50"></i>
              {switchLangLabel}
            </button>
            <a
              href={ll('/contact')}
              class="inline-flex items-center px-3.5 py-1.5 text-[#6e6e73] hover:text-[#1d1d1f] text-[12px] font-medium rounded-lg transition-all no-underline"
            >
              {tt(t.nav.demoRequest, l)}
            </a>
            <a
              href={ll('/portal')}
              class="inline-flex items-center px-4 py-1.5 text-white text-[12px] font-semibold rounded-full shadow-sm transition-all no-underline hover:brightness-110"
              style="background: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);"
            >
              {tt(t.nav.enterPlatform, l)}
              <i class="fas fa-arrow-right ml-1.5 text-[8px] opacity-60"></i>
            </a>
          </div>

          {/* Mobile: Language + Toggle */}
          <div class="flex lg:hidden items-center gap-1">
            <button
              onclick="switchLanguage()"
              class="p-2 text-[11px] font-bold text-[#6e6e73] hover:text-[#5DC4B3] rounded-lg"
              title={switchLangFull}
            >
              <i class="fas fa-globe text-sm"></i>
            </button>
            <button class="p-2 text-[#86868b] hover:text-[#5DC4B3]" onclick="toggleMobileMenu()">
              <i id="mobile-menu-icon" class="fas fa-bars text-lg"></i>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" class="hidden lg:hidden pb-4 border-t border-gray-100/60 mt-2 pt-3">
          <a href={ll('/')} class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${active === 'home' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-home text-xs w-4 text-center"></i>{tt(t.nav.home, l)}
          </a>
          
          <div class="px-4 py-2">
            <span class="text-[9px] font-semibold text-gray-300 uppercase tracking-[0.15em]">{tt(t.nav.products, l)}</span>
          </div>
          <a href={ll('/design')} class={`flex items-center gap-2.5 px-6 py-2 text-sm rounded-lg no-underline ${active === 'design' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-compass text-xs w-4 text-center"></i>{tt(t.nav.designPhilosophy, l)}
          </a>
          <a href={ll('/portal')} class={`flex items-center gap-2.5 px-6 py-2 text-sm rounded-lg no-underline ${active === 'portal' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-th-large text-xs w-4 text-center"></i>{tt(t.nav.productPortal, l)}
          </a>
          
          <a href={ll('/about')} class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${active === 'about' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-building text-xs w-4 text-center"></i>{tt(t.nav.about, l)}
          </a>
          <a href={ll('/team')} class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${active === 'team' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-users text-xs w-4 text-center"></i>{tt(t.nav.team, l)}
          </a>
          <a href={ll('/news')} class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${active === 'news' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-newspaper text-xs w-4 text-center"></i>{tt(t.nav.news, l)}
          </a>
          <a href={ll('/contact')} class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${active === 'contact' ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'}`}>
            <i class="fas fa-envelope text-xs w-4 text-center"></i>{tt(t.nav.contact, l)}
          </a>

          <div class="mt-3 px-4 flex gap-2">
            <a href={ll('/portal')} class="flex-1 flex items-center justify-center py-2.5 text-[#5DC4B3] text-sm font-semibold rounded-xl border border-[#5DC4B3]/20 no-underline">
              {tt(t.nav.enterProduct, l)}
            </a>
            <a href={ll('/contact')} class="flex-1 flex items-center justify-center py-2.5 bg-[#5DC4B3] text-white text-sm font-bold rounded-xl no-underline">
              {tt(t.nav.requestDemo, l)}
            </a>
          </div>
        </div>
      </div>
    </nav>

    <script dangerouslySetInnerHTML={{ __html: `
      function toggleMobileMenu(){var m=document.getElementById('mobile-menu'),i=document.getElementById('mobile-menu-icon');m.classList.toggle('hidden');i.className=m.classList.contains('hidden')?'fas fa-bars text-lg':'fas fa-times text-lg';}
      function closeMobileMenu(){var m=document.getElementById('mobile-menu'),i=document.getElementById('mobile-menu-icon');if(m&&!m.classList.contains('hidden')){m.classList.add('hidden');if(i)i.className='fas fa-bars text-lg';}}
      function switchLanguage(){
        var url=new URL(window.location.href);
        var currentLang=url.searchParams.get('lang')||'zh';
        if(currentLang==='en'){url.searchParams.delete('lang');}
        else{url.searchParams.set('lang','en');}
        window.location.href=url.toString();
      }
      document.addEventListener('DOMContentLoaded',function(){
        var mm=document.getElementById('mobile-menu');
        if(mm)mm.querySelectorAll('a').forEach(function(l){l.addEventListener('click',closeMobileMenu);});
        var nb=document.querySelector('.navbar-glass');
        if(!nb)return;
        var scrolled=false;
        function onScroll(){
          var y=window.scrollY||window.pageYOffset;
          if(y>10&&!scrolled){scrolled=true;nb.classList.add('scrolled');}
          else if(y<=10&&scrolled){scrolled=false;nb.classList.remove('scrolled');}
        }
        window.addEventListener('scroll',onScroll,{passive:true});
      });
    `}} />
    </>
  )
}
