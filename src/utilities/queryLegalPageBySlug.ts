import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import { getDraftMode } from './getDraftMode'

export const queryLegalPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const draft = await getDraftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'legal-pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
