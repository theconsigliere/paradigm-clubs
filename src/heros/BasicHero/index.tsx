import React from 'react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Media as MediaType } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type MediaResource = MediaType | string | number | null

type BasicHeroProps = {
  subHeadline?: string | null
  title?: string | null
  content?: DefaultTypedEditorState
  mediaType?: 'image' | 'video' | null
  image?: MediaResource
  video?: MediaResource
}

export const BasicHero: React.FC<BasicHeroProps> = ({
  subHeadline,
  title,
  content,
  mediaType,
  image,
  video,
}) => {
  const mediaResource = mediaType === 'video' ? video : image

  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-3xl space-y-5 basicHero__content">
        {subHeadline && (
          <p className="text-sm uppercase tracking-wider text-muted-foreground">{subHeadline}</p>
        )}
        {title && <h1 className="text-4xl md:text-6xl font-semibold text-balance">{title}</h1>}
        {content && <RichText data={content} enableGutter={false} />}
        {mediaResource && (
          <div className="basicHero__media">
            <Media
              htmlElement={null}
              imgClassName="w-full h-auto"
              videoClassName="w-full h-auto"
              resource={mediaResource}
            />
          </div>
        )}
      </div>
    </section>
  )
}
