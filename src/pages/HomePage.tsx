import type { FC } from 'hono/jsx'
import { products, foundations, architectureGroups, statusLabels, designSections, getProductUrl, isExternalProduct } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { BrandLogo, ProductLogoSmall } from '../components/Logos'

const TEAL = '#5DC4B3'

/*
 * 官网首页 — V7 Apple/Stripe级全面升级
 * 
 * 设计灵感: Apple.com + Stripe.com + Plaid.com + Mercury.com
 * 核心原则: Trust · Clarity · Precision · Motion
 * 
 * 布局逻辑:
 * 1. Welcome Modal（滑块弹窗）— 进入首页自动弹出
 * 2. Full-screen Hero — 大屏 + 品牌宣言 + CTA（Apple-style cinematic reveal）
 * 3. Social Proof Bar — 信任数据条（Stripe-style）
 * 4. Product Entry — 9个通 Bento Grid 布局
 * 5. Dual Channel — 投资者 vs 融资企业（Apple对比卡片）
 * 6. Platform Capabilities — 核心能力（Feature Grid）
 * 7. CTA — 终极转化
 */

// 5阶段流程配色
const phaseConfig = [
  { label: '统一入口', labelEn: 'Entry', color: '#5DC4B3', icon: 'fa-fingerprint', ids: ['identity'] },
  { label: '融资路径', labelEn: 'Borrower', color: '#F59E0B', icon: 'fa-store', ids: ['application'] },
  { label: '投资路径', labelEn: 'Investor', color: '#6366F1', icon: 'fa-chart-pie', ids: ['assess', 'risk', 'opportunity'] },
  { label: '交易撮合', labelEn: 'Deal', color: '#8B5CF6', icon: 'fa-handshake', ids: ['terms', 'contract'] },
  { label: '投后管理', labelEn: 'Post-Inv', color: '#10B981', icon: 'fa-chart-line', ids: ['settlement', 'performance'] },
]

// 弹窗滑块内容
const sliderSlides = [
  {
    title: '收入分成投资的操作系统',
    subtitle: 'Revenue-Based Financing OS',
    icon: 'fa-rocket',
    color: '#5DC4B3',
    content: '滴灌通打造了全球首个收入分成投资的统一操作系统。不按赛道造轮子，而是用9个AI超级Agent覆盖投资全生命周期——从身份认证到投后管理，一套架构适配一切行业。',
    visual: 'hero'
  },
  {
    title: 'Y型架构 · 双角色分流',
    subtitle: 'Y-Shape Architecture',
    icon: 'fa-code-branch',
    color: '#6366F1',
    content: '身份通是唯一入口：所有用户统一认证后，投资者和融资者自动分流至专属路径。融资者上传数据，投资者搭建AI筛子——两条路径在条款协商时精准汇合，形成Y型闭环。',
    visual: 'yflow'
  },
  {
    title: 'AI筛子 · 个性化投资过滤',
    subtitle: 'Personalized AI Filtering',
    icon: 'fa-filter',
    color: '#F59E0B',
    content: '评估通和风控通是投资者的个性化AI代理——自定义投资标准、风控规则，系统自动在海量项目中执行筛选。通过筛子的项目才出现在机会通看板上，实现精准匹配。',
    visual: 'filter'
  },
  {
    title: '全流程闭环 · 投后透明',
    subtitle: 'Full Lifecycle Management',
    icon: 'fa-chart-line',
    color: '#10B981',
    content: '从条款协商（条款通）到电子签约（合约通），从自动结算（结算通）到实时监控（履约通）——投后不再是黑箱，每笔收入分成清清楚楚。',
    visual: 'lifecycle'
  }
]

