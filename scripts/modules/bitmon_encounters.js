export const ENCOUNTER_ZONES = {
  'starter-town': {
    grassTiles: [{ x: 2, y: 1 }, { x: 3, y: 1 }],
    bitMons: [
      { name: 'Ledgerbug', levelRange: [2, 4], rarity: 'common' },
      { name: 'Virgen', levelRange: [3, 5], rarity: 'uncommon' }
    ]
  },
  'genesis-grove': {
    grassTiles: [{ x: 1, y: 2 }, { x: 4, y: 2 }],
    bitMons: [
      { name: 'Graeme', levelRange: [4, 6], rarity: 'common' },
      { name: 'Condz', levelRange: [5, 7], rarity: 'rare' },
      { name: 'EverythingEmpty', levelRange: [6, 8], rarity: 'rare' }
    ]
  }
};