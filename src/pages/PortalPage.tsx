import type { FC } from 'hono/jsx'
import { products, getProductUrl, isExternalProduct } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogoSmall } from '../components/Logos'
import type { Lang } from '../i18n'
import { tt, ta, t, langLink } from '../i18n'

const TEAL = '#5DC4B3'

// Helper: get status label
const getStatusLabel = (status: string, l: Lang) => {
  const labels: Record<string, { text: string; class: string }> = {
    live: { text: tt(t.data.statusLive, l), class: 'bg-green-100 text-green-700 border-green-200' },
    beta: { text: tt(t.data.statusBeta, l), class: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    coming: { text: tt(t.data.statusComing, l), class: 'bg-gray-100 text-gray-500 border-gray-200' },
  }
  return labels[status] || labels.coming
}

// Helper: get role badge
const getRoleBadge = (role: string, l: Lang) => {
  const badges: Record<string, { text: string; class: string }> = {
    shared: { text: tt(t.data.roleBadgeShared, l), class: 'bg-blue-100 text-blue-600' },
    borrower: { text: tt(t.data.roleBadgeBorrower, l), class: 'bg-amber-100 text-amber-700' },
    investor: { text: tt(t.data.roleBadgeInvestor, l), class: 'bg-indigo-100 text-indigo-600' },
    collaborative: { text: tt(t.data.roleBadgeCollaborative, l), class: 'bg-[#5DC4B3]/15 text-[#0d9488]' },
  }
  return badges[role] || badges.shared
}

// Helper: get short desc
const getShortDesc = (id: string, l: Lang): string => {
  const key = `${id}Short` as keyof typeof t.data
  const entry = t.data[key]
  if (entry && typeof entry === 'object' && 'zh' in entry) {
    return tt(entry as { zh: string; en: string }, l)
  }
  return ''
}

// Helper: get product features
const getProductFeatures = (id: string, l: Lang): string[] => {
  const key = `${id}Features` as keyof typeof t.data
  const entry = t.data[key]
  if (entry && typeof entry === 'object' && 'zh' in entry) {
    return ta(entry as { zh: string[]; en: string[] }, l)
  }
  return []
}

// Product icon mapping
const productIcons: Record<string, string> = {
  identity: 'fa-fingerprint', application: 'fa-file-upload', assess: 'fa-clipboard-check',
  risk: 'fa-shield-alt', opportunity: 'fa-binoculars', terms: 'fa-file-contract',
  contract: 'fa-file-signature', settlement: 'fa-coins', performance: 'fa-chart-bar'
}

// Foundation helper
const getFoundations = (l: Lang) => [
  { name: tt(t.data.foundation1Name, l), description: tt(t.data.foundation1Desc, l), icon: 'fa-users' },
  { name: tt(t.data.foundation2Name, l), description: tt(t.data.foundation2Desc, l), icon: 'fa-database' },
  { name: tt(t.data.foundation3Name, l), description: tt(t.data.foundation3Desc, l), icon: 'fa-brain' },
]

export const PortalPage: FC<{ lang?: Lang }> = ({ lang = 'zh' }) => {
  const l = lang
  const ll = (href: string) => langLink(href, l)

  const phases = [
    { key: 'entry', label: tt(t.portal.phaseEntry, l), labelEn: 'Entry', color: '#5DC4B3', icon: 'fa-fingerprint', description: tt(t.portal.phaseEntryDesc, l), ids: ['identity'] },
    { key: 'borrower', label: tt(t.portal.phaseBorrower, l), labelEn: 'Borrower', color: '#F59E0B', icon: 'fa-upload', description: tt(t.portal.phaseBorrowerDesc, l), ids: ['application'] },
    { key: 'investor', label: tt(t.portal.phaseInvestor, l), labelEn: 'Investor', color: '#6366F1', icon: 'fa-filter', description: tt(t.portal.phaseInvestorDesc, l), ids: ['assess', 'risk', 'opportunity'] },
    { key: 'deal', label: tt(t.portal.phaseDeal, l), labelEn: 'Deal', color: '#8B5CF6', icon: 'fa-handshake', description: tt(t.portal.phaseDealDesc, l), ids: ['terms', 'contract'] },
    { key: 'post', label: tt(t.portal.phasePost, l), labelEn: 'Post-Inv', color: '#10B981', icon: 'fa-chart-line', description: tt(t.portal.phasePostDesc, l), ids: ['settlement', 'performance'] },
  ]

  const localFoundations = getFoundations(l)

  return (
    <div class="min-h-screen bg-white">
      <Navbar active="portal" lang={l} />

      {/* Hero */}
      <section class="relative bg-white pt-12 pb-8 overflow-hidden border-b border-gray-100/60">
        <div class="absolute inset-0 opacity-[0.015]" style="background-image: radial-gradient(circle, #5DC4B3 1px, transparent 1px); background-size: 40px 40px;"></div>
        <div class="max-w-3xl mx-auto px-4 text-center fade-in relative z-10">
          <div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#5DC4B3]/8 text-[#5DC4B3] text-[11px] font-semibold rounded-full mb-4 border border-[#5DC4B3]/15 tracking-wider uppercase">
            {tt(t.portal.badge, l)}
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] mb-3 tracking-tight">
            {tt(t.portal.title, l)}<span class="gradient-text-brand">{tt(t.portal.titleHighlight, l)}</span>
          </h1>
          <p class="text-sm text-gray-400 max-w-md mx-auto">
            {tt(t.portal.subtitle, l)}
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
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

      {/* Tab Content */}
      <section class="py-8 min-h-[50vh]">
        <div class="max-w-3xl mx-auto px-4">
          {phases.map((ph, phaseIdx) => {
            const phaseProducts = ph.ids.map(id => products.find(p => p.id === id)!).filter(Boolean)
            return (
              <div id={`tab-${ph.key}`} class="tab-content" style={phaseIdx === 0 ? '' : 'display:none;'}>
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

                <div class="space-y-4">
                  {phaseProducts.map((p) => {
                    const desc = getShortDesc(p.id, l)
                    const badge = getRoleBadge(p.role, l)
                    const status = getStatusLabel(p.status, l)
                    const features = getProductFeatures(p.id, l)
                    const href = ll(getProductUrl(p))
                    const isExt = isExternalProduct(p)

                    return (
                      <a href={href} target={isExt ? "_blank" : undefined} rel={isExt ? "noopener noreferrer" : undefined} class="block no-underline group">
                        <div class="relative bg-white border border-gray-100 hover:border-[#5DC4B3]/30 rounded-2xl p-6 transition-all hover:shadow-lg cursor-pointer portal-card overflow-hidden">
                          <div class="flex items-start gap-5">
                            <div class="flex-shrink-0">
                              <ProductLogoSmall name={p.name} englishShort={p.englishShort} size={52} />
                            </div>
                            <div class="flex-1 min-w-0">
                              <div class="flex items-center gap-2.5 mb-1">
                                <h3 class="text-lg font-bold text-[#1d1d1f] group-hover:text-[#5DC4B3] transition-colors">{l === 'en' ? p.englishName : p.name}</h3>
                                <span class="text-xs text-gray-300 font-medium hidden sm:inline">{l === 'en' ? p.name : p.englishName}</span>
                              </div>
                              <p class="text-sm text-gray-500 mb-3 leading-relaxed">{desc}</p>
                              <div class="flex items-center gap-2 flex-wrap">
                                <span class={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${status.class}`}>{status.text}</span>
                                <span class={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${badge.class}`}>{badge.text}</span>
                                {p.isFilter && (
                                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-500 font-bold border border-indigo-100">
                                    <i class="fas fa-robot mr-0.5 text-[8px]"></i>{tt(t.design.aiFilter, l)}
                                  </span>
                                )}
                                {p.isCollaborative && (
                                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-500 font-bold border border-purple-100">
                                    <i class="fas fa-handshake mr-0.5 text-[8px]"></i>{tt(t.design.collaborative, l)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div class="flex-shrink-0 pt-2">
                              <div class="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-[#5DC4B3]/10 flex items-center justify-center transition-all">
                                <i class="fas fa-arrow-right text-sm text-gray-300 group-hover:text-[#5DC4B3] group-hover:translate-x-0.5 transition-all"></i>
                              </div>
                            </div>
                          </div>

                          {features.length > 0 && (
                            <div class="mt-4 pt-3 border-t border-gray-50 flex flex-wrap gap-1.5 ml-[72px]">
                              {features.slice(0, 4).map((feat) => (
                                <span class="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-400 rounded-md">{feat}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </a>
                    )
                  })}
                </div>

                {phaseIdx < phases.length - 1 && (
                  <div class="mt-6 text-center">
                    <button
                      onclick={`switchTab('${phases[phaseIdx + 1].key}')`}
                      class="inline-flex items-center gap-2 px-4 py-2 text-xs text-gray-400 hover:text-[#5DC4B3] font-medium transition-colors rounded-lg hover:bg-gray-50"
                    >
                      {tt(t.portal.nextPhase, l)}: {phases[phaseIdx + 1].label}
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
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">{tt(t.portal.foundationLabel, l)}</span>
          </div>
          <div class="grid grid-cols-3 gap-4">
            {localFoundations.map((f) => (
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
          document.querySelectorAll('.tab-content').forEach(function(el) { el.style.display = 'none'; });
          var target = document.getElementById('tab-' + key);
          if (target) {
            target.style.display = '';
            target.style.opacity = '0'; target.style.transform = 'translateY(8px)';
            requestAnimationFrame(function() {
              target.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              target.style.opacity = '1'; target.style.transform = 'translateY(0)';
            });
          }
          var color = phaseColors[key] || '#5DC4B3';
          document.querySelectorAll('.portal-tab').forEach(function(btn) {
            var tabKey = btn.getAttribute('data-tab');
            if (tabKey === key) {
              btn.style.background = color; btn.style.borderColor = color; btn.style.color = '#fff';
              btn.style.boxShadow = '0 2px 10px ' + color + '40'; btn.classList.remove('text-gray-500');
            } else {
              btn.style.background = '#fff'; btn.style.borderColor = '#f3f4f6'; btn.style.color = '#6b7280';
              btn.style.boxShadow = 'none'; btn.classList.add('text-gray-500');
            }
          });
          var activeBtn = document.querySelector('.portal-tab[data-tab="' + key + '"]');
          if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          window.scrollTo({ top: document.getElementById('portal-tabs').getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
        }
      `}} />

      <Footer lang={l} />
    </div>
  )
}
