import type { FC } from 'hono/jsx'

export const Footer: FC = () => {
  return (
    <footer id="about" class="bg-gray-900 text-gray-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <svg viewBox="0 0 160 50" width="120" height="36" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="18" font-family="Inter,'Helvetica Neue',Arial,sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" letter-spacing="-0.3">MICRO</text>
                <circle cx="75" cy="10" r="4.5" fill="#4ECDC4" />
                <text x="0" y="38" font-family="Inter,'Helvetica Neue',Arial,sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" letter-spacing="-0.3">CONNECT</text>
                <text x="105" y="38" font-family="'Noto Sans SC','PingFang SC',sans-serif" font-size="14" font-weight="500" fill="#9CA3AF">滴灌通</text>
              </svg>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed max-w-md">
              滴灌通是全球领先的收入分成融资(RBF)平台，通过AI超级Agent矩阵，为中小企业提供高效、透明、灵活的融资解决方案。
            </p>
            <div class="flex gap-3 mt-4">
              <a href="#" class="w-9 h-9 rounded-lg bg-gray-800 hover:bg-[#4ECDC4] flex items-center justify-center transition-colors no-underline">
                <i class="fab fa-linkedin-in text-sm text-gray-400 hover:text-white"></i>
              </a>
              <a href="#" class="w-9 h-9 rounded-lg bg-gray-800 hover:bg-[#4ECDC4] flex items-center justify-center transition-colors no-underline">
                <i class="fab fa-twitter text-sm text-gray-400 hover:text-white"></i>
              </a>
              <a href="#" class="w-9 h-9 rounded-lg bg-gray-800 hover:bg-[#4ECDC4] flex items-center justify-center transition-colors no-underline">
                <i class="fab fa-weixin text-sm text-gray-400 hover:text-white"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 class="text-sm font-semibold text-white mb-4">快速链接</h4>
            <ul class="space-y-2 list-none p-0">
              <li><a href="/design" class="text-sm text-gray-400 hover:text-[#4ECDC4] transition-colors no-underline">设计思路</a></li>
              <li><a href="/portal" class="text-sm text-gray-400 hover:text-[#4ECDC4] transition-colors no-underline">产品入口</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-[#4ECDC4] transition-colors no-underline">帮助文档</a></li>
              <li><a href="#" class="text-sm text-gray-400 hover:text-[#4ECDC4] transition-colors no-underline">API文档</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 class="text-sm font-semibold text-white mb-4">联系我们</h4>
            <ul class="space-y-2 list-none p-0">
              <li class="flex items-center gap-2 text-sm text-gray-400">
                <i class="fas fa-envelope text-xs text-gray-500"></i>
                contact@microconnect.com
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-400">
                <i class="fas fa-phone text-xs text-gray-500"></i>
                +852 1234 5678
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-400">
                <i class="fas fa-map-marker-alt text-xs text-gray-500"></i>
                Hong Kong, China
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div class="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-gray-500">Micro Connect Group &copy; 2026. All rights reserved.</p>
          <div class="flex gap-4">
            <a href="#" class="text-xs text-gray-500 hover:text-[#4ECDC4] transition-colors no-underline">隐私政策</a>
            <a href="#" class="text-xs text-gray-500 hover:text-[#4ECDC4] transition-colors no-underline">服务条款</a>
            <a href="#" class="text-xs text-gray-500 hover:text-[#4ECDC4] transition-colors no-underline">Cookie设置</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
