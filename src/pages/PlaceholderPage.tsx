import type { FC } from 'hono/jsx'
import { products, statusLabels, foundations } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const PlaceholderPage: FC<{ productId: string }> = ({ productId }) => {
  const product = products.find(p => p.id === productId)
  if (!product) {
    return (
      <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-300 mb-4">404</h1>
          <p class="text-gray-500 mb-6">产品模块未找到</p>
          <a href="/portal" class="text-primary hover:underline">返回产品入口</a>
        </div>
      </div>
    )
  }

  return (
    <div class="min-h-screen">
      <Navbar active="" />

      {/* Hero */}
      <section class="relative overflow-hidden pt-16 pb-12" style={`background: linear-gradient(135deg, ${product.color}40, white, ${product.color}20)`}>
        <div class="absolute inset-0 dot-pattern opacity-20"></div>
        <div class="max-w-4xl mx-auto px-4 relative text-center">
          {/* Logo */}
          <div class="mb-6">
            <div class="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center shadow-lg" style={`background: ${product.color}`}>
              <img src={product.logo} alt={product.name} class="w-20 h-20 rounded-2xl object-cover" />
            </div>
          </div>

          {/* Status */}
          <span class={`inline-flex items-center text-xs px-3 py-1 rounded-full border font-medium mb-4 ${statusLabels[product.status].class}`}>
            {statusLabels[product.status].text}
          </span>

          {/* Title */}
          <h1 class="text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
          <p class="text-sm text-gray-400 mb-4">{product.englishName}</p>
          <p class="text-base text-gray-500 max-w-lg mx-auto leading-relaxed">{product.description}</p>

          {/* Category badge */}
          <div class="mt-4">
            <span class="inline-flex items-center text-xs px-3 py-1 rounded-lg font-medium" style={`background: ${product.color}; color: ${product.colorDark}`}>
              <i class="fas fa-layer-group mr-1.5"></i>{product.category}
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section class="py-12 bg-white">
        <div class="max-w-4xl mx-auto px-4">
          <h2 class="text-xl font-bold text-gray-900 mb-6 text-center">核心功能</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.features.map((feature, idx) => (
              <div class="card-hover flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={`background: ${product.color}`}>
                  <span class="text-sm font-bold" style={`color: ${product.colorDark}`}>{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <span class="text-sm font-medium text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-md mx-auto px-4 text-center">
          <div class="w-20 h-20 mx-auto mb-6 rounded-3xl bg-primary/10 flex items-center justify-center">
            <i class="fas fa-tools text-3xl text-primary"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">功能开发中</h3>
          <p class="text-sm text-gray-500 mb-8 leading-relaxed">
            {product.name}（{product.englishName}）正在紧锣密鼓地开发中，敬请期待完整功能上线。
          </p>
          <a
            href="/portal"
            class="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-lg shadow-primary/25 transition-all no-underline"
          >
            <i class="fas fa-arrow-left mr-2"></i>返回产品入口
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
