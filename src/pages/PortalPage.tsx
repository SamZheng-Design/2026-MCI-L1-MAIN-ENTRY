import type { FC } from 'hono/jsx'
import { products, foundations, statusLabels, getProductUrl, isExternalProduct } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogoSmall } from '../components/Logos'

const TEAL = '#5DC4B3'

// ======================================================
// Portal — Tab-based grouped product entry
// 核心改进：Tab切换，一次只看一个阶段，更清晰更elegant
// ======================================================

const phases = [
  {
    key: 'entry',
    label: '入口',
    labelEn: 'Entry',
    color: '#5DC4B3',
    icon: 'fa-fingerprint',
    description: '所有用户的统一起点',
    ids: ['identity']
  },
  {
    key: 'borrower',
    label: '融资者',
    labelEn: 'Borrower',
    color: '#F59E0B',
    icon: 'fa-upload',
    description: '上传经营数据 · 生成标准化材料',
    ids: ['application']
  },
  {
    key: 'investor',
    label: '投资者',
    labelEn: 'Investor',
    color: '#6366F1',
    icon: 'fa-filter',
    description: '搭建AI筛子 · 精准发现机会',
    ids: ['assess', 'risk', 'opportunity']
  },
  {
    key: 'deal',
    label: '交易',
    labelEn: 'Deal',
    color: '#8B5CF6',
    icon: 'fa-handshake',
    description: '条款协商 · 合约签署',
    ids: ['terms', 'contract']
  },
  {
    key: 'post',
    label: '投后',
    labelEn: 'Post-Inv',
    color: '#10B981',
    icon: 'fa-chart-line',
    description: '自动结算 · 履约监控',
    ids: ['settlement', 'performance']
  }
]

// 产品id → icon映射
const productIcons: Record<string, string> = {
  identity: 'fa-fingerprint',
  application: 'fa-file-upload',
  assess: 'fa-clipboard-check',
  risk: 'fa-shield-alt',
  opportunity: 'fa-binoculars',
  terms: 'fa-file-contract',
  contract: 'fa-file-signature',
  settlement: 'fa-coins',
  performance: 'fa-chart-bar'
}

const shortDesc: Record<string, string> = {
  identity: '认证登录 · 角色分流',
  application: '上传经营数据 · 生成Pitch Deck',
  assess: '自定义投资标准 · AI评估打分',
  risk: '自定义风控规则 · 材料验真',
  opportunity: '筛后项目看板 · 投资决策',
  terms: '收入分成方案 · 条款协商',
  contract: '电子合约签署 · 法律合规',
  settlement: '自动结算 · 资金流转',
  performance: '履约监控 · 预警追踪'
}

// 角色标签
const roleBadge: Record<string, { text: string, class: string }> = {
  shared: { text: '共用', class: 'bg-blue-100 text-blue-600' },
  borrower: { text: '融资者', class: 'bg-amber-100 text-amber-700' },
  investor: { text: '投资者', class: 'bg-indigo-100 text-indigo-600' },
  collaborative: { text: '协同', class: 'bg-[#5DC4B3]/15 text-[#0d9488]' }
}

