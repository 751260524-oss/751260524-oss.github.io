export interface Service {
  id: string;
  title: string;
  subtitle: string;
  prices: { amount: string; unit: string }[];
  description: string;
  features: string[];
  note?: string;
  formats?: string[];
}
export type Category = "教程" | "工具" | "游戏" | "软件" | "学习资料" | "其他";
export interface Resource {
  id: string; title: string; category: Category; description: string; url: string;
  enabled: boolean; featured: boolean; currentGame?: boolean;
}

export const siteConfig = {
  siteName: "个人服务站",
  nickname: "游戏服务与资源",
  logoText: "S",
  heroTitle: ["传奇游戏搭建", "修改 · 资源服务"],
  heroSubtitle:
    "专注传奇相关搭建、客户端修改、分发服务、CDK 后台对接以及游戏资源整理。让想法落地，让资源触手可及。",
  heroEyebrow: "游戏 · 技术 · 分享",
  heroTags: ["服务端搭建", "客户端修改", "游戏资源整理"],
  resourceCategories: ["教程", "工具", "游戏", "软件", "学习资料", "其他"] as Category[],
  nav: [
    { id: "home", label: "首页" },
    { id: "services", label: "服务" },
    { id: "resources", label: "资源" },
    { id: "recommendations", label: "推荐" },
    { id: "contact", label: "联系我" },
  ],
  aboutTitle: "专注游戏，也关注每个具体需求。",
  aboutText:
    "我主要做传奇相关的游戏服务，包括服务端搭建、客户端修改、传奇商业服一条龙、文件分发以及 CDK 后台对接。同时也会整理和寻找各种游戏资源、软件以及学习资料，并提供其他游戏相关服务。",
  aboutTags: [
    "传奇服务端搭建",
    "客户端修改",
    "APK / 游戏文件处理",
    "商业服一条龙",
    "文件分发",
    "CDK 后台对接",
    "游戏资源整理",
  ],
  sections: {
    services: {
      eyebrow: "01 / SERVICES",
      title: "把需要的服务，说明白。",
      description: "服务内容与价格都在这里，具体需求欢迎直接聊。",
    },
    resources: {
      eyebrow: "02 / RESOURCES",
      title: "好用的资源，一起分享。",
      description: "教程、工具与游戏资料，按需查找，通过网盘获取。",
    },
    recommendations: { eyebrow: "03 / RECOMMENDED", title: "合作入口，按需了解。", description: "两个实用的合作入口，放在这里，保持清晰也保持克制。" },
    contact: {
      eyebrow: "04 / CONTACT",
      title: "有需要，直接联系我。",
      description:
        "传奇搭建、修改、分发、CDK 后台对接以及其他游戏资源需求，都可以直接联系。",
    },
  },
  services: [
    {
      id: "build",
      title: "传奇搭建服务",
      subtitle: "从搭建到一起开玩",
      prices: [{ amount: "50～200", unit: "元" }],
      description:
        "含端，含一个月 2核-4G-5M 服务器。自己玩，或者发给朋友一起玩都可以。",
      features: [
        "自定义区服名、客户端显示名",
        "自定义 GM 码",
        "兼容高版本安卓",
        "公网服务器搭建",
      ],
      note: "更高配置服务器另付费用：4核-8G-5M，50元/月；8核-16G-10M，80元/月。",
    },
    {
      id: "distribution",
      title: "文件分发服务",
      subtitle: "把文件分享得更简单",
      prices: [
        { amount: "60", unit: "元 / 月" },
        { amount: "130", unit: "元 / 年" },
        { amount: "200", unit: "元 / 无限时长" },
      ],
      description: "不限点数、不限下载次数、不限速度、不限大小（理论值 ≤4G）。",
      features: [
        "支持安卓、苹果与 Windows 客户端",
        "支持压缩包、音频和视频文件",
      ],
      formats: [
        "APK",
        "IPA",
        "EXE",
        "ZIP",
        "7Z",
        "TAR.GZ",
        "MP3",
        "MP4",
        "FLV",
      ],
      note: "以上为任意一个文件制作一次分发的价格；制作完成后不支持更换文件。IPA 仅文件分发，不含签名。",
    },
    {
      id: "cdk",
      title: "CDK 后台对接",
      subtitle: "让激活与发货更省心",
      prices: [{ amount: "100", unit: "元 / 次" }],
      description: "适用于开后台服、只有 GM 后台但没有 CDK 后台的用户。",
      features: [
        "对接 CDK 后台，玩家自主激活",
        "可对接发卡平台或自动发货平台",
        "实现自动发货，减少人工操作",
      ],
    },
    {
      id: "custom",
      title: "传奇修改 / 商业服一条龙",
      subtitle: "按你的想法继续打磨",
      prices: [],
      description: "提供传奇客户端修改、服务端修改、美化以及商业服一条龙服务。",
      features: ["客户端与服务端修改", "界面与内容美化", "商业服一条龙服务"],
      note: "具体需求直接联系，按实际需求沟通。",
    },
  ] satisfies Service[],
  benefit: {
    title: "赞助会员福利",
    description:
      "赞助会员可以免费获得一次搭建服务。另外可以免费帮忙寻找游戏资源、软件和学习资料。",
    range: "FC → PS → PS5",
  },
  contacts: [
    { label: "QQ", value: "751260524" },
    { label: "微信", value: "shirenziyuanzhan" },
    { label: "QQ群", value: "784662149" },
  ],
  contactHint: "添加时请简单说明需要的服务，方便沟通。",
  qqGroupUrl: "",
  partnerships: [
    { id: "tuofeiyun", title: "拓飞云", eyebrow: "服务器 / 云服务器", description: "可用于网站、游戏服务端、传奇服务器和其他项目。", action: "立即购买", url: "https://www.tuofeiyun.cn/aff/XQNGLURP" },
    { id: "cocok", title: "酷客游戏", eyebrow: "游戏相关服务", description: "其他游戏可以在这里购买，也可以联系我低价购入和包站。", action: "进入酷客游戏", url: "https://game.cocok.cn/?ref=4R0D86SO" },
  ],
  externalLinks: [
    { title: "拓飞云", url: "https://www.tuofeiyun.cn/aff/XQNGLURP" },
    { title: "酷客游戏", url: "https://game.cocok.cn/?ref=4R0D86SO" },
  ],
  footerText: "个人服务站 · All Rights Reserved.",
};
