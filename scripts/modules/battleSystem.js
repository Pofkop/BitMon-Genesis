
// battleSystem.js

export function startBattle(player, enemy) {
  return {
    player,
    enemy,
    turn: 'player'
  };
}

export function battleTurn(battleState) {
  const log = [];
  const userMon = battleState.player.party[0];
  const enemyMon = battleState.enemy;

  if (battleState.turn === 'player') {
    const damage = Math.floor(userMon.attack / 2);
    enemyMon.hp -= damage;
    log.push(`${userMon.name} attacks for ${damage} damage!`);
    battleState.turn = 'enemy';
  } else {
    const damage = Math.floor(enemyMon.attack / 2);
    userMon.hp -= damage;
    log.push(`${enemyMon.name} attacks for ${damage} damage!`);
    battleState.turn = 'player';
  }

  if (enemyMon.hp <= 0) {
    log.push(`${enemyMon.name} fainted!`);
    battleState.ended = true;
  }
  if (userMon.hp <= 0) {
    log.push(`${userMon.name} fainted!`);
    battleState.ended = true;
  }

  return log;
}
