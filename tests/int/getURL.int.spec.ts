import { afterEach, describe, expect, it } from 'vitest'

import { getServerSideURL, normalizeSiteURL } from '@/utilities/getURL'

describe('getURL utilities', () => {
  const previousEnv = { ...process.env }

  afterEach(() => {
    process.env = { ...previousEnv }
  })

  it('normalizes bare hostnames into absolute https URLs', () => {
    expect(normalizeSiteURL('paradigm-clubs.vercel.app')).toBe('https://paradigm-clubs.vercel.app')
    expect(normalizeSiteURL('localhost:3000')).toBe('http://localhost:3000')
  })

  it('returns a fully qualified URL from Vercel env values', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'paradigm-clubs.vercel.app'

    expect(getServerSideURL()).toBe('https://paradigm-clubs.vercel.app')
  })
})
