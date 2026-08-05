import React from 'react'

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
}

// A resource is a real, populated Media doc (not just an ID/string) when it's an object.
const isPopulatedMedia = (resource: MediaResource): resource is MediaType =>
  typeof resource === 'object' && resource !== null

const isVideoResource = (resource: MediaResource): boolean =>
  isPopulatedMedia(resource) && Boolean(resource.mimeType?.startsWith('video'))

export const VideoHero: React.FC<VideoHeroProps> = ({
  logo,
  description,
  backgroundMedia,
  inspoTextLeft,
  inspoTextRight,
  mainFocusLogo,
}) => {
  const backgroundIsVideo = backgroundMedia ? isVideoResource(backgroundMedia) : false
  const backgroundVideoUrl = backgroundMedia && isPopulatedMedia(backgroundMedia) ? backgroundMedia.url : undefined

  return (
    <section className="videoHero" data-theme="dark">
      <div className="videoHero__overlay"></div>
      <div className="videoHero__inner pd__container">
        <div className="videoHero__video-background">
          {backgroundMedia && backgroundIsVideo && backgroundVideoUrl && (
            <video
              className="videoHero__video"
              src={backgroundVideoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              // Show a still frame while the video loads, if a poster image exists.
              poster={
                isPopulatedMedia(backgroundMedia)
                  ? (backgroundMedia.sizes?.large?.url ?? undefined)
                  : undefined
              }
            />
          )}

          {backgroundMedia && !backgroundIsVideo && (
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
