# shadcn/ui 中文文档

> 原文：https://ui.shadcn.com/docs
>
> **这不是一个组件库，而是你构建自己组件库的方法。**

shadcn/ui 是一套设计精美、可访问的组件和代码分发平台。可与您喜欢的框架和 AI 模型配合使用。开源。开放代码。

---

## 目录

- [介绍](#介绍)
- [安装](#安装)
- [components.json 配置](#componentsjson-配置)
- [包导入 (Package Imports)](#包导入-package-imports)
- [主题化 (Theming)](#主题化-theming)
- [暗色模式 (Dark Mode)](#暗色模式-dark-mode)
- [RTL 支持](#rtl-支持)
- [CLI 命令行工具](#cli-命令行工具)
- [组件](#组件)
- [表单 (Forms)](#表单-forms)
- [Monorepo 支持](#monorepo-支持)
- [Skills (AI 技能)](#skills-ai-技能)
- [JavaScript 支持](#javascript-支持)
- [工具类 (Utilities)](#工具类-utilities)
- [注册表 (Registry)](#注册表-registry)
- [Figma](#figma)
- [MCP 服务器](#mcp-服务器)
- [新手指南 (项目就绪后)](#新手指南-项目就绪后)

---

## 介绍

大多数传统组件库的工作方式：您从 NPM 安装一个包，导入组件，然后在应用中使用它们。

这种方法在您需要自定义组件以适应设计系统或需要库中未包含的组件时就会遇到问题。**您最终往往会包装库组件、编写变通方案来覆盖样式，或者混合使用来自不同库的具有不兼容 API 的组件。**

这正是 shadcn/ui 旨在解决的问题。它围绕以下原则构建：

### 开放代码 (Open Code)

shadcn/ui 将实际的组件代码交给您。您拥有完全的控制权来自定义和扩展组件以满足需求。

- **完全透明**：您可以准确看到每个组件是如何构建的。
- **轻松自定义**：修改组件的任何部分以适应您的设计和功能需求。
- **AI 集成**：访问代码使得 LLM 可以直接读取、理解甚至改进您的组件。

> 在传统库中，如果您需要更改按钮的行为，必须覆盖样式或包装组件。而使用 shadcn/ui，您可以直接编辑按钮代码。

#### 如何在开放代码方法中拉取上游更新？

### 组合性 (Composition)

shadcn/ui 中的每个组件都共享一个通用的、可组合的接口。**如果某个组件不存在，我们会引入它，使其可组合，并调整其样式以匹配并融入设计系统的其余部分。**

> 共享的可组合接口意味着对您的团队和 LLM 来说都是可预测的。您无需为每个新组件学习不同的 API。即使是第三方组件也是如此。

### 分发 (Distribution)

shadcn/ui 也是一个代码分发系统。它定义了组件的 schema 和一个用于分发它们的 CLI。

- **Schema**：一种扁平文件结构，定义了组件、其依赖项和属性。
- **CLI**：一个命令行工具，用于跨项目分发和安装组件，支持多种框架。

> 您可以使用 schema 将组件分发到其他项目，或让 AI 基于现有 schema 生成全新的组件。

### 美观的默认样式 (Beautiful Defaults)

shadcn/ui 附带大量拥有精心选择的默认样式的组件。它们被设计为独立使用时看起来很棒，并且作为一个一致的系统协同工作：

- **开箱即用**：无需额外工作，您的 UI 就拥有干净、简约的外观。
- **统一设计**：组件自然相互匹配。每个组件都旨在与其他组件保持一致，保证 UI 的一致性。
- **易于自定义**：如果您想更改某些内容，只需覆盖和扩展默认值即可。

### AI 就绪 (AI-Ready)

shadcn/ui 的设计使得 AI 工具可以轻松处理您的代码。其开放的代码和一致的 API 允许 AI 模型读取、理解甚至生成新组件。

> AI 模型可以学习您的组件如何工作，并建议改进或创建与您现有设计集成的新组件。

---

## 安装

如何安装依赖并构建您的应用。

**新项目推荐：** 使用 [shadcn/create](https://ui.shadcn.com/create) 以可视化方式构建您的预设，并为您的框架生成正确的设置命令。

有三种方式可以选择：

### 使用 shadcn/create

以可视化方式构建您的预设，预览您的选择，并生成特定框架的设置命令。

打开 [shadcn/create](https://ui.shadcn.com/create)

支持框架：Next.js、Vite、Laravel、React Router、Astro、TanStack Start。

### 使用 CLI

使用 CLI 直接从终端搭建新项目：

```bash
npx shadcn@latest init --template next
```

支持的模板：`next`、`vite`、`start`、`react-router`、`astro`。

对于 Laravel，先使用 `laravel new` 创建应用，然后运行 `npx shadcn@latest init`。

### 现有项目

每个框架指南都包含 `Existing Project` 部分，其中包含该框架的手动设置步骤。

### 各框架安装指南

#### Next.js

选择匹配您起点的设置。

**使用 shadcn/create：**

1. **构建您的预设**：打开 [shadcn/create](https://ui.shadcn.com/create?template=next)，以可视化方式构建您的预设。选择样式、颜色、字体、图标等。
2. **创建项目**：点击 `Create Project`，选择包管理器，复制生成的命令。生成的命令将包含您选择的选项，如 `--base`、`--monorepo` 或 `--rtl`。
3. **添加组件**：
```bash
npx shadcn@latest add card
```
如果是 monorepo：
```bash
cd apps/web && npx shadcn@latest add card
# 或从根目录：
npx shadcn@latest add card -w apps/web
```
导入使用：
```tsx
// app/page.tsx
import { Card } from "@/components/ui/card"
```
Monorepo 则从 `@workspace/ui/components/card` 导入。

**使用 CLI：**
```bash
npx shadcn@latest init --template next
```
Monorepo 使用 `--monorepo` 标志：
```bash
npx shadcn@latest init --template next --monorepo
```

**现有项目：**

1. 如果需要新项目：
```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
```
选择推荐默认值以配置 Tailwind CSS、App Router 和 `@/*` 导入别名。

使用 `--src-dir` 时 Next.js 将应用放在 `src/app`，并将 `@/*` 别名配置为指向 `./src/*`。

2. 确保 `tsconfig.json` 包含 `@/*` 导入别名：
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

3. 运行 CLI 初始化：
```bash
npx shadcn@latest init
```

4. 添加组件：
```bash
npx shadcn@latest add button
```

导入使用：
```tsx
// app/page.tsx
import { Button } from "@/components/ui/button"
```

#### Vite

**使用 CLI：**
```bash
npx shadcn@latest init --template vite
```

**现有项目：**

1. 创建 Vite 项目（选择 React + TypeScript 模板）：
```bash
npm create vite@latest my-app -- --template react-ts
```

2. 添加 Tailwind CSS：
```bash
npm install tailwindcss @tailwindcss/vite
```

将 `src/index.css` 替换为：
```css
@import "tailwindcss";
```

3. 编辑 `tsconfig.json`：
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

4. 编辑 `tsconfig.app.json`：
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

5. 更新 `vite.config.ts`：
```bash
npm install -D @types/node
```
```ts
import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

6. 运行 CLI：
```bash
npx shadcn@latest init
```

7. 添加组件：
```bash
npx shadcn@latest add button
```

#### Astro

**使用 CLI：**
```bash
npx shadcn@latest init --template astro
```

**现有项目：**
1. 创建 Astro 项目（设置 Tailwind CSS 和 React 集成）：
```bash
npm create astro@latest
```

2. 编辑 `tsconfig.json`：
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

3. 运行 CLI：
```bash
npx shadcn@latest init
```

4. 添加组件：
```bash
npx shadcn@latest add button
```
```tsx
// src/pages/index.astro
import { Button } from "@/components/ui/button"
```

#### React Router

**使用 CLI：**
```bash
npx shadcn@latest init --template react-router
```

**现有项目：**
1. 创建 React Router 项目：
```bash
npx create-react-router@latest my-app
```

2. 运行 CLI：
```bash
npx shadcn@latest init
```

3. 添加组件：
```bash
npx shadcn@latest add button
```
```tsx
// app/routes/home.tsx
import { Button } from "~/components/ui/button"
```

#### Laravel

先使用 `laravel new` 创建应用，然后运行 `npx shadcn@latest init`。

#### TanStack Start

```bash
npx shadcn@latest init --template start
```

#### 手动安装 (通用 React)

1. **添加 Tailwind CSS**：按照 [Tailwind CSS 安装指南](https://tailwindcss.com/docs/installation) 操作。

2. **添加依赖**：
```bash
npm install class-variance-authority clsx tailwind-merge lucide-react
```

3. **配置导入别名**：

**选项 A：使用 `tsconfig.json` paths：**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**选项 B：使用 `package.json#imports`：**
```json
{
  "imports": {
    "#*": "./src/*"
  }
}
```
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`@` 别名是首选。您也可以使用其他别名。如果使用 `package.json#imports`，请保持 `components.json` 中的别名根目录匹配。参见 [package imports guide](https://ui.shadcn.com/docs/package-imports) 了解框架特定设置。

4. **配置样式**：将以下内容添加到 `src/styles/globals.css`：
```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  :root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0);
    --popover: oklch(1 0 0);
    --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0.042 265.755);
    --primary-foreground: oklch(0.985 0 0);
    --secondary: oklch(0.965 0.001 286.375);
    --secondary-foreground: oklch(0.205 0.042 265.755);
    --muted: oklch(0.965 0.001 286.375);
    --muted-foreground: oklch(0.555 0.011 285.805);
    --accent: oklch(0.965 0.001 286.375);
    --accent-foreground: oklch(0.205 0.042 265.755);
    --destructive: oklch(0.577 0.245 27.325);
    --destructive-foreground: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0.004 286.375);
    --input: oklch(0.922 0.004 286.375);
    --ring: oklch(0.205 0.042 265.755);
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
    --radius: 0.625rem;
  }

  .dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --card: oklch(0.145 0 0);
    --card-foreground: oklch(0.985 0 0);
    --popover: oklch(0.145 0 0);
    --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.985 0 0);
    --primary-foreground: oklch(0.205 0.042 265.755);
    --secondary: oklch(0.269 0.015 285.805);
    --secondary-foreground: oklch(0.985 0 0);
    --muted: oklch(0.269 0.015 285.805);
    --muted-foreground: oklch(0.708 0.01 285.805);
    --accent: oklch(0.269 0.015 285.805);
    --accent-foreground: oklch(0.985 0 0);
    --destructive: oklch(0.396 0.141 25.723);
    --destructive-foreground: oklch(0.637 0.237 25.331);
    --border: oklch(0.269 0.015 285.805);
    --input: oklch(0.269 0.015 285.805);
    --ring: oklch(0.439 0.023 285.805);
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

5. **添加 cn 辅助函数**：
```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

6. **创建 components.json 文件**：
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```
如果使用 `package.json#imports`：
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "#components",
    "utils": "#lib/utils",
    "ui": "#components/ui",
    "lib": "#lib",
    "hooks": "#hooks"
  }
}
```

7. **完成**：您现在可以开始向项目添加组件了。

---

## components.json 配置

`components.json` 文件保存项目的配置。我们用它来了解您的项目是如何设置的，以及如何生成为您的项目定制的组件。

> **注意：** `components.json` 文件是可选的。它**仅在您使用 CLI** 添加组件时才需要。如果您使用复制粘贴方法，则不需要此文件。

您可以通过运行以下命令在项目中创建 `components.json` 文件：
```bash
npx shadcn@latest init
```

### $schema

JSON Schema 路径：https://ui.shadcn.com/schema.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json"
}
```

### style

组件的样式。**初始化后不可更改。**

```json
{
  "style": "new-york"
}
```

`default` 样式已弃用，请使用 `new-york` 样式。

### tailwind

帮助 CLI 了解项目中 Tailwind CSS 如何设置的配置。

#### tailwind.config

`tailwind.config.js` 文件的路径。**对于 Tailwind CSS v4，请留空。**

```json
{
  "tailwind": {
    "config": "tailwind.config.ts"
  }
}
```

#### tailwind.css

导入 Tailwind CSS 的 CSS 文件路径。

```json
{
  "tailwind": {
    "css": "src/app/globals.css"
  }
}
```

#### tailwind.baseColor

用于为组件生成默认主题令牌。**初始化后不可更改。**

```json
{
  "tailwind": {
    "baseColor": "neutral"
  }
}
```

可用颜色：**Neutral**、**Stone**、**Zinc**、**Mauve**、**Olive**、**Mist**、**Taupe**。

#### tailwind.cssVariables

我们使用并推荐 CSS 变量进行主题化。

设置为 `true` 生成语义化主题令牌（如 `background`、`foreground`、`primary`）。设置为 `false` 生成内联 Tailwind 颜色工具类。

```json
{
  "tailwind": {
    "cssVariables": true
  }
}
```

**初始化后不可更改。** 要在 CSS 变量和工具类之间切换，您必须删除并重新安装组件。

#### tailwind.prefix

Tailwind CSS 工具类的前缀。组件将以此前缀添加。

```json
{
  "tailwind": {
    "prefix": "tw-"
  }
}
```

### rsc

是否启用 React Server Components 支持。

设置为 `true` 时，CLI 会自动为客户端组件添加 `"use client"` 指令。

```json
{
  "rsc": true
}
```

### tsx

选择 TypeScript 或 JavaScript 组件。

设置为 `false` 允许组件以 JavaScript (.jsx) 扩展名添加。

```json
{
  "tsx": true
}
```

### aliases

CLI 使用这些值将生成的组件放置在正确的位置并重写导入。

您可以通过以下两种方式之一支持这些别名：
1. `compilerOptions.paths` 在 `tsconfig.json` 或 `jsconfig.json` 中
2. `package.json#imports` 并启用 TypeScript 包导入解析

`components.json` 中的别名在 CLI 使用时仍然是必需的。它们告诉 CLI 哪些导入根目录映射到 `components`、`ui`、`lib`、`hooks` 和 `utils`。

> **重要：** 如果使用包导入（package imports），请在 `tsconfig.json` 中启用 `resolvePackageJsonImports` 并使用 `moduleResolution: "bundler"`。如果使用 `paths`，请确保别名在适用时包含 `src` 目录。

#### 使用 tsconfig 或 jsconfig paths

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### 使用 package.json#imports

单包应用的推荐设置：

```json
// package.json
{
  "imports": {
    "#components/*": "./src/components/*.tsx",
    "#ui/*": "./src/components/ui/*.tsx",
    "#lib/*": "./src/lib/*.ts",
    "#hooks/*": "./src/hooks/*.ts"
  }
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "resolvePackageJsonImports": true,
    "moduleResolution": "bundler"
  }
}
```

```json
// components.json
{
  "aliases": {
    "components": "#components",
    "ui": "#components/ui",
    "lib": "#lib",
    "hooks": "#hooks",
    "utils": "#lib/utils"
  }
}
```

匹配的 `imports` 目标还控制生成的 `#...` 导入是否保留文件扩展名：

- `"#components/*": "./src/components/*"` 保留源扩展名，生成如 `#components/button.tsx`
- `"#components/*": "./src/components/*.tsx"` 去除源扩展名，生成如 `#components/button`

**对于 monorepo：** 参见 monorepo 文档。本地工作区别名可以使用 `package.json#imports`，而共享工作区导入如 `@workspace/ui/components` 从目标包的 `exports` 解析。

#### aliases.utils

工具函数的导入别名。

```json
{
  "aliases": {
    "utils": "@/lib/utils"
  }
}
```

#### aliases.components

组件的导入别名。

```json
{
  "aliases": {
    "components": "@/components"
  }
}
```

#### aliases.ui

UI 组件的导入别名。

CLI 将使用 `aliases.ui` 值来确定放置 `ui` 组件的位置。如果您想自定义 `ui` 组件的安装目录，请使用此配置。

```json
{
  "aliases": {
    "ui": "@/components/ui"
  }
}
```

#### aliases.lib

`lib` 函数的导入别名，如 `format-date` 或 `generate-id`。

```json
{
  "aliases": {
    "lib": "@/lib"
  }
}
```

#### aliases.hooks

`hooks` 的导入别名，如 `use-media-query` 或 `use-toast`。

```json
{
  "aliases": {
    "hooks": "@/hooks"
  }
}
```

### registries

为项目配置多个资源注册表。允许您从包括私有注册表在内的各种来源安装组件、库、工具和其他资源。

参见 [Namespaced Registries](https://ui.shadcn.com/docs/registry/namespace) 文档以获取详细信息。

#### 基本配置

使用 URL 模板配置注册表：

```json
{
  "registries": {
    "acme-corp": {
      "url": "https://acme.corp/{name}.json"
    }
  }
}
```

`{name}` 占位符在安装时会被替换为资源名称。

#### 带认证的高级配置

对于需要认证的私有注册表：

```json
{
  "registries": {
    "internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${INTERNAL_REGISTRY_TOKEN}"
      }
    }
  }
}
```

格式为 `${VAR_NAME}` 的环境变量会自动从环境中展开。

#### 使用命名空间注册表

配置后，使用命名空间语法安装资源：
```bash
npx shadcn@latest add acme-corp:button
```

#### 多注册表设置示例

```json
{
  "registries": {
    "shadcn": {
      "url": "https://ui.shadcn.com/registry/{name}.json"
    },
    "acme-corp": {
      "url": "https://acme.corp/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${ACME_TOKEN}"
      }
    },
    "team-alpha": {
      "url": "https://team-alpha.dev/{name}.json?v=2"
    }
  }
}
```

此配置允许您：
- 从 shadcn/ui 安装公共组件
- 通过认证访问私有公司 UI 组件
- 使用带版本控制的团队特定资源

---

## 包导入 (Package Imports)

### 使用 tsconfig paths

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 使用 package.json#imports

```json
{
  "imports": {
    "#components/*": "./src/components/*.tsx",
    "#ui/*": "./src/components/ui/*.tsx",
    "#lib/*": "./src/lib/*.ts",
    "#hooks/*": "./src/hooks/*.ts"
  }
}
```

需要在 `tsconfig.json` 中启用 `resolvePackageJsonImports` 并使用 `moduleResolution: "bundler"`。

---

## 主题化 (Theming)

使用 CSS 变量和主题令牌。

想可视化构建您的主题？使用 [shadcn/create](https://ui.shadcn.com/create) 预览颜色、圆角、字体和图标，然后为您的项目生成预设。

我们使用并推荐使用 CSS 变量进行主题化。

这为您提供了组件默认使用的语义化主题令牌，如 `background`、`foreground` 和 `primary`。在 CSS 中覆盖这些令牌即可改变应用的外观，而无需重写组件类。

要使用 CSS 变量进行主题化，请在 `components.json` 中将 `tailwind.cssVariables` 设置为 `true`。这是默认设置。

Tailwind 将这些令牌映射到工具类：`bg-background`、`text-foreground`、`border-border`、`ring-ring`。

暗色模式通过在 `.dark` 选择器内覆盖相同的令牌来实现。

### 令牌约定 (Token Convention)

我们使用语义化的背景和前景配对。基础令牌控制表面颜色，`-foreground` 令牌控制该表面上的文本和图标颜色。

表面令牌省略背景后缀。例如，`primary` 与 `primary-foreground` 配对。

给定以下 CSS 变量：
```css
--primary: oklch(0.205 0.042 265.755);
--primary-foreground: oklch(0.985 0 0);
```

以下组件的 `background` 颜色将是 `var(--primary)`，`foreground` 颜色将是 `var(--primary-foreground)`：
```html
<div class="bg-primary text-primary-foreground">Primary</div>
```

### 主题令牌 (Theme Tokens)

这些令牌存在于 CSS 文件的 `:root` 和 `.dark` 下。

| 令牌 | 控制内容 | 使用场景 |
|------|---------|---------|
| `background` / `foreground` | 默认应用背景和文本颜色 | 页面外壳、页面部分、默认文本 |
| `card` / `card-foreground` | 提升表面及其内容 | Card、仪表板面板、设置面板 |
| `popover` / `popover-foreground` | 浮动表面及其内容 | Popover、DropdownMenu、ContextMenu 和其他覆盖层 |
| `primary` / `primary-foreground` | 高强调度操作和品牌表面 | 默认 Button、选中状态、徽章、活动强调 |
| `secondary` / `secondary-foreground` | 低强调度填充操作和支持表面 | 次要按钮、次要徽章、支持性 UI |
| `muted` / `muted-foreground` | 微妙表面和低强调度内容 | 描述、占位符、空状态、辅助文本、柔和表面 |
| `accent` / `accent-foreground` | 交互悬停、焦点和活动表面 | Ghost 按钮、菜单高亮状态、悬停行、选中项 |
| `destructive` | 破坏性操作和错误强调 | 破坏性按钮、无效状态、破坏性菜单项 |
| `border` | 默认边框和分隔线 | 卡片、菜单、表格、分隔线、布局分隔 |
| `input` | 表单控件边框和输入表面处理 | Input、Textarea、Select、轮廓样式控件 |
| `ring` | 焦点环和轮廓 | 按钮、输入、复选框、菜单和其他可聚焦控件 |
| `chart-1` ~ `chart-5` | 默认图表调色板 | 图表和图表驱动的仪表板块 |
| `sidebar` / `sidebar-foreground` | 基础侧边栏表面和默认侧边栏文本 | Sidebar 容器及其默认内容 |
| `sidebar-primary` / `sidebar-primary-foreground` | 侧边栏内高强调度操作 | 活动项、图标磁贴、徽章、侧边栏 CTA |
| `sidebar-accent` / `sidebar-accent-foreground` | 侧边栏内悬停和选中状态 | 侧边栏菜单悬停状态、打开项、交互行 |
| `sidebar-border` | 侧边栏特定边框和分隔线 | 侧边栏标题、组、内部分隔 |
| `sidebar-ring` | 侧边栏特定焦点环 | 侧边栏内的焦点控件 |
| `radius` | 基础圆角半径 | 卡片、输入、按钮、弹出框以及派生的 `radius-*` 令牌 |

图表令牌在 [Chart theming docs](https://ui.shadcn.com/docs/components/chart#theming) 中有更详细的介绍。

### 圆角半径 (Radius Scale)

`--radius` 是主题的基础圆角令牌。

我们从中派生出一个小的半径范围，以便组件可以使用一致的转角尺寸，同时仍共享单一真实来源。

```css
:root {
  --radius: 0.625rem;
}

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

这意味着：
- `radius-lg` 是基础值
- 较小的半径从 `--radius` 缩小
- 较大的半径从 `--radius` 放大
- 更改 `--radius` 会更新整个半径范围

### 添加新令牌 (Adding New Tokens)

要添加新令牌，在 `:root` 和 `.dark` 下定义，然后通过 `@theme inline` 暴露给 Tailwind：

```css
@layer base {
  :root {
    --warning: oklch(0.681 0.162 75.834);
    --warning-foreground: oklch(0.98 0.016 73.684);
  }
  .dark {
    --warning: oklch(0.769 0.188 70.08);
    --warning-foreground: oklch(0.98 0.016 73.684);
  }
}

@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

然后即可在组件中使用 `bg-warning` 和 `text-warning-foreground`。

### 基础颜色 (Base Colors)

`tailwind.baseColor` 控制在运行 `init` 或使用预设时为项目生成的默认令牌值。

可用的基础颜色：**Neutral**、**Stone**、**Zinc**、**Mauve**、**Olive**、**Mist**、**Taupe**。

### 默认主题 CSS

以下是完整的默认 `neutral` 主题脚手架。将其复制到您的全局 CSS 文件中，并根据需要调整令牌。

（完整 CSS 见上方手动安装章节的样式配置部分）

### 不使用 CSS 变量

如果您不想使用 CSS 变量，CLI 可以生成使用内联 Tailwind 颜色工具类的组件：

```bash
npx shadcn@latest init --css-variables false
```

这会将 `tailwind.cssVariables` 设置为 `false`：

```json
{
  "tailwind": {
    "cssVariables": false
  }
}
```

这是一个安装时的选择。要切换现有项目，请删除并重新安装组件。

---

## 暗色模式 (Dark Mode)

为您的站点添加暗色模式。

### Next.js

安装 `next-themes`：
```bash
npm install next-themes
```

创建主题提供者，使用 `ThemeProvider` 的 `attribute="class"` 属性包装应用。

### Vite

安装 `next-themes`（与 Vite 兼容）：
```bash
npm install next-themes
```

### Astro

使用 `astro-theme-provider` 或 `next-themes`。

### Remix

使用 `next-themes`。

### TanStack Start

使用 `next-themes`。

---

## RTL 支持

shadcn/ui 组件对从右到左（RTL）布局提供一流的支持。文本对齐、定位和方向样式会自动适应阿拉伯语、希伯来语和波斯语等语言。

当您安装组件时，CLI 会自动将物理定位类转换为逻辑等价类，因此您的组件在 LTR 和 RTL 上下文中都能无缝工作。

### 入门

选择您的框架以开始使用 RTL 支持：

- [Next.js](https://ui.shadcn.com/docs/rtl/next)
- [Vite](https://ui.shadcn.com/docs/rtl/vite)
- [TanStack Start](https://ui.shadcn.com/docs/rtl/start)

### 工作原理

当您在 `components.json` 中设置 `rtl: true` 后添加组件时，shadcn CLI 会自动转换类和 props 以兼容 RTL：

- 物理定位类如 `left-*` 和 `right-*` 被转换为逻辑等价类如 `start-*` 和 `end-*`。
- 方向性 props 更新为使用逻辑值。
- 文本对齐和间距类相应调整。
- 支持的图标自动使用 `rtl:rotate-180` 翻转。

### 在线体验

点击链接在 v0 中打开一个带有 RTL 支持的 Next.js 项目：
[Open in v0](https://v0.app/chat/api/open?url=https://github.com/shadcn-ui/next-template-rtl)

### 支持的样式

通过 CLI 的自动 RTL 转换仅适用于使用 `shadcn create` 创建并使用新样式的项目（`base-nova`、`radix-nova` 等）。

对于其他样式，请参阅[迁移指南](https://ui.shadcn.com/docs/rtl#migrating-existing-components)。

### 字体推荐

为获得最佳 RTL 体验，我们推荐使用对目标语言有适当支持的字体。[Noto](https://fonts.google.com/noto) 字体系列非常适合此用途，并且与 Inter 和 Geist 搭配良好。

### 动画

CLI 也处理动画类，自动将物理方向动画转换为逻辑等价类。例如，`slide-in-from-right` 变为 `slide-in-from-end`。

这确保了下拉菜单、弹出框和工具提示等动画基于文档的文本方向以正确的方向播放。

**关于 tw-animate-css 的说明：**

`tw-animate-css` 库存在一个[已知问题](https://github.com/Wombosvideo/tw-animate-css/issues/67)，逻辑幻灯工具类无法按预期工作。目前，请确保向 portal 元素传递 `dir` prop：

```tsx
<PopoverContent dir="rtl">
```

```tsx
<PopoverContent dir="ltr">
```

### 迁移现有组件

如果您在启用 RTL 之前已安装现有组件，可以通过 CLI 迁移它们。

#### 运行 migrate 命令

```bash
npx shadcn@latest migrate rtl [path]
```

`[path]` 接受一个路径或 glob 模式来迁移。如果您不提供路径，它将迁移 `ui` 目录中的所有文件。

这将执行以下操作：
1. 更新 `components.json` 设置 `rtl: true`
2. 将物理 CSS 属性转换为逻辑等价类（例如 `ml-4` → `ms-4`，`text-left` → `text-start`）
3. 在需要的地方添加 `rtl:` 变体（例如 `space-x-4` → `space-x-4 rtl:space-x-reverse`）

#### 手动迁移（可选）

以下组件不会由 CLI 自动迁移。请按照每个组件的 RTL 支持章节手动迁移：

- [Calendar](https://ui.shadcn.com/docs/components/base/calendar#rtl-support)
- [Pagination](https://ui.shadcn.com/docs/components/base/pagination#rtl-support)
- [Sidebar](https://ui.shadcn.com/docs/components/base/sidebar#rtl-support)

#### 迁移图标

某些图标如 `ArrowRightIcon` 或 `ChevronLeftIcon` 可能需要 `rtl:rotate-180` 类才能正确翻转。将 `rtl:rotate-180` 类添加到图标组件以正确翻转：

```tsx
<ChevronRightIcon className="rtl:rotate-180" />
```

#### 添加 direction 组件

将 direction 组件添加到您的项目：
```bash
npx shadcn@latest add direction
```

#### 添加 DirectionProvider

按照您框架的文档了解如何将 `DirectionProvider` 组件添加到项目。

---

## CLI 命令行工具

使用 shadcn CLI 将组件添加到您的项目。

### init

使用 `init` 命令为现有项目初始化配置和依赖，或使用 `--name` 创建新项目。

`init` 命令安装依赖、添加 `cn` 工具函数并为项目配置 CSS 变量。

```bash
npx shadcn@latest init
```

创建一个新项目：
```bash
npx shadcn@latest init --name my-app --template next
```

`create` 命令是 `init` 的别名：
```bash
npx shadcn@latest create --name my-app --template next
```

**选项：**
| 选项 | 描述 |
|------|------|
| `-y, --yes` | 跳过所有提示并使用默认值 |
| `-w, --workspace <workspace>` | 目标工作区 |
| `-o, --output <path>` | 组件输出路径 |
| `--base <base>` | 基础目录 |
| `--monorepo` | 创建 monorepo 项目 |
| `--src-dir` | 使用 src 目录 |
| `--template <template>` | 模板（next、vite、start、react-router、astro） |
| `--css-variables <bool>` | 是否使用 CSS 变量 |
| `--base-color <color>` | 基础颜色 |
| `--icon-library <library>` | 图标库（lucide、radix） |
| `--font-family <family>` | 字体家族 |
| `--font-family-heading <family>` | 标题字体家族 |
| `--font-family-mono <family>` | 等宽字体家族 |
| `--yes` | 跳过提示 |

### add

使用 `add` 命令向项目添加组件和依赖。

```bash
npx shadcn@latest add button
npx shadcn@latest add button card alert
npx shadcn@latest add --all
npx shadcn@latest add https://registry.example.com/button
npx shadcn@latest add acme-corp:button
npx shadcn@latest add github:username/repo/button
```

**选项：**
| 选项 | 描述 |
|------|------|
| `-y, --yes` | 跳过提示 |
| `-o, --overwrite` | 覆盖现有文件 |
| `-p, --path <path>` | 组件安装路径 |

### apply

使用 `apply` 命令将预设应用到现有项目。

```bash
npx shadcn@latest apply <preset-code>
```

您可以仅应用预设中的主题或字体，而无需重新安装 UI 组件：
```bash
npx shadcn@latest apply <preset-code> --only theme
npx shadcn@latest apply <preset-code> --only font
```

支持的 `--only` 值：`theme`、`font`。

**选项：**
| 选项 | 描述 |
|------|------|
| `--only <type>` | 仅应用指定部分（theme、font） |
| `-y, --yes` | 跳过提示 |

### preset

使用 `preset` 命令检查预设代码并解析现有项目的预设。

```bash
npx shadcn@latest preset <subcommand> [options]
```

#### preset decode

解码预设代码：
```bash
npx shadcn@latest preset decode <code>
```

**选项：** `--json`（JSON 格式输出）

#### preset resolve

解析当前项目的预设：
```bash
npx shadcn@latest preset resolve
```

`preset info` 是 `preset resolve` 的别名：
```bash
npx shadcn@latest preset info
```

**选项：** `--json`（JSON 格式输出）

#### preset url

打印预设代码的 create URL：
```bash
npx shadcn@latest preset url <code>
```

**选项：** `--copy`（复制到剪贴板）

#### preset open

在浏览器中打开预设代码：
```bash
npx shadcn@latest preset open <code>
```

**选项：** 无

### view

在安装前查看注册表中的项目：

```bash
npx shadcn@latest view button
npx shadcn@latest view button card alert
npx shadcn@latest view acme-corp:button
```

**选项：** 无

### search

搜索注册表中的项目：

```bash
npx shadcn@latest search
npx shadcn@latest search button
npx shadcn@latest search --registries acme-corp
```

`list` 命令是 `search` 的别名：
```bash
npx shadcn@latest list
```

**选项：**
| 选项 | 描述 |
|------|------|
| `--registries <registries>` | 搜索特定注册表 |

### build

生成注册表 JSON 文件：

```bash
npx shadcn@latest build
```

此命令读取 `registry.json` 文件并在 `public/r` 目录中生成注册表 JSON 文件。

**选项：**
| 选项 | 描述 |
|------|------|
| `-o, --output <path>` | 输出目录（默认：public/r） |
| `-c, --cwd <path>` | 当前工作目录 |

### docs

获取组件的文档和 API 参考：

```bash
npx shadcn@latest docs button
```

**选项：**
| 选项 | 描述 |
|------|------|
| `--json` | JSON 格式输出 |

### info

获取项目信息：

```bash
npx shadcn@latest info
```

**选项：**
| 选项 | 描述 |
|------|------|
| `--json` | JSON 格式输出 |

### migrate

对项目运行迁移。

```bash
npx shadcn@latest migrate <migration> [path]
```

**可用迁移：**
| 迁移 | 描述 |
|------|------|
| `icons` | 将 UI 组件迁移到不同的图标库 |
| `radix` | 迁移到 radix-ui |
| `rtl` | 迁移组件以支持 RTL |

**选项：**
| 选项 | 描述 |
|------|------|
| `--dry-run` | 预览更改但不执行 |

#### migrate rtl

`rtl` 迁移转换您的组件以支持 RTL（从右到左）语言。

```bash
npx shadcn@latest migrate rtl [path]
```

这将：
1. 更新 `components.json` 设置 `rtl: true`
2. 将物理 CSS 属性转换为逻辑等价类（例如 `ml-4` → `ms-4`，`text-left` → `text-start`）
3. 在需要的地方添加 `rtl:` 变体（例如 `space-x-4` → `space-x-4 rtl:space-x-reverse`）

**迁移特定文件：**
```bash
npx shadcn@latest migrate rtl src/components/ui/**/*.tsx
```

如果不提供路径，迁移将转换 `ui` 目录（来自 `components.json`）中的所有文件。

#### migrate radix

`radix` 迁移将您的导入从单独的 `@radix-ui/react-*` 包更新为统一的 `radix-ui` 包。

```bash
npx shadcn@latest migrate radix [path]
```

这将：
1. 将导入从 `@radix-ui/react-*` 转换为 `radix-ui`
2. 将 `radix-ui` 包添加到您的 `package.json`

**迁移前：**
```tsx
import * as Dialog from "@radix-ui/react-dialog"
import * as Popover from "@radix-ui/react-popover"
```

**迁移后：**
```tsx
import * as Dialog from "radix-ui"
import * as Popover from "radix-ui"
```

**迁移特定文件：**
```bash
npx shadcn@latest migrate radix src/components/ui/**/*.tsx
```

完成后，您可以从 `package.json` 中删除任何未使用的 `@radix-ui/react-*` 包。

#### migrate icons

将 UI 组件迁移到不同的图标库。

### eject

当您运行 `init` 时，shadcn 会在您的全局 CSS 文件中添加 `@import "shadcn/tailwind.css"`。此导入提供共享的 Tailwind v4 工具类，如自定义变体（`data-open:`、`data-closed:` 等）和手风琴动画。

使用 `eject` 命令将 `shadcn/tailwind.css` 内联到全局 CSS 文件中，并从项目中移除 `shadcn` 依赖。

> **注意：此操作不可逆。** 弹出后，未来 shadcn CLI 对 `shadcn/tailwind.css` 的更新将不会自动应用。

```bash
npx shadcn@latest eject
```

**弹出前：**
```css
@import "tailwindcss";
@import "shadcn/tailwind.css";
```

**弹出后：**
```css
@import "tailwindcss";

@custom-variant data-open (&:is([data-state=open] *));
@custom-variant data-closed (&:is([data-state=closed] *));
/* ...内联内容... */
```

**Monorepo：** 在包含 `components.json` 和全局 CSS 文件的工作区运行命令：
```bash
cd apps/web && npx shadcn@latest eject
```

**选项：**
| 选项 | 描述 |
|------|------|
| `-y, --yes` | 跳过提示 |

---

## 组件

您可以在此找到库中所有可用的组件。我们正在努力添加更多组件。

### 新增组件

| 组件 | 链接 |
|------|------|
| Attachment (附件) | [文档](https://ui.shadcn.com/docs/components/base/attachment) |
| Bubble (气泡) | [文档](https://ui.shadcn.com/docs/components/base/bubble) |
| Marker (标记) | [文档](https://ui.shadcn.com/docs/components/base/marker) |
| Message (消息) | [文档](https://ui.shadcn.com/docs/components/base/message) |
| Message Scroller (消息滚动器) | [文档](https://ui.shadcn.com/docs/components/base/message-scroller) |

### 所有组件

| 组件名 | 描述 | 链接 |
|--------|------|------|
| **Accordion (手风琴)** | 垂直堆叠的交互式标题，可显示和隐藏相关内容面板 | [base/accordion](https://ui.shadcn.com/docs/components/base/accordion) |
| **Alert (警告)** | 显示重要信息的全局通知 | [base/alert](https://ui.shadcn.com/docs/components/base/alert) |
| **Alert Dialog (警告对话框)** | 需要用户确认的模态对话框 | [base/alert-dialog](https://ui.shadcn.com/docs/components/base/alert-dialog) |
| **Aspect Ratio (宽高比)** | 按指定比例显示内容 | [radix/aspect-ratio](https://ui.shadcn.com/docs/components/radix/aspect-ratio) |
| **Attachment (附件)** | 显示文件附件 | [base/attachment](https://ui.shadcn.com/docs/components/base/attachment) |
| **Avatar (头像)** | 用户头像，支持图片和回退 | [radix/avatar](https://ui.shadcn.com/docs/components/radix/avatar) |
| **Badge (徽章)** | 用于状态标签的小型视觉指示器 | [base/badge](https://ui.shadcn.com/docs/components/base/badge) |
| **Breadcrumb (面包屑)** | 显示页面在网站层次结构中的位置 | [radix/breadcrumb](https://ui.shadcn.com/docs/components/radix/breadcrumb) |
| **Bubble (气泡)** | 聊天/消息气泡，用于 AI 对话界面 | [base/bubble](https://ui.shadcn.com/docs/components/base/bubble) |
| **Button (按钮)** | 可点击的交互元素 | [base/button](https://ui.shadcn.com/docs/components/base/button) |
| **Button Group (按钮组)** | 将多个按钮组合在一起 | [base/button-group](https://ui.shadcn.com/docs/components/base/button-group) |
| **Calendar (日历)** | 日期选择日历 | [radix/calendar](https://ui.shadcn.com/docs/components/radix/calendar) |
| **Card (卡片)** | 包含内容和操作的容器 | [radix/card](https://ui.shadcn.com/docs/components/radix/card) |
| **Carousel (轮播)** | 水平滚动的项目集合 | [radix/carousel](https://ui.shadcn.com/docs/components/radix/carousel) |
| **Chart (图表)** | 基于 Recharts 的数据可视化 | [radix/chart](https://ui.shadcn.com/docs/components/radix/chart) |
| **Checkbox (复选框)** | 用于选择的复选框控件 | [base/checkbox](https://ui.shadcn.com/docs/components/base/checkbox) |
| **Collapsible (可折叠)** | 可切换显示/隐藏内容的交互式面板 | [base/collapsible](https://ui.shadcn.com/docs/components/base/collapsible) |
| **Combobox (组合框)** | 带有建议的下拉输入 | [base/combobox](https://ui.shadcn.com/docs/components/base/combobox) |
| **Command (命令面板)** | 类似 ⌘K 的命令面板 | [base/command](https://ui.shadcn.com/docs/components/base/command) |
| **Context Menu (上下文菜单)** | 右键点击时显示的菜单 | [base/context-menu](https://ui.shadcn.com/docs/components/base/context-menu) |
| **Data Table (数据表)** | 功能丰富的表格组件，基于 TanStack Table | [base/data-table](https://ui.shadcn.com/docs/components/base/data-table) |
| **Date Picker (日期选择器)** | 日期范围选择组件 | [base/date-picker](https://ui.shadcn.com/docs/components/base/date-picker) |
| **Dialog (对话框)** | 模态对话框 | [base/dialog](https://ui.shadcn.com/docs/components/base/dialog) |
| **Direction (方向)** | RTL/LTR 方向组件 | [radix/direction](https://ui.shadcn.com/docs/components/radix/direction) |
| **Drawer (抽屉)** | 从屏幕边缘滑入的面板 | [base/drawer](https://ui.shadcn.com/docs/components/base/drawer) |
| **Dropdown Menu (下拉菜单)** | 显示菜单项列表 | [base/dropdown-menu](https://ui.shadcn.com/docs/components/base/dropdown-menu) |
| **Empty (空状态)** | 无数据时的空状态占位 | [radix/empty](https://ui.shadcn.com/docs/components/radix/empty) |
| **Field (表单字段)** | 表单字段容器 | [radix/field](https://ui.shadcn.com/docs/components/radix/field) |
| **Hover Card (悬停卡片)** | 悬停时弹出的详细信息卡片 | [base/hover-card](https://ui.shadcn.com/docs/components/base/hover-card) |
| **Input (输入框)** | 文本输入控件 | [radix/input](https://ui.shadcn.com/docs/components/radix/input) |
| **Input Group (输入组)** | 分组输入控件 | [radix/input-group](https://ui.shadcn.com/docs/components/radix/input-group) |
| **Input OTP (一次性密码输入)** | OTP 输入组件 | [base/input-otp](https://ui.shadcn.com/docs/components/base/input-otp) |
| **Item (项)** | 可导航的项目 | [base/item](https://ui.shadcn.com/docs/components/base/item) |
| **Kbd (键盘按键)** | 键盘快捷键显示 | [base/kbd](https://ui.shadcn.com/docs/components/base/kbd) |
| **Label (标签)** | 表单元素标签 | [base/label](https://ui.shadcn.com/docs/components/base/label) |
| **Marker (标记)** | 高亮标记，用于聊天/消息中的代码语法高亮 | [base/marker](https://ui.shadcn.com/docs/components/base/marker) |
| **Menubar (菜单栏)** | 水平菜单栏 | [radix/menubar](https://ui.shadcn.com/docs/components/radix/menubar) |
| **Message (消息)** | 聊天/消息组件 | [base/message](https://ui.shadcn.com/docs/components/base/message) |
| **Message Scroller (消息滚动器)** | 聊天消息的自动滚动容器 | [radix/message-scroller](https://ui.shadcn.com/docs/components/radix/message-scroller) |
| **Native Select (原生选择)** | 浏览器原生下拉选择 | [base/native-select](https://ui.shadcn.com/docs/components/base/native-select) |
| **Navigation Menu (导航菜单)** | 响应式导航菜单 | [radix/navigation-menu](https://ui.shadcn.com/docs/components/radix/navigation-menu) |
| **Pagination (分页)** | 页面导航控件 | [base/pagination](https://ui.shadcn.com/docs/components/base/pagination) |
| **Popover (弹出框)** | 点击时弹出的浮动面板 | [base/popover](https://ui.shadcn.com/docs/components/base/popover) |
| **Progress (进度条)** | 显示任务进度的进度指示器 | [base/progress](https://ui.shadcn.com/docs/components/base/progress) |
| **Radio Group (单选组)** | 单选按钮组 | [base/radio-group](https://ui.shadcn.com/docs/components/base/radio-group) |
| **Resizable (可调整大小)** | 可拖拽调整大小的面板 | [base/resizable](https://ui.shadcn.com/docs/components/base/resizable) |
| **Scroll Area (滚动区域)** | 自定义滚动条的区域 | [radix/scroll-area](https://ui.shadcn.com/docs/components/radix/scroll-area) |
| **Select (选择器)** | 功能丰富的下拉选择组件 | [radix/select](https://ui.shadcn.com/docs/components/radix/select) |
| **Separator (分隔线)** | 视觉分隔线 | [base/separator](https://ui.shadcn.com/docs/components/base/separator) |
| **Sheet (侧边栏面板)** | 从屏幕侧面滑入的面板 | [base/sheet](https://ui.shadcn.com/docs/components/base/sheet) |
| **Sidebar (侧边栏)** | 应用侧边导航栏 | [base/sidebar](https://ui.shadcn.com/docs/components/base/sidebar) |
| **Skeleton (骨架屏)** | 加载占位符 | [radix/skeleton](https://ui.shadcn.com/docs/components/radix/skeleton) |
| **Slider (滑块)** | 范围选择滑块 | [base/slider](https://ui.shadcn.com/docs/components/base/slider) |
| **Sonner (通知)** | 基于 Sonner 的 toast 通知 | [base/sonner](https://ui.shadcn.com/docs/components/base/sonner) |
| **Spinner (加载中)** | 加载状态指示器 | [radix/spinner](https://ui.shadcn.com/docs/components/radix/spinner) |
| **Switch (开关)** | 切换开关控件 | [base/switch](https://ui.shadcn.com/docs/components/base/switch) |
| **Table (表格)** | 数据表格 | [base/table](https://ui.shadcn.com/docs/components/base/table) |
| **Tabs (标签页)** | 选项卡式内容切换 | [base/tabs](https://ui.shadcn.com/docs/components/base/tabs) |
| **Textarea (文本域)** | 多行文本输入 | [base/textarea](https://ui.shadcn.com/docs/components/base/textarea) |
| **Toast (提示)** | 短暂显示的通知消息 | [radix/toast](https://ui.shadcn.com/docs/components/radix/toast) |
| **Toggle (切换)** | 二选一状态切换按钮 | [base/toggle](https://ui.shadcn.com/docs/components/base/toggle) |
| **Toggle Group (切换组)** | 可切换按钮组 | [base/toggle-group](https://ui.shadcn.com/docs/components/base/toggle-group) |
| **Tooltip (工具提示)** | 悬停时显示的信息提示 | [base/tooltip](https://ui.shadcn.com/docs/components/base/tooltip) |
| **Typography (排版)** | 文本排版样式 | [base/typography](https://ui.shadcn.com/docs/components/base/typography) |

找不到所需组件？试试[注册表目录](https://ui.shadcn.com/docs/directory)中的社区维护组件。

---

## 表单 (Forms)

使用 React 和 shadcn/ui 构建表单。

### 选择你的表单库

shadcn/ui 支持以下表单库，每种都有不同的设计理念和 API 风格。

---

#### React Hook Form

[React Hook Form](https://react-hook-form.com/) 是 React 生态中最流行的表单库，注重性能和灵活性。

**安装**

```bash
npm install react-hook-form @hookform/resolvers zod
```

**核心模式**

React Hook Form 与 shadcn/ui 结合使用时，核心组件包括：

- **`<Field />`** — 表单字段容器，包含标签、描述和错误信息
- **`<FieldGroup />`** — 字段组容器，用于对相关字段进行分组
- **`<FieldSet />`** — fieldset 元素包装，用于字段集分组
- **`<FieldLegend />`** — fieldset 的图例
- **`<FieldError />`** — 显示字段验证错误信息

配合 React Hook Form 的 `useForm`、`Controller` 和 `zodResolver` 使用。

**基础用法**

```tsx
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Field, FieldGroup, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  username: z.string().min(3, "用户名至少 3 个字符"),
})

function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  })

  return (
    <form onSubmit={form.handleSubmit((data) => console.log(data))}>
      <FieldGroup>
        <Field label="用户名" data-invalid={!!form.formState.errors.username}>
          <Controller
            name="username"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                aria-invalid={!!form.formState.errors.username}
              />
            )}
          />
          {form.formState.errors.username && (
            <FieldError>
              {form.formState.errors.username.message}
            </FieldError>
          )}
        </Field>
      </FieldGroup>
      <Button type="submit">提交</Button>
    </form>
  )
}
```

**验证模式：** `onChange`（每次变更触发）、`onBlur`（失焦触发）、`onSubmit`（提交时触发，默认）、`onTouched`（首次失焦后每次变更触发）、`all`。使用 `useFieldArray` 钩子管理动态数组字段。

---

#### TanStack Form

[TanStack Form](https://tanstack.com/form/latest) 是一个无头、类型安全的表单库，采用 render-prop 模式。

**安装**

```bash
npm install @tanstack/react-form
```

**核心模式**

- **`useForm`** — 创建表单实例
- **`form.Field`** — 通过 render-prop 模式渲染单个字段
- **`field.state.value` / `field.handleChange`** — 绑定值到 shadcn/ui 组件

**基础用法**

```tsx
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import { Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  username: z.string().min(3, "用户名至少 3 个字符"),
})

function MyForm() {
  const form = useForm({
    validators: { onSubmit: formSchema },
    defaultValues: { username: "" },
    onSubmit: (data) => console.log(data.value),
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.Field name="username">
        {(field) => (
          <Field
            label="用户名"
            data-invalid={field.state.meta.errors.length > 0}
          >
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={field.state.meta.errors.length > 0}
            />
            {field.state.meta.errors.length > 0 && (
              <FieldError>{field.state.meta.errors[0]?.message}</FieldError>
            )}
          </Field>
        )}
      </form.Field>
      <Button type="submit">提交</Button>
    </form>
  )
}
```

TanStack Form 使用 `form.Field` 组件的 render-prop 模式访问字段状态。验证支持 `onChange`、`onBlur` 和 `onSubmit` 模式。数组字段使用 `mode="array"` 属性配合 `field.pushValue()` 和 `field.removeValue()` 管理。

---

#### Formisch

[Formisch](https://formisch.dev/) 是一个轻量级、schema 优先、完全类型安全的 React 表单库。

**安装**

```bash
npm install formisch valibot
```

**核心模式**

- **`useForm`** — 创建表单实例，schema 直接传入（无需 resolver）
- **`<Form />`** — 包装原生 `<form>`，自动处理 `preventDefault` 和验证
- **`<Field />`**（Formisch）— render-prop 模式，别名导入以避免与 shadcn/ui 的 `Field` 冲突

**基础用法**

```tsx
import { useForm, Form as FormischForm, Field as FormischField } from "formisch"
import * as v from "valibot"
import { Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = v.object({
  username: v.pipe(v.string(), v.minLength(3, "用户名至少 3 个字符")),
})

function MyForm() {
  const form = useForm({ schema: formSchema })

  return (
    <FormischForm form={form} onSubmit={(output) => console.log(output)}>
      <FormischField name="username" form={form}>
        {(field) => (
          <Field
            label="用户名"
            data-invalid={field.errors.length > 0}
          >
            <Input
              {...field.props}
              value={field.input}
              aria-invalid={field.errors.length > 0}
            />
            {field.errors.length > 0 && (
              <FieldError>{field.errors[0]}</FieldError>
            )}
          </Field>
        )}
      </FormischField>
      <Button type="submit">提交</Button>
    </FormischForm>
  )
}
```

Formisch 的验证直接基于传入 `useForm` 的 Valibot schema，无需 resolver 步骤。验证通过 `validate`（首次验证时机）和 `revalidate`（后续验证时机）参数分别配置。支持 `"submit"`、`"blur"`、`"input"` 和 `"initial"` 模式。

---

## Monorepo 支持

在 monorepo 中使用 shadcn/ui 组件和 CLI。

以前，在 monorepo 中使用 shadcn/ui 有些麻烦。您可以使用 CLI 添加组件，但必须管理组件的安装位置并手动修复导入路径。

现在，CLI 能够理解 monorepo 结构，并会将组件、依赖和注册表依赖安装到正确的路径，自动为您处理导入。

### 入门

#### 创建新 Monorepo 项目

使用 `--monorepo` 标志运行 `init` 命令：

```bash
npx shadcn@latest init --template next --monorepo
```

然后选择要使用的模板。

这将创建一个包含两个工作区 `web` 和 `ui` 的 monorepo 项目，并使用 [Turborepo](https://turbo.build/repo/docs) 作为构建系统。一切已为您设置好，您可以开始向项目添加组件了。

#### 向项目添加组件

在应用路径中运行 `add` 命令：

```bash
cd apps/web
npx shadcn@latest add button
# 或从根目录：
npx shadcn@latest add button -w apps/web
```

CLI 将识别添加的组件类型，并将正确的文件安装到正确的路径。

例如，运行 `npx shadcn@latest add button`，CLI 会将 button 组件安装在 `packages/ui` 下，并更新 `apps/web` 中组件的导入路径。

运行 `npx shadcn@latest add login-01`，CLI 会将 `button`、`label`、`input` 和 `card` 组件安装在 `packages/ui` 下，将 `login-form` 组件安装在 `apps/web/components` 下。

#### 导入组件

```tsx
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { useToast } from "@workspace/ui/hooks/use-toast"
```

### 文件结构

创建新 monorepo 项目时，CLI 会创建以下文件结构：

```
my-app/
├── apps/
│   └── web/
│       ├── components.json
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── globals.css
│       └── package.json
├── packages/
│   └── ui/
│       ├── components.json
│       ├── src/
│       │   ├── components/
│       │   │   └── ui/
│       │   ├── lib/
│       │   └── hooks/
│       └── package.json
├── package.json
└── turbo.json
```

### 要求

1. 每个工作区必须有一个 `components.json` 文件。`package.json` 告诉 npm 如何安装依赖。`components.json` 告诉 CLI 如何及在哪里安装组件。

2. `components.json` 文件必须正确定义工作区的别名。这告诉 CLI 如何导入组件、hooks、工具等。

**apps/web/components.json：**
```json
{
  "aliases": {
    "ui": "@workspace/ui/components",
    "components": "@/components",
    "lib": "@/lib",
    "hooks": "@/hooks",
    "utils": "@workspace/ui/lib/utils"
  }
}
```

**packages/ui/components.json：**
```json
{
  "aliases": {
    "ui": "@/components/ui",
    "components": "@/components",
    "lib": "@/lib",
    "hooks": "@/hooks",
    "utils": "@/lib/utils"
  }
}
```

3. 确保两个 `components.json` 文件中具有相同的 `style`、`iconLibrary` 和 `baseColor`。

4. **对于 Tailwind CSS v4，在 `components.json` 文件中将 `tailwind` 配置留空。**

遵循这些要求，CLI 将能够将 UI 组件、块、库和 hooks 安装到正确的路径并处理导入。

`package.json#imports` 适用于工作区内的本地别名，例如在 `packages/ui` 内部。对于共享工作区导入如 `@workspace/ui/components`，在 `components.json` 中保留显式别名。CLI 使用这些别名来跨工作区边界路由文件。

### 使用 package.json#imports

对于使用包导入且不依赖 `tsconfig.json` `paths` 的 monorepo，使用：
- 每个工作区内部文件的本地 `#...` 别名
- 共享导入（如 `@workspace/ui/components`）的工作区包 `exports`

例如，应用工作区可以使用本地包导入：

**apps/web/package.json：**
```json
{
  "imports": {
    "#components/*": "./app/components/*.tsx",
    "#lib/*": "./app/lib/*.ts"
  }
}
```

**apps/web/components.json：**
```json
{
  "aliases": {
    "ui": "@workspace/ui/components",
    "components": "#components",
    "lib": "#lib",
    "hooks": "#hooks",
    "utils": "@workspace/ui/lib/utils"
  }
}
```

共享 UI 包通过 `exports` 暴露其安装目标：

**packages/ui/package.json：**
```json
{
  "exports": {
    "./components/*": "./src/components/*",
    "./lib/*": "./src/lib/*",
    "./hooks/*": "./src/hooks/*"
  }
}
```

**packages/ui/components.json：**
```json
{
  "aliases": {
    "ui": "#components/ui",
    "components": "#components",
    "lib": "#lib",
    "hooks": "#hooks",
    "utils": "#lib/utils"
  }
}
```

在这种设置中：
- 从应用添加到共享 UI 包的文件通过 `@workspace/ui/...` 路由
- 添加在 `packages/ui` 内部的文件使用包本地 `#...` 别名
- 共享包必须导出其他工作区引用的任何路径

---

## Skills（AI 技能）

为你的 AI 助手提供关于 shadcn/ui 组件、模式和最佳实践的深入知识。

Skills 让 AI 助手（如 Claude Code）获得项目感知的 shadcn/ui 上下文。安装后，你的 AI 助手知道如何为你的项目查找、安装、组合和自定义组件，使用正确的 API 和模式。

例如，你可以让 AI 助手执行以下操作：

- "添加一个包含邮箱和密码字段的登录表单。"
- "创建一个设置页面，包含用于更新个人资料信息的表单。"
- "构建一个带有侧边栏、统计卡片和数据表格的仪表盘。"
- "切换到 --preset [CODE] 预设"
- "你能从 @tailark 添加一个 hero 组件吗？"

该技能读取项目的 `components.json`，为助手提供你的框架、别名、已安装组件、图标库和基础库信息，使其能首次就生成正确的代码。

### 安装

```bash
npx shadcn@latest skills install
```

这会将 shadcn 技能安装到你的项目中。安装后，你的 AI 助手在处理 shadcn/ui 组件时会自动加载它。了解更多关于技能的信息，请访问 [skills.sh](https://skills.sh/)。

### 包含内容

#### 项目上下文

每次交互时，技能会运行 `shadcn info --json` 来获取项目配置：框架、Tailwind 版本、别名、基础库（`base` 或 `radix`）、图标库、已安装组件和解析后的文件路径。

#### CLI 命令

所有 CLI 命令的完整参考：`init`、`add`、`search`、`view`、`docs`、`diff`、`info` 和 `build`。包含 flags、dry-run 模式、智能合并工作流、预设和模板。

#### 主题与自定义

CSS 变量、OKLCH 颜色、暗色模式、自定义颜色、圆角和组件变体的工作原理。包含 Tailwind v3 和 v4 的指导。

#### 注册表创作

如何构建和发布自定义组件注册表：`registry.json` 格式、项目类型、文件对象、依赖、CSS 变量、构建、托管和用户配置。

#### MCP 服务器

shadcn MCP 服务器的设置和工具，让 AI 助手能够搜索、浏览和安装注册表中的组件。

### 工作原理

1. **项目检测** — 技能在项目中找到 `components.json` 文件时自动激活。
2. **上下文注入** — 运行 `shadcn info --json` 读取项目配置并将结果注入助手的上下文中。
3. **模式执行** — 助手遵循 shadcn/ui 组合规则：使用 `FieldGroup` 构建表单、使用 `ToggleGroup` 处理选项集、语义化颜色以及正确的基础库特定 API。
4. **组件发现** — 助手在生成代码前使用 `shadcn docs`、`shadcn search` 或 MCP 工具查找组件及其文档。

---

## JavaScript 支持

如何在 shadcn/ui 中使用 JavaScript。

本项目及其组件均使用 TypeScript 编写。**我们强烈建议你也为项目使用 TypeScript。**

不过，我们也提供了组件的 JavaScript 版本。JavaScript 版本可通过 [CLI](https://ui.shadcn.com/docs/cli) 获得。

### 启用 JavaScript

要选择不使用 TypeScript，请在 `components.json` 文件中设置 `tsx` 标志为 `false`：

```json
{
  "tsx": false
}
```

设置后，CLI 添加的组件将以 `.jsx` 扩展名生成，而非 `.tsx`。

### 配置导入别名

使用 JavaScript 时，可通过以下 `jsconfig.json` 配置导入别名：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

`baseUrl` 和 `paths` 的配置应与 `components.json` 中的别名设置保持一致，确保组件导入路径正确解析。

> **推荐：** TypeScript 提供了类型安全和更好的开发体验。除非有特殊需求，建议始终使用 TypeScript。

---

## 工具类 (Utilities)

### scroll-fade

为滚动容器的边缘添加淡出效果的实用工具类。当 `npx shadcn@latest init` 初始化项目时，`scroll-fade` 已随 `shadcn` 包内置。

#### 使用

| 类名 | 样式 |
|------|------|
| `scroll-fade` / `scroll-fade-y` | 垂直滚动淡出 |
| `scroll-fade-x` | 水平滚动淡出 |
| `scroll-fade-t` | 仅顶部边缘淡出 |
| `scroll-fade-b` | 仅底部边缘淡出 |
| `scroll-fade-l` | 仅左侧边缘淡出 |
| `scroll-fade-r` | 仅右侧边缘淡出 |
| `scroll-fade-s` | 逻辑起始边缘淡出（RTL 下自动镜像） |
| `scroll-fade-e` | 逻辑结束边缘淡出（RTL 下自动镜像） |
| `scroll-fade-<数字>` | 设置淡出尺寸（基于间距比例） |
| `scroll-fade-none` | 移除淡出效果 |

将 `scroll-fade` 或 `scroll-fade-y` 添加到设置了 `overflow-y-auto` 的滚动容器上：

```html
<div class="scroll-fade overflow-y-auto h-48">
  <!-- 列表内容 -->
</div>
```

淡出效果通过 `mask-image` 实现，直接淡化内容本身而非叠加颜色。默认淡出深度为容器尺寸的 `12%`，上限 `40px`。使用 `scroll-fade-<数字>` 设置固定尺寸，如 `scroll-fade-[120px]`。使用 `--scroll-fade-reveal` 变量控制淡出的滚动响应距离（默认 `96px`）。

在不支持 CSS 滚动驱动动画的浏览器中，回退为在两端显示静态淡出效果。

`ScrollArea` 和 `MessageScroller` 组件可在其可滚动视口上使用 `scroll-fade`。

---

### shimmer

为文本元素添加微光闪烁效果的实用工具类。当 `npx shadcn@latest init` 初始化项目时，`shimmer` 已随 `shadcn` 包内置。

#### 使用

| 类名 | 样式 |
|------|------|
| `shimmer` | 背景裁剪为文本，动画持续循环 |
| `shimmer-once` | 仅播放一次动画 |
| `shimmer-reverse` | 反向播放动画 |
| `shimmer-none` | 禁用闪烁效果 |
| `shimmer-color-<颜色>` | 设置高亮颜色 |
| `shimmer-duration-<数字>` | 设置动画时长（毫秒） |
| `shimmer-spread-<数字>` | 设置高亮带宽度 |
| `shimmer-angle-<数字>` | 设置高亮带倾斜角度 |

将 `shimmer` 添加到文本元素上：

```html
<h1 class="shimmer text-4xl font-bold">加载中...</h1>
```

闪烁效果基于 `currentColor` 构建，自动适配元素的文本颜色。和 `Marker` 组件搭配：`<Marker class="shimmer">思考中...</Marker>`。

- **颜色**：`shimmer-color-sky-300` 或 `shimmer-color-[#ff6b6b]`
- **时长**：`shimmer-duration-1000`（1 秒一个周期，默认 2000）
- **宽度**：`shimmer-spread-4`（窄）或 `shimmer-spread-24`（宽），默认 `calc(3ch + 40px)`
- **角度**：`shimmer-angle-45`（45 度，默认 20）

当用户偏好减少动画时，闪烁效果会自动禁用。RTL 下动画方向自动跟随阅读方向。

---

## 注册表 (Registry)

### 介绍

运行你自己的代码注册表。

你可以使用 `shadcn` CLI 运行自己的代码注册表。运行自己的注册表可以让你将自定义组件、hooks、页面、配置文件、规则和其他文件分发给任何项目。

**注意：** 注册表适用于任何项目类型和任何框架，不限于 React。

注册表是一个代码分发系统——准备好创建你自己的注册表了吗？下一节将逐步指导你从创建第一个组件到发布供他人使用。

- [入门指南](https://ui.shadcn.com/docs/registry/getting-started) - 设置并构建你自己的注册表
- [GitHub 注册表](https://ui.shadcn.com/docs/registry/github) - 将 GitHub 仓库转变为注册表
- [命名空间](https://ui.shadcn.com/docs/registry/namespace) - 使用命名空间配置注册表
- [认证](https://ui.shadcn.com/docs/registry/authentication) - 使用认证保护你的注册表
- [示例](https://ui.shadcn.com/docs/registry/examples) - 浏览示例注册表项
- [Schema](https://ui.shadcn.com/docs/registry/registry-json) - registry.json 的 Schema 规范

### 入门 (Getting Started)

学习如何设置和运行你自己的组件注册表。

本指南将引导你完成设置自己的注册表的整个过程。它假定你已经有一个包含组件、hooks、工具函数或其他你想要分发的文件的项目。

**如果你有一个现有的公共 GitHub 仓库，你只需在根目录添加一个 `registry.json` 文件即可将其转变为注册表。** 详见 [GitHub 注册表](https://ui.shadcn.com/docs/registry/github)。

如果你是新建注册表项目，可以使用 [registry template](https://github.com/shadcn-ui/registry-template) 作为起点。

#### 要求

你可以自由地按照自己的意愿设计和发布自定义注册表。唯一的要求是注册表目录（catalog）和注册表项（registry items）必须符合 [registry schema 规范](https://ui.shadcn.com/docs/registry/registry-json)和 [registry-item schema 规范](https://ui.shadcn.com/docs/registry/registry-item-json)。

你的注册表可以是 Next.js、Vite、Vue、Svelte、PHP 或任何其他支持通过 HTTP 提供 JSON 的框架。它也可以是在根目录包含 `registry.json` 文件的公共 GitHub 仓库。

#### registry.json

`registry.json` 是注册表的入口点。它包含注册表的名称、主页，并定义了注册表中存在的所有项。

你的注册表必须在注册表端点的根目录存在此文件（或 JSON 负载）。注册表端点是你托管注册表的 URL。

```json
{
  "name": "acme",
  "homepage": "https://acme.com",
  "items": []
}
```

#### 组织注册表结构

你可以通过以下两种方式之一组织源注册表结构：

- **方案 A：单一 registry.json** - 在项目根目录创建一个 `registry.json` 文件，将所有注册表项添加到 `items` 数组中。这是定义注册表最简单的方式。
- **方案 B：使用 include** - 对于较大的注册表，你可以使用 `include` 从多个 `registry.json` 文件组合你的源注册表。

**方案 A：单一 registry.json**

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "A button component",
      "files": [
        {
          "path": "components/ui/button.tsx",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

**方案 B：使用 include**

根目录的 `registry.json` 定义注册表元数据并包含嵌套的注册表文件：

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "include": [
    "components/ui/registry.json",
    "hooks/registry.json"
  ]
}
```

被包含的 `registry.json` 文件是有效的组合注册表文件，可以省略 `name` 和 `homepage`。只有根 `registry.json` 必须定义注册表元数据。

```json
// components/ui/registry.json
{
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "files": [{ "path": "button.tsx", "type": "registry:ui" }]
    }
  ]
}
```

```json
// hooks/registry.json
{
  "items": [
    {
      "name": "use-debounce",
      "type": "registry:hook",
      "files": [{ "path": "use-debounce.ts", "type": "registry:hook" }]
    }
  ]
}
```

使用 `include` 时，文件路径是相对于声明该项的 `registry.json` 文件。

#### 添加注册表项

**创建 UI 组件**

添加你的第一个项。以下是一个简单的 `<Button />` 组件示例：

```tsx
// components/ui/button.tsx
export function Button() {
  return <button>Click me</button>
}
```

**注意：** 本示例将组件放在 `components/ui` 目录中。你可以将其放在项目中的任何位置，只要在 `registry.json` 文件中设置正确的路径即可。

**将项添加到注册表**

要将组件添加到注册表，请在 `registry.json` 中添加项定义。如果你使用 `include`，请将项添加到拥有该组件的被包含 `registry.json` 文件中。

```json
{
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "A button component",
      "files": [
        {
          "path": "components/ui/button.tsx",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

你通过添加 `name`、`type`、`title`、`description` 和 `files` 来定义注册表项。对于添加的每个文件，必须指定 `path` 和 `type`。在单一文件注册表中，`path` 相对于项目根目录。使用 `include` 时，`path` 相对于声明该项的 `registry.json` 文件。`type` 是文件的类型。

#### 提供注册表服务

你可以以静态 JSON 文件或动态路由处理程序的方式提供注册表服务。

**方案 A：静态 JSON 文件**

运行构建命令以生成静态注册表 JSON 文件：

```bash
npx shadcn@latest build
```

如果你的源注册表使用了 `include`，`shadcn build` 会解析被包含的注册表并将扁平化的注册表写入输出目录。生成的 `registry.json` 不包含 `include`。

**注意：** 默认情况下，构建命令会在 `public/r` 目录下生成注册表 JSON 文件，例如 `public/r/button.json`。你可以通过 `--output` 选项更改输出目录。

如果你在 Next.js 上运行注册表，可以通过运行 `next` 服务器来提供这些文件：

```bash
npx next start
```

你的文件现在将在 `http://localhost:3000/r/[NAME].json`（例如 `http://localhost:3000/r/button.json`）提供服务。

**方案 B：动态路由处理程序**

如果你想在请求时从源 `registry.json` 提供注册表 JSON，请使用 `shadcn/registry` 的生产端 loader API。

首先安装 `shadcn` 作为运行时依赖：

```bash
npm install shadcn
```

使用 `loadRegistry` 提供注册表目录：

```ts
// app/r/registry.json/route.ts
import { loadRegistry } from "shadcn/registry"

export async function GET() {
  const registry = await loadRegistry()
  return Response.json(registry)
}
```

使用 `loadRegistryItem` 提供单个注册表项：

```ts
// app/r/[name].json/route.ts
import { loadRegistryItem } from "shadcn/registry"

export async function GET(
  _request: Request,
  { params }: { params: { name: string } }
) {
  const item = await loadRegistryItem(params.name)
  return Response.json(item)
}
```

两个 loader 在返回 JSON 之前都会解析 `include`，因此路由处理程序可以使用相同的源 `registry.json` 结构，而无需运行 `shadcn build`。

#### 测试注册表

提供注册表服务后，使用其他开发者将使用的相同 CLI 命令进行测试。

**使用 URL**

```bash
# 列出项
npx shadcn@latest list http://localhost:3000/r/registry.json

# 搜索项
npx shadcn@latest search http://localhost:3000/r/registry.json button

# 查看项
npx shadcn@latest view http://localhost:3000/r/button.json

# 添加项（在要安装项的项目中运行）
npx shadcn@latest add http://localhost:3000/r/button.json
```

**使用命名空间**

你还可以使用命名空间测试你的注册表。从包含 `components.json` 文件的项目中，将注册表 URL 模板添加到项目：

```bash
npx shadcn@latest add registry http://localhost:3000/r/{name}.json
```

`{name}` 占位符必须解析为项 JSON 文件。例如，`@acme/button` 解析为 `http://localhost:3000/r/button.json`。目录仍然在 `http://localhost:3000/r/registry.json` 单独提供服务。

```bash
# 列表
npx shadcn@latest list @acme

# 搜索
npx shadcn@latest search @acme button

# 查看
npx shadcn@latest view @acme/button

# 添加
npx shadcn@latest add @acme/button
```

#### 发布注册表

要使你的注册表对其他开发者可用，请将项目发布到公共 URL。部署后，用户可以直接从项 URL 安装项，或者将你的注册表作为命名空间添加到他们的项目中。

**分享命名空间设置说明**

如果你希望用户使用像 `@acme/button` 这样的命名空间安装项，告诉他们将自己的注册表 URL 模板添加到项目。当 CLI 解析注册表项时，`{name}` 占位符会被替换为项名称。

模板必须解析为项 JSON 文件。例如，`@acme/button` 解析为 `https://acme.com/r/button.json`。你的注册表目录仍应在 `https://acme.com/r/registry.json` 单独提供服务。

他们可以使用 CLI 添加命名空间：

```bash
npx shadcn@latest add registry https://acme.com/r/{name}.json
```

或者手动在 `components.json` 文件的 `registries` 字段中添加：

```json
{
  "registries": {
    "acme": {
      "url": "https://acme.com/r/{name}.json"
    }
  }
}
```

用户然后可以通过命名空间消费注册表中的项：

```bash
npx shadcn@latest add @acme/button
```

**将命名空间添加到注册表索引**

如果你的注册表是开源的且公开可用，你可以将命名空间提交到官方注册表索引。这样用户可以按名称添加你的命名空间，而无需粘贴完整的 URL 模板。

#### 指南

构建注册表组件时需遵循以下指南：

- 将注册表项放在 `registry/[STYLE]/[NAME]` 目录中。这里使用 `default` 作为示例。可以是任何你想要的名称，只要它嵌套在 `registry` 目录下即可。
- 对于 blocks，以下属性是必需的：`name`、`description`、`type` 和 `files`。
- 建议为注册表项添加合适的名称和描述。这有助于 LLM 理解组件及其用途。
- 确保在 `registryDependencies` 中列出所有注册表依赖。注册表依赖是一个项地址，例如 `button`、`@acme/input-form`、`acme/ui/button` 或 `http://localhost:3000/r/editor.json`。
- 确保在 `dependencies` 中列出所有依赖。依赖是注册表中包的名称，例如 `zod`、`sonner` 等。要设置版本，可以使用 `name@version` 格式，例如 `zod@^3.20.0`。
- **导入应始终使用 `@/registry` 路径。** 例如 `import { HelloWorld } from "@/registry/default/hello-world/hello-world"`
- 理想情况下，将文件放在注册表项内的 `components`、`hooks`、`lib` 目录中。

### GitHub 注册表 (GitHub Registries)

使用公共 GitHub 仓库作为注册表。

你现在可以将**任何公共 GitHub 仓库转变为注册表。** 在仓库根目录添加一个 `registry.json` 文件，描述你想要分享的文件，用户就可以使用 `shadcn` CLI 安装它们。

```bash
npx shadcn@latest add github:username/repo/item-name
```

你**不需要**设置注册表服务器或发布生成的 JSON 文件。**GitHub 仓库本身成为源注册表。**

#### 分发任何内容

注册表项**不限于组件或 React 代码。** 它们可以包含仓库中的任何文件：源文件、配置、文档、模板、工作流、规则或项目约定。

| 用途 | 示例文件 |
|------|---------|
| 组件 | `components/date-picker.tsx`、`components/data-table.tsx` |
| 辅助函数和工具 | `lib/format-date.ts`、`lib/cn.ts`、`hooks/use-copy.ts` |
| 设计系统包 | `tokens/colors.json`、`styles/theme.css`、`components/*` |
| 功能套件 | `app/(auth)/*`、`lib/auth.ts`、`components/login-form.tsx` |
| Agent 工作流 | `AGENTS.md`、`.cursor/rules/*`、`.claude/commands/*` |
| 项目约定 | `.editorconfig`、`biome.json`、`docs/conventions.md` |
| Codemods 和迁移工具 | `codemods/*`、`scripts/migrate.ts`、`docs/migration.md` |
| 测试配置 | `vitest.config.ts`、`test/setup.ts`、`docs/testing.md` |
| CI 和发布工作流 | `.github/workflows/ci.yml`、`.github/workflows/release.yml` |
| 项目和自动化 | `scripts/release.ts`、`scripts/checks.ts`、`docs/automation.md` |
| Issue 和 PR 模板 | `.github/ISSUE_TEMPLATE/*`、`.github/pull_request_template.md` |
| MCP 配置 | `.mcp.json`、`.cursor/mcp.json` |

#### 何时使用 GitHub

在以下情况下使用 GitHub 注册表：

- 你已经在公共 GitHub 仓库中有可重用代码。
- 你希望用户直接从 `owner/repo/item` 安装。
- 你想分发配置文件、规则、文档、模板、工具或同一仓库中的任何其他文件。
- 你不需要私有仓库访问或自定义请求认证。

#### 要求

GitHub 注册表必须：

- 是 `github.com` 上的公共仓库。
- 在仓库根目录有一个 `registry.json` 文件。
- 使用有效的 `registry.json` 和 `registry-item.json` schema。
- 引用的源文件必须存在于仓库中。

私有仓库和 GitHub Enterprise 主机目前不被 GitHub 地址支持。对于私有或经过认证的注册表，请使用[命名空间](https://ui.shadcn.com/docs/registry/namespace)配合[认证](https://ui.shadcn.com/docs/registry/authentication)。

#### 第一步：添加 registry.json

给定一个现有的公共仓库：

```
my-toolkit/
├── components/
│   └── button.tsx
└── lib/
    └── utils.ts
```

在仓库根目录添加 `registry.json`：

```json
{
  "name": "my-toolkit",
  "homepage": "https://github.com/username/my-toolkit",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "files": [
        { "path": "components/button.tsx", "type": "registry:ui" }
      ]
    }
  ]
}
```

提交并推送文件：

```bash
git add registry.json
git commit -m "add registry.json"
git push
```

用户现在可以从 GitHub 安装该项：

```bash
npx shadcn@latest add github:username/my-toolkit/button
```

#### 第二步：分发任何文件

注册表项可以安装一个文件或多个文件。使用 `files` 数组声明属于同一组的文件。

例如，一个测试设置可以安装 Vitest 配置、一个设置文件和一个简短的团队指南：

```json
{
  "items": [
    {
      "name": "testing-setup",
      "type": "registry:file",
      "title": "Testing Setup",
      "description": "Vitest config, setup file, and team guide",
      "files": [
        { "path": "vitest.config.ts", "type": "registry:file", "target": "~/vitest.config.ts" },
        { "path": "test/setup.ts", "type": "registry:file", "target": "~/test/setup.ts" },
        { "path": "docs/testing.md", "type": "registry:file", "target": "~/docs/testing.md" }
      ]
    }
  ]
}
```

用户以相同方式安装：

```bash
npx shadcn@latest add github:username/my-toolkit/testing-setup
```

使用 `target` 指定文件应写入用户项目中的特定目标位置。

#### 第三步：验证注册表

在分享注册表之前，从 CLI 验证它：

```bash
npx shadcn@latest validate github:username/my-toolkit
```

该命令读取根 `registry.json`，解析 include，验证注册表项，并检查引用的文件是否存在。

你也可以验证分支、标签或提交 SHA：

```bash
npx shadcn@latest validate github:username/my-toolkit#v1.0.0
```

#### 第四步：列表和搜索项

```bash
# 列出所有项
npx shadcn@latest list github:username/my-toolkit

# 搜索
npx shadcn@latest search github:username/my-toolkit button

# 查看项
npx shadcn@latest view github:username/my-toolkit/button
```

#### 使用 include 组织

对于较大的仓库，将项定义保持在其描述的源文件附近：

```
my-toolkit/
├── registry.json          # root with include
├── rules/
│   ├── registry.json      # declares items for rules/
│   ├── project-conventions.md
│   └── code-review.md
└── components/
    ├── registry.json      # declares items for components/
    └── button.tsx
```

根 `registry.json` 可以包含嵌套的注册表文件：

```json
{
  "name": "my-toolkit",
  "include": ["rules/registry.json", "components/registry.json"]
}
```

被包含的注册表文件为该目录声明项：

```json
// rules/registry.json
{
  "items": [
    {
      "name": "project-conventions",
      "type": "registry:file",
      "files": [{ "path": "project-conventions.md", "type": "registry:file", "target": "~/docs/project-conventions.md" }]
    }
  ]
}
```

使用 `include` 时，文件路径是相对于声明该项的 `registry.json` 文件。

#### 注册表依赖

使用 `registryDependencies` 表示一个注册表项依赖于另一个注册表项。

**同一仓库依赖：**

```json
{
  "items": [
    {
      "name": "login-form",
      "type": "registry:block",
      "registryDependencies": ["github:username/my-toolkit/button", "github:username/my-toolkit/input"]
    }
  ]
}
```

**外部注册表依赖：**

```json
{
  "items": [
    {
      "name": "dashboard",
      "type": "registry:block",
      "registryDependencies": ["shadcn/button", "@acme/chart", "github:other-org/toolkit/card"]
    }
  ]
}
```

#### Refs

使用 `#ref` 从分支、标签或提交 SHA 安装：

```bash
npx shadcn@latest add github:username/my-toolkit/button#v1.0.0
npx shadcn@latest add github:username/my-toolkit/button#main
npx shadcn@latest add github:username/my-toolkit/button#abc123def456abc123def456abc123def456abc123
```

Refs 可以包含斜杠。如果未提供 ref，CLI 使用仓库的默认分支。CLI 使用 Git 将分支、标签和短 ref 解析为提交 SHA，然后读取文件。完整的 40 字符提交 SHA 直接使用，不需要 Git。

#### 安装前审查

GitHub 注册表项从公共仓库安装代码和项目文件。将 GitHub 项地址视为任何其他第三方代码依赖。

在从你不控制的源安装之前：

- 审查仓库和根 `registry.json`。
- 审查项定义，特别是 `files`、`target`、`dependencies`、`devDependencies`、`registryDependencies` 和 `envVars`。
- 检查任何外部注册表依赖。它们可以从其他注册表安装文件。
- 对于发布的安装命令，优先使用固定 ref。完整的 40 字符提交 SHA 是最可重现的选项。
- 使用 `shadcn view acme/toolkit/project-conventions` 在安装前检查解析后的项负载。
- 使用 `shadcn add acme/toolkit/project-conventions --dry-run` 预览安装而不写入文件。
- 使用 `--diff` 或 `--view` 与 `shadcn add` 一起在应用前检查文件更改或文件内容。

### 命名空间注册表 (Namespaces)

配置和使用多个资源注册表，支持命名空间。

命名空间注册表让你在一个项目中配置多个资源来源。这意味着你可以从各种注册表安装组件、库、工具、AI 提示、配置文件和其他资源，无论它们是公共的、第三方的，还是你自己自定义的私有库。

#### 概述

注册表命名空间以 `@` 为前缀，提供了一种组织和引用不同来源资源的方式。资源可以是任何类型的内容：组件、库、工具、hooks、AI 提示、配置文件、主题等。例如：

- `@shadcn/button` - 来自 shadcn 注册表的 UI 组件
- `@v0/dashboard` - 来自 v0 注册表的仪表板组件
- `@acme/auth-utils` - 来自公司私有注册表的认证工具

#### 去中心化命名空间系统

命名空间系统被有意设计为去中心化的。存在一个[中央开源注册表索引](https://ui.shadcn.com/docs/registry/registry-index)用于开源命名空间，但你可以自由创建和使用任何你想要的命名空间。

这种去中心化方法让你可以完全灵活地以适合你的组织的方式组织资源。

你可以为不同目的创建多个注册表：

```json
{
  "registries": {
    "ui": { "url": "https://ui.acme.com/{name}.json" },
    "docs": { "url": "https://docs.acme.com/{name}.json" },
    "ai": { "url": "https://ai.acme.com/{name}.json" }
  }
}
```

这允许你：按类型组织、按团队组织、按可见性组织、按版本组织，并且不会产生命名冲突。

#### 快速配置

将注册表添加到你的 `components.json`：

```json
{
  "registries": {
    "acme": {
      "url": "https://registry.acme.com/r/{name}.json"
    }
  }
}
```

然后开始安装：

```bash
npx shadcn@latest add @acme/button
npx shadcn@latest add @acme/input @acme/select
```

#### 注册表命名约定

注册表名称必须遵循以下规则：

- 以 `@` 符号开头
- 仅包含字母数字字符、连字符和下划线
- 有效名称示例：`@v0`、`@acme-ui`、`@my_company`
- 引用资源的模式：`@namespace/resource-name`

#### GitHub 和命名空间

GitHub 注册表地址和命名空间解决不同的问题。

当注册表是公共 GitHub 仓库并且你希望用户无需配置 `components.json` 即可安装时，使用 GitHub 地址：

```bash
npx shadcn@latest add github:acme/ui/button
```

当你想要稳定的别名、自定义托管、认证、请求头、查询参数或私有注册表支持时，使用命名空间：

```bash
npx shadcn@latest add @acme/button
```

#### 配置

命名空间注册表在你的 `components.json` 文件的 `registries` 字段中配置。

**基本配置：**

```json
{
  "registries": {
    "acme": "https://registry.acme.com/r/{name}.json"
  }
}
```

**注意：** URL 中的 `{name}` 占位符在运行 `npx shadcn@latest add @namespace/resource-name` 时会被自动解析并替换为资源名称。例如，`@acme/button` 变为 `https://registry.acme.com/r/button.json`。

**高级配置：**

对于需要认证或其他参数的注册表，使用对象格式：

```json
{
  "registries": {
    "acme": {
      "url": "https://registry.acme.com/r/{name}.json",
      "headers": {
        "Authorization": "Bearer ${ACME_TOKEN}"
      }
    }
  }
}
```

**注意：** `${VAR_NAME}` 格式的环境变量会自动从你的环境（process.env）中展开。这适用于 URL、headers 和 params。

#### URL 模式系统

注册表 URL 支持以下占位符：

**`{name}` 占位符（必需）** - 被替换为资源名称：

```json
{
  "registries": {
    "acme": "https://registry.acme.com/{name}.json"
  }
}
```

安装 `@acme/button` 时，URL 变为：`https://registry.acme.com/button.json`

**`{style}` 占位符（可选）** - 被替换为当前样式配置：

```json
{
  "registries": {
    "themes": "https://registry.example.com/{style}/{name}.json"
  }
}
```

样式设置为 `new-york` 时，安装 `@themes/card` 解析为：`https://registry.example.com/new-york/card.json`

#### 认证与安全

**环境变量：** 使用环境变量安全地存储凭据：

```json
{
  "registries": {
    "internal": {
      "url": "https://internal.company.com/r/{name}.json",
      "headers": {
        "Authorization": "Bearer ${INTERNAL_TOKEN}"
      }
    }
  }
}
```

然后在 `.env.local` 中设置环境变量：

```
INTERNAL_TOKEN=your-secret-token
```

**Bearer Token (OAuth 2.0)：**

```json
{
  "headers": {
    "Authorization": "Bearer ${TOKEN}"
  }
}
```

**API Key 在请求头中：**

```json
{
  "headers": {
    "X-API-Key": "${API_KEY}"
  }
}
```

**基本认证：**

```json
{
  "headers": {
    "Authorization": "Basic ${BASIC_AUTH}"
  }
}
```

**查询参数认证：**

```json
{
  "params": {
    "token": "${REGISTRY_TOKEN}"
  }
}
```

**安全性：** 环境变量从不会被记录，仅在运行时展开，每个注册表维护自己的认证上下文。切勿将实际令牌提交到版本控制。强烈建议对所有注册表 URL 使用 HTTPS。

**资源验证：** 所有从注册表获取的资源在安装前都会根据注册表项 schema 进行验证。

#### 版本控制

你可以使用查询参数为注册表资源实现版本控制：

```json
{
  "registries": {
    "versioned": {
      "url": "https://registry.example.com/{name}.json",
      "params": {
        "version": "v2"
      }
    }
  }
}
```

使用环境变量跨项目控制版本：

```json
{
  "params": {
    "version": "${REGISTRY_VERSION}"
  }
}
```

#### 依赖解析

资源可以跨不同注册表具有依赖关系：

```json
{
  "registryDependencies": ["@shadcn/button", "@acme/input-form", "github:org/repo/helper"]
}
```

CLI 自动解析和安装所有来自各自注册表的依赖。解析过程：

1. 清除注册表上下文以重新开始
2. 从指定注册表获取主要资源
3. 递归解析来自各自注册表的依赖
4. 应用拓扑排序以确保正确的安装顺序
5. 基于目标路径去重文件（后解析的覆盖先解析的）
6. 深度合并配置（tailwind、cssVars、css、envVars）

当你安装 `@custom/dashboard` 依赖多个资源时：

```json
{
  "registryDependencies": ["@shadcn/card", "@vendor/chart", "@custom/card"]
}
```

解析顺序：先安装 `@shadcn/card`，然后 `@vendor/chart`，最后 `@custom/card`（如果目标相同会覆盖）。

#### 错误处理

- **注册表未配置：** `Error: Registry "@unknown" is not configured.`
- **环境变量缺失：** `Error: Missing environment variable: ACME_TOKEN`
- **资源未找到：** `Error: Registry item "@acme/unknown" not found.`
- **认证失败：** `Error: 401 Unauthorized` / `Error: 403 Forbidden`

### 认证 (Authentication)

使用认证保护你的注册表，用于私有的和个性化的组件。

认证让你运行私有注册表，控制谁能访问你的组件，并向不同的团队或用户提供不同的内容。

#### 常见认证模式

**基于令牌的认证（最常见）：**

```json
{
  "registries": {
    "internal": {
      "url": "https://registry.company.com/r/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

在 `.env.local` 中设置令牌：

```
REGISTRY_TOKEN=your-secret-token
```

**API Key 认证：**

```json
{
  "headers": {
    "X-API-Key": "${API_KEY}"
  }
}
```

**查询参数认证：**

```json
{
  "params": {
    "token": "${REGISTRY_TOKEN}"
  }
}
```

这将创建：`https://registry.company.com/button.json?token=your_token`

#### 服务端实现

**Next.js API 路由：**

```ts
// app/api/registry/[name]/route.ts
export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.replace("Bearer ", "")
  if (!token || token !== process.env.REGISTRY_TOKEN) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  // 返回注册表项
}
```

#### 多注册表认证

使用命名空间注册表，你可以设置具有不同认证的多个注册表：

```json
{
  "registries": {
    "public": "https://public.example.com/r/{name}.json",
    "internal": {
      "url": "https://internal.company.com/r/{name}.json",
      "headers": { "Authorization": "Bearer ${INTERNAL_TOKEN}" }
    },
    "partner": {
      "url": "https://partner.example.com/r/{name}.json",
      "headers": { "X-API-Key": "${PARTNER_KEY}" }
    }
  }
}
```

#### 安全最佳实践

- **使用环境变量：** 切勿将令牌提交到版本控制
- **使用 HTTPS：** 始终使用 HTTPS URL 以在传输过程中保护令牌
- **添加速率限制：** 保护你的注册表免受滥用
- **轮换令牌：** 定期更改访问令牌
- **记录访问：** 跟踪注册表访问以进行安全和审计

#### 错误处理

shadcn CLI 优雅地处理认证错误：

- **401 Unauthorized：** 令牌无效或缺失
- **403 Forbidden：** 令牌对此资源没有权限
- **429 Too Many Requests：** 超过速率限制

你可以从注册表服务器返回带有自定义错误消息的响应体，CLI 将向用户显示这些消息：

```json
{
  "error": "Your subscription has expired. Please renew at https://billing.example.com"
}
```

### MCP 服务器 (Registry MCP)

注册表开发者的 MCP 支持。

[shadcn MCP 服务器](https://ui.shadcn.com/docs/mcp) 可以与任何 shadcn 兼容的注册表一起开箱即用。你不需要做任何特殊操作来为你的注册表启用 MCP 支持。

#### 先决条件

MCP 服务器通过请求你的注册表索引来工作。确保在注册表根目录有一个名为 `registry` 的注册表项文件。

例如，如果你的注册表托管在 `https://acme.com/r/[name].json`，你应该在 `https://acme.com/r/registry.json` 有一个文件。此文件必须是符合[注册表 schema](https://ui.shadcn.com/docs/registry/registry-json) 的有效 JSON 文件。

#### 配置 MCP

要求你的注册表消费者在他们的 `components.json` 文件中配置你的注册表并安装 shadcn MCP 服务器：

```json
{
  "registries": {
    "acme": {
      "url": "https://acme.com/r/{name}.json"
    }
  }
}
```

然后在项目中运行：

```bash
npx shadcn@latest mcp
```

重启 Claude Code 并尝试以下提示：

- "Show me the components in the acme registry"
- "Create a landing page using items from the acme registry"

你可以使用 Claude Code 中的 `/mcp` 命令调试 MCP 服务器。

#### 最佳实践

MCP 兼容注册表的最佳实践：

1. **清晰的描述：** 添加简洁、信息丰富的描述，帮助 AI 助手理解注册表项的用途和用法。
2. **正确的依赖：** 准确列出所有 `dependencies`，以便 MCP 可以自动安装它们。
3. **注册表依赖：** 使用 `registryDependencies` 表示项之间的关系。
4. **一致的命名：** 使用 kebab-case 命名组件，并在整个注册表中保持一致。

### Open in v0

将你的注册表与 "Open in v0" 集成。

如果你的注册表已托管并通过 URL 公开访问，你可以使用 `https://v0.dev/chat/api/open?url=[URL]` 端点在 v0 中打开注册表项。

例如：[https://v0.dev/chat/api/open?url=https://ui.shadcn.com/r/styles/new-york/login-01.json](https://v0.dev/chat/api/open?url=https://ui.shadcn.com/r/styles/new-york/login-01.json)

**重要：** "Open in v0" 不支持 `cssVars`、`css`、`envVars`、命名空间注册表或高级认证方法。

#### 按钮

以下是如何在站点上添加 "Open in v0" 按钮的简单示例：

```html
<a href="https://v0.dev/chat/api/open?url=https://acme.com/r/button.json" target="_blank">
  Open in v0
</a>
```

#### 认证

"Open in v0" 仅支持查询参数认证。不支持命名空间注册表或像 Bearer 令牌或 API key 在请求头中的高级认证方法。

要使用 Open in v0 的认证，使用 `token` 查询参数：

```
https://v0.dev/chat/api/open?url=https://acme.com/r/button.json?token=YOUR_TOKEN
```

在你的注册表服务器上实现时：

1. 检查 `token` 查询参数
2. 验证令牌是否对认证系统有效
3. 如果令牌无效或缺失，返回 `401 Unauthorized` 响应
4. shadcn CLI 和 Open in v0 都会处理 401 响应并向用户显示适当消息

### API 参考 (API Reference)

用于处理注册表、schema 和预设的程序化 API。

除了 CLI 之外，`shadcn` 包还公开了一组程序化 API。你可以使用它们获取和解析注册表项、验证注册表 JSON 以及构建自定义工具。

每个 API 都可以通过专用的子路径导入使用：

```ts
import { getRegistry, getRegistryItems, resolveRegistryItems } from "shadcn/registry"
import { registrySchema, registryItemSchema } from "shadcn/schema"
import { encodePreset, decodePreset } from "shadcn/preset"
```

CLI 命令本身不是公共 API 的一部分。只有下面记录的导入被认为是稳定的。

#### shadcn/registry

获取和解析来自已配置注册表的项。

**config：** 可选，类型为 `Partial<Config>`，默认使用内置注册表。即你的 `components.json` 文件的解析内容。其 `registries` 字段将命名空间（例如 `@acme`）映射到 URL 以及访问所需的任何认证头或环境变量。

**useCache：** 类型为 `boolean`，默认 `true`。注册表响应在进程生命周期内缓存在内存中。保持启用用于一次性脚本和 CLI 运行。在长时间运行的进程（服务器、watcher、MCP 服务器）中设置为 `false`。

**getRegistry(name, config?, useCache?)：** 按名称获取单个注册表。

```ts
const registry = await getRegistry("@shadcn")
```

**getRegistryItems(names, config?, useCache?)：** 通过合格名称获取一个或多个注册表项。

```ts
const items = await getRegistryItems(["@shadcn/button", "@shadcn/card"])
```

返回注册表项数组：

```ts
[{ name: "button", type: "registry:ui", ... }, { name: "card", type: "registry:ui", ... }]
```

**resolveRegistryItems(names, config?, useCache?)：** 解析多个项及其注册表依赖，合并为单个树。与 `getRegistryItems` 不同，它会遍历每个项的 `registryDependencies` 并将所有内容（文件、依赖、CSS 变量）扁平化为一个可安装的对象。

```ts
const resolved = await resolveRegistryItems(["@acme/dashboard"])
```

**getRegistries(config?, useCache?)：** 获取注册表目录。返回注册表条目数组。

**searchRegistries(query, config?, useCache?)：** 使用模糊匹配跨一个或多个注册表搜索。

```ts
const results = await searchRegistries("button")
```

**loadRegistry(path?)：** 从磁盘读取并解析本地 `registry.json` 文件，跟踪所有 `include` 引用，返回注册表目录。返回的目录列出每个项但省略文件内容。

`getRegistry` 与 `loadRegistry` 的区别：`getRegistry` 通过网络获取**远程**注册表，期望提供的目录已扁平化——它拒绝仍使用 `include` 的目录。`loadRegistry` 从磁盘读取**本地** `registry.json` 并自行解析 `include` 引用。

**loadRegistryItem(name, path?)：** 通过名称从本地 `registry.json` 读取单个项，文件内容从磁盘读取并内联。返回完全解析的注册表项及其文件内容。

`getRegistryItems` 与 `loadRegistryItem` 的区别：`getRegistryItems` 通过网络从**远程**注册表解析项。`loadRegistryItem` 从你的**本地**源文件按需构建单个项。

**错误处理：** 所有注册表函数都会抛出扩展 `RegistryError` 的类型化错误。可用的错误类包括：

- `RegistryError`、`RegistryNotFoundError`、`RegistryUnauthorizedError`
- `RegistryForbiddenError`、`RegistryFetchError`、`RegistryNotConfiguredError`
- `RegistryLocalFileError`、`RegistryParseError`、`RegistryValidationError`
- `RegistryItemNotFoundError`、`RegistriesIndexParseError`
- `RegistryMissingEnvironmentVariablesError`、`RegistryInvalidNamespaceError`

#### shadcn/schema

用于验证 `registry.json`、`registry-item.json` 和 `components.json` 的 Zod schema。

```ts
import { registrySchema, registryItemSchema } from "shadcn/schema"
```

主要 schema：

- `registrySchema`、`registryItemSchema`、`registryItemFileSchema`
- `registryItemTypeSchema`、`registryItemCssVarsSchema`
- `registryItemTailwindSchema`、`registryBaseColorSchema`
- `configSchema`、`presetSchema`

导出的推断类型：

- `Registry`、`RegistryItem`、`RegistryBaseItem`
- `RegistryFontItem`、`Preset`、`ConfigJson`

#### shadcn/preset

编码、解码和验证主题预设，以及主题编辑器使用的预设选项常量。

**encodePreset(config)：** 将 `Partial<PresetConfig>` 编码为简短的 URL 安全预设代码。省略的任何字段回退到 `DEFAULT_PRESET_CONFIG`。

**decodePreset(code)：** 将预设代码解码回完整的 `PresetConfig`。如果代码缺失或无效，返回 `null`。

其他导出：`isPresetCode`、`isValidPreset`、`generateRandomConfig`、`generateRandomPreset`、`toBase62`、`fromBase62`

常量：`PRESET_BASES`、`PRESET_STYLES`、`PRESET_BASE_COLORS`、`PRESET_THEMES`、`PRESET_ICON_LIBRARIES`、`PRESET_FONTS`、`PRESET_FONT_HEADINGS`、`PRESET_RADII`、`PRESET_MENU_ACCENTS`、`PRESET_MENU_COLORS`、`PRESET_CHART_COLORS`、`DEFAULT_PRESET_CONFIG`

### registry.json 规范

用于定义自定义组件注册表的 schema。

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "files": [{ "path": "components/ui/button.tsx", "type": "registry:ui" }]
    }
  ]
}
```

公共 GitHub 仓库使用相同的源注册表格式。CLI 读取根 `registry.json`，解析 `include`，并从仓库安装文件。

#### 字段定义

- **`$schema`**（可选）：用于指定 `registry.json` 文件的 schema URL。
- **`name`**（必需）：注册表的名称。用于数据属性和其他元数据。
- **`homepage`**（可选）：注册表的主页 URL。用于数据属性和其他元数据。
- **`include`**（可选）：用于从其他 `registry.json` 文件组合注册表。每个包含路径必须是相对于显式 `registry.json` 文件的路径。不支持文件夹简写。

```json
{
  "include": ["components/ui/registry.json", "hooks/registry.json"]
}
```

被包含的 `registry.json` 文件可以省略 `name` 和 `homepage`——这些字段仅在根 `registry.json` 上必需。当 `shadcn build` 解析 include 时，项文件路径相对于声明该项的 `registry.json` 文件读取。生成的注册表输出是扁平化的且不包含 `include`。注册表项名称在已解析的注册表中（包括所有被包含的文件）必须唯一。

- **`items`**（可选）：注册表中的项。每个项必须实现 [registry-item schema 规范](https://ui.shadcn.com/schema/registry-item.json)。根 `registry.json` 必须至少定义 `items` 或 `include` 中的一个。如果省略 `items`，则默认为空数组。

### registry-item.json 规范

用于定义自定义注册表项的 schema。

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "A native button component",
  "dependencies": ["@radix-ui/react-slot"],
  "registryDependencies": [],
  "files": [{ "path": "button.tsx", "type": "registry:ui" }]
}
```

#### 字段定义

- **`$schema`**（可选）：指定 `registry-item.json` 文件的 schema URL。
- **`name`**（必需）：项的名称。用于在注册表中标识该项，在你的注册表中应唯一。
- **`title`**（可选）：人类可读的注册表项标题。保持简短和描述性。
- **`description`**（可选）：注册表项的描述。可以比 `title` 更长更详细。
- **`type`**（必需）：注册表项的类型。用于确定项在解析到项目时的类型和目标路径。

支持的类型：

| 类型 | 描述 |
|------|------|
| `registry:base` | 用于完整的设计系统 |
| `registry:block` | 用于包含多个文件的复杂组件 |
| `registry:component` | 用于简单组件 |
| `registry:font` | 用于字体 |
| `registry:lib` | 用于库和工具函数 |
| `registry:hook` | 用于 hooks |
| `registry:ui` | 用于 UI 组件和单文件原语 |
| `registry:page` | 用于页面或基于文件的路由 |
| `registry:file` | 用于杂项文件 |
| `registry:style` | 用于注册表样式，例如 `new-york` |
| `registry:theme` | 用于主题 |
| `registry:item` | 用于通用注册表项 |

- **`author`**（可选）：注册表项的作者。
- **`dependencies`**（可选）：注册表项的 npm 包依赖。使用 `@version` 指定版本，例如 `zod@^3.20.0`。
- **`devDependencies`**（可选）：注册表项的开发依赖。仅在开发期间需要的 npm 包。
- **`registryDependencies`**（可选）：注册表依赖。每个条目是一个项地址。

地址格式：

| 格式 | 示例 |
|------|------|
| shadcn/ui 内置项 | `"button"`、`"input"`、`"select"` |
| 命名空间注册表项 | `"@acme/input-form"` |
| GitHub 注册表项 | `"acme/ui/button"`、`"acme/ui/button#v1.2.0"` |
| 自定义 URL | `"https://example.com/r/hello-world.json"` |
| 本地文件路径 | `"./hello-world.json"` |

**注意：** 裸名称保持现有行为。`button` 表示内置的 shadcn `button` 项，而不是来自同一 GitHub 仓库的项。对于同一仓库的 GitHub 依赖，使用完整的 GitHub 项地址。Refs 不会跨依赖继承。如果 GitHub 依赖需要可重现，将其固定到自己的标签或完整提交 SHA。

- **`files`**（必需）：注册表项的文件。每个文件具有 `path`、`type` 和可选的 `target` 属性。

**`path`：** 注册表中文件的路径。构建脚本使用此路径解析、转换和构建注册表 JSON 负载。

**`type`：** 文件的类型。

**`target`（可选）：** 文件在项目中应放置的位置。仅对 `registry:page` 和 `registry:file` 类型必需。默认情况下，`shadcn` CLI 读取项目的 `components.json` 文件以确定目标路径。对于某些文件，如路由或配置，你可以手动指定目标路径。

使用 `~` 表示项目根目录，例如 `~/foo.config.js`。

你还可以使用注册表目标占位符将文件放在用户 `components.json` 配置的目录下：

| 占位符 | 解析为 |
|--------|--------|
| `@components/` | `aliases.components` |
| `@ui/` | `aliases.ui` |
| `@lib/` | `aliases.lib` |
| `@hooks/` | `aliases.hooks` |

使用这些占位符时，注册表项会安装到项目配置的 shadcn 目录中，而无需硬编码 `components`、`src` 或工作区包路径。占位符后的任何内容都会被保留，因此 `@ui/ai/prompt-input.tsx` 安装在用户配置的 `ui` 目录下的 `ai/prompt-input.tsx`。

`target` 决定文件写入的位置。它可以将文件指向与文件 `type` 不同的 shadcn 目录。

- **`tailwind`**（已废弃，可选）：用于 tailwind 配置，如 `theme`、`plugins` 和 `content`。在 Tailwind v4 项目中改用 `cssVars.theme`。
- **`cssVars`**（可选）：为注册表项定义 CSS 变量。
- **`css`**（可选）：使用 `css` 将新规则添加到项目的 CSS 文件中，例如 `@layer base`、`@layer components`、`@utility`、`@keyframes`、`@plugin` 等。
- **`envVars`**（可选）：为注册表项添加环境变量。变量会被添加到 `.env.local` 或 `.env` 文件中。现有变量不会被覆盖。

**重要：** 使用 `envVars` 添加开发或示例变量。不要用于生产变量。

- **`font`**（可选）：对 `registry:font` 类型必需。配置字体系列、提供者、导入名称、CSS 变量和用于非 Next.js 项目的 npm 包。

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `family` | `string` | 是 | CSS font-family 值 |
| `provider` | `string` | 是 | 字体提供者。目前仅支持 `google` |
| `import` | `string` | 是 | `next/font/google` 的字体导入名称 |
| `variable` | `string` | 是 | 字体的 CSS 变量名称（如 `--font-sans`） |
| `weight` | `string[]` | 否 | 包含的字体粗细数组 |
| `subsets` | `string[]` | 否 | 包含的字体子集数组 |
| `selector` | `string` | 否 | 应用字体的 CSS 选择器。默认为 `html` |
| `dependency` | `string` | 否 | 非 Next.js 项目安装的 npm 包 |

- **`docs`**（可选）：在通过 CLI 安装注册表项时显示自定义文档或消息。
- **`categories`**（可选）：组织注册表项。
- **`meta`**（可选）：为注册表项添加额外的元数据。可以添加任何你希望注册表项可用的键/值对。

### 示例 (Examples)

注册表项的示例：样式、组件、CSS 变量等。

#### registry:style

**自定义样式（扩展 shadcn/ui）：** 在 `npx shadcn init` 时，它将安装 `@tabler/icons-react` 作为依赖，添加 `login-01` block 和 `calendar` 组件，从远程注册表添加 `editor`，将 `font-sans` 变量设置为 `Inter, sans-serif`，并安装浅色和深色模式的 `brand` 颜色。

**自定义样式（从头开始）：** 使用 `extends: none` 创建不扩展 shadcn/ui 的自定义样式。可以用于创建全新的样式，即自定义组件、CSS 变量、依赖等。

#### registry:theme

自定义主题和自定义颜色。支持添加自定义 CSS 变量和覆盖 Tailwind CSS 变量。

#### registry:block

自定义 block。可以安装一个 block 并覆盖其原语。

#### registry:ui

可重用的 UI 组件，可以具有依赖、注册表依赖和 CSS 变量。

#### registry:lib

工具库。用于共享辅助函数、常量或其他非组件代码。

#### registry:hook

自定义 React hook。

#### registry:font

安装 Google 字体。支持常规字体、等宽字体、衬线字体以及使用 `selector` 字段将字体应用于特定 CSS 选择器。

#### registry:base

完整的设计系统基础。定义项目的完整依赖、CSS 变量和配置。`config` 字段是 `registry:base` 类型独有的，接受 `style`、`iconLibrary`、`rsc`、`tsx`、`rtl`、`menuColor`、`menuAccent`、`tailwind`、`aliases` 和 `registries` 属性。

#### 通用项（自 v2.9.0）

可以创建无需框架检测或 `components.json` 即可安装的通用项。要使项成为通用项（即框架无关），项中的所有文件必须具有明确的 `target`。适用于安装自定义 Cursor 规则、ESLint 配置等。

更多详细示例和完整的 JSON 代码示例，请参见 [官方示例页面](https://ui.shadcn.com/docs/registry/examples)。

---

## Figma

每个组件都在 Figma 中重新创建，具有可自定义的 props、排版和图标。

> **注意：** Figma 文件由社区贡献。如果您有任何问题或反馈，请联系 Figma 文件维护者。

### 免费资源

- [shadcn/ui components](https://www.figma.com/community/file/1342715840824755935) by Sitsiilia Bergmann — 一个结构良好的组件库，与 shadcn 组件系统保持一致，定期维护。
- [shadcn/ui design system](https://www.figma.com/community/file/1203061493325953101) by Pietro Schirano — shadcn/ui 的设计伴侣。每个组件都精心制作，以完美匹配代码实现。

### 付费资源

- [shadcn/ui kit](https://shadcndesign.com/) by Matt Wierzbicki — 优质、始终最新的 Figma UI 工具包，与 shadcn/ui 兼容，优化了设计到开发的交接。
- [shadcncraft Design System](https://shadcncraft.com/) — 生产级 shadcn/ui 工具包，包含 Pro React 块和 1:1 Figma 对齐。
- [shadcn/studio UI Kit](https://shadcnstudio.com/figma) — 与 shadcn/ui 兼容的 Figma 工具包，包含更新的组件、550+ 块、10+ 模板、20+ 主题和 AI 工具。
- [Shadcnblocks.com](https://www.shadcnblocks.com/) — 高级 Shadcn Figma UI 工具包，包含组件、500+ Pro 块和 shadcn 主题变量。
- [Obra shadcn/ui Pro](https://shadcn.obra.studio/products/obra-shadcn-ui-pro) by Obra Studio — 专为设计师打造的 shadcn/ui Figma 体验，包含自定义组件、Pro 块和设计到代码插件。
- [Shadcn Space](https://shadcnspace.com/figma) — 320+ 块、9+ 模板和 250+ 组件的集合，包含与 shadcn/ui 兼容的 Figma 工具包。

---
## MCP 服务器 (MCP Server)

使用 shadcn MCP 服务器来浏览、搜索和安装来自注册表（registries）的组件。

shadcn MCP Server 允许 AI 助手与注册表中的项目进行交互。您可以浏览可用组件、搜索特定组件，并通过自然语言直接将其安装到您的项目中。

例如，您可以向 AI 助手提问："使用 acme 注册表中的组件构建一个着陆页" 或 "帮我从 shadcn 注册表中找一个登录表单"。

注册表在项目的 `components.json` 文件中配置。

```json title="components.json"
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}
```

---

### 什么是 MCP？

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) 是一个开放协议，使 AI 助手能够安全地连接到外部数据源和工具。使用 shadcn MCP 服务器，您的 AI 助手可以直接访问：

- **浏览组件** — 列出任何已配置注册表中的所有可用组件、blocks 和模板
- **跨注册表搜索** — 按名称或功能跨多个源查找特定组件
- **自然语言安装** — 使用简单的对话提示添加组件，如 "添加一个登录表单"
- **多注册表支持** — 访问公共注册表、私有公司库和第三方源

---

### 快速开始

选择您的 MCP 客户端并按照说明配置 shadcn MCP 服务器。如果您希望手动配置，请参阅[配置](#配置)部分。

#### Claude Code

在您的项目中运行以下命令：

```bash
pnpm dlx shadcn@latest mcp init --client claude
```

**重新启动 Claude Code** 并尝试以下提示：

- 显示 shadcn 注册表中所有可用的组件
- 将 button、dialog 和 card 组件添加到我的项目中
- 使用 shadcn 注册表中的组件创建一个联系表单

**注意：** 您可以在 Claude Code 中使用 `/mcp` 命令来调试 MCP 服务器。

#### Cursor

要将 MCP 配置到 Cursor 中，将 shadcn 服务器添加到您的项目 `.cursor/mcp.json` 配置文件中：

```json title=".cursor/mcp.json"
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

添加配置后，在 Cursor 设置中启用 shadcn MCP 服务器。启用后，您应该会在 MCP 服务器列表中看到 shadcn 服务器旁边出现一个绿色圆点，以及可用的工具列表。

有关更多详细信息，请参阅 [Cursor MCP 文档](https://docs.cursor.com/en/context/mcp#using-mcp-json)。

#### VS Code

要在 VS Code 中使用 GitHub Copilot 配置 MCP，将 shadcn 服务器添加到您的项目 `.vscode/mcp.json` 配置文件中：

```json title=".vscode/mcp.json"
{
  "servers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

添加配置后，打开 `.vscode/mcp.json` 并点击 shadcn 服务器旁边的 **Start**。

有关更多详细信息，请参阅 [VS Code MCP 文档](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)。

#### Codex

**注意：** `shadcn` CLI 无法自动更新 `~/.codex/config.toml`。您需要手动添加配置。

要将 MCP 配置到 Codex 中，将 shadcn 服务器添加到 `~/.codex/config.toml`：

```toml title="~/.codex/config.toml"
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

添加配置后，重新启动 Codex 以加载 MCP 服务器。

---

### 工作原理

MCP 服务器充当您的 AI 助手、组件注册表和 shadcn CLI 之间的桥梁。

1. **注册表连接** — MCP 连接到已配置的注册表（shadcn/ui、私有注册表、第三方源）
2. **自然语言** — 您用自然语言描述您的需求
3. **AI 处理** — 助手将您的请求转换为注册表命令
4. **组件交付** — 资源被获取并安装到您的项目中

---

### 支持的注册表

shadcn MCP 服务器开箱即用，支持任何与 shadcn 兼容的注册表。

- **shadcn/ui 注册表** — 包含所有 shadcn/ui 组件的默认注册表
- **第三方注册表** — 任何遵循 shadcn 注册表规范的注册表
- **私有注册表** — 您公司的内部组件库
- **命名空间注册表** — 使用 `@namespace` 语法配置的多个注册表

---

### 配置

您可以使用任何 MCP 客户端与 shadcn MCP 服务器交互。以下是最流行客户端的配置说明。

#### 手动配置（通用）

对于 Claude Code，将以下配置添加到项目根目录的 `.mcp.json` 文件：

```json title=".mcp.json"
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

添加配置后，重新启动客户端。

#### 配置注册表

MCP 服务器通过项目的 `components.json` 配置支持多个注册表。这允许您访问来自各种源的组件，包括私有注册表和第三方提供商。

在 `components.json` 中配置额外的注册表：

```json title="components.json"
{
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

**注意：** 访问标准的 shadcn/ui 注册表无需额外配置。

---

### 认证

对于需要认证的私有注册表，在 `.env.local` 中设置环境变量：

```bash title=".env.local"
REGISTRY_TOKEN=your_token_here
API_KEY=your_api_key_here
```

有关注册表认证的更多详细信息，请参阅[认证文档](/docs/registry/authentication)。

---

### 示例提示词

配置好 MCP 服务器后，您可以使用自然语言与注册表交互。尝试以下提示词：

#### 浏览与搜索

- 显示 shadcn 注册表中所有可用的组件
- 帮我从 shadcn 注册表中找一个登录表单

#### 安装项目

- 将 button 组件添加到我的项目中
- 使用 shadcn 组件创建一个登录表单
- 从 acme 注册表安装 Cursor rules

#### 使用命名空间

- 显示 acme 注册表中的组件
- 安装 @internal/auth-form
- 使用 acme 注册表中的 hero、features 和 testimonials 部分构建一个着陆页

---

### 故障排除

#### MCP 无响应

如果 MCP 服务器未响应提示：

1. **检查配置** — 验证 MCP 服务器已正确配置并在 MCP 客户端中启用
2. **重启 MCP 客户端** — 配置更改后重新启动 MCP 客户端
3. **验证安装** — 确保项目中已安装 `shadcn`
4. **检查网络** — 确认您可以访问已配置的注册表

#### 注册表访问问题

如果组件无法从注册表加载：

1. **检查 components.json** — 验证注册表 URL 是否正确
2. **测试认证** — 确保已为私有注册表设置环境变量
3. **验证注册表** — 确认注册表在线且可访问
4. **检查命名空间** — 确保命名空间语法正确（`@namespace/component`）

#### 安装失败

如果组件安装失败：

1. **检查项目设置** — 确保存在有效的 `components.json` 文件
2. **验证路径** — 确认目标目录存在
3. **检查权限** — 确保对组件目录有写入权限
4. **检查依赖项** — 确认已安装所需的依赖项

#### 无工具或提示

如果看到 `No tools or prompts` 消息，请尝试以下操作：

1. **清除 npx 缓存** — 运行 `npx clear-npx-cache`
2. **重新启用 MCP 服务器** — 在 MCP 客户端中尝试重新启用 MCP 服务器
3. **检查日志** — 在 Cursor 中，可以在 View -> Output 下查看日志，并在下拉菜单中选择 `MCP: project-*`

---

### 了解更多

- [注册表文档](/docs/registry) — shadcn 注册表的完整指南
- [命名空间](/docs/registry/namespace) — 配置多个注册表源
- [认证](/docs/registry/authentication) — 保护您的私有注册表
- [MCP 规范](https://modelcontextprotocol.io/) — 了解 Model Context Protocol

---

## 新手指南 (项目就绪后)

您已使用 shadcn/ui 创建了新项目。以下是开始使用 shadcn/ui 构建的一些事项。

### 添加组件

使用 CLI 向项目添加组件：

```bash
npx shadcn@latest add button
```

然后在代码中导入并使用：

```tsx
// app/page.tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>开始使用</Button>
    </div>
  )
}
```

与传统组件库不同，shadcn/ui 将组件源代码直接添加到您的项目中的 `components/ui/` 目录。您拥有代码并可以随意自定义。

您可以一次添加多个组件或添加所有可用组件：

```bash
npx shadcn@latest add button card alert dialog
npx shadcn@latest add --all
```

浏览所有组件：[Components](https://ui.shadcn.com/docs/components) 页面。

### 自定义主题

您可以直接在 CSS 文件中编辑主题。了解更多关于 [Theming](https://ui.shadcn.com/docs/theming) 以及如何使用 CSS 变量或工具类的信息。

如果您想尝试新的预设，可以在 [ui.shadcn.com](https://ui.shadcn.com/) 上可视化创建自定义主题，并使用预设代码将其应用到您的项目：

```bash
npx shadcn@latest apply <preset-code>
```

### 添加页面块

您可以使用 CLI 向项目添加块：

```bash
npx shadcn@latest add login-03
```

这会将 `login-03` 块添加到您的项目。在代码中导入并使用：

```tsx
// app/page.tsx
import { Login03 } from "@/components/login-03"

export default function Home() {
  return <Login03 />
}
```

### 从注册表安装

shadcn/ui 拥有不断增长的社区注册表生态系统。您可以使用 CLI 从任何注册表 URL 安装组件：

```bash
npx shadcn@latest add https://registry.example.com/button
```

浏览 [Registry Directory](https://ui.shadcn.com/docs/directory) 查看可用注册表列表。

### 使用 AI 构建

shadcn/ui 设计为与 AI 配合使用。您的 AI 助手可以读取项目中的组件源代码、理解 API，并组合它们来构建页面和功能。

以下是一些可以尝试的示例提示词：

- _"创建一个包含姓名、邮箱和密码输入框的注册页面。"_
- _"创建一个用于更新个人资料信息的设置页面，包含表单。"_
- _"构建一个包含头部、统计卡片和数据表格的仪表板。"_

### 安装 shadcn Skills

在您的 AI 助手中安装 shadcn skill。这将为您的 AI 助手提供完整的组件注册表、文档和搜索功能。

```bash
npx shadcn@latest skills install
```

了解更多关于 [skills](https://ui.shadcn.com/docs/skills) 的信息。

### 连接 MCP 服务器

shadcn MCP 服务器为您的 AI 助手提供完整的组件注册表、文档和搜索功能。在您的编辑器中连接它以获得最佳体验。

```bash
npx shadcn@latest mcp
```

了解更多关于 [MCP Server](https://ui.shadcn.com/docs/mcp) 的信息。

---

## 其他资源

- [Changelog](https://ui.shadcn.com/docs/changelog) — 查看所有版本更新
- [llms.txt](https://ui.shadcn.com/llms.txt) — 面向 LLM 的文档摘要
- [Legacy Docs](https://ui.shadcn.com/docs/legacy) — 旧版文档
- [React 19](https://ui.shadcn.com/docs/react-19) — React 19 支持
- [React Server Components](https://ui.shadcn.com/docs/react-19) — RSC 支持

---

> 本中文文档基于 [ui.shadcn.com/docs](https://ui.shadcn.com/docs) 官方文档翻译整理
>
> 最后更新：2026 年 7 月
