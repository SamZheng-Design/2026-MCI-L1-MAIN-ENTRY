import type { FC } from 'hono/jsx'
import { products, foundations, architectureGroups, statusLabels, designSections } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { BrandLogo, ProductLogoSmall } from '../components/Logos'

const TEAL = '#5DC4B3'

/*
 * 官网首页 — 重构版
 * 
 * 核心改动（Sam指示）：
 * 1. 首页进入 = 全屏大屏Logo介绍
 * 2. 产品入口前置到首页（后续官网最重要入口）
 * 3. 突出身份通 = 邀请大家注册
 * 4. 进入首页弹窗 = 滑块形式介绍产品设计
 * 5. 弹窗里有"产品设计背后故事"链接 → 点击进入 /design 详细产品介绍
 * 6. 这是金融产品入口，需要专业感+信任感
 * 
 * 布局逻辑（新版）：
 * 1. Welcome Modal（滑块弹窗）— 进入首页自动弹出
 * 2. Full-screen Hero — 大屏Logo + 品牌宣言 + 身份通注册CTA
 * 3. Product Entry Section — 9个通的产品入口（核心！前置到首页）
 * 4. 双通道价值主张
 * 5. 平台能力
 * 6. CTA收尾
 */

// 5阶段流程配色
const phaseConfig = [
  { label: '统一入口', labelEn: 'Entry', color: '#5DC4B3', icon: 'fa-fingerprint', ids: ['identity'] },
  { label: '融资路径', labelEn: 'Borrower', color: '#F59E0B', icon: 'fa-store', ids: ['application'] },
  { label: '投资路径', labelEn: 'Investor', color: '#6366F1', icon: 'fa-chart-pie', ids: ['assess', 'risk', 'opportunity'] },
  { label: '交易撮合', labelEn: 'Deal', color: '#8B5CF6', icon: 'fa-handshake', ids: ['terms', 'contract'] },
  { label: '投后管理', labelEn: 'Post-Inv', color: '#10B981', icon: 'fa-chart-line', ids: ['settlement', 'performance'] },
]

