import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_signup_block_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_signup_block_button_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_legal_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_legal_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_legal_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__legal_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "pages_blocks_full_width_image_block" ADD COLUMN "input_form_id" integer;
  ALTER TABLE "pages_blocks_signup_block" ADD COLUMN "button_type" "enum_pages_blocks_signup_block_button_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_signup_block" ADD COLUMN "button_new_tab" boolean;
  ALTER TABLE "pages_blocks_signup_block" ADD COLUMN "button_url" varchar;
  ALTER TABLE "pages_blocks_signup_block" ADD COLUMN "button_label" varchar;
  ALTER TABLE "pages_blocks_faq_block" ADD COLUMN "content" jsonb;
  ALTER TABLE "_pages_v_blocks_full_width_image_block" ADD COLUMN "input_form_id" integer;
  ALTER TABLE "_pages_v_blocks_signup_block" ADD COLUMN "button_type" "enum__pages_v_blocks_signup_block_button_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_signup_block" ADD COLUMN "button_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_signup_block" ADD COLUMN "button_url" varchar;
  ALTER TABLE "_pages_v_blocks_signup_block" ADD COLUMN "button_label" varchar;
  ALTER TABLE "_pages_v_blocks_faq_block" ADD COLUMN "content" jsonb;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "legal_pages_id" integer;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_parent_id_legal_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE INDEX "legal_pages__status_idx" ON "legal_pages" USING btree ("_status");
  CREATE INDEX "_legal_pages_v_parent_idx" ON "_legal_pages_v" USING btree ("parent_id");
  CREATE INDEX "_legal_pages_v_version_version_slug_idx" ON "_legal_pages_v" USING btree ("version_slug");
  CREATE INDEX "_legal_pages_v_version_version_updated_at_idx" ON "_legal_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_legal_pages_v_version_version_created_at_idx" ON "_legal_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_legal_pages_v_version_version__status_idx" ON "_legal_pages_v" USING btree ("version__status");
  CREATE INDEX "_legal_pages_v_created_at_idx" ON "_legal_pages_v" USING btree ("created_at");
  CREATE INDEX "_legal_pages_v_updated_at_idx" ON "_legal_pages_v" USING btree ("updated_at");
  CREATE INDEX "_legal_pages_v_latest_idx" ON "_legal_pages_v" USING btree ("latest");
  CREATE INDEX "_legal_pages_v_autosave_idx" ON "_legal_pages_v" USING btree ("autosave");
  ALTER TABLE "pages_blocks_full_width_image_block" ADD CONSTRAINT "pages_blocks_full_width_image_block_input_form_id_forms_id_fk" FOREIGN KEY ("input_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_full_width_image_block" ADD CONSTRAINT "_pages_v_blocks_full_width_image_block_input_form_id_forms_id_fk" FOREIGN KEY ("input_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_full_width_image_block_input_form_idx" ON "pages_blocks_full_width_image_block" USING btree ("input_form_id");
  CREATE INDEX "_pages_v_blocks_full_width_image_block_input_form_idx" ON "_pages_v_blocks_full_width_image_block" USING btree ("input_form_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  ALTER TABLE "pages_blocks_contact_section_buttons" DROP COLUMN "link_appearance";
  ALTER TABLE "_pages_v_blocks_contact_section_buttons" DROP COLUMN "link_appearance";
  DROP TYPE "public"."enum_pages_blocks_contact_section_buttons_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_contact_section_buttons_link_appearance";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_contact_section_buttons_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_section_buttons_link_appearance" AS ENUM('default', 'outline');
  ALTER TABLE "legal_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_legal_pages_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "_legal_pages_v" CASCADE;
  ALTER TABLE "pages_blocks_full_width_image_block" DROP CONSTRAINT "pages_blocks_full_width_image_block_input_form_id_forms_id_fk";
  
  ALTER TABLE "_pages_v_blocks_full_width_image_block" DROP CONSTRAINT "_pages_v_blocks_full_width_image_block_input_form_id_forms_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_legal_pages_fk";
  
  DROP INDEX "pages_blocks_full_width_image_block_input_form_idx";
  DROP INDEX "_pages_v_blocks_full_width_image_block_input_form_idx";
  DROP INDEX "payload_locked_documents_rels_legal_pages_id_idx";
  ALTER TABLE "pages_blocks_contact_section_buttons" ADD COLUMN "link_appearance" "enum_pages_blocks_contact_section_buttons_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_contact_section_buttons" ADD COLUMN "link_appearance" "enum__pages_v_blocks_contact_section_buttons_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_full_width_image_block" DROP COLUMN "input_form_id";
  ALTER TABLE "pages_blocks_signup_block" DROP COLUMN "button_type";
  ALTER TABLE "pages_blocks_signup_block" DROP COLUMN "button_new_tab";
  ALTER TABLE "pages_blocks_signup_block" DROP COLUMN "button_url";
  ALTER TABLE "pages_blocks_signup_block" DROP COLUMN "button_label";
  ALTER TABLE "pages_blocks_faq_block" DROP COLUMN "content";
  ALTER TABLE "_pages_v_blocks_full_width_image_block" DROP COLUMN "input_form_id";
  ALTER TABLE "_pages_v_blocks_signup_block" DROP COLUMN "button_type";
  ALTER TABLE "_pages_v_blocks_signup_block" DROP COLUMN "button_new_tab";
  ALTER TABLE "_pages_v_blocks_signup_block" DROP COLUMN "button_url";
  ALTER TABLE "_pages_v_blocks_signup_block" DROP COLUMN "button_label";
  ALTER TABLE "_pages_v_blocks_faq_block" DROP COLUMN "content";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "legal_pages_id";
  DROP TYPE "public"."enum_pages_blocks_signup_block_button_type";
  DROP TYPE "public"."enum__pages_v_blocks_signup_block_button_type";
  DROP TYPE "public"."enum_legal_pages_status";
  DROP TYPE "public"."enum__legal_pages_v_version_status";`)
}
