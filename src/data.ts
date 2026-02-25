// 滴灌通超级Agent产品数据层
// 8个通串联成Super Agent + Opportunity投资者看板（副流程）

export interface Product {
  id: string;
  name: string;
  englishName: string;
  englishShort: string;
  logo: string;
  description: string;
  category: string;
  categoryEn: string;
  status: 'live' | 'beta' | 'coming';
  features: string[];
  color: string;
  colorDark: string;
  // 流程中的序号（1-8），Opportunity为0（副流程）
  flowOrder: number;
  // 是否标记"协同"
  isCollaborative?: boolean;
}

export interface Foundation {
  name: string;
  description: string;
  icon: string;
}

// 8个通（主流程顺序） + Opportunity（副流程看板）
export const products: Product[] = [
  {
    id: "identity",
    name: "身份通",
    englishName: "Identity Connect",
    englishShort: "Identity",
    logo: "https://www.genspark.ai/api/files/s/2UNypAIm",
    description: "统一认证入口，支持融资者和投资者的身份管理与权限控制",
    category: "融资前端",
    categoryEn: "Financing Frontend",
    status: "live",
    features: ["统一认证", "权限隔离", "多因素认证", "账户安全"],
    color: "#DBEAFE",
    colorDark: "#3B82F6",
    flowOrder: 1
  },
  {
    id: "application",
    name: "申请通",
    englishName: "Application Connect",
    englishShort: "Application",
    logo: "https://www.genspark.ai/api/files/s/sGTxJUcV",
    description: "协助融资者整理材料、生成Pitch Deck，开启融资之旅",
    category: "融资前端",
    categoryEn: "Financing Frontend",
    status: "beta",
    features: ["材料整理", "数据归类", "AI生成Pitch Deck", "项目宣传"],
    color: "#DBEAFE",
    colorDark: "#3B82F6",
    flowOrder: 2
  },
  {
    id: "assess",
    name: "评估通",
    englishName: "Assess Connect",
    englishShort: "Assess",
    logo: "https://www.genspark.ai/api/files/s/UJuchZc6",
    description: "AI驱动的项目分析引擎，自动生成量化评估与尽调报告",
    category: "项目评估",
    categoryEn: "Project Assessment",
    status: "beta",
    features: ["AI量化评估", "尽调报告", "数据可视化", "财务建模"],
    color: "#E0E7FF",
    colorDark: "#6366F1",
    flowOrder: 3
  },
  {
    id: "risk",
    name: "风控通",
    englishName: "Risk Connect",
    englishShort: "Risk",
    logo: "https://www.genspark.ai/api/files/s/SrCHke7M",
    description: "投资者的风险把关者，材料验真与合规性审查",
    category: "项目评估",
    categoryEn: "Project Assessment",
    status: "live",
    features: ["材料验真", "风控标准", "合规审查", "风险评分"],
    color: "#E0E7FF",
    colorDark: "#6366F1",
    flowOrder: 4
  },
  {
    id: "terms",
    name: "条款通",
    englishName: "Terms Connect",
    englishShort: "Terms",
    logo: "https://www.genspark.ai/api/files/s/xnam27pA",
    description: "基于AI评估和风控结论，自动生成收入分成方案",
    category: "投资决策",
    categoryEn: "Investment Decision",
    status: "coming",
    features: ["收入分成方案", "条款协商", "方案对比", "模拟测算"],
    color: "#EDE9FE",
    colorDark: "#8B5CF6",
    flowOrder: 5,
    isCollaborative: true
  },
  {
    id: "contract",
    name: "合约通",
    englishName: "Contract Connect",
    englishShort: "Contract",
    logo: "https://www.genspark.ai/api/files/s/8qGcHXYE",
    description: "电子合约签署平台，投融资双方在线协同完成合约",
    category: "投资决策",
    categoryEn: "Investment Decision",
    status: "beta",
    features: ["电子签署", "合约管理", "版本控制", "法律合规"],
    color: "#EDE9FE",
    colorDark: "#8B5CF6",
    flowOrder: 6,
    isCollaborative: true
  },
  {
    id: "settlement",
    name: "结算通",
    englishName: "Settlement Connect",
    englishShort: "Settlement",
    logo: "https://www.genspark.ai/api/files/s/AONkBaFh",
    description: "收入分成自动结算，透明化资金流转记录",
    category: "投后管理",
    categoryEn: "Post-Investment",
    status: "coming",
    features: ["自动结算", "资金流转", "账单管理", "对账核销"],
    color: "#D1FAE5",
    colorDark: "#10B981",
    flowOrder: 7
  },
  {
    id: "performance",
    name: "履约通",
    englishName: "Performance Connect",
    englishShort: "Performance",
    logo: "https://www.genspark.ai/api/files/s/goK923ZW",
    description: "履约监控与数据追踪，实时掌握项目运营状况",
    category: "投后管理",
    categoryEn: "Post-Investment",
    status: "coming",
    features: ["履约监控", "数据追踪", "预警提示", "报表生成"],
    color: "#D1FAE5",
    colorDark: "#10B981",
    flowOrder: 8
  }
];

