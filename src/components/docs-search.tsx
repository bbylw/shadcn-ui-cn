"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Command, CornerDownLeft } from "lucide-react"
import { docSections } from "@/data/docs-content"

interface SearchResult {
  title: string
  sectionTitle: string
  slug: string
  anchor?: string
  snippet?: string
}

export function DocsSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Toggle search modal with keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Auto-focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery("")
      setSelectedIndex(0)
    }
  }, [open])

  // Extract search index (sections and their subheaders)
  const searchIndex = React.useMemo(() => {
    const index: SearchResult[] = []

    docSections.forEach((section) => {
      if (section.slug === "-") return // Skip index page

      // Add main section
      index.push({
        title: section.title,
        sectionTitle: section.title,
        slug: section.slug,
      })

      // Parse markdown content for subheadings
      const lines = section.content.split("\n")
      lines.forEach((line) => {
        if (line.startsWith("### ") || line.startsWith("#### ")) {
          const depth = line.startsWith("### ") ? 3 : 4
          const text = line.substring(depth).trim()
          
          // Generate same anchor id pattern as markdown-renderer
          const anchor = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
          
          index.push({
            title: text,
            sectionTitle: section.title,
            slug: section.slug,
            anchor: anchor,
          })
        }
      })
    })

    return index
  }, [])

  // Filter results based on search query
  useEffect(() => {
    if (!query) {
      setResults(searchIndex.slice(0, 5)) // Show recent/popular items
      return
    }

    const lowerQuery = query.toLowerCase()
    const filtered = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.sectionTitle.toLowerCase().includes(lowerQuery)
    )

    setResults(filtered.slice(0, 8))
    setSelectedIndex(0)
  }, [query, searchIndex])

  // Navigate to selected result
  const handleSelect = (result: SearchResult) => {
    let url = `/docs/${result.slug}`
    if (result.anchor) {
      url += `#${result.anchor}`
    }
    router.push(url)
    setOpen(false)
  }

  // Handle arrow keys navigation in results list
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex])
      }
    }
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick)
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-between w-full md:w-64 px-3 py-1.5 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 text-sm text-muted-foreground transition-colors cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span>搜索文档...</span>
        </div>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-[12px]">⌘</span>K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-background/80 backdrop-blur-sm transition-all duration-300">
          <div
            ref={modalRef}
            className="relative w-full max-w-lg border border-border bg-card shadow-2xl rounded-xl overflow-hidden flex flex-col mx-4 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center px-4 border-b border-border">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="搜索文档或组件..."
                className="flex h-12 w-full bg-transparent py-3 px-3 text-sm outline-none placeholder:text-muted-foreground text-foreground"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-xs border border-border bg-muted px-2 py-0.5 rounded hover:bg-muted/80 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  未找到相关结果。
                </div>
              ) : (
                <div className="space-y-0.5">
                  {results.map((result, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelect(result)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                        idx === selectedIndex
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{result.title}</span>
                        {result.anchor && (
                          <span
                            className={`text-xs mt-0.5 ${
                              idx === selectedIndex
                                ? "text-primary-foreground/80"
                                : "text-muted-foreground"
                            }`}
                          >
                            位于 {result.sectionTitle}
                          </span>
                        )}
                      </div>
                      {idx === selectedIndex && (
                        <CornerDownLeft className="h-4 w-4 opacity-70 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 px-4 py-2 border-t border-border bg-muted/40 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Command className="h-3 w-3" /> / ↵ 选择
              </span>
              <span>↑↓ 导航</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
