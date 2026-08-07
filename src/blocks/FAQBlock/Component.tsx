import React from 'react'

import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Button } from '@/components/Button'

type FAQBlockProps = {
  blockId: string
  subHeadline?: string | null
  title?: string | null
  button?: React.ComponentProps<typeof Button>
  content?: DefaultTypedEditorState | null
  faqs?: Array<{
    faqItem?: {
      question?: string | null
      answer?: DefaultTypedEditorState
    }
  }> | null
}

export const FAQBlock: React.FC<FAQBlockProps> = ({
  subHeadline,
  title,
  button,
  faqs,
  content,
}) => {
  return (
    <div className="faqBlock">
      <div className="faqBlock__inner pd__container">
        {subHeadline && <p className="faqBlock__eyebrow p-small mono">{subHeadline}</p>}
        <div className="faqBlock__title-section">
          <div className="faqBlock__title-group">
            {title && <h2 className="faqBlock__title">{title}</h2>}
          </div>
          {content && <RichText data={content} enableGutter={false} />}
          {button && <Button className="faqBlock__button btn--outline" {...button} />}
        </div>
        <div className="faqBlock__section">
          {Array.isArray(faqs) && faqs.length > 0 && (
            <div className="faqBlock__list">
              {faqs.map((entry, index) => {
                const item = entry.faqItem
                if (!item?.question) return null
                return (
                  <details className="faqBlock__item" key={index}>
                    <summary className="faqBlock__summary">
                      <h4 className="faqBlock__summary-text">{item.question}</h4>
                    </summary>
                    {item.answer && (
                      <div className="faqBlock__answer">
                        <RichText data={item.answer} enableGutter={false} />
                      </div>
                    )}
                  </details>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
