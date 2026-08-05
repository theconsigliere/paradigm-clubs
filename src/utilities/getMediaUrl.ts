/**
 * Processes media resource URL to ensure proper formatting.
 *
 * Payload may already provide a fully qualified storage URL (for example from
 * Vercel storage or another adapter), so we should preserve that URL and only
 * append a cache tag when needed.
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const trimmedUrl = url.trim()
  if (!trimmedUrl) return ''

  if (!cacheTag || cacheTag === '') {
    return trimmedUrl
  }

  const encodedCacheTag = encodeURIComponent(cacheTag)

  return trimmedUrl.includes('?') ? `${trimmedUrl}&${encodedCacheTag}` : `${trimmedUrl}?${encodedCacheTag}`
}
