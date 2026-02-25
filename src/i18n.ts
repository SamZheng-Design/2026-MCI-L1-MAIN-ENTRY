// ═══════════════════════════════════════════════════════════════
// Micro Connect — Internationalization (i18n) Data Layer
// 
// 翻译标杆：Bloomberg Terminal / LSEG Refinitiv / MSCI / Stripe
// 金融语言原则：精准、专业、简洁、institutional-grade
// ═══════════════════════════════════════════════════════════════

export type Lang = 'zh' | 'en'

// 从URL获取语言（?lang=en）
export function getLangFromQuery(url: string): Lang {
  try {
    const u = new URL(url, 'http://localhost')
    const lang = u.searchParams.get('lang')
    if (lang === 'en') return 'en'
  } catch {}
  return 'zh'
}

// 为链接追加语言参数
export function langLink(href: string, lang: Lang): string {
  if (lang === 'zh') return href
  if (!href || href === '#') return href
  // 处理hash链接
  if (href.startsWith('#')) return href
  // 处理外部链接
  if (href.startsWith('http')) return href
  const sep = href.includes('?') ? '&' : '?'
  return `${href}${sep}lang=en`
}

// ─── 通用翻译 ───
export const t = {
  // Navbar
  nav: {
    home: { zh: '首页', en: 'Home' },
    product: { zh: '产品', en: 'Products' },
    about: { zh: '关于', en: 'About' },
    team: { zh: '团队', en: 'Team' },
    news: { zh: '动态', en: 'Insights' },
    contact: { zh: '联系', en: 'Contact' },
    demoRequest: { zh: '申请演示', en: 'Request Demo' },
    enterPlatform: { zh: '进入平台', en: 'Enter Platform' },
    enterProduct: { zh: '进入产品', en: 'Go to Product' },
    requestDemo: { zh: '申请演示', en: 'Request Demo' },
    // product dropdown
    designPhilosophy: { zh: '设计思路', en: 'Design Philosophy' },
    designPhilosophyDesc: { zh: 'Y型业务流程 · Agent架构设计', en: 'Y-Shape Workflow · Agent Architecture' },
    productPortal: { zh: '产品入口', en: 'Product Suite' },
    productPortalDesc: { zh: '9大超级Agent · 进入各产品', en: '9 Super Agents · Access Each Module' },
    productOverview: { zh: '产品概览', en: 'Product Overview' },
    productOverviewDesc: { zh: '5阶段产品矩阵总览', en: '5-Phase Product Matrix' },
    // mobile
    products: { zh: '产品', en: 'Products' },
  },

  // Footer
  footer: {
    brandDesc: {
      zh: '全球领先的收入分成融资(RBF)基础设施平台。通过9个AI超级Agent矩阵，为投资者和中小企业提供高效、透明、全生命周期的投融资解决方案。',
      en: 'The world\'s leading Revenue-Based Financing (RBF) infrastructure platform. Through a matrix of 9 AI Super Agents, we deliver efficient, transparent, full-lifecycle investment and financing solutions for investors and SMEs.'
    },
    sectionProducts: { zh: '产品', en: 'Products' },
    sectionCompany: { zh: '公司', en: 'Company' },
    sectionContact: { zh: '联系方式', en: 'Contact' },
    designPhilosophy: { zh: '设计思路', en: 'Design Philosophy' },
    productPortal: { zh: '产品入口', en: 'Product Suite' },
    apiDocs: { zh: 'API文档', en: 'API Documentation' },
    devCenter: { zh: '开发者中心', en: 'Developer Center' },
    helpCenter: { zh: '帮助中心', en: 'Help Center' },
    aboutUs: { zh: '关于我们', en: 'About Us' },
    coreTeam: { zh: '核心团队', en: 'Leadership' },
    newsInsights: { zh: '新闻动态', en: 'News & Insights' },
    investorRelations: { zh: '投资者关系', en: 'Investor Relations' },
    contactUs: { zh: '联系我们', en: 'Contact Us' },
    disclaimer: {
      zh: '免责声明：本平台所展示内容仅供信息参考，不构成任何投资建议、要约或邀约。收入分成融资产品具有投资风险，过往表现不代表未来收益。投资者应充分了解相关风险并在独立判断后自主决策。Micro Connect Group受相关司法管辖区金融监管机构监管。',
      en: 'Disclaimer: The content displayed on this platform is for informational purposes only and does not constitute investment advice, an offer, or a solicitation. Revenue-based financing products carry investment risks; past performance does not guarantee future returns. Investors should fully understand the associated risks and make independent decisions. Micro Connect Group is regulated by financial regulatory authorities in relevant jurisdictions.'
    },
    privacyPolicy: { zh: '隐私政策', en: 'Privacy Policy' },
    termsOfService: { zh: '服务条款', en: 'Terms of Service' },
    cookieSettings: { zh: 'Cookie设置', en: 'Cookie Settings' },
    compliance: { zh: '合规声明', en: 'Compliance' },
  },

  // Homepage
  home: {
    // Hero
    heroBadge: { zh: 'Revenue-Based Financing Infrastructure', en: 'Revenue-Based Financing Infrastructure' },
    heroTitle1: { zh: '收入分成投资的', en: 'Infrastructure-Grade' },
    heroTitle2: { zh: '基础设施级平台', en: 'RBF Investment Platform' },
    heroSubtitle1: { zh: '一条主线 · 五个阶段 · 九大Agent', en: 'One Pipeline · Five Phases · Nine Agents' },
    heroSubtitle2: { zh: '用叙事的方式，了解一笔投资的完整旅程', en: 'A narrative journey through the full investment lifecycle' },
    heroCtaPrimary: { zh: '从身份通开始', en: 'Start with Identity Connect' },
    heroCtaSecondary: { zh: '了解完整旅程', en: 'Explore the Full Journey' },
    stat1: { zh: '流程阶段', en: 'Phases' },
    stat2: { zh: 'AI Agents', en: 'AI Agents' },
    stat3: { zh: '个性化筛选', en: 'Custom Screening' },
    stat4: { zh: '行业覆盖', en: 'Industry Coverage' },

    // Welcome modal
    welcomeSlide1Title: { zh: '收入分成投资的操作系统', en: 'Revenue-Based Financing OS' },
    welcomeSlide1Content: {
      zh: '滴灌通打造了全球首个收入分成投资的统一操作系统。不按赛道造轮子，而是用9个AI超级Agent覆盖投资全生命周期——从身份认证到投后管理，一套架构适配一切行业。',
      en: 'Micro Connect has built the world\'s first unified operating system for revenue-based financing. Rather than building vertical solutions by sector, 9 AI Super Agents cover the entire investment lifecycle — from identity verification to post-investment management — one architecture for all industries.'
    },
    welcomeSlide2Title: { zh: 'Y型架构 · 双角色分流', en: 'Y-Shape Architecture · Dual-Role Routing' },
    welcomeSlide2Content: {
      zh: '身份通是唯一入口：所有用户统一认证后，投资者和融资者自动分流至专属路径。融资者上传数据，投资者搭建AI筛子——两条路径在条款协商时精准汇合，形成Y型闭环。',
      en: 'Identity Connect serves as the single entry point: all users authenticate through a unified gateway, then investors and borrowers are automatically routed to their respective workflows. Borrowers upload data; investors configure AI screening criteria — the two paths converge precisely at deal negotiation, forming a Y-shaped closed loop.'
    },
    welcomeSlide3Title: { zh: 'AI筛子 · 个性化投资过滤', en: 'AI Screening · Personalized Investment Filtering' },
    welcomeSlide3Content: {
      zh: '评估通和风控通是投资者的个性化AI代理——自定义投资标准、风控规则，系统自动在海量项目中执行筛选。通过筛子的项目才出现在机会通看板上，实现精准匹配。',
      en: 'Assess Connect and Risk Connect function as personalized AI agents for investors — custom investment criteria and risk parameters are configured, and the system automatically screens across the entire deal pipeline. Only opportunities passing all filters appear on the Opportunity Connect dashboard, enabling precision matching.'
    },
    welcomeSlide4Title: { zh: '全流程闭环 · 投后透明', en: 'Full-Lifecycle Closure · Post-Investment Transparency' },
    welcomeSlide4Content: {
      zh: '从条款协商（条款通）到电子签约（合约通），从自动结算（结算通）到实时监控（履约通）——投后不再是黑箱，每笔收入分成清清楚楚。',
      en: 'From term sheet negotiation (Terms Connect) to digital execution (Contract Connect), from automated settlement (Settlement Connect) to real-time monitoring (Performance Connect) — post-investment is no longer a black box, with every revenue-share transaction fully transparent.'
    },
    welcomeNextBtn: { zh: '下一步', en: 'Next' },
    welcomeExploreBtn: { zh: '开始探索', en: 'Get Started' },
    welcomeDesignStory: { zh: '设计背后的故事', en: 'The Story Behind Our Design' },

    // Flow overview
    flowBadge: { zh: 'The Journey', en: 'The Journey' },
    flowTitle: { zh: '一笔投资的完整旅程', en: 'The Complete Investment Journey' },
    flowSubtitle: { zh: '从身份认证到投后管理，五个阶段串联九大Agent', en: 'From identity verification to post-investment management — five phases, nine Agents' },

    // Narrative sections
    sec1Eyebrow: { zh: 'STEP 01', en: 'STEP 01' },
    sec1Title: { zh: '一切从身份开始', en: 'It All Starts with Identity' },
    sec1Subtitle: {
      zh: '身份通是唯一入口 — 所有用户统一认证后，系统自动识别角色，分流至投资者或融资者专属路径',
      en: 'Identity Connect is the single gateway — all users authenticate through a unified entry, then the system automatically identifies roles and routes to dedicated investor or borrower pathways'
    },
    sec1Feat1: { zh: '统一认证入口', en: 'Unified Authentication' },
    sec1Feat2: { zh: '智能角色分流', en: 'Intelligent Role Routing' },
    sec1Feat3: { zh: '多因素安全认证', en: 'Multi-Factor Security' },

    sec2Eyebrow: { zh: 'STEP 02 · BORROWER', en: 'STEP 02 · BORROWER' },
    sec2Title: { zh: '融资者上传数据', en: 'Borrowers Upload Operating Data' },
    sec2Subtitle: {
      zh: '融资企业通过申请通整理经营信息、上传数据，系统自动生成标准化Pitch Deck，让项目进入投资者的筛选池',
      en: 'Borrowers organize and upload business data through Application Connect. The system auto-generates a standardized pitch deck, feeding the project into investor screening pipelines'
    },
    sec2Feat1: { zh: '经营数据标准化', en: 'Data Standardization' },
    sec2Feat2: { zh: 'AI生成Pitch Deck', en: 'AI-Generated Pitch Deck' },
    sec2Feat3: { zh: '精准曝光给投资者', en: 'Targeted Investor Exposure' },

    sec3Eyebrow: { zh: 'STEP 03 · INVESTOR', en: 'STEP 03 · INVESTOR' },
    sec3Title: { zh: '投资者搭建AI筛子', en: 'Investors Build AI Screening Filters' },
    sec3Subtitle: {
      zh: '每位投资者可自定义评估标准和风控规则 — 评估通和风控通作为个性化AI代理，在海量项目中精准筛选',
      en: 'Each investor defines custom assessment criteria and risk parameters — Assess Connect and Risk Connect serve as personalized AI agents, precision-screening across the entire deal pipeline'
    },
    sec3Feat1: { zh: '自定义投资标准', en: 'Custom Investment Criteria' },
    sec3Feat2: { zh: 'AI量化评估+风控', en: 'AI Quantitative Assessment & Risk' },
    sec3Feat3: { zh: '筛后机会看板', en: 'Filtered Opportunity Dashboard' },

    sec4Eyebrow: { zh: 'STEP 04 · DEAL', en: 'STEP 04 · DEAL EXECUTION' },
    sec4Title: { zh: '双方协同达成交易', en: 'Collaborative Deal Execution' },
    sec4Subtitle: {
      zh: 'Y型路径在此汇合 — 条款通自动生成分成方案供双方协商，合约通完成电子签署，全流程线上闭环',
      en: 'The Y-shaped paths converge here — Terms Connect auto-generates revenue-share proposals for bilateral negotiation, Contract Connect handles digital execution — full online closed loop'
    },
    sec4Feat1: { zh: '智能条款生成', en: 'Intelligent Term Generation' },
    sec4Feat2: { zh: '在线协商签署', en: 'Online Negotiation & Execution' },
    sec4Feat3: { zh: '法律合规保障', en: 'Legal & Compliance Assurance' },

    sec5Eyebrow: { zh: 'STEP 05 · POST-INVESTMENT', en: 'STEP 05 · POST-INVESTMENT' },
    sec5Title: { zh: '投后不再是黑箱', en: 'Post-Investment Transparency' },
    sec5Subtitle: {
      zh: '结算通自动执行收入分成，履约通实时监控经营数据 — 每笔分成清清楚楚，每个预警及时触达',
      en: 'Settlement Connect automates revenue-share distributions; Performance Connect provides real-time operational monitoring — every distribution fully transparent, every alert delivered promptly'
    },
    sec5Feat1: { zh: '自动分成结算', en: 'Automated Revenue Settlement' },
    sec5Feat2: { zh: '实时履约监控', en: 'Real-Time Performance Monitoring' },
    sec5Feat3: { zh: '智能预警系统', en: 'Intelligent Alert System' },

    // Dual channel
    dualBadge: { zh: 'Dual Channel', en: 'Dual Channel' },
    dualTitle: { zh: '两条路径，一个平台', en: 'Two Paths, One Platform' },
    dualSubtitle: { zh: '通过身份通注册后，投资者和融资企业各有专属智能工具链', en: 'After authenticating via Identity Connect, investors and borrowers each access their dedicated intelligent toolchain' },
    investorTitle: { zh: '投资者', en: 'Investors' },
    investorSubtitle: { zh: 'Investor Platform', en: 'Investor Platform' },
    investorFeat1Title: { zh: '个性化AI评估', en: 'Personalized AI Assessment' },
    investorFeat1Desc: { zh: '自定义评估模型和风控规则', en: 'Custom evaluation models and risk parameters' },
    investorFeat2Title: { zh: '智能机会看板', en: 'Smart Opportunity Dashboard' },
    investorFeat2Desc: { zh: '经AI筛选的优质项目一览', en: 'AI-curated pipeline of qualified opportunities' },
    investorFeat3Title: { zh: '投后全透明', en: 'Full Post-Investment Visibility' },
    investorFeat3Desc: { zh: '自动结算 + 实时履约监控', en: 'Automated settlement + real-time performance tracking' },
    investorCta: { zh: '注册身份通，开启投资路径', en: 'Register via Identity Connect to begin investing' },
    borrowerTitle: { zh: '融资企业', en: 'Borrowers' },
    borrowerSubtitle: { zh: 'Business Platform', en: 'Business Platform' },
    borrowerFeat1Title: { zh: '智能申请助手', en: 'Intelligent Application Assistant' },
    borrowerFeat1Desc: { zh: '自动整理经营数据生成Pitch Deck', en: 'Auto-organize operating data into a pitch deck' },
    borrowerFeat2Title: { zh: '精准曝光', en: 'Targeted Exposure' },
    borrowerFeat2Desc: { zh: '标准化数据进入投资者筛选池', en: 'Standardized data enters investor screening pipelines' },
    borrowerFeat3Title: { zh: '灵活分成模式', en: 'Flexible Revenue-Share Model' },
    borrowerFeat3Desc: { zh: '有收入才分配，与经营绑定', en: 'Pay only when revenue is generated — aligned with performance' },
    borrowerCta: { zh: '注册身份通，开启融资路径', en: 'Register via Identity Connect to start fundraising' },

    // Foundation
    foundBadge: { zh: 'Foundation', en: 'Foundation' },
    foundTitle: { zh: '不只是工具，是投资基础设施', en: 'Not Just Tools — Investment Infrastructure' },
    foundSubtitle: { zh: '三层统一底座确保九大Agent共享数据、协同运作', en: 'Three unified foundation layers ensure all nine Agents share data and operate in concert' },
    foundDesignLink: { zh: '产品设计背后的故事', en: 'The Story Behind Our Design' },
    foundPortalLink: { zh: '完整产品入口', en: 'Full Product Suite' },

    // CTA
    ctaBadge: { zh: '从身份通开始', en: 'Start with Identity Connect' },
    ctaTitle1: { zh: '收入分成投资的未来', en: 'The Future of' },
    ctaTitle2: { zh: '从这里开始', en: 'Revenue-Based Investing Starts Here' },
    ctaSubtitle: {
      zh: '无论您是机构投资者、个人投资者还是融资企业，\n注册身份通即可开启全流程闭环体验',
      en: 'Whether you are an institutional investor, individual investor, or borrower,\nregister through Identity Connect to experience the full lifecycle'
    },
    ctaPrimary: { zh: '立即注册身份通', en: 'Register with Identity Connect' },
    ctaSecondary: { zh: '联系我们', en: 'Contact Us' },

    // Illustrations
    illustInvestor: { zh: '投资者', en: 'Investor' },
    illustBorrower: { zh: '融资者', en: 'Borrower' },
    illustDataUpload: { zh: '经营数据上传', en: 'Operating Data Upload' },
    illustAutoProcess: { zh: '自动标准化处理', en: 'Automated Standardization' },
    illustFinancialFlow: { zh: '财务流水', en: 'Financial Statements' },
    illustPosData: { zh: 'POS数据', en: 'POS Data' },
    illustStoreInfo: { zh: '门店信息', en: 'Store Information' },
    illustPitchDeck: { zh: 'AI Pitch Deck 生成', en: 'AI Pitch Deck Generation' },
    illustAssess: { zh: '评估通', en: 'Assess' },
    illustRisk: { zh: '风控通', en: 'Risk' },
    illustOpportunity: { zh: '机会通', en: 'Opportunity' },
    illustFilter1: { zh: 'AI筛子 1', en: 'AI Filter 1' },
    illustFilter2: { zh: 'AI筛子 2', en: 'AI Filter 2' },
    illustFilteredBoard: { zh: '筛后看板', en: 'Filtered Board' },
    illustProjects: { zh: '融资项目', en: 'Deal Pipeline' },
    illustDualScreen: { zh: '双重筛选', en: 'Dual Screening' },
    illustPreciseMatch: { zh: '精准匹配', en: 'Precise Match' },
    illustDealMaking: { zh: 'Deal Making', en: 'Deal Making' },
    illustCollaborative: { zh: '协同', en: 'Collaborative' },
    illustTerms: { zh: '条款通', en: 'Terms' },
    illustTermsDesc: { zh: '分成方案 · 在线协商', en: 'Share Scheme · Online Negotiation' },
    illustContract: { zh: '合约通', en: 'Contract' },
    illustContractDesc: { zh: '电子签署 · 法律合规', en: 'Digital Execution · Legal Compliance' },
    illustBothComplete: { zh: '投融资双方协同完成', en: 'Bilateral Collaborative Completion' },
    illustPostPanel: { zh: '投后管理面板', en: 'Post-Investment Dashboard' },
    illustRecent10: { zh: '近10期结算', en: 'Last 10 Settlements' },
    illustSettlement: { zh: '结算通', en: 'Settlement' },
    illustPerformance: { zh: '履约通', en: 'Performance' },

    // Splash screen
    splashLine4: { zh: '看见世界的机会', en: 'See Global Opportunities' },
  },

  // Portal page
  portal: {
    badge: { zh: 'Product Suite', en: 'Product Suite' },
    title: { zh: '九大', en: 'Nine' },
    titleHighlight: { zh: '「通」', en: '"Connects"' },
    subtitle: { zh: '选择你所处的阶段，进入对应产品', en: 'Select your current phase and access the corresponding module' },
    foundationLabel: { zh: '统一底座 · Foundation', en: 'Unified Foundation' },
    nextPhase: { zh: '下一阶段', en: 'Next Phase' },
    // phase labels
    phaseEntry: { zh: '入口', en: 'Entry' },
    phaseBorrower: { zh: '融资者', en: 'Borrower' },
    phaseInvestor: { zh: '投资者', en: 'Investor' },
    phaseDeal: { zh: '交易', en: 'Deal' },
    phasePost: { zh: '投后', en: 'Post-Inv' },
    // phase descriptions
    phaseEntryDesc: { zh: '所有用户的统一起点', en: 'Unified starting point for all users' },
    phaseBorrowerDesc: { zh: '上传经营数据 · 生成标准化材料', en: 'Upload operating data · Generate standardized materials' },
    phaseInvestorDesc: { zh: '搭建AI筛子 · 精准发现机会', en: 'Build AI filters · Discover opportunities with precision' },
    phaseDealDesc: { zh: '条款协商 · 合约签署', en: 'Term negotiation · Contract execution' },
    phasePostDesc: { zh: '自动结算 · 履约监控', en: 'Automated settlement · Performance monitoring' },
  },

  // Design page
  design: {
    badge: { zh: 'Super Agent Architecture', en: 'Super Agent Architecture' },
    heroTitle1: { zh: '9个通如何串联成', en: 'How 9 Connects Form a' },
    heroTitle2: { zh: 'Super Agent', en: 'Super Agent' },
    heroSubtitle: {
      zh: '身份通统一入口 · Y型双角色分流 · 数据穿越AI筛子 · 协同汇合',
      en: 'Identity Connect unified entry · Y-shaped dual-role routing · Data traversing AI filters · Collaborative convergence'
    },
    yFlowBadge: { zh: 'Y型业务流程', en: 'Y-Shape Workflow' },
    yFlowTitle: { zh: '完整Y型业务流程', en: 'Complete Y-Shape Business Flow' },
    yFlowSubtitle: {
      zh: '身份通统一入口分流两个角色：融资者通过申请通上传数据，数据直接进入投资者搭建的评估通→风控通筛选管道，通过标准的项目进入机会通展现',
      en: 'Identity Connect routes two roles from a single entry: borrowers upload data via Application Connect, which flows directly into investor-configured Assess → Risk screening pipelines; qualifying deals surface on Opportunity Connect'
    },
    legendBorrower: { zh: '融资者路径', en: 'Borrower Path' },
    legendInvestor: { zh: '投资者路径', en: 'Investor Path' },
    legendDataPipe: { zh: '数据穿越管道', en: 'Data Traversal Pipeline' },
    legendCollaborative: { zh: '投融资双方协同', en: 'Bilateral Collaboration' },
    phase1: { zh: '统一入口', en: 'Unified Entry' },
    phase2a: { zh: '融资者路径', en: 'Borrower Path' },
    phase2b: { zh: '投资者搭建筛子', en: 'Investor Filter Setup' },
    phase2bInvestor: { zh: 'Investor', en: 'Investor' },
    investorConfigLabel: { zh: '投资者配置个性化AI筛选标准', en: 'Investors configure personalized AI screening criteria' },
    investorConfigDesc: {
      zh: '每个投资者可通过评估通和风控通搭建自己的筛选工作流。',
      en: 'Each investor can build their own screening workflow through Assess Connect and Risk Connect.'
    },
    investorConfigDesc2: {
      zh: '不设置任何筛子 = 在机会通看到所有融资项目。',
      en: 'No filters set = all borrower projects visible on Opportunity Connect.'
    },
    investorTag1: { zh: '自定义投资标准', en: 'Custom Investment Criteria' },
    investorTag2: { zh: '自定义风控规则', en: 'Custom Risk Parameters' },
    investorTag3: { zh: '核验方式', en: 'Verification Methods' },
    phase3: { zh: '数据筛选管道', en: 'Data Screening Pipeline' },
    phase3Desc: { zh: '申请通数据 → 评估通 → 风控通 → 机会通', en: 'Application Data → Assess → Risk → Opportunity' },
    pipelineDesc: {
      zh: '融资者在申请通上传的数据直接进入投资者搭建的评估通→风控通筛选管道。数据依次经过评估通（投资标准筛选）和风控通（风控标准筛选），只有通过全部标准的项目才会出现在该投资者的机会通看板上。不通过的项目会被淘汰或通知融资者补充材料。',
      en: 'Data uploaded by borrowers via Application Connect flows directly into investor-configured Assess → Risk screening pipelines. Data passes sequentially through Assess Connect (investment criteria screening) and Risk Connect (risk parameter screening); only projects meeting all standards appear on that investor\'s Opportunity Connect dashboard. Non-qualifying projects are rejected or borrowers are notified to supplement materials.'
    },
    dataFlowIn: { zh: '申请通数据流入', en: 'Application Data Inflow' },
    filter1: { zh: '筛子①', en: 'Filter ①' },
    assessPassed: { zh: '评估通过的项目继续流入 →', en: 'Projects passing assessment continue →' },
    filter2: { zh: '筛子②', en: 'Filter ②' },
    rejected: { zh: '不通过 → 淘汰/补材料', en: 'Rejected → Eliminated / Supplement Required' },
    passedAll: { zh: '通过全部标准 → 进入机会通展现', en: 'All criteria met → Enters Opportunity Connect' },
    investorBoard: { zh: '投资者统一看板', en: 'Investor Unified Dashboard' },
    noFilterRule: { zh: '无筛子 = 展示全部融资项目', en: 'No filters = All borrower projects displayed' },
    yMerge: { zh: 'Y型汇合 · 投融资双方协同', en: 'Y-Shape Convergence · Bilateral Collaboration' },
    phase4: { zh: '交易达成', en: 'Deal Execution' },
    phase4Label: { zh: '投融资双方协同', en: 'Bilateral Collaboration' },
    phase5: { zh: '投后管理', en: 'Post-Investment Management' },
    // architecture overview
    archTitle: { zh: '架构总览', en: 'Architecture Overview' },
    archSubtitle: { zh: '按Y型分流阶段分组的9个核心Agent', en: '9 Core Agents grouped by Y-shape routing phase' },
    // foundation
    foundTitle: { zh: '统一底座（基础设施层）', en: 'Unified Foundation (Infrastructure Layer)' },
    foundSubtitle: { zh: 'Unified Foundation Layer', en: 'Unified Foundation Layer' },
    foundShared: { zh: '所有Agent共用', en: 'Shared by All Agents' },
    // design thinking
    designTitle: { zh: '核心设计思路', en: 'Core Design Thinking' },
    designSubtitle: { zh: '从理念到架构的完整思考过程', en: 'Complete thought process from concept to architecture' },
    // CTA
    ctaTitle: { zh: '准备好探索超级Agent产品矩阵了吗？', en: 'Ready to Explore the Super Agent Product Matrix?' },
    ctaSubtitle: { zh: '点击进入产品统一入口，体验9个"通"的完整功能', en: 'Enter the unified product portal to experience the full capabilities of all 9 Connects' },
    ctaPrimary: { zh: '进入产品入口', en: 'Enter Product Suite' },
    ctaSecondary: { zh: '下载产品白皮书', en: 'Download Whitepaper' },
    // connection layer
    connLabel: { zh: '事件驱动 · AI筛子编排 · 双向赋能', en: 'Event-Driven · AI Filter Orchestration · Bilateral Empowerment' },
    // AI filter badge
    aiFilter: { zh: 'AI筛子', en: 'AI Filter' },
    filterLabel: { zh: '筛子', en: 'Filter' },
    collaborative: { zh: '协同', en: 'Collaborative' },
  },

  // About page
  about: {
    badge: { zh: 'About Us', en: 'About Us' },
    title: { zh: '关于我们', en: 'About Us' },
    subtitle: { zh: '用技术重新定义收入分成投资，让优质资本精准流向最需要的地方', en: 'Redefining revenue-based investing through technology, channeling quality capital precisely where it is needed most' },
    missionTitle: { zh: '使命', en: 'Mission' },
    missionDesc: {
      zh: '通过AI超级Agent矩阵，打破传统收入分成投资中的信息不对称和效率瓶颈，让每一笔资本都能精准找到最优质的投资标的。',
      en: 'Through our AI Super Agent matrix, we break down information asymmetry and efficiency bottlenecks in traditional revenue-based investing, enabling every unit of capital to precisely locate the highest-quality investment opportunities.'
    },
    visionTitle: { zh: '愿景', en: 'Vision' },
    visionDesc: {
      zh: '成为全球收入分成融资领域的基础设施级平台，让RBF投资像在交易所买卖股票一样标准化、透明化、高效化。',
      en: 'To become the infrastructure-grade platform for global revenue-based financing, making RBF investing as standardized, transparent, and efficient as trading securities on an exchange.'
    },
    stat1: { zh: 'AI超级Agent', en: 'AI Super Agents' },
    stat1Suffix: { zh: '个', en: '' },
    stat2: { zh: '业务流程阶段', en: 'Workflow Phases' },
    stat2Suffix: { zh: '大', en: '' },
    stat3: { zh: '全流程在线化', en: 'Full Process Digitized' },
    stat3Suffix: { zh: '%', en: '%' },
    stat4: { zh: '行业覆盖', en: 'Industry Coverage' },
    milestonesTitle: { zh: '发展历程', en: 'Milestones' },
    m1Year: { zh: '2024', en: '2024' }, m1Title: { zh: '平台创立', en: 'Platform Founded' }, m1Desc: { zh: '核心团队组建，完成产品架构设计与核心技术预研。', en: 'Core team assembled; product architecture design and key technology R&D completed.' },
    m2Year: { zh: '2025', en: '2025' }, m2Title: { zh: '产品Beta上线', en: 'Beta Launch' }, m2Desc: { zh: '身份通、风控通、合约通率先上线Beta版本，开始对接首批机构合作伙伴。', en: 'Identity Connect, Risk Connect, and Contract Connect launched in beta; onboarding of first institutional partners began.' },
    m3Year: { zh: '2026', en: '2026' }, m3Title: { zh: '全面商用化', en: 'Full Commercial Launch' }, m3Desc: { zh: '9个Agent产品矩阵全面推出，覆盖RBF投资全生命周期。', en: 'Full 9-Agent product matrix launched, covering the entire RBF investment lifecycle.' },
    valuesTitle: { zh: '核心价值观', en: 'Core Values' },
    v1Title: { zh: '技术驱动', en: 'Technology-Driven' }, v1Desc: { zh: 'AI + 数据，让每个环节都更智能', en: 'AI + Data — intelligence at every stage' },
    v2Title: { zh: '合规透明', en: 'Compliance & Transparency' }, v2Desc: { zh: '全流程可追溯，数据全透明', en: 'Full-process traceability, complete data transparency' },
    v3Title: { zh: '双向赋能', en: 'Bilateral Empowerment' }, v3Desc: { zh: '投资者和融资者各取所需', en: 'Investors and borrowers each get what they need' },
    v4Title: { zh: '无限扩展', en: 'Infinite Scalability' }, v4Desc: { zh: '通用架构，行业覆盖无上限', en: 'Universal architecture, unlimited industry coverage' },
  },

  // Team page
  team: {
    badge: { zh: 'Our Team', en: 'Our Team' },
    title: { zh: '核心团队', en: 'Leadership' },
    subtitle: { zh: '汇聚金融、科技、产品三大领域的资深专业人才', en: 'Seasoned professionals across finance, technology, and product' },
    managementTitle: { zh: '管理团队', en: 'Management Team' },
    advisorsTitle: { zh: '顾问团队', en: 'Advisory Board' },
    joinTitle: { zh: '加入我们', en: 'Join Us' },
    joinDesc: { zh: '我们正在寻找对金融科技充满热情的人才。如果你想用技术改变投资行业，欢迎联系。', en: 'We are looking for passionate fintech talent. If you want to transform the investment industry through technology, we\'d love to hear from you.' },
    joinCta: { zh: '联系我们', en: 'Contact Us' },
    // members
    m1Name: { zh: '创始人 / CEO', en: 'Founder / CEO' },
    m1Desc: { zh: '深耕金融科技领域十余年，曾主导多个大型金融基础设施项目的架构设计与交付。', en: 'Over a decade in fintech, having led architecture design and delivery of major financial infrastructure projects.' },
    m2Name: { zh: '联合创始人 / CTO', en: 'Co-Founder / CTO' },
    m2Desc: { zh: '全栈技术专家，专注于AI/ML与分布式系统架构，推动Agent矩阵核心技术研发。', en: 'Full-stack technologist specializing in AI/ML and distributed systems architecture, driving core Agent matrix R&D.' },
    m3Name: { zh: '首席投资官', en: 'Chief Investment Officer' },
    m3Desc: { zh: '资深投资管理人，横跨PE/VC与另类投资，具备丰富的RBF与结构化融资经验。', en: 'Seasoned investment professional spanning PE/VC and alternative investments, with extensive RBF and structured finance experience.' },
    m4Name: { zh: '首席产品官', en: 'Chief Product Officer' },
    m4Desc: { zh: '前头部金融科技公司产品负责人，擅长复杂金融产品的用户体验设计与流程优化。', en: 'Former product lead at a top fintech firm, expert in UX design and workflow optimization for complex financial products.' },
    a1Name: { zh: '战略顾问', en: 'Strategic Advisor' },
    a1Desc: { zh: '前国际投行高管，在资本市场与金融监管领域拥有深厚资源。', en: 'Former senior executive at a global investment bank, with deep resources in capital markets and financial regulation.' },
    a2Name: { zh: '技术顾问', en: 'Technical Advisor' },
    a2Desc: { zh: '知名AI科学家，曾任大型科技公司AI实验室负责人。', en: 'Renowned AI scientist, formerly head of an AI research lab at a major technology company.' },
  },

  // News page
  news: {
    badge: { zh: 'News & Insights', en: 'News & Insights' },
    title: { zh: '新闻动态', en: 'News & Insights' },
    subtitle: { zh: '最新产品进展、战略合作与行业洞察', en: 'Latest product updates, strategic partnerships, and industry insights' },
    readMore: { zh: '阅读全文', en: 'Read More' },
    subscribeTitle: { zh: '订阅动态', en: 'Subscribe' },
    subscribeDesc: { zh: '获取最新的产品更新、行业洞察和合作机会', en: 'Receive the latest product updates, industry insights, and partnership opportunities' },
    subscribeCta: { zh: '联系我们获取订阅', en: 'Contact Us to Subscribe' },
    // news items
    n1Cat: { zh: '产品动态', en: 'Product Update' },
    n1Title: { zh: '全线9个Agent产品矩阵正式开放商用', en: 'Full 9-Agent Product Matrix Now Open for Commercial Use' },
    n1Summary: { zh: '经过一年的Beta测试与迭代优化，滴灌通超级Agent平台全线产品正式面向机构投资者和融资企业开放，覆盖RBF投资全生命周期。', en: 'After a year of beta testing and iterative optimization, the full Micro Connect Super Agent platform is now open to institutional investors and borrowers, covering the entire RBF investment lifecycle.' },
    n2Cat: { zh: '战略合作', en: 'Strategic Partnership' },
    n2Title: { zh: '与多家国际资管机构达成战略合作', en: 'Strategic Partnerships Established with Multiple International Asset Managers' },
    n2Summary: { zh: '平台已与多家亚太区知名资管机构建立深度合作关系，共同拓展收入分成融资在连锁零售、餐饮等消费赛道的应用。', en: 'The platform has established deep partnerships with leading Asia-Pacific asset managers, jointly expanding RBF applications in chain retail, F&B, and other consumer sectors.' },
    n3Cat: { zh: '技术创新', en: 'Technology Innovation' },
    n3Title: { zh: 'AI筛选引擎升级：支持投资者个性化评估模型', en: 'AI Screening Engine Upgrade: Personalized Investor Assessment Models Now Supported' },
    n3Summary: { zh: '评估通和风控通完成重大技术升级，投资者可自定义AI评估模型和风控规则，实现真正的个性化项目筛选。', en: 'Assess Connect and Risk Connect have completed major technical upgrades, enabling investors to define custom AI assessment models and risk parameters for truly personalized deal screening.' },
    n4Cat: { zh: '行业洞察', en: 'Industry Insight' },
    n4Title: { zh: '收入分成融资(RBF)：2026行业趋势展望', en: 'Revenue-Based Financing (RBF): 2026 Industry Outlook' },
    n4Summary: { zh: '深入分析RBF在全球及中国市场的发展趋势、监管动向与技术创新方向，展望AI驱动的下一代投融资基础设施。', en: 'In-depth analysis of RBF development trends, regulatory shifts, and technological innovation across global and China markets, looking ahead to AI-driven next-generation investment infrastructure.' },
  },

  // Contact page
  contact: {
    badge: { zh: 'Contact Us', en: 'Contact Us' },
    title: { zh: '联系我们', en: 'Contact Us' },
    subtitle: { zh: '无论您是投资者、融资企业还是潜在合作伙伴，我们期待与您对话', en: 'Whether you are an investor, borrower, or potential partner — we look forward to connecting with you' },
    investorTitle: { zh: '投资者咨询', en: 'Investor Inquiries' },
    investorDesc: { zh: '了解产品功能、申请产品演示、获取投资白皮书', en: 'Learn about product capabilities, request a demo, obtain the investor whitepaper' },
    investorCta: { zh: '预约演示', en: 'Schedule Demo' },
    businessTitle: { zh: '融资企业咨询', en: 'Borrower Inquiries' },
    businessDesc: { zh: '了解融资流程、提交融资申请、对接合作资源', en: 'Understand the financing process, submit applications, connect with partnership resources' },
    businessCta: { zh: '提交申请', en: 'Submit Application' },
    generalTitle: { zh: '一般查询', en: 'General Inquiries' },
    addressTitle: { zh: '办公地址', en: 'Office Address' },
    address: { zh: '香港中环康乐广场8号\n交易广场2期 2105-2108室', en: '8 Connaught Place, Central\nExchange Square Tower 2, Suite 2105-2108\nHong Kong' },
    hoursTitle: { zh: '工作时间', en: 'Business Hours' },
    hours: { zh: '周一至周五 9:00 - 18:00\n(HKT / GMT+8)', en: 'Monday – Friday 9:00 – 18:00\n(HKT / GMT+8)' },
    socialTitle: { zh: '关注我们', en: 'Follow Us' },
  },

  // Placeholder page
  placeholder: {
    breadHome: { zh: '首页', en: 'Home' },
    breadPortal: { zh: '产品入口', en: 'Product Suite' },
    featuresTitle: { zh: '核心功能', en: 'Core Capabilities' },
    comingSoon: { zh: '功能开发中', en: 'Under Development' },
    comingSoonDesc: {
      zh: '正在紧锣密鼓地开发中，敬请期待完整功能上线。',
      en: 'is currently under active development. Stay tuned for full feature release.'
    },
    backToPortal: { zh: '返回产品入口', en: 'Back to Product Suite' },
    prevStep: { zh: '上一步', en: 'Previous' },
    nextStep: { zh: '下一步', en: 'Next' },
  },

  // Data layer translations
  data: {
    statusLive: { zh: '已上线', en: 'Live' },
    statusBeta: { zh: 'Beta测试中', en: 'Beta' },
    statusComing: { zh: '即将上线', en: 'Coming Soon' },
    roleShared: { zh: '共用', en: 'Shared' },
    roleBorrower: { zh: '融资者', en: 'Borrower' },
    roleInvestor: { zh: '投资者', en: 'Investor' },
    roleCollaborative: { zh: '协同', en: 'Collaborative' },
    // product descriptions (English)
    identityDesc: { zh: '统一认证入口，所有用户先通过身份通认证，再根据角色（投资者/融资者）分流至不同路径', en: 'Unified authentication gateway. All users verify through Identity Connect first, then are routed to investor or borrower pathways based on their role.' },
    applicationDesc: { zh: '融资者的专属工具——整理、上传经营信息与数据，生成Pitch Deck，让项目信息标准化进入投资者的筛选池', en: 'The borrower\'s dedicated tool — organize and upload operating data, auto-generate pitch decks, and standardize project information for investor screening pipelines.' },
    assessDesc: { zh: '投资者的AI评估筛子——每个投资者可自定义投资标准和评估模型，自动对融资项目进行量化打分与尽调分析', en: 'The investor\'s AI assessment filter — each investor customizes investment criteria and evaluation models for automated quantitative scoring and due diligence analysis of borrower projects.' },
    riskDesc: { zh: '投资者的AI风控筛子——每个投资者可设置自己的风控标准与核验方式，自动对项目进行材料验真与合规审查', en: 'The investor\'s AI risk filter — each investor configures proprietary risk parameters and verification methods for automated document authentication and compliance review.' },
    opportunityDesc: { zh: '投资者的统一项目看板——展示通过评估通和风控通筛选后的融资项目。若未设置任何筛子，则展示所有融资项目', en: 'The investor\'s unified deal dashboard — displays borrower projects that pass both Assess and Risk screening. If no filters are configured, all borrower projects are displayed.' },
    termsDesc: { zh: '投融资双方协同节点——基于评估和风控结论，自动生成收入分成方案，双方在线协商条款', en: 'Bilateral collaboration node — auto-generates revenue-share proposals based on assessment and risk conclusions, enabling online term negotiation between both parties.' },
    contractDesc: { zh: '电子合约签署平台——投融资双方在线协同完成合约签署，具有法律效力', en: 'Digital contract execution platform — both parties collaboratively complete legally binding contract execution online.' },
    settlementDesc: { zh: '收入分成自动结算——透明化资金流转记录，按合约约定自动执行', en: 'Automated revenue-share settlement — transparent fund flow records, automatically executed per contractual terms.' },
    performanceDesc: { zh: '履约监控与数据追踪——实时掌握项目运营状况，预警机制保障投资安全', en: 'Performance monitoring and data tracking — real-time visibility into project operations, with alert mechanisms to safeguard investments.' },
    // product features (English)
    identityFeatures: { zh: ['统一认证', '角色识别', '投资者/融资者分流', '多因素认证', '账户安全'], en: ['Unified Authentication', 'Role Identification', 'Investor/Borrower Routing', 'Multi-Factor Auth', 'Account Security'] },
    applicationFeatures: { zh: ['材料整理', '数据上传', 'AI生成Pitch Deck', '信息标准化', '项目宣传'], en: ['Document Organization', 'Data Upload', 'AI Pitch Deck Generation', 'Data Standardization', 'Project Promotion'] },
    assessFeatures: { zh: ['自定义投资标准', 'AI量化评估', '尽调报告生成', '投资者个性化模型', '批量筛选'], en: ['Custom Investment Criteria', 'AI Quantitative Assessment', 'DD Report Generation', 'Personalized Models', 'Batch Screening'] },
    riskFeatures: { zh: ['自定义风控标准', '材料验真', '合规审查', '风险评分', '核验方式配置'], en: ['Custom Risk Parameters', 'Document Verification', 'Compliance Review', 'Risk Scoring', 'Verification Config'] },
    opportunityFeatures: { zh: ['筛后项目看板', '全量项目浏览', '项目对比', '投资意向标记', '智能推荐'], en: ['Filtered Deal Board', 'Full Pipeline Browse', 'Deal Comparison', 'Intent Marking', 'Smart Recommendations'] },
    termsFeatures: { zh: ['收入分成方案', '条款协商', '方案对比', '模拟测算'], en: ['Revenue-Share Proposals', 'Term Negotiation', 'Proposal Comparison', 'Scenario Modeling'] },
    contractFeatures: { zh: ['电子签署', '合约管理', '版本控制', '法律合规'], en: ['Digital Execution', 'Contract Management', 'Version Control', 'Legal Compliance'] },
    settlementFeatures: { zh: ['自动结算', '资金流转', '账单管理', '对账核销'], en: ['Automated Settlement', 'Fund Flow', 'Billing Management', 'Reconciliation'] },
    performanceFeatures: { zh: ['履约监控', '数据追踪', '预警提示', '报表生成'], en: ['Performance Monitoring', 'Data Tracking', 'Alert Notifications', 'Report Generation'] },
    // categories
    catEntry: { zh: '统一入口', en: 'Unified Entry' },
    catBorrower: { zh: '融资者路径', en: 'Borrower Path' },
    catInvestor: { zh: '投资者路径', en: 'Investor Path' },
    catDeal: { zh: '交易达成', en: 'Deal Execution' },
    catPost: { zh: '投后管理', en: 'Post-Investment' },
    // Portal shortDesc
    identityShort: { zh: '认证登录 · 角色分流', en: 'Authentication · Role Routing' },
    applicationShort: { zh: '上传经营数据 · 生成Pitch Deck', en: 'Upload Data · Generate Pitch Deck' },
    assessShort: { zh: '自定义投资标准 · AI评估打分', en: 'Custom Criteria · AI Scoring' },
    riskShort: { zh: '自定义风控规则 · 材料验真', en: 'Custom Risk Rules · Verification' },
    opportunityShort: { zh: '筛后项目看板 · 投资决策', en: 'Filtered Board · Investment Decision' },
    termsShort: { zh: '收入分成方案 · 条款协商', en: 'Revenue-Share Terms · Negotiation' },
    contractShort: { zh: '电子合约签署 · 法律合规', en: 'Digital Execution · Compliance' },
    settlementShort: { zh: '自动结算 · 资金流转', en: 'Auto Settlement · Fund Flow' },
    performanceShort: { zh: '履约监控 · 预警追踪', en: 'Monitoring · Alert Tracking' },
    // foundations
    foundation1Name: { zh: 'Account 身份体系', en: 'Account Identity System' },
    foundation1Desc: { zh: '统一认证 · 权限隔离 · 角色分流', en: 'Unified Auth · Permission Isolation · Role Routing' },
    foundation2Name: { zh: 'Data 数据底座', en: 'Data Foundation' },
    foundation2Desc: { zh: '数据同源 · 清洗治理 · 标准化', en: 'Single Source · Data Governance · Standardization' },
    foundation3Name: { zh: 'AI 智能引擎', en: 'AI Intelligence Engine' },
    foundation3Desc: { zh: 'NLP解析 · 量化算法 · 筛子编排', en: 'NLP Parsing · Quantitative Algorithms · Filter Orchestration' },
    // role badge for portal
    roleBadgeShared: { zh: '共用', en: 'Shared' },
    roleBadgeBorrower: { zh: '融资者', en: 'Borrower' },
    roleBadgeInvestor: { zh: '投资者', en: 'Investor' },
    roleBadgeCollaborative: { zh: '协同', en: 'Collaborative' },
    // placeholder role labels
    roleUnifiedEntry: { zh: '统一入口', en: 'Unified Entry' },
    roleBorrowerExclusive: { zh: '融资者专属', en: 'Borrower Exclusive' },
    roleInvestorExclusive: { zh: '投资者专属', en: 'Investor Exclusive' },
    roleCollaborativeDeal: { zh: '投融资协同', en: 'Bilateral Collaboration' },
    aiFilterWorkflow: { zh: 'AI筛子工作流', en: 'AI Filter Workflow' },
  },

  // Page titles
  titles: {
    home: { zh: 'Micro Connect 滴灌通 | 收入分成投资的操作系统', en: 'Micro Connect | The Operating System for Revenue-Based Financing' },
    design: { zh: '产品设计思路 - Micro Connect 滴灌通', en: 'Design Philosophy - Micro Connect' },
    portal: { zh: '产品入口 - Micro Connect 滴灌通', en: 'Product Suite - Micro Connect' },
    about: { zh: '关于我们 - Micro Connect 滴灌通', en: 'About Us - Micro Connect' },
    team: { zh: '核心团队 - Micro Connect 滴灌通', en: 'Leadership - Micro Connect' },
    news: { zh: '新闻动态 - Micro Connect 滴灌通', en: 'News & Insights - Micro Connect' },
    contact: { zh: '联系我们 - Micro Connect 滴灌通', en: 'Contact Us - Micro Connect' },
  },

  // Meta
  meta: {
    description: {
      zh: 'Micro Connect 滴灌通 — 收入分成投资的基础设施级平台。9个AI超级Agent，覆盖RBF投资全生命周期。',
      en: 'Micro Connect — Infrastructure-grade platform for revenue-based financing. 9 AI Super Agents covering the full RBF investment lifecycle.'
    },
    ogTitle: {
      zh: 'Micro Connect 滴灌通 | 收入分成投资的操作系统',
      en: 'Micro Connect | The Operating System for Revenue-Based Financing'
    },
    ogDescription: {
      zh: '全球首个收入分成投资的统一操作系统。9个AI超级Agent，覆盖投融资全生命周期。',
      en: 'The world\'s first unified operating system for revenue-based financing. 9 AI Super Agents covering the full investment lifecycle.'
    },
  },
} as const

// Helper: get translated text
export function tt(obj: { zh: string; en: string }, lang: Lang): string {
  return obj[lang]
}

// Helper: get translated array
export function ta(obj: { zh: string[]; en: string[] }, lang: Lang): string[] {
  return obj[lang]
}
