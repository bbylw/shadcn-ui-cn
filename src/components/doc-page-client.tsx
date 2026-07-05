"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { docSections, DocSection } from "@/data/docs-content"
import { sidebarNavigation, NavItem } from "@/data/docs-navigation"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { ArrowLeft, ArrowRight, List } from "lucide-react"

interface TocItem {
  id: string
  text: string
  level: number
}

interface DocPageClientProps {
  activeSlug: string
  section: DocSection
}

export function DocPageClient({ activeSlug, section }: DocPageClientProps) {
  const router = useRouter()
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState("")

  // Generate Table of Contents from markdown content
  useEffect(() => {
    const lines = section.content.split("\n")
    const headings: TocItem[] = []

    lines.forEach((line) => {
      if (line.startsWith("## ") || line.startsWith("### ")) {
        const isH2 = line.startsWith("## ")
        const text = line.substring(isH2 ? 3 : 4).trim()
        const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
        
        headings.push({
          id,
          text,
          level: isH2 ? 2 : 3,
        })
      }
    })

    setToc(headings)
  }, [section])

  // Scroll Spy: track active heading using IntersectionObserver
  useEffect(() => {
    if (toc.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    }

    const headingElements = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting)
      if (visibleEntries.length > 0) {
        const topIntersecting = visibleEntries.reduce((prev, curr) => {
          return curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev
        })
        setActiveId(topIntersecting.target.id)
      }
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)
    headingElements.forEach((el) => observer.observe(el))

    return () => {
      headingElements.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
  }, [toc])

  // Get flattened list of items in sidebar navigation to calculate Prev/Next links
  const flatNavigation: NavItem[] = []
  sidebarNavigation.forEach((group) => {
    group.items.forEach((item) => flatNavigation.push(item))
  })

  const currentIndex = flatNavigation.findIndex((item) => item.slug === activeSlug)
  const prevPage = currentIndex > 0 ? flatNavigation[currentIndex - 1] : null
  const nextPage = currentIndex < flatNavigation.length - 1 ? flatNavigation[currentIndex + 1] : null

  return (
    <div className="flex gap-10 items-start select-text">
      {/* Center content container */}
      <div className="flex-1 min-w-0 max-w-3xl">
        <div className="border-b border-border pb-4 mb-6">
          <div className="text-xs text-muted-foreground mb-1 select-none">
            文档目录 &gt; {section.title}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground select-none">
            {section.title}
          </h1>
        </div>

        <MarkdownRenderer content={section.content} />

        {/* Footer Page Navigation */}
        <div className="flex items-center justify-between border-t border-border mt-12 pt-6 select-none">
          {prevPage ? (
            <button
              onClick={() => router.push(`/docs/${prevPage.slug}`)}
              className="flex flex-col items-start gap-1 group text-left max-w-[45%] cursor-pointer"
            >
              <span className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform" />
                上一页
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {prevPage.title}
              </span>
            </button>
          ) : (
            <div />
          )}

          {nextPage ? (
            <button
              onClick={() => router.push(`/docs/${nextPage.slug}`)}
              className="flex flex-col items-end gap-1 group text-right max-w-[45%] cursor-pointer"
            >
              <span className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                下一页
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {nextPage.title}
              </span>
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Right Desktop Table of Contents (visible on lg and larger screens) */}
      {toc.length > 0 && (
        <aside className="hidden lg:block w-52 shrink-0 h-[calc(100vh-6.5rem)] sticky top-20 overflow-y-auto pl-4 select-none">
          <div className="space-y-4">
            <h5 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5 pl-1">
              <List className="h-3.5 w-3.5" />
              <span>本页目录</span>
            </h5>
            <div className="flex flex-col gap-1 border-l border-border pl-1.5">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-[11px] leading-tight py-1 rounded transition-colors ${
                    activeId === item.id
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  } ${item.level === 3 ? "pl-3.5" : "pl-1"}`}
                >
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </aside>
      )}
    </div>
  )
}
