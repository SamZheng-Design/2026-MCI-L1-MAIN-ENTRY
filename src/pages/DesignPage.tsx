import type { FC } from 'hono/jsx'
import { products, foundations, architectureGroups, designSections, statusLabels, mainFlowProducts, investorFilterProducts, investorViewProduct, entryProduct, borrowerProducts, dealProducts, postInvestmentProducts } from '../data'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { ProductLogoSmall, ProductLogoFlow } from '../components/Logos'

const TEAL = '#4ECDC4'
const AMBER = '#F59E0B'
const INDIGO = '#6366F1'
const EMERALD = '#10B981'
const PURPLE = '#8B5CF6'

export const DesignPage: FC = () => {
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
              9个通如何串联成<span class="text-[#4ECDC4]">Super Agent</span>
            </h1>
            <p class="text-lg text-gray-500 max-w-2xl mx-auto">
              身份通统一入口 · Y型双角色分流 · <strong class="text-black">数据穿越AI筛子</strong> · 协同汇合
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
            <p class="text-sm text-gray-500 max-w-2xl mx-auto">身份通统一入口分流两个角色：融资者通过申请通上传数据，数据直接进入投资者搭建的评估通→风控通筛选管道，通过标准的项目进入机会通展现</p>
            {/* Legend */}
            <div class="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6">
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-amber-100 border-2 border-amber-400"></div>
                <span class="text-xs text-gray-500">融资者路径</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-indigo-100 border-2 border-indigo-400"></div>
                <span class="text-xs text-gray-500">投资者路径</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-8 h-0.5 rounded bg-amber-400" style="border-top: 2px dashed #F59E0B"></div>
                <span class="text-xs text-gray-500">数据穿越管道</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-4 h-4 rounded bg-[#4ECDC4]/20 border-2 border-[#4ECDC4]"></div>
                <span class="text-xs text-gray-500">投融资双方协同</span>
              </div>
            </div>
          </div>

          {/* ===== Y-Shape Flow - Vertical layout ===== */}
          <div class="max-w-4xl mx-auto">

            {/* === PHASE 1: 入口 - Identity === */}
            <div class="flex flex-col items-center mb-2">
              <div class="text-center mb-4">
                <span class="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-200">
                  <i class="fas fa-sign-in-alt mr-1"></i>统一入口 · 角色分流
                </span>
              </div>
              <div 
                class="bg-white rounded-xl px-8 py-5 text-center cursor-pointer card-hover shadow-md border-2 border-blue-300 w-64"
                onclick="window.location.href='/identity'"
              >
                <div class="flex items-center justify-center gap-2 mb-2">
                  <ProductLogoFlow name="身份通" englishShort="Identity" size={32} />
                  <div>
                    <div class="text-sm font-bold text-black">Identity</div>
                    <div class="text-[10px] text-gray-400">身份通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-500 mt-1">所有用户统一认证入口</div>
                <div class="flex justify-center gap-2 mt-3">
                  <span class="text-[9px] px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full border border-amber-200">融资者</span>
                  <span class="text-[9px] px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-200">投资者</span>
                </div>
              </div>
            </div>

            {/* ====== Y-FORK: The Y-shape split from Identity ====== */}
            <div class="relative py-3">
              <div class="flex justify-center">
                <svg width="440" height="70" viewBox="0 0 440 70" class="overflow-visible">
                  <line x1="220" y1="0" x2="220" y2="18" stroke="#CBD5E1" stroke-width="2" />
                  <circle cx="220" cy="18" r="5" fill={TEAL} />
                  <text x="220" y="14" text-anchor="middle" font-size="7" fill={TEAL} font-weight="700" font-family="sans-serif">分流</text>
                  <path d="M220,18 C220,40 120,40 120,62" fill="none" stroke={AMBER} stroke-width="2.5" />
                  <polygon points="116,58 120,68 124,58" fill={AMBER} />
                  <text x="152" y="38" font-size="9" fill={AMBER} font-weight="700" font-family="sans-serif">融资者</text>
                  <path d="M220,18 C220,40 320,40 320,62" fill="none" stroke={INDIGO} stroke-width="2.5" />
                  <polygon points="316,58 320,68 324,58" fill={INDIGO} />
                  <text x="278" y="38" font-size="9" fill={INDIGO} font-weight="700" font-family="sans-serif">投资者</text>
                </svg>
              </div>
            </div>

            {/* ====== TWO PARALLEL PATHS (top half) ====== */}
            <div class="flex justify-center gap-6 sm:gap-12">
              {/* LEFT: Borrower - 申请通 */}
              <div class="flex flex-col items-center" style="width: 200px;">
                <div class="text-center mb-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-bold rounded-full border border-amber-200">
                    <i class="fas fa-upload mr-1"></i>融资者路径
                  </span>
                </div>
                <div 
                  class="bg-white rounded-xl px-4 py-4 text-center cursor-pointer card-hover shadow-sm border-2 border-amber-300 w-full"
                  onclick="window.location.href='/application'"
                >
                  <div class="flex items-center justify-center gap-2 mb-2">
                    <ProductLogoFlow name="申请通" englishShort="Application" size={28} />
                    <div>
                      <div class="text-sm font-bold text-black">Application</div>
                      <div class="text-[9px] text-gray-400">申请通</div>
                    </div>
                  </div>
                  <div class="text-[10px] text-gray-500 leading-relaxed">
                    整理 · 上传经营信息/数据<br/>
                    <span class="text-amber-500 font-semibold">生成标准化项目资料</span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Investor setup - 搭建筛子 */}
              <div class="flex flex-col items-center" style="width: 200px;">
                <div class="text-center mb-2">
                  <span class="inline-flex items-center px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-full border border-indigo-200">
                    <i class="fas fa-cog mr-1"></i>投资者搭建筛子
                  </span>
                </div>
                <div class="border-2 border-dashed border-indigo-300 rounded-xl px-3 py-3 bg-indigo-50/30 w-full text-center">
                  <div class="text-[9px] font-bold text-indigo-500 mb-2">
                    <i class="fas fa-robot mr-0.5"></i> 配置个性化AI筛选标准
                  </div>
                  <div class="text-[9px] text-indigo-400 leading-relaxed">
                    自定义投资偏好<br/>评估模型 + 风控规则<br/>
                    <span class="font-semibold">不设筛子 = 看全部项目</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ====== THE KEY: Data Pipeline — 申请通 → 评估通 → 风控通 → 机会通 ====== */}
            {/* This is the core visual: data from Application flows INTO Assess → Risk pipeline */}
            <div class="mt-6 mb-2">
              {/* Section label */}
              <div class="text-center mb-4">
                <span class="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-amber-50 via-indigo-50 to-emerald-50 text-gray-600 text-[10px] font-bold rounded-full border border-gray-200">
                  <i class="fas fa-long-arrow-alt-right mr-1.5 text-amber-500"></i>
                  数据筛选管道：申请通数据 → 经过评估通 → 经过风控通 → 进入机会通
                  <i class="fas fa-long-arrow-alt-right ml-1.5 text-emerald-500"></i>
                </span>
              </div>

              {/* Pipeline visual — horizontal flow */}
              <div class="bg-gradient-to-r from-amber-50/50 via-indigo-50/50 to-emerald-50/50 rounded-2xl border border-gray-200 p-4 sm:p-6 overflow-hidden">
                
                {/* Pipeline stages in a connected horizontal/responsive flow */}
                <div class="flex flex-col sm:flex-row items-stretch gap-0">

                  {/* Stage 1: 申请通数据输入 */}
                  <div class="flex-1 flex flex-col items-center sm:items-end justify-center px-2 py-3 sm:py-0">
                    <div class="text-center sm:text-right mb-2">
                      <span class="text-[9px] font-bold text-amber-500">
                        <i class="fas fa-database mr-0.5"></i>申请通数据
                      </span>
                    </div>
                    <div class="bg-amber-50 border border-amber-300 rounded-lg px-3 py-2 text-center w-full max-w-[140px]">
                      <div class="text-[10px] font-bold text-amber-700 mb-0.5">融资项目数据</div>
                      <div class="text-[8px] text-amber-500">财务流水 · 经营信息<br/>门店资料 · Pitch Deck</div>
                    </div>
                  </div>

                  {/* Arrow: data enters Assess */}
                  <div class="flex items-center justify-center px-1 py-2 sm:py-0">
                    <div class="sm:hidden w-px h-6 bg-amber-300"></div>
                    <svg class="hidden sm:block" width="36" height="24" viewBox="0 0 36 24">
                      <line x1="0" y1="12" x2="26" y2="12" stroke={AMBER} stroke-width="2" stroke-dasharray="4,3" />
                      <polygon points="24,7 34,12 24,17" fill={AMBER} />
                    </svg>
                    <svg class="sm:hidden" width="24" height="28" viewBox="0 0 24 28">
                      <line x1="12" y1="0" x2="12" y2="20" stroke={AMBER} stroke-width="2" stroke-dasharray="4,3" />
                      <polygon points="7,18 12,28 17,18" fill={AMBER} />
                    </svg>
                  </div>

                  {/* Stage 2: 评估通（筛子1） */}
                  <div class="flex-1 flex flex-col items-center justify-center px-1 py-2 sm:py-0">
                    <div 
                      class="bg-white rounded-xl px-3 py-3 text-center cursor-pointer card-hover shadow-sm border-2 border-indigo-300 w-full max-w-[160px] relative"
                      onclick="window.location.href='/assess'"
                    >
                      {/* Filter icon top-right */}
                      <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shadow-sm">
                        <i class="fas fa-filter text-white text-[8px]"></i>
                      </div>
                      <div class="flex items-center justify-center gap-1.5 mb-1">
                        <ProductLogoFlow name="评估通" englishShort="Assess" size={24} />
                        <div>
                          <div class="text-xs font-bold text-black">Assess</div>
                          <div class="text-[8px] text-gray-400">评估通</div>
                        </div>
                      </div>
                      <div class="text-[9px] text-indigo-500 font-semibold">筛子① 投资标准筛选</div>
                      <div class="text-[8px] text-gray-400 mt-0.5">量化评分 · 尽调分析</div>
                    </div>
                  </div>

                  {/* Arrow: Assess → Risk */}
                  <div class="flex items-center justify-center px-1 py-2 sm:py-0">
                    <svg class="hidden sm:block" width="30" height="24" viewBox="0 0 30 24">
                      <line x1="0" y1="12" x2="20" y2="12" stroke={INDIGO} stroke-width="2" opacity="0.5" />
                      <polygon points="18,7 28,12 18,17" fill={INDIGO} opacity="0.6" />
                    </svg>
                    <svg class="sm:hidden" width="24" height="28" viewBox="0 0 24 28">
                      <line x1="12" y1="0" x2="12" y2="20" stroke={INDIGO} stroke-width="2" opacity="0.5" />
                      <polygon points="7,18 12,28 17,18" fill={INDIGO} opacity="0.6" />
                    </svg>
                  </div>

                  {/* Stage 3: 风控通（筛子2） */}
                  <div class="flex-1 flex flex-col items-center justify-center px-1 py-2 sm:py-0">
                    <div 
                      class="bg-white rounded-xl px-3 py-3 text-center cursor-pointer card-hover shadow-sm border-2 border-indigo-300 w-full max-w-[160px] relative"
                      onclick="window.location.href='/risk'"
                    >
                      <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shadow-sm">
                        <i class="fas fa-shield-alt text-white text-[8px]"></i>
                      </div>
                      <div class="flex items-center justify-center gap-1.5 mb-1">
                        <ProductLogoFlow name="风控通" englishShort="Risk" size={24} />
                        <div>
                          <div class="text-xs font-bold text-black">Risk</div>
                          <div class="text-[8px] text-gray-400">风控通</div>
                        </div>
                      </div>
                      <div class="text-[9px] text-indigo-500 font-semibold">筛子② 风控标准筛选</div>
                      <div class="text-[8px] text-gray-400 mt-0.5">材料验真 · 合规审查</div>
                    </div>
                    {/* Reject branch hint */}
                    <div class="mt-1.5 flex items-center gap-1">
                      <svg width="16" height="12" viewBox="0 0 16 12"><path d="M8,0 L16,6 L8,12" fill="none" stroke="#EF4444" stroke-width="1" opacity="0.4"/></svg>
                      <span class="text-[8px] text-red-400">不通过 → 淘汰/补材料</span>
                    </div>
                  </div>

                  {/* Arrow: Risk → Opportunity (pass) */}
                  <div class="flex items-center justify-center px-1 py-2 sm:py-0">
                    <svg class="hidden sm:block" width="36" height="24" viewBox="0 0 36 24">
                      <line x1="0" y1="12" x2="26" y2="12" stroke={EMERALD} stroke-width="2.5" />
                      <polygon points="24,6 36,12 24,18" fill={EMERALD} />
                    </svg>
                    <div class="sm:hidden flex flex-col items-center">
                      <span class="text-[8px] text-emerald-500 font-bold mb-0.5">通过 ✓</span>
                      <svg width="24" height="28" viewBox="0 0 24 28">
                        <line x1="12" y1="0" x2="12" y2="20" stroke={EMERALD} stroke-width="2.5" />
                        <polygon points="6,18 12,28 18,18" fill={EMERALD} />
                      </svg>
                    </div>
                    <span class="hidden sm:block text-[8px] text-emerald-500 font-bold ml-[-32px] mt-[-20px] absolute">通过 ✓</span>
                  </div>

                  {/* Stage 4: 机会通（筛后结果） */}
                  <div class="flex-1 flex flex-col items-center sm:items-start justify-center px-2 py-3 sm:py-0">
                    <div 
                      class="bg-white rounded-xl px-3 py-3 text-center cursor-pointer card-hover shadow-md border-2 border-emerald-400 w-full max-w-[150px] relative"
                      onclick="window.location.href='/opportunity'"
                    >
                      <div class="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                        <i class="fas fa-check text-white text-[8px]"></i>
                      </div>
                      <div class="flex items-center justify-center gap-1.5 mb-1">
                        <ProductLogoFlow name="机会通" englishShort="Opportunity" size={24} />
                        <div>
                          <div class="text-xs font-bold text-black">Opportunity</div>
                          <div class="text-[8px] text-gray-400">机会通</div>
                        </div>
                      </div>
                      <div class="text-[9px] text-emerald-600 font-semibold">符合标准的项目</div>
                      <div class="text-[8px] text-gray-400 mt-0.5">投资者看板展现</div>
                    </div>
                    <div class="text-center sm:text-left mt-1.5 max-w-[150px]">
                      <span class="text-[8px] text-emerald-500 font-semibold">无筛子=展示全部项目</span>
                    </div>
                  </div>
                </div>

                {/* Pipeline narrative */}
                <div class="mt-4 pt-3 border-t border-gray-200/60 text-center">
                  <div class="text-[10px] text-gray-500 leading-relaxed">
                    <i class="fas fa-info-circle text-gray-400 mr-1"></i>
                    融资者上传的数据<strong class="text-amber-600">直接流入</strong>投资者搭建的评估通→风控通筛选管道，
                    <strong class="text-emerald-600">只有通过标准</strong>的项目才会出现在该投资者的机会通看板中
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow: Opportunity → Terms */}
            <div class="flex justify-center py-4">
              <div class="flex flex-col items-center">
                <span class="text-[9px] text-gray-400 mb-1">投资者选中项目 · 双方进入协同</span>
                <svg width="12" height="28" viewBox="0 0 12 28"><line x1="6" y1="0" x2="6" y2="22" stroke="#CBD5E1" stroke-width="2"/><polygon points="2,22 6,28 10,22" fill="#CBD5E1"/></svg>
              </div>
            </div>

            {/* === PHASE: 协同节点 — Terms (条款通) === */}
            <div class="flex flex-col items-center mb-2">
              <div class="text-center mb-2">
                <span class="inline-flex items-center px-2.5 py-0.5 bg-[#4ECDC4] text-white text-[9px] font-bold rounded-full">
                  <i class="fas fa-handshake mr-1"></i>Y型汇合 · 投融资协同
                </span>
              </div>
              <div 
                class="bg-white rounded-xl px-6 py-4 text-center cursor-pointer card-hover shadow-sm border-2 border-[#4ECDC4] w-56"
                onclick="window.location.href='/terms'"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <ProductLogoFlow name="条款通" englishShort="Terms" size={28} />
                  <div>
                    <div class="text-sm font-bold text-black">Terms</div>
                    <div class="text-[9px] text-gray-400">条款通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">收入分成方案 · 条款协商</div>
              </div>
            </div>

            {/* Arrow down */}
            <div class="flex justify-center py-2">
              <svg width="12" height="24" viewBox="0 0 12 24"><line x1="6" y1="0" x2="6" y2="18" stroke="#CBD5E1" stroke-width="2"/><polygon points="2,18 6,24 10,18" fill="#CBD5E1"/></svg>
            </div>

            {/* === Contract === */}
            <div class="flex flex-col items-center mb-2">
              <div 
                class="bg-white rounded-xl px-6 py-4 text-center cursor-pointer card-hover shadow-sm border-2 border-[#4ECDC4] w-56"
                onclick="window.location.href='/contract'"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <ProductLogoFlow name="合约通" englishShort="Contract" size={28} />
                  <div>
                    <div class="text-sm font-bold text-black">Contract</div>
                    <div class="text-[9px] text-gray-400">合约通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">电子合约签署 · 双方协同</div>
              </div>
            </div>

            {/* Arrow down */}
            <div class="flex justify-center py-2">
              <svg width="12" height="24" viewBox="0 0 12 24"><line x1="6" y1="0" x2="6" y2="18" stroke="#CBD5E1" stroke-width="2"/><polygon points="2,18 6,24 10,18" fill="#CBD5E1"/></svg>
            </div>

            {/* === Settlement === */}
            <div class="flex flex-col items-center mb-2">
              <div 
                class="bg-white rounded-xl px-6 py-4 text-center cursor-pointer card-hover shadow-sm border border-gray-200 w-56"
                onclick="window.location.href='/settlement'"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <ProductLogoFlow name="结算通" englishShort="Settlement" size={28} />
                  <div>
                    <div class="text-sm font-bold text-black">Settlement</div>
                    <div class="text-[9px] text-gray-400">结算通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">收入分成自动结算</div>
              </div>
            </div>

            {/* Arrow down */}
            <div class="flex justify-center py-2">
              <svg width="12" height="24" viewBox="0 0 12 24"><line x1="6" y1="0" x2="6" y2="18" stroke="#CBD5E1" stroke-width="2"/><polygon points="2,18 6,24 10,18" fill="#CBD5E1"/></svg>
            </div>

            {/* === Performance === */}
            <div class="flex flex-col items-center mb-4">
              <div class="text-center mb-2">
                <span class="inline-flex items-center px-3 py-1 bg-red-50 text-red-500 text-[10px] font-bold rounded-full border border-red-200">
                  <i class="fas fa-flag-checkered mr-1"></i>投后管理
                </span>
              </div>
              <div 
                class="bg-white rounded-xl px-6 py-4 text-center cursor-pointer card-hover shadow-md border-2 border-red-200 w-56"
                onclick="window.location.href='/performance'"
              >
                <div class="flex items-center justify-center gap-2 mb-1">
                  <ProductLogoFlow name="履约通" englishShort="Performance" size={28} />
                  <div>
                    <div class="text-sm font-bold text-black">Performance</div>
                    <div class="text-[9px] text-gray-400">履约通</div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-400 mt-1">履约监控与数据追踪</div>
              </div>
            </div>

            {/* Flow summary bar */}
            <div class="mt-8 bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div class="text-center">
                <div class="text-xs font-bold text-gray-500 mb-4">Y型流程总结</div>
                {/* Top: Identity → fork */}
                <div class="flex items-center justify-center gap-1 text-[10px] mb-3">
                  <span class="px-2.5 py-1 rounded bg-blue-50 text-blue-600 font-bold border border-blue-200">
                    <i class="fas fa-sign-in-alt mr-0.5"></i>身份通
                  </span>
                  <span class="text-gray-300 mx-1">→ 分流 →</span>
                  <span class="px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[10px] border border-amber-200">融资者: 申请通(上传)</span>
                  <span class="text-gray-300 mx-0.5">+</span>
                  <span class="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 text-[10px] border border-indigo-200">投资者: 搭筛子</span>
                </div>
                {/* Middle: Pipeline */}
                <div class="flex items-center justify-center gap-1 text-[10px] mb-3 flex-wrap">
                  <span class="text-gray-400">申请通数据</span>
                  <span class="text-amber-400">→</span>
                  <span class="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 font-bold">
                    <i class="fas fa-filter mr-0.5 text-[8px]"></i>评估通
                  </span>
                  <span class="text-indigo-400">→</span>
                  <span class="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200 font-bold">
                    <i class="fas fa-shield-alt mr-0.5 text-[8px]"></i>风控通
                  </span>
                  <span class="text-emerald-400">→</span>
                  <span class="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold border border-emerald-200">
                    <i class="fas fa-check mr-0.5 text-[8px]"></i>机会通
                  </span>
                </div>
                {/* Bottom: Post-merge flow */}
                <div class="flex flex-wrap items-center justify-center gap-1 text-[10px]">
                  <span class="text-gray-400 mr-1">汇合 →</span>
                  {[
                    { name: '条款通', collab: true },
                    { name: '合约通', collab: true },
                    { name: '结算通', collab: false },
                    { name: '履约通', collab: false }
                  ].map((item, idx) => (
                    <div class="flex items-center">
                      <span class={`px-2 py-0.5 rounded ${item.collab ? 'bg-[#4ECDC4]/15 text-[#4ECDC4] font-bold border border-[#4ECDC4]/30' : 'bg-white text-gray-600 border border-gray-200'}`}>
                        {item.name}
                      </span>
                      {idx < 3 && <span class="text-gray-300 mx-0.5">→</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview - 5-group layout */}
      <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-2xl font-extrabold text-black mb-2">架构总览</h2>
            <p class="text-sm text-gray-500">按Y型分流阶段分组的9个核心Agent</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {architectureGroups.map((group) => (
              <div class="space-y-3">
                <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-100 shadow-sm">
                  <i class={`fas ${group.icon} text-xs`} style={`color: ${group.color}`}></i>
                  <div class="flex-1 min-w-0">
                    <span class="text-xs font-bold text-black block truncate">{group.title}</span>
                    <span class="text-[9px] text-gray-400">{group.titleEn}</span>
                  </div>
                </div>

                {group.ids.map((id) => {
                  const p = products.find(pr => pr.id === id)!
                  return (
                    <div class="card-hover bg-white border border-gray-200 rounded-xl p-3 cursor-pointer" onclick={`window.location.href='/${p.id}'`}>
                      <div class="flex items-start gap-2">
                        <ProductLogoSmall name={p.name} englishShort={p.englishShort} size={40} />
                        <div class="flex-1 min-w-0">
                          <h3 class="text-xs font-bold text-black mb-0.5">{p.name}</h3>
                          <p class="text-[10px] text-gray-400">{p.englishShort}</p>
                        </div>
                      </div>
                      <div class="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1.5 flex-wrap">
                        <span class={`text-[9px] px-1.5 py-0.5 rounded-full border ${statusLabels[p.status].class}`}>
                          {statusLabels[p.status].text}
                        </span>
                        {p.isFilter && (
                          <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-500 border border-indigo-200 font-semibold">
                            <i class="fas fa-filter mr-0.5"></i>筛子
                          </span>
                        )}
                        {p.isCollaborative && (
                          <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] border border-[#4ECDC4]/20 font-semibold">
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
              <span class="text-sm font-semibold text-black tracking-wider">事件驱动 · AI筛子编排 · 双向赋能</span>
              <svg viewBox="0 0 20 20" width="12" height="12"><circle cx="10" cy="10" r="6" fill={TEAL} opacity="0.5"/></svg>
            </div>
            <div class="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
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
                <div class={`accordion-content ${idx === 1 ? 'open' : ''}`}>
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
          <p class="text-gray-500 mb-8">点击进入产品统一入口，体验9个"通"的完整功能</p>
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
