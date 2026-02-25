import type { FC } from 'hono/jsx'
import { products, foundations, statusLabels, roleLabels } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogo } from '../components/Logos'

export const PortalPage: FC = () => {
  return (
    <div class="min-h-screen">
      <Navbar active="portal" />

      {/* Hero Section */}
      <section class="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[#4ECDC4]/5 pt-12 pb-10">
        <div class="absolute inset-0 dot-pattern opacity-30"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center fade-in">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4ECDC4]/10 text-[#4ECDC4] text-xs font-medium rounded-full mb-4">
              <i class="fas fa-th-large"></i>
              Unified Product Portal
            </div>
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              滴灌通超级Agent<span class="text-[#4ECDC4]">产品入口</span>
            </h1>
            <p class="text-base text-gray-500 max-w-xl mx-auto mb-8">
              选择任意「通」开始您的RBF投资旅程
            </p>

            {/* Role Filter */}
            <div class="flex justify-center">
              <div class="inline-flex bg-white rounded-xl border border-gray-200 p-1 shadow-sm" id="role-filter">
                <button
                  class="role-btn px-5 py-2 text-sm font-medium rounded-lg transition-all bg-[#4ECDC4] text-white"
                  data-role="all"
                  onclick="filterByRole('all')"
                >
                  全部
                </button>
                <button
                  class="role-btn px-5 py-2 text-sm font-medium rounded-lg transition-all text-gray-500 hover:text-[#4ECDC4]"
                  data-role="fundraiser"
                  onclick="filterByRole('fundraiser')"
                >
                  <i class="fas fa-building mr-1"></i>融资者视角
                </button>
                <button
                  class="role-btn px-5 py-2 text-sm font-medium rounded-lg transition-all text-gray-500 hover:text-[#4ECDC4]"
                  data-role="investor"
                  onclick="filterByRole('investor')"
                >
                  <i class="fas fa-chart-line mr-1"></i>投资者视角
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="product-grid">
            {products.map((p) => (
              <a
                href={`/${p.id}`}
                class="portal-card block bg-white rounded-2xl p-6 no-underline product-card"
                data-role={p.role}
                style={`border: 2px solid ${p.color}; box-shadow: 0 4px 20px rgba(0,0,0,0.04);`}
              >
                {/* Status badge + Logo */}
                <div class="flex justify-between items-start mb-4">
                  <ProductLogo name={p.name} englishShort={p.englishShort} category={p.category} size={72} />
                  <span class={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${statusLabels[p.status].class}`}>
                    {statusLabels[p.status].text}
                  </span>
                </div>

                {/* Info */}
                <h3 class="text-lg font-bold text-gray-900 mb-0.5">{p.name}</h3>
                <p class="text-xs text-gray-400 mb-3">{p.englishName}</p>
                <p class="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{p.description}</p>

                {/* Category & Role tags */}
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-[10px] px-2 py-0.5 rounded-md font-medium" style={`background: ${p.color}; color: ${p.colorDark}`}>
                    {p.category}
                  </span>
                  {p.role !== 'all' && (
                    <span class="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-500">
                      {roleLabels[p.role]}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div class="flex flex-wrap gap-1.5">
                  {p.features.map((f) => (
                    <span class="text-[10px] px-2 py-0.5 bg-gray-50 text-gray-400 rounded border border-gray-100">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Action hint */}
                <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span class="text-xs text-gray-400">点击进入</span>
                  <i class="fas fa-arrow-right text-xs text-[#4ECDC4]"></i>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Foundation Section */}
      <section class="py-12 bg-gray-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h2 class="text-xl font-bold text-gray-900 mb-1">统一底座</h2>
            <p class="text-sm text-gray-400">所有Agent共用的基础设施层</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {foundations.map((f) => (
              <div class="card-hover bg-white rounded-xl p-5 border border-gray-200 flex items-center gap-4 cursor-pointer">
                <div class="w-12 h-12 rounded-xl bg-[#4ECDC4]/10 flex items-center justify-center flex-shrink-0">
                  <i class={`fas ${f.icon} text-xl text-[#4ECDC4]`}></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">{f.name}</h3>
                  <p class="text-xs text-gray-400">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Filter Script */}
      <script dangerouslySetInnerHTML={{ __html: `
        function filterByRole(role) {
          document.querySelectorAll('.role-btn').forEach(btn => {
            if (btn.dataset.role === role) {
              btn.className = 'role-btn px-5 py-2 text-sm font-medium rounded-lg transition-all bg-[#4ECDC4] text-white';
            } else {
              btn.className = 'role-btn px-5 py-2 text-sm font-medium rounded-lg transition-all text-gray-500 hover:text-[#4ECDC4]';
            }
          });
          document.querySelectorAll('.product-card').forEach(card => {
            const cardRole = card.dataset.role;
            if (role === 'all' || cardRole === 'all' || cardRole === role) {
              card.style.display = 'block';
              card.style.animation = 'fadeIn 0.4s ease-out';
            } else {
              card.style.display = 'none';
            }
          });
        }
      `}} />
    </div>
  )
}
