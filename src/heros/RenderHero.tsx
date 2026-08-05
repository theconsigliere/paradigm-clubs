import React from 'react'

import type { Page } from '@/payload-types'

import { VideoHero } from '@/heros/VideoHero'
import { BasicHero } from '@/heros/BasicHero'

const heroes: Record<string, React.FC<any>> = {
  videoHero: VideoHero,
  basicHero: BasicHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
