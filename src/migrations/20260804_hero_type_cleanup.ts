import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-vercel-postgres'

// The highImpact / mediumImpact / lowImpact heroes were removed from the hero config.
// Any row still holding one of those values blocks the enum from being narrowed, so
// normalise them to 'none' before the schema change lands. 'none' rather than
// 'basicHero' because basicHero requires an image and these rows carry no media.
//
// Casting to text keeps this safe to run whether the column is still the old enum,
// already narrowed, or sitting as text after a half-applied push.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "pages"
    SET "hero_type" = 'none'
    WHERE "hero_type"::text IN ('highImpact', 'mediumImpact', 'lowImpact');
  `)

  await db.execute(sql`
    UPDATE "_pages_v"
    SET "version_hero_type" = 'none'
    WHERE "version_hero_type"::text IN ('highImpact', 'mediumImpact', 'lowImpact');
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Irreversible: the original hero type per row is not recoverable.
}
