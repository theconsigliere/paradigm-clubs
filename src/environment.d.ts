declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URL?: string
      POSTGRES_URL?: string
      POSTGRES_PRISMA_URL?: string
      POSTGRES_URL_NON_POOLING?: string
      PARADIGM_POSTGRES_URL?: string
      PARADIGM_POSTGRES_URL_NON_POOLING?: string
      PARADIGM_POSTGRES_DATABASE?: string
      NEXT_PUBLIC_SERVER_URL?: string
      VERCEL_URL?: string
      VERCEL_BRANCH_URL?: string
      VERCEL_PROJECT_PRODUCTION_URL?: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
