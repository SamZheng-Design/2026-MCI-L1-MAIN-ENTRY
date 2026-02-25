import type { FC } from 'hono/jsx'
import { products, foundations, architectureGroups, designSections, mainFlowProducts, investorFilterProducts, investorViewProduct, entryProduct, borrowerProducts, dealProducts, postInvestmentProducts } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogoSmall, ProductLogoFlow, ProductLogo } from '../components/Logos'
import type { Lang } from '../i18n'
import { tt, ta, t, langLink } from '../i18n'

const TEAL = '#5DC4B3'

const getStatusLabel = (status: string, l: Lang) => {
  const labels: Record<string, { text: string; class: string }> = {
    live: { text: tt(t.data.statusLive, l), class: 'bg-green-100 text-green-700 border-green-200' },
    beta: { text: tt(t.data.statusBeta, l), class: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    coming: { text: tt(t.data.statusComing, l), class: 'bg-gray-100 text-gray-500 border-gray-200' },
  }
  return labels[status] || labels.coming
}

const getProductDesc = (id: string, l: Lang): string => {
  const key = `${id}Desc` as keyof typeof t.data
  const entry = t.data[key]
  if (entry && typeof entry === 'object' && 'zh' in entry) return tt(entry as { zh: string; en: string }, l)
  return ''
}

const getProductFeatures = (id: string, l: Lang): string[] => {
  const key = `${id}Features` as keyof typeof t.data
  const entry = t.data[key]
  if (entry && typeof entry === 'object' && 'zh' in entry) return ta(entry as { zh: string[]; en: string[] }, l)
  return []
}

const getFoundations = (l: Lang) => [
  { name: tt(t.data.foundation1Name, l), description: tt(t.data.foundation1Desc, l), icon: 'fa-users' },
  { name: tt(t.data.foundation2Name, l), description: tt(t.data.foundation2Desc, l), icon: 'fa-database' },
  { name: tt(t.data.foundation3Name, l), description: tt(t.data.foundation3Desc, l), icon: 'fa-brain' },
]

const ProductCard: FC<{ p: typeof products[0]; lang: Lang; showFilter?: boolean; showCollab?: boolean; borderClass?: string }> = ({ p, lang: l, showFilter, showCollab, borderClass }) => {
  const status = getStatusLabel(p.status, l)
  const desc = getProductDesc(p.id, l)
  const features = getProductFeatures(p.id, l)
  const href = langLink(`/${p.id}`, l)
  const bc = borderClass || 'border-gray-200 hover:border-[#5DC4B3]/30 hover:shadow-md'

  return (
    <a href={href} class="block no-underline group">
      <div class={`portal-card bg-white rounded-2xl p-5 transition-all border ${bc}`}>
        <div class="flex items-start gap-4">
          <ProductLogo name={p.name} englishShort={p.englishShort} size={60} />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <h3 class="text-base font-bold text-[#1d1d1f] group-hover:text-[#5DC4B3] transition-colors">{l === 'en' ? p.englishName : p.name}</h3>
              <span class={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${status.class}`}>{status.text}</span>
              {showFilter && p.isFilter && (
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold border border-indigo-200">
                  <i class="fas fa-filter mr-0.5"></i>{tt(t.design.aiFilter, l)}
                </span>
              )}
              {showCollab && p.isCollaborative && (
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#5DC4B3] text-white font-bold">
                  <i class="fas fa-handshake mr-0.5"></i>{tt(t.design.collaborative, l)}
                </span>
              )}
            </div>
            <p class="text-xs text-gray-400 mb-1.5">{l === 'en' ? p.name : p.englishName}</p>
            <p class="text-sm text-gray-500 leading-relaxed">{desc}</p>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div class="flex flex-wrap gap-1.5">
            {features.slice(0, 3).map((f) => (
              <span class="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-400 rounded border border-gray-100">{f}</span>
            ))}
          </div>
          <i class="fas fa-arrow-right text-xs text-gray-300 group-hover:text-[#5DC4B3] transition-colors"></i>
        </div>
      </div>
    </a>
  )
}

export const DesignPage: FC<{ lang?: Lang }> = ({ lang = 'zh' }) => {
  const l = lang
  const ll = (href: string) => langLink(href, l)
  const localFoundations = getFoundations(l)

  return (
    <div class="min-h-screen">
      <Navbar active="design" lang={l} />

      <section class="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-[#5DC4B3]/5 pt-16 pb-20">
        <div class="absolute inset-0 dot-pattern opacity-30"></div>
        <div class="floating-element top-[12%] right-[8%] w-4 h-4 rounded-full opacity-[0.05]" style="background: #5DC4B3;"></div>
        <div class="floating-element top-[50%] left-[5%] w-3 h-3 rounded-full opacity-[0.04]" style="background: #6366F1; animation-delay: 1.5s;"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center fade-in">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#5DC4B3]/10 text-[#5DC4B3] text-xs font-semibold rounded-full mb-6 border border-[#5DC4B3]/20">
              <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="5" fill="#5DC4B3"/></svg>
              {tt(t.design.badge, l)}
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d1d1f] mb-4 leading-tight tracking-tight">
              {tt(t.design.heroTitle1, l)}<span class="text-[#5DC4B3]">{tt(t.design.heroTitle2, l)}</span>
            </h1>
            <p class="text-lg text-gray-500 max-w-2xl mx-auto">{tt(t.design.heroSubtitle, l)}</p>
          </div>
        </div>
      </section>

      <section class="py-12 bg-white" id="y-flow">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full mb-3">{tt(t.design.yFlowBadge, l)}</div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1d1d1f] mb-3">{tt(t.design.yFlowTitle, l)}</h2>
            <p class="text-sm text-gray-500 max-w-2xl mx-auto">{tt(t.design.yFlowSubtitle, l)}</p>
            <div class="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6">
              <div class="flex items-center gap-2"><div class="w-4 h-4 rounded bg-amber-100 border-2 border-amber-400"></div><span class="text-xs text-gray-500">{tt(t.design.legendBorrower, l)}</span></div>
              <div class="flex items-center gap-2"><div class="w-4 h-4 rounded bg-indigo-100 border-2 border-indigo-400"></div><span class="text-xs text-gray-500">{tt(t.design.legendInvestor, l)}</span></div>
              <div class="flex items-center gap-2"><div class="w-8 h-0.5 rounded bg-amber-400" style="border-top: 2px dashed #F59E0B"></div><span class="text-xs text-gray-500">{tt(t.design.legendDataPipe, l)}</span></div>
              <div class="flex items-center gap-2"><div class="w-4 h-4 rounded bg-[#5DC4B3]/20 border-2 border-[#5DC4B3]"></div><span class="text-xs text-gray-500">{tt(t.design.legendCollaborative, l)}</span></div>
            </div>
          </div>

          {/* Phase 1 */}
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">1</div>
              <div><span class="text-sm font-bold text-[#1d1d1f]">{tt(t.design.phase1, l)}</span></div>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>
            <ProductCard p={entryProduct} lang={l} />
          </div>

          <div class="flex justify-center mb-6">
            <div class="flex flex-col items-center">
              <div class="w-10 h-10 rounded-full bg-[#5DC4B3] flex items-center justify-center shadow-lg shadow-[#5DC4B3]/30"><i class="fas fa-code-branch text-white text-sm"></i></div>
              <span class="text-[10px] text-[#5DC4B3] font-bold mt-1">{l === 'en' ? 'Y-Shape Split' : 'Y型分流'}</span>
            </div>
          </div>

          {/* Phase 2 */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">2a</div>
                <span class="text-sm font-bold text-amber-600">{tt(t.design.phase2a, l)}</span>
              </div>
              <div class="border-l-4 border-amber-300 pl-4">
                {borrowerProducts.map((p) => (<ProductCard p={p} lang={l} />))}
              </div>
            </div>
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">2b</div>
                <span class="text-sm font-bold text-indigo-600">{tt(t.design.phase2b, l)}</span>
              </div>
              <div class="border-l-4 border-indigo-300 pl-4">
                <div class="p-4 bg-indigo-50/40 rounded-xl border border-dashed border-indigo-300">
                  <div class="text-center mb-3">
                    <span class="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-600 text-[10px] font-bold rounded-full border border-indigo-200">
                      <i class="fas fa-robot mr-1"></i>{tt(t.design.investorConfigLabel, l)}
                    </span>
                  </div>
                  <p class="text-[11px] text-indigo-600/70 text-center leading-relaxed mb-3">
                    {tt(t.design.investorConfigDesc, l)}<br/><strong>{tt(t.design.investorConfigDesc2, l)}</strong>
                  </p>
                  <div class="flex items-center justify-center gap-2 text-[9px] text-indigo-400">
                    <span class="px-2 py-0.5 bg-white rounded border border-indigo-200">{tt(t.design.investorTag1, l)}</span>
                    <span class="px-2 py-0.5 bg-white rounded border border-indigo-200">{tt(t.design.investorTag2, l)}</span>
                    <span class="px-2 py-0.5 bg-white rounded border border-indigo-200">{tt(t.design.investorTag3, l)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3: Pipeline */}
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">3</div>
              <div><span class="text-sm font-bold text-gray-800">{tt(t.design.phase3, l)}</span><span class="text-[10px] text-gray-400 ml-2">{tt(t.design.phase3Desc, l)}</span></div>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>
            <div class="bg-gradient-to-r from-amber-50 via-indigo-50 to-emerald-50 rounded-xl p-4 border border-gray-200 mb-4">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5"><i class="fas fa-long-arrow-alt-right text-amber-500"></i></div>
                <div class="text-xs text-gray-600 leading-relaxed">{tt(t.design.pipelineDesc, l)}</div>
              </div>
            </div>

            <div class="relative mb-3">
              <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 to-indigo-300 hidden sm:block"></div>
              <div class="sm:ml-10">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-[9px] px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full font-bold border border-amber-200"><i class="fas fa-database mr-0.5"></i>{tt(t.design.dataFlowIn, l)}</span>
                  <span class="text-gray-300">→</span>
                  <span class="text-[9px] px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full font-bold border border-indigo-200"><i class="fas fa-filter mr-0.5"></i>{tt(t.design.filter1, l)}</span>
                </div>
                <ProductCard p={investorFilterProducts[0]} lang={l} showFilter={true} />
              </div>
            </div>

            <div class="sm:ml-10 flex items-center gap-2 mb-3 pl-2">
              <svg width="16" height="20" viewBox="0 0 16 20"><line x1="8" y1="0" x2="8" y2="14" stroke="#6366F1" stroke-width="1.5" opacity="0.4" /><polygon points="4,14 8,20 12,14" fill="#6366F1" opacity="0.4" /></svg>
              <span class="text-[9px] text-indigo-400">{tt(t.design.assessPassed, l)}</span>
            </div>

            <div class="relative mb-3">
              <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 to-emerald-300 hidden sm:block"></div>
              <div class="sm:ml-10">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-[9px] px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full font-bold border border-indigo-200"><i class="fas fa-shield-alt mr-0.5"></i>{tt(t.design.filter2, l)}</span>
                  <span class="text-[9px] text-red-400 ml-2"><i class="fas fa-times-circle mr-0.5"></i>{tt(t.design.rejected, l)}</span>
                </div>
                <ProductCard p={investorFilterProducts[1]} lang={l} showFilter={true} />
              </div>
            </div>

            <div class="sm:ml-10 flex items-center gap-2 mb-3 pl-2">
              <svg width="16" height="20" viewBox="0 0 16 20"><line x1="8" y1="0" x2="8" y2="14" stroke="#10B981" stroke-width="2" /><polygon points="4,14 8,20 12,14" fill="#10B981" /></svg>
              <span class="text-[9px] text-emerald-500 font-bold"><i class="fas fa-check-circle mr-0.5"></i>{tt(t.design.passedAll, l)}</span>
            </div>

            <div class="relative">
              <div class="sm:ml-10">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-[9px] px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full font-bold border border-emerald-200"><i class="fas fa-th-large mr-0.5"></i>{tt(t.design.investorBoard, l)}</span>
                  <span class="text-[9px] text-emerald-500 font-semibold">{tt(t.design.noFilterRule, l)}</span>
                </div>
                <ProductCard p={investorViewProduct} lang={l} />
              </div>
            </div>
          </div>

          {/* Merge */}
          <div class="flex justify-center mb-6">
            <div class="flex flex-col items-center">
              <div class="flex items-center gap-3">
                <div class="h-px w-16 bg-amber-300"></div>
                <div class="w-10 h-10 rounded-full bg-[#5DC4B3] flex items-center justify-center shadow-lg shadow-[#5DC4B3]/30"><i class="fas fa-handshake text-white text-sm"></i></div>
                <div class="h-px w-16 bg-indigo-300"></div>
              </div>
              <span class="text-[10px] text-[#5DC4B3] font-bold mt-1">{tt(t.design.yMerge, l)}</span>
            </div>
          </div>

          {/* Phase 4 */}
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">4</div>
              <span class="text-sm font-bold text-purple-600">{tt(t.design.phase4, l)}</span>
              <div class="flex-1 h-px bg-gray-200"></div>
              <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#5DC4B3] text-white font-bold"><i class="fas fa-handshake mr-0.5"></i>{tt(t.design.phase4Label, l)}</span>
            </div>
            <div class="space-y-3">
              {dealProducts.map((p) => (<ProductCard p={p} lang={l} showCollab={true} borderClass={p.isCollaborative ? 'border-[#5DC4B3]/50 shadow-md shadow-[#5DC4B3]/10 hover:shadow-lg' : undefined} />))}
            </div>
          </div>

          <div class="flex justify-center mb-6">
            <svg width="16" height="24" viewBox="0 0 16 24"><line x1="8" y1="0" x2="8" y2="18" stroke="#5DC4B3" stroke-width="1.5" opacity="0.3" /><polygon points="4,18 8,24 12,18" fill="#5DC4B3" opacity="0.3" /></svg>
          </div>

          {/* Phase 5 */}
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">5</div>
              <span class="text-sm font-bold text-emerald-600">{tt(t.design.phase5, l)}</span>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>
            <div class="space-y-3">
              {postInvestmentProducts.map((p) => (<ProductCard p={p} lang={l} />))}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-extrabold text-[#1d1d1f] mb-2">{tt(t.design.archTitle, l)}</h2>
            <p class="text-sm text-gray-500">{tt(t.design.archSubtitle, l)}</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {architectureGroups.map((group) => (
              <div class="space-y-3">
                <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-100 shadow-sm">
                  <i class={`fas ${group.icon} text-xs`} style={`color: ${group.color}`}></i>
                  <div class="flex-1 min-w-0">
                    <span class="text-xs font-bold text-[#1d1d1f] block truncate">{l === 'en' ? group.titleEn : group.title}</span>
                    <span class="text-[9px] text-gray-400">{l === 'en' ? group.title : group.titleEn}</span>
                  </div>
                </div>
                {group.ids.map((id) => {
                  const p = products.find(pr => pr.id === id)!
                  const status = getStatusLabel(p.status, l)
                  return (
                    <div class="card-hover bg-white border border-gray-200 rounded-xl p-3 cursor-pointer" onclick={`window.location.href='${ll(`/${p.id}`)}'`}>
                      <div class="flex items-start gap-2">
                        <ProductLogoSmall name={p.name} englishShort={p.englishShort} size={40} />
                        <div class="flex-1 min-w-0">
                          <h3 class="text-xs font-bold text-[#1d1d1f] mb-0.5">{l === 'en' ? p.englishName : p.name}</h3>
                          <p class="text-[10px] text-gray-400">{l === 'en' ? p.name : p.englishShort}</p>
                        </div>
                      </div>
                      <div class="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1.5 flex-wrap">
                        <span class={`text-[9px] px-1.5 py-0.5 rounded-full border ${status.class}`}>{status.text}</span>
                        {p.isFilter && (<span class="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-500 border border-indigo-200 font-semibold"><i class="fas fa-filter mr-0.5"></i>{tt(t.design.filterLabel, l)}</span>)}
                        {p.isCollaborative && (<span class="text-[9px] px-1.5 py-0.5 rounded-full bg-[#5DC4B3]/10 text-[#5DC4B3] border border-[#5DC4B3]/20 font-semibold">{tt(t.design.collaborative, l)}</span>)}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-8 bg-white">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <div class="flex items-center justify-center gap-4">
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span class="text-sm font-semibold text-[#1d1d1f] tracking-wider">{tt(t.design.connLabel, l)}</span>
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </section>

      <section class="py-16 bg-gray-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative border-t-4 border-[#5DC4B3] rounded-xl bg-white shadow-lg overflow-hidden">
            <div class="absolute inset-0 dot-pattern opacity-10"></div>
            <div class="relative p-8">
              <div class="flex items-center justify-between mb-8">
                <div><h2 class="text-xl font-extrabold text-[#1d1d1f]">{tt(t.design.foundTitle, l)}</h2><p class="text-xs text-gray-400 mt-1">{tt(t.design.foundSubtitle, l)}</p></div>
                <span class="px-3 py-1 bg-[#5DC4B3]/10 text-[#5DC4B3] text-xs font-semibold rounded-full border border-[#5DC4B3]/20"><i class="fas fa-check-circle mr-1"></i>{tt(t.design.foundShared, l)}</span>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {localFoundations.map((f) => (
                  <div class="card-hover bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                    <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm"><i class={`fas ${f.icon} text-2xl text-[#5DC4B3]`}></i></div>
                    <h3 class="text-base font-bold text-[#1d1d1f] mb-2">{f.name}</h3>
                    <p class="text-sm text-gray-500">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Thinking Accordion - uses original designSections data */}
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-extrabold text-[#1d1d1f] mb-2">{tt(t.design.designTitle, l)}</h2>
            <p class="text-sm text-gray-500">{tt(t.design.designSubtitle, l)}</p>
          </div>
          <div class="space-y-4" id="accordion">
            {designSections.map((section, idx) => (
              <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button class="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors" onclick="toggleAccordion(this)">
                  <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm"><i class={`fas ${section.icon} text-[#5DC4B3]`}></i></div>
                  <div class="flex-1"><h3 class="text-base font-bold text-[#1d1d1f]">{section.title}</h3></div>
                  <i class="fas fa-chevron-down text-gray-400 text-sm transition-transform duration-300 accordion-icon"></i>
                </button>
                <div class={`accordion-content ${idx === 1 ? 'open' : ''}`}>
                  <div class="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
                    {section.content.map((item) => (
                      <div class="pl-4 border-l-2 border-[#5DC4B3]/40">
                        <h4 class="text-sm font-bold text-[#1d1d1f] mb-1">{item.subtitle}</h4>
                        <p class="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-16 bg-gradient-to-br from-[#5DC4B3]/5 via-white to-[#5DC4B3]/8">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-2xl font-extrabold text-[#1d1d1f] mb-4">{tt(t.design.ctaTitle, l)}</h2>
          <p class="text-gray-500 mb-8">{tt(t.design.ctaSubtitle, l)}</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href={ll('/portal')} class="inline-flex items-center justify-center px-8 py-3.5 bg-[#5DC4B3] hover:bg-[#3D8F83] text-white font-bold rounded-xl shadow-lg shadow-[#5DC4B3]/25 transition-all no-underline"><i class="fas fa-rocket mr-2"></i>{tt(t.design.ctaPrimary, l)}</a>
            <a href="#" class="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1d1d1f] font-bold rounded-xl border-2 border-gray-200 hover:border-[#5DC4B3] transition-all no-underline"><i class="fas fa-download mr-2"></i>{tt(t.design.ctaSecondary, l)}</a>
          </div>
        </div>
      </section>

      <script dangerouslySetInnerHTML={{ __html: `
        function toggleAccordion(btn) {
          var content = btn.nextElementSibling; var icon = btn.querySelector('.accordion-icon'); var isOpen = content.classList.contains('open');
          document.querySelectorAll('#accordion .accordion-content').forEach(function(c) { c.classList.remove('open'); });
          document.querySelectorAll('#accordion .accordion-icon').forEach(function(ic) { ic.classList.remove('rotate-180'); });
          if (!isOpen) { content.classList.add('open'); icon.classList.add('rotate-180'); }
        }
      ` }} />

      <Footer lang={l} />
    </div>
  )
}
