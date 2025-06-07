export class MapRenderer {
  constructor(ctx, tileSize, mapData, npcList) {
    this.ctx = ctx;
    this.tileSize = tileSize;
    this.mapData = mapData;
    this.npcList = npcList;
  }

  render() {
    for (let y = 0; y < this.mapData.length; y++) {
      for (let x = 0; x < this.mapData[y].length; x++) {
        const tile = this.mapData[y][x];
        this.ctx.fillStyle = tile === 1 ? '#228B22' : '#444';
        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
      }
    }

    this.npcList.forEach(npc => {
      this.ctx.fillStyle = '#00f';
      this.ctx.fillRect(npc.x * this.tileSize, npc.y * this.tileSize, this.tileSize, this.tileSize);
    });
  }
}