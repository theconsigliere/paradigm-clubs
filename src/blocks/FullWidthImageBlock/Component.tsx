import React from 'react'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Media as MediaType } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { FormBlock as ExistingFormBlock } from '@/blocks/Form/Component'
import { Button } from '@/components/ui/button'

type MediaResource = MediaType | string | number | null

type FullWidthImageBlockProps = {
  blockId: string
  subHeadline?: string | null
  logo?: MediaResource
  content?: DefaultTypedEditorState
  button?: React.ComponentProps<typeof Button>
  embedCode?: string | null
  inputForm?: FormType | string | number | null
  backgroundMedia?: MediaResource
}

export const FullWidthImageBlock: React.FC<FullWidthImageBlockProps> = ({
  subHeadline,
  logo,
  content,
  button,
  embedCode,
  inputForm,
  backgroundMedia,
}) => {
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
          {inputForm && typeof inputForm === 'object' && (
            <div className="signupBlock__form">
              <ExistingFormBlock enableIntro={false} form={inputForm as never} />
            </div>
          )}
          {button && (
            <Button className="fullWidth__button btn--primary btn--primary--white" {...button} />
          )}
          {embedCode && (
            <div className="fullWidth__embed" dangerouslySetInnerHTML={{ __html: embedCode }} />
          )}
        </div>
      </div>
    </section>
  )
}