// 弹窗滑块内容 — 产品设计精华介绍
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
    <div class="min-h-screen">
      <Navbar active="home" />

      {/* ═══════════════════════════════════════════
          WELCOME MODAL — 滑块式产品设计介绍弹窗
          进入首页自动弹出，滑块形式介绍产品设计
      ═══════════════════════════════════════════ */}
      <div id="welcome-modal" class="fixed inset-0 z-[100] flex items-center justify-center" style="display:none;">
        {/* Overlay */}
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeWelcomeModal()"></div>
        
        {/* Modal Card */}
        <div class="relative w-[92vw] max-w-[680px] bg-white rounded-3xl shadow-2xl overflow-hidden modal-enter" style="max-height: 88vh;">
          {/* Close button */}
          <button onclick="closeWelcomeModal()" class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors">
            <i class="fas fa-times text-gray-400 text-sm"></i>
          </button>

          {/* Slider container */}
          <div id="slider-container" class="relative overflow-hidden">
            <div id="slider-track" class="flex transition-transform duration-500" style="transform: translateX(0%);">
              {sliderSlides.map((slide, idx) => (
                <div class="w-full flex-shrink-0 flex flex-col" style="min-width: 100%;">
                  {/* Slide visual header */}
                  <div class="relative h-[200px] sm:h-[240px] overflow-hidden flex items-center justify-center" 
                       style={`background: linear-gradient(135deg, ${slide.color}15 0%, ${slide.color}08 50%, #f8fafc 100%);`}>
                    {/* Decorative elements */}
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
                          <i class="fas fa-fingerprint text-xl" style={`color: #5DC4B3;`}></i>
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

                  {/* Slide content */}
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

          {/* Slider controls */}
          <div class="px-7 sm:px-10 pb-6 sm:pb-8 flex items-center justify-between">
            {/* Dots */}
            <div class="flex items-center gap-2">
              {sliderSlides.map((_, idx) => (
                <button 
                  onclick={`goToSlide(${idx})`}
                  class="slider-dot w-2 h-2 rounded-full transition-all duration-300"
                  style={idx === 0 ? `background: #5DC4B3; width: 20px;` : `background: #d1d5db;`}
                  data-index={idx}
                ></button>
              ))}
            </div>

            <div class="flex items-center gap-2">
              {/* Story link */}
              <a href="/design" onclick="closeWelcomeModal()" class="hidden sm:inline-flex items-center px-3 py-2 text-[11px] text-gray-400 hover:text-[#5DC4B3] font-medium rounded-lg transition-colors no-underline">
                <i class="fas fa-book-open mr-1.5 text-[9px]"></i>
                设计背后的故事
              </a>

              {/* Next / Enter button */}
              <button id="slider-next-btn" onclick="nextSlideOrClose()" class="inline-flex items-center px-5 py-2.5 bg-[#0B1A18] hover:bg-[#1a3832] text-white text-xs font-bold rounded-xl transition-all">
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
        var modalShown = false;

        // 首次进入自动弹出弹窗
        document.addEventListener('DOMContentLoaded', function() {
          // 检查session是否已看过
          if (!sessionStorage.getItem('mc_welcome_seen')) {
            setTimeout(function() {
              document.getElementById('welcome-modal').style.display = 'flex';
              modalShown = true;
            }, 800);
          }
        });

        function closeWelcomeModal() {
          var modal = document.getElementById('welcome-modal');
          var card = modal.querySelector('.modal-enter');
          if (card) {
            card.classList.remove('modal-enter');
            card.classList.add('modal-exit');
          }
          setTimeout(function() {
            modal.style.display = 'none';
            sessionStorage.setItem('mc_welcome_seen', '1');
          }, 250);
        }

        function goToSlide(idx) {
          currentSlide = idx;
          updateSlider();
        }

        function nextSlideOrClose() {
          if (currentSlide >= totalSlides - 1) {
            closeWelcomeModal();
          } else {
            currentSlide++;
            updateSlider();
          }
        }

        function updateSlider() {
          var track = document.getElementById('slider-track');
          track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
          
          // Update dots
          var dots = document.querySelectorAll('.slider-dot');
          dots.forEach(function(dot, i) {
            if (i === currentSlide) {
              dot.style.background = '#5DC4B3';
              dot.style.width = '20px';
            } else {
              dot.style.background = '#d1d5db';
              dot.style.width = '8px';
            }
          });

          // Update button
          var btnText = document.getElementById('slider-btn-text');
          var btnIcon = document.getElementById('slider-btn-icon');
          if (currentSlide >= totalSlides - 1) {
            btnText.textContent = '开始探索';
            btnIcon.className = 'fas fa-rocket ml-2 text-[10px]';
          } else {
            btnText.textContent = '下一步';
            btnIcon.className = 'fas fa-arrow-right ml-2 text-[10px]';
          }
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
          if (!modalShown) return;
          var modal = document.getElementById('welcome-modal');
          if (modal.style.display === 'none') return;
          if (e.key === 'Escape') closeWelcomeModal();
          if (e.key === 'ArrowRight') nextSlideOrClose();
          if (e.key === 'ArrowLeft' && currentSlide > 0) { currentSlide--; updateSlider(); }
        });

        // Swipe support
        var touchStartX = 0;
        document.getElementById('slider-container')?.addEventListener('touchstart', function(e) {
          touchStartX = e.changedTouches[0].screenX;
        });
        document.getElementById('slider-container')?.addEventListener('touchend', function(e) {
          var diff = touchStartX - e.changedTouches[0].screenX;
          if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlideOrClose();
            else if (currentSlide > 0) { currentSlide--; updateSlider(); }
          }
        });
      `}} />


      {/* ═══════════════════════════════════════════
          HERO — Full-screen 大屏Logo + 身份通注册CTA
          深色、沉浸感、金融级专业质感
      ═══════════════════════════════════════════ */}
      <section class="relative overflow-hidden bg-[#0B1A18] min-h-[100vh] flex items-center justify-center pt-16 pb-20">
        {/* 多层背景效果 */}
        <div class="absolute inset-0">
          <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(93,196,179,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.3) 1px, transparent 1px); background-size: 60px 60px;"></div>
          <div class="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[900px] h-[900px] rounded-full" style="background: radial-gradient(circle, rgba(93,196,179,0.08) 0%, transparent 55%);"></div>
          <div class="absolute bottom-[-15%] right-[5%] w-[500px] h-[500px] rounded-full" style="background: radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 60%);"></div>
          <div class="absolute top-[30%] left-[5%] w-[300px] h-[300px] rounded-full" style="background: radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 60%);"></div>
        </div>

        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div class="text-center fade-in">
            {/* 大屏品牌Logo */}
            <div class="mb-8 flex justify-center">
              <div class="opacity-95">
                <BrandLogo height={72} />
              </div>
            </div>

            {/* Eyebrow badge */}
            <div class="inline-flex items-center gap-2.5 px-5 py-2 bg-white/[0.04] border border-white/[0.06] text-white/50 text-xs font-medium rounded-full mb-8 backdrop-blur-sm">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5DC4B3] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-[#5DC4B3]"></span>
              </span>
              Revenue-Based Financing Infrastructure
            </div>

            {/* 主标题 */}
            <h1 class="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-white leading-[1.08] tracking-tight mb-6">
              收入分成投资的<br />
              <span class="bg-gradient-to-r from-[#5DC4B3] via-[#7DD4C7] to-[#5DC4B3] bg-clip-text text-transparent">基础设施级平台</span>
            </h1>

            <p class="text-base sm:text-lg text-white/35 max-w-xl mx-auto mb-10 leading-relaxed font-light">
              9个AI超级Agent覆盖完整投融资生命周期<br class="hidden sm:block" />
              从身份认证到投后管理，全链路智能化
            </p>

            {/* ★ 核心CTA：身份通注册 + 产品入口 */}
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              {/* 身份通注册 — 最突出的CTA */}
              <a href="/identity" class="group relative inline-flex items-center px-8 py-4 text-white font-bold text-[15px] rounded-xl transition-all no-underline overflow-hidden" style="background: linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%); box-shadow: 0 0 40px rgba(93,196,179,0.3), 0 4px 15px rgba(93,196,179,0.25);">
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <i class="fas fa-fingerprint mr-2.5 text-base group-hover:scale-110 transition-transform"></i>
                <span class="relative">
                  立即注册身份通
                  <span class="block text-[10px] font-normal text-white/70 mt-0.5">开启您的收入分成投资之旅</span>
                </span>
              </a>
              {/* 产品入口 */}
              <a href="#product-entry" class="inline-flex items-center px-8 py-4 bg-white/[0.06] hover:bg-white/[0.10] text-white/70 hover:text-white font-semibold text-[15px] rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-all no-underline backdrop-blur-sm">
                <i class="fas fa-th-large mr-2.5 text-sm"></i>
                浏览产品入口
              </a>
            </div>

            {/* 身份通特别提示 */}
            <div class="max-w-md mx-auto mb-14">
              <div class="flex items-center justify-center gap-3 px-5 py-3 bg-[#5DC4B3]/8 border border-[#5DC4B3]/15 rounded-xl backdrop-blur-sm">
                <i class="fas fa-shield-alt text-[#5DC4B3] text-sm"></i>
                <p class="text-[12px] text-[#5DC4B3]/80 font-medium">
                  <strong class="text-[#5DC4B3]">身份通</strong>是所有产品的统一入口 — 注册后自动识别角色，分流至投资者或融资者专属路径
                </p>
              </div>
            </div>

            {/* Hero数据条 */}
            <div class="max-w-4xl mx-auto">
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]">
                {[
                  { val: '9', sub: 'Super Agents' },
                  { val: '5', sub: 'Workflow Phases' },
                  { val: 'AI', sub: 'Filtering Engine', gradient: true },
                  { val: '\u221E', sub: 'Industry Coverage' },
                ].map((d) => (
                  <div class="bg-[#0B1A18]/80 backdrop-blur-sm px-6 py-6 text-center hover:bg-white/[0.02] transition-colors">
                    <div class={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 ${d.gradient ? 'bg-gradient-to-r from-[#5DC4B3] to-[#7DD4C7] bg-clip-text text-transparent' : 'text-white'}`}>{d.val}</div>
                    <div class="text-[10px] text-white/25 font-medium tracking-wider uppercase">{d.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span class="text-[10px] text-white/50 tracking-widest uppercase">Scroll</span>
          <div class="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div class="w-1 h-2 bg-white/40 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>


      {/* ═══════════════════════════════════════════
          PRODUCT ENTRY — 产品入口（前置到首页！核心区域）
          这是后续官网最重要的入口
      ═══════════════════════════════════════════ */}
      <section class="py-16 lg:py-24 bg-white" id="product-entry">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div class="text-center mb-14">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/8 text-[#5DC4B3] text-xs font-bold rounded-full mb-4 border border-[#5DC4B3]/15 tracking-wider uppercase">
              <i class="fas fa-th-large text-[10px]"></i>
              Product Entry
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight">
              9大产品入口
            </h2>
            <p class="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
              Y型架构 · AI超级Agent矩阵 · 覆盖投融资全生命周期
            </p>
          </div>

          {/* 身份通 — 独立大卡片（突出统一入口） */}
          <div class="mb-10">
            <a href="/identity" class="block no-underline group">
              <div class="relative overflow-hidden bg-gradient-to-r from-[#0B1A18] to-[#163832] rounded-2xl p-6 sm:p-8 border border-[#5DC4B3]/20 hover:border-[#5DC4B3]/40 transition-all hover:shadow-[0_0_40px_rgba(93,196,179,0.15)]">
                <div class="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-20" style="background: radial-gradient(circle, rgba(93,196,179,0.3) 0%, transparent 60%); transform: translate(30%, -30%);"></div>
                <div class="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div class="flex items-center gap-4">
                    <ProductLogoSmall name="身份通" englishShort="Identity" size={56} />
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <h3 class="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#5DC4B3] transition-colors">身份通</h3>
                        <span class="text-[9px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 font-semibold">已上线</span>
                      </div>
                      <p class="text-xs text-white/40 font-medium">Identity Connect</p>
                    </div>
                  </div>
                  <div class="flex-1 sm:text-right">
                    <p class="text-sm text-white/50 leading-relaxed mb-3 sm:mb-2">
                      所有用户的统一入口 — 认证后自动分流至投资者或融资者路径
                    </p>
                    <div class="inline-flex items-center px-5 py-2.5 bg-[#5DC4B3] hover:bg-[#4AB5A5] text-white text-sm font-bold rounded-xl transition-all group-hover:shadow-[0_0_20px_rgba(93,196,179,0.3)]">
                      <i class="fas fa-fingerprint mr-2"></i>
                      立即注册
                      <i class="fas fa-arrow-right ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* 其他8个产品 — 按阶段分列 */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {phaseConfig.slice(1).map((phase) => (
              <div class="space-y-3">
                {/* Phase header */}
                <div class="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
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
                    <a href={`/${p.id}`} class="block no-underline group">
                      <div class="bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-4 transition-all hover:shadow-lg cursor-pointer portal-card">
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

          {/* 设计故事入口 + 完整产品入口 */}
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/design" class="inline-flex items-center px-7 py-3 bg-white text-[#1d1d1f] font-bold text-sm rounded-xl border-2 border-gray-200 hover:border-[#5DC4B3] hover:text-[#5DC4B3] transition-all no-underline group">
              <i class="fas fa-book-open mr-2 text-xs group-hover:text-[#5DC4B3]"></i>
              产品设计背后的故事
              <i class="fas fa-arrow-right ml-2 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
            </a>
            <a href="/portal" class="inline-flex items-center px-7 py-3 bg-[#1d1d1f] hover:bg-[#333] text-white font-bold text-sm rounded-xl transition-all no-underline">
              <i class="fas fa-th-large mr-2"></i>完整产品入口
            </a>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          DUAL VALUE — 投资者 vs 融资企业
      ═══════════════════════════════════════════ */}
      <section class="py-16 lg:py-24 bg-[#FAFAFA]">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] mb-3 tracking-tight">
              双通道，精准服务
            </h2>
            <p class="text-sm text-gray-400 max-w-lg mx-auto">
              通过身份通注册后，投资者和融资企业各有专属工具链
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            {/* Investor */}
            <div class="relative rounded-2xl border-2 border-indigo-100 bg-white p-8 lg:p-10 hover:border-indigo-300 hover:shadow-xl transition-all group overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style="background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%); transform: translate(30%, -30%);"></div>
              <div class="relative">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                    <i class="fas fa-chart-pie text-indigo-500 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-extrabold text-[#1d1d1f]">投资者</h3>
                    <p class="text-xs text-indigo-400 font-medium">Investor Platform</p>
                  </div>
                </div>
                <ul class="space-y-4 mb-8">
                  <li class="flex items-start gap-3 text-sm text-gray-600">
                    <span class="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i class="fas fa-check text-indigo-500 text-[9px]"></i>
                    </span>
                    <span><strong class="text-[#1d1d1f]">个性化AI评估</strong> — 自定义评估模型和风控规则，精准匹配投资偏好</span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-gray-600">
                    <span class="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i class="fas fa-check text-indigo-500 text-[9px]"></i>
                    </span>
                    <span><strong class="text-[#1d1d1f]">智能机会看板</strong> — 经AI筛选的优质项目一览，支持多维度排序与对比</span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-gray-600">
                    <span class="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i class="fas fa-check text-indigo-500 text-[9px]"></i>
                    </span>
                    <span><strong class="text-[#1d1d1f]">投后全透明</strong> — 自动结算 + 实时履约监控，每笔收入分成清清楚楚</span>
                  </li>
                </ul>
                <a href="/identity" class="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 no-underline group/link">
                  注册身份通，开启投资路径 <i class="fas fa-arrow-right text-xs ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>

            {/* Business */}
            <div class="relative rounded-2xl border-2 border-amber-100 bg-white p-8 lg:p-10 hover:border-amber-300 hover:shadow-xl transition-all group overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style="background: radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%); transform: translate(30%, -30%);"></div>
              <div class="relative">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
                    <i class="fas fa-store text-amber-500 text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-extrabold text-[#1d1d1f]">融资企业</h3>
                    <p class="text-xs text-amber-400 font-medium">Business Platform</p>
                  </div>
                </div>
                <ul class="space-y-4 mb-8">
                  <li class="flex items-start gap-3 text-sm text-gray-600">
                    <span class="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i class="fas fa-check text-amber-500 text-[9px]"></i>
                    </span>
                    <span><strong class="text-[#1d1d1f]">智能申请助手</strong> — 自动整理经营数据、生成标准化Pitch Deck</span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-gray-600">
                    <span class="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i class="fas fa-check text-amber-500 text-[9px]"></i>
                    </span>
                    <span><strong class="text-[#1d1d1f]">精准曝光</strong> — 标准化数据直接进入投资者AI筛选池，高效匹配</span>
                  </li>
                  <li class="flex items-start gap-3 text-sm text-gray-600">
                    <span class="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i class="fas fa-check text-amber-500 text-[9px]"></i>
                    </span>
                    <span><strong class="text-[#1d1d1f]">灵活分成模式</strong> — 有收入才分配，不是传统借贷，与经营绑定</span>
                  </li>
                </ul>
                <a href="/identity" class="inline-flex items-center text-sm font-bold text-amber-600 hover:text-amber-700 no-underline group/link">
                  注册身份通，开启融资路径 <i class="fas fa-arrow-right text-xs ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          PLATFORM CAPABILITIES — 核心能力
      ═══════════════════════════════════════════ */}
      <section class="py-16 lg:py-24 bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1d1d1f]/5 text-[#1d1d1f] text-xs font-bold rounded-full mb-4 tracking-wider uppercase">
              Platform Capabilities
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] mb-3 tracking-tight">
              不只是工具，是投资基础设施
            </h2>
            <p class="text-sm text-gray-400 max-w-lg mx-auto">
              每一个能力都经过金融级标准打磨
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'fa-code-branch', color: '#5DC4B3', title: 'Y型分流架构', desc: '身份通统一入口，智能识别角色后自动分流。投资者和融资企业各走专属路径，在条款协商时精准汇合。', tag: 'Architecture' },
              { icon: 'fa-robot', color: '#6366F1', title: '个性化AI筛子', desc: '投资者自定义评估标准和风控规则。评估通和风控通作为AI代理，在海量项目中执行个性化筛选。', tag: 'AI Engine' },
              { icon: 'fa-layer-group', color: '#F59E0B', title: '跨行业通用', desc: '不按赛道造轮子。餐饮、零售、医美、教育——同一套Agent矩阵适配一切收入分成场景。', tag: 'Scalability' },
              { icon: 'fa-handshake', color: '#8B5CF6', title: '投融资协同', desc: '条款通+合约通实现双方在线协商、电子签约。从出价到签约全流程线上完成。', tag: 'Collaboration' },
              { icon: 'fa-chart-line', color: '#EF4444', title: '全生命周期管理', desc: '结算通自动执行收入分成，履约通实时监控经营数据。投后不再是黑箱。', tag: 'Lifecycle' },
              { icon: 'fa-database', color: '#10B981', title: '统一数据底座', desc: 'Account身份体系、Data数据底座、AI智能引擎。三层基础设施确保9个Agent共享数据。', tag: 'Foundation' },
            ].map((item) => (
              <div class="group bg-[#FAFAFA] rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all hover:bg-white">
                <div class="flex items-center gap-3 mb-5">
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center" style={`background: ${item.color}12;`}>
                    <i class={`fas ${item.icon}`} style={`color: ${item.color}; font-size: 16px;`}></i>
                  </div>
                  <span class="text-[9px] font-bold text-gray-300 tracking-widest uppercase">{item.tag}</span>
                </div>
                <h3 class="text-[15px] font-bold text-[#1d1d1f] mb-2.5 group-hover:text-[#5DC4B3] transition-colors">{item.title}</h3>
                <p class="text-[13px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          FINAL CTA — 身份通注册号召
      ═══════════════════════════════════════════ */}
      <section class="relative py-24 overflow-hidden bg-[#0B1A18]">
        <div class="absolute inset-0">
          <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(93,196,179,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.3) 1px, transparent 1px); background-size: 60px 60px;"></div>
          <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] h-[600px] rounded-full" style="background: radial-gradient(circle, rgba(93,196,179,0.06) 0%, transparent 60%);"></div>
        </div>
        <div class="max-w-3xl mx-auto px-4 text-center relative z-10">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#5DC4B3]/10 rounded-full mb-6 border border-[#5DC4B3]/15">
            <i class="fas fa-fingerprint text-[#5DC4B3] text-sm"></i>
            <span class="text-xs font-semibold text-[#5DC4B3]">从身份通开始</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-5 tracking-tight leading-tight">
            收入分成投资的未来，<br />
            <span class="text-[#5DC4B3]">从这里开始</span>
          </h2>
          <p class="text-white/35 text-sm sm:text-base mb-10 leading-relaxed max-w-lg mx-auto">
            无论您是机构投资者、个人投资者还是融资企业，<br class="hidden sm:block" />
            注册身份通即可开启全流程闭环体验
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/identity" class="inline-flex items-center px-8 py-4 bg-[#5DC4B3] hover:bg-[#4AB5A5] text-white font-bold text-[15px] rounded-xl shadow-[0_0_40px_rgba(93,196,179,0.3)] transition-all no-underline">
              <i class="fas fa-fingerprint mr-2.5"></i>立即注册身份通
            </a>
            <a href="/contact" class="inline-flex items-center px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white font-semibold text-[15px] rounded-xl border border-white/[0.08] hover:border-white/[0.15] transition-all no-underline">
              <i class="fas fa-envelope mr-2.5"></i>联系我们
            </a>
          </div>
          <p class="text-white/20 text-xs mt-8">
            获取完整产品白皮书 · 预约产品演示 · 了解合作方案
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