// Opportunity 投资者看板（副流程，不是独立的"通"）
export const opportunityBoard = {
  id: "opportunity",
  name: "Opportunity",
  chineseName: "投资者看板",
  description: "实时查看Application项目、Assess评估报告、Risk风控结论",
  icon: "fa-eye",
  // Opportunity看板关联的三个上游通
  sources: ["application", "assess", "risk"]
};

// 主流程的8个通（按流程顺序排列）
export const mainFlowProducts = products.filter(p => p.flowOrder > 0).sort((a, b) => a.flowOrder - b.flowOrder);

export const foundations: Foundation[] = [
  {
    name: "Account 身份体系",
    description: "统一认证 · 权限隔离",
    icon: "fa-users"
  },
  {
    name: "Data 数据底座",
    description: "数据同源 · 清洗治理",
    icon: "fa-database"
  },
  {
    name: "AI 智能引擎",
    description: "NLP解析 · 量化算法",
    icon: "fa-brain"
  }
];

export const statusLabels: Record<string, { text: string; class: string }> = {
  live: { text: "已上线", class: "bg-green-100 text-green-700 border-green-200" },
  beta: { text: "Beta测试中", class: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  coming: { text: "即将上线", class: "bg-gray-100 text-gray-500 border-gray-200" }
};

// 架构分组：按投资阶段（8个通）
export const architectureGroups = [
  {
    title: "融资前端",
    titleEn: "Financing Frontend",
    color: "#3B82F6",
    bgColor: "#DBEAFE",
    ids: ["identity", "application"]
  },
  {
    title: "项目评估",
    titleEn: "Project Assessment",
    color: "#6366F1",
    bgColor: "#E0E7FF",
    ids: ["assess", "risk"]
  },
  {
    title: "投资决策",
    titleEn: "Investment Decision",
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
    ids: ["terms", "contract"]
  },
  {
    title: "投后管理",
    titleEn: "Post-Investment",
    color: "#10B981",
    bgColor: "#D1FAE5",
    ids: ["settlement", "performance"]
  }
];

// 设计思路手风琴数据
export const designSections = [
  {
    id: "background",
    title: "产品背景与核心问题",
    icon: "fa-lightbulb",
    content: [
      {
        subtitle: "传统做法的痛点",
        text: "传统RBF平台按赛道（餐饮、零售、医美等）分别建系统，导致大量重复开发、数据孤岛、维护成本高。每个赛道都有自己的评估体系、风控标准、合同模板，难以形成规模效应。"
      },
      {
        subtitle: "从按赛道造轮子到Super Agent",
        text: "我们提出「Super Agent矩阵」理念——不按赛道建系统，而是按投资流程的关键环节抽象出8个通用Agent。每个Agent专注于一个核心能力，通过灵活组合覆盖所有赛道。"
      },
      {
        subtitle: "核心价值主张",
        text: "提纲挈领、以不变应万变。8个Agent + 统一底座，即可覆盖RBF投资全流程，同时保留针对不同赛道的定制能力。"
      }
    ]
  },
  {
    id: "evolution",
    title: "架构演进过程",
    icon: "fa-code-branch",
    content: [
      {
        subtitle: "初始10个通 → 最终8个通",
        text: "最初设计包含10个「通」，经过多轮讨论和优化，将Data Connect归入统一底座层，Opportunity从独立的通调整为投资者看板（副流程），最终精简为8个核心业务Agent。"
      },
      {
        subtitle: "Opportunity从独立通到投资者看板",
        text: "Opportunity不是一个独立的业务处理环节，而是投资者视角的信息聚合入口。它实时查看Application项目、Assess评估报告、Risk风控结论，是一个跨环节的观察窗口，因此设计为副流程看板而非主流程中的独立通。"
      },
      {
        subtitle: "合并Evaluation Connect",
        text: "将原本独立的Evaluation Connect并入Assess Connect，避免评估功能碎片化，确保一个入口完成所有评估工作。"
      }
    ]
  },
  {
    id: "workflow",
    title: "Y型业务流程逻辑",
    icon: "fa-project-diagram",
    content: [
      {
        subtitle: "主流程：8个通串联",
        text: "Identity（身份通）→ Application（申请通）→ Assess（评估通）→ Risk（风控通）→ Terms（条款通，协同）→ Contract（合约通，协同）→ Settlement（结算通）→ Performance（履约通）\n\n这是融资者路径，也是整个业务的主干线，8个通按顺序串联形成完整的RBF投资生命周期。"
      },
      {
        subtitle: "副流程：Opportunity投资者看板",
        text: "Opportunity（投资者看板）从Application/Assess/Risk三个节点分叉而出，形成Y型结构。投资者通过Opportunity看板实时查看：\n· Application提交的项目信息\n· Assess的量化评估报告\n· Risk的风控审查结论\n\n这使得投资者无需参与主流程的每个环节，即可全面掌握项目状态。"
      },
      {
        subtitle: "协同节点：Terms与Contract",
        text: "Terms和Contract是投融资双方的协同节点，标记为「协同」。到了条款协商和合约签署阶段，融资者和投资者需要共同参与、双向确认，是整个流程中唯一需要双方实时互动的环节。"
      }
    ]
  },
  {
    id: "dataflow",
    title: "数据流与决策机制",
    icon: "fa-exchange-alt",
    content: [
      {
        subtitle: "事件驱动的串联机制",
        text: "8个通之间通过事件总线串联，前一个通的输出自动成为下一个通的输入。核心机制：事件驱动 · 灵活调用 · 按需组合。"
      },
      {
        subtitle: "审批流程",
        text: "Assess → Risk → Terms：评估报告自动流转至风控模块，风控通过后生成收入分成方案。整个过程数据驱动，减少人工干预。"
      },
      {
        subtitle: "补充材料循环",
        text: "Risk不通过时，系统自动通知融资者补充材料，材料更新后重新触发评估流程，形成闭环直至风控通过或双方终止。"
      }
    ]
  },
  {
    id: "tech",
    title: "技术架构",
    icon: "fa-microchip",
    content: [
      {
        subtitle: "事件驱动架构",
        text: "所有Agent之间通过事件总线通信，松耦合设计确保各模块可独立部署和升级。支持异步处理和实时推送，提高系统响应速度。"
      },
      {
        subtitle: "统一底座的三大组件",
        text: "Account（身份体系）：统一的认证和权限管理，支持多租户隔离。\nData（数据底座）：数据同源、清洗治理，确保所有Agent使用一致的数据。\nAI（智能引擎）：NLP解析、量化算法、机器学习模型，为各Agent提供智能能力。"
      },
      {
        subtitle: "模块化设计与灵活调用",
        text: "每个Agent都是独立的微服务，可按需组合、灵活调用。支持水平扩展和灰度发布，新Agent可快速接入统一底座。"
      }
    ]
  }
];
