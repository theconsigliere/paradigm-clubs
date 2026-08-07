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
    <section className="basicHero">
      {mediaResource && (
        <div className="basicHero__media-background">
          <div className="hero__overlay"></div>
          <Media
            htmlElement={null}
            imgClassName="w-full h-auto"
            videoClassName="w-full h-auto"
            resource={mediaResource}
          />
        </div>
      )}

      <div className="pd__container basicHero__content">
        {subHeadline && <p className="mono basicHero__eyebrow">{subHeadline}</p>}
        {title && <h1 className="basicHero__title">{title}</h1>}
        {content && <RichText data={content} enableGutter={false} />}
      </div>
    </section>
  )
}
