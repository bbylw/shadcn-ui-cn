"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X, BookOpen, Play } from "lucide-react"
import { DocsSearch } from "./docs-search"
import { ThemeCustomizer } from "./theme-customizer"

interface DocsHeaderProps {
  onMenuToggle: () => void
}

export function DocsHeader({ onMenuToggle }: DocsHeaderProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={onMenuToggle}
            className="p-2 -ml-2 rounded-md hover:bg-muted md:hidden cursor-pointer"
            aria-label="Toggle Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-base md:text-lg tracking-tight select-none">
              shadcn/ui <span className="text-primary font-semibold">中文文档</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground select-none">
            <Link
              href="/docs/introduction"
              className={`flex items-center gap-1.5 transition-colors hover:text-foreground ${
                pathname.startsWith("/docs") ? "text-foreground" : ""
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>文档</span>
            </Link>
            <Link
              href="/playground"
              className={`flex items-center gap-1.5 transition-colors hover:text-foreground ${
                pathname === "/playground" ? "text-foreground" : ""
              }`}
            >
              <Play className="h-4 w-4" />
              <span>交互演练</span>
            </Link>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <DocsSearch />
          </div>

          <ThemeCustomizer />

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {mounted && (theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            ))}
            {!mounted && <Sun className="h-4 w-4" />}
          </button>

          {/* Github Link */}
          <a
            href="https://github.com/shadcn-ui/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
