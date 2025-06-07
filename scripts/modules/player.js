export const Player = class {
  constructor() {
    this.party = [];
    this.inventory = { credits: 0 };
    this.position = { x: 7, y: 5 };
  }

  addBitMon(mon) {
    if (this.party.length < 5) this.party.push(mon);
    else console.log("BitMon sent to blockchain storage!");
  }

  hasBitMons() {
    return this.party.length > 0;
  }
};