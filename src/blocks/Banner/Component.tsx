import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('bannerBlock', className)}>
      <div
        className={cn('bannerBlock__panel', {
          'bannerBlock__panel--info': style === 'info',
          'bannerBlock__panel--error': style === 'error',
          'bannerBlock__panel--success': style === 'success',
          'bannerBlock__panel--warning': style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
