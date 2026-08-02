import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Get in touch',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'getInTouch',
          type: 'group',
          label: 'Get in touch',
          fields: [
            {
              name: 'subHeadline',
              type: 'text',
              label: 'Sub headline',
            },
            {
              name: 'title',
              type: 'text',
            },
            {
              type: 'collapsible',
              label: 'Button',
              admin: {
                initCollapsed: true,
              },
              fields: [
                link({
                  appearances: false,
                  overrides: {
                    name: 'button',
                    label: 'Button',
                  },
                }),
              ],
            },
          ],
        },
      ],
    },
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
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
