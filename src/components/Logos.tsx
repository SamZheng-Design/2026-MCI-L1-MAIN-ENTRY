import type { FC } from 'hono/jsx'

// 品牌色系
const B = '#2EC4B6', B2 = '#3DD8CA', D = '#28A696', BK = '#1d1d1f'

/** 公共渐变 defs */
const GradDefs: FC<{ prefix: string }> = ({ prefix: p }) => (
  <defs>
    <linearGradient id={`${p}-t`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color={B} /><stop offset="100%" stop-color={B2} />
    </linearGradient>
    <linearGradient id={`${p}-b`} x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color={D} /><stop offset="100%" stop-color={B} />
    </linearGradient>
  </defs>
)

/** 双圆叠合标识 */
const DualCircle: FC<{ prefix: string; cx1: number; cy1: number; cx2: number; cy2: number; r: number }> = ({ prefix: p, cx1, cy1, cx2, cy2, r }) => (
  <>
    <circle cx={cx1} cy={cy1} r={r} fill={`url(#${p}-b)`} opacity="0.85" />
    <circle cx={cx2} cy={cy2} r={r} fill={`url(#${p}-t)`} />
  </>
)

// ═══ 主品牌 Logo ═══
export const BrandLogo: FC<{ height?: number; variant?: 'dark' | 'light' }> = ({ height = 44, variant = 'dark' }) => {
  const tc = variant === 'light' ? '#FFF' : BK
  const sc = variant === 'light' ? 'rgba(255,255,255,0.6)' : '#6e6e73'
  const p = `bl-${variant}`
  return (
    <svg viewBox="0 0 280 72" height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Micro Connect 滴灌通">
      <GradDefs prefix={p} />
      <DualCircle prefix={p} cx1={16} cy1={24} cx2={20} cy2={16} r={14} />
      <text x="42" y="22" font-family="'Montserrat','Inter','Futura','Helvetica Neue',Arial,sans-serif" font-size="16" font-weight="900" fill={tc} letter-spacing="0.8">MICRO CONNECT</text>
      <text x="42" y="42" font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif" font-size="14" font-weight="700" fill={tc}>滴灌通</text>
      <text x="42" y="62" font-family="'Montserrat','Inter',sans-serif" font-size="7" font-weight="500" fill={sc} letter-spacing="1.4">POWERED BY MICRO CONNECT GROUP</text>
    </svg>
  )
}

// ═══ 产品Logo — 大尺寸 (PlaceholderPage, DesignPage) ═══
export const ProductLogo: FC<{ name: string; englishShort: string; size?: number; className?: string }> = ({ name, englishShort, size = 80, className = '' }) => {
  const en = englishShort.toUpperCase()
  const vw = Math.max(200, en.length * 18 + 20)
  const p = `pl-${englishShort}`
  return (
    <div class={`inline-flex items-center justify-center flex-shrink-0 ${className}`} style={`width:${size}px;height:${size}px;`}>
      <svg viewBox={`0 0 ${vw} 200`} width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <GradDefs prefix={p} />
        <rect width={vw} height="200" rx="16" fill="#FFF" stroke="#E5E7EB" stroke-width="1.5" />
        <DualCircle prefix={p} cx1={vw/2 - 8} cy1={42} cx2={vw/2 + 2} cy2={34} r={16} />
        <text x={vw/2} y="90" text-anchor="middle" font-family="'Montserrat','Inter','Futura',sans-serif" font-size="14" font-weight="900" fill={BK} letter-spacing="0.8">{en}</text>
        <text x={vw/2} y="108" text-anchor="middle" font-family="'Montserrat','Inter','Futura',sans-serif" font-size="10" font-weight="700" fill="#86868b" letter-spacing="0.6">CONNECT</text>
        <text x={vw/2} y="150" text-anchor="middle" font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif" font-size="36" font-weight="700" fill={BK}>{name}</text>
        <rect x={vw/2 - 30} y="165" width="60" height="2.5" rx="1.25" fill={B} />
      </svg>
    </div>
  )
}

// ═══ 产品Logo — 小尺寸 (HomePage, PortalPage, DesignPage) ═══
export const ProductLogoSmall: FC<{ name: string; englishShort: string; size?: number }> = ({ name, englishShort, size = 48 }) => {
  const p = `ps-${englishShort}`
  return (
    <div class="inline-flex items-center justify-center flex-shrink-0" style={`width:${size}px;height:${size}px;`}>
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <GradDefs prefix={p} />
        <rect width="100" height="100" rx="14" fill="#FFF" stroke="#E5E7EB" stroke-width="1.5" />
        <DualCircle prefix={p} cx1={72} cy1={26} cx2={78} cy2={20} r={11} />
        <text x="42" y="62" text-anchor="middle" dominant-baseline="middle" font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif" font-size="34" font-weight="700" fill={BK}>{name.charAt(0)}</text>
        <circle cx="24" cy="82" r="4" fill={B} opacity="0.35" />
      </svg>
    </div>
  )
}
