
export const STARTER_ROOM_MAP = {
  name: 'starter-room',
  background: '#1d1f21',
  tiles: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 'P', 'T', 'T', 'T', 'N', 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 'S', 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  npcs: [
    { x: 7, y: 3, text: 'Choose your BitMon wisely!' }
  ],
  interactables: [
    {
      x: 3, y: 3,
      sprite: 'assets/sprites/bitmon/Pofkop.png',
      bitmon: 'Pofkop'
    },
    {
      x: 4, y: 3,
      sprite: 'assets/sprites/bitmon/Vader.png',
      bitmon: 'Vader'
    },
    {
      x: 5, y: 3,
      sprite: 'assets/sprites/bitmon/DegenApe.png',
      bitmon: 'DegenApe'
    }
  ],
  playerSpawn: { x: 4, y: 5 }
};
