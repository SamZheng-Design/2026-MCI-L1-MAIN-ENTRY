import type { FC } from 'hono/jsx'
import { BrandLogo } from './Logos'
import type { Lang } from '../i18n'
import { tt, t, langLink } from '../i18n'

export const Footer: FC<{ lang?: Lang }> = ({ lang = 'zh' }) => {
  const l = lang
  const ll = (href: string) => langLink(href, l)

  return (
    <footer class="aurora-footer text-gray-300">
      {/* Main footer content */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <BrandLogo height={32} variant="light" />
            </div>
            <p class="text-[13px] text-white/25 leading-relaxed max-w-md mb-6">
              {tt(t.footer.brandDesc, l)}
            </p>
            <div class="flex gap-2.5">
              {[
                { icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
                { icon: 'fab fa-twitter', label: 'Twitter' },
                { icon: 'fab fa-weixin', label: 'WeChat' },
                { icon: 'fab fa-github', label: 'GitHub' },
              ].map(s => (
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
              <li><a href={ll('/design')} class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">{tt(t.footer.designPhilosophy, l)}</a></li>
              <li><a href={ll('/portal')} class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">{tt(t.footer.productPortal, l)}</a></li>
              <li><a href="#" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">{tt(t.footer.apiDocs, l)}</a></li>
              <li><a href="#" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">{tt(t.footer.devCenter, l)}</a></li>
              <li><a href="#" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">{tt(t.footer.helpCenter, l)}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 class="text-[11px] font-semibold text-white/60 uppercase tracking-[0.15em] mb-5">{tt(t.footer.sectionCompany, l)}</h4>
            <ul class="space-y-3 list-none p-0">
              <li><a href={ll('/about')} class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">{tt(t.footer.aboutUs, l)}</a></li>
              <li><a href={ll('/team')} class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">{tt(t.footer.coreTeam, l)}</a></li>
              <li><a href={ll('/news')} class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">{tt(t.footer.newsInsights, l)}</a></li>
              <li><a href="#" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">{tt(t.footer.investorRelations, l)}</a></li>
              <li><a href={ll('/contact')} class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">{tt(t.footer.contactUs, l)}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 class="text-[11px] font-semibold text-white/60 uppercase tracking-[0.15em] mb-5">{tt(t.footer.sectionContact, l)}</h4>
            <ul class="space-y-3 list-none p-0">
              <li class="flex items-center gap-2.5 text-[13px] text-white/30">
                <i class="fas fa-envelope text-[10px] text-white/15 w-4 text-center"></i>
                info@microconnect.com
              </li>
              <li class="flex items-center gap-2.5 text-[13px] text-white/30">
                <i class="fas fa-phone text-[10px] text-white/15 w-4 text-center"></i>
                +852 2668 0268
              </li>
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
          <p class="text-[10px] text-white/12 leading-relaxed max-w-4xl">
            <i class="fas fa-shield-alt mr-1"></i>
            {tt(t.footer.disclaimer, l)}
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div class="border-t border-white/[0.04]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-[11px] text-white/15">
              &copy; 2026 Micro Connect Group. All rights reserved.
            </p>
            <div class="flex flex-wrap items-center gap-4">
              {[
                tt(t.footer.privacyPolicy, l),
                tt(t.footer.termsOfService, l),
                tt(t.footer.cookieSettings, l),
                tt(t.footer.compliance, l)
              ].map((item, i) => (
                <>
                  {i > 0 && <span class="text-white/8">|</span>}
                  <a href="#" class="text-[11px] text-white/15 hover:text-white/30 transition-colors no-underline">{item}</a>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
