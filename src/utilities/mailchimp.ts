import crypto from 'crypto'
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
})

// Mailchimp identifies a member by the MD5 hash of their lowercased email.
const subscriberHash = (email: string) =>
  crypto.createHash('md5').update(email.toLowerCase()).digest('hex')

export async function upsertMailchimpMember(email: string, phone?: string, name?: string) {
  const listId = process.env.MAILCHIMP_AUDIENCE_ID
  if (!listId) throw new Error('MAILCHIMP_AUDIENCE_ID is not set')

  const [firstName, ...rest] = (name ?? '').split(' ')
  const lastName = rest.join(' ')

  // setListMember = "add or update" (upsert). Re-submitting the same email
  // updates them instead of throwing "Member Exists".
  return mailchimp.lists.setListMember(listId, subscriberHash(email), {
    email_address: email,
    status_if_new: 'subscribed',
    merge_fields: {
      ...(firstName ? { FNAME: firstName } : {}),
      ...(lastName ? { LNAME: lastName } : {}),
      ...(phone ? { PHONE: phone } : {}), // needs a PHONE merge field in Mailchimp
    },
    tags: ['guest-list'],
  })
}
