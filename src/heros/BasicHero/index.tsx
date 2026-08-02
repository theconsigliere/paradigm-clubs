import React from 'react'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type BasicHeroProps = {
  subHeadline?: string | null
  title?: string | null
  content?: DefaultTypedEditorState
  button?: React.ComponentProps<typeof CMSLink>
}

export const BasicHero: React.FC<BasicHeroProps> = ({ subHeadline, title, content, button }) => {
  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-3xl space-y-5">
        {subHeadline && (
          <p className="text-sm uppercase tracking-wider text-muted-foreground">{subHeadline}</p>
        )}
        {title && <h1 className="text-4xl md:text-6xl font-semibold text-balance">{title}</h1>}
        {content && <RichText data={content} enableGutter={false} />}
        {button && <CMSLink appearance={button.appearance} {...button} />}
      </div>
    </section>
  )
}
