import type { FC } from 'hono/jsx'
import { products, getProductUrl, isExternalProduct } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { BrandLogo, ProductLogoSmall } from '../components/Logos'
import type { Lang } from '../i18n'
import { tt, t, langLink, getStatusLabel as i18nStatusLabel } from '../i18n'

const h = t.home

// ─── Data-driven configs ───
const STEPS = [
  { id: 'entry', products: ['identity'], color: '#5DC4B3', icons: ['fa-fingerprint','fa-code-branch','fa-shield-alt'], align: 'left', bg: 'bg-white' },
  { id: 'borrower', products: ['application'], color: '#F59E0B', icons: ['fa-upload','fa-magic','fa-bullseye'], align: 'right', bg: 'bg-[#FAFAFA]' },
  { id: 'investor', products: ['assess','risk','opportunity'], color: '#6366F1', icons: ['fa-sliders-h','fa-robot','fa-binoculars'], align: 'left', bg: 'bg-white' },
  { id: 'deal', products: ['terms','contract'], color: '#8B5CF6', icons: ['fa-file-contract','fa-handshake','fa-gavel'], align: 'right', bg: 'bg-[#FAFAFA]' },
  { id: 'post', products: ['settlement','performance'], color: '#10B981', icons: ['fa-coins','fa-chart-line','fa-bell'], align: 'left', bg: 'bg-white' },
] as const

const SLIDE_META = [
  { icon: 'fa-rocket', color: '#5DC4B3', visual: 'hero' },
  { icon: 'fa-code-branch', color: '#6366F1', visual: 'yflow' },
  { icon: 'fa-filter', color: '#F59E0B', visual: 'filter' },
  { icon: 'fa-chart-line', color: '#10B981', visual: 'lifecycle' },
] as const

const stepKeys = [
  { e: h.step01Eyebrow, t: h.step01Title, s: h.step01Subtitle, f: [h.step01f1, h.step01f2, h.step01f3] },
  { e: h.step02Eyebrow, t: h.step02Title, s: h.step02Subtitle, f: [h.step02f1, h.step02f2, h.step02f3] },
  { e: h.step03Eyebrow, t: h.step03Title, s: h.step03Subtitle, f: [h.step03f1, h.step03f2, h.step03f3] },
  { e: h.step04Eyebrow, t: h.step04Title, s: h.step04Subtitle, f: [h.step04f1, h.step04f2, h.step04f3] },
  { e: h.step05Eyebrow, t: h.step05Title, s: h.step05Subtitle, f: [h.step05f1, h.step05f2, h.step05f3] },
]

const slideKeys = [
  { t: h.slide1Title, sub: h.slide1Subtitle, c: h.slide1Content },
  { t: h.slide2Title, sub: h.slide2Subtitle, c: h.slide2Content },
  { t: h.slide3Title, sub: h.slide3Subtitle, c: h.slide3Content },
  { t: h.slide4Title, sub: h.slide4Subtitle, c: h.slide4Content },
]

