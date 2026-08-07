import * as migration_20260807_142801 from './20260807_142801'

export const migrations = [
  {
    up: migration_20260807_142801.up,
    down: migration_20260807_142801.down,
    name: '20260807_142801',
  },
]
