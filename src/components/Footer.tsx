import type { FC } from 'hono/jsx'
import { BrandLogo } from './Logos'

export const Footer: FC = () => {
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
              全球领先的收入分成融资(RBF)基础设施平台。通过9个AI超级Agent矩阵，为投资者和中小企业提供高效、透明、全生命周期的投融资解决方案。
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
            <h4 class="text-[11px] font-semibold text-white/60 uppercase tracking-[0.15em] mb-5">产品</h4>
            <ul class="space-y-3 list-none p-0">
              <li><a href="/design" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">设计思路</a></li>
              <li><a href="/portal" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">产品入口</a></li>
              <li><a href="#" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">API文档</a></li>
              <li><a href="#" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">开发者中心</a></li>
              <li><a href="#" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">帮助中心</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 class="text-[11px] font-semibold text-white/60 uppercase tracking-[0.15em] mb-5">公司</h4>
            <ul class="space-y-3 list-none p-0">
              <li><a href="/about" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">关于我们</a></li>
              <li><a href="/team" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">核心团队</a></li>
              <li><a href="/news" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">新闻动态</a></li>
              <li><a href="#" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">投资者关系</a></li>
              <li><a href="/contact" class="text-[13px] text-white/30 hover:text-[#5DC4B3] transition-colors no-underline">联系我们</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 class="text-[11px] font-semibold text-white/60 uppercase tracking-[0.15em] mb-5">联系方式</h4>
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
            免责声明：本平台所展示内容仅供信息参考，不构成任何投资建议、要约或邀约。收入分成融资产品具有投资风险，过往表现不代表未来收益。投资者应充分了解相关风险并在独立判断后自主决策。Micro Connect Group受相关司法管辖区金融监管机构监管。
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
              {['隐私政策','服务条款','Cookie设置','合规声明'].map((item, i) => (
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
