import * as migration_20260807_001309_add_new from './20260807_001309_add_new';

export const migrations = [
  {
    up: migration_20260807_001309_add_new.up,
    down: migration_20260807_001309_add_new.down,
    name: '20260807_001309_add_new'
  },
];