export const PortalPage: FC = () => {
  return (
    <div class="min-h-screen bg-white">
      <Navbar active="portal" />

      {/* Hero */}
      <section class="relative bg-white pt-12 pb-8 overflow-hidden border-b border-gray-100/60">
        <div class="absolute inset-0 opacity-[0.015]" style="background-image: radial-gradient(circle, #5DC4B3 1px, transparent 1px); background-size: 40px 40px;"></div>
        <div class="max-w-3xl mx-auto px-4 text-center fade-in relative z-10">
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#5DC4B3]/8 text-[#5DC4B3] text-[11px] font-semibold rounded-full mb-4 border border-[#5DC4B3]/15 tracking-wider uppercase">
            Product Suite
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mb-3 tracking-tight">
            九大<span class="gradient-text-brand">「通」</span>
          </h1>
          <p class="text-sm text-gray-400 max-w-md mx-auto">
            选择你所处的阶段，进入对应产品
          </p>
        </div>
      </section>

      {/* Tab Navigation — 5个阶段tab */}
      <section class="bg-white border-b border-gray-100 sticky top-[56px] z-40">
        <div class="max-w-3xl mx-auto px-4">
          <div class="flex items-center gap-1 py-3 overflow-x-auto" id="portal-tabs">
            {phases.map((ph, i) => (
              <button
                data-tab={ph.key}
                onclick={`switchTab('${ph.key}')`}
                class={`portal-tab flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border ${
                  i === 0 ? 'text-white shadow-md' : 'text-gray-500 bg-white border-gray-100 hover:bg-gray-50'
                }`}
                style={i === 0 ? `background:${ph.color}; border-color:${ph.color}; box-shadow: 0 2px 10px ${ph.color}40;` : ''}
              >
                <i class={`fas ${ph.icon} text-xs`}></i>
                {ph.label}
                <span class="text-[10px] opacity-60 hidden sm:inline">{ph.ids.length}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content — 每个阶段的产品列表 */}
      <section class="py-8 min-h-[50vh]">
        <div class="max-w-3xl mx-auto px-4">
          {phases.map((ph, phaseIdx) => {
            const phaseProducts = ph.ids.map(id => products.find(p => p.id === id)!).filter(Boolean)
            return (
              <div
                id={`tab-${ph.key}`}
                class="tab-content"
                style={phaseIdx === 0 ? '' : 'display:none;'}
              >
                {/* Phase description */}
                <div class="mb-6 pb-5 border-b border-gray-100">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center" style={`background:${ph.color}10; border: 1.5px solid ${ph.color}20;`}>
                      <i class={`fas ${ph.icon} text-sm`} style={`color:${ph.color};`}></i>
                    </div>
                    <div>
                      <h2 class="text-xl font-extrabold text-[#1d1d1f]">{ph.label}</h2>
                      <p class="text-[11px] font-medium tracking-wider uppercase" style={`color:${ph.color};`}>{ph.labelEn}</p>
                    </div>
                  </div>
                  <p class="text-sm text-gray-400 ml-[52px]">{ph.description}</p>
                </div>

                {/* Product cards — larger, more spacious */}
                <div class="space-y-4">
                  {phaseProducts.map((p) => {
                    const icon = productIcons[p.id] || 'fa-cube'
                    const desc = shortDesc[p.id] || p.description
                    const badge = roleBadge[p.role]
                    const status = statusLabels[p.status]
                    const href = getProductUrl(p)
                    const isExt = isExternalProduct(p)

                    return (
                      <a href={href} target={isExt ? "_blank" : undefined} rel={isExt ? "noopener noreferrer" : undefined} class="block no-underline group">
                        <div class="relative bg-white border border-gray-100 hover:border-[#5DC4B3]/30 rounded-2xl p-6 transition-all hover:shadow-lg cursor-pointer portal-card overflow-hidden">
                          <div class="flex items-start gap-5">
                            {/* Product logo */}
                            <div class="flex-shrink-0">
                              <ProductLogoSmall name={p.name} englishShort={p.englishShort} size={52} />
                            </div>

                            {/* Content */}
                            <div class="flex-1 min-w-0">
                              <div class="flex items-center gap-2.5 mb-1">
                                <h3 class="text-lg font-bold text-[#1d1d1f] group-hover:text-[#5DC4B3] transition-colors">{p.name}</h3>
                                <span class="text-xs text-gray-300 font-medium hidden sm:inline">{p.englishName}</span>
                              </div>
                              <p class="text-sm text-gray-500 mb-3 leading-relaxed">{desc}</p>
                              <div class="flex items-center gap-2 flex-wrap">
                                <span class={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${status.class}`}>
                                  {status.text}
                                </span>
                                <span class={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${badge.class}`}>
                                  {badge.text}
                                </span>
                                {p.isFilter && (
                                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-500 font-bold border border-indigo-100">
                                    <i class="fas fa-robot mr-0.5 text-[8px]"></i>AI筛子
                                  </span>
                                )}
                                {p.isCollaborative && (
                                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-500 font-bold border border-purple-100">
                                    <i class="fas fa-handshake mr-0.5 text-[8px]"></i>协同
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Arrow */}
                            <div class="flex-shrink-0 pt-2">
                              <div class="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-[#5DC4B3]/10 flex items-center justify-center transition-all">
                                <i class="fas fa-arrow-right text-sm text-gray-300 group-hover:text-[#5DC4B3] group-hover:translate-x-0.5 transition-all"></i>
                              </div>
                            </div>
                          </div>

                          {/* Feature tags */}
                          {p.features && p.features.length > 0 && (
                            <div class="mt-4 pt-3 border-t border-gray-50 flex flex-wrap gap-1.5 ml-[72px]">
                              {p.features.slice(0, 4).map((feat) => (
                                <span class="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-400 rounded-md">{feat}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </a>
                    )
                  })}
                </div>

                {/* Next phase hint */}
                {phaseIdx < phases.length - 1 && (
                  <div class="mt-6 text-center">
                    <button
                      onclick={`switchTab('${phases[phaseIdx + 1].key}')`}
                      class="inline-flex items-center gap-2 px-4 py-2 text-xs text-gray-400 hover:text-[#5DC4B3] font-medium transition-colors rounded-lg hover:bg-gray-50"
                    >
                      下一阶段: {phases[phaseIdx + 1].label}
                      <i class="fas fa-arrow-right text-[10px]"></i>
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Foundation */}
      <section class="py-10 bg-[#FAFAFA] border-t border-gray-100">
        <div class="max-w-3xl mx-auto px-4">
          <div class="text-center mb-6">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">统一底座 · Foundation</span>
          </div>
          <div class="grid grid-cols-3 gap-4">
            {foundations.map((f) => (
              <div class="text-center p-5 rounded-2xl bg-white border border-gray-100 hover:border-[#5DC4B3]/15 hover:shadow-sm transition-all">
                <div class="w-10 h-10 rounded-xl bg-[#5DC4B3]/8 flex items-center justify-center mx-auto mb-3">
                  <i class={`fas ${f.icon} text-[#5DC4B3]`}></i>
                </div>
                <div class="text-xs font-bold text-gray-700">{f.name.split(' ')[0]}</div>
                <div class="text-[10px] text-gray-400 mt-0.5">{f.name.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab switching JS */}
      <script dangerouslySetInnerHTML={{ __html: `
        var phaseColors = ${JSON.stringify(phases.reduce((acc, p) => { acc[p.key] = p.color; return acc; }, {} as Record<string, string>))};

        function switchTab(key) {
          // Hide all tab contents
          document.querySelectorAll('.tab-content').forEach(function(el) {
            el.style.display = 'none';
          });
          // Show target
          var target = document.getElementById('tab-' + key);
          if (target) {
            target.style.display = '';
            // Smooth fade-in effect
            target.style.opacity = '0';
            target.style.transform = 'translateY(8px)';
            requestAnimationFrame(function() {
              target.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              target.style.opacity = '1';
              target.style.transform = 'translateY(0)';
            });
          }

          // Update tab styles
          var color = phaseColors[key] || '#5DC4B3';
          document.querySelectorAll('.portal-tab').forEach(function(btn) {
            var tabKey = btn.getAttribute('data-tab');
            if (tabKey === key) {
              btn.style.background = color;
              btn.style.borderColor = color;
              btn.style.color = '#fff';
              btn.style.boxShadow = '0 2px 10px ' + color + '40';
              btn.classList.remove('text-gray-500');
            } else {
              btn.style.background = '#fff';
              btn.style.borderColor = '#f3f4f6';
              btn.style.color = '#6b7280';
              btn.style.boxShadow = 'none';
              btn.classList.add('text-gray-500');
            }
          });

          // Scroll tab into view on mobile
          var activeBtn = document.querySelector('.portal-tab[data-tab="' + key + '"]');
          if (activeBtn) {
            activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }

          // Scroll to top of content
          window.scrollTo({ top: document.getElementById('portal-tabs').getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
        }
      `}} />

      <Footer />
    </div>
  )
}
