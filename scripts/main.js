
function drawMainMenu() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(titleImage, 0, 0, canvas.width, canvas.height);

  const options = ['Start', 'Load', 'Donate'];
  ctx.font = '32px monospace';

  options.forEach((opt, i) => {
    const x = canvas.width / 2 - 100;
    const y = 1100 + i * 60;

    if (i === selectedMenu) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(x - 20, y - 32, 240, 48); // Highlight box behind text
    }

    ctx.fillStyle = i === selectedMenu ? '#FFD700' : '#ffffff';
    ctx.fillText(opt, x, y);
  });
}
