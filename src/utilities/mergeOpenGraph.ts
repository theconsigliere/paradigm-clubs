import type { Metadata } from 'next'
import { getServerSideURL, normalizeSiteURL } from './getURL'

const serverUrl = normalizeSiteURL(getServerSideURL())

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
