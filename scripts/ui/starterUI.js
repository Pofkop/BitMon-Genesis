// File: ui/starterUI.js

import { BitMonSprites } from '../assets/bitmonSprites.js';

export function renderStarterSelection(ctx, options, selectedIndex) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = '#0f0';
  ctx.font = '16px monospace';
  ctx.fillText('Choose your BitMon (Press Enter to select)', 40, 40);

  const spacing = 140;
  const startX = 60;
  const y = 120;

  options.forEach((bitmon, index) => {
    const x = startX + index * spacing;

    // Draw sprite
    const sprite = BitMonSprites[bitmon.name];
    if (sprite) {
      ctx.drawImage(sprite, x, y);
    } else {
      // fallback if no sprite loaded
      ctx.fillStyle = '#444';
      ctx.fillRect(x, y, 48, 48);
    }

    // Draw name below
    ctx.fillStyle = index === selectedIndex ? '#FFD700' : '#FFF';
    ctx.fillText(bitmon.name, x, y + 64);
  });
}
