import type { Metadata } from 'next'

import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import configPromise from '@payload-config'
import { LegalPage } from '@/components/LegalPage'
import { queryLegalPageBySlug } from '@/utilities/queryLegalPageBySlug'

export const dynamic = 'force-dynamic'
export const dynamicParams = true

type Args = { params: Promise<{ slug: string }> }

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise

  const doc = await queryLegalPageBySlug({ slug })
  if (!doc) return notFound()

  return <LegalPage doc={doc} />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise

  const doc = await queryLegalPageBySlug({ slug })

  return { title: doc?.title || 'Legal' }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'legal-pages',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })

  return docs.map(({ slug }) => ({ slug }))
}
