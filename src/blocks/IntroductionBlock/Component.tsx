import React from 'react'

import { Button } from '@/components/Button'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Media as MediaType } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type MediaResource = MediaType | string | number | null

type IntroductionItem = {
  trainingItem?: {
    subHeadline?: string | null
    content?: DefaultTypedEditorState
    image?: MediaResource
  }
}

type IntroductionBlockProps = {
  blockId: string
  subHeadline?: string | null
  trainingContent?: IntroductionItem[] | null
  button?: React.ComponentProps<typeof Button>
}

export const IntroductionBlock: React.FC<IntroductionBlockProps> = ({
  blockId,
  subHeadline,
  trainingContent,
  button,
}) => {
  return (
    <div className="intro__inner">
      <div className="intro__item intro__item-stopper">
        <div className="intro__item--text-group">
          {subHeadline && <p className="ultramono p-smallest intro__item--text">{subHeadline}</p>}
        </div>
      </div>

      {Array.isArray(trainingContent) && trainingContent.length > 0 && (
        <div className="intro__array-container">
          {trainingContent.map((item, index) => {
            const trainingItem = item.trainingItem

            return (
              <div className={`intro__item intro__item--${index}`} key={index}>
                <div className="intro__item--space"></div>

                <div className="intro__item--text-group">
                  <div className="intro__item--text-group--inner">
                    {trainingItem?.subHeadline && (
                      <p className="mono intro__item--mono p-small">{trainingItem.subHeadline}</p>
                    )}
                    {trainingItem?.content && (
                      <RichText
                        className="intro__item--rich-text"
                        data={trainingItem.content}
                        enableGutter={false}
                      />
                    )}
                  </div>
                </div>

                {trainingItem?.image && (
                  <div className="intro__item--image-container">
                    <Media
                      className="intro__item--image-div"
                      imgClassName="h-full w-full object-cover"
                      resource={trainingItem.image}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="intro__item-stopper intro__item">
        <div className="intro__item--text-group">
          {button && <Button className="btn--primary" {...button} />}
        </div>
      </div>
    </div>
  )
}
