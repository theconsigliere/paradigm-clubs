import React from 'react'

import { Logo as DefaultLogo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import type { Header } from '@/payload-types'

type HeaderLogoProps = {
  logo?: Header['logo']
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ logo }) => {
  if (logo && typeof logo === 'object') {
    return (
      <div className="pd__header-logo">
        <Media
          className="pd__header-logo-media"
          imgClassName="pd__header-logo-image"
          loading="eager"
          priority
          resource={logo}
        />
      </div>
    )
  }

  return <DefaultLogo loading="eager" priority="high" className="pd__header-logo-fallback" />
}
