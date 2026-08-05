// src/fields/slug/index.ts
import type { CheckboxField, FieldHook, TextField } from 'payload'

type SingleTextField = Extract<TextField, { hasMany?: false }>

export const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')

const formatSlugHook =
  (fieldToUse: string): FieldHook =>
  ({ data, value }) => {
    // Locked: keep whatever's there, just normalize it.
    if (data?.slugLock && typeof value === 'string') {
      return formatSlug(value)
    }

    // Unlocked (default): keep the slug in sync with the source field (e.g. `title`).
    const source = data?.[fieldToUse]
    if (typeof source === 'string' && source.length > 0) {
      return formatSlug(source)
    }

    return typeof value === 'string' ? formatSlug(value) : value
  }

type SlugFieldOverrides = {
  slugOverrides?: Omit<Partial<SingleTextField>, 'name' | 'type' | 'hasMany'>
  checkboxOverrides?: Omit<Partial<CheckboxField>, 'name' | 'type'>
}

export const slugField = (
  fieldToUse: string = 'title',
  overrides: SlugFieldOverrides = {},
): [TextField, CheckboxField] => {
  const { slugOverrides, checkboxOverrides } = overrides

  const checkbox: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      position: 'sidebar',
      description: 'Check to stop the slug from regenerating when the title changes.',
    },
    ...checkboxOverrides,
  }

  const slug: SingleTextField = {
    name: 'slug',
    type: 'text',
    index: true,
    unique: true,
    required: true,
    admin: {
      position: 'sidebar',
      description: `Auto-generated from "${fieldToUse}". Check "Slug Lock" above to edit manually.`,
    },
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    ...slugOverrides,
  }

  return [slug, checkbox]
}
