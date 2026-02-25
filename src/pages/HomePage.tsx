import type { FC } from 'hono/jsx'
import { products, foundations, statusLabels, getProductUrl, isExternalProduct } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { BrandLogo, ProductLogoSmall } from '../components/Logos'

const TEAL = '#5DC4B3'

/*
 * 官网首页 — V8 Apple Narrative Scroll Redesign
 * 
 * 设计灵感: Apple.com product pages + Linear.app + Stripe.com
 * 核心改变: 从「9宫格一次展示」→「叙事式滚动，一次一个阶段」
 * 
 * 布局逻辑:
 * 1. Welcome Modal（保留）
 * 2. Hero — 品牌宣言（简化）
 * 3. Flow Overview — Y型架构一图流
 * 4. 5 × Narrative Sections — 每个阶段一个全宽section，左右交替
 * 5. Platform Foundation — 底座能力
 * 6. CTA — 终极转化
 */

// 5阶段叙事内容
const narrativeSections = [
  {
    id: 'entry',
    phase: 1,
    eyebrow: 'STEP 01',
    eyebrowColor: '#5DC4B3',
    title: '一切从身份开始',
    subtitle: '身份通是唯一入口 — 所有用户统一认证后，系统自动识别角色，分流至投资者或融资者专属路径',
    products: ['identity'],
    illustration: 'entry',
    align: 'left' as const,
    bgClass: 'bg-white',
    features: [
      { icon: 'fa-fingerprint', text: '统一认证入口' },
      { icon: 'fa-code-branch', text: '智能角色分流' },
      { icon: 'fa-shield-alt', text: '多因素安全认证' },
    ]
  },
  {
    id: 'borrower',
    phase: 2,
    eyebrow: 'STEP 02 · BORROWER',
    eyebrowColor: '#F59E0B',
    title: '融资者上传数据',
    subtitle: '融资企业通过申请通整理经营信息、上传数据，系统自动生成标准化Pitch Deck，让项目进入投资者的筛选池',
    products: ['application'],
    illustration: 'borrower',
    align: 'right' as const,
    bgClass: 'bg-[#FAFAFA]',
    features: [
      { icon: 'fa-upload', text: '经营数据标准化' },
      { icon: 'fa-magic', text: 'AI生成Pitch Deck' },
      { icon: 'fa-bullseye', text: '精准曝光给投资者' },
    ]
  },
  {
    id: 'investor',
    phase: 3,
    eyebrow: 'STEP 03 · INVESTOR',
    eyebrowColor: '#6366F1',
    title: '投资者搭建AI筛子',
    subtitle: '每位投资者可自定义评估标准和风控规则 — 评估通和风控通作为个性化AI代理，在海量项目中精准筛选',
    products: ['assess', 'risk', 'opportunity'],
    illustration: 'investor',
    align: 'left' as const,
    bgClass: 'bg-white',
    features: [
      { icon: 'fa-sliders-h', text: '自定义投资标准' },
      { icon: 'fa-robot', text: 'AI量化评估+风控' },
      { icon: 'fa-binoculars', text: '筛后机会看板' },
    ]
  },
  {
    id: 'deal',
    phase: 4,
    eyebrow: 'STEP 04 · DEAL',
    eyebrowColor: '#8B5CF6',
    title: '双方协同达成交易',
    subtitle: 'Y型路径在此汇合 — 条款通自动生成分成方案供双方协商，合约通完成电子签署，全流程线上闭环',
    products: ['terms', 'contract'],
    illustration: 'deal',
    align: 'right' as const,
    bgClass: 'bg-[#FAFAFA]',
    features: [
      { icon: 'fa-file-contract', text: '智能条款生成' },
      { icon: 'fa-handshake', text: '在线协商签署' },
      { icon: 'fa-gavel', text: '法律合规保障' },
    ]
  },
  {
    id: 'post',
    phase: 5,
    eyebrow: 'STEP 05 · POST-INVESTMENT',
    eyebrowColor: '#10B981',
    title: '投后不再是黑箱',
    subtitle: '结算通自动执行收入分成，履约通实时监控经营数据 — 每笔分成清清楚楚，每个预警及时触达',
    products: ['settlement', 'performance'],
    illustration: 'post',
    align: 'left' as const,
    bgClass: 'bg-white',
    features: [
      { icon: 'fa-coins', text: '自动分成结算' },
      { icon: 'fa-chart-line', text: '实时履约监控' },
      { icon: 'fa-bell', text: '智能预警系统' },
    ]
  },
]

