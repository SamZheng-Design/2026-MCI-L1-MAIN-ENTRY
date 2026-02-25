// SVG Logo Generator for all 9 "Connect" products
// Design Language: Follows Micro Connect brand identity
// - Bold sans-serif typography
// - Signature teal/mint green circle accent (#4ECDC4)
// - Clean, modern, corporate style
// - Chinese name prominent, English subtitle

export interface LogoConfig {
  id: string
  name: string
  englishName: string
  icon: string // Font Awesome icon class
  accentColor: string // circle accent color per group
}

// Each "通" logo as inline SVG with Micro Connect design language
// Using the signature teal circle + bold type approach

export function generateProductSVG(
  name: string,
  englishShort: string,
  accentColor: string,
  size: number = 80
): string {
  // Encode for use in data URI
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${size}" height="${size}">
    <defs>
      <linearGradient id="bg_${englishShort}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#F8FFFE;stop-opacity:1"/>
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect width="200" height="200" rx="24" fill="url(#bg_${englishShort})" stroke="#E8EEEC" stroke-width="1.5"/>
    <!-- Signature Circle (Micro Connect brand element) -->
    <circle cx="150" cy="42" r="22" fill="${accentColor}" opacity="0.9"/>
    <!-- Small decorative circle -->
    <circle cx="56" cy="160" r="8" fill="${accentColor}" opacity="0.35"/>
    <!-- Chinese Name - Bold -->
    <text x="100" y="95" text-anchor="middle" font-family="'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif" font-size="42" font-weight="700" fill="#1A1A1A">${name}</text>
    <!-- English Name - Light -->
    <text x="100" y="130" text-anchor="middle" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-size="18" font-weight="500" fill="#666666" letter-spacing="1">${englishShort.toUpperCase()}</text>
    <!-- Bottom line accent -->
    <rect x="65" y="148" width="70" height="3" rx="1.5" fill="${accentColor}" opacity="0.6"/>
  </svg>`
  return svg
}

// Generate data URI for use in img src
export function getLogoDataURI(
  name: string,
  englishShort: string,
  accentColor: string,
  size: number = 80
): string {
  const svg = generateProductSVG(name, englishShort, accentColor, size)
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// Pre-generated logo data URIs for all 9 products
export const productLogos: Record<string, { dataURI: (size?: number) => string }> = {
  identity: {
    dataURI: (size = 80) => getLogoDataURI('身份通', 'Identity', '#4ECDC4', size)
  },
  application: {
    dataURI: (size = 80) => getLogoDataURI('申请通', 'Application', '#4ECDC4', size)
  },
  opportunity: {
    dataURI: (size = 80) => getLogoDataURI('机会通', 'Opportunity', '#6366F1', size)
  },
  assess: {
    dataURI: (size = 80) => getLogoDataURI('评估通', 'Assess', '#6366F1', size)
  },
  risk: {
    dataURI: (size = 80) => getLogoDataURI('风控通', 'Risk', '#6366F1', size)
  },
  terms: {
    dataURI: (size = 80) => getLogoDataURI('条款通', 'Terms', '#8B5CF6', size)
  },
  contract: {
    dataURI: (size = 80) => getLogoDataURI('合约通', 'Contract', '#8B5CF6', size)
  },
  performance: {
    dataURI: (size = 80) => getLogoDataURI('履约通', 'Performance', '#10B981', size)
  },
  settlement: {
    dataURI: (size = 80) => getLogoDataURI('结算通', 'Settlement', '#10B981', size)
  }
}

// Main Micro Connect logo as SVG
export function getMicroConnectLogo(height: number = 40): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 100" height="${height}">
    <text x="0" y="38" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-size="32" font-weight="800" fill="#1A1A1A" letter-spacing="-0.5">MICRO</text>
    <circle cx="152" cy="24" r="10" fill="#4ECDC4"/>
    <text x="0" y="72" font-family="'Inter','Helvetica Neue',Arial,sans-serif" font-size="32" font-weight="800" fill="#1A1A1A" letter-spacing="-0.5">CONNECT</text>
    <circle cx="230" cy="24" r="6" fill="#4ECDC4" opacity="0.5"/>
    <text x="0" y="95" font-family="'Noto Sans SC','PingFang SC',sans-serif" font-size="18" font-weight="500" fill="#1A1A1A">滴灌通</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
