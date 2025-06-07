// modules/RegionManager.js

export class RegionManager {
  constructor(ctx, regionMaps, startingRegion = 'starter-town') {
    this.ctx = ctx;
    this.regionMaps = regionMaps;
    this.currentRegion = startingRegion;
    this.labelTimer = 60;
    this.npcData = {
      'starter-room': [
        { x: 4, y: 2, type: 'npc', text: 'Choose your BitMon wisely!' },
        { x: 3, y: 4, type: 'bitmon', name: 'Pofkop' },
        { x: 4, y: 4, type: 'bitmon', name: 'Vader' },
        { x: 5, y: 4, type: 'bitmon', name: 'DegenApe' }
      ],
      'starter-town': [
        { x: 2, y: 3, type: 'npc', text: 'Welcome to Starter Town!' }
      ],
      'genesis-grove': [
        { x: 5, y: 5, type: 'npc', text: 'Beware of wild BitMons!' }
      ]
    };
  }

  getCurrentMap() {
    return this.regionMaps[this.currentRegion];
  }

  getNPCs() {
    return this.npcData[this.currentRegion] || [];
  }

  transitionTo(regionName) {
    if (this.regionMaps[regionName]) {
      this.currentRegion = regionName;
      this.labelTimer = 60;
    }
  }

  drawRegionLabel() {
    if (this.labelTimer > 0) {
      this.ctx.fillStyle = '#222';
      this.ctx.fillRect(0, 0, 480, 20);
      this.ctx.fillStyle = '#0f0';
      this.ctx.font = '14px monospace';
      this.ctx.fillText('Exploring: ' + this.getCurrentMap().name, 10, 15);
      this.labelTimer--;
    }
  }
}