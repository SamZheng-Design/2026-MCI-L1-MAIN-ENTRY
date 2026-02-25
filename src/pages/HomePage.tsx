import type { FC } from 'hono/jsx'
import { products, statusLabels, getProductUrl, isExternalProduct } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { BrandLogo, ProductLogoSmall } from '../components/Logos'

/*
 * 官网首页 V7 — Apple / Stripe / Plaid 级品质
 * 
 * 设计哲学：
 * - Apple: 大留白、电影级动画、极简主义、每区一个核心行动
 * - Stripe: 渐变mesh背景、布局节奏变化、cinematic scroll
 * - Plaid: 克制的环境动效、优雅沉稳
 * - Mercury: 多功能视觉即导航
 * 
 * 信任感工程（金融科技核心）：
 * - 视觉一致性贯穿全站
 * - 社会证明 + 监管合规可见
 * - 精确的typography hierarchy
 * - 克制而精致的micro-interactions
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
  },
  {
    title: 'Y型架构 · 双角色分流',
    subtitle: 'Y-Shape Architecture',
    icon: 'fa-code-branch',
    color: '#6366F1',
    content: '身份通是唯一入口：所有用户统一认证后，投资者和融资者自动分流至专属路径。融资者上传数据，投资者搭建AI筛子——两条路径在条款协商时精准汇合，形成Y型闭环。',
  },
  {
    title: 'AI筛子 · 个性化投资过滤',
    subtitle: 'Personalized AI Filtering',
    icon: 'fa-filter',
    color: '#F59E0B',
    content: '评估通和风控通是投资者的个性化AI代理——自定义投资标准、风控规则，系统自动在海量项目中执行筛选。通过筛子的项目才出现在机会通看板上，实现精准匹配。',
  },
  {
    title: '全流程闭环 · 投后透明',
    subtitle: 'Full Lifecycle Management',
    icon: 'fa-chart-line',
    color: '#10B981',
    content: '从条款协商（条款通）到电子签约（合约通），从自动结算（结算通）到实时监控（履约通）——投后不再是黑箱，每笔收入分成清清楚楚。',
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
                  {/* Visual header */}
                  <div class="relative h-[200px] sm:h-[240px] overflow-hidden flex items-center justify-center"
                       style={`background: linear-gradient(135deg, ${slide.color}10 0%, ${slide.color}05 50%, #f8fafc 100%);`}>
                    <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(93,196,179,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.3) 1px, transparent 1px); background-size: 40px 40px;"></div>
                    {idx === 0 && (
                      <div class="relative z-10 text-center">
                        <div class="mb-3 opacity-90 mx-auto" style="width: 140px;"><BrandLogo height={48} /></div>
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
                        <div class="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-emerald-100 text-[10px] font-semibold text-emerald-600">机会看板</div>
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
                  {/* Content */}
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
          {/* Slider controls */}
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
                <i class="fas fa-book-open mr-1.5 text-[9px]"></i>设计背后的故事
              </a>
              <button id="slider-next-btn" onclick="nextSlideOrClose()" class="inline-flex items-center px-5 py-2.5 text-white text-xs font-bold rounded-xl transition-all hover:brightness-110" style="background: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);">
                <span id="slider-btn-text">下一步</span>
                <i id="slider-btn-icon" class="fas fa-arrow-right ml-2 text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal JS Controller */}
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
            sc.addEventListener('touchstart',function(e){tsx=e.changedTouches[0].screenX;},{passive:true});
            sc.addEventListener('touchend',function(e){
              var d=tsx-e.changedTouches[0].screenX;
              if(Math.abs(d)>50){if(d>0)nextSlideOrClose();else if(currentSlide>0){currentSlide--;updateSlider();}}
            });
          }
        });
        function closeWelcomeModal(){
          var m=document.getElementById('welcome-modal');
          if(!m||!modalVisible)return;
          var c=m.querySelector('.modal-enter');
          if(c){c.classList.remove('modal-enter');c.classList.add('modal-exit');}
          modalVisible=false;
          setTimeout(function(){m.style.display='none';document.body.style.overflow='';sessionStorage.setItem('mc_welcome_seen','1');},250);
        }
        function goToSlide(i){currentSlide=i;updateSlider();}
        function nextSlideOrClose(){if(currentSlide>=totalSlides-1)closeWelcomeModal();else{currentSlide++;updateSlider();}}
        function updateSlider(){
          var t=document.getElementById('slider-track');
          if(t)t.style.transform='translateX(-'+(currentSlide*100)+'%)';
          document.querySelectorAll('.slider-dot').forEach(function(d,i){
            d.style.background=i===currentSlide?'#5DC4B3':'#d1d5db';
            d.style.width=i===currentSlide?'20px':'8px';
          });
          var c=document.getElementById('slider-counter');
          if(c)c.textContent=(currentSlide+1)+' / '+totalSlides;
          var bt=document.getElementById('slider-btn-text'),bi=document.getElementById('slider-btn-icon');
          if(currentSlide>=totalSlides-1){bt.textContent='开始探索';bi.className='fas fa-rocket ml-2 text-[10px]';}
          else{bt.textContent='下一步';bi.className='fas fa-arrow-right ml-2 text-[10px]';}
        }
        document.addEventListener('keydown',function(e){
          if(!modalVisible)return;
          if(e.key==='Escape')closeWelcomeModal();
          if(e.key==='ArrowRight')nextSlideOrClose();
          if(e.key==='ArrowLeft'&&currentSlide>0){currentSlide--;updateSlider();}
        });
      `}} />


      {/* ═══════════════════════════════════════════
          SECTION 1: HERO — Apple-级全屏沉浸
          电影级进场动画、大字报typography、单一行动
      ═══════════════════════════════════════════ */}
      <section class="aurora-bg aurora-hero noise-overlay relative min-h-[100vh] flex items-center justify-center pt-16 pb-24">
        {/* 装饰层 */}
        <div class="absolute inset-0" style="z-index: 3;">
          {/* 细网格 */}
          <div class="absolute inset-0 opacity-[0.025]" style="background-image: linear-gradient(rgba(93,196,179,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.4) 1px, transparent 1px); background-size: 80px 80px;"></div>
          
          {/* 轨道环 */}
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] orbit-ring opacity-[0.035]">
            <svg viewBox="0 0 800 800" fill="none" class="w-full h-full">
              <circle cx="400" cy="400" r="390" stroke="#5DC4B3" stroke-width="0.5" stroke-dasharray="8 16" />
              <circle cx="400" cy="400" r="320" stroke="#5DC4B3" stroke-width="0.3" stroke-dasharray="4 20" />
              <circle cx="400" cy="400" r="240" stroke="#6366F1" stroke-width="0.3" stroke-dasharray="3 18" />
            </svg>
          </div>

          {/* 浮动粒子 */}
          <div class="floating-element top-[14%] left-[7%] w-10 h-10 rounded-full opacity-[0.10]" style="background: #5DC4B3; animation-delay: 0s;"></div>
          <div class="floating-element top-[22%] right-[9%] w-7 h-7 rounded-full opacity-[0.07]" style="background: #6366F1; animation-delay: 1.5s;"></div>
          <div class="floating-element bottom-[22%] left-[11%] w-5 h-5 rounded-full opacity-[0.08]" style="background: #F59E0B; animation-delay: 3s;"></div>
          <div class="floating-element bottom-[28%] right-[7%] w-6 h-6 rounded-full opacity-[0.07]" style="background: #10B981; animation-delay: 4.5s;"></div>
          <div class="floating-element top-[52%] left-[4%] w-4 h-4 rounded-full opacity-[0.06]" style="background: #8B5CF6; animation-delay: 2s;"></div>

          {/* 浮动Icon方块 */}
          <div class="floating-element top-[16%] right-[16%] opacity-[0.05]" style="animation-delay: 0.8s;">
            <div class="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-sm bg-white/[0.02]">
              <i class="fas fa-fingerprint text-[#5DC4B3] text-lg"></i>
            </div>
          </div>
          <div class="floating-element top-[38%] right-[4%] opacity-[0.04]" style="animation-delay: 2.5s;">
            <div class="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-sm bg-white/[0.02]">
              <i class="fas fa-chart-pie text-[#6366F1] text-sm"></i>
            </div>
          </div>
          <div class="floating-element bottom-[26%] left-[5%] opacity-[0.04]" style="animation-delay: 4s;">
            <div class="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-sm bg-white/[0.02]">
              <i class="fas fa-chart-line text-[#10B981] text-sm"></i>
            </div>
          </div>
          <div class="floating-element bottom-[42%] left-[16%] opacity-[0.04]" style="animation-delay: 1s;">
            <div class="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-sm bg-white/[0.02]">
              <i class="fas fa-store text-[#F59E0B] text-sm"></i>
            </div>
          </div>
        </div>

        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full" style="z-index: 10;">
          <div class="text-center">
            {/* Logo — cinematic reveal */}
            <div class="mb-10 flex justify-center hero-text-reveal hero-text-reveal-1">
              <div class="logo-reveal">
                <BrandLogo height={68} variant="light" />
              </div>
            </div>

            {/* Eyebrow badge */}
            <div class="hero-text-reveal hero-text-reveal-2 inline-flex items-center gap-2.5 px-5 py-2 bg-white/[0.04] border border-white/[0.06] text-white/50 text-xs font-medium rounded-full mb-8 backdrop-blur-sm">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5DC4B3] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-[#5DC4B3]"></span>
              </span>
              Revenue-Based Financing Infrastructure
            </div>

            {/* 主标题 — Apple-style massive typography */}
            <h1 class="hero-text-reveal hero-text-reveal-3 display-xl text-white mb-7 px-2">
              收入分成投资的<br />
              <span class="gradient-text-brand">基础设施级平台</span>
            </h1>

            {/* 副标题 */}
            <p class="hero-text-reveal hero-text-reveal-4 text-base sm:text-lg text-white/30 max-w-lg mx-auto mb-12 leading-relaxed font-light tracking-wide">
              9个AI超级Agent覆盖完整投融资生命周期<br class="hidden sm:block" />
              从身份认证到投后管理，全链路智能化
            </p>

            {/* CTA — Apple-style 大按钮组 */}
            <div class="hero-text-reveal hero-text-reveal-5 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {(() => { const idP = products.find(p => p.id === 'identity')!; return (
              <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="group relative inline-flex items-center px-9 py-[18px] text-white font-bold text-[15px] rounded-2xl transition-all no-underline overflow-hidden" style="background: linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%); box-shadow: 0 0 40px rgba(93,196,179,0.25), 0 4px 20px rgba(93,196,179,0.20);">
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <i class="fas fa-fingerprint mr-2.5 text-base group-hover:scale-110 transition-transform"></i>
                <span class="relative">立即注册身份通</span>
              </a>
              ) })()}
              <a href="#product-entry" class="inline-flex items-center px-9 py-4 bg-white/[0.06] hover:bg-white/[0.10] text-white/60 hover:text-white font-semibold text-[15px] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all no-underline backdrop-blur-sm">
                <i class="fas fa-th-large mr-2.5 text-sm"></i>
                浏览全部产品
              </a>
            </div>

            {/* 社会证明数据条 — Stripe风格 */}
            <div class="hero-text-reveal hero-text-reveal-6 max-w-3xl mx-auto">
              <div class="relative grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06] shimmer-sweep">
                {[
                  { val: '9', sub: 'AI Super Agents', icon: 'fa-robot' },
                  { val: '5', sub: 'Workflow Phases', icon: 'fa-sitemap' },
                  { val: 'AI', sub: 'Filtering Engine', icon: 'fa-filter' },
                  { val: '\u221E', sub: 'Industry Coverage', icon: 'fa-globe' },
                ].map((d, idx) => (
                  <div class="backdrop-blur-sm px-5 py-5 text-center hover:bg-white/[0.03] transition-colors" style={`background: rgba(10,46,42,0.5); transition-delay: ${idx * 0.1}s;`}>
                    <div class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 text-white count-animate" style={`animation-delay: ${0.8 + idx * 0.15}s;`}>{d.val}</div>
                    <div class="text-[10px] text-white/25 font-medium tracking-wider uppercase">{d.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" style="z-index: 10;">
          <span class="text-[10px] text-white/50 tracking-widest uppercase font-light">Scroll</span>
          <div class="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div class="w-1 h-2 bg-white/40 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" style="z-index: 4;"></div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 2: TRUST BAR — 合规与信任信号
          硅谷金融科技标配：监管、安全、合规标志
      ═══════════════════════════════════════════ */}
      <section class="py-6 bg-white border-b border-gray-100 reveal" data-reveal>
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-40">
            {[
              { icon: 'fa-shield-alt', text: 'SFC Licensed' },
              { icon: 'fa-lock', text: 'Bank-Grade Encryption' },
              { icon: 'fa-balance-scale', text: 'Regulatory Compliant' },
              { icon: 'fa-certificate', text: 'SOC 2 Type II' },
              { icon: 'fa-globe-asia', text: 'Hong Kong & Mainland China' },
            ].map(item => (
              <div class="flex items-center gap-2 text-gray-400">
                <i class={`fas ${item.icon} text-[11px]`}></i>
                <span class="text-[11px] font-medium tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 3: PRODUCT ENTRY — 产品入口
          Bento Grid风格 + Stripe-level布局节奏
      ═══════════════════════════════════════════ */}
      <section class="py-20 lg:py-28 bg-white" id="product-entry">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header — Apple-style minimal */}
          <div class="text-center mb-16 reveal" data-reveal>
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/8 text-[#5DC4B3] text-[11px] font-bold rounded-full mb-5 border border-[#5DC4B3]/15 tracking-widest uppercase">
              <i class="fas fa-th-large text-[9px]"></i>
              Product Suite
            </div>
            <h2 class="display-lg text-[#1d1d1f] mb-5">
              9大产品入口
            </h2>
            <p class="text-base text-gray-400 max-w-md mx-auto leading-relaxed">
              Y型架构 · AI超级Agent矩阵<br/>覆盖投融资全生命周期
            </p>
          </div>

          {/* ★ 身份通 — Hero卡片（独立展示，突出统一入口） */}
          <div class="mb-8 reveal" data-reveal>
            {(() => { const idP = products.find(p => p.id === 'identity')!; return (
            <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="block no-underline group">
              <div class="relative overflow-hidden rounded-3xl p-8 sm:p-10 border border-[#5DC4B3]/15 hover:border-[#5DC4B3]/30 transition-all hover:shadow-[0_0_60px_rgba(93,196,179,0.12)] glow-pulse" style="background: linear-gradient(135deg, #061d1a 0%, #0a2e2a 30%, #0f3d36 60%, #164e47 100%);">
                {/* Mesh glow */}
                <div class="absolute inset-0" style="background: radial-gradient(ellipse 60% 50% at 80% 40%, rgba(93,196,179,0.12) 0%, transparent 60%);"></div>
                <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(93,196,179,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.5) 1px, transparent 1px); background-size: 60px 60px;"></div>
                
                <div class="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div class="flex items-center gap-4">
                    <ProductLogoSmall name="身份通" englishShort="Identity" size={56} />
                    <div>
                      <div class="flex items-center gap-2.5 mb-1">
                        <h3 class="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#5DC4B3] transition-colors">身份通</h3>
                        <span class="text-[9px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 font-semibold">已上线</span>
                      </div>
                      <p class="text-xs text-white/35 font-medium">Identity Connect &mdash; 所有用户的统一入口</p>
                    </div>
                  </div>
                  <div class="flex-1 sm:text-right">
                    <p class="text-sm text-white/40 leading-relaxed mb-4 sm:mb-3 max-w-md sm:ml-auto">
                      认证后自动识别角色，分流至投资者或融资者路径。一次注册，全平台通行。
                    </p>
                    <div class="inline-flex items-center px-6 py-3 bg-[#5DC4B3] hover:bg-[#4AB5A5] text-white text-sm font-bold rounded-xl transition-all group-hover:shadow-[0_0_24px_rgba(93,196,179,0.35)]">
                      <i class="fas fa-fingerprint mr-2"></i>
                      立即注册
                      <i class="fas fa-arrow-right ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </div>
              </div>
            </a>
            ) })()}
          </div>

          {/* ★ 其他8个产品 — 4列 Phase-based Grid */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {phaseConfig.slice(1).map((phase, phaseIdx) => (
              <div class="space-y-3 reveal" data-reveal style={`transition-delay: ${phaseIdx * 0.08}s;`}>
                {/* Phase header */}
                <div class="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gray-50/80 border border-gray-100/80">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={`background: ${phase.color};`}>
                    <i class={`fas ${phase.icon}`}></i>
                  </div>
                  <div>
                    <div class="text-[9px] font-bold text-gray-300 tracking-wider uppercase">{phase.labelEn}</div>
                    <div class="text-xs font-bold text-[#1d1d1f]">{phase.label}</div>
                  </div>
                </div>
                {/* Product cards */}
                {phase.ids.map((id) => {
                  const p = products.find(pr => pr.id === id)!
                  return (
                    <a href={getProductUrl(p)} target={isExternalProduct(p) ? "_blank" : undefined} rel={isExternalProduct(p) ? "noopener noreferrer" : undefined} class="block no-underline group">
                      <div class="bg-white border border-gray-200/80 hover:border-gray-300 rounded-2xl p-4 transition-all hover:shadow-lg cursor-pointer portal-card card-glow">
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

          {/* 底部导航 */}
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 reveal" data-reveal>
            <a href="/design" class="inline-flex items-center px-7 py-3 bg-white text-[#1d1d1f] font-bold text-sm rounded-xl border-2 border-gray-200 hover:border-[#5DC4B3] hover:text-[#5DC4B3] transition-all no-underline group">
              <i class="fas fa-book-open mr-2 text-xs group-hover:text-[#5DC4B3]"></i>
              产品设计背后的故事
              <i class="fas fa-arrow-right ml-2 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
            </a>
            <a href="/portal" class="inline-flex items-center px-7 py-3 text-white font-bold text-sm rounded-xl transition-all no-underline hover:brightness-110" style="background: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);">
              <i class="fas fa-th-large mr-2"></i>完整产品入口
            </a>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 4: Y型架构可视化 — 核心创新展示
          Stripe风格：视觉即叙事
      ═══════════════════════════════════════════ */}
      <section class="py-20 lg:py-28 bg-[#FAFAFA] relative overflow-hidden">
        {/* 微妙的点阵背景 */}
        <div class="absolute inset-0 dot-pattern opacity-30"></div>
        
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center mb-16 reveal" data-reveal>
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6366F1]/8 text-[#6366F1] text-[11px] font-bold rounded-full mb-5 border border-[#6366F1]/15 tracking-widest uppercase">
              <i class="fas fa-code-branch text-[9px]"></i>
              Y-Architecture
            </div>
            <h2 class="display-lg text-[#1d1d1f] mb-5">
              双通道，精准服务
            </h2>
            <p class="text-base text-gray-400 max-w-lg mx-auto leading-relaxed">
              通过身份通注册后，投资者和融资企业<br class="hidden sm:block"/>各有专属AI工具链
            </p>
          </div>

          {/* 双卡片 — 更有视觉张力 */}
          <div class="grid md:grid-cols-2 gap-8 lg:gap-10">
            {/* Investor Card */}
            <div class="reveal-left" data-reveal>
              <div class="relative rounded-3xl border border-indigo-100/80 bg-white p-8 lg:p-10 hover:border-indigo-200 hover:shadow-xl transition-all group overflow-hidden h-full">
                {/* 背景装饰 */}
                <div class="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);"></div>
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-3xl"></div>
                
                <div class="relative">
                  {/* Header */}
                  <div class="flex items-center gap-4 mb-8">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 flex items-center justify-center border border-indigo-100">
                      <i class="fas fa-chart-pie text-indigo-500 text-2xl"></i>
                    </div>
                    <div>
                      <h3 class="text-2xl font-extrabold text-[#1d1d1f] tracking-tight">投资者</h3>
                      <p class="text-xs text-indigo-400 font-medium mt-0.5">Investor Platform</p>
                    </div>
                  </div>

                  {/* Feature list — 更精致的呈现 */}
                  <ul class="space-y-5 mb-8">
                    {[
                      { title: '个性化AI评估', desc: '自定义评估模型和风控规则，精准匹配投资偏好', icon: 'fa-sliders-h' },
                      { title: '智能机会看板', desc: '经AI筛选的优质项目一览，多维度排序对比', icon: 'fa-columns' },
                      { title: '投后全透明', desc: '自动结算 + 实时履约监控，每笔分成清清楚楚', icon: 'fa-eye' },
                    ].map(item => (
                      <li class="flex items-start gap-3.5">
                        <span class="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i class={`fas ${item.icon} text-indigo-500 text-sm`}></i>
                        </span>
                        <div>
                          <div class="text-sm font-bold text-[#1d1d1f] mb-0.5">{item.title}</div>
                          <div class="text-[13px] text-gray-500 leading-relaxed">{item.desc}</div>
                        </div>
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
            </div>

            {/* Business Card */}
            <div class="reveal-right" data-reveal>
              <div class="relative rounded-3xl border border-amber-100/80 bg-white p-8 lg:p-10 hover:border-amber-200 hover:shadow-xl transition-all group overflow-hidden h-full">
                <div class="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%);"></div>
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-3xl"></div>
                
                <div class="relative">
                  <div class="flex items-center gap-4 mb-8">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 flex items-center justify-center border border-amber-100">
                      <i class="fas fa-store text-amber-500 text-2xl"></i>
                    </div>
                    <div>
                      <h3 class="text-2xl font-extrabold text-[#1d1d1f] tracking-tight">融资企业</h3>
                      <p class="text-xs text-amber-400 font-medium mt-0.5">Business Platform</p>
                    </div>
                  </div>

                  <ul class="space-y-5 mb-8">
                    {[
                      { title: '智能申请助手', desc: '自动整理经营数据、生成标准化Pitch Deck', icon: 'fa-magic' },
                      { title: '精准曝光', desc: '标准化数据进入投资者AI筛选池，高效匹配', icon: 'fa-bullseye' },
                      { title: '灵活分成模式', desc: '有收入才分配，与经营绑定的新型融资', icon: 'fa-handshake' },
                    ].map(item => (
                      <li class="flex items-start gap-3.5">
                        <span class="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i class={`fas ${item.icon} text-amber-500 text-sm`}></i>
                        </span>
                        <div>
                          <div class="text-sm font-bold text-[#1d1d1f] mb-0.5">{item.title}</div>
                          <div class="text-[13px] text-gray-500 leading-relaxed">{item.desc}</div>
                        </div>
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
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 5: PLATFORM CAPABILITIES — 核心能力
          Apple-style Feature Grid
      ═══════════════════════════════════════════ */}
      <section class="py-20 lg:py-28 bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16 reveal" data-reveal>
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/8 text-[#5DC4B3] text-[11px] font-bold rounded-full mb-5 border border-[#5DC4B3]/15 tracking-widest uppercase">
              <i class="fas fa-cube text-[9px]"></i>
              Platform Capabilities
            </div>
            <h2 class="display-lg text-[#1d1d1f] mb-5">
              不只是工具，<br class="sm:hidden"/>是投资基础设施
            </h2>
            <p class="text-base text-gray-400 max-w-md mx-auto leading-relaxed">
              每一项能力都经过金融级标准打磨
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: 'fa-code-branch', color: '#5DC4B3', title: 'Y型分流架构', desc: '身份通统一入口，智能识别角色后自动分流。投资者和融资企业各走专属路径，在条款协商时精准汇合。', tag: 'Architecture' },
              { icon: 'fa-robot', color: '#6366F1', title: '个性化AI筛子', desc: '投资者自定义评估标准和风控规则。评估通和风控通作为AI代理，在海量项目中执行个性化筛选。', tag: 'AI Engine' },
              { icon: 'fa-layer-group', color: '#F59E0B', title: '跨行业通用', desc: '不按赛道造轮子。餐饮、零售、医美、教育——同一套Agent矩阵适配一切收入分成场景。', tag: 'Scalability' },
              { icon: 'fa-handshake', color: '#8B5CF6', title: '投融资协同', desc: '条款通+合约通实现双方在线协商、电子签约。从出价到签约全流程线上完成。', tag: 'Collaboration' },
              { icon: 'fa-chart-line', color: '#EF4444', title: '全生命周期管理', desc: '结算通自动执行收入分成，履约通实时监控经营数据。投后不再是黑箱。', tag: 'Lifecycle' },
              { icon: 'fa-database', color: '#10B981', title: '统一数据底座', desc: 'Account身份体系、Data数据底座、AI智能引擎。三层基础设施确保9个Agent数据共享。', tag: 'Foundation' },
            ].map((item, idx) => (
              <div class={`feature-card card-glow reveal stagger-${idx + 1}`} data-reveal>
                <div class="flex items-center gap-3 mb-5">
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center" style={`background: ${item.color}10;`}>
                    <i class={`fas ${item.icon}`} style={`color: ${item.color}; font-size: 18px;`}></i>
                  </div>
                  <span class="text-[9px] font-bold text-gray-300 tracking-widest uppercase">{item.tag}</span>
                </div>
                <h3 class="text-[16px] font-bold text-[#1d1d1f] mb-3 group-hover:text-[#5DC4B3] transition-colors">{item.title}</h3>
                <p class="text-[13px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SECTION 6: SOCIAL PROOF — 数据与信任
          Stripe风格全宽深色数据区
      ═══════════════════════════════════════════ */}
      <section class="aurora-bg aurora-cta noise-overlay relative py-20 lg:py-24">
        <div class="absolute inset-0" style="z-index: 2;">
          <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(93,196,179,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.4) 1px, transparent 1px); background-size: 80px 80px;"></div>
          {/* 浮动粒子 */}
          <div class="floating-element top-[10%] left-[10%] w-4 h-4 rounded-full opacity-[0.08]" style="background: #5DC4B3; animation-delay: 0.5s;"></div>
          <div class="floating-element top-[20%] right-[15%] w-3 h-3 rounded-full opacity-[0.06]" style="background: #6366F1; animation-delay: 2s;"></div>
          <div class="floating-element bottom-[15%] left-[20%] w-5 h-5 rounded-full opacity-[0.07]" style="background: #10B981; animation-delay: 3.5s;"></div>
        </div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative" style="z-index: 10;">
          <div class="reveal" data-reveal>
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#5DC4B3]/10 rounded-full mb-8 border border-[#5DC4B3]/15">
              <i class="fas fa-fingerprint text-[#5DC4B3] text-sm"></i>
              <span class="text-xs font-semibold text-[#5DC4B3]">从身份通开始</span>
            </div>
          </div>

          <h2 class="display-lg text-white mb-6 tracking-tight reveal" data-reveal>
            收入分成投资的未来，<br />
            <span class="gradient-text-brand">从这里开始</span>
          </h2>

          <p class="text-white/30 text-base sm:text-lg mb-12 leading-relaxed max-w-lg mx-auto font-light reveal" data-reveal>
            无论您是机构投资者、个人投资者还是融资企业，<br class="hidden sm:block" />
            注册身份通即可开启全流程闭环体验
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 reveal" data-reveal>
            {(() => { const idP = products.find(p => p.id === 'identity')!; return (
            <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="inline-flex items-center px-9 py-[18px] bg-[#5DC4B3] hover:bg-[#4AB5A5] text-white font-bold text-[15px] rounded-2xl shadow-[0_0_40px_rgba(93,196,179,0.3)] transition-all no-underline">
              <i class="fas fa-fingerprint mr-2.5"></i>立即注册身份通
            </a>
            ) })()}
            <a href="/contact" class="inline-flex items-center px-9 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white font-semibold text-[15px] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all no-underline">
              <i class="fas fa-envelope mr-2.5"></i>联系我们
            </a>
          </div>

          <p class="text-white/15 text-xs mt-10 reveal" data-reveal>
            获取完整产品白皮书 · 预约产品演示 · 了解合作方案
          </p>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          GLOBAL SCROLL REVEAL ENGINE
          Stripe-level IntersectionObserver
      ═══════════════════════════════════════════ */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          // ★ Universal Scroll Reveal — all elements with [data-reveal]
          var revealEls = document.querySelectorAll('[data-reveal]');
          var revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
          revealEls.forEach(function(el) { revealObserver.observe(el); });

          // ★ Card Glow — mouse tracking light effect
          document.querySelectorAll('.card-glow').forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
              var rect = card.getBoundingClientRect();
              card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
              card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
            });
          });

          // ★ Portal card mouse tracking
          document.querySelectorAll('.portal-card').forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
              var rect = card.getBoundingClientRect();
              card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
              card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
            });
          });

          // ★ Parallax-lite: floating elements shift on scroll
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
