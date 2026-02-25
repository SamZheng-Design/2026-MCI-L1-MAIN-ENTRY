import type { FC } from 'hono/jsx'
import { products, foundations, statusLabels, mainFlowProducts, entryProduct, borrowerProducts, investorFilterProducts, investorViewProduct, dealProducts, postInvestmentProducts } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogo } from '../components/Logos'

const TEAL = '#4ECDC4'

// 产品卡片组件
const ProductCard: FC<{ product: typeof products[0] }> = ({ product: p }) => {
  return (
    <a href={`/${p.id}`} class="block no-underline group">
      <div class={`portal-card bg-white rounded-2xl p-5 transition-all border ${
        p.isCollaborative 
          ? 'border-[#4ECDC4]/50 shadow-md shadow-[#4ECDC4]/10 hover:shadow-lg' 
          : p.isFilter
            ? 'border-indigo-200 hover:border-indigo-400 hover:shadow-md'
            : 'border-gray-200 hover:border-[#4ECDC4]/30 hover:shadow-md'
      }`}>
        <div class="flex items-start gap-4">
          <ProductLogo name={p.name} englishShort={p.englishShort} size={60} />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <h3 class="text-base font-bold text-black group-hover:text-[#4ECDC4] transition-colors">{p.name}</h3>
              <span class={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusLabels[p.status].class}`}>
                {statusLabels[p.status].text}
              </span>
              {p.isFilter && (
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold border border-indigo-200">
                  <i class="fas fa-filter mr-0.5"></i>AI筛子
                </span>
              )}
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
  )
}

export const PortalPage: FC = () => {
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
              身份通统一入口 → 双角色分流 → 数据穿越AI筛子 → 9个「通」串联RBF投资全生命周期
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section class="py-12 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ===== PHASE 1: 统一入口 ===== */}
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">1</div>
              <div>
                <span class="text-sm font-bold text-black">统一入口</span>
                <span class="text-[10px] text-gray-400 ml-2">Unified Entry</span>
              </div>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>
            <ProductCard product={entryProduct} />
          </div>

          {/* ===== Y-FORK VISUAL ===== */}
          <div class="flex justify-center mb-6">
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-full bg-[#4ECDC4] flex items-center justify-center shadow-lg shadow-[#4ECDC4]/30">
                <i class="fas fa-code-branch text-white text-sm"></i>
              </div>
              <span class="text-[10px] text-[#4ECDC4] font-bold mt-1">Y型分流</span>
            </div>
          </div>

          {/* ===== PHASE 2: 双角色分流（并排） ===== */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* LEFT: 融资者路径 */}
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">2a</div>
                <div>
                  <span class="text-sm font-bold text-amber-600">融资者路径</span>
                  <span class="text-[10px] text-gray-400 ml-2">Borrower</span>
                </div>
              </div>
              <div class="border-l-4 border-amber-300 pl-4">
                {borrowerProducts.map((p) => (
                  <ProductCard product={p} />
                ))}
              </div>
            </div>

            {/* RIGHT: 投资者搭建筛子 */}
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">2b</div>
                <div>
                  <span class="text-sm font-bold text-indigo-600">投资者搭建筛子</span>
                  <span class="text-[10px] text-gray-400 ml-2">Investor</span>
                </div>
              </div>
              <div class="border-l-4 border-indigo-300 pl-4">
                <div class="p-4 bg-indigo-50/40 rounded-xl border border-dashed border-indigo-300">
                  <div class="text-center mb-3">
                    <span class="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-600 text-[10px] font-bold rounded-full border border-indigo-200">
                      <i class="fas fa-robot mr-1"></i>投资者配置个性化AI筛选标准
                    </span>
                  </div>
                  <p class="text-[11px] text-indigo-600/70 text-center leading-relaxed mb-3">
                    每个投资者可通过评估通和风控通搭建自己的筛选工作流。<br/>
                    <strong>不设置任何筛子 = 在机会通看到所有融资项目。</strong>
                  </p>
                  <div class="flex items-center justify-center gap-2 text-[9px] text-indigo-400">
                    <span class="px-2 py-0.5 bg-white rounded border border-indigo-200">自定义投资标准</span>
                    <span class="px-2 py-0.5 bg-white rounded border border-indigo-200">自定义风控规则</span>
                    <span class="px-2 py-0.5 bg-white rounded border border-indigo-200">核验方式</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== PHASE 3: 数据筛选管道（核心过程） ===== */}
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">3</div>
              <div>
                <span class="text-sm font-bold text-gray-800">数据筛选管道</span>
                <span class="text-[10px] text-gray-400 ml-2">申请通数据 → 评估通 → 风控通 → 机会通</span>
              </div>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Pipeline info banner */}
            <div class="bg-gradient-to-r from-amber-50 via-indigo-50 to-emerald-50 rounded-xl p-4 border border-gray-200 mb-4">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="fas fa-long-arrow-alt-right text-amber-500"></i>
                </div>
                <div class="text-xs text-gray-600 leading-relaxed">
                  融资者在申请通上传的数据<strong class="text-amber-600">直接进入</strong>投资者搭建的评估通→风控通筛选管道。
                  数据依次经过<strong class="text-indigo-600">评估通</strong>（投资标准筛选）和<strong class="text-indigo-600">风控通</strong>（风控标准筛选），
                  <strong class="text-emerald-600">只有通过全部标准的项目</strong>才会出现在该投资者的机会通看板上。
                  不通过的项目会被淘汰或通知融资者补充材料。
                </div>
              </div>
            </div>

            {/* 评估通 */}
            <div class="relative mb-3">
              <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 to-indigo-300 hidden sm:block"></div>
              <div class="sm:ml-10">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-[9px] px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full font-bold border border-amber-200">
                    <i class="fas fa-database mr-0.5"></i>申请通数据流入
                  </span>
                  <span class="text-gray-300">→</span>
                  <span class="text-[9px] px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full font-bold border border-indigo-200">
                    <i class="fas fa-filter mr-0.5"></i>筛子①
                  </span>
                </div>
                <ProductCard product={investorFilterProducts[0]} />
              </div>
            </div>

            {/* Arrow between assess and risk */}
            <div class="sm:ml-10 flex items-center gap-2 mb-3 pl-2">
              <svg width="16" height="20" viewBox="0 0 16 20">
                <line x1="8" y1="0" x2="8" y2="14" stroke="#6366F1" stroke-width="1.5" opacity="0.4" />
                <polygon points="4,14 8,20 12,14" fill="#6366F1" opacity="0.4" />
              </svg>
              <span class="text-[9px] text-indigo-400">评估通过的项目继续流入 →</span>
            </div>

            {/* 风控通 */}
            <div class="relative mb-3">
              <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 to-emerald-300 hidden sm:block"></div>
              <div class="sm:ml-10">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-[9px] px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full font-bold border border-indigo-200">
                    <i class="fas fa-shield-alt mr-0.5"></i>筛子②
                  </span>
                  <span class="text-[9px] text-red-400 ml-2">
                    <i class="fas fa-times-circle mr-0.5"></i>不通过 → 淘汰/补材料
                  </span>
                </div>
                <ProductCard product={investorFilterProducts[1]} />
              </div>
            </div>

            {/* Arrow to Opportunity */}
            <div class="sm:ml-10 flex items-center gap-2 mb-3 pl-2">
              <svg width="16" height="20" viewBox="0 0 16 20">
                <line x1="8" y1="0" x2="8" y2="14" stroke="#10B981" stroke-width="2" />
                <polygon points="4,14 8,20 12,14" fill="#10B981" />
              </svg>
              <span class="text-[9px] text-emerald-500 font-bold">
                <i class="fas fa-check-circle mr-0.5"></i>通过全部标准 → 进入机会通展现
              </span>
            </div>

            {/* 机会通 */}
            <div class="relative">
              <div class="sm:ml-10">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-[9px] px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full font-bold border border-emerald-200">
                    <i class="fas fa-th-large mr-0.5"></i>投资者统一看板
                  </span>
                  <span class="text-[9px] text-emerald-500 font-semibold">
                    无筛子 = 展示全部融资项目
                  </span>
                </div>
                <ProductCard product={investorViewProduct} />
              </div>
            </div>
          </div>

          {/* ===== MERGE VISUAL ===== */}
          <div class="flex justify-center mb-6">
            <div class="flex flex-col items-center">
              <div class="flex items-center gap-3">
                <div class="h-px w-16 bg-amber-300"></div>
                <div class="w-10 h-10 rounded-full bg-[#4ECDC4] flex items-center justify-center shadow-lg shadow-[#4ECDC4]/30">
                  <i class="fas fa-handshake text-white text-sm"></i>
                </div>
                <div class="h-px w-16 bg-indigo-300"></div>
              </div>
              <span class="text-[10px] text-[#4ECDC4] font-bold mt-1">Y型汇合 · 投融资双方协同</span>
            </div>
          </div>

          {/* ===== PHASE 4: 交易达成（协同） ===== */}
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">4</div>
              <div>
                <span class="text-sm font-bold text-purple-600">交易达成</span>
                <span class="text-[10px] text-gray-400 ml-2">Deal Making</span>
              </div>
              <div class="flex-1 h-px bg-gray-200"></div>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#4ECDC4] text-white font-bold">
                <i class="fas fa-handshake mr-0.5"></i>投融资双方协同
              </span>
            </div>
            <div class="space-y-3">
              {dealProducts.map((p) => (
                <ProductCard product={p} />
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div class="flex justify-center mb-6">
            <svg width="16" height="24" viewBox="0 0 16 24">
              <line x1="8" y1="0" x2="8" y2="18" stroke="#4ECDC4" stroke-width="1.5" opacity="0.3" />
              <polygon points="4,18 8,24 12,18" fill="#4ECDC4" opacity="0.3" />
            </svg>
          </div>

          {/* ===== PHASE 5: 投后管理 ===== */}
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">5</div>
              <div>
                <span class="text-sm font-bold text-red-500">投后管理</span>
                <span class="text-[10px] text-gray-400 ml-2">Post-Investment</span>
              </div>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>
            <div class="space-y-3">
              {postInvestmentProducts.map((p) => (
                <ProductCard product={p} />
              ))}
            </div>
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
