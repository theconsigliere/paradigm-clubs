import React from 'react'

import { Button } from '@/components/Button'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Media as MediaType } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type MediaResource = MediaType | string | number | null

type BreakdownItem = {
  breakdownItem?: {
    image?: MediaResource
    title?: string | null
    content?: DefaultTypedEditorState
  }
}

type BreakdownBlockProps = {
  blockId: string
  subHeadline?: string | null
  logo?: MediaResource
  title?: string | null
  description?: string | null
  button?: React.ComponentProps<typeof Button>
  breakdownContent?: BreakdownItem[] | null
  subHeadlineBottom?: string | null
}

export const BreakdownBlock: React.FC<BreakdownBlockProps> = ({
  blockId,
  subHeadline,
  logo,
  title,
  description,
  button,
  breakdownContent,
  subHeadlineBottom,
}) => {
  return (
    <section className="breakdownBlock">
      <div className="breakdownBlock__inner pd__container">
        <div className="breakdownBlock__title-section">
          <div className="breakdownBlock__title-section--left">
            {subHeadline && <p className="mono p-small breakdownBlock__eyebrow">{subHeadline}</p>}
            {logo && (
              <div className="breakdownBlock__logo">
                <Media resource={logo} className="breakdownBlock__logo-media" />
              </div>
            )}
            {title && <h3 className="breakdownBlock__title">{title}</h3>}
          </div>
          <div className="breakdownBlock__title-section--right">
            <div className="breakdownBlock__title-section--right--inner">
              {description && <h6 className="breakdownBlock__description">{description}</h6>}
              {button && <Button className="breakdownBlock__button" {...button} />}
            </div>
          </div>
        </div>

        <div className="breakdownBlock__bottom-section">
          {Array.isArray(breakdownContent) && breakdownContent.length > 0 && (
            <div className="breakdownBlock__grid">
              {breakdownContent.map((item, index) => {
                const breakdownItem = item.breakdownItem

                return (
                  <article className="breakdownBlock__card" key={index}>
                    {breakdownItem?.image && (
                      <Media
                        className="breakdownBlock__card-image"
                        imgClassName="breakdownBlock__card-image-media"
                        resource={breakdownItem.image}
                      />
                    )}
                    <div className="breakdownBlock__card-content">
                      {breakdownItem?.title && (
                        <h5 className="breakdownBlock__card-title">{breakdownItem.title}</h5>
                      )}
                      {breakdownItem?.content && (
                        <RichText
                          className="breakdownBlock__card-text"
                          data={breakdownItem.content}
                          enableGutter={false}
                        />
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {subHeadlineBottom && (
            <p className="breakdownBlock__eyebrow--bottom mono p-small">{subHeadlineBottom}</p>
          )}
        </div>
      </div>
    </section>
  )
}
