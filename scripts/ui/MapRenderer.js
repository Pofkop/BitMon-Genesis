export class MapRenderer {
  constructor(ctx, tileSize, mapData, npcList = []) {
    this.ctx = ctx;
    this.tileSize = tileSize;
    this.mapData = mapData;
    this.npcList = npcList;
  }

  render() {
    for (let y = 0; y < this.mapData.length; y++) {
      for (let x = 0; x < this.mapData[y].length; x++) {
        const tile = this.mapData[y][x];
        this.ctx.fillStyle = this.getTileColor(tile);
        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
      }
    }

    this.npcList.forEach(npc => {
      this.ctx.fillStyle = '#00f'; // Blue for NPCs
      this.ctx.fillRect(npc.x * this.tileSize, npc.y * this.tileSize, this.tileSize, this.tileSize);
    });
  }

  getTileColor(tile) {
    switch (tile) {
      case 'G':
      case 1: return '#228B22'; // Grass
      case 'W': return '#2196f3'; // Water
      case 'B': return '#9e9e9e'; // Building
      case 'F': return '#8d6e63'; // Blockchain Fountain
      default: return '#444';     // Default
    }
  }
}