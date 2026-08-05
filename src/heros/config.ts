import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'basicHero',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
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
      name: 'mediaType',
      type: 'radio',
      defaultValue: 'image',
      options: [
        {
          label: 'Image',
          value: 'image',
        },
        {
          label: 'Video',
          value: 'video',
        },
      ],
      admin: {
        condition: (_, { type } = {}) => type === 'basicHero',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type, mediaType } = {}) => type === 'basicHero' && mediaType === 'image',
      },
      filterOptions: {
        mimeType: {
          contains: 'image',
        },
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type, mediaType } = {}) => type === 'basicHero' && mediaType === 'video',
      },
      filterOptions: {
        mimeType: {
          contains: 'video',
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
  ],
  label: false,
}
