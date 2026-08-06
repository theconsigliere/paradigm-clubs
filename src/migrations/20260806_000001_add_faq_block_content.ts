import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_faq_block"
        ADD COLUMN IF NOT EXISTS "content" jsonb;
    EXCEPTION WHEN duplicate_column THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_faq_block"
        ADD COLUMN IF NOT EXISTS "content" jsonb;
    EXCEPTION WHEN duplicate_column THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_faq_block" DROP COLUMN IF EXISTS "content";
    ALTER TABLE "_pages_v_blocks_faq_block" DROP COLUMN IF EXISTS "content";
  `)
}
