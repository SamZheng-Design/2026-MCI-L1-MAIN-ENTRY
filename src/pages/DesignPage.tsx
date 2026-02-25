import type { FC } from 'hono/jsx'
import { products, foundations, architectureGroups, designSections, statusLabels } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogoSmall, ProductLogoFlow } from '../components/Logos'

export const DesignPage: FC = () => {
  return (
    <div class="min-h-screen">
      <Navbar active="design" />

      {/* Hero Section */}
      <section class="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[#4ECDC4]/5 pt-16 pb-20">
        <div class="absolute inset-0 dot-pattern opacity-30"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center fade-in">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4ECDC4]/10 text-[#4ECDC4] text-xs font-medium rounded-full mb-6">
              <i class="fas fa-diagram-project"></i>
              Super Agent Architecture
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              核心架构：9个核心<span class="text-[#4ECDC4]">"通"</span>与统一底座
            </h1>
            <p class="text-lg text-gray-500 max-w-2xl mx-auto">
              不是按赛道建系统，而是提纲挈领的 <strong class="text-gray-700">Super Agent 矩阵</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Overview - Section 2 */}
      <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">架构总览</h2>
            <p class="text-sm text-gray-500">按投资阶段分组的9个核心Agent</p>
          </div>

          {/* 4-column grid */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {architectureGroups.map((group) => (
              <div class="space-y-4">
                {/* Group header */}
                <div class="flex items-center gap-2 px-3 py-2 rounded-lg" style={`background: ${group.bgColor}`}>
                  <div class="w-2 h-2 rounded-full" style={`background: ${group.color}`}></div>
                  <span class="text-sm font-semibold" style={`color: ${group.color}`}>{group.title}</span>
                  <span class="text-[10px] text-gray-400 ml-auto">{group.titleEn}</span>
                </div>

                {/* Product cards in this group */}
                {group.ids.map((id) => {
                  const p = products.find(pr => pr.id === id)!
                  return (
                    <div class="card-hover bg-white border border-gray-200 rounded-xl p-4 cursor-pointer" onclick={`window.location.href='/${p.id}'`}>
                      <div class="flex items-start gap-3">
                        <ProductLogoSmall name={p.name} englishShort={p.englishShort} category={p.category} size={48} />
                        <div class="flex-1 min-w-0">
                          <h3 class="text-sm font-bold text-gray-900 mb-0.5">{p.name}</h3>
                          <p class="text-[11px] text-gray-400 font-light mb-1.5">{p.englishShort}</p>
                          <p class="text-xs text-gray-500 leading-relaxed">{p.description.slice(0, 22)}...</p>
                        </div>
                      </div>
                      <div class="mt-3 pt-2 border-t border-gray-100">
                        <span class={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full border ${statusLabels[p.status].class}`}>
                          {statusLabels[p.status].text}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Layer - Section 3 */}
      <section class="py-8 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <div class="flex items-center justify-center gap-4">
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div class="flex items-center gap-3 text-[#4ECDC4]">
              <i class="fas fa-arrow-right-arrow-left text-xs opacity-50"></i>
              <span class="text-sm font-medium tracking-wider">灵活调用 · 按需组合 · 双向赋能</span>
              <i class="fas fa-arrow-right-arrow-left text-xs opacity-50"></i>
            </div>
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          <div class="mt-4 flex justify-center gap-2">
            {[1,2,3,4,5].map(() => (
              <div class="w-1.5 h-1.5 rounded-full bg-[#4ECDC4]/30 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Foundation Layer - Section 4 */}
      <section class="py-16 bg-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative border-t-4 border-[#4ECDC4] rounded-xl bg-white shadow-lg overflow-hidden">
            <div class="absolute inset-0 dot-pattern opacity-10"></div>
            <div class="relative p-8">
              {/* Header */}
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h2 class="text-xl font-bold text-gray-900">统一底座（基础设施层）</h2>
                  <p class="text-xs text-gray-400 mt-1">Unified Foundation Layer</p>
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                  <i class="fas fa-check-circle mr-1"></i>所有Agent共用
                </span>
              </div>

              {/* 3 Foundation Components */}
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {foundations.map((f) => (
                  <div class="card-hover bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                    <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#4ECDC4]/10 flex items-center justify-center">
                      <i class={`fas ${f.icon} text-2xl text-[#4ECDC4]`}></i>
                    </div>
                    <h3 class="text-base font-bold text-gray-900 mb-2">{f.name}</h3>
                    <p class="text-sm text-gray-500">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Thinking Accordion - Section 5 */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">核心设计思路</h2>
            <p class="text-sm text-gray-500">从理念到架构的完整思考过程</p>
          </div>

          <div class="space-y-4" id="accordion">
            {designSections.map((section, idx) => (
              <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  class="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                  onclick={`
                    const content = this.nextElementSibling;
                    const icon = this.querySelector('.accordion-icon');
                    content.classList.toggle('open');
                    icon.classList.toggle('rotate-180');
                  `}
                >
                  <div class="w-10 h-10 rounded-xl bg-[#4ECDC4]/10 flex items-center justify-center flex-shrink-0">
                    <i class={`fas ${section.icon} text-[#4ECDC4]`}></i>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-base font-semibold text-gray-900">{section.title}</h3>
                  </div>
                  <i class="fas fa-chevron-down text-gray-400 text-sm transition-transform duration-300 accordion-icon"></i>
                </button>
                <div class={`accordion-content ${idx === 0 ? 'open' : ''}`}>
                  <div class="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
                    {section.content.map((item) => (
                      <div class="pl-4 border-l-2 border-[#4ECDC4]/30">
                        <h4 class="text-sm font-semibold text-gray-800 mb-1">{item.subtitle}</h4>
                        <p class="text-sm text-gray-500 leading-relaxed whitespace-pre-line">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Y-Shape Flow Diagram */}
      <section class="py-16 bg-white">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Y型业务流程</h2>
            <p class="text-sm text-gray-500">融资者与投资者的双路径汇合流程</p>
          </div>

          <div class="relative">
            {/* Identity - Top center */}
            <div class="flex justify-center mb-6">
              <div class="bg-blue-50 border-2 border-blue-300 rounded-xl px-6 py-3 text-center shadow-sm">
                <div class="flex justify-center mb-1">
                  <ProductLogoFlow name={products[0].name} englishShort={products[0].englishShort} category={products[0].category} size={40} />
                </div>
                <div class="text-sm font-bold text-blue-700">身份通</div>
                <div class="text-[10px] text-blue-400">统一认证入口</div>
              </div>
            </div>

            {/* Split arrow */}
            <div class="flex justify-center mb-4">
              <div class="w-px h-8 bg-gray-300"></div>
            </div>

            {/* Two paths */}
            <div class="grid grid-cols-2 gap-8 mb-6">
              {/* Fundraiser path */}
              <div class="space-y-4">
                <div class="text-center">
                  <span class="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">融资者路径</span>
                </div>
                <div class="flex justify-center">
                  <div class="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 text-center card-hover">
                    <div class="flex justify-center mb-1">
                      <ProductLogoFlow name={products[1].name} englishShort={products[1].englishShort} category={products[1].category} size={32} />
                    </div>
                    <div class="text-xs font-bold text-blue-700">申请通</div>
                  </div>
                </div>
                <div class="flex justify-center"><i class="fas fa-arrow-down text-gray-300"></i></div>
                <div class="flex justify-center">
                  <div class="text-[10px] text-gray-400 italic">手动触发（可选）</div>
                </div>
              </div>

              {/* Investor path */}
              <div class="space-y-4">
                <div class="text-center">
                  <span class="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full">投资者路径</span>
                </div>
                <div class="flex justify-center">
                  <div class="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2.5 text-center card-hover">
                    <div class="flex justify-center mb-1">
                      <ProductLogoFlow name={products[2].name} englishShort={products[2].englishShort} category={products[2].category} size={32} />
                    </div>
                    <div class="text-xs font-bold text-indigo-700">机会通</div>
                  </div>
                </div>
                <div class="flex justify-center"><i class="fas fa-arrow-down text-gray-300"></i></div>
                <div class="flex justify-center">
                  <div class="text-[10px] text-gray-400 italic">自动触发（必选）</div>
                </div>
              </div>
            </div>

            {/* Converge: Assess */}
            <div class="flex justify-center mb-4">
              <div class="flex items-center gap-4">
                <div class="w-16 h-px bg-gray-300"></div>
                <div class="bg-indigo-50 border-2 border-indigo-300 rounded-xl px-5 py-3 text-center shadow-sm">
                  <div class="flex justify-center mb-1">
                    <ProductLogoFlow name={products[3].name} englishShort={products[3].englishShort} category={products[3].category} size={40} />
                  </div>
                  <div class="text-sm font-bold text-indigo-700">评估通</div>
                  <div class="text-[10px] text-indigo-400">AI量化评估</div>
                </div>
                <div class="w-16 h-px bg-gray-300"></div>
              </div>
            </div>

            {/* Arrow down */}
            <div class="flex justify-center mb-4"><i class="fas fa-arrow-down text-gray-300 text-lg"></i></div>

            {/* Risk */}
            <div class="flex justify-center mb-4">
              <div class="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-3 text-center card-hover">
                <div class="flex justify-center mb-1">
                  <ProductLogoFlow name={products[4].name} englishShort={products[4].englishShort} category={products[4].category} size={40} />
                </div>
                <div class="text-sm font-bold text-indigo-700">风控通</div>
                <div class="text-[10px] text-indigo-400">最终决策关卡</div>
              </div>
            </div>

            {/* Arrow down */}
            <div class="flex justify-center mb-4"><i class="fas fa-arrow-down text-[#4ECDC4] text-lg"></i></div>

            {/* Terms + Contract */}
            <div class="flex justify-center gap-6 mb-4">
              <div class="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5 text-center card-hover">
                <div class="flex justify-center mb-1">
                  <ProductLogoFlow name={products[5].name} englishShort={products[5].englishShort} category={products[5].category} size={32} />
                </div>
                <div class="text-xs font-bold text-purple-700">条款通</div>
              </div>
              <div class="flex items-center"><i class="fas fa-arrow-right text-gray-300"></i></div>
              <div class="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5 text-center card-hover">
                <div class="flex justify-center mb-1">
                  <ProductLogoFlow name={products[6].name} englishShort={products[6].englishShort} category={products[6].category} size={32} />
                </div>
                <div class="text-xs font-bold text-purple-700">合约通</div>
              </div>
            </div>

            {/* Arrow down */}
            <div class="flex justify-center mb-4"><i class="fas fa-arrow-down text-[#4ECDC4] text-lg"></i></div>

            {/* Performance + Settlement */}
            <div class="flex justify-center gap-6">
              <div class="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-center card-hover">
                <div class="flex justify-center mb-1">
                  <ProductLogoFlow name={products[7].name} englishShort={products[7].englishShort} category={products[7].category} size={32} />
                </div>
                <div class="text-xs font-bold text-green-700">履约通</div>
              </div>
              <div class="flex items-center"><i class="fas fa-arrow-right text-gray-300"></i></div>
              <div class="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-center card-hover">
                <div class="flex justify-center mb-1">
                  <ProductLogoFlow name={products[8].name} englishShort={products[8].englishShort} category={products[8].category} size={32} />
                </div>
                <div class="text-xs font-bold text-green-700">结算通</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-16 bg-gradient-to-br from-[#4ECDC4]/5 via-white to-[#4ECDC4]/10">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">准备好探索超级Agent产品矩阵了吗？</h2>
          <p class="text-gray-500 mb-8">点击进入产品统一入口，体验9个"通"的完整功能</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/portal"
              class="inline-flex items-center justify-center px-8 py-3.5 bg-[#4ECDC4] hover:bg-[#3DBDB5] text-white font-semibold rounded-xl shadow-lg shadow-[#4ECDC4]/25 transition-all hover:shadow-xl no-underline"
            >
              <i class="fas fa-rocket mr-2"></i>进入产品入口
            </a>
            <a
              href="#"
              class="inline-flex items-center justify-center px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-[#4ECDC4] hover:text-[#4ECDC4] transition-all no-underline"
            >
              <i class="fas fa-download mr-2"></i>下载产品白皮书
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
