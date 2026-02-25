import type { FC } from 'hono/jsx'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import type { Lang } from '../i18n'
import { tt, t, langLink } from '../i18n'

export const NewsPage: FC<{ lang?: Lang }> = ({ lang = 'zh' }) => {
  const l = lang
  const ll = (href: string) => langLink(href, l)
  const n = t.news

  const newsItems = [
    { date: '2026-02-25', category: tt(n.n1Cat, l), categoryClass: 'bg-[#5DC4B3]/10 text-[#5DC4B3]', categoryIcon: 'fa-rocket', title: tt(n.n1Title, l), summary: tt(n.n1Summary, l) },
    { date: '2026-02-18', category: tt(n.n2Cat, l), categoryClass: 'bg-blue-50 text-blue-600', categoryIcon: 'fa-handshake', title: tt(n.n2Title, l), summary: tt(n.n2Summary, l) },
    { date: '2026-02-10', category: tt(n.n3Cat, l), categoryClass: 'bg-purple-50 text-purple-600', categoryIcon: 'fa-brain', title: tt(n.n3Title, l), summary: tt(n.n3Summary, l) },
    { date: '2026-01-28', category: tt(n.n4Cat, l), categoryClass: 'bg-amber-50 text-amber-600', categoryIcon: 'fa-lightbulb', title: tt(n.n4Title, l), summary: tt(n.n4Summary, l) },
  ]

  return (
    <div class="min-h-screen">
      <Navbar active="news" lang={l} />

      {/* Hero */}
      <section class="aurora-bg noise-overlay relative overflow-hidden pt-20 pb-16">
        <div class="hero-grid-overlay"></div>
        <div class="max-w-4xl mx-auto px-4 relative text-center fade-in" style="z-index: 10;">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] text-white/50 text-xs font-semibold rounded-full mb-5 border border-white/[0.06]">
            {tt(n.badge, l)}
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">{tt(n.title, l)}</h1>
          <p class="text-base text-white/40 max-w-xl mx-auto">{tt(n.subtitle, l)}</p>
        </div>
      </section>

      {/* News List */}
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="space-y-5">
            {newsItems.map((item) => (
              <a href="#" class="block no-underline group">
                <div class="card-hover rounded-2xl p-6 border border-gray-100">
                  <div class="flex items-center gap-3 mb-3">
                    <span class={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold inline-flex items-center gap-1 ${item.categoryClass}`}>
                      <i class={`fas ${item.categoryIcon} text-[8px]`}></i>
                      {item.category}
                    </span>
                    <span class="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <h3 class="text-base font-bold text-[#1d1d1f] group-hover:text-[#5DC4B3] transition-colors mb-2">{item.title}</h3>
                  <p class="text-sm text-gray-500 leading-relaxed">{item.summary}</p>
                  <div class="mt-3 flex items-center text-xs font-semibold text-[#5DC4B3] group-hover:gap-3 gap-1.5 transition-all">
                    {tt(n.readMore, l)} <i class="fas fa-arrow-right text-[10px]"></i>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section class="py-14 bg-gray-50">
        <div class="max-w-md mx-auto px-4 text-center">
          <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#5DC4B3]/10 flex items-center justify-center">
            <i class="fas fa-bell text-[#5DC4B3] text-lg"></i>
          </div>
          <h3 class="text-lg font-extrabold text-[#1d1d1f] mb-2">{tt(n.subscribeTitle, l)}</h3>
          <p class="text-sm text-gray-500 mb-5">{tt(n.subscribeDesc, l)}</p>
          <a href={ll('/contact')} class="inline-flex items-center px-6 py-3 bg-[#5DC4B3] hover:bg-[#3D8F83] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#5DC4B3]/25 transition-all no-underline">
            <i class="fas fa-envelope mr-2"></i>{tt(n.subscribeCta, l)}
          </a>
        </div>
      </section>

      <Footer lang={l} />
    </div>
  )
}
