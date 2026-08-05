import { afterEach, describe, expect, it } from 'vitest'

import { getDatabaseConnectionString } from '@/utilities/getDatabaseConnectionString'

describe('getDatabaseConnectionString', () => {
  const previousEnv = { ...process.env }

  afterEach(() => {
    process.env = { ...previousEnv }
  })

  it('ignores placeholder values and falls back to the first usable URL', () => {
    process.env.PARADIGM_POSTGRES_URL = '[SENSITIVE]'
    process.env.PARADIGM_POSTGRES_URL_NON_POOLING = '[REDACTED]'
    process.env.POSTGRES_URL = 'postgresql://neon.example/db'

    expect(getDatabaseConnectionString()).toBe('postgresql://neon.example/db')
  })

  it('returns undefined when no usable database connection string is present', () => {
    delete process.env.PARADIGM_POSTGRES_URL
    delete process.env.PARADIGM_POSTGRES_URL_NON_POOLING
    delete process.env.POSTGRES_URL
    delete process.env.DATABASE_URL

    expect(getDatabaseConnectionString()).toBeUndefined()
  })
})
