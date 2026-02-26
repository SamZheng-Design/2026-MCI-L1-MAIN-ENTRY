/**
 * ===================================================================
 * ContactPage.tsx -- 联系我们页面 (V20)
 * ===================================================================
 *
 * 提供投资者和融资企业两个独立的联系入口。
 *
 * --- 页面结构 ---
 * 1. Hero — Aurora深色背景 + 标题
 * 2. Contact Cards — 两栏卡片
 *    - 投资者咨询: investor@microconnect.com / 预约演示
 *    - 融资企业咨询: business@microconnect.com / 提交申请
 * 3. Info Grid — 三栏信息
 *    - 一般查询: info@microconnect.com
 *    - 办公地址: 香港中环交易广场
 *    - 工作时间: 周一至周五 9:00-18:00 HKT
 * 4. Social Links — LinkedIn / Twitter / WeChat
 */
import type { FC } from 'hono/jsx'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import type { Lang } from '../i18n'
import { tt, t, langLink } from '../i18n'

export const ContactPage: FC<{ lang?: Lang }> = ({ lang = 'zh' }) => {
  const l = lang
  const ll = (href: string) => langLink(href, l)
  const c = t.contact

  return (
    <div class="min-h-screen">
      <Navbar active="contact" lang={l} />

      {/* Hero */}
      <section class="aurora-bg noise-overlay relative overflow-hidden pt-20 pb-16">
        <div class="hero-grid-overlay"></div>
        <div class="max-w-4xl mx-auto px-4 relative text-center fade-in" style="z-index: 10;">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.04] text-white/50 text-xs font-semibold rounded-full mb-5 border border-white/[0.06]">
            {tt(c.badge, l)}
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">{tt(c.title, l)}</h1>
          <p class="text-base text-white/40 max-w-xl mx-auto">{tt(c.subtitle, l)}</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section class="py-16 bg-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-2 gap-8 mb-14">
            {/* Investor inquiry */}
            <div class="rounded-2xl border-2 border-gray-100 p-8 hover:border-indigo-200 hover:shadow-xl transition-all group bg-gradient-to-br from-white to-indigo-50/20">
              <div class="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <i class="fas fa-chart-pie text-indigo-500 text-xl"></i>
              </div>
              <h3 class="text-lg font-extrabold text-[#1d1d1f] mb-2">{tt(c.investorTitle, l)}</h3>
              <p class="text-sm text-gray-500 leading-relaxed mb-5">{tt(c.investorDesc, l)}</p>
              <div class="space-y-3">
                <div class="flex items-center gap-3 text-sm text-gray-600">
                  <i class="fas fa-envelope text-indigo-400 text-xs w-5 text-center"></i>
                  <span>investor@microconnect.com</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-600">
                  <i class="fas fa-phone text-indigo-400 text-xs w-5 text-center"></i>
                  <span>+852 2668 0268</span>
                </div>
              </div>
              <div class="mt-6">
                <a href="#" class="inline-flex items-center px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-all no-underline shadow-sm">
                  <i class="fas fa-calendar-alt mr-2 text-xs"></i>{tt(c.investorCta, l)}
                </a>
              </div>
            </div>

            {/* Business inquiry */}
            <div class="rounded-2xl border-2 border-gray-100 p-8 hover:border-amber-200 hover:shadow-xl transition-all group bg-gradient-to-br from-white to-amber-50/20">
              <div class="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <i class="fas fa-store text-amber-500 text-xl"></i>
              </div>
              <h3 class="text-lg font-extrabold text-[#1d1d1f] mb-2">{tt(c.businessTitle, l)}</h3>
              <p class="text-sm text-gray-500 leading-relaxed mb-5">{tt(c.businessDesc, l)}</p>
              <div class="space-y-3">
                <div class="flex items-center gap-3 text-sm text-gray-600">
                  <i class="fas fa-envelope text-amber-400 text-xs w-5 text-center"></i>
                  <span>business@microconnect.com</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-600">
                  <i class="fas fa-phone text-amber-400 text-xs w-5 text-center"></i>
                  <span>+852 2668 0268</span>
                </div>
              </div>
              <div class="mt-6">
                <a href="#" class="inline-flex items-center px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-all no-underline shadow-sm">
                  <i class="fas fa-file-alt mr-2 text-xs"></i>{tt(c.businessCta, l)}
                </a>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all">
              <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                <i class="fas fa-envelope text-[#5DC4B3] text-lg"></i>
              </div>
              <h4 class="text-sm font-bold text-[#1d1d1f] mb-1">{tt(c.generalTitle, l)}</h4>
              <p class="text-xs text-gray-500">info@microconnect.com</p>
            </div>
            <div class="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all">
              <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                <i class="fas fa-map-marker-alt text-[#5DC4B3] text-lg"></i>
              </div>
              <h4 class="text-sm font-bold text-[#1d1d1f] mb-1">{tt(c.addressTitle, l)}</h4>
              <p class="text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: tt(c.address, l).replace('\n', '<br />') }}></p>
            </div>
            <div class="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all">
              <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                <i class="fas fa-clock text-[#5DC4B3] text-lg"></i>
              </div>
              <h4 class="text-sm font-bold text-[#1d1d1f] mb-1">{tt(c.hoursTitle, l)}</h4>
              <p class="text-xs text-gray-500" dangerouslySetInnerHTML={{ __html: tt(c.hours, l).replace('\n', '<br />') }}></p>
            </div>
          </div>
        </div>
      </section>

      {/* Social */}
      <section class="py-14 bg-gray-50">
        <div class="max-w-md mx-auto px-4 text-center">
          <h3 class="text-lg font-extrabold text-[#1d1d1f] mb-6">{tt(c.socialTitle, l)}</h3>
          <div class="flex items-center justify-center gap-4">
            {[
              { icon: 'fab fa-linkedin-in', label: 'LinkedIn', color: 'hover:bg-blue-600' },
              { icon: 'fab fa-twitter', label: 'Twitter', color: 'hover:bg-sky-500' },
              { icon: 'fab fa-weixin', label: 'WeChat', color: 'hover:bg-green-500' },
            ].map((s) => (
              <a href="#" class={`w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 ${s.color} hover:text-white hover:border-transparent transition-all no-underline shadow-sm`} title={s.label} rel="noopener noreferrer" target="_blank">
                <i class={`${s.icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={l} />
    </div>
  )
}
