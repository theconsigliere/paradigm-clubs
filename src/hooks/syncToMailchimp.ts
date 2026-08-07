import type { CollectionAfterChangeHook } from 'payload'
import { upsertMailchimpMember } from '@/utilities/mailchimp'

type Row = { field: string; value: string }

export const syncToMailchimp: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  // Only on brand-new submissions
  if (operation !== 'create') return doc

  // 1. Look up the form this submission belongs to
  const formId = typeof doc.form === 'object' ? doc.form.id : doc.form
  if (!formId) return doc

  const form = await req.payload.findByID({
    collection: 'forms',
    id: formId,
    depth: 0,
  })

  // 2. THE OPT-IN GATE: only sync if the form has the checkbox ticked in the CMS
  if (!form?.enableMailchimp) return doc

  // 3. Pull the values out of the submission
  const rows: Row[] = Array.isArray(doc.submissionData) ? doc.submissionData : []
  const get = (name: string) => rows.find((r) => r.field === name)?.value?.trim() || undefined

  const email = get('email')
  if (!email) return doc

  // 4. Send to Mailchimp — never throw, so a Mailchimp error can't break the submission
  try {
    await upsertMailchimpMember(email, get('phone'), get('name'))
    req.payload.logger.info(`Mailchimp: synced ${email}`)
  } catch (err) {
    req.payload.logger.error(`Mailchimp sync failed for ${email}: ${err}`)
  }

  return doc
}
