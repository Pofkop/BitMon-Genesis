window.onload = () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  let gameState = "menu";

  const player = {
    x: 7,
    y: 5,
    sprite: "🧍"
  };

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameState === "explore") {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = "16px monospace";
      ctx.fillText("Exploring: Starter Town", 10, 20);
      ctx.fillText("Use arrow keys to move", 10, 40);
      ctx.fillText(player.sprite, player.x * 30, player.y * 30);
    }
  }

  function update() {
    draw();
    requestAnimationFrame(update);
  }

  document.addEventListener("keydown", (e) => {
    if (gameState === "explore") {
      if (e.key === "ArrowUp") player.y = Math.max(0, player.y - 1);
      if (e.key === "ArrowDown") player.y = Math.min(13, player.y + 1);
      if (e.key === "ArrowLeft") player.x = Math.max(0, player.x - 1);
      if (e.key === "ArrowRight") player.x = Math.min(15, player.x + 1);
    }
  });

  document.getElementById("startBtn").onclick = () => {
    document.getElementById("menuOverlay").style.display = "none";
    gameState = "explore";
  };

  document.getElementById("donateBtn").onclick = () => {
    navigator.clipboard.writeText("0xD0a271eAC0192531bb073F962C0Fb76d3054e082");
    alert("Wallet address copied!");
  };

  update();
};