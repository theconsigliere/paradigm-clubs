import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import { getDraftMode } from './getDraftMode'

export const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const draft = await getDraftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 3,
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
