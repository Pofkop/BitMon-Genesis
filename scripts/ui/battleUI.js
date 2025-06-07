
export function renderBattleScreen(ctx, playerMon, enemyMon) {
  ctx.clearRect(0, 0, 480, 432);

  // Background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, 480, 432);

  // Enemy
  ctx.fillStyle = '#ff5555';
  ctx.fillRect(300, 80, 100, 100);
  ctx.fillStyle = '#fff';
  ctx.font = '16px monospace';
  ctx.fillText(enemyMon.name + ' HP: ' + enemyMon.hp, 280, 60);

  // Player
  ctx.fillStyle = '#55ff55';
  ctx.fillRect(80, 250, 100, 100);
  ctx.fillStyle = '#fff';
  ctx.fillText(playerMon.name + ' HP: ' + playerMon.hp, 60, 240);

  // Options
  ctx.fillText('Press A to Attack', 150, 380);
}
