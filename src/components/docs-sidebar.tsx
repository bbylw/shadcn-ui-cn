"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sidebarNavigation } from "@/data/docs-navigation"
import { X, Play, BookOpen } from "lucide-react"

interface DocsSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function DocsSidebar({ isOpen, onClose }: DocsSidebarProps) {
  const pathname = usePathname()

  const sidebarContent = (
    <div className="w-full h-full py-6 pr-6 flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* Mobile Navigation Header */}
        <div className="flex md:hidden items-center justify-between pb-4 border-b border-border mb-4">
          <span className="font-bold text-sm">文档导航</span>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex md:hidden flex-col gap-2 mb-6">
          <Link
            href="/docs/introduction"
            onClick={onClose}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors ${
              pathname.startsWith("/docs") ? "bg-primary/10 text-primary" : "text-muted-foreground"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>阅读文档</span>
          </Link>
          <Link
            href="/playground"
            onClick={onClose}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors ${
              pathname === "/playground" ? "bg-primary/10 text-primary" : "text-muted-foreground"
            }`}
          >
            <Play className="h-4 w-4" />
            <span>组件演练</span>
          </Link>
        </div>

        {/* Grouped Sidebar Items */}
        {sidebarNavigation.map((group, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider pl-3">
              {group.groupName}
            </h4>
            <div className="flex flex-col gap-0.5 border-l border-border ml-3.5 pl-2">
              {group.items.map((item) => {
                const itemHref = `/docs/${item.slug}`
                const isActive = pathname === itemHref
                return (
                  <Link
                    key={item.slug}
                    href={itemHref}
                    onClick={onClose}
                    className={`text-xs py-1.5 px-3 rounded-md transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (visible on md and larger screens) */}
      <aside className="hidden md:block w-64 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto border-r border-border shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (active on small screens) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Overlay backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity duration-200"
          />
          
          {/* Sidebar Drawer container */}
          <aside className="relative w-72 max-w-[85vw] h-full bg-card border-r border-border p-6 flex flex-col overflow-y-auto animate-in slide-in-from-left duration-250">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
