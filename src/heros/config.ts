import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Video Hero',
          value: 'videoHero',
        },
        {
          label: 'Basic Hero',
          value: 'basicHero',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        admin: {
          condition: (_, { type } = {}) =>
            ['highImpact', 'mediumImpact', 'lowImpact'].includes(type),
        },
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'videoHero',
      },
      filterOptions: {
        mimeType: {
          in: ['image/png', 'image/svg+xml'],
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        condition: (_, { type } = {}) => type === 'videoHero',
      },
    },
    {
      name: 'backgroundMedia',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'videoHero',
      },
    },
    {
      name: 'inspoTextLeft',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'videoHero',
      },
    },
    {
      name: 'inspoTextRight',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'videoHero',
      },
    },
    {
      name: 'mainFocusLogo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => type === 'videoHero',
        description: 'Displayed full width with a 16:9 aspect ratio. Height cannot be changed.',
      },
      filterOptions: {
        mimeType: {
          in: ['image/png', 'image/svg+xml'],
        },
      },
    },
    {
      name: 'subHeadline',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'basicHero',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => type === 'basicHero',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      admin: {
        condition: (_, { type } = {}) => type === 'basicHero',
      },
    },
    {
      type: 'collapsible',
      label: 'Button',
      admin: {
        condition: (_, { type } = {}) => type === 'basicHero',
        initCollapsed: true,
      },
      fields: [
        link({
          appearances: false,
          overrides: {
            name: 'button',
          },
        }),
      ],
    },
  ],
  label: false,
}
