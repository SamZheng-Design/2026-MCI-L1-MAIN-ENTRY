import type { FC } from 'hono/jsx'
import { products, foundations, statusLabels, mainFlowProducts, opportunityBoard } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogo } from '../components/Logos'

const TEAL = '#4ECDC4'

// 阶段分组信息
const phases = [
  { label: '融资前端', labelEn: 'Financing Frontend', icon: 'fa-sign-in-alt', color: 'blue', flowOrders: [1, 2] },
  { label: '项目评估', labelEn: 'Project Assessment', icon: 'fa-search', color: 'indigo', flowOrders: [3, 4] },
  { label: '投资决策', labelEn: 'Investment Decision', icon: 'fa-handshake', color: 'purple', flowOrders: [5, 6] },
  { label: '投后管理', labelEn: 'Post-Investment', icon: 'fa-chart-line', color: 'green', flowOrders: [7, 8] },
]

export const PortalPage: FC = () => {
  const flowProducts = mainFlowProducts

  return (
    <div class="min-h-screen">
      <Navbar active="portal" />

      {/* Hero */}
      <section class="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-[#4ECDC4]/5 pt-12 pb-10">
        <div class="absolute inset-0 dot-pattern opacity-30"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center fade-in">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4ECDC4]/10 text-[#4ECDC4] text-xs font-semibold rounded-full mb-4 border border-[#4ECDC4]/20">
              <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="5" fill="#4ECDC4"/></svg>
              Unified Product Portal
            </div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-black mb-3 tracking-tight">
              滴灌通超级Agent<span class="text-[#4ECDC4]">产品入口</span>
            </h1>
            <p class="text-base text-gray-500 max-w-xl mx-auto">
              按投资流程顺序，8个「通」+ Opportunity看板 串联 RBF 投资全生命周期
            </p>
          </div>
        </div>
      </section>

      {/* Waterfall Flow - Products in sequential order */}
      <section class="py-12 bg-white">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative">
            {/* Vertical timeline line */}
            <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4ECDC4] via-[#4ECDC4]/40 to-[#4ECDC4]/10 hidden sm:block"></div>

            {/* Render products grouped by phase */}
            {phases.map((phase, phaseIdx) => {
              const phaseProducts = flowProducts.filter(p => phase.flowOrders.includes(p.flowOrder))
              
              return (
                <div class="mb-4">
                  {/* Phase header */}
                  <div class="relative mb-4">
                    {/* Phase dot on timeline */}
                    <div class="absolute left-6 -translate-x-1/2 hidden sm:flex items-center justify-center z-10" style="top: 4px;">
                      <div class="w-5 h-5 rounded-full bg-[#4ECDC4] flex items-center justify-center shadow-sm">
                        <div class="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <div class="sm:ml-16">
                      <div class="flex items-center gap-2">
                        <span class={`inline-flex items-center px-3 py-1 text-[11px] font-bold rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] border border-[#4ECDC4]/20`}>
                          <i class={`fas ${phase.icon} mr-1.5`}></i>
                          {phase.label}
                        </span>
                        <span class="text-[10px] text-gray-400">{phase.labelEn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Products in this phase */}
                  {phaseProducts.map((p, idx) => (
                    <div class="relative mb-2">
                      {/* Timeline number dot */}
                      <div class="absolute left-6 -translate-x-1/2 hidden sm:flex items-center justify-center z-10" style="top: 28px;">
                        <div class={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          p.isCollaborative 
                            ? 'bg-[#4ECDC4] text-white shadow-lg shadow-[#4ECDC4]/30' 
                            : 'bg-white border-2 border-gray-300 text-gray-500'
                        }`}>
                          {p.flowOrder}
                        </div>
                      </div>

                      {/* Product card */}
                      <a href={`/${p.id}`} class="block sm:ml-16 mb-4 no-underline group">
                        <div class={`portal-card bg-white rounded-2xl p-5 transition-all ${
                          p.isCollaborative 
                            ? 'border-2 border-[#4ECDC4]/50 shadow-md shadow-[#4ECDC4]/10' 
                            : 'border border-gray-200 hover:border-[#4ECDC4]/30 hover:shadow-md'
                        }`}>
                          <div class="flex items-start gap-4">
                            {/* Mobile number */}
                            <div class={`sm:hidden w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              p.isCollaborative 
                                ? 'bg-[#4ECDC4] text-white' 
                                : 'bg-white border-2 border-gray-300 text-gray-500'
                            }`}>
                              {p.flowOrder}
                            </div>
                            <ProductLogo name={p.name} englishShort={p.englishShort} size={60} />
                            <div class="flex-1 min-w-0">
                              <div class="flex items-center gap-2 flex-wrap mb-1">
                                <h3 class="text-base font-bold text-black group-hover:text-[#4ECDC4] transition-colors">{p.name}</h3>
                                <span class={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusLabels[p.status].class}`}>
                                  {statusLabels[p.status].text}
                                </span>
                                {p.isCollaborative && (
                                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#4ECDC4] text-white font-bold">
                                    <i class="fas fa-handshake mr-0.5"></i>协同
                                  </span>
                                )}
                              </div>
                              <p class="text-xs text-gray-400 mb-1.5">{p.englishName}</p>
                              <p class="text-sm text-gray-500 leading-relaxed">{p.description}</p>
                            </div>
                          </div>

                          {/* Tags */}
                          <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <div class="flex flex-wrap gap-1.5">
                              {p.features.slice(0, 3).map((f) => (
                                <span class="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-400 rounded border border-gray-100">
                                  {f}
                                </span>
                              ))}
                            </div>
                            <i class="fas fa-arrow-right text-xs text-gray-300 group-hover:text-[#4ECDC4] transition-colors"></i>
                          </div>
                        </div>
                      </a>

                      {/* === OPPORTUNITY BRANCH: After Risk (flowOrder=4) === */}
                      {p.flowOrder === 4 && (
                        <div class="relative mb-4">
                          {/* Timeline connector for Opportunity */}
                          <div class="absolute left-6 -translate-x-1/2 hidden sm:flex items-center justify-center z-10" style="top: 20px;">
                            <div class="w-7 h-7 rounded-full bg-[#4ECDC4]/20 flex items-center justify-center border-2 border-dashed border-[#4ECDC4]/60">
                              <i class="fas fa-eye text-[#4ECDC4] text-[9px]"></i>
                            </div>
                          </div>

                          <a href="/opportunity" class="block sm:ml-16 mb-4 no-underline group">
                            <div class="border-2 border-dashed border-[#4ECDC4]/50 rounded-2xl p-5 bg-gradient-to-r from-[#4ECDC4]/5 to-white transition-all hover:border-[#4ECDC4] hover:shadow-md">
                              <div class="flex items-start gap-4">
                                {/* Mobile icon */}
                                <div class="sm:hidden w-8 h-8 rounded-full bg-[#4ECDC4]/20 flex items-center justify-center flex-shrink-0 border-2 border-dashed border-[#4ECDC4]/50">
                                  <i class="fas fa-eye text-[#4ECDC4] text-xs"></i>
                                </div>
                                <div class="w-[60px] h-[60px] rounded-2xl bg-[#4ECDC4]/10 flex items-center justify-center flex-shrink-0 border-2 border-dashed border-[#4ECDC4]/40">
                                  <i class="fas fa-eye text-[#4ECDC4] text-2xl"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                  <div class="flex items-center gap-2 flex-wrap mb-1">
                                    <h3 class="text-base font-bold text-black group-hover:text-[#4ECDC4] transition-colors">Opportunity 投资者看板</h3>
                                    <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] border border-[#4ECDC4]/20 font-medium">
                                      副流程
                                    </span>
                                  </div>
                                  <p class="text-xs text-gray-400 mb-1.5">Opportunity Dashboard</p>
                                  <p class="text-sm text-gray-500 leading-relaxed">
                                    投资者看板 · 实时查看 Application 项目信息、Assess 评估报告、Risk 风控结论
                                  </p>
                                </div>
                              </div>

                              {/* Source data indicators */}
                              <div class="mt-3 pt-3 border-t border-[#4ECDC4]/20 flex items-center justify-between">
                                <div class="flex flex-wrap gap-1.5">
                                  <span class="text-[10px] px-2 py-0.5 bg-white text-gray-500 rounded border border-gray-200">
                                    <i class="fas fa-database mr-0.5 text-[#4ECDC4]"></i>Application
                                  </span>
                                  <span class="text-[10px] px-2 py-0.5 bg-white text-gray-500 rounded border border-gray-200">
                                    <i class="fas fa-database mr-0.5 text-[#4ECDC4]"></i>Assess
                                  </span>
                                  <span class="text-[10px] px-2 py-0.5 bg-white text-gray-500 rounded border border-gray-200">
                                    <i class="fas fa-database mr-0.5 text-[#4ECDC4]"></i>Risk
                                  </span>
                                </div>
                                <i class="fas fa-arrow-right text-xs text-[#4ECDC4]/50 group-hover:text-[#4ECDC4] transition-colors"></i>
                              </div>
                            </div>
                          </a>
                        </div>
                      )}

                      {/* Flow arrow between cards (not after last in phase, and not after Risk which has Opportunity) */}
                      {idx < phaseProducts.length - 1 && p.flowOrder !== 4 && (
                        <div class="flex sm:ml-16 justify-center mb-2">
                          <svg width="12" height="16" viewBox="0 0 12 16">
                            <line x1="6" y1="0" x2="6" y2="10" stroke="#4ECDC4" stroke-width="1.5" opacity="0.3" />
                            <polygon points="2,10 6,16 10,10" fill="#4ECDC4" opacity="0.3" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Phase separator arrow (between phases, not after last phase) */}
                  {phaseIdx < phases.length - 1 && (
                    <div class="flex sm:ml-16 justify-center mb-4 mt-2">
                      <div class="flex flex-col items-center gap-1">
                        <div class="w-px h-4 bg-[#4ECDC4]/20"></div>
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <polygon points="4,4 8,12 12,4" fill="#4ECDC4" opacity="0.25" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Foundation */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-xl font-extrabold text-black mb-1">统一底座</h2>
            <p class="text-sm text-gray-400">所有Agent共用的基础设施层</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {foundations.map((f) => (
              <div class="card-hover bg-white rounded-xl p-5 border border-gray-200 flex items-center gap-4 cursor-pointer">
                <div class="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <i class={`fas ${f.icon} text-xl text-[#4ECDC4]`}></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-black">{f.name}</h3>
                  <p class="text-xs text-gray-400">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
