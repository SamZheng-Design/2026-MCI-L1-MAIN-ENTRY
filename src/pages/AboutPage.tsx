import type { FC } from 'hono/jsx'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import type { Lang } from '../i18n'
import { tt, t, langLink } from '../i18n'

export const AboutPage: FC<{ lang?: Lang }> = ({ lang = 'zh' }) => {
  const l = lang
  const ll = (href: string) => langLink(href, l)
  const a = t.about

  return (
    <div class="min-h-screen">
      <Navbar active="about" lang={l} />

      {/* Hero */}
      <section class="aurora-bg noise-overlay relative overflow-hidden pt-20 pb-16">
        <div class="hero-grid-overlay"></div>
        <div class="floating-element top-[15%] right-[10%] w-3 h-3 rounded-full opacity-[0.06]" style="background: #5DC4B3; animation-delay: 0s;"></div>
        <div class="floating-element bottom-[20%] left-[8%] w-2.5 h-2.5 rounded-full opacity-[0.04]" style="background: #6366F1; animation-delay: 2s;"></div>
        <div class="floating-element top-[40%] left-[12%] w-2 h-2 rounded-full opacity-[0.03]" style="background: #F59E0B; animation-delay: 4s;"></div>
        
        <div class="max-w-4xl mx-auto px-4 relative z-10 text-center fade-in">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] text-white/50 text-xs font-semibold rounded-full mb-5 border border-white/[0.06]">
            {tt(a.badge, l)}
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">{tt(a.title, l)}</h1>
          <p class="text-base text-white/40 max-w-xl mx-auto leading-relaxed">{tt(a.subtitle, l)}</p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section class="py-16 bg-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-2 gap-8">
            <div class="card-hover rounded-2xl p-8 border border-gray-100">
              <div class="w-12 h-12 rounded-2xl bg-[#5DC4B3]/10 flex items-center justify-center mb-5">
                <i class="fas fa-bullseye text-[#5DC4B3] text-lg"></i>
              </div>
              <h3 class="text-lg font-extrabold text-[#1d1d1f] mb-3">{tt(a.missionTitle, l)}</h3>
              <p class="text-sm text-gray-500 leading-relaxed">{tt(a.missionDesc, l)}</p>
            </div>
            <div class="card-hover rounded-2xl p-8 border border-gray-100">
              <div class="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
                <i class="fas fa-eye text-indigo-500 text-lg"></i>
              </div>
              <h3 class="text-lg font-extrabold text-[#1d1d1f] mb-3">{tt(a.visionTitle, l)}</h3>
              <p class="text-sm text-gray-500 leading-relaxed">{tt(a.visionDesc, l)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Numbers */}
      <section class="py-14 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { num: '9', label: tt(a.stat1, l), suffix: tt(a.stat1Suffix, l) },
              { num: '5', label: tt(a.stat2, l), suffix: tt(a.stat2Suffix, l) },
              { num: '100', label: tt(a.stat3, l), suffix: tt(a.stat3Suffix, l) },
              { num: '∞', label: tt(a.stat4, l), suffix: '' },
            ].map(s => (
              <div class="text-center p-6 bg-white rounded-2xl border border-gray-100">
                <div class="text-3xl font-extrabold text-[#1d1d1f] tracking-tight">{s.num}<span class="text-[#5DC4B3] text-lg">{s.suffix}</span></div>
                <div class="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-xl font-extrabold text-[#1d1d1f] mb-10 text-center">{tt(a.milestonesTitle, l)}</h2>
          <div class="relative">
            <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5DC4B3] via-[#5DC4B3]/50 to-gray-200"></div>
            <div class="space-y-10">
              {[
                { year: tt(a.m1Year, l), title: tt(a.m1Title, l), desc: tt(a.m1Desc, l) },
                { year: tt(a.m2Year, l), title: tt(a.m2Title, l), desc: tt(a.m2Desc, l) },
                { year: tt(a.m3Year, l), title: tt(a.m3Title, l), desc: tt(a.m3Desc, l) },
              ].map((item) => (
                <div class="relative pl-16">
                  <div class="absolute left-[18px] top-1 w-3 h-3 rounded-full bg-[#5DC4B3] border-[3px] border-[#5DC4B3]/20"></div>
                  <span class="text-[#5DC4B3] text-xs font-bold">{item.year}</span>
                  <h4 class="text-sm font-bold text-[#1d1d1f] mt-1 mb-1">{item.title}</h4>
                  <p class="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-xl font-extrabold text-[#1d1d1f] mb-8 text-center">{tt(a.valuesTitle, l)}</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: 'fa-microscope', title: tt(a.v1Title, l), desc: tt(a.v1Desc, l) },
              { icon: 'fa-shield-alt', title: tt(a.v2Title, l), desc: tt(a.v2Desc, l) },
              { icon: 'fa-users', title: tt(a.v3Title, l), desc: tt(a.v3Desc, l) },
              { icon: 'fa-infinity', title: tt(a.v4Title, l), desc: tt(a.v4Desc, l) },
            ].map((v) => (
              <div class="text-center p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all">
                <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#5DC4B3]/10 flex items-center justify-center">
                  <i class={`fas ${v.icon} text-[#5DC4B3] text-lg`}></i>
                </div>
                <h4 class="text-sm font-bold text-[#1d1d1f] mb-1">{v.title}</h4>
                <p class="text-xs text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={l} />
    </div>
  )
}
