import * as migration_20260804_213421_add_contact_section from './20260804_213421_add_contact_section';
import * as migration_20260804_hero_type_cleanup from './20260804_hero_type_cleanup';

export const migrations = [
  {
    up: migration_20260804_213421_add_contact_section.up,
    down: migration_20260804_213421_add_contact_section.down,
    name: '20260804_213421_add_contact_section'
  },
  {
    up: migration_20260804_hero_type_cleanup.up,
    down: migration_20260804_hero_type_cleanup.down,
    name: '20260804_hero_type_cleanup'
  },
];
