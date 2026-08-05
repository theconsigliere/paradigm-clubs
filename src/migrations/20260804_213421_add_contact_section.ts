import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_contact_section_buttons_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_contact_section_buttons_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_contact_section_buttons_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_contact_section_buttons_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_id" varchar,
      "form_id" integer,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_section_contact_info" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "content" jsonb
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_contact_section_buttons" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_pages_blocks_contact_section_buttons_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" "enum_pages_blocks_contact_section_buttons_link_appearance" DEFAULT 'default'
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "block_id" varchar,
      "form_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_section_contact_info" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "content" jsonb,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_section_buttons" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "link_type" "enum__pages_v_blocks_contact_section_buttons_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar,
      "link_appearance" "enum__pages_v_blocks_contact_section_buttons_link_appearance" DEFAULT 'default',
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_section_contact_info"
        ADD CONSTRAINT "pages_blocks_contact_section_contact_info_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_section_buttons"
        ADD CONSTRAINT "pages_blocks_contact_section_buttons_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_section"
        ADD CONSTRAINT "pages_blocks_contact_section_form_id_forms_id_fk"
        FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_contact_section"
        ADD CONSTRAINT "pages_blocks_contact_section_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_section_contact_info"
        ADD CONSTRAINT "_pages_v_blocks_contact_section_contact_info_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_section"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_section_buttons"
        ADD CONSTRAINT "_pages_v_blocks_contact_section_buttons_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_section"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_section"
        ADD CONSTRAINT "_pages_v_blocks_contact_section_form_id_forms_id_fk"
        FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_contact_section"
        ADD CONSTRAINT "_pages_v_blocks_contact_section_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_section_order_idx" ON "pages_blocks_contact_section" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_section_parent_id_idx" ON "pages_blocks_contact_section" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_section_path_idx" ON "pages_blocks_contact_section" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_section_form_idx" ON "pages_blocks_contact_section" USING btree ("form_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_section_contact_info_order_idx" ON "pages_blocks_contact_section_contact_info" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_section_contact_info_parent_id_idx" ON "pages_blocks_contact_section_contact_info" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_section_buttons_order_idx" ON "pages_blocks_contact_section_buttons" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_contact_section_buttons_parent_id_idx" ON "pages_blocks_contact_section_buttons" USING btree ("_parent_id");

    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_section_order_idx" ON "_pages_v_blocks_contact_section" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_section_parent_id_idx" ON "_pages_v_blocks_contact_section" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_section_path_idx" ON "_pages_v_blocks_contact_section" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_section_form_idx" ON "_pages_v_blocks_contact_section" USING btree ("form_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_section_contact_info_order_idx" ON "_pages_v_blocks_contact_section_contact_info" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_section_contact_info_parent_id_idx" ON "_pages_v_blocks_contact_section_contact_info" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_section_buttons_order_idx" ON "_pages_v_blocks_contact_section_buttons" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_section_buttons_parent_id_idx" ON "_pages_v_blocks_contact_section_buttons" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_section_buttons" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_section_contact_info" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_contact_section" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_section_buttons" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_section_contact_info" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_contact_section" CASCADE;

    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_contact_section_buttons_link_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_contact_section_buttons_link_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_contact_section_buttons_link_appearance";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_contact_section_buttons_link_type";
  `)
}
