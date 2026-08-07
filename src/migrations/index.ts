import * as migration_20260807_001309_add_new from './20260807_001309_add_new';
import * as migration_20260807_142801 from './20260807_142801';

export const migrations = [
  {
    up: migration_20260807_001309_add_new.up,
    down: migration_20260807_001309_add_new.down,
    name: '20260807_001309_add_new',
  },
  {
    up: migration_20260807_142801.up,
    down: migration_20260807_142801.down,
    name: '20260807_142801'
  },
];
