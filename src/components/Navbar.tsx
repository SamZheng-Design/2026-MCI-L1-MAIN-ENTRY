/**
 * ===================================================================
 * Navbar.tsx -- 全局顶部导航栏组件 (V20)
 * ===================================================================
 *
 * 粘性(sticky)导航栏，所有页面共用。支持桌面端和移动端布局。
 *
 * --- 功能特性 ---
 * - 品牌Logo(点击回首页)
 * - 主导航链接(首页/关于/团队/动态/联系)
 * - 产品下拉菜单(设计思路/产品入口/产品概览)
 * - 语言切换按钮(中/EN)
 * - CTA按钮(申请演示/进入平台)
 * - 移动端汉堡菜单
 * - 滚动效果(scrolled类添加背景)
 *
 * --- Props ---
 * @param active - 当前活跃的导航项ID，用于高亮
 * @param lang - 当前语言('zh'|'en')
 *
 * --- 客户端脚本 ---
 * 内联脚本处理:
 * - toggleMobileMenu() / closeMobileMenu() — 移动端菜单开关
 * - switchLanguage() — 语言切换(修改URL参数)
 * - scroll监听 — 滚动时添加/移除 'scrolled' 类(毛玻璃效果)
 */
import type { FC } from 'hono/jsx'
import { BrandLogo } from './Logos'
import type { Lang } from '../i18n'
import { tt, t, langLink } from '../i18n'

