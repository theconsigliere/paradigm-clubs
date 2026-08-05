/**
 * Processes media resource URL to ensure proper formatting.
 *
 * Payload stores media files under the public media directory, and the frontend
 * should reference them as static assets rather than the Payload media API route.
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const normalizedUrl = url.replace(/^\/api\/media\/file\//, '/media/')

  if (cacheTag && cacheTag !== '') {
    const encodedCacheTag = encodeURIComponent(cacheTag)
    return `${normalizedUrl}?${encodedCacheTag}`
  }

  return normalizedUrl
}
