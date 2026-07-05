import React from "react"
import { notFound } from "next/navigation"
import { docSections } from "@/data/docs-content"
import { DocPageClient } from "@/components/doc-page-client"

interface PageProps {
  params: Promise<{
    slug?: string[]
  }>
}

export async function generateStaticParams() {
  const paths = [
    { slug: [] },
    ...docSections
      .filter((s) => s.slug !== "-")
      .map((section) => ({
        slug: [section.slug],
      })),
  ]
  return paths
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params
  const slugArray = resolvedParams.slug
  const activeSlug = slugArray && slugArray.length > 0 ? slugArray[0] : "introduction"

  const section = docSections.find((s) => s.slug === activeSlug)

  if (!section) {
    notFound()
  }

  return <DocPageClient activeSlug={activeSlug} section={section} />
}
