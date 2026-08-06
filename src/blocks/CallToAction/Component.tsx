import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Button } from '@/components/Button'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <section className="ctaBlock">
      <div className="ctaBlock__shell">
        <div className="ctaBlock__content">
          {richText && (
            <RichText className="ctaBlock__richText" data={richText} enableGutter={false} />
          )}
        </div>
        <div className="ctaBlock__links">
          {(links || []).map(({ link }, i) => {
            return <Button key={i} {...link} />
          })}
        </div>
      </div>
    </section>
  )
}