// Welcome弹窗slides
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

// ─── Illustration Components ───
const FlowIllustration: FC<{ type: string, color: string }> = ({ type, color }) => {
  // 每个阶段的示意图 — 简洁抽象的视觉符号
  const illustrations: Record<string, any> = {
    entry: (
      <div class="relative w-full max-w-[320px] mx-auto">
        {/* 中心身份认证 */}
        <div class="flex flex-col items-center">
          <div class="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#5DC4B3]/10 to-[#5DC4B3]/5 border border-[#5DC4B3]/20 flex items-center justify-center mb-5 shadow-lg shadow-[#5DC4B3]/10">
            <i class="fas fa-fingerprint text-3xl text-[#5DC4B3]"></i>
          </div>
          <div class="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-5">Identity Connect</div>
          {/* Y分叉 */}
          <div class="w-px h-8 bg-gradient-to-b from-[#5DC4B3]/40 to-gray-200"></div>
          <div class="flex items-start gap-16 mt-2">
            <div class="flex flex-col items-center">
              <div class="w-px h-6 bg-gray-200"></div>
              <div class="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <i class="fas fa-chart-pie text-indigo-500 text-lg"></i>
              </div>
              <span class="text-[10px] text-indigo-400 font-semibold mt-1.5">投资者</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-px h-6 bg-gray-200"></div>
              <div class="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                <i class="fas fa-store text-amber-500 text-lg"></i>
              </div>
              <span class="text-[10px] text-amber-400 font-semibold mt-1.5">融资者</span>
            </div>
          </div>
        </div>
      </div>
    ),
    borrower: (
      <div class="relative w-full max-w-[320px] mx-auto">
        <div class="flex flex-col items-center gap-4">
          {/* Data upload illustration */}
          <div class="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <i class="fas fa-file-upload text-amber-500"></i>
              </div>
              <div>
                <div class="text-sm font-bold text-gray-800">经营数据上传</div>
                <div class="text-[10px] text-gray-400">自动标准化处理</div>
              </div>
            </div>
            <div class="space-y-2">
              {['财务流水', 'POS数据', '门店信息'].map((item, i) => (
                <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <div class="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <span class="text-xs text-gray-600">{item}</span>
                  <i class="fas fa-check text-green-400 text-[10px] ml-auto"></i>
                </div>
              ))}
            </div>
          </div>
          <i class="fas fa-arrow-down text-gray-300"></i>
          <div class="px-4 py-2.5 bg-amber-50 rounded-full border border-amber-100">
            <span class="text-xs font-bold text-amber-600"><i class="fas fa-magic mr-1.5"></i>AI Pitch Deck 生成</span>
          </div>
        </div>
      </div>
    ),
    investor: (
      <div class="relative w-full max-w-[340px] mx-auto">
        <div class="flex flex-col items-center gap-3">
          {/* Filter pipeline */}
          <div class="flex items-center gap-3 w-full">
            <div class="flex-1 bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm text-center">
              <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-clipboard-check text-indigo-500 text-sm"></i>
              </div>
              <div class="text-[11px] font-bold text-gray-700">评估通</div>
              <div class="text-[9px] text-indigo-400 font-medium mt-0.5">AI筛子 1</div>
            </div>
            <i class="fas fa-arrow-right text-gray-300 text-xs flex-shrink-0"></i>
            <div class="flex-1 bg-white rounded-xl border border-gray-100 p-3.5 shadow-sm text-center">
              <div class="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-shield-alt text-indigo-500 text-sm"></i>
              </div>
              <div class="text-[11px] font-bold text-gray-700">风控通</div>
              <div class="text-[9px] text-indigo-400 font-medium mt-0.5">AI筛子 2</div>
            </div>
            <i class="fas fa-arrow-right text-gray-300 text-xs flex-shrink-0"></i>
            <div class="flex-1 bg-white rounded-xl border border-emerald-100 p-3.5 shadow-sm text-center">
              <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-binoculars text-emerald-500 text-sm"></i>
              </div>
              <div class="text-[11px] font-bold text-gray-700">机会通</div>
              <div class="text-[9px] text-emerald-400 font-medium mt-0.5">筛后看板</div>
            </div>
          </div>
          {/* Stats */}
          <div class="w-full bg-gradient-to-r from-indigo-50 to-emerald-50 rounded-xl p-4 mt-1">
            <div class="flex items-center justify-between text-center">
              <div>
                <div class="text-lg font-extrabold text-indigo-600">100+</div>
                <div class="text-[9px] text-gray-400">融资项目</div>
              </div>
              <i class="fas fa-long-arrow-alt-right text-gray-300"></i>
              <div>
                <div class="text-lg font-extrabold text-indigo-500">AI</div>
                <div class="text-[9px] text-gray-400">双重筛选</div>
              </div>
              <i class="fas fa-long-arrow-alt-right text-gray-300"></i>
              <div>
                <div class="text-lg font-extrabold text-emerald-500">12</div>
                <div class="text-[9px] text-gray-400">精准匹配</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    deal: (
      <div class="relative w-full max-w-[300px] mx-auto">
        <div class="flex flex-col items-center gap-3">
          {/* Deal card */}
          <div class="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-bold text-purple-500 tracking-widest uppercase">Deal Making</span>
              <span class="text-[9px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-500 border border-purple-100 font-semibold">协同</span>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                  <i class="fas fa-file-contract text-purple-500 text-sm"></i>
                </div>
                <div class="flex-1">
                  <div class="text-xs font-bold text-gray-800">条款通</div>
                  <div class="text-[10px] text-gray-400">分成方案 · 在线协商</div>
                </div>
                <i class="fas fa-chevron-right text-gray-200 text-[10px]"></i>
              </div>
              <div class="h-px bg-gray-100"></div>
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                  <i class="fas fa-file-signature text-purple-500 text-sm"></i>
                </div>
                <div class="flex-1">
                  <div class="text-xs font-bold text-gray-800">合约通</div>
                  <div class="text-[10px] text-gray-400">电子签署 · 法律合规</div>
                </div>
                <i class="fas fa-chevron-right text-gray-200 text-[10px]"></i>
              </div>
            </div>
          </div>
          {/* Progress indicator */}
          <div class="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
            <i class="fas fa-check-circle text-purple-400 text-xs"></i>
            <span class="text-[10px] font-semibold text-purple-500">投融资双方协同完成</span>
          </div>
        </div>
      </div>
    ),
    post: (
      <div class="relative w-full max-w-[320px] mx-auto">
        <div class="flex flex-col items-center gap-3">
          {/* Dashboard mock */}
          <div class="w-full bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-bold text-gray-800">投后管理面板</span>
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
            </div>
            {/* Mini chart bars */}
            <div class="flex items-end gap-1.5 h-16 mb-3">
              {[40,55,45,70,60,80,65,75,90,85].map((h, i) => (
                <div class="flex-1 rounded-t-sm transition-all" style={`height:${h}%;background:${i < 8 ? '#10B981' : '#5DC4B3'};opacity:${0.4 + i * 0.06};`}></div>
              ))}
            </div>
            <div class="flex items-center justify-between text-[10px] text-gray-400">
              <span>近10期结算</span>
              <span class="text-green-500 font-bold"><i class="fas fa-arrow-up text-[8px] mr-0.5"></i>+12.3%</span>
            </div>
          </div>
          <div class="flex gap-3 w-full">
            <div class="flex-1 bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
              <i class="fas fa-coins text-emerald-500 text-sm mb-1"></i>
              <div class="text-[10px] font-bold text-emerald-700">结算通</div>
            </div>
            <div class="flex-1 bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
              <i class="fas fa-chart-bar text-emerald-500 text-sm mb-1"></i>
              <div class="text-[10px] font-bold text-emerald-700">履约通</div>
            </div>
          </div>
        </div>
      </div>
    ),
  }
  return illustrations[type] || null
}

export const HomePage: FC = () => {
  return (
    <div class="min-h-screen bg-white">
      <Navbar active="home" />

      {/* ═══════════════════════════════════════════
          WELCOME MODAL — 保留滑块式产品介绍弹窗
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
        });
        function closeWelcomeModal(){var m=document.getElementById('welcome-modal');if(!m||!modalVisible)return;var c=m.querySelector('.modal-enter');if(c){c.classList.remove('modal-enter');c.classList.add('modal-exit');}modalVisible=false;setTimeout(function(){m.style.display='none';document.body.style.overflow='';sessionStorage.setItem('mc_welcome_seen','1');},250);}
        function goToSlide(i){currentSlide=i;updateSlider();}
        function nextSlideOrClose(){if(currentSlide>=totalSlides-1)closeWelcomeModal();else{currentSlide++;updateSlider();}}
        function updateSlider(){var t=document.getElementById('slider-track');if(t)t.style.transform='translateX(-'+(currentSlide*100)+'%)';document.querySelectorAll('.slider-dot').forEach(function(d,i){if(i===currentSlide){d.style.background='#5DC4B3';d.style.width='20px';}else{d.style.background='#d1d5db';d.style.width='8px';}});var c=document.getElementById('slider-counter');if(c)c.textContent=(currentSlide+1)+' / '+totalSlides;var bt=document.getElementById('slider-btn-text'),bi=document.getElementById('slider-btn-icon');if(currentSlide>=totalSlides-1){bt.textContent='开始探索';bi.className='fas fa-rocket ml-2 text-[10px]';}else{bt.textContent='下一步';bi.className='fas fa-arrow-right ml-2 text-[10px]';}}
        document.addEventListener('keydown',function(e){if(!modalVisible)return;if(e.key==='Escape')closeWelcomeModal();if(e.key==='ArrowRight')nextSlideOrClose();if(e.key==='ArrowLeft'&&currentSlide>0){currentSlide--;updateSlider();}});
        var sc=document.getElementById('slider-container');if(sc){var tsx=0;sc.addEventListener('touchstart',function(e){tsx=e.changedTouches[0].screenX},{passive:true});sc.addEventListener('touchend',function(e){var d=tsx-e.changedTouches[0].screenX;if(Math.abs(d)>50){if(d>0)nextSlideOrClose();else if(currentSlide>0){currentSlide--;updateSlider();}}});}
      `}} />


      {/* ═══════════════════════════════════════════
          HERO — Simplified, focused
      ═══════════════════════════════════════════ */}
      <section class="aurora-bg aurora-hero noise-overlay relative min-h-[92vh] flex items-center justify-center pt-16 pb-24">
        <div class="absolute inset-0" style="z-index: 3;">
          <div class="absolute inset-0 opacity-[0.012]" style="background-image: linear-gradient(rgba(93,196,179,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.15) 1px, transparent 1px); background-size: 100px 100px;"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] orbit-ring opacity-[0.025]">
            <svg viewBox="0 0 700 700" fill="none" class="w-full h-full">
              <circle cx="350" cy="350" r="340" stroke="#5DC4B3" stroke-width="0.5" stroke-dasharray="6 16" />
              <circle cx="350" cy="350" r="260" stroke="#5DC4B3" stroke-width="0.3" stroke-dasharray="4 20" />
            </svg>
          </div>
        </div>

        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full" style="z-index: 10;">
          <div class="text-center">
            <div class="mb-10 flex justify-center hero-text-reveal hero-text-reveal-1">
              <div class="logo-reveal">
                <BrandLogo height={60} variant="light" />
              </div>
            </div>

            <div class="hero-text-reveal hero-text-reveal-2">
              <div class="inline-flex items-center gap-2.5 px-5 py-2 bg-white/[0.04] border border-white/[0.06] text-white/50 text-[11px] font-medium rounded-full mb-8 backdrop-blur-sm tracking-wide">
                <span class="relative flex h-1.5 w-1.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5DC4B3] opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5DC4B3]"></span>
                </span>
                Revenue-Based Financing Infrastructure
              </div>
            </div>

            <h1 class="hero-text-reveal hero-text-reveal-3 display-xl text-white mb-6">
              收入分成投资的
              <br />
              <span class="gradient-text-brand">基础设施级平台</span>
            </h1>

            <p class="hero-text-reveal hero-text-reveal-4 text-base sm:text-lg text-white/30 max-w-md mx-auto mb-12 leading-relaxed font-light tracking-wide">
              一条主线 · 五个阶段 · 九大Agent
              <br class="hidden sm:block" />
              用叙事的方式，了解一笔投资的完整旅程
            </p>

            <div class="hero-text-reveal hero-text-reveal-5 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {(() => { const idP = products.find(p => p.id === 'identity')!; return (
              <a href={getProductUrl(idP)} target={isExternalProduct(idP) ? "_blank" : undefined} rel={isExternalProduct(idP) ? "noopener noreferrer" : undefined} class="group relative inline-flex items-center px-8 py-4 text-white font-bold text-[15px] rounded-2xl transition-all no-underline overflow-hidden" style="background: linear-gradient(135deg, #5DC4B3 0%, #49A89A 100%); box-shadow: 0 0 50px rgba(93,196,179,0.25), 0 4px 20px rgba(93,196,179,0.3);">
                <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <i class="fas fa-fingerprint mr-2.5 text-base group-hover:scale-110 transition-transform"></i>
                <span class="relative">从身份通开始</span>
                <i class="fas fa-arrow-right ml-3 text-sm opacity-70 group-hover:translate-x-1 transition-transform"></i>
              </a>
              ) })()}
              <a href="#flow-narrative" class="inline-flex items-center px-8 py-4 bg-white/[0.06] hover:bg-white/[0.10] text-white/60 hover:text-white font-semibold text-[15px] rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all no-underline backdrop-blur-sm">
                <i class="fas fa-arrow-down mr-2.5 text-sm animate-bounce"></i>
                了解完整旅程
              </a>
            </div>

            {/* Compact stat pills */}
            <div class="hero-text-reveal hero-text-reveal-6 flex flex-wrap items-center justify-center gap-3">
              {[
                { val: '5', label: '流程阶段', color: '#5DC4B3' },
                { val: '9', label: 'AI Agents', color: '#6366F1' },
                { val: 'AI', label: '个性化筛选', color: '#F59E0B' },
                { val: '∞', label: '行业覆盖', color: '#10B981' },
              ].map((d) => (
                <div class="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm" style="background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.06);">
                  <span class="text-base font-extrabold" style={`color: ${d.color};`}>{d.val}</span>
                  <span class="text-[10px] text-white/30 font-medium">{d.label}</span>
                </div>
              ))}
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

        <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" style="z-index: 4;"></div>
      </section>


      {/* ═══════════════════════════════════════════
          FLOW OVERVIEW — Y型架构一图流
          一个简洁的横向流程图，让用户一眼看清全貌
      ═══════════════════════════════════════════ */}
      <section class="py-16 lg:py-20 bg-white" id="flow-narrative">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12 reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/6 text-[#5DC4B3] text-[11px] font-semibold rounded-full mb-5 border border-[#5DC4B3]/10 tracking-[0.15em] uppercase">
              The Journey
            </div>
            <h2 class="display-lg text-[#1d1d1f] mb-4">
              一笔投资的完整旅程
            </h2>
            <p class="text-base text-gray-400 max-w-lg mx-auto">
              从身份认证到投后管理，五个阶段串联九大Agent
            </p>
          </div>

          {/* Horizontal flow — mobile vertical, desktop horizontal */}
          <div class="reveal">
            <div class="hidden lg:flex items-center justify-between gap-2 relative">
              {/* Connection line */}
              <div class="absolute top-[28px] left-[10%] right-[10%] h-px bg-gradient-to-r from-[#5DC4B3]/40 via-indigo-300/30 via-purple-300/30 to-emerald-300/40 z-0"></div>
              
              {narrativeSections.map((sec, idx) => (
                <a href={`#section-${sec.id}`} class="relative z-10 flex flex-col items-center group no-underline cursor-pointer flex-1">
                  <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all group-hover:scale-110 group-hover:shadow-lg border" style={`background: ${sec.eyebrowColor}08; border-color: ${sec.eyebrowColor}20;`}>
                    <span class="text-lg font-extrabold" style={`color: ${sec.eyebrowColor};`}>{sec.phase}</span>
                  </div>
                  <div class="text-xs font-bold text-gray-700 text-center group-hover:text-[#5DC4B3] transition-colors">{sec.title.replace(/[^一-龥a-zA-Z]/g, '').slice(0, 6)}</div>
                  <div class="text-[10px] text-gray-300 mt-0.5">
                    {sec.products.length} Agent{sec.products.length > 1 ? 's' : ''}
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile: vertical compact */}
            <div class="lg:hidden flex flex-col gap-3">
              {narrativeSections.map((sec, idx) => (
                <a href={`#section-${sec.id}`} class="flex items-center gap-4 px-4 py-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-all no-underline group">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={`background: ${sec.eyebrowColor}10; border: 1px solid ${sec.eyebrowColor}20;`}>
                    <span class="text-sm font-extrabold" style={`color: ${sec.eyebrowColor};`}>{sec.phase}</span>
                  </div>
                  <div class="flex-1">
                    <div class="text-sm font-bold text-gray-800 group-hover:text-[#5DC4B3] transition-colors">{sec.title}</div>
                    <div class="text-[10px] text-gray-400">{sec.products.length} Agent · {sec.eyebrow}</div>
                  </div>
                  <i class="fas fa-chevron-down text-gray-200 text-xs group-hover:text-[#5DC4B3] transition-colors"></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          NARRATIVE SECTIONS — 每个阶段一个全宽Section
          Apple-style: 大留白 + 左右交替 + 内嵌产品入口
      ═══════════════════════════════════════════ */}
      {narrativeSections.map((sec, idx) => {
        const sectionProducts = sec.products.map(id => products.find(p => p.id === id)!).filter(Boolean)
        const isLeft = sec.align === 'left'
        
        return (
          <section id={`section-${sec.id}`} class={`py-20 lg:py-28 ${sec.bgClass} scroll-mt-16`}>
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                
                {/* Text side */}
                <div class={`flex-1 max-w-lg ${isLeft ? 'reveal-left' : 'reveal-right'} reveal`}>
                  {/* Eyebrow */}
                  <div class="flex items-center gap-2 mb-5">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center" style={`background: ${sec.eyebrowColor}12;`}>
                      <span class="text-xs font-extrabold" style={`color: ${sec.eyebrowColor};`}>{sec.phase}</span>
                    </div>
                    <span class="text-[10px] font-bold tracking-[0.15em] uppercase" style={`color: ${sec.eyebrowColor};`}>{sec.eyebrow}</span>
                  </div>

                  {/* Title */}
                  <h2 class="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mb-4 tracking-tight leading-tight">
                    {sec.title}
                  </h2>

                  {/* Subtitle */}
                  <p class="text-base text-gray-500 leading-relaxed mb-8">
                    {sec.subtitle}
                  </p>

                  {/* Feature pills */}
                  <div class="flex flex-wrap gap-2.5 mb-8">
                    {sec.features.map((f) => (
                      <div class="inline-flex items-center gap-2 px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-100">
                        <i class={`fas ${f.icon} text-xs`} style={`color: ${sec.eyebrowColor};`}></i>
                        <span class="text-xs font-semibold text-gray-600">{f.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Product entry buttons */}
                  <div class="flex flex-wrap gap-3">
                    {sectionProducts.map((p) => (
                      <a href={getProductUrl(p)} target={isExternalProduct(p) ? "_blank" : undefined} rel={isExternalProduct(p) ? "noopener noreferrer" : undefined} class="inline-flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-150 hover:border-[#5DC4B3] transition-all no-underline group shadow-sm hover:shadow-md">
                        <ProductLogoSmall name={p.name} englishShort={p.englishShort} size={32} />
                        <div>
                          <div class="text-sm font-bold text-gray-800 group-hover:text-[#5DC4B3] transition-colors">{p.name}</div>
                          <div class="text-[10px] text-gray-400">{p.englishShort}</div>
                        </div>
                        <span class={`text-[8px] px-1.5 py-0.5 rounded-full border ${statusLabels[p.status].class} ml-1`}>
                          {statusLabels[p.status].text}
                        </span>
                        <i class="fas fa-arrow-right text-gray-300 text-[10px] group-hover:text-[#5DC4B3] group-hover:translate-x-0.5 transition-all"></i>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Illustration side */}
                <div class={`flex-1 max-w-md w-full ${isLeft ? 'reveal-right' : 'reveal-left'} reveal`}>
                  <FlowIllustration type={sec.illustration} color={sec.eyebrowColor} />
                </div>
              </div>
            </div>
          </section>
        )
      })}


      {/* ═══════════════════════════════════════════
          DUAL CHANNEL — 简化为一个优雅的对比区
      ═══════════════════════════════════════════ */}
      <section class="py-20 lg:py-28 bg-[#FAFAFA]">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div class="reveal-left reveal group relative rounded-3xl bg-white p-8 lg:p-10 border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all overflow-hidden">
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
                <ul class="space-y-3.5 mb-8">
                  {[
                    { title: '个性化AI评估', desc: '自定义评估模型和风控规则' },
                    { title: '智能机会看板', desc: '经AI筛选的优质项目一览' },
                    { title: '投后全透明', desc: '自动结算 + 实时履约监控' },
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
            <div class="reveal-right reveal group relative rounded-3xl bg-white p-8 lg:p-10 border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all overflow-hidden">
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
                <ul class="space-y-3.5 mb-8">
                  {[
                    { title: '智能申请助手', desc: '自动整理经营数据生成Pitch Deck' },
                    { title: '精准曝光', desc: '标准化数据进入投资者筛选池' },
                    { title: '灵活分成模式', desc: '有收入才分配，与经营绑定' },
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
          PLATFORM FOUNDATION — 三层底座（简洁版）
      ═══════════════════════════════════════════ */}
      <section class="py-20 lg:py-24 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-14 reveal">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/6 text-[#5DC4B3] text-[11px] font-semibold rounded-full mb-5 border border-[#5DC4B3]/10 tracking-[0.15em] uppercase">
              Foundation
            </div>
            <h2 class="display-lg text-[#1d1d1f] mb-4">
              不只是工具，是投资基础设施
            </h2>
            <p class="text-base text-gray-400 max-w-md mx-auto">
              三层统一底座确保九大Agent共享数据、协同运作
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-5 reveal">
            {foundations.map((f, idx) => (
              <div class={`reveal stagger-${idx + 1} group text-center p-8 rounded-2xl bg-[#FAFAFA] border border-gray-100 hover:border-[#5DC4B3]/20 hover:bg-white hover:shadow-lg transition-all`}>
                <div class="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-5 group-hover:border-[#5DC4B3]/20 group-hover:shadow-md transition-all group-hover:scale-110">
                  <i class={`fas ${f.icon} text-xl text-[#5DC4B3]`}></i>
                </div>
                <h3 class="text-base font-bold text-[#1d1d1f] mb-2 group-hover:text-[#5DC4B3] transition-colors">{f.name}</h3>
                <p class="text-sm text-gray-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>

          {/* Entry links */}
          <div class="reveal flex flex-col sm:flex-row items-center justify-center gap-3 mt-12">
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

      <div class="section-divider"></div>

      {/* ═══════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════ */}
      <section class="aurora-bg aurora-cta noise-overlay relative py-28 lg:py-36">
        <div class="absolute inset-0" style="z-index: 3;">
          <div class="absolute inset-0 opacity-[0.012]" style="background-image: linear-gradient(rgba(93,196,179,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(93,196,179,0.15) 1px, transparent 1px); background-size: 100px 100px;"></div>
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
        </div>
      </section>

      {/* ★ Scroll Reveal Engine */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
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
        });
      `}} />

      <Footer />
    </div>
  )
}