export const Navbar: FC<{ active: string; lang?: Lang }> = ({ active, lang = 'zh' }) => {
  const l = lang
  const ll = (h: string) => langLink(h, l)

  const links = [
    { id: 'home', href: ll('/'), label: tt(t.nav.home, l), icon: 'fa-home' },
    { id: 'about', href: ll('/about'), label: tt(t.nav.about, l), icon: 'fa-building' },
    { id: 'team', href: ll('/team'), label: tt(t.nav.team, l), icon: 'fa-users' },
    { id: 'news', href: ll('/news'), label: tt(t.nav.news, l), icon: 'fa-newspaper' },
    { id: 'contact', href: ll('/contact'), label: tt(t.nav.contact, l), icon: 'fa-envelope' },
  ]

  const dropdown = [
    { href: ll('/design'), icon: 'fa-compass', label: tt(t.nav.designPhilosophy, l), desc: tt(t.nav.designPhilosophyDesc, l) },
    { href: ll('/portal'), icon: 'fa-th-large', label: tt(t.nav.productPortal, l), desc: tt(t.nav.productPortalDesc, l) },
    { href: '/#product-entry', icon: 'fa-layer-group', label: tt(t.nav.productOverview, l), desc: tt(t.nav.productOverviewDesc, l) },
  ]

  const prodActive = active === 'design' || active === 'portal'
  const switchLabel = l === 'zh' ? 'EN' : '中'
  const switchFull = l === 'zh' ? 'English' : '中文'
  const ac = (id: string) => (id === active || (id === 'product' && prodActive)) ? 'text-[#5DC4B3] font-semibold' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
  const mac = (id: string) => id === active ? 'text-[#5DC4B3] bg-[#5DC4B3]/5 font-semibold' : 'text-[#6e6e73]'

  return (
    <>
    <nav class="sticky top-0 z-50 navbar-glass">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-[56px]">
          <a href={ll('/')} class="flex items-center no-underline flex-shrink-0"><BrandLogo height={30} /></a>

          {/* Desktop Nav */}
          <div class="hidden lg:flex items-center gap-0.5">
            {links.filter(x => x.id === 'home').map(lk => (
              <a href={lk.href} class={`px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all no-underline ${ac(lk.id)}`}>{lk.label}</a>
            ))}
            {/* Product dropdown */}
            <div class="relative group/dropdown">
              <button class={`px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all flex items-center gap-1 ${ac('product')}`}>
                {tt(t.nav.product, l)}
                <i class="fas fa-chevron-down text-[7px] ml-0.5 opacity-40 transition-transform group-hover/dropdown:rotate-180"></i>
              </button>
              <div class="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200">
                <div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100/80 p-2 min-w-[260px]" style="box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08);">
                  {dropdown.map(d => (
                    <a href={d.href} class="flex items-start gap-3 px-3.5 py-3 rounded-xl hover:bg-gray-50/80 transition-colors no-underline group/item">
                      <div class="w-9 h-9 rounded-xl bg-[#5DC4B3]/8 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#5DC4B3]/12 transition-colors">
                        <i class={`fas ${d.icon} text-[#5DC4B3] text-xs`}></i>
                      </div>
                      <div>
                        <div class="text-[13px] font-semibold text-[#1d1d1f] group-hover/item:text-[#5DC4B3] transition-colors">{d.label}</div>
                        <div class="text-[11px] text-gray-400 mt-0.5 leading-snug">{d.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {links.filter(x => x.id !== 'home').map(lk => (
              <a href={lk.href} class={`px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all no-underline ${ac(lk.id)}`}>{lk.label}</a>
            ))}
          </div>

          {/* Desktop CTA + Lang */}
          <div class="hidden lg:flex items-center gap-2">
            <button onclick="switchLanguage()" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-lg border border-gray-200/60 text-[#6e6e73] hover:text-[#5DC4B3] hover:border-[#5DC4B3]/30 transition-all bg-white/60 backdrop-blur-sm" title={switchFull}>
              <i class="fas fa-globe text-[10px] opacity-50"></i>{switchLabel}
            </button>
            <a href={ll('/contact')} class="inline-flex items-center px-3.5 py-1.5 text-[#6e6e73] hover:text-[#1d1d1f] text-[12px] font-medium rounded-lg transition-all no-underline">{tt(t.nav.demoRequest, l)}</a>
            <a href={ll('/portal')} class="inline-flex items-center px-4 py-1.5 text-white text-[12px] font-semibold rounded-full shadow-sm transition-all no-underline hover:brightness-110" style="background: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);">
              {tt(t.nav.enterPlatform, l)}<i class="fas fa-arrow-right ml-1.5 text-[8px] opacity-60"></i>
            </a>
          </div>

          {/* Mobile toggle */}
          <div class="flex lg:hidden items-center gap-1">
            <button onclick="switchLanguage()" class="p-2 text-[11px] font-bold text-[#6e6e73] hover:text-[#5DC4B3] rounded-lg" title={switchFull}><i class="fas fa-globe text-sm"></i></button>
            <button class="p-2 text-[#86868b] hover:text-[#5DC4B3]" onclick="toggleMobileMenu()"><i id="mobile-menu-icon" class="fas fa-bars text-lg"></i></button>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" class="hidden lg:hidden pb-4 border-t border-gray-100/60 mt-2 pt-3">
          {links.filter(x => x.id === 'home').map(lk => (
            <a href={lk.href} class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${mac(lk.id)}`}>
              <i class={`fas ${lk.icon} text-xs w-4 text-center`}></i>{lk.label}
            </a>
          ))}
          <div class="px-4 py-2"><span class="text-[9px] font-semibold text-gray-300 uppercase tracking-[0.15em]">{tt(t.nav.products, l)}</span></div>
          <a href={ll('/design')} class={`flex items-center gap-2.5 px-6 py-2 text-sm rounded-lg no-underline ${mac('design')}`}><i class="fas fa-compass text-xs w-4 text-center"></i>{tt(t.nav.designPhilosophy, l)}</a>
          <a href={ll('/portal')} class={`flex items-center gap-2.5 px-6 py-2 text-sm rounded-lg no-underline ${mac('portal')}`}><i class="fas fa-th-large text-xs w-4 text-center"></i>{tt(t.nav.productPortal, l)}</a>
          {links.filter(x => x.id !== 'home').map(lk => (
            <a href={lk.href} class={`flex items-center gap-2.5 px-4 py-2.5 text-sm rounded-lg no-underline ${mac(lk.id)}`}>
              <i class={`fas ${lk.icon} text-xs w-4 text-center`}></i>{lk.label}
            </a>
          ))}
          <div class="mt-3 px-4 flex gap-2">
            <a href={ll('/portal')} class="flex-1 flex items-center justify-center py-2.5 text-[#5DC4B3] text-sm font-semibold rounded-xl border border-[#5DC4B3]/20 no-underline">{tt(t.nav.enterProduct, l)}</a>
            <a href={ll('/contact')} class="flex-1 flex items-center justify-center py-2.5 bg-[#5DC4B3] text-white text-sm font-bold rounded-xl no-underline">{tt(t.nav.requestDemo, l)}</a>
          </div>
        </div>
      </div>
    </nav>
    <script dangerouslySetInnerHTML={{ __html: `function toggleMobileMenu(){var m=document.getElementById('mobile-menu'),i=document.getElementById('mobile-menu-icon');m.classList.toggle('hidden');i.className=m.classList.contains('hidden')?'fas fa-bars text-lg':'fas fa-times text-lg';}function closeMobileMenu(){var m=document.getElementById('mobile-menu'),i=document.getElementById('mobile-menu-icon');if(m&&!m.classList.contains('hidden')){m.classList.add('hidden');if(i)i.className='fas fa-bars text-lg';}}function switchLanguage(){var u=new URL(location.href);u.searchParams.get('lang')==='en'?u.searchParams.delete('lang'):u.searchParams.set('lang','en');location.href=u.toString();}document.addEventListener('DOMContentLoaded',function(){var mm=document.getElementById('mobile-menu');if(mm)mm.querySelectorAll('a').forEach(function(l){l.addEventListener('click',closeMobileMenu);});var nb=document.querySelector('.navbar-glass');if(!nb)return;var s=false;window.addEventListener('scroll',function(){var y=window.scrollY||window.pageYOffset;if(y>10&&!s){s=true;nb.classList.add('scrolled');}else if(y<=10&&s){s=false;nb.classList.remove('scrolled');}},{passive:true});});` }} />
    </>
  )
}
