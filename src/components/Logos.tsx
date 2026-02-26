/**
 * ===================================================================
 * Logos.tsx -- SVG品牌Logo & 产品Logo组件 (V20)
 * ===================================================================
 *
 * 本文件定义所有Logo相关的SVG组件，纯代码渲染(不依赖外部图片)。
 * 这样做的好处：加载速度快、可动态调色、任意缩放不失真。
 *
 * --- 组件列表 ---
 *
 * GradDefs     — SVG渐变定义(内部复用)
 * DualCircle   — 双圆叠合标识(内部复用)
 * BrandLogo    — 主品牌Logo (Navbar/Hero/Footer使用)
 * ProductLogo  — 产品Logo大尺寸 (PlaceholderPage/DesignPage使用)
 * ProductLogoSmall — 产品Logo小尺寸 (HomePage/PortalPage卡片使用)
 *
 * --- 品牌色系 ---
 * B  = #2EC4B6 (亮绿)  — Logo主色
 * B2 = #3DD8CA (浅绿)  — Logo渐变终点
 * D  = #28A696 (深绿)  — Logo渐变起点
 * BK = #1d1d1f (近黑)  — 文字色
 *
 * --- 双圆设计说明 ---
 * 两个圆形部分重叠，各使用一个渐变填充。
 * 底圆(D→B)透明度0.85，顶圆(B→B2)不透明。
 * 视觉上营造"连接"、"交汇"的品牌意象。
 */
import type { FC } from 'hono/jsx'

/** 品牌色常量 — 全局Logo色系 */
const B = '#2EC4B6', B2 = '#3DD8CA', D = '#28A696', BK = '#1d1d1f'

/**
 * SVG公共渐变定义
 * 每个使用GradDefs的Logo都需要传入唯一的prefix，避免ID冲突
 * 生成两个渐变: {prefix}-t(顶圆) 和 {prefix}-b(底圆)
 */
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

/** 双圆叠合标识 — 两个圆形部分重叠，底圆半透明，顶圆不透明，构成品牌标识 */
const DualCircle: FC<{ prefix: string; cx1: number; cy1: number; cx2: number; cy2: number; r: number }> = ({ prefix: p, cx1, cy1, cx2, cy2, r }) => (
  <>
    <circle cx={cx1} cy={cy1} r={r} fill={`url(#${p}-b)`} opacity="0.85" />
    <circle cx={cx2} cy={cy2} r={r} fill={`url(#${p}-t)`} />
  </>
)

/**
 * 主品牌Logo — “MICRO CONNECT 滴灘通”
 * 在Navbar、Hero、Footer等处使用
 * @param height - 高度(px)，默认44
 * @param variant - 'dark'(深色文字，白色背景) 或 'light'(白色文字，深色背景)
 */
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

/**
 * 产品Logo—大尺寸版
 * 包含: 双圆标识 + 英文简称(IDENTITY CONNECT) + 中文名 + 装饰线
 * 用于PlaceholderPage的产品详情头部和DesignPage的产品卡片
 * @param name - 中文产品名(如 "身份通")
 * @param englishShort - 英文简称(如 "Identity")，用于动态计算SVG宽度
 * @param size - 尺寸(px)，默认80
 */
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

/**
 * 产品Logo—小尺寸版
 * 只显示中文名的第一个字 + 双圆标识(右上角) + 装饰圆点
 * 用于HomePage叙事卡片、PortalPage产品列表、DesignPage架构网格
 * @param name - 中文产品名，取第一个字符显示
 * @param englishShort - 英文简称，用于生成唯一渐变ID前缀
 * @param size - 尺寸(px)，默认48
 */
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
