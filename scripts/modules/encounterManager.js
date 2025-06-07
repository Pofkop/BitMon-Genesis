// modules/encounterManager.js

import { BitMon } from './bitmon.js';

export class EncounterManager {
  constructor(regionManager) {
    this.regionManager = regionManager;
  }

  checkForEncounter(position) {
    const currentMap = this.regionManager.getCurrentMap();
    const tile = currentMap.getTile(position.x, position.y);
    const encounterRate = tile && tile.encounterRate;

    if (encounterRate && Math.random() < encounterRate) {
      const encounter = this.getRandomBitMon(tile.region);
      return new BitMon(encounter.name, encounter.type, this.getRandomLevel());
    }
    return null;
  }

  getRandomBitMon(region) {
    const regionBitMons = {
      'starter-town': [
        { name: 'Ledgerbug', type: 'Electric' },
        { name: 'Graeme', type: 'Bug' },
        { name: 'Condz', type: 'Tech' }
      ],
      'genesis-grove': [
        { name: 'EtherMage', type: 'Magic' },
        { name: 'EverythingEmpty', type: 'Dragon' },
        { name: 'Virtuals Intern', type: 'Water' }
      ]
    };

    const encounters = regionBitMons[region] || [];
    return encounters[Math.floor(Math.random() * encounters.length)];
  }

  getRandomLevel() {
    return Math.floor(Math.random() * 3) + 3; // Level 3 to 5
  }
}