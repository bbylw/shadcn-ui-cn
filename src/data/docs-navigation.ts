export interface NavItem {
  title: string;
  slug: string;
}

export interface NavGroup {
  groupName: string;
  items: NavItem[];
}

export const sidebarNavigation: NavGroup[] = [
  {
    groupName: "开始使用",
    items: [
      { title: "介绍", slug: "introduction" },
      { title: "安装", slug: "installation" },
      { title: "新手指南", slug: "getting-started" }
    ]
  },
  {
    groupName: "配置与架构",
    items: [
      { title: "components.json 配置", slug: "components-json" },
      { title: "包导入", slug: "package-imports" },
      { title: "Monorepo 支持", slug: "monorepo" },
      { title: "Skills (AI 技能)", slug: "skills" },
      { title: "JavaScript 支持", slug: "javascript" },
      { title: "工具类 (Utilities)", slug: "utilities" }
    ]
  },
  {
    groupName: "定制与功能",
    items: [
      { title: "主题化", slug: "theming" },
      { title: "暗色模式", slug: "dark-mode" },
      { title: "RTL 支持", slug: "rtl" }
    ]
  },
  {
    groupName: "命令行与分发",
    items: [
      { title: "CLI 命令行工具", slug: "cli" },
      { title: "注册表", slug: "registry" },
      { title: "MCP 服务器", slug: "mcp" }
    ]
  },
  {
    groupName: "组件与生态",
    items: [
      { title: "所有组件列表", slug: "components" },
      { title: "表单支持", slug: "forms" },
      { title: "Figma 设计资源", slug: "figma" },
      { title: "其他资源", slug: "other-resources" }
    ]
  }
];
