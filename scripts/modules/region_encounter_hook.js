import { ENCOUNTER_ZONES } from './bitmon_encounters.js';
import { getRandomInt } from './utils.js';
import { BitMon } from './bitmon.js';

export class EncounterManager {
  constructor(regionManager) {
    this.regionManager = regionManager;
  }

  checkForWildEncounter(playerX, playerY) {
    const regionName = this.regionManager.currentRegion;
    const zone = ENCOUNTER_ZONES[regionName];

    if (!zone) return null;

    const onGrass = zone.grassTiles.some(tile => tile.x === playerX && tile.y === playerY);
    if (!onGrass) return null;

    const chance = Math.random();
    if (chance < 0.2) {
      const chosen = this.pickWildBitMon(zone.bitMons);
      return new BitMon(chosen.name, 'Neutral', this.randomLevel(chosen.levelRange));
    }

    return null;
  }

  pickWildBitMon(list) {
    const sorted = [...list].sort((a, b) => {
      const rarityValue = { common: 0.7, uncommon: 0.25, rare: 0.05 };
      return rarityValue[b.rarity] - rarityValue[a.rarity];
    });
    const roll = Math.random();
    let sum = 0;
    for (const mon of sorted) {
      const weight = mon.rarity === 'common' ? 0.7 : mon.rarity === 'uncommon' ? 0.25 : 0.05;
      sum += weight;
      if (roll <= sum) return mon;
    }
    return sorted[0];
  }

  randomLevel([min, max]) {
    return getRandomInt(min, max + 1);
  }
}