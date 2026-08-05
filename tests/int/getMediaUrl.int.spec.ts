import { describe, expect, it } from 'vitest'

import { getMediaUrl } from '@/utilities/getMediaUrl'

describe('getMediaUrl', () => {
  it('rewrites Payload media API paths to public media paths', () => {
    expect(getMediaUrl('/api/media/file/clubhouse-black.svg')).toBe('/media/clubhouse-black.svg')
  })

  it('preserves cache tags when rewriting media paths', () => {
    expect(getMediaUrl('/api/media/file/clubhouse-black.svg', '2026-07-24T15:49:48.988Z')).toBe(
      '/media/clubhouse-black.svg?2026-07-24T15%3A49%3A48.988Z',
    )
  })
})
