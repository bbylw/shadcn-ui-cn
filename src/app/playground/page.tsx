"use client"

import React, { useState } from "react"
import { DocsHeader } from "@/components/docs-header"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Code, Play, Sliders, Check, Copy, AlertCircle, Info, Sparkles } from "lucide-react"

interface ComponentItem {
  id: string
  name: string
  description: string
  icon: React.ReactNode
}

const componentList: ComponentItem[] = [
  { id: "button", name: "Button 按钮", description: "可点击的交互元素，支持多种样式变体。", icon: <Play className="h-4 w-4" /> },
  { id: "card", name: "Card 卡片", description: "包含内容和操作的面板容器。", icon: <Sparkles className="h-4 w-4" /> },
  { id: "tabs", name: "Tabs 标签页", description: "选项卡式的内容区域切换。", icon: <Sliders className="h-4 w-4" /> },
  { id: "switch", name: "Switch 开关", description: "在开和关两个状态之间进行切换的控件。", icon: <Sliders className="h-4 w-4" /> },
  { id: "slider", name: "Slider 滑块", description: "允许用户在给定范围内进行数值选择。", icon: <Sliders className="h-4 w-4" /> },
  { id: "accordion", name: "Accordion 手风琴", description: "垂直堆叠的可折叠内容面板。", icon: <Sliders className="h-4 w-4" /> },
  { id: "dialog", name: "Dialog 对话框", description: "在页面上方浮现的模态内容窗口。", icon: <Sparkles className="h-4 w-4" /> },
  { id: "alert", name: "Alert 警告", description: "向用户显示重要警告或提示信息。", icon: <AlertCircle className="h-4 w-4" /> },
]

