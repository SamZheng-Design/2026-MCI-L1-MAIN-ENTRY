import type { FC } from 'hono/jsx'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import type { Lang } from '../i18n'
import { tt, t, langLink } from '../i18n'

export const TeamPage: FC<{ lang?: Lang }> = ({ lang = 'zh' }) => {
  const l = lang
  const ll = (href: string) => langLink(href, l)
  const tm = t.team

  const teamMembers = [
    { name: tt(tm.m1Name, l), titleEn: 'CEO', desc: tt(tm.m1Desc, l), icon: 'fa-chess-king', color: '#5DC4B3' },
    { name: tt(tm.m2Name, l), titleEn: 'CTO', desc: tt(tm.m2Desc, l), icon: 'fa-microchip', color: '#6366F1' },
    { name: tt(tm.m3Name, l), titleEn: 'CIO', desc: tt(tm.m3Desc, l), icon: 'fa-chart-pie', color: '#F59E0B' },
    { name: tt(tm.m4Name, l), titleEn: 'CPO', desc: tt(tm.m4Desc, l), icon: 'fa-compass', color: '#8B5CF6' },
  ]

  const advisors = [
    { name: tt(tm.a1Name, l), titleEn: 'Strategic Advisor', desc: tt(tm.a1Desc, l), icon: 'fa-landmark', color: '#10B981' },
    { name: tt(tm.a2Name, l), titleEn: 'Technical Advisor', desc: tt(tm.a2Desc, l), icon: 'fa-brain', color: '#EF4444' },
  ]

  return (
    <div class="min-h-screen">
      <Navbar active="team" lang={l} />

      {/* Hero */}
      <section class="aurora-bg noise-overlay relative overflow-hidden pt-20 pb-16">
        <div class="hero-grid-overlay"></div>
        <div class="max-w-4xl mx-auto px-4 relative text-center fade-in" style="z-index: 10;">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] text-white/50 text-xs font-semibold rounded-full mb-5 border border-white/[0.06]">
            {tt(tm.badge, l)}
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">{tt(tm.title, l)}</h1>
          <p class="text-base text-white/40 max-w-xl mx-auto">{tt(tm.subtitle, l)}</p>
        </div>
      </section>

      {/* Core Team */}
      <section class="py-16 bg-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-lg font-extrabold text-[#1d1d1f] mb-8 text-center">{tt(tm.managementTitle, l)}</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((m) => (
              <div class="card-hover text-center p-6 rounded-2xl border border-gray-100">
                <div class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={`background:${m.color}10;`}>
                  <i class={`fas ${m.icon} text-2xl`} style={`color:${m.color};`}></i>
                </div>
                <h3 class="text-base font-bold text-[#1d1d1f]">{m.name}</h3>
                <p class="text-xs font-semibold text-[#5DC4B3] mb-2">{m.titleEn}</p>
                <p class="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section class="py-14 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-lg font-extrabold text-[#1d1d1f] mb-8 text-center">{tt(tm.advisorsTitle, l)}</h2>
          <div class="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {advisors.map((a) => (
              <div class="card-hover flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white">
                <div class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={`background:${a.color}10;`}>
                  <i class={`fas ${a.icon} text-lg`} style={`color:${a.color};`}></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-[#1d1d1f]">{a.name}</h3>
                  <p class="text-xs text-[#5DC4B3] font-semibold mb-1">{a.titleEn}</p>
                  <p class="text-xs text-gray-500">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section class="py-16 bg-white">
        <div class="max-w-md mx-auto px-4 text-center">
          <div class="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#5DC4B3]/10 flex items-center justify-center">
            <i class="fas fa-user-plus text-[#5DC4B3] text-xl"></i>
          </div>
          <h3 class="text-lg font-extrabold text-[#1d1d1f] mb-2">{tt(tm.joinTitle, l)}</h3>
          <p class="text-sm text-gray-500 mb-6">{tt(tm.joinDesc, l)}</p>
          <a href={ll('/contact')} class="inline-flex items-center px-6 py-3 bg-[#5DC4B3] hover:bg-[#3D8F83] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#5DC4B3]/25 transition-all no-underline">
            <i class="fas fa-envelope mr-2"></i>{tt(tm.joinCta, l)}
          </a>
        </div>
      </section>

      <Footer lang={l} />
    </div>
  )
}
