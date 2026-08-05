import { draftMode } from 'next/headers'

export const getDraftMode = async () => {
  try {
    const { isEnabled } = await draftMode()
    return isEnabled
  } catch {
    return false
  }
}
