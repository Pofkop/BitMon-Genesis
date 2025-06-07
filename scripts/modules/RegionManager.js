export class RegionManager {
  constructor(ctx, regions) {
    this.ctx = ctx;
    this.regions = regions;
    this.current = 'starter-town';
    this.mapData = this.regions[this.current].map;
    this.npcs = this.regions[this.current].npcs;
  }

  transitionTo(regionName) {
    if (this.regions[regionName]) {
      this.current = regionName;
      this.mapData = this.regions[regionName].map;
      this.npcs = this.regions[regionName].npcs;
    }
  }

  getCurrentMap() {
    return this.mapData;
  }

  getNPCs() {
    return this.npcs;
  }

  drawRegionLabel() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, 200, 20);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '12px monospace';
    this.ctx.fillText('Exploring: ' + this.current, 10, 15);
  }
}