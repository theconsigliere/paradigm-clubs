import { describe, expect, it } from 'vitest'

import { shouldUseHomeFallback } from '@/utilities/shouldUseHomeFallback'

describe('shouldUseHomeFallback', () => {
  it('returns true for the home route when there is no CMS page', () => {
    expect(shouldUseHomeFallback('home')).toBe(true)
    expect(shouldUseHomeFallback('')).toBe(true)
  })

  it('returns false for other routes', () => {
    expect(shouldUseHomeFallback('about')).toBe(false)
  })
})
