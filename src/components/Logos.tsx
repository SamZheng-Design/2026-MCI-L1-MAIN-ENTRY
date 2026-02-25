import type { FC } from 'hono/jsx'

// Color mapping per group - following Micro Connect brand teal (#4ECDC4)
const groupColors: Record<string, string> = {
  '融资前端': '#4ECDC4',    // Teal - brand color
  '项目评估': '#6366F1',    // Indigo
  '投资决策': '#8B5CF6',    // Purple
  '投后管理': '#10B981',    // Emerald
}

// Product Logo Component - Micro Connect design language
// Bold type + signature colored circle accent
export const ProductLogo: FC<{
  name: string
  englishShort: string
  category: string
  size?: number
  className?: string
}> = ({ name, englishShort, category, size = 80, className = '' }) => {
  const accent = groupColors[category] || '#4ECDC4'
  
  return (
    <div
      class={`inline-flex items-center justify-center rounded-2xl bg-white border border-gray-100 overflow-hidden flex-shrink-0 ${className}`}
      style={`width:${size}px;height:${size}px;`}
    >
      <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect width="200" height="200" rx="24" fill="#FFFFFF" />
        {/* Signature Circle - Micro Connect brand element */}
        <circle cx="155" cy="40" r="24" fill={accent} opacity="0.85" />
        {/* Small decorative dot */}
        <circle cx="50" cy="165" r="9" fill={accent} opacity="0.25" />
        {/* Chinese Name */}
        <text
          x="100" y="100"
          text-anchor="middle"
          dominant-baseline="middle"
          font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei','Hiragino Sans GB',sans-serif"
          font-size="46"
          font-weight="700"
          fill="#1A1A1A"
        >{name}</text>
        {/* English subtitle */}
        <text
          x="100" y="140"
          text-anchor="middle"
          font-family="Inter,'Helvetica Neue',Arial,sans-serif"
          font-size="16"
          font-weight="500"
          fill="#999999"
          letter-spacing="1.5"
        >{englishShort.toUpperCase()}</text>
        {/* Accent underline */}
        <rect x="60" y="155" width="80" height="3" rx="1.5" fill={accent} opacity="0.5" />
      </svg>
    </div>
  )
}

// Small version for architecture cards
export const ProductLogoSmall: FC<{
  name: string
  englishShort: string
  category: string
  size?: number
}> = ({ name, englishShort, category, size = 48 }) => {
  const accent = groupColors[category] || '#4ECDC4'
  const char = name.charAt(0) // First Chinese char
  
  return (
    <div
      class="inline-flex items-center justify-center rounded-xl overflow-hidden flex-shrink-0"
      style={`width:${size}px;height:${size}px;background:linear-gradient(135deg, ${accent}15, ${accent}30);border:1.5px solid ${accent}40;`}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        {/* Circle accent */}
        <circle cx="78" cy="20" r="12" fill={accent} opacity="0.7" />
        {/* Chinese char */}
        <text
          x="44" y="58"
          text-anchor="middle"
          dominant-baseline="middle"
          font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif"
          font-size="30"
          font-weight="700"
          fill="#1A1A1A"
        >{char}</text>
        {/* Dot */}
        <circle cx="22" cy="82" r="5" fill={accent} opacity="0.3" />
      </svg>
    </div>
  )
}

// Flow diagram logo - medium size for Y-shape flow
export const ProductLogoFlow: FC<{
  name: string
  englishShort: string
  category: string
  size?: number
}> = ({ name, englishShort, category, size = 40 }) => {
  const accent = groupColors[category] || '#4ECDC4'
  
  return (
    <div
      class="inline-flex items-center justify-center rounded-lg overflow-hidden flex-shrink-0"
      style={`width:${size}px;height:${size}px;background:linear-gradient(135deg, ${accent}20, ${accent}35);border:1px solid ${accent}50;`}
    >
      <svg viewBox="0 0 80 80" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <circle cx="62" cy="16" r="9" fill={accent} opacity="0.75" />
        <text
          x="36" y="48"
          text-anchor="middle"
          dominant-baseline="middle"
          font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif"
          font-size="26"
          font-weight="700"
          fill="#1A1A1A"
        >{name.charAt(0)}</text>
      </svg>
    </div>
  )
}

// Micro Connect main brand logo
export const BrandLogo: FC<{ height?: number }> = ({ height = 40 }) => {
  return (
    <div class="flex items-center gap-3">
      <svg viewBox="0 0 280 90" height={height} xmlns="http://www.w3.org/2000/svg">
        {/* MICRO */}
        <text
          x="0" y="32"
          font-family="Inter,'Helvetica Neue',Arial,sans-serif"
          font-size="28"
          font-weight="800"
          fill="#1A1A1A"
          letter-spacing="-0.3"
        >MICRO</text>
        {/* Teal circle on the O */}
        <circle cx="131" cy="18" r="8" fill="#4ECDC4" />
        {/* CONNECT */}
        <text
          x="0" y="62"
          font-family="Inter,'Helvetica Neue',Arial,sans-serif"
          font-size="28"
          font-weight="800"
          fill="#1A1A1A"
          letter-spacing="-0.3"
        >CONNECT</text>
        {/* 滴灌通 */}
        <text
          x="0" y="85"
          font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif"
          font-size="15"
          font-weight="500"
          fill="#333333"
        >滴灌通</text>
      </svg>
    </div>
  )
}
