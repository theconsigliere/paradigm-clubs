import { Button } from '@/components/Button'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  children?: React.ReactNode
  className?: string
  classNames?: string | null
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const { children, className, classNames, label, newTab, reference, type, url } = props

  return (
    <Button
      className={className}
      classNames={classNames}
      href={url || undefined}
      label={label}
      newTab={newTab}
      reference={reference}
      type={type}
    >
      {children}
    </Button>
  )
}
