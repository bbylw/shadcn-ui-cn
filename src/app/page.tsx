"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { DocsHeader } from "@/components/docs-header"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { 
  ArrowRight, 
  Code, 
  Play, 
  Sparkles, 
  Layers, 
  Cpu, 
  Eye, 
  Check, 
  Copy 
} from "lucide-react"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [installCopied, setInstallCopied] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText("npx shadcn@latest init")
      setInstallCopied(true)
      setTimeout(() => setInstallCopied(false), 2000)
    } catch (e) {
      console.error(e)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden select-none">
      {/* Dynamic Glow Gradients Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/15 blur-[120px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <DocsHeader onMenuToggle={() => {}} />

      {/* Hero Section */}
      <section className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-20 pb-16 flex flex-col items-center justify-center text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mb-6 tracking-wide"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>最新中文翻译文档已就绪</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            这不是一个组件库，
            <span className="block mt-2 bg-gradient-to-r from-primary via-primary/80 to-foreground bg-clip-text text-transparent">
              而是你构建自己组件库的方法。
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground mt-6 max-w-2xl leading-relaxed"
          >
            shadcn/ui 是一套设计精美、可访问的组件和代码分发平台。直接将实际组件代码导入你的项目，拥有完全的控制权进行定制，完美适配 AI 时代。
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full justify-center"
          >
          <Link
            href="/docs/introduction"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-full sm:w-auto h-12 px-8 font-semibold cursor-pointer text-base inline-flex items-center justify-center"
            )}
          >
            开始阅读文档
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          <Link
            href="/playground"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-auto h-12 px-8 font-semibold cursor-pointer text-base inline-flex items-center justify-center"
            )}
          >
            <Play className="h-4 w-4 mr-2 fill-current" />
            互动组件演练
          </Link>
          </motion.div>

          {/* Installation Teaser */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex items-center justify-between gap-4 px-4 py-2.5 rounded-lg border border-border bg-muted/40 font-mono text-xs w-full max-w-md shadow-sm"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-primary font-bold">$</span>
              <span>npx shadcn@latest init</span>
            </div>
            <button
              onClick={handleCopyInstall}
              className="flex items-center justify-center p-1.5 rounded-md border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              aria-label="Copy installation command"
            >
              {installCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Floating Mock UI Demonstration Panel */}
      <section className="max-w-7xl w-full mx-auto px-4 md:px-8 py-10 relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-xl overflow-hidden"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted/20 select-none">
            <span className="h-3 w-3 rounded-full bg-destructive/80" />
            <span className="h-3 w-3 rounded-full bg-orange-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="text-[10px] text-muted-foreground ml-2 font-mono">shadcn-component-preview.tsx</span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Interactive Preview Cards */}
            <div className="space-y-4">
              <Card className="hover:border-primary transition-colors duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-primary" />
                      <span>可组合接口</span>
                    </CardTitle>
                    <Switch />
                  </div>
                  <CardDescription className="text-xs mt-1">组件相互融合，风格完全统一。</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:border-primary transition-colors duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span>AI 深度集成</span>
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">开放的代码结构使得 LLM 可以读取、理解和优化组件。</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Right code snippet preview */}
            <div className="rounded-lg border border-border bg-muted/40 font-mono text-[10px] p-4 h-full flex flex-col justify-center overflow-x-auto leading-relaxed">
              <span className="text-muted-foreground">// 导入可直接定制的组件</span>
              <span className="text-primary-foreground"><span className="text-pink-500">import</span> &#123; Button &#125; <span className="text-pink-500">from</span> <span className="text-emerald-500">"@/components/ui/button"</span></span>
              <span className="text-primary-foreground"><span className="text-pink-500">import</span> &#123; Switch &#125; <span className="text-pink-500">from</span> <span className="text-emerald-500">"@/components/ui/switch"</span></span>
              <br />
              <span className="text-primary-foreground"><span className="text-pink-500">export default function</span> <span className="text-blue-500">Preview</span>() &#123;</span>
              <span className="text-primary-foreground">&nbsp;&nbsp;<span className="text-pink-500">return</span> (</span>
              <span className="text-primary-foreground">&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-cyan-500">div</span> className=<span className="text-emerald-500">"flex gap-4"</span>&gt;</span>
              <span className="text-primary-foreground">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-500">Button</span>&gt;开始使用&lt;/<span className="text-yellow-500">Button</span>&gt;</span>
              <span className="text-primary-foreground">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-500">Switch</span> /&gt;</span>
              <span className="text-primary-foreground">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-cyan-500">div</span>&gt;</span>
              <span className="text-primary-foreground">&nbsp;&nbsp;)</span>
              <span className="text-primary-foreground">&#125;</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid Section */}
      <section className="max-w-7xl w-full mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
          <div className="p-6 rounded-xl border border-border bg-card/40 hover:bg-card/80 transition-colors">
            <Eye className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-base mb-2">开放代码 (Open Code)</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              组件代码直接拷贝至你的项目，无需封装或覆盖样式。您拥有组件的完全透明控制权，可以根据业务随意扩展。
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/40 hover:bg-card/80 transition-colors">
            <Layers className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-base mb-2">组合性 (Composition)</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              所有组件共享一个通用的、可组合的接口。降低团队成员学习成本，对新组件和第三方库保持高度的可预测性。
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/40 hover:bg-card/80 transition-colors">
            <Sparkles className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-base mb-2">美观默认 (Defaults)</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              内置精心挑选的初始主题样式，不附加臃肿依赖。保证应用开箱即用就能呈现整洁、现代的视觉风格。
            </p>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card/40 hover:bg-card/80 transition-colors">
            <Cpu className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-bold text-base mb-2">AI 就绪 (AI-Ready)</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              一致的组件接口设计和本地化代码存放，使 AI 编码助手或大模型可以直接读取源文件，理解 API 并轻松生成新页面。
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground relative z-10 select-none">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 shadcn/ui 中文网. 基于官方开源文档翻译与再创作.</p>
          <div className="flex items-center gap-4">
            <Link href="/docs/introduction" className="hover:text-foreground transition-colors">文档</Link>
            <Link href="/playground" className="hover:text-foreground transition-colors">演练场</Link>
            <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">官方原网</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
