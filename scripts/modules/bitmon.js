
export class BitMon {
  constructor(name, type, level) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.hp = this.maxHp();
    this.moves = this.startingMoves();
  }

  maxHp() {
    return 20 + this.level * 5;
  }

  startingMoves() {
    const moveset = {
      Pofkop: ['Chatter', 'Fluff Up'],
      Vader: ['Dark Pulse', 'Shadow Step'],
      DegenApe: ['Smash', 'Rage'],
      Virgen: ['Croak', 'Hop Blast'],
      Ledgerbug: ['Firewall', 'Encrypt'],
      Condz: ['Overclock', 'Cyber Punch'],
      Graeme: ['Squirm Shot', 'Blue Hat'],
      Francis: ['Code Jab', 'Deploy'],
      Evansweb3dev: ['Anon Hack', 'Code Flood'],
      Bigwil2k3: ['Bench Press', 'Crypto Flex'],
      NickPlaysCrypto: ['VR Beam', 'Immersion'],
      HundredxDarren: ['Cap Swipe', 'Alpha Dash'],
      EtherMage: ['Arcane Byte', 'Dust Chain'],
      Miratisu: ['Sweet Shot', 'Thread Flurry'],
      Everythingempty: ['Dragon Code', 'Pixel Burst'],
      VirtualsIntern: ['Hoodie Hop', 'Intern Swipe'],
      Rugger: ['Drain', 'Rug Pull'],
      Nullmon: ['Glitch', 'Crash'],
    };
    return moveset[this.name] || ['Tackle'];
  }
}
