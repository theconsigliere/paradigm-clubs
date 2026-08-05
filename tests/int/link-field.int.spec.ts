import { describe, expect, it } from 'vitest'

import { link } from '../../src/fields/link'

describe('link field validation', () => {
  it('requires the right value based on the selected link type', () => {
    const linkField = link() as any
    const linkRow = linkField.fields.find(
      (field: any) =>
        field.type === 'row' && field.fields?.some((child: any) => child.name === 'reference'),
    )
    const referenceField = linkRow.fields.find((field: any) => field.name === 'reference')
    const urlField = linkRow.fields.find((field: any) => field.name === 'url')

    expect(referenceField.validate(undefined, { siblingData: { type: 'reference' } })).toBe(
      'Document to link to is required when using an internal link.',
    )
    expect(referenceField.validate('page-id', { siblingData: { type: 'reference' } })).toBe(true)
    expect(urlField.validate(undefined, { siblingData: { type: 'custom' } })).toBe(
      'Custom URL is required when using a custom URL.',
    )
    expect(urlField.validate('https://example.com', { siblingData: { type: 'custom' } })).toBe(true)
  })
})
