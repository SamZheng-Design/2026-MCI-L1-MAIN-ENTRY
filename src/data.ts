// 滴灌通超级Agent产品数据层

export interface Product {
  id: string;
  name: string;
  englishName: string;
  englishShort: string;
  logo: string;
  description: string;
  category: string;
  categoryEn: string;
  role: 'all' | 'fundraiser' | 'investor';
  status: 'live' | 'beta' | 'coming';
  features: string[];
  color: string;
  colorDark: string;
}

export interface Foundation {
  name: string;
  description: string;
  icon: string;
}

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
    role: "all",
    status: "live",
    features: ["统一认证", "权限隔离", "多因素认证", "账户安全"],
    color: "#DBEAFE",
    colorDark: "#3B82F6"
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
    role: "fundraiser",
    status: "beta",
    features: ["材料整理", "数据归类", "AI生成Pitch Deck", "项目宣传"],
    color: "#DBEAFE",
    colorDark: "#3B82F6"
  },
  {
    id: "opportunity",
    name: "机会通",
    englishName: "Opportunity Connect",
    englishShort: "Opportunity",
    logo: "https://www.genspark.ai/api/files/s/kL9Lw4YV",
    description: "投资者的项目发现看板，实时查看融资项目和评估报告",
    category: "项目评估",
    categoryEn: "Project Assessment",
    role: "investor",
    status: "live",
    features: ["项目展示", "评估报告查看", "风控结论", "项目跟进"],
    color: "#E0E7FF",
    colorDark: "#6366F1"
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
    role: "all",
    status: "beta",
    features: ["AI量化评估", "尽调报告", "数据可视化", "财务建模"],
    color: "#E0E7FF",
    colorDark: "#6366F1"
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
    role: "investor",
    status: "live",
    features: ["材料验真", "风控标准", "合规审查", "风险评分"],
    color: "#E0E7FF",
    colorDark: "#6366F1"
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
    role: "all",
    status: "coming",
    features: ["收入分成方案", "条款协商", "方案对比", "模拟测算"],
    color: "#EDE9FE",
    colorDark: "#8B5CF6"
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
    role: "all",
    status: "beta",
    features: ["电子签署", "合约管理", "版本控制", "法律合规"],
    color: "#EDE9FE",
    colorDark: "#8B5CF6"
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
    role: "all",
    status: "coming",
    features: ["履约监控", "数据追踪", "预警提示", "报表生成"],
    color: "#D1FAE5",
    colorDark: "#10B981"
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
    role: "all",
    status: "coming",
    features: ["自动结算", "资金流转", "账单管理", "对账核销"],
    color: "#D1FAE5",
    colorDark: "#10B981"
  }
];

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

export const roleLabels: Record<string, string> = {
  all: "全部",
  fundraiser: "融资者",
  investor: "投资者"
};

// 架构分组：按投资阶段
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
    ids: ["opportunity", "assess", "risk"]
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
    ids: ["performance", "settlement"]
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
        text: "我们提出「Super Agent矩阵」理念——不按赛道建系统，而是按投资流程的关键环节抽象出9个通用Agent。每个Agent专注于一个核心能力，通过灵活组合覆盖所有赛道。"
      },
      {
        subtitle: "核心价值主张",
        text: "提纲挈领、以不变应万变。9个Agent + 统一底座，即可覆盖RBF投资全流程，同时保留针对不同赛道的定制能力。"
      }
    ]
  },
  {
    id: "evolution",
    title: "架构演进过程",
    icon: "fa-code-branch",
    content: [
      {
        subtitle: "初始10个通 → 最终9个通",
        text: "最初设计包含10个「通」，经过多轮讨论和优化，将Data Connect归入统一底座层，因为数据服务是所有Agent共享的基础设施，不应作为独立的业务Agent。"
      },
      {
        subtitle: "Investment拆分为Opportunity + Assess",
        text: "原有的Investment Connect职责过重，既要展示项目机会又要做评估分析。拆分后Opportunity专注项目发现和展示，Assess专注AI量化分析，职责更清晰。"
      },
      {
        subtitle: "合并Evaluation Connect",
        text: "将原本独立的Evaluation Connect并入Assess Connect，避免评估功能碎片化，确保一个入口完成所有评估工作。"
      }
    ]
  },
  {
    id: "workflow",
    title: "业务流程逻辑",
    icon: "fa-project-diagram",
    content: [
      {
        subtitle: "Y型分叉流程",
        text: "系统以Identity Connect为统一入口，用户登录后根据角色分为两条路径：融资者路径（Application → Assess）和投资者路径（Opportunity → Assess → Risk）。两条路径在Terms Connect汇合，进入投资决策和投后管理阶段。"
      },
      {
        subtitle: "融资者路径",
        text: "融资者通过Application Connect整理材料、生成Pitch Deck，可选择性触发Assess进行自我评估预判，提前了解自身项目的竞争力。"
      },
      {
        subtitle: "投资者路径",
        text: "投资者通过Opportunity Connect发现项目，系统自动触发Assess进行量化评估，评估通过后进入Risk Connect进行风控审查。Risk是投资者的最终决策关卡。"
      }
    ]
  },
  {
    id: "dataflow",
    title: "数据流与决策机制",
    icon: "fa-exchange-alt",
    content: [
      {
        subtitle: "触发机制",
        text: "Application → Assess：手动触发，可选。融资者可以选择是否进行自我评估。\nOpportunity → Assess：自动触发，必选。投资者查看项目时自动启动评估。"
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
