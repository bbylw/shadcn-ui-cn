"use client"

import React, { useState } from "react"
import { DocsHeader } from "@/components/docs-header"
import { DocsSidebar } from "@/components/docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DocsHeader onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      
      <div className="flex-1 max-w-7xl mx-auto w-full flex px-4 md:px-8">
        <DocsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 min-w-0 md:pl-8 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
