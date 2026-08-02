import React from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

type MediaResource = MediaType | string | number | null

type VideoHeroProps = {
  logo?: MediaResource
  description?: string | null
  backgroundMedia?: MediaResource
  inspoTextLeft?: string | null
  inspoTextRight?: string | null
  mainFocusLogo?: MediaResource
  button?: React.ComponentProps<typeof CMSLink>
}

export const VideoHero: React.FC<VideoHeroProps> = ({
  logo,
  description,
  backgroundMedia,
  inspoTextLeft,
  inspoTextRight,
  mainFocusLogo,
  button,
}) => {
  return (
    <section className="videoHero" data-theme="dark">
      <div className="videoHero__overlay"></div>
      <div className="videoHero__inner pd__container">
        <div className="videoHero__video-background">
          {backgroundMedia && (
            <Media fill imgClassName="object-cover" priority resource={backgroundMedia} />
          )}
        </div>

        {inspoTextLeft && (
          <span className="p videoHero__tagline ultramono videoHero__tagline--left">
            {inspoTextLeft}
          </span>
        )}
        {inspoTextRight && (
          <span className="p videoHero__tagline ultramono videoHero__tagline--right">
            {inspoTextRight}
          </span>
        )}

        <div className="videoHero__text-content">
          {logo && (
            <div className="videoHero__logo-group">
              <Media
                htmlElement={null}
                resource={logo}
                pictureClassName="videoHero__logo-picture"
                className="videoHero__logo"
              />
            </div>
          )}

          <div className="videoHero__description-group">
            {description && <h6 className="videoHero__description">{description}</h6>}
          </div>

          {button && <CMSLink appearance={button.appearance} {...button} />}
        </div>

        {mainFocusLogo && (
          <div className="videoHero__focus-logo">
            <Media
              htmlElement={null}
              imgClassName="h-full w-full object-contain"
              resource={mainFocusLogo}
            />
          </div>
        )}
      </div>
    </section>
  )
}