export default function PlaygroundPage() {
  const [activeComp, setActiveComp] = useState("button")
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Interactive states for Button
  const [btnVariant, setBtnVariant] = useState<"default" | "destructive" | "outline" | "secondary" | "ghost" | "link">("default")
  const [btnSize, setBtnSize] = useState<"default" | "sm" | "lg">("default")

  // Interactive states for Switch
  const [switchChecked, setSwitchChecked] = useState(false)

  // Interactive states for Slider
  const [sliderValue, setSliderValue] = useState([50])

  // Copy code helper
  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error("Failed to copy", e)
    }
  }

  // Render playground code block
  const renderCodeSnippet = (code: string) => (
    <div className="relative mt-6 rounded-lg border border-border bg-muted/40 font-mono text-xs overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/60 text-muted-foreground select-none">
        <span className="flex items-center gap-1.5 font-semibold">
          <Code className="h-3.5 w-3.5" />
          <span>组件代码</span>
        </span>
        <button
          onClick={() => handleCopyCode(code)}
          className="flex items-center gap-1 px-2 py-0.5 rounded border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">已复制</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto leading-relaxed select-all">
        <code>{code}</code>
      </pre>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DocsHeader onMenuToggle={() => setMenuOpen((prev) => !prev)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Left Side: Component Selector */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-2 select-none">
          <div className="px-3 mb-2">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider">组件库预览</h3>
            <p className="text-xs text-muted-foreground mt-0.5">选择组件并在右侧直接测试交互</p>
          </div>
          <div className="flex flex-col gap-1 border-r md:border-r-0 border-border pr-2 md:pr-0">
            {componentList.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveComp(item.id)}
                className={`flex flex-col items-start px-3 py-2.5 rounded-lg text-left transition-all cursor-pointer ${
                  activeComp === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-sm font-semibold flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </span>
                <span className={`text-[10px] mt-0.5 line-clamp-1 ${activeComp === item.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* Right Side: Showcase Arena */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="border-b border-border pb-4 select-none">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              {componentList.find((c) => c.id === activeComp)?.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {componentList.find((c) => c.id === activeComp)?.description}
            </p>
          </div>

          {/* Interactive Arena Area */}
          <div className="border border-border rounded-xl bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20 select-none">
              <span className="text-xs font-semibold text-muted-foreground">交互预览区</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Dynamic Rendering */}
            <div className="p-8 flex items-center justify-center min-h-[250px] bg-grid-pattern relative">
              {activeComp === "button" && (
                <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                  {/* Demo Item */}
                  <Button variant={btnVariant} size={btnSize}>
                    {btnVariant === "destructive" ? "破坏性操作" : "点击按钮"}
                  </Button>

                  {/* Controls */}
                  <div className="w-full grid grid-cols-2 gap-4 border-t border-border pt-6 select-none">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">样式变体 (Variant)</label>
                      <select
                        value={btnVariant}
                        onChange={(e) => setBtnVariant(e.target.value as any)}
                        className="w-full text-xs p-2 rounded-lg border border-border bg-background text-foreground"
                      >
                        <option value="default">Default</option>
                        <option value="destructive">Destructive</option>
                        <option value="outline">Outline</option>
                        <option value="secondary">Secondary</option>
                        <option value="ghost">Ghost</option>
                        <option value="link">Link</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground">大小尺寸 (Size)</label>
                      <select
                        value={btnSize}
                        onChange={(e) => setBtnSize(e.target.value as any)}
                        className="w-full text-xs p-2 rounded-lg border border-border bg-background text-foreground"
                      >
                        <option value="default">Default</option>
                        <option value="sm">Small</option>
                        <option value="lg">Large</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeComp === "card" && (
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span>探索新世界</span>
                    </CardTitle>
                    <CardDescription>使用 shadcn/ui 的 Card 组件构建精美的容器布局。</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      卡片组件是信息流、设置面板、仪表盘以及统计数据的常用容器。它们具有优秀的圆角半径和边框，提供恰到好处的深度感。
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-border pt-4">
                    <Button variant="outline" size="sm">取消</Button>
                    <Button size="sm">探索</Button>
                  </CardFooter>
                </Card>
              )}

              {activeComp === "tabs" && (
                <Tabs defaultValue="account" className="w-full max-w-md">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">个人资料</TabsTrigger>
                    <TabsTrigger value="password">安全设置</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">个人资料设置</CardTitle>
                        <CardDescription>管理您的个人账号信息及公开显示内容。</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 text-xs text-muted-foreground">
                        这里是一个包含输入框的个人资料修改表单示例。
                      </CardContent>
                      <CardFooter>
                        <Button size="sm">保存修改</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="password">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">密码与安全</CardTitle>
                        <CardDescription>在此处更新密码以保障您的账号安全。</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 text-xs text-muted-foreground">
                        请确保新密码包含数字、特殊字符并大于 8 位。
                      </CardContent>
                      <CardFooter>
                        <Button size="sm">更新密码</Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}

              {activeComp === "switch" && (
                <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={switchChecked}
                      onCheckedChange={setSwitchChecked}
                      id="airplane-mode"
                    />
                    <label htmlFor="airplane-mode" className="text-sm font-semibold select-none cursor-pointer">
                      飞行模式 ({switchChecked ? "已开启" : "已关闭"})
                    </label>
                  </div>
                </div>
              )}

              {activeComp === "slider" && (
                <div className="flex flex-col gap-6 w-full max-w-xs">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                      <span>音量等级</span>
                      <span>{sliderValue[0]}%</span>
                    </div>
                    <Slider
                      defaultValue={sliderValue}
                      max={100}
                      step={1}
                      onValueChange={(val) => setSliderValue(Array.isArray(val) ? (val as number[]) : [val as number])}
                    />
                  </div>
                </div>
              )}

              {activeComp === "accordion" && (
                <Accordion className="w-full max-w-md">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>shadcn/ui 的核心思想是什么？</AccordionTrigger>
                    <AccordionContent>
                      它并不是一个作为包安装在 NPM 上的组件库，而是直接将组件代码分发给您，由您来进行扩展和定制。
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>是否支持自定义样式风格？</AccordionTrigger>
                    <AccordionContent>
                      完全支持。由于组件代码就存放在您的项目目录内，您可以使用 Tailwind CSS 或任何 CSS 属性任意修改样式。
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              {activeComp === "dialog" && (
                <Dialog>
                  <DialogTrigger render={<Button>打开模态窗口</Button>} />
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>新建资源项</DialogTitle>
                      <DialogDescription>
                        在这里编辑或创建您的系统资源，点击保存按钮以确认。
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 text-xs text-muted-foreground">
                      这是一个示例模态对话框，通常用于快速修改、通知或复杂的多步操作表单。
                    </div>
                    <DialogFooter>
                      <Button type="submit">保存变更</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {activeComp === "alert" && (
                <div className="w-full max-w-md space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>系统提示</AlertTitle>
                    <AlertDescription>
                      项目已成功初始化，可以在 `components/ui/` 目录下查看已生成的文件。
                    </AlertDescription>
                  </Alert>
                  
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>错误警告</AlertTitle>
                    <AlertDescription>
                      操作未能成功，请检查 components.json 配置后重新运行 CLI。
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </div>

          {/* Render Code block */}
          {activeComp === "button" && renderCodeSnippet(`import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return (
    <Button variant="${btnVariant}" size="${btnSize}">
      ${btnVariant === "destructive" ? "破坏性操作" : "点击按钮"}
    </Button>
  )
}`)}

          {activeComp === "card" && renderCodeSnippet(`import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>探索新世界</span>
        </CardTitle>
        <CardDescription>使用 shadcn/ui 的 Card 组件构建精美的容器布局。</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs leading-relaxed text-muted-foreground">
          卡片组件是信息流、设置面板、仪表盘以及统计数据的常用容器。它们具有优秀的圆角半径和边框，提供恰到好处的深度感。
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border pt-4">
        <Button variant="outline" size="sm">取消</Button>
        <Button size="sm">探索</Button>
      </CardFooter>
    </Card>
  )
}`)}

          {activeComp === "tabs" && renderCodeSnippet(`import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">个人资料</TabsTrigger>
        <TabsTrigger value="password">安全设置</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">个人资料设置</CardTitle>
            <CardDescription>管理您的个人账号信息及公开显示内容。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            这里是一个包含输入框的个人资料修改表单示例。
          </CardContent>
          <CardFooter>
            <Button size="sm">保存修改</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        {/* Safe settings Card content */}
      </TabsContent>
    </Tabs>
  )
}`)}

          {activeComp === "switch" && renderCodeSnippet(`import { Switch } from "@/components/ui/switch"

export default function SwitchDemo() {
  return (
    <div className="flex items-center gap-3">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode">飞行模式</label>
    </div>
  )
}`)}

          {activeComp === "slider" && renderCodeSnippet(`import { Slider } from "@/components/ui/slider"

export default function SliderDemo() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <label className="text-xs">音量设置</label>
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  )
}`)}

          {activeComp === "accordion" && renderCodeSnippet(`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>shadcn/ui 的核心思想是什么？</AccordionTrigger>
        <AccordionContent>
          它并不是一个作为包安装在 NPM 上的组件库，而是直接将组件代码分发给您，由您来进行扩展和定制。
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`)}

          {activeComp === "dialog" && renderCodeSnippet(`import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>打开模态窗口</Button>} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新建资源项</DialogTitle>
          <DialogDescription>
            在这里编辑或创建您的系统资源，点击保存按钮以确认。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">保存变更</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`)}

          {activeComp === "alert" && renderCodeSnippet(`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function AlertDemo() {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>系统提示</AlertTitle>
      <AlertDescription>
        项目已成功初始化，可以在 \`components/ui/\` 目录下查看已生成的文件。
      </AlertDescription>
    </Alert>
  )
}`)}
        </div>
      </main>
    </div>
  )
}
