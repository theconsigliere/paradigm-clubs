import canUseDOM from './canUseDOM'

export const normalizeSiteURL = (value?: string) => {
  if (!value) return ''

  const trimmed = value.trim()
  if (!trimmed) return ''

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  if (/^\w+:\/\//i.test(trimmed)) {
    return trimmed
  }

  if (/^localhost(?::\d+)?$/i.test(trimmed)) {
    return `http://${trimmed}`
  }

  if (/^[^/\s]+$/i.test(trimmed)) {
    return `https://${trimmed}`
  }

  if (/^[^/\s]+\/$/i.test(trimmed)) {
    return `https://${trimmed.replace(/\/$/, '/')}`
  }

  return trimmed
}

const getVercelURL = () => {
  return normalizeSiteURL(
    process.env.VERCEL_URL ||
      process.env.VERCEL_BRANCH_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
  )
}

export const getServerSideURL = () => {
  return getVercelURL() || 'http://localhost:3000'
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return getVercelURL() || ''
}
