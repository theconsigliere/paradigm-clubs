import type { Metadata } from 'next'

const serverUrl =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_URL ||
  process.env.VERCEL_BRANCH_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'http://localhost:3000'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'A premium training club for those who expect more from the way they exercise.',
  images: [
    {
      url: `${serverUrl}/P-META.webp`,
    },
  ],
  siteName: 'Paradigm',
  title: 'Paradigm',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
