export const BitMon = class {
  constructor(name, type, level = 1) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.hp = 10 + level * 2;
    this.moves = [];
  }

  addMove(move) {
    this.moves.push(move);
  }

  attack(target) {
    const dmg = Math.floor(Math.random() * 5 + 3);
    target.hp -= dmg;
    return dmg;
  }
};