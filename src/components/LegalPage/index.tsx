import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

type LegalPageDoc = {
  title: string
  content: unknown // Lexical richText JSON
  slug: string
}

// Explicit names for known legal pages; anything else falls back to a generated name
// (e.g. "cookie-policy" -> "cookiePolicyPage").
const BLOCK_NAME_BY_SLUG: Record<string, string> = {
  'privacy-policy': 'privacyPage',
  'terms-conditions': 'termsPage',
}

function getBlockName(slug: string): string {
  if (BLOCK_NAME_BY_SLUG[slug]) return BLOCK_NAME_BY_SLUG[slug]

  const camelCased = slug
    .split('-')
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('')

  return `${camelCased}Page`
}

export const LegalPage: React.FC<{ doc: LegalPageDoc }> = ({ doc }) => {
  const block = getBlockName(doc.slug)

  return (
    <article className={cn(block)}>
      <div className={cn(`${block}__inner pd__container`)}>
        <div className={cn(`${block}__inner-content`)}>
          <h1 className={cn(`${block}__title`)}>{doc.title}</h1>
          <div className={cn(`${block}__content`)}>
            <RichText data={doc.content as DefaultTypedEditorState} />
          </div>
        </div>
      </div>
    </article>
  )
}
