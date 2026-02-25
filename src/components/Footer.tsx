import type { FC } from 'hono/jsx'

const TEAL = '#5DC4B3'

export const Footer: FC = () => {
  return (
    <footer id="about" class="bg-gray-900 text-gray-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 220 78" height="36" xmlns="http://www.w3.org/2000/svg" aria-label="Micro Connect 滴灌通">
                <text x="0" y="27" font-family="'Inter','Futura','Helvetica Neue',Arial,sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">MICR</text>
                <circle cx="103" cy="18" r="10" fill={TEAL} />
                <text x="0" y="55" font-family="'Inter','Futura','Helvetica Neue',Arial,sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">C</text>
                <circle cx="33" cy="46" r="10" fill={TEAL} />
                <text x="46" y="55" font-family="'Inter','Futura','Helvetica Neue',Arial,sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">NNECT</text>
                <text x="0" y="74" font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif" font-size="14" font-weight="700" fill="#9CA3AF">滴灌通</text>
              </svg>
            </div>
            <p class="text-sm text-[#86868b] leading-relaxed max-w-md">
              滴灌通是全球领先的收入分成融资(RBF)平台，通过AI超级Agent矩阵，为中小企业提供高效、透明、灵活的融资解决方案。
            </p>
            <div class="flex gap-3 mt-4">
              <a href="#" class={`w-9 h-9 rounded-xl bg-gray-800 hover:bg-[${TEAL}] flex items-center justify-center transition-colors no-underline`}>
                <i class="fab fa-linkedin-in text-sm text-[#86868b] hover:text-white"></i>
              </a>
              <a href="#" class={`w-9 h-9 rounded-xl bg-gray-800 hover:bg-[${TEAL}] flex items-center justify-center transition-colors no-underline`}>
                <i class="fab fa-twitter text-sm text-[#86868b] hover:text-white"></i>
              </a>
              <a href="#" class={`w-9 h-9 rounded-xl bg-gray-800 hover:bg-[${TEAL}] flex items-center justify-center transition-colors no-underline`}>
                <i class="fab fa-weixin text-sm text-[#86868b] hover:text-white"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 class="text-sm font-semibold text-white mb-4">快速链接</h4>
            <ul class="space-y-2 list-none p-0">
              <li><a href="/design" class="text-sm text-[#86868b] hover:text-[#5DC4B3] transition-colors no-underline">设计思路</a></li>
              <li><a href="/portal" class="text-sm text-[#86868b] hover:text-[#5DC4B3] transition-colors no-underline">产品入口</a></li>
              <li><a href="#" class="text-sm text-[#86868b] hover:text-[#5DC4B3] transition-colors no-underline">帮助文档</a></li>
              <li><a href="#" class="text-sm text-[#86868b] hover:text-[#5DC4B3] transition-colors no-underline">API文档</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 class="text-sm font-semibold text-white mb-4">联系我们</h4>
            <ul class="space-y-2 list-none p-0">
              <li class="flex items-center gap-2 text-sm text-[#86868b]">
                <i class="fas fa-envelope text-xs text-[#86868b]"></i>
                contact@microconnect.com
              </li>
              <li class="flex items-center gap-2 text-sm text-[#86868b]">
                <i class="fas fa-phone text-xs text-[#86868b]"></i>
                +852 1234 5678
              </li>
              <li class="flex items-center gap-2 text-sm text-[#86868b]">
                <i class="fas fa-map-marker-alt text-xs text-[#86868b]"></i>
                Hong Kong, China
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-[#86868b]">Micro Connect Group &copy; 2026. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="text-xs text-[#64748b] hover:text-[#5DC4B3] transition-colors no-underline">隐私政策</a>
            <a href="#" class="text-xs text-[#64748b] hover:text-[#5DC4B3] transition-colors no-underline">服务条款</a>
            <a href="#" class="text-xs text-[#64748b] hover:text-[#5DC4B3] transition-colors no-underline">Cookie设置</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
