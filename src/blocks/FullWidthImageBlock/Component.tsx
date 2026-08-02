import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Media as MediaType } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type MediaResource = MediaType | string | number | null

type FullWidthImageBlockProps = {
  blockId: string
  subHeadline?: string | null
  logo?: MediaResource
  content?: DefaultTypedEditorState
  button?: React.ComponentProps<typeof CMSLink>
  embedCode?: string | null
  backgroundMedia?: MediaResource
}

export const FullWidthImageBlock: React.FC<FullWidthImageBlockProps> = ({
  subHeadline,
  logo,
  content,
  button,
  embedCode,
  backgroundMedia,
}) => {
  console.log('content', content)
  return (
    <section className="fullWidth">
      {backgroundMedia && (
        <div className="fullWidth__image-group">
          <div className="fullWidth__overlay" />
          <Media fill imgClassName="fullWidth__image" resource={backgroundMedia} />
        </div>
      )}

      <div className="fullWidth__text-group">
        {subHeadline && <p className="mono fullWidth__sub-headline">{subHeadline}</p>}
        {logo && (
          <div className="fullWidth__logo">
            <Media resource={logo} />
          </div>
        )}

        <div className="fullWidth__text-content">
          {content && <RichText data={content} enableGutter={false} />}
          {button && <CMSLink appearance={button.appearance} {...button} />}
          {embedCode && (
            <div className="fullWidth__embed" dangerouslySetInnerHTML={{ __html: embedCode }} />
          )}
        </div>
      </div>
    </section>
  )
}
