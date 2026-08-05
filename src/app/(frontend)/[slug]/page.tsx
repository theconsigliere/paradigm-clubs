import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import React from 'react'

import { redirect } from 'next/navigation'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { CMSLink } from '@/components/Link'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { queryLegalPageBySlug } from '@/utilities/queryLegalPageBySlug'
import { queryPageBySlug } from '@/utilities/queryPageBySlug'
import { shouldUseHomeFallback } from '@/utilities/shouldUseHomeFallback'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getDraftMode } from '@/utilities/getDraftMode'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const draft = await getDraftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug

  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  if (!page) {
    // Legal pages are canonical at /legal/<slug>; keep the bare /<slug> form working as an alias.
    if (await queryLegalPageBySlug({ slug: decodedSlug })) {
      redirect(`/legal/${decodedSlug}`)
    }

    if (shouldUseHomeFallback(decodedSlug)) {
      return <PageClient />
    }

    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <main className="">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}
