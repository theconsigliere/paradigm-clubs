import React from 'react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { FormBlock as ExistingFormBlock } from '@/blocks/Form/Component'
import type { Media as MediaType } from '@/payload-types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type MediaResource = MediaType | string | number | null

type SignupBlockProps = {
  blockId: string
  subHeadline?: string | null
  title?: string | null
  content?: DefaultTypedEditorState
  inputType?: 'image' | 'form' | null
  inputImage?: MediaResource
  inputForm?: FormType | string | number | null
}

export const SignupBlock: React.FC<SignupBlockProps> = ({
  blockId,
  subHeadline,
  title,
  content,
  inputType,
  inputImage,
  inputForm,
}) => {
  return (
    <section className="signupBlock">
      <div className="signupBlock__inner pd__container">
        <div className="signupBlock__container">
          {subHeadline && <p className="signupBlock__eyebrow mono p-small">{subHeadline}</p>}
          <div className="signupBlock__content">
            {title && <h2 className="signupBlock__title">{title}</h2>}
            {content && <RichText data={content} enableGutter={false} />}
          </div>

          <div className="signupBlock__input">
            {inputType === 'image' && inputImage && (
              <Media
                className="signupBlock__image"
                imgClassName="signupBlock__image-media"
                resource={inputImage}
              />
            )}

            {inputType === 'form' && inputForm && typeof inputForm === 'object' && (
              <div className="signupBlock__form">
                <ExistingFormBlock enableIntro={false} form={inputForm as never} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
