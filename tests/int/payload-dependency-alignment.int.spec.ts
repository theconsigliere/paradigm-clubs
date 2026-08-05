import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Payload dependency alignment', () => {
  it('keeps the installed Payload storage and UI packages on the same release', () => {
    const lockfilePath = path.resolve(process.cwd(), 'package-lock.json')
    const lockfile = JSON.parse(readFileSync(lockfilePath, 'utf8'))

    const storageVersion = lockfile.packages['node_modules/@payloadcms/storage-vercel-blob']?.version
    const uiVersion = lockfile.packages['node_modules/@payloadcms/ui']?.version
    const payloadVersion = lockfile.packages['node_modules/payload']?.version

    expect(storageVersion).toBeDefined()
    expect(uiVersion).toBeDefined()
    expect(payloadVersion).toBeDefined()
    expect(storageVersion).toBe(uiVersion)
    expect(storageVersion).toBe(payloadVersion)
  })
})
