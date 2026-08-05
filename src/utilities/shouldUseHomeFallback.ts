export function shouldUseHomeFallback(slug: string): boolean {
  return slug === 'home' || slug === ''
}
