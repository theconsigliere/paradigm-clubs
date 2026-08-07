import RichText from '@/components/RichText'
import React from 'react'

import { Width } from '../Width'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export const Message: React.FC<{ className?: string; message: DefaultTypedEditorState }> = ({
  className,
  message,
}) => {
  const resolvedClassName = ['my-12', className].filter(Boolean).join(' ')

  return (
    <Width className={resolvedClassName} width="100">
      {message && <RichText data={message} />}
    </Width>
  )
}
