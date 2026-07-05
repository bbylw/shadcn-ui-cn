"use client"

import React, { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Copy, Check, ExternalLink } from "lucide-react"

// A helper client component for code copy functionality
interface CodeBlockProps {
  children: string
  className?: string
}

function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const language = className ? className.replace("language-", "") : ""
  const codeString = String(children).replace(/\n$/, "")

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code: ", err)
    }
  }

  return (
    <div className="relative my-6 rounded-lg border border-border bg-muted/40 font-mono text-sm overflow-hidden group">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/60 text-xs text-muted-foreground select-none">
        <span className="font-semibold uppercase">{language || "text"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer active:scale-95"
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
      <div className="p-4 overflow-x-auto">
        <pre className="m-0 leading-relaxed"><code className={className}>{codeString}</code></pre>
      </div>
    </div>
  )
}

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-20">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Code block and inline code customization
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            if (match) {
              return (
                <CodeBlock className={className}>
                  {String(children)}
                </CodeBlock>
              )
            }
            if (String(children).includes("\n")) {
              return (
                <CodeBlock className={className}>
                  {String(children)}
                </CodeBlock>
              )
            }
            return (
              <code
                className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm text-foreground border border-border"
                {...props}
              >
                {children}
              </code>
            )
          },
          // Custom heading styling
          h1: ({ children }) => {
            const id = children?.toString().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-") || ""
            return (
              <h1 id={id} className="text-3xl font-bold tracking-tight mt-10 mb-6 border-b border-border pb-2 group flex items-center scroll-mt-20">
                <a href={`#${id}`} className="hover:underline flex-1">
                  {children}
                </a>
              </h1>
            )
          },
          h2: ({ children }) => {
            const id = children?.toString().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-") || ""
            return (
              <h2 id={id} className="text-2xl font-semibold tracking-tight mt-8 mb-4 group flex items-center scroll-mt-20 border-b border-border pb-1">
                <a href={`#${id}`} className="hover:underline flex-1">
                  {children}
                </a>
              </h2>
            )
          },
          h3: ({ children }) => {
            const id = children?.toString().toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-") || ""
            return (
              <h3 id={id} className="text-xl font-medium tracking-tight mt-6 mb-3 group flex items-center scroll-mt-20">
                <a href={`#${id}`} className="hover:underline flex-1">
                  {children}
                </a>
              </h3>
            )
          },
          // Tables custom styling
          table: ({ children }) => (
            <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50 border-b border-border text-left font-semibold">{children}</thead>
          ),
          tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
          tr: ({ children }) => <tr className="hover:bg-muted/20 transition-colors">{children}</tr>,
          th: ({ children }) => <th className="px-4 py-3 font-semibold text-muted-foreground border-r border-border last:border-r-0">{children}</th>,
          td: ({ children }) => <td className="px-4 py-3 border-r border-border last:border-r-0">{children}</td>,
          // Blockquote custom styling
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground bg-muted/20 py-2 rounded-r-md">
              {children}
            </blockquote>
          ),
          // Link styling
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http")
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 inline-flex items-center gap-0.5"
              >
                {children}
                {isExternal && <ExternalLink className="h-3 w-3 inline" />}
              </a>
            )
          },
          // List item styling
          li: ({ children }) => <li className="mt-2 leading-relaxed">{children}</li>,
          ul: ({ children }) => <ul className="my-5 list-disc pl-6 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="my-5 list-decimal pl-6 space-y-1">{children}</ol>,
          p: ({ children }) => <p className="leading-7 mt-4 mb-4">{children}</p>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
