import type { FC } from 'hono/jsx'
import { products, getProductUrl, isExternalProduct } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogo } from '../components/Logos'
import type { Lang } from '../i18n'
import { langLink, tt, t, getProductName, getProductDesc, getProductFeatures, getCategoryName, getStatusLabel, getRoleLabel } from '../i18n'

const sortedProducts = [...products].sort((a, b) => a.flowOrder - b.flowOrder)

export const PlaceholderPage: FC<{ productId: string; lang?: Lang }> = ({ productId, lang = 'zh' }) => {
  const l = lang
  const ll = (href: string) => langLink(href, l)
  const p = t.placeholder

  const product = products.find(p => p.id === productId)
  if (!product) {
    return (
      <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-gray-300 mb-4">404</h1>
          <p class="text-gray-500 mb-6">{tt(p.notFound, l)}</p>
          <a href={ll('/portal')} class="text-[#5DC4B3] hover:underline font-semibold no-underline">{tt(p.backToPortal, l)}</a>
        </div>
      </div>
    )
  }

  const status = getStatusLabel(product.status, l)
  const role = getRoleLabel(product.role, l)
  const category = getCategoryName(product.category, l)
  const desc = getProductDesc(product.id, l) || product.description
  const features = getProductFeatures(product.id, l)
  const pName = getProductName(product.id, l)

  const currentIdx = sortedProducts.findIndex(p => p.id === productId)
  const prevProduct = currentIdx > 0 ? sortedProducts[currentIdx - 1] : null
  const nextProduct = currentIdx < sortedProducts.length - 1 ? sortedProducts[currentIdx + 1] : null

  return (
    <div class="min-h-screen">
      <Navbar active="" lang={l} />

      <div class="bg-gray-50 border-b border-gray-100">
        <div class="max-w-4xl mx-auto px-4 py-3">
          <nav class="flex items-center gap-2 text-xs text-gray-400">
            <a href={ll('/')} class="hover:text-[#5DC4B3] transition-colors no-underline"><i class="fas fa-home text-[10px]"></i></a>
            <i class="fas fa-chevron-right text-[8px] text-gray-300"></i>
            <a href={ll('/portal')} class="hover:text-[#5DC4B3] transition-colors no-underline">{tt(p.breadPortal, l)}</a>
            <i class="fas fa-chevron-right text-[8px] text-gray-300"></i>
            <span class="text-[#1d1d1f] font-semibold">{pName}</span>
          </nav>
        </div>
      </div>

      <section class="relative overflow-hidden pt-16 pb-12 bg-gradient-to-br from-white via-gray-50 to-[#5DC4B3]/5">
        <div class="absolute inset-0 dot-pattern opacity-20"></div>
        <div class="max-w-4xl mx-auto px-4 relative text-center">
          <div class="mb-6 flex justify-center">
            <ProductLogo name={product.name} englishShort={product.englishShort} size={96} />
          </div>
          <span class={`inline-flex items-center text-xs px-3 py-1 rounded-full border font-medium mb-4 ${status.class}`}>
            {status.text}
          </span>
          <h1 class="text-3xl font-extrabold text-[#1d1d1f] mb-1">{pName}</h1>
          <p class="text-sm text-gray-400 mb-4">{l === 'en' ? product.englishShort : product.englishName}</p>
          <p class="text-base text-gray-500 max-w-lg mx-auto leading-relaxed">{desc}</p>
          <div class="mt-4 flex justify-center gap-2">
            <span class="inline-flex items-center text-xs px-3 py-1 rounded-lg font-semibold bg-[#5DC4B3]/10 text-[#5DC4B3] border border-[#5DC4B3]/20">
              <i class="fas fa-layer-group mr-1.5"></i>{category}
            </span>
            {role && (
              <span class={`inline-flex items-center text-xs px-3 py-1 rounded-lg font-semibold border ${role.class}`}>
                <i class={`fas ${role.icon} mr-1.5`}></i>{role.text}
              </span>
            )}
            {product.isFilter && (
              <span class="inline-flex items-center text-xs px-3 py-1 rounded-lg font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200">
                <i class="fas fa-robot mr-1.5"></i>{tt(t.data.aiFilterWorkflow, l)}
              </span>
            )}
          </div>
        </div>
      </section>

      <section class="py-12 bg-white">
        <div class="max-w-4xl mx-auto px-4">
          <h2 class="text-xl font-extrabold text-[#1d1d1f] mb-6 text-center">{tt(p.featuresTitle, l)}</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature: string, idx: number) => (
              <div class="card-hover flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span class="text-sm font-bold text-[#5DC4B3]">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <span class="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section class="py-16 bg-gray-50">
        <div class="max-w-md mx-auto px-4 text-center">
          <div class="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            <i class="fas fa-tools text-3xl text-[#5DC4B3]"></i>
          </div>
          <h3 class="text-lg font-extrabold text-[#1d1d1f] mb-2">{tt(p.comingSoon, l)}</h3>
          <p class="text-sm text-gray-500 mb-8 leading-relaxed">
            {pName} {tt(p.comingSoonDesc, l)}
          </p>
          <a href={ll('/portal')} class="inline-flex items-center px-6 py-3 bg-[#5DC4B3] hover:bg-[#3D8F83] text-white font-bold rounded-xl shadow-lg shadow-[#5DC4B3]/25 transition-all no-underline">
            <i class="fas fa-arrow-left mr-2"></i>{tt(p.backToPortal, l)}
          </a>
        </div>
      </section>

      <section class="py-8 bg-white border-t border-gray-100">
        <div class="max-w-4xl mx-auto px-4">
          <div class="flex items-stretch gap-4">
            <div class="flex-1">
              {prevProduct ? (
                <a href={ll(getProductUrl(prevProduct))} target={isExternalProduct(prevProduct) ? "_blank" : undefined} rel={isExternalProduct(prevProduct) ? "noopener noreferrer" : undefined} class="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#5DC4B3]/30 hover:shadow-md transition-all no-underline group h-full">
                  <i class="fas fa-chevron-left text-xs text-gray-300 group-hover:text-[#5DC4B3] transition-colors"></i>
                  <div class="min-w-0">
                    <div class="text-[10px] text-gray-400 mb-0.5">{tt(p.prevStep, l)}</div>
                    <div class="text-sm font-bold text-[#1d1d1f] group-hover:text-[#5DC4B3] transition-colors truncate">{getProductName(prevProduct.id, l)}</div>
                    <div class="text-[10px] text-gray-400">{prevProduct.englishShort}</div>
                  </div>
                </a>
              ) : <div />}
            </div>
            <div class="flex-1">
              {nextProduct ? (
                <a href={ll(getProductUrl(nextProduct))} target={isExternalProduct(nextProduct) ? "_blank" : undefined} rel={isExternalProduct(nextProduct) ? "noopener noreferrer" : undefined} class="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#5DC4B3]/30 hover:shadow-md transition-all no-underline group h-full justify-end text-right">
                  <div class="min-w-0">
                    <div class="text-[10px] text-gray-400 mb-0.5">{tt(p.nextStep, l)}</div>
                    <div class="text-sm font-bold text-[#1d1d1f] group-hover:text-[#5DC4B3] transition-colors truncate">{getProductName(nextProduct.id, l)}</div>
                    <div class="text-[10px] text-gray-400">{nextProduct.englishShort}</div>
                  </div>
                  <i class="fas fa-chevron-right text-xs text-gray-300 group-hover:text-[#5DC4B3] transition-colors"></i>
                </a>
              ) : <div />}
            </div>
          </div>
        </div>
      </section>

      <Footer lang={l} />
    </div>
  )
}
