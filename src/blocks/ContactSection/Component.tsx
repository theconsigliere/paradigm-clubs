import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import React from 'react'

import { FormBlock } from '@/blocks/Form/Component'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

type ContactSectionBlockProps = {
  blockName?: string
  blockType?: 'contactSection'
  form: FormType
  contactInfo?:
    | {
        content?: DefaultTypedEditorState
        id?: string | null
      }[]
    | null
  buttons?:
    | {
        link: React.ComponentProps<typeof CMSLink>
        id?: string | null
      }[]
    | null
}

export const ContactSectionBlock: React.FC<ContactSectionBlockProps> = ({
  form,
  contactInfo,
  buttons,
}) => {
  return (
    <section className="contactSection pd__container">
      <div className="contactSection__inner">
        <div className="contactSection__info">
          {contactInfo?.map((item, index) => {
            if (!item?.content) return null

            return (
              <RichText
                className="contactSection__info-item"
                data={item.content}
                enableGutter={false}
                key={item.id || index}
              />
            )
          })}

          {buttons && buttons.length > 0 && (
            <div className="contactSection__buttons">
              {buttons.map(({ link }, index) => (
                <CMSLink appearance={link.appearance} key={index} {...link} />
              ))}
            </div>
          )}
        </div>

        <div className="contactSection__form">
          <FormBlock enableIntro={false} form={form} />
        </div>
      </div>
    </section>
  )
}
