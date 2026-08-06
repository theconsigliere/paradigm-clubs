import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { Button } from '@/components/Button'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  return (
    <section className="contentBlock">
      <div className="contentBlock__grid">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn('contentBlock__column', `contentBlock__column--${size}`)}
                key={index}
              >
                {richText && (
                  <RichText
                    className="contentBlock__richText"
                    data={richText}
                    enableGutter={false}
                  />
                )}

                {enableLink && <Button className="contentBlock__link" {...link} />}
              </div>
            )
          })}
      </div>
    </section>
  )
}
