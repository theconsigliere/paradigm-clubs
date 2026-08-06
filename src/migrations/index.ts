import * as migration_20260806_202225_baseline from './20260806_202225_baseline';

export const migrations = [
  {
    up: migration_20260806_202225_baseline.up,
    down: migration_20260806_202225_baseline.down,
    name: '20260806_202225_baseline'
  },
];
