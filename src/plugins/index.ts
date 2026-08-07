import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { syncToMailchimp } from '@/hooks/syncToMailchimp'

import { Page, Post } from '@/payload-types'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | PARADIGM` : 'PARADIGM'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_URL ||
    process.env.VERCEL_BRANCH_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'http://localhost:3000'

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  vercelBlobStorage({
    enabled: true,
    collections: { media: true },
    token: process.env.BLOB_READ_WRITE_TOKEN,
    clientUploads: true, // required to upload files >4.5MB on Vercel
  }),
  formBuilderPlugin({
    fields: {
      text: true,
      email: true,
      number: true,
      textarea: true,
      checkbox: true,
      select: true,
      message: true,
      payment: false,
    },

    // 1. Adds the per-form opt-in checkbox in the CMS
    formOverrides: {
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'enableMailchimp',
          type: 'checkbox',
          label: 'Sync submissions to Mailchimp',
          defaultValue: false,
          admin: {
            description:
              'When on, people who submit this form are added to your Mailchimp audience.',
            position: 'sidebar',
          },
        },
      ],
    },

    // 2. Runs the sync hook on every submission (it self-gates on the checkbox)
    formSubmissionOverrides: {
      hooks: {
        afterChange: [syncToMailchimp],
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
