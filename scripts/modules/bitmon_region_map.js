// modules/bitmon_region_map.js

export const REGION_MAPS = {
  'starter-town': {
    name: 'Starter Town',
    width: 10,
    height: 10,
    getTile(x, y) {
      const grassTiles = [ {x:3,y:3}, {x:4,y:4}, {x:5,y:5} ];
      const isGrass = grassTiles.some(tile => tile.x === x && tile.y === y);
      return isGrass ? { encounterRate: 0.2, region: 'starter-town' } : {};
    }
  },
  'genesis-grove': {
    name: 'Genesis Grove',
    width: 10,
    height: 10,
    getTile(x, y) {
      const grassTiles = [ {x:2,y:2}, {x:6,y:6}, {x:7,y:7} ];
      const isGrass = grassTiles.some(tile => tile.x === x && tile.y === y);
      return isGrass ? { encounterRate: 0.25, region: 'genesis-grove' } : {};
    }
  }
};