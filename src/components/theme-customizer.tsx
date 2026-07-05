"use client"

import React, { useState, useEffect } from "react"
import { Paintbrush, Check, X } from "lucide-react"

interface ThemeColorOption {
  name: string
  label: string
  lightValue: string
  darkValue: string
  colorClass: string
}

const colorOptions: ThemeColorOption[] = [
  {
    name: "default",
    label: "经典黑",
    lightValue: "oklch(0.205 0 0)",
    darkValue: "oklch(0.922 0 0)",
    colorClass: "bg-black dark:bg-white",
  },
  {
    name: "violet",
    label: "紫罗兰",
    lightValue: "oklch(0.446 0.222 291.57)",
    darkValue: "oklch(0.72 0.17 291.57)",
    colorClass: "bg-violet-600",
  },
  {
    name: "emerald",
    label: "翡翠绿",
    lightValue: "oklch(0.527 0.154 150.06)",
    darkValue: "oklch(0.78 0.12 150.06)",
    colorClass: "bg-emerald-600",
  },
  {
    name: "rose",
    label: "玫瑰红",
    lightValue: "oklch(0.577 0.205 16.14)",
    darkValue: "oklch(0.75 0.15 16.14)",
    colorClass: "bg-rose-600",
  },
  {
    name: "orange",
    label: "活力橙",
    lightValue: "oklch(0.612 0.17 42.45)",
    darkValue: "oklch(0.79 0.14 42.45)",
    colorClass: "bg-orange-500",
  },
]

interface RadiusOption {
  value: string
  label: string
}

const radiusOptions: RadiusOption[] = [
  { value: "0rem", label: "0" },
  { value: "0.3rem", label: "0.3" },
  { value: "0.5rem", label: "0.5" },
  { value: "0.625rem", label: "默认" },
  { value: "0.8rem", label: "0.8" },
  { value: "1.0rem", label: "1.0" },
]

export function ThemeCustomizer() {
  const [open, setOpen] = useState(false)
  const [activeColor, setActiveColor] = useState("default")
  const [activeRadius, setActiveRadius] = useState("0.625rem")

  // Load saved preferences
  useEffect(() => {
    const savedColor = localStorage.getItem("theme-custom-color")
    const savedRadius = localStorage.getItem("theme-custom-radius")
    if (savedColor) setActiveColor(savedColor)
    if (savedRadius) setActiveRadius(savedRadius)
  }, [])

  // Apply changes to document elements
  useEffect(() => {
    const root = document.documentElement
    const colorOpt = colorOptions.find((o) => o.name === activeColor) || colorOptions[0]
    
    // Check if body is in dark mode
    const isDark = root.classList.contains("dark")
    const themeVal = isDark ? colorOpt.darkValue : colorOpt.lightValue

    root.style.setProperty("--primary", themeVal)
    root.style.setProperty("--radius", activeRadius)

    // Save configuration
    localStorage.setItem("theme-custom-color", activeColor)
    localStorage.setItem("theme-custom-radius", activeRadius)
  }, [activeColor, activeRadius])

  // Watch for theme changes (dark/light toggling)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const root = document.documentElement
      const colorOpt = colorOptions.find((o) => o.name === activeColor) || colorOptions[0]
      const isDark = root.classList.contains("dark")
      const themeVal = isDark ? colorOpt.darkValue : colorOpt.lightValue
      root.style.setProperty("--primary", themeVal)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [activeColor])

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border bg-background hover:bg-muted text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
      >
        <Paintbrush className="h-4 w-4" />
        <span className="hidden md:inline">定制主题</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-background/40 backdrop-blur-xs">
          <div className="w-full max-w-sm h-full border-l border-border bg-card shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <div>
                  <h3 className="font-semibold text-lg">定制主题风格</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">实时预览您的设计系统设置</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Accent Color Section */}
              <div className="space-y-4 mb-8">
                <label className="text-sm font-medium">主题强调色</label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => setActiveColor(opt.name)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs cursor-pointer transition-all ${
                        activeColor === opt.name
                          ? "border-primary bg-primary/10 font-medium text-foreground"
                          : "border-border hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className={`h-3 w-3 rounded-full shrink-0 ${opt.colorClass}`} />
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Border Radius Section */}
              <div className="space-y-4">
                <label className="text-sm font-medium">组件圆角大小</label>
                <div className="grid grid-cols-3 gap-2">
                  {radiusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setActiveRadius(opt.value)}
                      className={`px-3 py-2 rounded-lg border text-xs cursor-pointer text-center transition-all ${
                        activeRadius === opt.value
                          ? "border-primary bg-primary/10 font-medium text-foreground"
                          : "border-border hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <button
                onClick={() => setOpen(false)}
                className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/95 transition-colors cursor-pointer text-sm"
              >
                完成配置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
