import type { FC } from 'hono/jsx'
import { BrandLogo } from './Logos'
import type { Lang } from '../i18n'
import { tt, t, langLink } from '../i18n'

export const Footer: FC<{ lang?: Lang }> = ({ lang = 'zh' }) => {
  const l = lang
  const ll = (h: string) => langLink(h, l)

  const socials = [
    { icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { icon: 'fab fa-twitter', label: 'Twitter' },
    { icon: 'fab fa-weixin', label: 'WeChat' },
    { icon: 'fab fa-github', label: 'GitHub' },
  ]
  const productLinks = [
    { href: ll('/design'), key: 'designPhilosophy' as const },
    { href: ll('/portal'), key: 'productPortal' as const },
    { href: '#', key: 'apiDocs' as const },
    { href: '#', key: 'devCenter' as const },
    { href: '#', key: 'helpCenter' as const },
  ]
  const companyLinks = [
    { href: ll('/about'), key: 'aboutUs' as const },
    { href: ll('/team'), key: 'coreTeam' as const },
    { href: ll('/news'), key: 'newsInsights' as const },
    { href: '#', key: 'investorRelations' as const },
    { href: ll('/contact'), key: 'contactUs' as const },
  ]

  const lk = "text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline"

  return (
    <footer class="aurora-footer text-gray-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-6"><BrandLogo height={32} variant="light" /></div>
            <p class="text-[13px] text-white/25 leading-relaxed max-w-md mb-6">{tt(t.footer.brandDesc, l)}</p>
            <div class="flex gap-2.5">
              {socials.map(s => (
                <a href="#" class="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-[#5DC4B3]/20 flex items-center justify-center transition-all no-underline group" title={s.label} rel="noopener noreferrer" target="_blank">
                  <i class={`${s.icon} text-[12px] text-white/25 group-hover:text-[#5DC4B3] transition-colors`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 class="text-[11px] font-semibold text-white/60 uppercase tracking-[0.15em] mb-5">{tt(t.footer.sectionProducts, l)}</h4>
            <ul class="space-y-3 list-none p-0">
              {productLinks.map(p => <li><a href={p.href} class={lk}>{tt((t.footer as any)[p.key], l)}</a></li>)}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 class="text-[11px] font-semibold text-white/60 uppercase tracking-[0.15em] mb-5">{tt(t.footer.sectionCompany, l)}</h4>
            <ul class="space-y-3 list-none p-0">
              {companyLinks.map(c => <li><a href={c.href} class={lk}>{tt((t.footer as any)[c.key], l)}</a></li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 class="text-[11px] font-semibold text-white/60 uppercase tracking-[0.15em] mb-5">{tt(t.footer.sectionContact, l)}</h4>
            <ul class="space-y-3 list-none p-0">
              {[
                { icon: 'fa-envelope', text: 'info@microconnect.com' },
                { icon: 'fa-phone', text: '+852 2668 0268' },
              ].map(c => (
                <li class="flex items-center gap-2.5 text-[13px] text-white/30">
                  <i class={`fas ${c.icon} text-[10px] text-white/15 w-4 text-center`}></i>{c.text}
                </li>
              ))}
              <li class="flex items-start gap-2.5 text-[13px] text-white/30">
                <i class="fas fa-map-marker-alt text-[10px] text-white/15 w-4 text-center mt-1"></i>
                <span>Hong Kong Central<br />Exchange Square, Tower 2</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Compliance */}
      <div class="border-t border-white/[0.04]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p class="text-[10px] text-white/12 leading-relaxed max-w-4xl"><i class="fas fa-shield-alt mr-1"></i>{tt(t.footer.disclaimer, l)}</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div class="border-t border-white/[0.04]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-[11px] text-white/15">&copy; 2026 Micro Connect Group. All rights reserved.</p>
            <div class="flex flex-wrap items-center gap-4">
              {[tt(t.footer.privacyPolicy, l), tt(t.footer.termsOfService, l), tt(t.footer.cookieSettings, l), tt(t.footer.compliance, l)].map((item, i) => (
                <>{i > 0 && <span class="text-white/8">|</span>}<a href="#" class="text-[11px] text-white/15 hover:text-white/30 transition-colors no-underline">{item}</a></>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
