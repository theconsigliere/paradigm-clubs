import React from 'react'

import { Button } from '@/components/Button'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Media as MediaType } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type MediaResource = MediaType | string | number | null

type TextFeatureBlockProps = {
  blockId: string
  subHeadline?: string | null
  logo?: MediaResource
  mediaType?: 'images' | 'video' | null
  titles?: Array<{
    title?: string | null
  }> | null
  images?: Array<{
    image?: MediaResource
  }> | null
  video?: MediaResource
  content?: DefaultTypedEditorState
  button?: React.ComponentProps<typeof Button>
}

export const TextFeatureBlock: React.FC<TextFeatureBlockProps> = ({
  subHeadline,
  logo,
  mediaType,
  titles,
  images,
  video,
  content,
  button,
}) => {
  const showGallery = mediaType !== 'video'

  return (
    <section className="textFeatureBlock">
      <div className="textFeatureBlock__inner pd__container">
        <div className="textFeatureBlock__top-section">
          {subHeadline && (
            <p className="mono textFeatureBlock__sub-headline p-small">{subHeadline}</p>
          )}
          {logo && (
            <div className="textFeatureBlock__logo">
              <Media resource={logo} />
            </div>
          )}
        </div>
        <div className="textFeatureBlock__text-image-section">
          {Array.isArray(titles) && (
            <div className="textFeatureBlock__titles">
              {titles.map(
                (item, index) =>
                  item.title && (
                    <div
                      className={`textFeatureBlock__title-outer textFeatureBlock__title-outer--${index}`}
                      key={index}
                    >
                      <h3 className="textFeatureBlock__title cursive" key={index}>
                        {item.title}
                      </h3>
                    </div>
                  ),
              )}
            </div>
          )}

          {showGallery && Array.isArray(images) && images.length > 0 && (
            <div className="textFeatureBlock__gallery">
              {images.map((item, index) =>
                item.image ? (
                  <Media
                    className="textFeatureBlock__image"
                    imgClassName="textFeatureBlock__image-media"
                    key={index}
                    resource={item.image}
                  />
                ) : null,
              )}
            </div>
          )}

          {!showGallery && video && (
            <Media
              className="textFeatureBlock__video"
              resource={video}
              videoClassName="textFeatureBlock__video-media"
            />
          )}
        </div>
        <div className="textFeatureBlock__text-section">
          {content && <RichText data={content} enableGutter={false} />}
          {button && <Button className="btn--outline btn--outline--white" {...button} />}
        </div>
      </div>
    </section>
  )
}