// ─── Illustration Component (data-driven) ───
const FlowIllustration: FC<{ type: string; lang: Lang }> = ({ type, lang: l }) => {
  if (type === 'entry') return (
    <div class="relative w-full max-w-[320px] mx-auto">
      <div class="flex flex-col items-center">
        <div class="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#5DC4B3]/10 to-[#5DC4B3]/5 border border-[#5DC4B3]/20 flex items-center justify-center mb-5 shadow-lg shadow-[#5DC4B3]/10">
          <i class="fas fa-fingerprint text-3xl text-[#5DC4B3]"></i>
        </div>
        <div class="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-5">Identity Connect</div>
        <div class="w-px h-8 bg-gradient-to-b from-[#5DC4B3]/40 to-gray-200"></div>
        <div class="flex items-start gap-16 mt-2">
          {[{ icon: 'fa-chart-pie', color: 'indigo', label: h.illustInvestor }, { icon: 'fa-store', color: 'amber', label: h.illustBorrower }].map(r => (
            <div class="flex flex-col items-center">
              <div class="w-px h-6 bg-gray-200"></div>
              <div class={`w-12 h-12 rounded-xl bg-${r.color}-50 border border-${r.color}-100 flex items-center justify-center`}>
                <i class={`fas ${r.icon} text-${r.color}-500 text-lg`}></i>
              </div>
              <span class={`text-[10px] text-${r.color}-400 font-semibold mt-1.5`}>{tt(r.label, l)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  if (type === 'borrower') return (
    <div class="relative w-full max-w-[320px] mx-auto">
      <div class="flex flex-col items-center gap-4">
        <div class="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center"><i class="fas fa-file-upload text-amber-500"></i></div>
            <div>
              <div class="text-sm font-bold text-gray-800">{tt(h.illustUpload, l)}</div>
              <div class="text-[10px] text-gray-400">{tt(h.illustAutoStd, l)}</div>
            </div>
          </div>
          <div class="space-y-2">
            {[h.illustFinancial, h.illustPos, h.illustStore].map(k => (
              <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                <div class="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                <span class="text-xs text-gray-600">{tt(k, l)}</span>
                <i class="fas fa-check text-green-400 text-[10px] ml-auto"></i>
              </div>
            ))}
          </div>
        </div>
        <i class="fas fa-arrow-down text-gray-300"></i>
        <div class="px-4 py-2.5 bg-amber-50 rounded-full border border-amber-100">
          <span class="text-xs font-bold text-amber-600"><i class="fas fa-magic mr-1.5"></i>{tt(h.illustAiPitch, l)}</span>
        </div>
      </div>
    </div>
  )
  if (type === 'investor') {
    const cols = [
      { icon: 'fa-clipboard-check', bg: 'indigo', name: h.illustAssess, sub: h.illustFilter1 },
      { icon: 'fa-shield-alt', bg: 'indigo', name: h.illustRisk, sub: h.illustFilter2 },
      { icon: 'fa-binoculars', bg: 'emerald', name: h.illustOpportunity, sub: h.illustDashboard },
    ]
    const stats = [
      { val: '100+', color: 'indigo-600', label: h.illustFundingProjects },
      { val: 'AI', color: 'indigo-500', label: h.illustDualScreen },
      { val: '12', color: 'emerald-500', label: h.illustPreciseMatch },
    ]
    return (
      <div class="relative w-full max-w-[340px] mx-auto">
        <div class="flex flex-col items-center gap-3">
          <div class="flex items-center gap-3 w-full">
            {cols.map((c, i) => (
              <>{i > 0 && <i class="fas fa-arrow-right text-gray-300 text-xs flex-shrink-0"></i>}
              <div class={`flex-1 bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm text-center`}>
                <div class={`w-8 h-8 rounded-lg bg-${c.bg}-50 flex items-center justify-center mx-auto mb-2`}><i class={`fas ${c.icon} text-${c.bg}-500 text-sm`}></i></div>
                <div class="text-[11px] font-bold text-gray-700">{tt(c.name, l)}</div>
                <div class={`text-[9px] text-${c.bg}-400 font-medium mt-0.5`}>{tt(c.sub, l)}</div>
              </div></>
            ))}
          </div>
          <div class="w-full bg-gradient-to-r from-indigo-50 to-emerald-50 rounded-xl p-4 mt-1">
            <div class="flex items-center justify-between text-center">
              {stats.map((s, i) => (
                <>{i > 0 && <i class="fas fa-long-arrow-alt-right text-gray-300"></i>}
                <div><div class={`text-lg font-extrabold text-${s.color}`}>{s.val}</div><div class="text-[9px] text-gray-400">{tt(s.label, l)}</div></div></>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (type === 'deal') return (
    <div class="relative w-full max-w-[300px] mx-auto">
      <div class="flex flex-col items-center gap-3">
        <div class="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <span class="text-[10px] font-bold text-purple-500 tracking-widest uppercase">{tt(h.illustDealMaking, l)}</span>
            <span class="text-[9px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-500 border border-purple-100 font-semibold">{tt(h.illustCollaborative, l)}</span>
          </div>
          <div class="space-y-3">
            {[{ icon: 'fa-file-contract', name: h.illustTerms, desc: h.illustTermsDesc }, { icon: 'fa-file-signature', name: h.illustContract, desc: h.illustContractDesc }].map((item, i) => (
              <>{i > 0 && <div class="h-px bg-gray-100"></div>}
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center"><i class={`fas ${item.icon} text-purple-500 text-sm`}></i></div>
                <div class="flex-1"><div class="text-xs font-bold text-gray-800">{tt(item.name, l)}</div><div class="text-[10px] text-gray-400">{tt(item.desc, l)}</div></div>
                <i class="fas fa-chevron-right text-gray-200 text-[10px]"></i>
              </div></>
            ))}
          </div>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
          <i class="fas fa-check-circle text-purple-400 text-xs"></i>
          <span class="text-[10px] font-semibold text-purple-500">{tt(h.illustDualComplete, l)}</span>
        </div>
      </div>
    </div>
  )
  if (type === 'post') return (
    <div class="relative w-full max-w-[320px] mx-auto">
      <div class="flex flex-col items-center gap-3">
        <div class="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <span class="text-sm font-bold text-gray-800">{tt(h.illustPostPanel, l)}</span>
            <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span></span>
          </div>
          <div class="flex items-end gap-1.5 h-16 mb-3">
            {[40,55,45,70,60,80,65,75,90,85].map((v, i) => (
              <div class="flex-1 rounded-t-sm" style={`height:${v}%;background:${i < 8 ? '#10B981' : '#5DC4B3'};opacity:${0.4 + i * 0.06};`}></div>
            ))}
          </div>
          <div class="flex items-center justify-between text-[10px] text-gray-400">
            <span>{tt(h.illustRecentSettlements, l)}</span>
            <span class="text-green-500 font-bold"><i class="fas fa-arrow-up text-[8px] mr-0.5"></i>+12.3%</span>
          </div>
        </div>
        <div class="flex gap-3 w-full">
          {[{ icon: 'fa-coins', label: h.illustSettlement }, { icon: 'fa-chart-bar', label: h.illustPerformance }].map(x => (
            <div class="flex-1 bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
              <i class={`fas ${x.icon} text-emerald-500 text-sm mb-1`}></i>
              <div class="text-[10px] font-bold text-emerald-700">{tt(x.label, l)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  return null
}

// ─── Helpers ───
const idProduct = () => products.find(p => p.id === 'identity')!
const IdLink: FC<{ lang: Lang; class: string; children: any }> = ({ lang, class: cls, children }) => {
  const p = idProduct()
  return <a href={langLink(getProductUrl(p), lang)} target={isExternalProduct(p) ? "_blank" : undefined} rel={isExternalProduct(p) ? "noopener noreferrer" : undefined} class={`${cls} no-underline`}>{children}</a>
}

const SectionBadge: FC<{ color: string; text: string }> = ({ color, text }) => (
  <div class={`inline-flex items-center gap-2 px-4 py-1.5 bg-${color}/6 text-${color} text-[11px] font-semibold rounded-full mb-5 border border-${color}/10 tracking-[0.15em] uppercase`}>{text}</div>
)

// ─── Main Component ───
export const HomePage: FC<{ lang?: Lang }> = ({ lang = 'zh' }) => {
  const l = lang, ll = (href: string) => langLink(href, l)
  const sections = STEPS.map((s, i) => ({ ...s, ...stepKeys[i], phase: i + 1 }))
  const slides = SLIDE_META.map((m, i) => ({ ...m, ...slideKeys[i] }))
  const foundations = [
    { name: tt(t.data.foundation1Name, l), desc: tt(t.data.foundation1Desc, l), icon: 'fa-users' },
    { name: tt(t.data.foundation2Name, l), desc: tt(t.data.foundation2Desc, l), icon: 'fa-database' },
    { name: tt(t.data.foundation3Name, l), desc: tt(t.data.foundation3Desc, l), icon: 'fa-brain' },
  ]

  return (
    <div class="min-h-screen bg-white">

      {/* ═══ SPLASH ═══ */}
      <div id="splash-screen" class="splash-screen" style="display:none;">
        <div class="splash-bg aurora-bg noise-overlay">
          <div class="absolute inset-0" style="z-index:3;"><div class="absolute inset-0 opacity-[0.015]" style="background-image:linear-gradient(rgba(93,196,179,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(93,196,179,0.15) 1px,transparent 1px);background-size:120px 120px;"></div></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.03]" style="z-index:2;">
            <svg viewBox="0 0 900 900" fill="none" class="w-full h-full orbit-ring">
              <circle cx="450" cy="450" r="440" stroke="#5DC4B3" stroke-width="0.5" stroke-dasharray="8 20" />
              <circle cx="450" cy="450" r="340" stroke="#5DC4B3" stroke-width="0.3" stroke-dasharray="4 24" />
              <circle cx="450" cy="450" r="240" stroke="#5DC4B3" stroke-width="0.3" stroke-dasharray="3 28" />
            </svg>
          </div>
        </div>
        <div class="splash-content" style="z-index:10;">
          <div class="splash-logo">
            <svg viewBox="0 0 280 50" width="160" height="30" xmlns="http://www.w3.org/2000/svg" aria-label="Micro Connect">
              <defs>
                <linearGradient id="sp-logo-top" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2EC4B6" /><stop offset="100%" stop-color="#3DD8CA" /></linearGradient>
                <linearGradient id="sp-logo-btm" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#28A696" /><stop offset="100%" stop-color="#2EC4B6" /></linearGradient>
              </defs>
              <circle cx="16" cy="24" r="14" fill="url(#sp-logo-btm)" opacity="0.85" /><circle cx="20" cy="16" r="14" fill="url(#sp-logo-top)" />
              <text x="42" y="22" font-family="'Montserrat','Inter',sans-serif" font-size="16" font-weight="900" fill="#FFF" letter-spacing="0.8">MICRO CONNECT</text>
              <text x="42" y="42" font-family="'Noto Sans SC','PingFang SC',sans-serif" font-size="14" font-weight="700" fill="#FFF">{l === 'zh' ? '滴灌通' : ''}</text>
            </svg>
          </div>
          <div class="splash-slogan">
            <div class="splash-line splash-line-1"><span class="splash-text-en">Connect</span></div>
            <div class="splash-line splash-line-2"><span class="splash-text-en gradient-text-brand">Worldwide</span></div>
            <div class="splash-line splash-line-3"><span class="splash-text-en">Opportunities</span></div>
            <div class="splash-line splash-line-4"><span class="splash-text-cn">{tt(h.splashLine4, l)}</span></div>
          </div>
          <div class="splash-loader"><div class="splash-progress"><div class="splash-progress-bar" id="splash-progress-bar"></div></div><div class="splash-dots"><span class="splash-dot splash-dot-1"></span><span class="splash-dot splash-dot-2"></span><span class="splash-dot splash-dot-3"></span></div></div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `(function(){var s=document.getElementById('splash-screen'),pb=document.getElementById('splash-progress-bar');if(!s)return;if(sessionStorage.getItem('mc_splash_seen')){s.style.display='none';if(!sessionStorage.getItem('mc_welcome_seen'))setTimeout(function(){var m=document.getElementById('welcome-modal');if(m){m.style.display='flex';if(typeof modalVisible!=='undefined')modalVisible=true;document.body.style.overflow='hidden';}},600);return;}s.style.display='flex';document.body.style.overflow='hidden';var st=Date.now(),dur=2500;function ap(){var p=Math.min((Date.now()-st)/dur,1);if(pb)pb.style.width=(1-Math.pow(1-p,3))*100+'%';if(p<1)requestAnimationFrame(ap);}requestAnimationFrame(ap);setTimeout(function(){s.classList.add('splash-text-active');},200);setTimeout(function(){s.classList.add('splash-exit');sessionStorage.setItem('mc_splash_seen','1');setTimeout(function(){s.style.display='none';document.body.style.overflow='';var m=document.getElementById('welcome-modal');if(m&&!sessionStorage.getItem('mc_welcome_seen')){m.style.display='flex';if(typeof modalVisible!=='undefined')modalVisible=true;document.body.style.overflow='hidden';}},700);},3000);})();` }} />

      <Navbar active="home" lang={l} />

      {/* ═══ WELCOME MODAL ═══ */}
      <div id="welcome-modal" class="fixed inset-0 z-[100] flex items-center justify-center" style="display:none;">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeWelcomeModal()"></div>
        <div class="relative w-[92vw] max-w-[680px] bg-white rounded-3xl shadow-2xl overflow-hidden modal-enter" style="max-height:88vh;">
          <button onclick="closeWelcomeModal()" class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"><i class="fas fa-times text-gray-400 text-sm"></i></button>
          <div id="slider-container" class="relative overflow-hidden">
            <div id="slider-track" class="flex transition-transform duration-500" style="transform:translateX(0%);">
              {slides.map((slide, idx) => (
                <div class="w-full flex-shrink-0 flex flex-col" style="min-width:100%;">
                  <div class="relative h-[200px] sm:h-[240px] overflow-hidden flex items-center justify-center" style={`background:linear-gradient(135deg,${slide.color}10 0%,${slide.color}05 50%,#f8fafc 100%);`}>
                    <div class="absolute inset-0 opacity-[0.03]" style="background-image:linear-gradient(rgba(93,196,179,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(93,196,179,0.3) 1px,transparent 1px);background-size:40px 40px;"></div>
                    {idx === 0 && <div class="relative z-10 text-center"><div class="mb-3 opacity-90 mx-auto" style="width:140px;"><BrandLogo height={48} /></div><div class="flex items-center justify-center gap-3 mt-4"><div class="flex -space-x-1">{['#5DC4B3','#6366F1','#F59E0B','#8B5CF6','#10B981'].map(c => <div class="w-6 h-6 rounded-full border-2 border-white" style={`background:${c};`}></div>)}</div><span class="text-xs font-bold text-gray-500">9 Super Agents</span></div></div>}
                    {idx === 1 && <div class="relative z-10 flex items-center gap-2"><div class="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center border border-gray-100"><i class="fas fa-fingerprint text-xl" style="color:#5DC4B3;"></i></div><div class="flex flex-col gap-1.5">{[{ color: 'amber', icon: 'fa-store', label: h.illustBorrower }, { color: 'indigo', icon: 'fa-chart-pie', label: h.illustInvestor }].map(r => <div class="flex items-center gap-2"><i class="fas fa-long-arrow-alt-right text-gray-300"></i><div class={`flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-${r.color}-100`}><i class={`fas ${r.icon} text-${r.color}-500 text-xs`}></i><span class="text-[11px] font-semibold text-gray-700">{tt(r.label, l)}</span></div></div>)}</div></div>}
                    {idx === 2 && <div class="relative z-10 flex items-center gap-3"><div class="flex flex-col items-center gap-1"><div class="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-100 text-[10px] font-semibold text-gray-500">{l === 'zh' ? '申请数据' : 'App Data'}</div><i class="fas fa-arrow-down text-gray-300 text-xs"></i></div><div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm"><i class="fas fa-filter text-indigo-500 text-sm"></i></div><i class="fas fa-arrow-right text-gray-300 text-xs"></i><div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shadow-sm"><i class="fas fa-shield-alt text-amber-500 text-sm"></i></div><i class="fas fa-arrow-right text-gray-300 text-xs"></i><div class="flex flex-col items-center gap-1"><div class="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-emerald-100 text-[10px] font-semibold text-emerald-600">{l === 'zh' ? '机会看板' : 'Opportunity'}</div></div></div>}
                    {idx === 3 && <div class="relative z-10 flex items-center gap-2">{(l === 'zh' ? ['条款','合约','结算','履约'] : ['Terms','Contract','Settle','Perform']).map((name, i) => <div class="flex items-center gap-2"><div class="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-100"><span class="text-sm font-bold" style={`color:${['#8B5CF6','#8B5CF6','#10B981','#10B981'][i]};`}>{name.charAt(0)}</span></div>{i < 3 && <i class="fas fa-chevron-right text-gray-300 text-[8px]"></i>}</div>)}</div>}
                  </div>
                  <div class="px-7 sm:px-10 py-6 sm:py-8">
                    <div class="flex items-center gap-2.5 mb-3">
                      <div class="w-9 h-9 rounded-xl flex items-center justify-center" style={`background:${slide.color}12;`}><i class={`fas ${slide.icon}`} style={`color:${slide.color};font-size:14px;`}></i></div>
                      <div><h3 class="text-lg sm:text-xl font-extrabold text-[#1d1d1f] leading-tight">{tt(slide.t, l)}</h3><p class="text-[10px] text-gray-400 font-medium tracking-wider uppercase">{tt(slide.sub, l)}</p></div>
                    </div>
                    <p class="text-[13px] sm:text-sm text-gray-500 leading-relaxed">{tt(slide.c, l)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="px-7 sm:px-10 pb-6 sm:pb-8 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">{slides.map((_, idx) => <button onclick={`goToSlide(${idx})`} class="slider-dot w-2 h-2 rounded-full transition-all duration-300" style={idx === 0 ? 'background:#5DC4B3;width:20px;' : 'background:#d1d5db;'} data-index={idx}></button>)}</div>
              <span id="slider-counter" class="text-[10px] text-gray-300 font-medium tabular-nums">1 / {slides.length}</span>
            </div>
            <div class="flex items-center gap-2">
              <a href={ll('/design')} onclick="closeWelcomeModal()" class="hidden sm:inline-flex items-center px-3 py-2 text-[11px] text-gray-400 hover:text-[#5DC4B3] font-medium rounded-lg transition-colors no-underline"><i class="fas fa-book-open mr-1.5 text-[9px]"></i>{tt(h.designStory, l)}</a>
              <button id="slider-next-btn" onclick="nextSlideOrClose()" class="inline-flex items-center px-5 py-2.5 text-white text-xs font-bold rounded-xl transition-all hover:brightness-110" style="background:linear-gradient(135deg,#0a2e2a 0%,#0f3d36 50%,#164e47 100%);"><span id="slider-btn-text">{tt(h.nextStep, l)}</span><i id="slider-btn-icon" class="fas fa-arrow-right ml-2 text-[10px]"></i></button>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `var currentSlide=0,totalSlides=${slides.length},modalVisible=false;var _nl='${tt(h.nextStep, l)}',_el='${tt(h.startExploring, l)}';function closeWelcomeModal(){var m=document.getElementById('welcome-modal');if(!m||!modalVisible)return;var c=m.querySelector('.modal-enter');if(c){c.classList.remove('modal-enter');c.classList.add('modal-exit');}modalVisible=false;setTimeout(function(){m.style.display='none';document.body.style.overflow='';sessionStorage.setItem('mc_welcome_seen','1');},250);}function goToSlide(i){currentSlide=i;uS();}function nextSlideOrClose(){if(currentSlide>=totalSlides-1)closeWelcomeModal();else{currentSlide++;uS();}}function uS(){var t=document.getElementById('slider-track');if(t)t.style.transform='translateX(-'+currentSlide*100+'%)';document.querySelectorAll('.slider-dot').forEach(function(d,i){d.style.background=i===currentSlide?'#5DC4B3':'#d1d5db';d.style.width=i===currentSlide?'20px':'8px';});var c=document.getElementById('slider-counter');if(c)c.textContent=(currentSlide+1)+' / '+totalSlides;var bt=document.getElementById('slider-btn-text'),bi=document.getElementById('slider-btn-icon');if(currentSlide>=totalSlides-1){bt.textContent=_el;bi.className='fas fa-rocket ml-2 text-[10px]';}else{bt.textContent=_nl;bi.className='fas fa-arrow-right ml-2 text-[10px]';}}document.addEventListener('keydown',function(e){if(!modalVisible)return;if(e.key==='Escape')closeWelcomeModal();if(e.key==='ArrowRight')nextSlideOrClose();if(e.key==='ArrowLeft'&&currentSlide>0){currentSlide--;uS();}});var sc=document.getElementById('slider-container');if(sc){var tsx=0;sc.addEventListener('touchstart',function(e){tsx=e.changedTouches[0].screenX},{passive:true});sc.addEventListener('touchend',function(e){var d=tsx-e.changedTouches[0].screenX;if(Math.abs(d)>50){if(d>0)nextSlideOrClose();else if(currentSlide>0){currentSlide--;uS();}}});}` }} />

      {/* ═══ HERO ═══ */}
      <section class="aurora-bg aurora-hero noise-overlay relative min-h-[92vh] flex items-center justify-center pt-16 pb-24">
        <div class="absolute inset-0" style="z-index:3;"><div class="absolute inset-0 opacity-[0.012]" style="background-image:linear-gradient(rgba(93,196,179,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(93,196,179,0.15) 1px,transparent 1px);background-size:100px 100px;"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] orbit-ring opacity-[0.025]"><svg viewBox="0 0 700 700" fill="none" class="w-full h-full"><circle cx="350" cy="350" r="340" stroke="#5DC4B3" stroke-width="0.5" stroke-dasharray="6 16" /><circle cx="350" cy="350" r="260" stroke="#5DC4B3" stroke-width="0.3" stroke-dasharray="4 20" /></svg></div></div>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full" style="z-index:10;">
          <div class="text-center">
            <div class="mb-10 flex justify-center hero-text-reveal hero-text-reveal-1"><div class="logo-reveal"><BrandLogo height={60} variant="light" /></div></div>
            <div class="hero-text-reveal hero-text-reveal-2">
              <div class="inline-flex items-center gap-2.5 px-5 py-2 bg-white/[0.04] border border-white/[0.06] text-white/50 text-[11px] font-medium rounded-full mb-8 backdrop-blur-sm tracking-wide">
                <span class="relative flex h-1.5 w-1.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5DC4B3] opacity-75"></span><span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5DC4B3]"></span></span>
                {tt(h.heroTag, l)}
              </div>
            </div>
            <h1 class="hero-text-reveal hero-text-reveal-3 display-xl text-white mb-6">{tt(h.heroTitle1, l)}<br /><span class="gradient-text-brand">{tt(h.heroTitle2, l)}</span></h1>
            <p class="hero-text-reveal hero-text-reveal-4 text-base sm:text-lg text-white/30 max-w-md mx-auto mb-12 leading-relaxed font-light tracking-wide">{tt(h.heroSubtitle1, l)}<br class="hidden sm:block" />{tt(h.heroSubtitle2, l)}</p>
            <div class="hero-text-reveal hero-text-reveal-5 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <IdLink lang={l} class="group relative inline-flex items-center px-8 py-4 text-white font-bold text-[15px] rounded-2xl transition-all overflow-hidden" >
                <span class="absolute inset-0" style="background:linear-gradient(135deg,#5DC4B3 0%,#49A89A 100%);box-shadow:0 0 50px rgba(93,196,179,0.25),0 4px 20px rgba(93,196,179,0.3);z-index:-1;"></span>
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <i class="fas fa-fingerprint mr-2.5 text-base group-hover:scale-110 transition-transform"></i><span class="relative">{tt(h.heroCtaIdentity, l)}</span><i class="fas fa-arrow-right ml-3 text-sm opacity-70 group-hover:translate-x-1 transition-transform"></i>
              </IdLink>
              <a href="#flow-narrative" class="inline-flex items-center px-8 py-4 bg-white/[0.06] hover:bg-white/[0.10] text-white/60 hover:text-white font-semibold text-[15px] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all no-underline backdrop-blur-sm"><i class="fas fa-arrow-down mr-2.5 text-sm animate-bounce"></i>{tt(h.heroCtaJourney, l)}</a>
            </div>
            <div class="hero-text-reveal hero-text-reveal-6 flex flex-wrap items-center justify-center gap-3">
              {[{ val: '5', k: h.statPhases, c: '#5DC4B3' }, { val: '9', k: h.statAgents, c: '#6366F1' }, { val: 'AI', k: h.statAiFilter, c: '#F59E0B' }, { val: '∞', k: h.statIndustry, c: '#10B981' }].map(d => (
                <div class="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm" style="background:rgba(255,255,255,0.04);border:0.5px solid rgba(255,255,255,0.06);"><span class="text-base font-extrabold" style={`color:${d.c};`}>{d.val}</span><span class="text-[10px] text-white/30 font-medium">{tt(d.k, l)}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" style="z-index:10;"><span class="text-[9px] text-white/40 tracking-[0.2em] uppercase font-medium">Scroll</span><div class="w-[18px] h-7 rounded-full border border-white/15 flex items-start justify-center pt-1.5"><div class="w-0.5 h-1.5 bg-white/30 rounded-full animate-bounce"></div></div></div>
        <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#061b18] to-transparent" style="z-index:4;"></div>
      </section>

      <div class="h-24 bg-gradient-to-b from-[#061b18] to-white relative" style="z-index:5;"></div>

      {/* ═══ FLOW OVERVIEW ═══ */}
      <section class="py-16 lg:py-20 bg-white" id="flow-narrative">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12 reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/6 text-[#5DC4B3] text-[11px] font-semibold rounded-full mb-5 border border-[#5DC4B3]/10 tracking-[0.15em] uppercase">{tt(h.flowTag, l)}</div>
            <h2 class="display-lg text-[#1d1d1f] mb-4">{tt(h.flowTitle, l)}</h2>
            <p class="text-base text-gray-400 max-w-lg mx-auto">{tt(h.flowSubtitle, l)}</p>
          </div>
          <div class="reveal">
            <div class="hidden lg:flex items-center justify-between gap-2 relative">
              <div class="absolute top-[28px] left-[10%] right-[10%] h-px bg-gradient-to-r from-[#5DC4B3]/40 via-indigo-300/30 via-purple-300/30 to-emerald-300/40 z-0"></div>
              {sections.map(sec => (
                <a href={`#section-${sec.id}`} class="relative z-10 flex flex-col items-center group no-underline cursor-pointer flex-1">
                  <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all group-hover:scale-110 group-hover:shadow-lg border" style={`background:${sec.color}08;border-color:${sec.color}20;`}><span class="text-lg font-extrabold" style={`color:${sec.color};`}>{sec.phase}</span></div>
                  <div class="text-xs font-bold text-gray-700 text-center group-hover:text-[#5DC4B3] transition-colors">{tt(sec.t, l).replace(/[^一-龥a-zA-Z\s]/g, '').slice(0, 12)}</div>
                  <div class="text-[10px] text-gray-300 mt-0.5">{sec.products.length} Agent{sec.products.length > 1 ? 's' : ''}</div>
                </a>
              ))}
            </div>
            <div class="lg:hidden flex flex-col gap-3">
              {sections.map(sec => (
                <a href={`#section-${sec.id}`} class="flex items-center gap-4 px-4 py-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-all no-underline group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={`background:${sec.color}10;border:1px solid ${sec.color}20;`}><span class="text-sm font-extrabold" style={`color:${sec.color};`}>{sec.phase}</span></div>
                  <div class="flex-1"><div class="text-sm font-bold text-gray-800 group-hover:text-[#5DC4B3] transition-colors">{tt(sec.t, l)}</div><div class="text-[10px] text-gray-400">{sec.products.length} Agent · {tt(sec.e, l)}</div></div>
                  <i class="fas fa-chevron-down text-gray-200 text-xs group-hover:text-[#5DC4B3] transition-colors"></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NARRATIVE SECTIONS ═══ */}
      {sections.map(sec => {
        const sPs = sec.products.map(id => products.find(p => p.id === id)!).filter(Boolean)
        const isL = sec.align === 'left'
        return (
          <section id={`section-${sec.id}`} class={`py-20 lg:py-28 ${sec.bg} scroll-mt-16`}>
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class={`flex flex-col ${isL ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                <div class={`flex-1 max-w-lg ${isL ? 'reveal-left' : 'reveal-right'} reveal`}>
                  <div class="flex items-center gap-2 mb-5">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center" style={`background:${sec.color}12;`}><span class="text-xs font-extrabold" style={`color:${sec.color};`}>{sec.phase}</span></div>
                    <span class="text-[10px] font-bold tracking-[0.15em] uppercase" style={`color:${sec.color};`}>{tt(sec.e, l)}</span>
                  </div>
                  <h2 class="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight leading-tight">{tt(sec.t, l)}</h2>
                  <p class="text-base text-gray-500 leading-relaxed mb-8">{tt(sec.s, l)}</p>
                  <div class="flex flex-wrap gap-2.5 mb-8">
                    {sec.f.map((fk, fi) => (
                      <div class="inline-flex items-center gap-2 px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-100">
                        <i class={`fas ${sec.icons[fi]} text-xs`} style={`color:${sec.color};`}></i>
                        <span class="text-xs font-semibold text-gray-600">{tt(fk, l)}</span>
                      </div>
                    ))}
                  </div>
                  <div class="flex flex-wrap gap-3">
                    {sPs.map(p => {
                      const sl = i18nStatusLabel(p.status, l)
                      return (
                        <a href={ll(getProductUrl(p))} target={isExternalProduct(p) ? "_blank" : undefined} rel={isExternalProduct(p) ? "noopener noreferrer" : undefined} class="inline-flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-150 hover:border-[#5DC4B3] transition-all no-underline group shadow-sm hover:shadow-md">
                          <ProductLogoSmall name={p.name} englishShort={p.englishShort} size={32} />
                          <div><div class="text-sm font-bold text-gray-800 group-hover:text-[#5DC4B3] transition-colors">{l === 'en' ? p.englishName : p.name}</div><div class="text-[10px] text-gray-400">{l === 'en' ? p.name : p.englishShort}</div></div>
                          <span class={`text-[8px] px-1.5 py-0.5 rounded-full border ${sl.class} ml-1`}>{sl.text}</span>
                          <i class="fas fa-arrow-right text-gray-300 text-[10px] group-hover:text-[#5DC4B3] group-hover:translate-x-0.5 transition-all"></i>
                        </a>
                      )
                    })}
                  </div>
                </div>
                <div class={`flex-1 max-w-md w-full ${isL ? 'reveal-right' : 'reveal-left'} reveal`}><FlowIllustration type={sec.id} lang={l} /></div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ═══ DUAL CHANNEL ═══ */}
      <section class="py-20 lg:py-28 bg-[#FAFAFA]">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-14 reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-500 text-[11px] font-semibold rounded-full mb-5 border border-indigo-100 tracking-[0.15em] uppercase">{tt(h.dualTag, l)}</div>
            <h2 class="display-lg text-[#1d1d1f] mb-4">{tt(h.dualTitle, l)}</h2>
            <p class="text-base text-gray-400 max-w-lg mx-auto">{tt(h.dualSubtitle, l)}</p>
          </div>
          <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
            {[
              { rev: 'reveal-left', border: 'indigo', icon: 'fa-chart-pie', title: h.investorPlatform, tag: h.investorPlatformTag, items: [{ t: h.inv1Title, d: h.inv1Desc }, { t: h.inv2Title, d: h.inv2Desc }, { t: h.inv3Title, d: h.inv3Desc }], cta: h.invCta, ctaColor: 'indigo' },
              { rev: 'reveal-right', border: 'amber', icon: 'fa-store', title: h.businessPlatform, tag: h.businessPlatformTag, items: [{ t: h.biz1Title, d: h.biz1Desc }, { t: h.biz2Title, d: h.biz2Desc }, { t: h.biz3Title, d: h.biz3Desc }], cta: h.bizCta, ctaColor: 'amber' },
            ].map(card => (
              <div class={`${card.rev} reveal group relative rounded-3xl bg-white p-8 lg:p-10 border border-gray-100 hover:border-${card.border}-200 hover:shadow-xl transition-all overflow-hidden`}>
                <div class={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${card.border}-400 via-${card.border}-500 to-${card.border}-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl`}></div>
                <div class="relative">
                  <div class="flex items-center gap-4 mb-7">
                    <div class={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${card.border}-50 to-${card.border}-50 flex items-center justify-center border border-${card.border}-100/50`}><i class={`fas ${card.icon} text-${card.border}-500 text-xl`}></i></div>
                    <div><h3 class="text-xl font-extrabold text-[#1d1d1f] tracking-tight">{tt(card.title, l)}</h3><p class={`text-[11px] text-${card.border}-400 font-semibold tracking-wider uppercase`}>{tt(card.tag, l)}</p></div>
                  </div>
                  <ul class="space-y-3.5 mb-8">
                    {card.items.map(item => (
                      <li class="flex items-start gap-3 text-sm text-gray-600">
                        <span class={`w-5 h-5 rounded-full bg-${card.border}-50 flex items-center justify-center flex-shrink-0 mt-0.5`}><i class={`fas fa-check text-${card.border}-500 text-[8px]`}></i></span>
                        <span><strong class="text-[#1d1d1f]">{tt(item.t, l)}</strong> — {tt(item.d, l)}</span>
                      </li>
                    ))}
                  </ul>
                  <IdLink lang={l} class={`inline-flex items-center text-sm font-bold text-${card.ctaColor}-600 hover:text-${card.ctaColor}-700 group/link`}>{tt(card.cta, l)} <i class="fas fa-arrow-right text-xs ml-2 group-hover/link:translate-x-1 transition-transform"></i></IdLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOUNDATION ═══ */}
      <section class="py-20 lg:py-24 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-14 reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/6 text-[#5DC4B3] text-[11px] font-semibold rounded-full mb-5 border border-[#5DC4B3]/10 tracking-[0.15em] uppercase">{tt(h.foundationTag, l)}</div>
            <h2 class="display-lg text-[#1d1d1f] mb-4">{tt(h.foundationTitle, l)}</h2>
            <p class="text-base text-gray-400 max-w-md mx-auto">{tt(h.foundationSubtitle, l)}</p>
          </div>
          <div class="grid md:grid-cols-3 gap-5 reveal">
            {foundations.map((f, idx) => (
              <div class={`reveal stagger-${idx + 1} group text-center p-8 rounded-2xl bg-[#FAFAFA] border border-gray-100 hover:border-[#5DC4B3]/20 hover:bg-white hover:shadow-lg transition-all`}>
                <div class="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-5 group-hover:border-[#5DC4B3]/20 group-hover:shadow-md transition-all group-hover:scale-110"><i class={`fas ${f.icon} text-xl text-[#5DC4B3]`}></i></div>
                <h3 class="text-base font-bold text-[#1d1d1f] mb-2 group-hover:text-[#5DC4B3] transition-colors">{f.name}</h3>
                <p class="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div class="reveal flex flex-col sm:flex-row items-center justify-center gap-3 mt-12">
            <a href={ll('/design')} class="inline-flex items-center px-7 py-3.5 bg-white text-[#1d1d1f] font-bold text-sm rounded-xl border border-gray-200 hover:border-[#5DC4B3] hover:text-[#5DC4B3] transition-all no-underline group"><i class="fas fa-book-open mr-2 text-xs group-hover:text-[#5DC4B3]"></i>{tt(h.foundationDesignStory, l)}<i class="fas fa-arrow-right ml-2 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i></a>
            <a href={ll('/portal')} class="inline-flex items-center px-7 py-3.5 text-white font-bold text-sm rounded-xl transition-all no-underline hover:brightness-110" style="background:linear-gradient(135deg,#0a2e2a 0%,#0f3d36 50%,#164e47 100%);"><i class="fas fa-th-large mr-2"></i>{tt(h.foundationFullPortal, l)}</a>
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      {/* ═══ FINAL CTA ═══ */}
      <section class="aurora-bg aurora-cta noise-overlay relative py-28 lg:py-36">
        <div class="absolute inset-0" style="z-index:3;"><div class="absolute inset-0 opacity-[0.012]" style="background-image:linear-gradient(rgba(93,196,179,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(93,196,179,0.15) 1px,transparent 1px);background-size:100px 100px;"></div></div>
        <div class="max-w-3xl mx-auto px-4 text-center relative" style="z-index:10;">
          <div class="reveal"><div class="inline-flex items-center gap-2.5 px-5 py-2 bg-[#5DC4B3]/8 rounded-full mb-8 border border-[#5DC4B3]/12"><i class="fas fa-fingerprint text-[#5DC4B3] text-sm"></i><span class="text-[11px] font-semibold text-[#5DC4B3] tracking-wider">{tt(h.ctaFrom, l)}</span></div></div>
          <h2 class="reveal display-lg text-white mb-6 leading-tight">{tt(h.ctaTitle1, l)}<br /><span class="gradient-text-brand">{tt(h.ctaTitle2, l)}</span></h2>
          <p class="reveal text-white/30 text-sm sm:text-base mb-12 leading-relaxed max-w-md mx-auto font-light">{tt(h.ctaSubtitle, l).split('\n').map((line, i) => <>{i > 0 && <br class="hidden sm:block" />}{line}</>)}</p>
          <div class="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            <IdLink lang={l} class="inline-flex items-center px-8 py-4 bg-[#5DC4B3] hover:bg-[#3D8F83] text-white font-bold text-[15px] rounded-2xl transition-all" ><i class="fas fa-fingerprint mr-2.5"></i>{tt(h.ctaRegister, l)}<i class="fas fa-arrow-right ml-3 text-sm opacity-70"></i></IdLink>
            <a href={ll('/contact')} class="inline-flex items-center px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white font-semibold text-[15px] rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all no-underline"><i class="fas fa-envelope mr-2.5"></i>{tt(h.ctaContact, l)}</a>
          </div>
        </div>
      </section>

      <script dangerouslySetInnerHTML={{ __html: `document.addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:0.06,rootMargin:'0px 0px -30px 0px'});els.forEach(function(el){obs.observe(el);});});` }} />
      <Footer lang={l} />
    </div>
  )
}
