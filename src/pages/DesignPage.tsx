import type { FC } from 'hono/jsx'
import { products, foundations, architectureGroups, designSections, statusLabels, opportunityBoard, mainFlowProducts } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogoSmall, ProductLogoFlow } from '../components/Logos'

const TEAL = '#4ECDC4'

export const DesignPage: FC = () => {
  const flowProducts = mainFlowProducts

  // 分组：前半段(Identity→Risk)，协同(Terms, Contract)，后半段(Settlement, Performance)
  const preCollabProducts = flowProducts.filter(p => p.flowOrder >= 1 && p.flowOrder <= 4) // Identity, Application, Assess, Risk
  const collabProducts = flowProducts.filter(p => p.flowOrder >= 5 && p.flowOrder <= 6) // Terms, Contract
  const postCollabProducts = flowProducts.filter(p => p.flowOrder >= 7) // Settlement, Performance

  return (
    <div class="min-h-screen">
      <Navbar active="design" />

      {/* Hero Section */}
      <section class="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-[#4ECDC4]/5 pt-16 pb-20">
        <div class="absolute inset-0 dot-pattern opacity-30"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center fade-in">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4ECDC4]/10 text-[#4ECDC4] text-xs font-semibold rounded-full mb-6 border border-[#4ECDC4]/20">
              <svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="5" fill="#4ECDC4"/></svg>
              Super Agent Architecture
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 leading-tight tracking-tight">
              8个通如何串联成<span class="text-[#4ECDC4]">Super Agent</span>
            </h1>
            <p class="text-lg text-gray-500 max-w-2xl mx-auto">
              核心机制：<strong class="text-black">事件驱动 · 灵活调用 · 按需组合</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ========== Y-Shape Flow Diagram (CORE) ========== */}
      <section class="py-16 bg-white" id="y-flow">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full mb-3">
              Y型业务流程
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-black mb-3">完整Y型业务流程</h2>
            <p class="text-sm text-gray-500 max-w-xl mx-auto">融资者路径为主干线（左侧），投资者通过Opportunity看板（右侧分叉）观察项目进展，在Terms/Contract阶段双方协同汇合</p>
            {/* Legend */}
            <div class="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6">
              <div class="flex items-center gap-2">
                <div class="w-8 h-1 rounded bg-gray-300"></div>
                <span class="text-xs text-gray-500">融资者主路径</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-8 h-1 rounded border-t-2 border-dashed border-[#4ECDC4]"></div>
                <span class="text-xs text-gray-500">投资者分叉（Opportunity看板）</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-[#4ECDC4]/20 border-2 border-[#4ECDC4]"></div>
                <span class="text-xs text-gray-500">投融资双方协同节点</span>
              </div>
            </div>
          </div>

          {/* ===== Y-Shape Flow - Vertical layout ===== */}
          <div class="max-w-4xl mx-auto">

            {/* === PHASE 1: 入口 - Identity === */}
            <div class="flex flex-col items-center mb-2">
              <div class="text-center mb-4">
                <span class="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-200">
                  <i class="fas fa-sign-in-alt mr-1"></i>统一入口
                </span>
              </div>
              <div 
                class="bg-white rounded-xl px-6 py-4 text-center cursor-pointer card-hover shadow-md border-2 border-blue-200 w-52"
                onclick="window.location.href='/identity'"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <ProductLogoFlow name="身份通" englishShort="Identity" size={32} />
                  <div>
                    <div class="text-sm font-bold text-black">Identity</div>
                    <div class="text-[10px] text-gray-400">身份通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">统一认证入口</div>
              </div>
            </div>

            {/* Arrow down */}
            <div class="flex justify-center py-2">
              <svg width="12" height="28" viewBox="0 0 12 28"><line x1="6" y1="0" x2="6" y2="22" stroke="#CBD5E1" stroke-width="2"/><polygon points="2,22 6,28 10,22" fill="#CBD5E1"/></svg>
            </div>

            {/* === PHASE 2: Application === */}
            <div class="flex flex-col items-center mb-2">
              <div 
                class="bg-white rounded-xl px-6 py-4 text-center cursor-pointer card-hover shadow-sm border border-gray-200 w-52"
                onclick="window.location.href='/application'"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <ProductLogoFlow name="申请通" englishShort="Application" size={32} />
                  <div>
                    <div class="text-sm font-bold text-black">Application</div>
                    <div class="text-[10px] text-gray-400">申请通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">融资者材料整理</div>
              </div>
            </div>

            {/* Arrow down */}
            <div class="flex justify-center py-2">
              <svg width="12" height="28" viewBox="0 0 12 28"><line x1="6" y1="0" x2="6" y2="22" stroke="#CBD5E1" stroke-width="2"/><polygon points="2,22 6,28 10,22" fill="#CBD5E1"/></svg>
            </div>

            {/* === PHASE 3: Assess === */}
            <div class="flex flex-col items-center mb-2">
              <div 
                class="bg-white rounded-xl px-6 py-4 text-center cursor-pointer card-hover shadow-sm border border-gray-200 w-52"
                onclick="window.location.href='/assess'"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <ProductLogoFlow name="评估通" englishShort="Assess" size={32} />
                  <div>
                    <div class="text-sm font-bold text-black">Assess</div>
                    <div class="text-[10px] text-gray-400">评估通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">AI驱动评估</div>
              </div>
            </div>

            {/* Arrow down */}
            <div class="flex justify-center py-2">
              <svg width="12" height="28" viewBox="0 0 12 28"><line x1="6" y1="0" x2="6" y2="22" stroke="#CBD5E1" stroke-width="2"/><polygon points="2,22 6,28 10,22" fill="#CBD5E1"/></svg>
            </div>

            {/* === PHASE 4: Risk === */}
            <div class="flex flex-col items-center mb-2">
              <div 
                class="bg-white rounded-xl px-6 py-4 text-center cursor-pointer card-hover shadow-sm border border-gray-200 w-52"
                onclick="window.location.href='/risk'"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <ProductLogoFlow name="风控通" englishShort="Risk" size={32} />
                  <div>
                    <div class="text-sm font-bold text-black">Risk</div>
                    <div class="text-[10px] text-gray-400">风控通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">风险审查</div>
              </div>
            </div>

            {/* ====== Y-FORK: The Y-shape split ====== */}
            {/* This is the key visual: after Risk, the flow forks:
                LEFT arm = Opportunity (investor dashboard)
                RIGHT/CENTER continues = Terms → Contract (collaborative) 
            */}
            <div class="relative py-6">
              {/* Y-fork SVG connector */}
              <div class="flex justify-center">
                <svg width="400" height="80" viewBox="0 0 400 80" class="overflow-visible">
                  {/* Center vertical line from top */}
                  <line x1="200" y1="0" x2="200" y2="24" stroke="#CBD5E1" stroke-width="2" />
                  {/* Fork point dot */}
                  <circle cx="200" cy="24" r="4" fill={TEAL} />
                  {/* Left branch - dashed (to Opportunity) */}
                  <path d="M200,24 C200,44 100,44 100,64" fill="none" stroke={TEAL} stroke-width="2" stroke-dasharray="5,4" />
                  <polygon points="96,60 100,70 104,60" fill={TEAL} />
                  {/* Right branch - solid (to Terms) */}
                  <path d="M200,24 C200,44 300,44 300,64" fill="none" stroke="#CBD5E1" stroke-width="2" />
                  <polygon points="296,60 300,70 304,60" fill="#CBD5E1" />
                </svg>
              </div>

              {/* Two branches side by side */}
              <div class="flex justify-center gap-8 sm:gap-20 mt-2">
                {/* LEFT: Opportunity (investor dashboard) */}
                <div class="flex flex-col items-center" style="width: 180px;">
                  <div class="text-center mb-2">
                    <span class="inline-flex items-center px-2 py-0.5 bg-[#4ECDC4]/10 text-[#4ECDC4] text-[9px] font-bold rounded-full border border-[#4ECDC4]/30">
                      <i class="fas fa-eye mr-1"></i>投资者看板
                    </span>
                  </div>
                  <div 
                    class="border-2 border-dashed border-[#4ECDC4]/60 rounded-xl px-4 py-3 bg-[#4ECDC4]/5 text-center cursor-pointer card-hover w-full"
                    onclick="window.location.href='/opportunity'"
                  >
                    <div class="flex items-center justify-center gap-2 mb-1">
                      <div class="w-8 h-8 rounded-lg bg-[#4ECDC4]/20 flex items-center justify-center">
                        <i class="fas fa-eye text-[#4ECDC4] text-sm"></i>
                      </div>
                      <div>
                        <div class="text-sm font-bold text-black">Opportunity</div>
                        <div class="text-[9px] text-gray-400">投资者看板</div>
                      </div>
                    </div>
                    <div class="text-[10px] text-gray-500 mt-1 leading-relaxed">
                      查看项目信息<br/>评估报告 · 风控结论
                    </div>
                    {/* Data source indicators */}
                    <div class="flex justify-center gap-1 mt-2">
                      <span class="text-[8px] px-1.5 py-0.5 bg-white rounded text-gray-400 border border-gray-200">Application</span>
                      <span class="text-[8px] px-1.5 py-0.5 bg-white rounded text-gray-400 border border-gray-200">Assess</span>
                      <span class="text-[8px] px-1.5 py-0.5 bg-white rounded text-gray-400 border border-gray-200">Risk</span>
                    </div>
                  </div>
                  {/* Note: Opportunity is a view, not a flow step */}
                  <div class="text-[9px] text-gray-400 mt-2 text-center italic">
                    副流程 · 观察窗口
                  </div>
                </div>

                {/* RIGHT: Terms (collaborative) - continues main flow */}
                <div class="flex flex-col items-center" style="width: 180px;">
                  <div class="text-center mb-2">
                    <span class="inline-flex items-center px-2 py-0.5 bg-[#4ECDC4] text-white text-[9px] font-bold rounded-full">
                      <i class="fas fa-handshake mr-1"></i>协同节点
                    </span>
                  </div>
                  <div 
                    class="bg-white rounded-xl px-4 py-3 text-center cursor-pointer card-hover shadow-sm border-2 border-[#4ECDC4] w-full"
                    onclick="window.location.href='/terms'"
                  >
                    <div class="flex items-center justify-center gap-2 mb-1">
                      <ProductLogoFlow name="条款通" englishShort="Terms" size={28} />
                      <div>
                        <div class="text-sm font-bold text-black">Terms</div>
                        <div class="text-[9px] text-gray-400">条款通</div>
                      </div>
                    </div>
                    <div class="text-[10px] text-gray-400 mt-1">收入分成方案</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ====== MERGE POINT: Opportunity feeds into Terms/Contract ====== */}
            {/* Dashed arrow from Opportunity (left) merging into the main flow at Contract */}
            <div class="relative py-2">
              <div class="flex justify-center">
                <svg width="400" height="60" viewBox="0 0 400 60" class="overflow-visible">
                  {/* Left: dashed line from Opportunity going right-down to merge */}
                  <path d="M100,0 C100,30 300,30 300,55" fill="none" stroke={TEAL} stroke-width="1.5" stroke-dasharray="5,4" opacity="0.6" />
                  <text x="170" y="20" font-size="9" fill="#4ECDC4" font-weight="600" font-family="sans-serif">投资者参与协同 →</text>
                  {/* Right: solid line from Terms going down */}
                  <line x1="300" y1="0" x2="300" y2="50" stroke="#CBD5E1" stroke-width="2" />
                  <polygon points="296,46 300,56 304,46" fill="#CBD5E1" />
                </svg>
              </div>
            </div>

            {/* === PHASE 6: Contract (collaborative) === */}
            <div class="flex flex-col items-center mb-2">
              <div class="text-center mb-2">
                <span class="inline-flex items-center px-2 py-0.5 bg-[#4ECDC4] text-white text-[9px] font-bold rounded-full">
                  <i class="fas fa-handshake mr-1"></i>协同节点
                </span>
              </div>
              <div 
                class="bg-white rounded-xl px-6 py-4 text-center cursor-pointer card-hover shadow-sm border-2 border-[#4ECDC4] w-52"
                onclick="window.location.href='/contract'"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <ProductLogoFlow name="合约通" englishShort="Contract" size={32} />
                  <div>
                    <div class="text-sm font-bold text-black">Contract</div>
                    <div class="text-[10px] text-gray-400">合约通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">电子合约签署 · 双方协同</div>
              </div>
            </div>

            {/* Arrow down */}
            <div class="flex justify-center py-2">
              <svg width="12" height="28" viewBox="0 0 12 28"><line x1="6" y1="0" x2="6" y2="22" stroke="#CBD5E1" stroke-width="2"/><polygon points="2,22 6,28 10,22" fill="#CBD5E1"/></svg>
            </div>

            {/* === PHASE 7: Settlement === */}
            <div class="flex flex-col items-center mb-2">
              <div 
                class="bg-white rounded-xl px-6 py-4 text-center cursor-pointer card-hover shadow-sm border border-gray-200 w-52"
                onclick="window.location.href='/settlement'"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <ProductLogoFlow name="结算通" englishShort="Settlement" size={32} />
                  <div>
                    <div class="text-sm font-bold text-black">Settlement</div>
                    <div class="text-[10px] text-gray-400">结算通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">收入分成自动结算</div>
              </div>
            </div>

            {/* Arrow down */}
            <div class="flex justify-center py-2">
              <svg width="12" height="28" viewBox="0 0 12 28"><line x1="6" y1="0" x2="6" y2="22" stroke="#CBD5E1" stroke-width="2"/><polygon points="2,22 6,28 10,22" fill="#CBD5E1"/></svg>
            </div>

            {/* === PHASE 8: Performance === */}
            <div class="flex flex-col items-center mb-4">
              <div class="text-center mb-2">
                <span class="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full border border-green-200">
                  <i class="fas fa-flag-checkered mr-1"></i>投后管理
                </span>
              </div>
              <div 
                class="bg-white rounded-xl px-6 py-4 text-center cursor-pointer card-hover shadow-md border-2 border-green-200 w-52"
                onclick="window.location.href='/performance'"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <ProductLogoFlow name="履约通" englishShort="Performance" size={32} />
                  <div>
                    <div class="text-sm font-bold text-black">Performance</div>
                    <div class="text-[10px] text-gray-400">履约通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">履约监控与数据追踪</div>
              </div>
            </div>

            {/* Flow summary bar */}
            <div class="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div class="text-center">
                <div class="text-xs font-bold text-gray-500 mb-3">流程总结</div>
                <div class="flex flex-wrap items-center justify-center gap-1 text-[10px]">
                  {flowProducts.map((p, idx) => (
                    <div class="flex items-center">
                      <span class={`px-2 py-0.5 rounded ${p.isCollaborative ? 'bg-[#4ECDC4]/15 text-[#4ECDC4] font-bold border border-[#4ECDC4]/30' : 'bg-white text-gray-600 border border-gray-200'}`}>
                        {p.englishShort}
                      </span>
                      {idx < flowProducts.length - 1 && (
                        <span class="text-gray-300 mx-0.5">→</span>
                      )}
                    </div>
                  ))}
                </div>
                <div class="mt-2 flex items-center justify-center gap-1">
                  <span class="text-[10px] text-gray-300">+</span>
                  <span class="px-2 py-0.5 rounded bg-[#4ECDC4]/10 text-[#4ECDC4] text-[10px] border border-dashed border-[#4ECDC4]/30">
                    <i class="fas fa-eye mr-0.5"></i>Opportunity 投资者看板
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-extrabold text-black mb-2">架构总览</h2>
            <p class="text-sm text-gray-500">按投资阶段分组的8个核心Agent</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {architectureGroups.map((group) => (
              <div class="space-y-4">
                {/* Group header */}
                <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-100 shadow-sm">
                  <svg viewBox="0 0 16 16" width="10" height="10"><circle cx="8" cy="8" r="6" fill={TEAL}/></svg>
                  <span class="text-sm font-bold text-black">{group.title}</span>
                  <span class="text-[10px] text-gray-400 ml-auto">{group.titleEn}</span>
                </div>

                {group.ids.map((id) => {
                  const p = products.find(pr => pr.id === id)!
                  return (
                    <div class="card-hover bg-white border border-gray-200 rounded-xl p-4 cursor-pointer" onclick={`window.location.href='/${p.id}'`}>
                      <div class="flex items-start gap-3">
                        <ProductLogoSmall name={p.name} englishShort={p.englishShort} size={48} />
                        <div class="flex-1 min-w-0">
                          <h3 class="text-sm font-bold text-black mb-0.5">{p.name}</h3>
                          <p class="text-[11px] text-gray-400 font-light mb-1.5">{p.englishShort}</p>
                          <p class="text-xs text-gray-500 leading-relaxed">{p.description.slice(0, 22)}...</p>
                        </div>
                      </div>
                      <div class="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2">
                        <span class={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full border ${statusLabels[p.status].class}`}>
                          {statusLabels[p.status].text}
                        </span>
                        {p.isCollaborative && (
                          <span class="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] border border-[#4ECDC4]/20 font-semibold">
                            协同
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Layer */}
      <section class="py-8 bg-white">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <div class="flex items-center justify-center gap-4">
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div class="flex items-center gap-3">
              <svg viewBox="0 0 20 20" width="12" height="12"><circle cx="10" cy="10" r="6" fill={TEAL} opacity="0.5"/></svg>
              <span class="text-sm font-semibold text-black tracking-wider">灵活调用 · 按需组合 · 双向赋能</span>
              <svg viewBox="0 0 20 20" width="12" height="12"><circle cx="10" cy="10" r="6" fill={TEAL} opacity="0.5"/></svg>
            </div>
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          <div class="mt-4 flex justify-center gap-3">
            {[1,2,3].map(() => (
              <svg viewBox="0 0 12 12" width="8" height="8"><circle cx="6" cy="6" r="4" fill={TEAL} opacity="0.3"/></svg>
            ))}
          </div>
        </div>
      </section>

      {/* Foundation Layer */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative border-t-4 border-[#4ECDC4] rounded-xl bg-white shadow-lg overflow-hidden">
            <div class="absolute inset-0 dot-pattern opacity-10"></div>
            <div class="relative p-8">
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h2 class="text-xl font-extrabold text-black">统一底座（基础设施层）</h2>
                  <p class="text-xs text-gray-400 mt-1">Unified Foundation Layer</p>
                </div>
                <span class="px-3 py-1 bg-[#4ECDC4]/10 text-[#4ECDC4] text-xs font-semibold rounded-full border border-[#4ECDC4]/20">
                  <i class="fas fa-check-circle mr-1"></i>所有Agent共用
                </span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {foundations.map((f) => (
                  <div class="card-hover bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                    <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                      <i class={`fas ${f.icon} text-2xl text-[#4ECDC4]`}></i>
                    </div>
                    <h3 class="text-base font-bold text-black mb-2">{f.name}</h3>
                    <p class="text-sm text-gray-500">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Thinking Accordion */}
      <section class="py-16 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-extrabold text-black mb-2">核心设计思路</h2>
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
                  <div class="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <i class={`fas ${section.icon} text-[#4ECDC4]`}></i>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-base font-bold text-black">{section.title}</h3>
                  </div>
                  <i class="fas fa-chevron-down text-gray-400 text-sm transition-transform duration-300 accordion-icon"></i>
                </button>
                <div class={`accordion-content ${idx === 0 ? 'open' : ''}`}>
                  <div class="px-5 pb-5 space-y-4 border-t border-gray-100 pt-4">
                    {section.content.map((item) => (
                      <div class="pl-4 border-l-2 border-[#4ECDC4]/40">
                        <h4 class="text-sm font-bold text-black mb-1">{item.subtitle}</h4>
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

      {/* CTA */}
      <section class="py-16 bg-gradient-to-br from-[#4ECDC4]/5 via-white to-[#4ECDC4]/8">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-2xl font-extrabold text-black mb-4">准备好探索超级Agent产品矩阵了吗？</h2>
          <p class="text-gray-500 mb-8">点击进入产品统一入口，体验8个"通"的完整功能</p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/portal" class="inline-flex items-center justify-center px-8 py-3.5 bg-[#4ECDC4] hover:bg-[#3DBDB5] text-white font-bold rounded-xl shadow-lg shadow-[#4ECDC4]/25 transition-all no-underline">
              <i class="fas fa-rocket mr-2"></i>进入产品入口
            </a>
            <a href="#" class="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black font-bold rounded-xl border-2 border-gray-200 hover:border-[#4ECDC4] transition-all no-underline">
              <i class="fas fa-download mr-2"></i>下载产品白皮书
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
