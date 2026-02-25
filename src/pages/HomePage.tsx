import type { FC } from 'hono/jsx'
import { products, foundations, architectureGroups, statusLabels, designSections, getProductUrl, isExternalProduct } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { BrandLogo, ProductLogoSmall } from '../components/Logos'

const TEAL = '#5DC4B3'

/*
 * 官网首页 V6+ — Apple/Stripe级全面重构
 *
 * 设计哲学（硅谷金融科技范式）：
 * 1. Cinematic Hero — 大留白、渐进式文字揭示、一屏一焦点
 * 2. Social Proof Bar — 信任锚点（合规、数据、伙伴）
 * 3. Bento Grid 产品入口 — 视觉节奏感、Apple Bento布局
 * 4. 双通道对比 — 清晰角色区分
 * 5. 核心能力 — 数字驱动的能力展示
 * 6. Cinematic CTA — 高转化收尾
 *
 * 关键改进：
 * - 更大的字号与留白（Apple风格）
 * - Scroll-triggered reveal动画
 * - Stripe mesh渐变背景
 * - 更精致的micro-interactions
 * - 社会证明/信任锚点
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
                  <div class="relative h-[200px] sm:h-[240px] overflow-hidden flex items-center justify-center" style={`background: linear-gradient(135deg, ${slide.color}15 0%, ${slide.color}08 50%, #f8fafc 100%);`}>
                    <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(rgba(93,196,179,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.3) 1px, transparent 1px); background-size: 40px 40px;"></div>
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
                  <div class="px-7 sm:px-10 py-6 sm:py-8">
                    <div class="flex items-center gap-2.5 mb-3">
                      <div class="w-9 h-9 rounded-xl flex items-center justify-center" style={`background: ${slide.color}15;`}>
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
                  <button onclick={`goToSlide(${idx})`} class="slider-dot w-2 h-2 rounded-full transition-all duration-300" style={idx === 0 ? `background: #5DC4B3; width: 20px;` : `background: #d1d5db;`} data-index={idx}></button>
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

      {/* Modal JS Controller */}
      <script dangerouslySetInnerHTML={{ __html: `
        var currentSlide = 0;
        var totalSlides = ${sliderSlides.length};
        var modalVisible = false;
        document.addEventListener('DOMContentLoaded', function() {
          if (!sessionStorage.getItem('mc_welcome_seen')) {
            setTimeout(function() {
              var modal = document.getElementById('welcome-modal');
              if (modal) { modal.style.display = 'flex'; modalVisible = true; document.body.style.overflow = 'hidden'; }
            }, 800);
          }
          var sc = document.getElementById('slider-container');
          var touchStartX = 0;
          if (sc) {
            sc.addEventListener('touchstart', function(e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
            sc.addEventListener('touchend', function(e) {
              var diff = touchStartX - e.changedTouches[0].screenX;
              if (Math.abs(diff) > 50) { if (diff > 0) nextSlideOrClose(); else if (currentSlide > 0) { currentSlide--; updateSlider(); } }
            });
          }
        });
        function closeWelcomeModal() {
          var modal = document.getElementById('welcome-modal');
          if (!modal || !modalVisible) return;
          var card = modal.querySelector('.modal-enter');
          if (card) { card.classList.remove('modal-enter'); card.classList.add('modal-exit'); }
          modalVisible = false;
          setTimeout(function() { modal.style.display = 'none'; document.body.style.overflow = ''; sessionStorage.setItem('mc_welcome_seen', '1'); }, 250);
        }
        function goToSlide(idx) { currentSlide = idx; updateSlider(); }
        function nextSlideOrClose() { if (currentSlide >= totalSlides - 1) closeWelcomeModal(); else { currentSlide++; updateSlider(); } }
        function updateSlider() {
          var track = document.getElementById('slider-track');
          if (track) track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
          document.querySelectorAll('.slider-dot').forEach(function(dot, i) {
            dot.style.background = i === currentSlide ? '#5DC4B3' : '#d1d5db';
            dot.style.width = i === currentSlide ? '20px' : '8px';
          });
          var counter = document.getElementById('slider-counter');
          if (counter) counter.textContent = (currentSlide + 1) + ' / ' + totalSlides;
          var btnText = document.getElementById('slider-btn-text');
          var btnIcon = document.getElementById('slider-btn-icon');
          if (currentSlide >= totalSlides - 1) { btnText.textContent = '开始探索'; btnIcon.className = 'fas fa-rocket ml-2 text-[10px]'; }
          else { btnText.textContent = '下一步'; btnIcon.className = 'fas fa-arrow-right ml-2 text-[10px]'; }
        }
        document.addEventListener('keydown', function(e) {
          if (!modalVisible) return;
          if (e.key === 'Escape') closeWelcomeModal();
          if (e.key === 'ArrowRight') nextSlideOrClose();
          if (e.key === 'ArrowLeft' && currentSlide > 0) { currentSlide--; updateSlider(); }
        });
      `}} />


      {/* ═══════════════════════════════════════════
          HERO — Cinematic Full-screen
          Apple-style: massive typography, extreme whitespace, precision
      ═══════════════════════════════════════════ */}
      <section class="aurora-bg aurora-hero relative min-h-[100vh] flex items-center justify-center pt-20 pb-24">
        {/* Decorative layer */}
        <div class="absolute inset-0" style="z-index: 2;">
          <div class="absolute inset-0 opacity-[0.025]" style="background-image: linear-gradient(rgba(93,196,179,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.3) 1px, transparent 1px); background-size: 80px 80px;"></div>
          
          {/* Orbital rings - more subtle */}
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] orbit-ring opacity-[0.03]">
            <svg viewBox="0 0 800 800" fill="none" class="w-full h-full">
              <circle cx="400" cy="400" r="390" stroke="#5DC4B3" stroke-width="0.5" stroke-dasharray="8 16" />
              <circle cx="400" cy="400" r="310" stroke="#5DC4B3" stroke-width="0.3" stroke-dasharray="4 20" />
            </svg>
          </div>

          {/* Floating particles - more refined */}
          <div class="floating-element top-[12%] left-[8%] w-3 h-3 rounded-full opacity-[0.15]" style="background: #5DC4B3; animation-delay: 0s;"></div>
          <div class="floating-element top-[22%] right-[12%] w-2.5 h-2.5 rounded-full opacity-[0.10]" style="background: #6366F1; animation-delay: 1.5s;"></div>
          <div class="floating-element bottom-[18%] left-[15%] w-2 h-2 rounded-full opacity-[0.12]" style="background: #F59E0B; animation-delay: 3s;"></div>
          <div class="floating-element bottom-[28%] right-[10%] w-2.5 h-2.5 rounded-full opacity-[0.08]" style="background: #10B981; animation-delay: 4.5s;"></div>
          <div class="floating-element top-[50%] left-[5%] w-2 h-2 rounded-full opacity-[0.06]" style="background: #8B5CF6; animation-delay: 2s;"></div>

          {/* Subtle glow orbs */}
          <div class="absolute top-[20%] right-[20%] w-[400px] h-[400px] rounded-full opacity-[0.04]" style="background: radial-gradient(circle, #5DC4B3 0%, transparent 60%);"></div>
          <div class="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] rounded-full opacity-[0.03]" style="background: radial-gradient(circle, #6366F1 0%, transparent 60%);"></div>
        </div>

        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full" style="z-index: 10;">
          <div class="text-center">
            {/* Brand Logo - cinematic entrance */}
            <div class="mb-10 flex justify-center hero-text-in hero-text-in-1">
              <div class="opacity-95">
                <BrandLogo height={68} variant="light" />
              </div>
            </div>

            {/* Eyebrow - subtle badge */}
            <div class="hero-text-in hero-text-in-2 mb-8">
              <div class="inline-flex items-center gap-2.5 px-5 py-2 bg-white/[0.04] border border-white/[0.06] text-white/50 text-xs font-medium rounded-full backdrop-blur-sm">
                <span class="relative flex h-1.5 w-1.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5DC4B3] opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5DC4B3]"></span>
                </span>
                Revenue-Based Financing Infrastructure
              </div>
            </div>

            {/* Main Headline — Apple-style massive typography */}
            <h1 class="hero-text-in hero-text-in-3 text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] font-extrabold text-white leading-[1.06] tracking-tight mb-7">
              收入分成投资的<br />
              <span class="bg-gradient-to-r from-[#5DC4B3] via-[#7DD4C7] to-[#5DC4B3] bg-clip-text text-transparent gradient-animate" style="background-size: 200% 200%;">基础设施级平台</span>
            </h1>

            {/* Subheadline - refined */}
            <p class="hero-text-in hero-text-in-4 text-base sm:text-lg text-white/30 max-w-lg mx-auto mb-12 leading-relaxed font-light tracking-wide">
              9个AI超级Agent · 全链路智能化<br class="hidden sm:block" />
              从身份认证到投后管理的完整投融资生命周期
            </p>

            {/* CTA Group — Apple-style clean CTAs */}
            <div class="hero-text-in hero-text-in-5 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {(() => { const idP = products.find(p => p.id === 'identity')!; return (
              <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="group relative inline-flex items-center px-8 py-4 text-white font-bold text-[15px] rounded-2xl transition-all no-underline overflow-hidden" style="background: linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%); box-shadow: 0 0 40px rgba(93,196,179,0.25), 0 4px 15px rgba(93,196,179,0.2);">
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <i class="fas fa-fingerprint mr-2.5 text-base group-hover:scale-110 transition-transform"></i>
                <span class="relative">
                  立即注册身份通
                  <span class="block text-[10px] font-normal text-white/60 mt-0.5">开启收入分成投资之旅</span>
                </span>
              </a>
              ) })()}
              <a href="#product-entry" class="inline-flex items-center px-8 py-4 bg-white/[0.06] hover:bg-white/[0.10] text-white/60 hover:text-white font-semibold text-[15px] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all no-underline backdrop-blur-sm">
                <i class="fas fa-th-large mr-2.5 text-sm"></i>
                浏览全部产品
              </a>
            </div>

            {/* Metric Stats — Apple-style large numbers */}
            <div class="hero-text-in hero-text-in-6 max-w-3xl mx-auto">
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {[
                  { val: '9', label: 'AI Agents', desc: '超级智能代理' },
                  { val: '5', label: 'Phases', desc: '全流程覆盖' },
                  { val: '∞', label: 'Industries', desc: '跨行业通用' },
                  { val: 'AI', label: 'Engine', desc: '个性化筛子' },
                ].map((d, idx) => (
                  <div class="text-center" style={`animation-delay: ${0.9 + idx * 0.1}s;`}>
                    <div class={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 number-reveal ${d.val === 'AI' ? 'bg-gradient-to-r from-[#5DC4B3] to-[#7DD4C7] bg-clip-text text-transparent' : 'text-white'}`} style={`animation-delay: ${0.9 + idx * 0.15}s;`}>{d.val}</div>
                    <div class="text-[10px] text-white/20 font-bold tracking-widest uppercase mb-0.5">{d.label}</div>
                    <div class="text-[11px] text-white/15 font-medium">{d.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" style="z-index: 10;">
          <span class="text-[9px] text-white/40 tracking-[0.2em] uppercase font-medium">Scroll</span>
          <div class="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
            <div class="w-1 h-2 bg-white/30 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" style="z-index: 3;"></div>
      </section>


      {/* ═══════════════════════════════════════════
          TRUST BAR — Social Proof Strip
          (Stripe/Plaid style: regulatory + data trust)
      ═══════════════════════════════════════════ */}
      <section class="py-6 border-b border-gray-100 bg-white relative reveal">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: 'fa-shield-alt', text: '金融级安全', color: '#5DC4B3' },
              { icon: 'fa-university', text: '香港SFC合规', color: '#6366F1' },
              { icon: 'fa-lock', text: '多因素认证', color: '#F59E0B' },
              { icon: 'fa-globe-asia', text: '全球覆盖', color: '#8B5CF6' },
              { icon: 'fa-chart-bar', text: '实时透明', color: '#10B981' },
            ].map((item) => (
              <div class="flex items-center gap-2 text-gray-400">
                <i class={`fas ${item.icon} text-xs`} style={`color: ${item.color};`}></i>
                <span class="text-[11px] font-semibold tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          PRODUCT ENTRY — Bento Grid Layout
          Apple Bento + Stripe rhythm = 视觉节奏感
      ═══════════════════════════════════════════ */}
      <section class="py-20 lg:py-28 bg-white" id="product-entry">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header — Apple style: massive + clean */}
          <div class="text-center mb-16 reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/8 text-[#5DC4B3] text-[10px] font-bold rounded-full mb-5 border border-[#5DC4B3]/15 tracking-[0.15em] uppercase">
              <i class="fas fa-th-large text-[9px]"></i>
              Product Suite
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#1d1d1f] mb-5 tracking-tight leading-tight">
              9大产品，<br class="sm:hidden" />一个闭环
            </h2>
            <p class="text-sm sm:text-base text-gray-400 max-w-md mx-auto leading-relaxed">
              Y型架构 · AI超级Agent矩阵 · 覆盖投融资全生命周期
            </p>
          </div>

          {/* 身份通 — Hero Card (Bento large) */}
          <div class="mb-8 reveal">
            {(() => { const idP = products.find(p => p.id === 'identity')!; return (
            <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="block no-underline group">
              <div class="relative overflow-hidden rounded-3xl p-8 sm:p-10 border border-[#5DC4B3]/15 hover:border-[#5DC4B3]/30 transition-all bento-item" style="background: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);">
                {/* Glow orb */}
                <div class="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15" style="background: radial-gradient(circle, rgba(46,196,182,0.3) 0%, transparent 60%); transform: translate(30%, -30%);"></div>
                <div class="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full opacity-10" style="background: radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 60%); transform: translate(-30%, 30%);"></div>
                
                <div class="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div class="flex items-center gap-5">
                    <ProductLogoSmall name="身份通" englishShort="Identity" size={60} />
                    <div>
                      <div class="flex items-center gap-2.5 mb-1.5">
                        <h3 class="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#5DC4B3] transition-colors tracking-tight">身份通</h3>
                        <span class="text-[9px] px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/25 font-bold">已上线</span>
                      </div>
                      <p class="text-xs text-white/30 font-medium tracking-wide">Identity Connect · 统一入口</p>
                    </div>
                  </div>
                  <div class="flex-1 sm:text-right">
                    <p class="text-sm text-white/40 leading-relaxed mb-4 sm:mb-3">
                      所有用户的统一入口 — 认证后自动识别角色，分流至投资者或融资者路径
                    </p>
                    <div class="inline-flex items-center px-6 py-3 bg-[#5DC4B3] hover:bg-[#4AB5A5] text-white text-sm font-bold rounded-2xl transition-all group-hover:shadow-[0_0_30px_rgba(93,196,179,0.3)]">
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

          {/* 其他8个产品 — Bento Grid with phase headers */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 reveal">
            {phaseConfig.slice(1).map((phase) => (
              <div class="space-y-3">
                {/* Phase header — refined */}
                <div class="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gray-50/80 border border-gray-100/80">
                  <div class="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px]" style={`background: ${phase.color};`}>
                    <i class={`fas ${phase.icon}`}></i>
                  </div>
                  <div>
                    <div class="text-[9px] font-bold text-gray-300 tracking-[0.1em] uppercase">{phase.labelEn}</div>
                    <div class="text-xs font-bold text-[#1d1d1f]">{phase.label}</div>
                  </div>
                </div>
                {/* Product cards — Bento items */}
                {phase.ids.map((id) => {
                  const p = products.find(pr => pr.id === id)!
                  return (
                    <a href={getProductUrl(p)} target={isExternalProduct(p) ? "_blank" : undefined} rel={isExternalProduct(p) ? "noopener noreferrer" : undefined} class="block no-underline group">
                      <div class="bg-white border border-gray-100 hover:border-gray-200 rounded-2xl p-4 transition-all portal-card card-glow">
                        <div class="flex items-start gap-3">
                          <ProductLogoSmall name={p.name} englishShort={p.englishShort} size={40} />
                          <div class="flex-1 min-w-0">
                            <h3 class="text-[13px] font-bold text-[#1d1d1f] group-hover:text-[#5DC4B3] transition-colors">{p.name}</h3>
                            <p class="text-[10px] text-gray-400 mt-0.5 font-medium">{p.englishShort}</p>
                          </div>
                        </div>
                        <p class="text-[11px] text-gray-500 mt-2.5 leading-relaxed line-clamp-2">{p.description}</p>
                        <div class="mt-3 flex items-center gap-1.5 flex-wrap">
                          <span class={`text-[9px] px-2 py-0.5 rounded-full border font-semibold ${statusLabels[p.status].class}`}>
                            {statusLabels[p.status].text}
                          </span>
                          {p.isFilter && (
                            <span class="text-[9px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 font-semibold">
                              <i class="fas fa-filter mr-0.5 text-[7px]"></i>AI筛子
                            </span>
                          )}
                          {p.isCollaborative && (
                            <span class="text-[9px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100 font-semibold">
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

          {/* Action buttons — clean */}
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 reveal">
            <a href="/design" class="inline-flex items-center px-7 py-3.5 bg-white text-[#1d1d1f] font-bold text-sm rounded-2xl border border-gray-200 hover:border-[#5DC4B3] hover:text-[#5DC4B3] transition-all no-underline group">
              <i class="fas fa-book-open mr-2 text-xs group-hover:text-[#5DC4B3]"></i>
              产品设计背后的故事
              <i class="fas fa-arrow-right ml-2 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
            </a>
            <a href="/portal" class="inline-flex items-center px-7 py-3.5 text-white font-bold text-sm rounded-2xl transition-all no-underline hover:brightness-110" style="background: linear-gradient(135deg, #0a2e2a 0%, #0f3d36 50%, #164e47 100%);">
              <i class="fas fa-th-large mr-2"></i>完整产品入口
            </a>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SEPARATOR
      ═══════════════════════════════════════════ */}
      <div class="section-separator"></div>


      {/* ═══════════════════════════════════════════
          DUAL VALUE — Investor vs Business
          Apple-style: massive cards, clear contrast
      ═══════════════════════════════════════════ */}
      <section class="py-20 lg:py-28 bg-[#FAFAFA] mesh-gradient">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-14 reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-gray-500 text-[10px] font-bold rounded-full mb-5 border border-gray-200 tracking-[0.15em] uppercase shadow-sm">
              Dual Channel
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight">
              双通道，精准服务
            </h2>
            <p class="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              身份通注册后，投资者和融资企业各自拥有完整的专属工具链
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6 lg:gap-8 reveal">
            {/* Investor */}
            <div class="relative rounded-3xl bg-white p-8 lg:p-10 border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all group overflow-hidden card-glow">
              <div class="absolute top-0 right-0 w-[200px] h-[200px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%); transform: translate(30%, -30%);"></div>
              <div class="relative">
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <i class="fas fa-chart-pie text-indigo-500 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-extrabold text-[#1d1d1f]">投资者</h3>
                    <p class="text-xs text-indigo-400 font-medium mt-0.5">Investor Platform</p>
                  </div>
                </div>
                <ul class="space-y-5 mb-8">
                  {[
                    { title: '个性化AI评估', desc: '自定义评估模型和风控规则，精准匹配投资偏好' },
                    { title: '智能机会看板', desc: '经AI筛选的优质项目一览，支持多维度排序与对比' },
                    { title: '投后全透明', desc: '自动结算 + 实时履约监控，每笔收入分成清清楚楚' },
                  ].map(item => (
                    <li class="flex items-start gap-3.5">
                      <span class="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i class="fas fa-check text-indigo-500 text-[9px]"></i>
                      </span>
                      <div>
                        <strong class="text-[13px] text-[#1d1d1f] block mb-0.5">{item.title}</strong>
                        <span class="text-[12px] text-gray-500 leading-relaxed">{item.desc}</span>
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

            {/* Business */}
            <div class="relative rounded-3xl bg-white p-8 lg:p-10 border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all group overflow-hidden card-glow">
              <div class="absolute top-0 right-0 w-[200px] h-[200px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%); transform: translate(30%, -30%);"></div>
              <div class="relative">
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
                    <i class="fas fa-store text-amber-500 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-extrabold text-[#1d1d1f]">融资企业</h3>
                    <p class="text-xs text-amber-400 font-medium mt-0.5">Business Platform</p>
                  </div>
                </div>
                <ul class="space-y-5 mb-8">
                  {[
                    { title: '智能申请助手', desc: '自动整理经营数据、生成标准化Pitch Deck' },
                    { title: '精准曝光', desc: '标准化数据直接进入投资者AI筛选池，高效匹配' },
                    { title: '灵活分成模式', desc: '有收入才分配，不是传统借贷，与经营绑定' },
                  ].map(item => (
                    <li class="flex items-start gap-3.5">
                      <span class="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i class="fas fa-check text-amber-500 text-[9px]"></i>
                      </span>
                      <div>
                        <strong class="text-[13px] text-[#1d1d1f] block mb-0.5">{item.title}</strong>
                        <span class="text-[12px] text-gray-500 leading-relaxed">{item.desc}</span>
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
      </section>


      {/* ═══════════════════════════════════════════
          PLATFORM CAPABILITIES — Apple-style feature grid
          Numbers-driven, clean, impactful
      ═══════════════════════════════════════════ */}
      <section class="py-20 lg:py-28 bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16 reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/8 text-[#5DC4B3] text-[10px] font-bold rounded-full mb-5 border border-[#5DC4B3]/15 tracking-[0.15em] uppercase">
              Capabilities
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight">
              不只是工具，是投资基础设施
            </h2>
            <p class="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              每一个能力都经过金融级标准打磨
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {[
              { icon: 'fa-code-branch', color: '#5DC4B3', title: 'Y型分流架构', desc: '身份通统一入口，智能识别角色后自动分流。投资者和融资企业各走专属路径，条款协商时精准汇合。', tag: 'Architecture' },
              { icon: 'fa-robot', color: '#6366F1', title: '个性化AI筛子', desc: '投资者自定义评估标准和风控规则。评估通和风控通作为AI代理，在海量项目中执行个性化筛选。', tag: 'AI Engine' },
              { icon: 'fa-layer-group', color: '#F59E0B', title: '跨行业通用', desc: '不按赛道造轮子。餐饮、零售、医美、教育——同一套Agent矩阵适配一切收入分成场景。', tag: 'Scalability' },
              { icon: 'fa-handshake', color: '#8B5CF6', title: '投融资协同', desc: '条款通+合约通实现双方在线协商、电子签约。从出价到签约全流程线上完成。', tag: 'Collaboration' },
              { icon: 'fa-chart-line', color: '#EF4444', title: '全生命周期管理', desc: '结算通自动执行收入分成，履约通实时监控经营数据。投后不再是黑箱。', tag: 'Lifecycle' },
              { icon: 'fa-database', color: '#10B981', title: '统一数据底座', desc: 'Account身份体系、Data数据底座、AI智能引擎。三层基础设施确保9个Agent共享数据。', tag: 'Foundation' },
            ].map((item) => (
              <div class="group bg-gray-50/50 rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all hover:bg-white card-glow">
                <div class="flex items-center gap-3 mb-5">
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={`background: ${item.color}10;`}>
                    <i class={`fas ${item.icon}`} style={`color: ${item.color}; font-size: 16px;`}></i>
                  </div>
                  <span class="text-[9px] font-bold text-gray-300 tracking-[0.1em] uppercase">{item.tag}</span>
                </div>
                <h3 class="text-[15px] font-bold text-[#1d1d1f] mb-2.5 group-hover:text-[#5DC4B3] transition-colors">{item.title}</h3>
                <p class="text-[13px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SEPARATOR
      ═══════════════════════════════════════════ */}
      <div class="section-separator"></div>


      {/* ═══════════════════════════════════════════
          FINAL CTA — Cinematic close
          One clear action, emotional appeal
      ═══════════════════════════════════════════ */}
      <section class="aurora-bg aurora-cta relative py-28 lg:py-36">
        <div class="absolute inset-0" style="z-index: 2;">
          <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(rgba(93,196,179,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.3) 1px, transparent 1px); background-size: 80px 80px;"></div>
          <div class="floating-element top-[10%] left-[10%] w-3 h-3 rounded-full opacity-[0.10]" style="background: #5DC4B3; animation-delay: 0.5s;"></div>
          <div class="floating-element top-[20%] right-[15%] w-2 h-2 rounded-full opacity-[0.07]" style="background: #6366F1; animation-delay: 2s;"></div>
          <div class="floating-element bottom-[15%] left-[20%] w-2.5 h-2.5 rounded-full opacity-[0.08]" style="background: #10B981; animation-delay: 3.5s;"></div>
          <div class="floating-element bottom-[25%] right-[10%] w-2 h-2 rounded-full opacity-[0.10]" style="background: #F59E0B; animation-delay: 1s;"></div>
        </div>
        <div class="max-w-3xl mx-auto px-4 text-center relative reveal" style="z-index: 10;">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#5DC4B3]/10 rounded-full mb-8 border border-[#5DC4B3]/15">
            <i class="fas fa-fingerprint text-[#5DC4B3] text-sm"></i>
            <span class="text-xs font-semibold text-[#5DC4B3]">从身份通开始</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            收入分成投资的未来，<br />
            <span class="text-[#5DC4B3]">从这里开始</span>
          </h2>
          <p class="text-white/30 text-sm sm:text-base mb-12 leading-relaxed max-w-lg mx-auto">
            无论您是机构投资者、个人投资者还是融资企业，<br class="hidden sm:block" />
            注册身份通即可开启全流程闭环体验
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            {(() => { const idP = products.find(p => p.id === 'identity')!; return (
            <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="group inline-flex items-center px-9 py-4 bg-[#5DC4B3] hover:bg-[#4AB5A5] text-white font-bold text-[15px] rounded-2xl shadow-[0_0_40px_rgba(93,196,179,0.25)] transition-all no-underline">
              <i class="fas fa-fingerprint mr-2.5 group-hover:scale-110 transition-transform"></i>立即注册身份通
            </a>
            ) })()}
            <a href="/contact" class="inline-flex items-center px-9 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white/50 hover:text-white font-semibold text-[15px] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all no-underline">
              <i class="fas fa-envelope mr-2.5"></i>联系我们
            </a>
          </div>
          <p class="text-white/15 text-xs mt-10 tracking-wide">
            获取完整产品白皮书 · 预约产品演示 · 了解合作方案
          </p>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          SCROLL REVEAL + INTERACTION ENGINE
          Intersection Observer for all sections
      ═══════════════════════════════════════════ */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {

          // === Scroll Reveal System ===
          var reveals = document.querySelectorAll('.reveal');
          var revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.06, rootMargin: '0px 0px -60px 0px' });
          reveals.forEach(function(el) { revealObserver.observe(el); });

          // === Stagger Children ===
          var staggers = document.querySelectorAll('.stagger-children');
          var staggerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                staggerObserver.unobserve(entry.target);
              }
            });
          }, { threshold: 0.08 });
          staggers.forEach(function(el) { staggerObserver.observe(el); });

          // === Card Glow — Mouse tracking ===
          document.querySelectorAll('.card-glow, .bento-item').forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
              var rect = card.getBoundingClientRect();
              card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
              card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
            });
          });

          // === Parallax Lite ===
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

          // === Navbar scroll enhancement ===
          var navbar = document.querySelector('.navbar-glass');
          if (navbar) {
            var wasScrolled = false;
            window.addEventListener('scroll', function() {
              var y = window.scrollY;
              if (y > 30 && !wasScrolled) {
                wasScrolled = true;
                navbar.classList.add('scrolled');
              } else if (y <= 30 && wasScrolled) {
                wasScrolled = false;
                navbar.classList.remove('scrolled');
              }
            }, { passive: true });
          }
        });
      `}} />

      <Footer />
    </div>
  )
}