export const HomePage: FC = () => {
  return (
    <div class="min-h-screen bg-white">
      <Navbar active="home" />

      {/* ═══════════════════════════════════════════
          WELCOME MODAL — 滑块式产品设计介绍弹窗
      ═══════════════════════════════════════════ */}
      <div id="welcome-modal" class="fixed inset-0 z-[100] flex items-center justify-center" style="display:none;">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeWelcomeModal()"></div>
        <div class="relative w-[92vw] max-w-[680px] bg-white rounded-3xl shadow-2xl overflow-hidden modal-enter" style="max-height: 88vh;">
          <button onclick="closeWelcomeModal()" class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors">
            <i class="fas fa-times text-gray-400 text-sm"></i>
          </button>
          <div id="slider-container" class="relative overflow-hidden">
            <div id="slider-track" class="flex transition-transform duration-500" style="transform: translateX(0%);">
              {sliderSlides.map((slide, idx) => (
                <div class="w-full flex-shrink-0 flex flex-col" style="min-width: 100%;">
                  <div class="relative h-[200px] sm:h-[240px] overflow-hidden flex items-center justify-center" 
                       style={`background: linear-gradient(135deg, ${slide.color}10 0%, ${slide.color}05 50%, #f8fafc 100%);`}>
                    <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(93,196,179,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.3) 1px, transparent 1px); background-size: 40px 40px;"></div>
                    {idx === 0 && (
                      <div class="relative z-10 text-center">
                        <div class="mb-3 opacity-90 mx-auto" style="width: 140px;">
                          <BrandLogo height={48} />
                        </div>
                        <div class="flex items-center justify-center gap-3 mt-4">
                          <div class="flex -space-x-1">
                            {['#5DC4B3','#6366F1','#F59E0B','#8B5CF6','#10B981'].map(c => (
                              <div class="w-6 h-6 rounded-full border-2 border-white" style={`background: ${c};`}></div>
                            ))}
                          </div>
                          <span class="text-xs font-bold text-gray-500">9 Super Agents</span>
                        </div>
                      </div>
                    )}
                    {idx === 1 && (
                      <div class="relative z-10 flex items-center gap-2">
                        <div class="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center border border-gray-100">
                          <i class="fas fa-fingerprint text-xl" style="color: #5DC4B3;"></i>
                        </div>
                        <div class="flex flex-col gap-1.5">
                          <div class="flex items-center gap-2">
                            <i class="fas fa-long-arrow-alt-right text-gray-300"></i>
                            <div class="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-amber-100">
                              <i class="fas fa-store text-amber-500 text-xs"></i>
                              <span class="text-[11px] font-semibold text-gray-700">融资者</span>
                            </div>
                          </div>
                          <div class="flex items-center gap-2">
                            <i class="fas fa-long-arrow-alt-right text-gray-300"></i>
                            <div class="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-indigo-100">
                              <i class="fas fa-chart-pie text-indigo-500 text-xs"></i>
                              <span class="text-[11px] font-semibold text-gray-700">投资者</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {idx === 2 && (
                      <div class="relative z-10 flex items-center gap-3">
                        <div class="flex flex-col items-center gap-1">
                          <div class="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-100 text-[10px] font-semibold text-gray-500">申请数据</div>
                          <i class="fas fa-arrow-down text-gray-300 text-xs"></i>
                        </div>
                        <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
                          <i class="fas fa-filter text-indigo-500 text-sm"></i>
                        </div>
                        <i class="fas fa-arrow-right text-gray-300 text-xs"></i>
                        <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shadow-sm">
                          <i class="fas fa-shield-alt text-amber-500 text-sm"></i>
                        </div>
                        <i class="fas fa-arrow-right text-gray-300 text-xs"></i>
                        <div class="flex flex-col items-center gap-1">
                          <div class="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-emerald-100 text-[10px] font-semibold text-emerald-600">机会看板</div>
                        </div>
                      </div>
                    )}
                    {idx === 3 && (
                      <div class="relative z-10 flex items-center gap-2">
                        {['条款','合约','结算','履约'].map((name, i) => (
                          <div class="flex items-center gap-2">
                            <div class="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center border border-gray-100">
                              <span class="text-sm font-bold" style={`color: ${['#8B5CF6','#8B5CF6','#10B981','#10B981'][i]};`}>{name.charAt(0)}</span>
                            </div>
                            {i < 3 && <i class="fas fa-chevron-right text-gray-300 text-[8px]"></i>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div class="px-7 sm:px-10 py-6 sm:py-8">
                    <div class="flex items-center gap-2.5 mb-3">
                      <div class="w-9 h-9 rounded-xl flex items-center justify-center" style={`background: ${slide.color}12;`}>
                        <i class={`fas ${slide.icon}`} style={`color: ${slide.color}; font-size: 14px;`}></i>
                      </div>
                      <div>
                        <h3 class="text-lg sm:text-xl font-extrabold text-[#1d1d1f] leading-tight">{slide.title}</h3>
                        <p class="text-[10px] text-gray-400 font-medium tracking-wider uppercase">{slide.subtitle}</p>
                      </div>
                    </div>
                    <p class="text-[13px] sm:text-sm text-gray-500 leading-relaxed">{slide.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div class="px-7 sm:px-10 pb-6 sm:pb-8 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2">
                {sliderSlides.map((_, idx) => (
                  <button onclick={`goToSlide(${idx})`} class="slider-dot w-2 h-2 rounded-full transition-all duration-300" style={idx === 0 ? 'background: #5DC4B3; width: 20px;' : 'background: #d1d5db;'} data-index={idx}></button>
                ))}
              </div>
              <span id="slider-counter" class="text-[10px] text-gray-300 font-medium tabular-nums">1 / {sliderSlides.length}</span>
            </div>
            <div class="flex items-center gap-2">
              <a href="/design" onclick="closeWelcomeModal()" class="hidden sm:inline-flex items-center px-3 py-2 text-[11px] text-gray-400 hover:text-[#5DC4B3] font-medium rounded-lg transition-colors no-underline">
                <i class="fas fa-book-open mr-1.5 text-[9px]"></i>
                设计背后的故事
              </a>
              <button id="slider-next-btn" onclick="nextSlideOrClose()" class="inline-flex items-center px-5 py-2.5 text-white text-xs font-bold rounded-xl transition-all hover:brightness-110" style="background: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);">
                <span id="slider-btn-text">下一步</span>
                <i id="slider-btn-icon" class="fas fa-arrow-right ml-2 text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal JS */}
      <script dangerouslySetInnerHTML={{ __html: `
        var currentSlide=0,totalSlides=${sliderSlides.length},modalVisible=false;
        document.addEventListener('DOMContentLoaded',function(){
          if(!sessionStorage.getItem('mc_welcome_seen')){
            setTimeout(function(){
              var m=document.getElementById('welcome-modal');
              if(m){m.style.display='flex';modalVisible=true;document.body.style.overflow='hidden';}
            },800);
          }
          var sc=document.getElementById('slider-container'),tsx=0;
          if(sc){
            sc.addEventListener('touchstart',function(e){tsx=e.changedTouches[0].screenX},{passive:true});
            sc.addEventListener('touchend',function(e){var d=tsx-e.changedTouches[0].screenX;if(Math.abs(d)>50){if(d>0)nextSlideOrClose();else if(currentSlide>0){currentSlide--;updateSlider();}}});
          }
        });
        function closeWelcomeModal(){var m=document.getElementById('welcome-modal');if(!m||!modalVisible)return;var c=m.querySelector('.modal-enter');if(c){c.classList.remove('modal-enter');c.classList.add('modal-exit');}modalVisible=false;setTimeout(function(){m.style.display='none';document.body.style.overflow='';sessionStorage.setItem('mc_welcome_seen','1');},250);}
        function goToSlide(i){currentSlide=i;updateSlider();}
        function nextSlideOrClose(){if(currentSlide>=totalSlides-1)closeWelcomeModal();else{currentSlide++;updateSlider();}}
        function updateSlider(){var t=document.getElementById('slider-track');if(t)t.style.transform='translateX(-'+(currentSlide*100)+'%)';document.querySelectorAll('.slider-dot').forEach(function(d,i){if(i===currentSlide){d.style.background='#5DC4B3';d.style.width='20px';}else{d.style.background='#d1d5db';d.style.width='8px';}});var c=document.getElementById('slider-counter');if(c)c.textContent=(currentSlide+1)+' / '+totalSlides;var bt=document.getElementById('slider-btn-text'),bi=document.getElementById('slider-btn-icon');if(currentSlide>=totalSlides-1){bt.textContent='开始探索';bi.className='fas fa-rocket ml-2 text-[10px]';}else{bt.textContent='下一步';bi.className='fas fa-arrow-right ml-2 text-[10px]';}}
        document.addEventListener('keydown',function(e){if(!modalVisible)return;if(e.key==='Escape')closeWelcomeModal();if(e.key==='ArrowRight')nextSlideOrClose();if(e.key==='ArrowLeft'&&currentSlide>0){currentSlide--;updateSlider();}});
      `}} />


      {/* ═══════════════════════════════════════════
          HERO — Apple-style cinematic full-screen
          极致留白 · 渐进式文字揭示 · 精准动效
      ═══════════════════════════════════════════ */}
      <section class="aurora-bg aurora-hero noise-overlay relative min-h-[100vh] flex items-center justify-center pt-16 pb-24">
        {/* 装饰层 */}
        <div class="absolute inset-0" style="z-index: 3;">
          {/* 细腻网格 */}
          <div class="absolute inset-0 opacity-[0.012]" style="background-image: linear-gradient(rgba(93,196,179,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.15) 1px, transparent 1px); background-size: 100px 100px;"></div>
          
          {/* 轨道环 */}
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] orbit-ring opacity-[0.03]">
            <svg viewBox="0 0 800 800" fill="none" class="w-full h-full">
              <circle cx="400" cy="400" r="390" stroke="#5DC4B3" stroke-width="0.5" stroke-dasharray="6 16" />
              <circle cx="400" cy="400" r="320" stroke="#5DC4B3" stroke-width="0.3" stroke-dasharray="4 20" />
              <circle cx="400" cy="400" r="250" stroke="#6366F1" stroke-width="0.2" stroke-dasharray="3 24" />
            </svg>
          </div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] orbit-ring opacity-[0.025]" style="animation-direction: reverse; animation-duration: 60s;">
            <svg viewBox="0 0 550 550" fill="none" class="w-full h-full">
              <circle cx="275" cy="275" r="265" stroke="#6366F1" stroke-width="0.3" stroke-dasharray="5 18" />
            </svg>
          </div>

          {/* 浮动粒子 — subtle, premium */}
          <div class="floating-element top-[12%] left-[7%] w-2 h-2 rounded-full opacity-[0.06]" style="background: #5DC4B3; animation-delay: 0s;"></div>
          <div class="floating-element top-[22%] right-[9%] w-1.5 h-1.5 rounded-full opacity-[0.04]" style="background: #6366F1; animation-delay: 1.5s;"></div>
          <div class="floating-element bottom-[22%] left-[11%] w-1.5 h-1.5 rounded-full opacity-[0.05]" style="background: #F59E0B; animation-delay: 3s;"></div>
          <div class="floating-element bottom-[32%] right-[7%] w-2 h-2 rounded-full opacity-[0.04]" style="background: #10B981; animation-delay: 4.5s;"></div>
          <div class="floating-element top-[55%] left-[4%] w-1.5 h-1.5 rounded-full opacity-[0.03]" style="background: #8B5CF6; animation-delay: 2s;"></div>
          <div class="floating-element top-[35%] right-[20%] w-1 h-1 rounded-full opacity-[0.05]" style="background: #5DC4B3; animation-delay: 5s;"></div>
          <div class="floating-element bottom-[15%] right-[25%] w-1.5 h-1.5 rounded-full opacity-[0.03]" style="background: #32ade6; animation-delay: 6s;"></div>
        </div>

        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full" style="z-index: 10;">
          <div class="text-center">
            {/* Logo — cinematic reveal */}
            <div class="mb-10 flex justify-center hero-text-reveal hero-text-reveal-1">
              <div class="logo-reveal">
                <BrandLogo height={64} variant="light" />
              </div>
            </div>

            {/* Eyebrow */}
            <div class="hero-text-reveal hero-text-reveal-2">
              <div class="inline-flex items-center gap-2.5 px-5 py-2 bg-white/[0.04] border border-white/[0.06] text-white/50 text-[11px] font-medium rounded-full mb-8 backdrop-blur-sm tracking-wide">
                <span class="relative flex h-1.5 w-1.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5DC4B3] opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5DC4B3]"></span>
                </span>
                Revenue-Based Financing Infrastructure
              </div>
            </div>

            {/* 主标题 — Apple-style 超大字体 */}
            <h1 class="hero-text-reveal hero-text-reveal-3 display-xl text-white mb-6">
              收入分成投资的
              <br />
              <span class="gradient-text-brand">基础设施级平台</span>
            </h1>

            {/* 副标题 — 极致精简 */}
            <p class="hero-text-reveal hero-text-reveal-4 text-base sm:text-lg text-white/30 max-w-lg mx-auto mb-12 leading-relaxed font-light tracking-wide">
              9个AI超级Agent · 全生命周期覆盖
              <br class="hidden sm:block" />
              从身份认证到投后管理，一个平台搞定
            </p>

            {/* CTA组 — Apple-style 主次分明 */}
            <div class="hero-text-reveal hero-text-reveal-5 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {(() => { const idP = products.find(p => p.id === 'identity')!; return (
              <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="group relative inline-flex items-center px-8 py-4 text-white font-bold text-[15px] rounded-2xl transition-all no-underline overflow-hidden" style="background: linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%); box-shadow: 0 0 50px rgba(93,196,179,0.25), 0 4px 20px rgba(93,196,179,0.3);">
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <i class="fas fa-fingerprint mr-2.5 text-base group-hover:scale-110 transition-transform"></i>
                <span class="relative">注册身份通</span>
                <i class="fas fa-arrow-right ml-3 text-sm opacity-70 group-hover:translate-x-1 transition-transform"></i>
              </a>
              ) })()}
              <a href="#product-entry" class="inline-flex items-center px-8 py-4 bg-white/[0.06] hover:bg-white/[0.10] text-white/60 hover:text-white font-semibold text-[15px] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all no-underline backdrop-blur-sm">
                <i class="fas fa-th-large mr-2.5 text-sm"></i>
                浏览全部产品
              </a>
            </div>

            {/* 数据条 — Stripe-style 磨砂玻璃 */}
            <div class="hero-text-reveal hero-text-reveal-6 max-w-3xl mx-auto">
              <div class="relative grid grid-cols-2 lg:grid-cols-4 gap-[1px] rounded-2xl overflow-hidden shimmer-sweep" style="background: rgba(255,255,255,0.03);">
                {[
                  { val: '9', sub: 'AI Super Agents', icon: 'fa-robot' },
                  { val: '5', sub: 'Workflow Phases', icon: 'fa-layer-group' },
                  { val: 'AI', sub: 'Filtering Engine', icon: 'fa-filter' },
                  { val: '\u221E', sub: 'Industry Coverage', icon: 'fa-globe' },
                ].map((d, idx) => (
                  <div class="backdrop-blur-md px-5 py-5 text-center transition-colors" style={`background: rgba(10,46,42,0.5); border: 0.5px solid rgba(255,255,255,0.04);`}>
                    <div class="flex items-center justify-center gap-2 mb-1.5">
                      <i class={`fas ${d.icon} text-[10px] text-[#5DC4B3]/40`}></i>
                      <div class={`text-xl sm:text-2xl font-extrabold tracking-tight count-animate ${d.val === 'AI' ? 'gradient-text-brand' : 'text-white'}`} style={`animation-delay: ${0.8 + idx * 0.12}s;`}>{d.val}</div>
                    </div>
                    <div class="text-[9px] text-white/20 font-medium tracking-widest uppercase">{d.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" style="z-index: 10;">
          <span class="text-[9px] text-white/40 tracking-[0.2em] uppercase font-medium">Scroll</span>
          <div class="w-[18px] h-7 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
            <div class="w-0.5 h-1.5 bg-white/30 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Bottom fade */}
        <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" style="z-index: 4;"></div>
      </section>


      {/* ═══════════════════════════════════════════
          SOCIAL PROOF BAR — 信任锚点（Stripe-style）
      ═══════════════════════════════════════════ */}
      <section class="py-8 bg-white border-b border-gray-100/80">
        <div class="max-w-5xl mx-auto px-4">
          <div class="reveal flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { icon: 'fa-shield-alt', text: '金融级安全架构' },
              { icon: 'fa-check-circle', text: '港交所上市公司' },
              { icon: 'fa-globe-asia', text: '覆盖亚太地区' },
              { icon: 'fa-lock', text: '多因素认证体系' },
              { icon: 'fa-chart-bar', text: '智能AI引擎驱动' },
            ].map((item) => (
              <div class="flex items-center gap-2 text-gray-300 hover:text-[#5DC4B3] transition-colors">
                <i class={`fas ${item.icon} text-[11px]`}></i>
                <span class="text-[12px] font-medium tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          PRODUCT ENTRY — Bento Grid 产品入口
          核心改进: 更大的卡片、更清晰的层级、更好的视觉节奏
      ═══════════════════════════════════════════ */}
      <section class="py-20 lg:py-28 bg-white" id="product-entry">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header — Apple-style extreme simplicity */}
          <div class="text-center mb-16 reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/6 text-[#5DC4B3] text-[11px] font-semibold rounded-full mb-5 border border-[#5DC4B3]/10 tracking-[0.15em] uppercase">
              Product Suite
            </div>
            <h2 class="display-lg text-[#1d1d1f] mb-5">
              9大AI超级Agent
            </h2>
            <p class="text-base text-gray-400 max-w-md mx-auto leading-relaxed">
              Y型架构 · 个性化AI筛子 · 投融资全生命周期
            </p>
          </div>

          {/* 身份通 — 独立大卡片 (Featured) */}
          <div class="mb-8 reveal">
            {(() => { const idP = products.find(p => p.id === 'identity')!; return (
            <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="block no-underline group">
              <div class="relative overflow-hidden rounded-3xl p-8 sm:p-10 border border-[#5DC4B3]/15 hover:border-[#5DC4B3]/30 transition-all hover:shadow-[0_0_60px_rgba(93,196,179,0.12)] glow-pulse" style="background: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 30%, #0c3530 60%, #164e47 100%);">
                <div class="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15" style="background: radial-gradient(circle, rgba(46,196,182,0.3) 0%, transparent 60%); transform: translate(25%, -25%);"></div>
                <div class="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full opacity-10" style="background: radial-gradient(circle, rgba(73,168,154,0.2) 0%, transparent 60%); transform: translate(-30%, 30%);"></div>
                
                <div class="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div class="flex items-center gap-5">
                    <div class="w-16 h-16 rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center">
                      <ProductLogoSmall name="身份通" englishShort="Identity" size={52} />
                    </div>
                    <div>
                      <div class="flex items-center gap-2.5 mb-1">
                        <h3 class="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#5DC4B3] transition-colors tracking-tight">身份通</h3>
                        <span class="text-[9px] px-2.5 py-0.5 rounded-full bg-green-500/15 text-green-300 border border-green-500/20 font-semibold tracking-wider">LIVE</span>
                      </div>
                      <p class="text-xs text-white/30 font-medium tracking-wider">IDENTITY CONNECT · 统一认证入口</p>
                    </div>
                  </div>
                  <div class="flex-1 sm:text-right">
                    <p class="text-sm text-white/40 leading-relaxed mb-4 max-w-sm sm:ml-auto">
                      所有用户的统一入口 — 认证后自动识别角色，分流至投资者或融资者专属路径
                    </p>
                    <div class="inline-flex items-center px-6 py-3 bg-[#5DC4B3] hover:bg-[#3D8F83] text-white text-sm font-bold rounded-xl transition-all group-hover:shadow-[0_0_30px_rgba(93,196,179,0.3)]">
                      <i class="fas fa-fingerprint mr-2"></i>
                      立即注册
                      <i class="fas fa-arrow-right ml-2.5 text-xs group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </div>
              </div>
            </a>
            ) })()}
          </div>

          {/* 其他8个产品 — 4列网格 */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {phaseConfig.slice(1).map((phase, phaseIdx) => (
              <div class="space-y-3">
                {/* Phase header */}
                <div class={`reveal stagger-${phaseIdx + 1} flex items-center gap-2.5 px-4 py-3 rounded-xl border border-gray-100`} style="background: linear-gradient(135deg, #FAFAFA 0%, #ffffff 100%);">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={`background: ${phase.color};`}>
                    <i class={`fas ${phase.icon} text-xs`}></i>
                  </div>
                  <div>
                    <div class="text-[8px] font-bold text-gray-300 tracking-[0.15em] uppercase">{phase.labelEn}</div>
                    <div class="text-xs font-bold text-[#1d1d1f]">{phase.label}</div>
                  </div>
                </div>
                {/* Product cards */}
                {phase.ids.map((id, cardIdx) => {
                  const p = products.find(pr => pr.id === id)!
                  return (
                    <a href={getProductUrl(p)} target={isExternalProduct(p) ? "_blank" : undefined} rel={isExternalProduct(p) ? "noopener noreferrer" : undefined} class={`reveal stagger-${phaseIdx + cardIdx + 2} block no-underline group`}>
                      <div class="bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-4 transition-all hover:shadow-lg cursor-pointer portal-card">
                        <div class="flex items-start gap-2.5">
                          <ProductLogoSmall name={p.name} englishShort={p.englishShort} size={38} />
                          <div class="flex-1 min-w-0">
                            <h3 class="text-[13px] font-bold text-[#1d1d1f] group-hover:text-[#5DC4B3] transition-colors">{p.name}</h3>
                            <p class="text-[10px] text-gray-400 mt-0.5">{p.englishShort}</p>
                          </div>
                        </div>
                        <p class="text-[11px] text-gray-500 mt-2.5 leading-relaxed line-clamp-2">{p.description}</p>
                        <div class="mt-2.5 flex items-center gap-1.5 flex-wrap">
                          <span class={`text-[9px] px-1.5 py-0.5 rounded-full border ${statusLabels[p.status].class}`}>
                            {statusLabels[p.status].text}
                          </span>
                          {p.isFilter && (
                            <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 font-semibold">
                              <i class="fas fa-filter mr-0.5 text-[7px]"></i>AI筛子
                            </span>
                          )}
                          {p.isCollaborative && (
                            <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200 font-semibold">
                              <i class="fas fa-handshake mr-0.5 text-[7px]"></i>协同
                            </span>
                          )}
                        </div>
                      </div>
                    </a>
                  )
                })}
              </div>
            ))}
          </div>

          {/* 入口链接 */}
          <div class="reveal flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/design" class="inline-flex items-center px-7 py-3.5 bg-white text-[#1d1d1f] font-bold text-sm rounded-xl border border-gray-200 hover:border-[#5DC4B3] hover:text-[#5DC4B3] transition-all no-underline group">
              <i class="fas fa-book-open mr-2 text-xs group-hover:text-[#5DC4B3]"></i>
              产品设计背后的故事
              <i class="fas fa-arrow-right ml-2 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
            </a>
            <a href="/portal" class="inline-flex items-center px-7 py-3.5 text-white font-bold text-sm rounded-xl transition-all no-underline hover:brightness-110" style="background: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);">
              <i class="fas fa-th-large mr-2"></i>完整产品入口
            </a>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div class="section-divider"></div>

      {/* ═══════════════════════════════════════════
          DUAL CHANNEL — Apple-style 极致对比卡片
      ═══════════════════════════════════════════ */}
      <section class="py-20 lg:py-28 bg-[#FAFAFA]">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-14 reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-500 text-[11px] font-semibold rounded-full mb-5 border border-indigo-100 tracking-[0.15em] uppercase">
              Dual Channel
            </div>
            <h2 class="display-lg text-[#1d1d1f] mb-4">
              两条路径，一个平台
            </h2>
            <p class="text-base text-gray-400 max-w-lg mx-auto">
              通过身份通注册后，投资者和融资企业各有专属智能工具链
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Investor */}
            <div class="reveal-left reveal group relative rounded-3xl bg-white p-8 lg:p-10 border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all overflow-hidden card-glow">
              <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl"></div>
              <div class="relative">
                <div class="flex items-center gap-4 mb-7">
                  <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 flex items-center justify-center border border-indigo-100/50">
                    <i class="fas fa-chart-pie text-indigo-500 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-extrabold text-[#1d1d1f] tracking-tight">投资者</h3>
                    <p class="text-[11px] text-indigo-400 font-semibold tracking-wider uppercase">Investor Platform</p>
                  </div>
                </div>
                <ul class="space-y-4 mb-8">
                  {[
                    { title: '个性化AI评估', desc: '自定义评估模型和风控规则，精准匹配投资偏好' },
                    { title: '智能机会看板', desc: '经AI筛选的优质项目一览，多维度排序与对比' },
                    { title: '投后全透明', desc: '自动结算 + 实时履约监控，每笔分成清楚可查' },
                  ].map((item) => (
                    <li class="flex items-start gap-3 text-sm text-gray-600">
                      <span class="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i class="fas fa-check text-indigo-500 text-[8px]"></i>
                      </span>
                      <span><strong class="text-[#1d1d1f]">{item.title}</strong> — {item.desc}</span>
                    </li>
                  ))}
                </ul>
                {(() => { const idP = products.find(p => p.id === 'identity')!; return (
                <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 no-underline group/link">
                  注册身份通，开启投资路径 <i class="fas fa-arrow-right text-xs ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                </a>
                ) })()}
              </div>
            </div>

            {/* Business */}
            <div class="reveal-right reveal group relative rounded-3xl bg-white p-8 lg:p-10 border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all overflow-hidden card-glow">
              <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl"></div>
              <div class="relative">
                <div class="flex items-center gap-4 mb-7">
                  <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center border border-amber-100/50">
                    <i class="fas fa-store text-amber-500 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-extrabold text-[#1d1d1f] tracking-tight">融资企业</h3>
                    <p class="text-[11px] text-amber-400 font-semibold tracking-wider uppercase">Business Platform</p>
                  </div>
                </div>
                <ul class="space-y-4 mb-8">
                  {[
                    { title: '智能申请助手', desc: '自动整理经营数据、生成标准化Pitch Deck' },
                    { title: '精准曝光', desc: '标准化数据直接进入投资者AI筛选池，高效匹配' },
                    { title: '灵活分成模式', desc: '有收入才分配，不是传统借贷，与经营绑定' },
                  ].map((item) => (
                    <li class="flex items-start gap-3 text-sm text-gray-600">
                      <span class="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i class="fas fa-check text-amber-500 text-[8px]"></i>
                      </span>
                      <span><strong class="text-[#1d1d1f]">{item.title}</strong> — {item.desc}</span>
                    </li>
                  ))}
                </ul>
                {(() => { const idP = products.find(p => p.id === 'identity')!; return (
                <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="inline-flex items-center text-sm font-bold text-amber-600 hover:text-amber-700 no-underline group/link">
                  注册身份通，开启融资路径 <i class="fas fa-arrow-right text-xs ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                </a>
                ) })()}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          PLATFORM CAPABILITIES — Feature Grid
          Apple/Stripe-style: 大图标 + 精炼文案 + 悬浮效果
      ═══════════════════════════════════════════ */}
      <section class="py-20 lg:py-28 bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16 reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/6 text-[#5DC4B3] text-[11px] font-semibold rounded-full mb-5 border border-[#5DC4B3]/10 tracking-[0.15em] uppercase">
              Platform Capabilities
            </div>
            <h2 class="display-lg text-[#1d1d1f] mb-4">
              不只是工具，是投资基础设施
            </h2>
            <p class="text-base text-gray-400 max-w-lg mx-auto">
              每一个能力都经过金融级标准打磨
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: 'fa-code-branch', color: '#5DC4B3', title: 'Y型分流架构', desc: '身份通统一入口，智能识别角色后自动分流。投资者和融资企业各走专属路径，在条款协商时精准汇合。', tag: 'Architecture' },
              { icon: 'fa-robot', color: '#6366F1', title: '个性化AI筛子', desc: '投资者自定义评估标准和风控规则。评估通和风控通作为AI代理，在海量项目中执行个性化筛选。', tag: 'AI Engine' },
              { icon: 'fa-layer-group', color: '#F59E0B', title: '跨行业通用', desc: '不按赛道造轮子。餐饮、零售、医美、教育——同一套Agent矩阵适配一切收入分成场景。', tag: 'Scalability' },
              { icon: 'fa-handshake', color: '#8B5CF6', title: '投融资协同', desc: '条款通+合约通实现双方在线协商、电子签约。从出价到签约全流程线上完成。', tag: 'Collaboration' },
              { icon: 'fa-chart-line', color: '#EF4444', title: '全生命周期管理', desc: '结算通自动执行收入分成，履约通实时监控经营数据。投后不再是黑箱。', tag: 'Lifecycle' },
              { icon: 'fa-database', color: '#10B981', title: '统一数据底座', desc: 'Account身份体系、Data数据底座、AI智能引擎。三层基础设施确保9个Agent共享数据。', tag: 'Foundation' },
            ].map((item, idx) => (
              <div class={`reveal stagger-${idx + 1} feature-card group`}>
                <div class="flex items-center gap-3 mb-5">
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" style={`background: ${item.color}0D;`}>
                    <i class={`fas ${item.icon}`} style={`color: ${item.color}; font-size: 18px;`}></i>
                  </div>
                  <span class="text-[9px] font-bold text-gray-300 tracking-[0.15em] uppercase">{item.tag}</span>
                </div>
                <h3 class="text-base font-bold text-[#1d1d1f] mb-2.5 group-hover:text-[#5DC4B3] transition-colors tracking-tight">{item.title}</h3>
                <p class="text-[13px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div class="section-divider"></div>

      {/* ═══════════════════════════════════════════
          FINAL CTA — 沉浸式深色收尾
      ═══════════════════════════════════════════ */}
      <section class="aurora-bg aurora-cta noise-overlay relative py-28 lg:py-36">
        <div class="absolute inset-0" style="z-index: 3;">
          <div class="absolute inset-0 opacity-[0.012]" style="background-image: linear-gradient(rgba(93,196,179,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.15) 1px, transparent 1px); background-size: 100px 100px;"></div>
          <div class="floating-element top-[10%] left-[10%] w-1.5 h-1.5 rounded-full opacity-[0.05]" style="background: #5DC4B3; animation-delay: 0.5s;"></div>
          <div class="floating-element top-[20%] right-[15%] w-1 h-1 rounded-full opacity-[0.04]" style="background: #6366F1; animation-delay: 2s;"></div>
          <div class="floating-element bottom-[15%] left-[20%] w-2 h-2 rounded-full opacity-[0.05]" style="background: #10B981; animation-delay: 3.5s;"></div>
          <div class="floating-element bottom-[25%] right-[10%] w-1 h-1 rounded-full opacity-[0.06]" style="background: #F59E0B; animation-delay: 1s;"></div>
        </div>
        <div class="max-w-3xl mx-auto px-4 text-center relative" style="z-index: 10;">
          <div class="reveal">
            <div class="inline-flex items-center gap-2.5 px-5 py-2 bg-[#5DC4B3]/8 rounded-full mb-8 border border-[#5DC4B3]/12">
              <i class="fas fa-fingerprint text-[#5DC4B3] text-sm"></i>
              <span class="text-[11px] font-semibold text-[#5DC4B3] tracking-wider">从身份通开始</span>
            </div>
          </div>
          <h2 class="reveal display-lg text-white mb-6 leading-tight">
            收入分成投资的未来
            <br />
            <span class="gradient-text-brand">从这里开始</span>
          </h2>
          <p class="reveal text-white/30 text-sm sm:text-base mb-12 leading-relaxed max-w-md mx-auto font-light">
            无论您是机构投资者、个人投资者还是融资企业，
            <br class="hidden sm:block" />
            注册身份通即可开启全流程闭环体验
          </p>
          <div class="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            {(() => { const idP = products.find(p => p.id === 'identity')!; return (
            <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="inline-flex items-center px-8 py-4 bg-[#5DC4B3] hover:bg-[#3D8F83] text-white font-bold text-[15px] rounded-2xl transition-all no-underline" style="box-shadow: 0 0 50px rgba(93,196,179,0.25), 0 4px 20px rgba(93,196,179,0.3);">
              <i class="fas fa-fingerprint mr-2.5"></i>立即注册身份通
              <i class="fas fa-arrow-right ml-3 text-sm opacity-70"></i>
            </a>
            ) })()}
            <a href="/contact" class="inline-flex items-center px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white font-semibold text-[15px] rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all no-underline">
              <i class="fas fa-envelope mr-2.5"></i>联系我们
            </a>
          </div>
          <p class="reveal text-white/15 text-xs mt-10 tracking-wide">
            获取完整产品白皮书 · 预约产品演示 · 了解合作方案
          </p>
        </div>
      </section>

      {/* ★ Scroll Reveal Engine — Intersection Observer */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          // ─── Scroll Reveal ───
          var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
          var revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
          revealEls.forEach(function(el) { revealObserver.observe(el); });

          // ─── Card glow tracking ───
          document.querySelectorAll('.card-glow').forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
              var r = card.getBoundingClientRect();
              card.style.setProperty('--mouse-x', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
              card.style.setProperty('--mouse-y', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
            });
          });

          // ─── Portal card glow ───
          document.querySelectorAll('.portal-card').forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
              var r = card.getBoundingClientRect();
              card.style.setProperty('--mouse-x', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
              card.style.setProperty('--mouse-y', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
            });
          });

          // ─── Parallax-lite floating elements ───
          var floatingEls = document.querySelectorAll('.floating-element');
          var ticking = false;
          window.addEventListener('scroll', function() {
            if (!ticking) {
              window.requestAnimationFrame(function() {
                var scrollY = window.scrollY;
                floatingEls.forEach(function(el, i) {
                  var speed = (i % 3 + 1) * 0.015;
                  el.style.transform = 'translateY(' + (scrollY * speed * -1) + 'px)';
                });
                ticking = false;
              });
              ticking = true;
            }
          }, { passive: true });
        });
      `}} />

      <Footer />
    </div>
  )
}
