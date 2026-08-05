import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import React from 'react'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { queryPageBySlug } from '@/utilities/queryPageBySlug'
import PageClient from './[slug]/page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()

  let page = null

  try {
    page = await queryPageBySlug({ slug: 'home' })
  } catch (error) {
    console.error('Failed to load the home page from Payload.', error)
  }

  if (!page) {
    return (
      <main>
        <PageClient />
        {draft && <LivePreviewListener />}
      </main>
    )
  }

  const { hero, layout } = page

  return (
    <main>
      <PageClient />
      <PayloadRedirects disableNotFound url="/" />
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  let page = null

  try {
    page = await queryPageBySlug({ slug: 'home' })
  } catch (error) {
    console.error('Failed to generate home metadata from Payload.', error)
  }

  return generateMeta({ doc: page })
}
