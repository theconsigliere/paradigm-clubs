import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: {
          contains: 'image',
        },
      },
    },
    {
      type: 'collapsible',
      label: 'Page CTA Button',
      admin: {
        initCollapsed: true,
      },
      fields: [
        link({
          appearances: false,
          overrides: {
            name: 'pageCTAButton',
            label: 'CTA Button',
          },
        }),
      ],
    },
    {
      type: 'collapsible',
      label: 'Floating Navigation',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'floatingNavigation',
          label: 'Floating Navigation',
          type: 'group',
          fields: [
            {
              name: 'closed',
              type: 'group',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: {
                      contains: 'image',
                    },
                  },
                },
                link({
                  appearances: false,
                  overrides: {
                    name: 'link',
                    label: 'Link',
                  },
                }),
                {
                  name: 'content',
                  type: 'richText',
                  editor: lexicalEditor(),
                },
              ],
            },
            {
              name: 'open',
              type: 'group',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: {
                      contains: 'image',
                    },
                  },
                },
                {
                  name: 'navItems',
                  type: 'array',
                  fields: [
                    link({
                      appearances: false,
                    }),
                  ],
                  maxRows: 6,
                  admin: {
                    initCollapsed: true,
                    components: {
                      RowLabel: '@/Header/RowLabel#RowLabel',
                    },
                  },
                },
                linkGroup({
                  appearances: false,
                  overrides: {
                    name: 'socialLinks',
                    label: 'Social Links',
                    maxRows: 8,
                  },
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
