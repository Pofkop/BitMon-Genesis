export class BitMon {
  constructor(name, type, level = 1) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.maxHP = 20 + level * 5;
    this.currentHP = this.maxHP;
    this.moves = this.assignMoves();
  }

  assignMoves() {
    const basicMoves = {
      'Tackle': { power: 5 },
      'Byte': { power: 6 },
      'Ping': { power: 4 },
      'Firewall': { power: 3 }
    };

    const assigned = [];

    const available = Object.keys(basicMoves);
    for (let i = 0; i < Math.min(2 + Math.floor(this.level / 5), available.length); i++) {
      assigned.push({
        name: available[i],
        ...basicMoves[available[i]]
      });
    }

    return assigned;
  }

  isFainted() {
    return this.currentHP <= 0;
  }

  takeDamage(amount) {
    this.currentHP = Math.max(0, this.currentHP - amount);
  }
}