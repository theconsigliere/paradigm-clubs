import { describe, expect, it } from 'vitest'

import { getMediaUrl } from '@/utilities/getMediaUrl'

describe('getMediaUrl', () => {
  it('preserves a Payload media URL when no cache tag is provided', () => {
    expect(getMediaUrl('/api/media/file/clubhouse-black.svg')).toBe('/api/media/file/clubhouse-black.svg')
  })

  it('appends a cache tag to the existing media URL', () => {
    expect(getMediaUrl('/api/media/file/clubhouse-black.svg', '2026-07-24T15:49:48.988Z')).toBe(
      '/api/media/file/clubhouse-black.svg?2026-07-24T15%3A49%3A48.988Z',
    )
  })
})
