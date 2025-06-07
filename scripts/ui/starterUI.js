export function renderStarterSelection(ctx, starters, selectedIndex) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 480, 432);
  ctx.fillStyle = '#fff';
  ctx.font = '18px monospace';
  ctx.fillText('Choose your BitMon:', 120, 60);

  starters.forEach((mon, i) => {
    const x = 80 + i * 120;
    const y = 120;
    ctx.fillStyle = selectedIndex === i ? '#ff0' : '#888';
    ctx.fillRect(x, y, 80, 80);
    ctx.fillStyle = '#fff';
    ctx.fillText(mon.name, x + 8, y + 100);
  });

  ctx.fillText('Press Enter to select', 120, 350);
}