const PLACEHOLDER_VALUES = new Set(['[sensitive]', '[redacted]', 'redacted', '***'])

const isPlaceholderValue = (value: string | undefined): value is undefined => {
  if (!value) return true

  const normalized = value.trim().toLowerCase()

  return PLACEHOLDER_VALUES.has(normalized) || normalized.startsWith('[sensitive')
}

export const getDatabaseConnectionString = () => {
  const candidates = [
    process.env.PARADIGM_POSTGRES_URL,
    process.env.PARADIGM_POSTGRES_URL_NON_POOLING,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.DATABASE_URL,
    process.env.DATABASE_URL_UNPOOLED,
  ]

  return candidates.find((value): value is string => !isPlaceholderValue(value))
}
