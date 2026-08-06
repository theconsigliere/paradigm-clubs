import * as migration_20260804_213421_add_contact_section from './20260804_213421_add_contact_section';
import * as migration_20260804_hero_type_cleanup from './20260804_hero_type_cleanup';
import * as migration_20260806_000001_add_faq_block_content from './20260806_000001_add_faq_block_content';
import * as migration_20260806_195304 from './20260806_195304';

export const migrations = [
  {
    up: migration_20260804_213421_add_contact_section.up,
    down: migration_20260804_213421_add_contact_section.down,
    name: '20260804_213421_add_contact_section',
  },
  {
    up: migration_20260804_hero_type_cleanup.up,
    down: migration_20260804_hero_type_cleanup.down,
    name: '20260804_hero_type_cleanup',
  },
  {
    up: migration_20260806_000001_add_faq_block_content.up,
    down: migration_20260806_000001_add_faq_block_content.down,
    name: '20260806_000001_add_faq_block_content',
  },
  {
    up: migration_20260806_195304.up,
    down: migration_20260806_195304.down,
    name: '20260806_195304'
  },
];
