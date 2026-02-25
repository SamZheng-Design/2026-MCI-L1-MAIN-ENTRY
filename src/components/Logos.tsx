import type { FC } from 'hono/jsx'

/*
 * 滴灌通 Micro Connect — 品牌设计规范（Contract Connect 视觉系统）
 * 
 * 核心品牌元素：
 * 1. 双圆叠合Logo — 上层 #2EC4B6→#3DD8CA 渐变，下层 #28A696→#2EC4B6 渐变
 * 2. Montserrat 900 品牌字体
 * 3. 品牌主色系：#5DC4B3（按钮/卡片），#2EC4B6（Logo专用）
 * 4. 文字色 #1d1d1f（禁止纯黑 #000000）
 */

const TEAL = '#5DC4B3'
const BLACK = '#1d1d1f'

// Logo专用渐变色
const LOGO_GREEN_BRIGHT = '#2EC4B6'
const LOGO_GREEN_BRIGHT2 = '#3DD8CA'
const LOGO_GREEN_DEEP = '#28A696'

// ============================================
// 主品牌 Logo: 双圆叠合 + MICRO CONNECT + 滴灌通
// Contract Connect Design System — Dual Circle Logo
// ============================================
export const BrandLogo: FC<{ height?: number; variant?: 'dark' | 'light' }> = ({ height = 44, variant = 'dark' }) => {
  const textColor = variant === 'light' ? '#FFFFFF' : BLACK
  const subColor = variant === 'light' ? 'rgba(255,255,255,0.6)' : '#6e6e73'
  
  // 按高度比例计算尺寸
  const scale = height / 44
  
  return (
    <svg viewBox="0 0 280 72" height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Micro Connect 滴灌通">
      <defs>
        <linearGradient id={`logo-top-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color={LOGO_GREEN_BRIGHT} />
          <stop offset="100%" stop-color={LOGO_GREEN_BRIGHT2} />
        </linearGradient>
        <linearGradient id={`logo-bottom-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color={LOGO_GREEN_DEEP} />
          <stop offset="100%" stop-color={LOGO_GREEN_BRIGHT} />
        </linearGradient>
      </defs>
      
      {/* Dual circle logo — bottom circle (slightly offset down-left) */}
      <circle cx="16" cy="24" r="14" fill={`url(#logo-bottom-${variant})`} opacity="0.85" />
      {/* Dual circle logo — top circle */}
      <circle cx="20" cy="16" r="14" fill={`url(#logo-top-${variant})`} />
      
      {/* Brand text — Montserrat 900 */}
      <text x="42" y="22" font-family="'Montserrat','Inter','Futura','Helvetica Neue',Arial,sans-serif" font-size="16" font-weight="900" fill={textColor} letter-spacing="0.8">MICRO CONNECT</text>
      
      {/* Chinese name */}
      <text x="42" y="42" font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif" font-size="14" font-weight="700" fill={textColor}>滴灌通</text>
      
      {/* Powered by line */}
      <text x="42" y="62" font-family="'Montserrat','Inter',sans-serif" font-size="7" font-weight="500" fill={subColor} letter-spacing="1.4">POWERED BY MICRO CONNECT GROUP</text>
    </svg>
  )
}

// ============================================
// 9个"通"产品Logo — Contract Connect 双圆设计语言
// 
// 设计逻辑：
// - 双圆叠合渐变Logo（品牌DNA）
// - 产品英文名 + C●NNECT 后缀
// - 中文名（粗体）
// - 底部品牌色细线
// ============================================

// 产品Logo - 大尺寸 (用于Portal页面卡片和Placeholder页面)
export const ProductLogo: FC<{
  name: string       // 中文名：身份通
  englishShort: string  // 英文短名：Identity
  size?: number
  className?: string
}> = ({ name, englishShort, size = 80, className = '' }) => {
  const enUpper = englishShort.toUpperCase()
  const vw = Math.max(200, enUpper.length * 18 + 20)
  
  return (
    <div
      class={`inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={`width:${size}px;height:${size}px;`}
    >
      <svg viewBox={`0 0 ${vw} 200`} width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`pl-top-${englishShort}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color={LOGO_GREEN_BRIGHT} />
            <stop offset="100%" stop-color={LOGO_GREEN_BRIGHT2} />
          </linearGradient>
          <linearGradient id={`pl-btm-${englishShort}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color={LOGO_GREEN_DEEP} />
            <stop offset="100%" stop-color={LOGO_GREEN_BRIGHT} />
          </linearGradient>
        </defs>
        
        {/* 白色背景 + 细边框 */}
        <rect width={vw} height="200" rx="16" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.5" />
        
        {/* 双圆叠合Logo — 左上角品牌标识 */}
        <circle cx={vw/2 - 8} cy="42" r="16" fill={`url(#pl-btm-${englishShort})`} opacity="0.85" />
        <circle cx={vw/2 + 2} cy="34" r="16" fill={`url(#pl-top-${englishShort})`} />
        
        {/* 英文名 — Montserrat */}
        <text x={vw/2} y="90" text-anchor="middle" font-family="'Montserrat','Inter','Futura',sans-serif" font-size="14" font-weight="900" fill={BLACK} letter-spacing="0.8">{enUpper}</text>
        
        {/* CONNECT 后缀 */}
        <text x={vw/2} y="108" text-anchor="middle" font-family="'Montserrat','Inter','Futura',sans-serif" font-size="10" font-weight="700" fill="#86868b" letter-spacing="0.6">CONNECT</text>
        
        {/* 中文名 */}
        <text x={vw/2} y="150" text-anchor="middle" font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif" font-size="36" font-weight="700" fill={BLACK}>{name}</text>
        
        {/* 底部品牌色细线 */}
        <rect x={vw/2 - 30} y="165" width="60" height="2.5" rx="1.25" fill={LOGO_GREEN_BRIGHT} />
      </svg>
    </div>
  )
}

// 产品Logo - 小尺寸 (用于架构总览卡片) — 双圆叠合设计
export const ProductLogoSmall: FC<{
  name: string
  englishShort: string
  size?: number
}> = ({ name, englishShort, size = 48 }) => {
  const firstChar = name.charAt(0)
  
  return (
    <div
      class="inline-flex items-center justify-center flex-shrink-0"
      style={`width:${size}px;height:${size}px;`}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`ps-top-${englishShort}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color={LOGO_GREEN_BRIGHT} />
            <stop offset="100%" stop-color={LOGO_GREEN_BRIGHT2} />
          </linearGradient>
          <linearGradient id={`ps-btm-${englishShort}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color={LOGO_GREEN_DEEP} />
            <stop offset="100%" stop-color={LOGO_GREEN_BRIGHT} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="14" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.5" />
        {/* 双圆叠合标识 */}
        <circle cx="72" cy="26" r="11" fill={`url(#ps-btm-${englishShort})`} opacity="0.85" />
        <circle cx="78" cy="20" r="11" fill={`url(#ps-top-${englishShort})`} />
        {/* 中文首字 */}
        <text x="42" y="62" text-anchor="middle" dominant-baseline="middle" font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif" font-size="34" font-weight="700" fill={BLACK}>{firstChar}</text>
        {/* 底部小装饰圆 */}
        <circle cx="24" cy="82" r="4" fill={LOGO_GREEN_BRIGHT} opacity="0.35" />
      </svg>
    </div>
  )
}

// 产品Logo - 流程图尺寸 (用于Y型流程图) — 双圆叠合设计
export const ProductLogoFlow: FC<{
  name: string
  englishShort: string
  size?: number
}> = ({ name, englishShort, size = 40 }) => {
  const firstChar = name.charAt(0)
  
  return (
    <div
      class="inline-flex items-center justify-center flex-shrink-0"
      style={`width:${size}px;height:${size}px;`}
    >
      <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`pf-top-${englishShort}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color={LOGO_GREEN_BRIGHT} />
            <stop offset="100%" stop-color={LOGO_GREEN_BRIGHT2} />
          </linearGradient>
          <linearGradient id={`pf-btm-${englishShort}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color={LOGO_GREEN_DEEP} />
            <stop offset="100%" stop-color={LOGO_GREEN_BRIGHT} />
          </linearGradient>
        </defs>
        <rect width="80" height="80" rx="12" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.5" />
        {/* 双圆叠合标识 */}
        <circle cx="58" cy="22" r="9" fill={`url(#pf-btm-${englishShort})`} opacity="0.85" />
        <circle cx="63" cy="16" r="9" fill={`url(#pf-top-${englishShort})`} />
        {/* 中文首字 */}
        <text x="36" y="50" text-anchor="middle" dominant-baseline="middle" font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif" font-size="28" font-weight="700" fill={BLACK}>{firstChar}</text>
      </svg>
    </div>
  )
}
