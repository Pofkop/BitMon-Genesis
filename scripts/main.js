import { Player } from './modules/player.js';
import { BitMon } from './modules/bitmon.js';
import { saveGame, loadGame } from './modules/saveSystem.js';
import { QuestManager } from './modules/questSystem.js';
import { renderStarterSelection } from './ui/starterUI.js';
import { renderBattleScreen } from './ui/battleUI.js';
import { startBattle, battleTurn } from './modules/battleSystem.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameState = 'menu';
let player = new Player();
let questManager = new QuestManager();
let battleState = null;

let starterOptions = [
  new BitMon('Pofkop', 'Normal', 5),
  new BitMon('Vader', 'Dark', 5),
  new BitMon('DegenApe', 'Fighting', 5)
];
let selectedStarter = 0;

document.getElementById('startBtn').onclick = () => {
  gameState = 'starter-select';
  drawStarterSelection();
};

document.getElementById('loadBtn').onclick = () => {
  const loaded = loadGame();
  if (loaded) {
    Object.assign(player, loaded);
    gameState = 'exploring';
    startGame();
  }
};

document.getElementById('donateBtn').onclick = () => {
  const address = '0xD0a271eAC0192531bb073F962C0Fb76d3054e082';
  navigator.clipboard.writeText(address);
  alert('Wallet address copied to clipboard!');
};

function drawStarterSelection() {
  renderStarterSelection(ctx, starterOptions, selectedStarter);
}

function startGame() {
  draw();
  setupKeys();
  autosaveLoop();
}

function setupKeys() {
  document.addEventListener('keydown', (e) => {
    if (gameState === 'starter-select') {
      if (e.key === 'ArrowLeft') selectedStarter = (selectedStarter + 2) % 3;
      if (e.key === 'ArrowRight') selectedStarter = (selectedStarter + 1) % 3;
      if (e.key === 'Enter') {
        player.addBitMon(starterOptions[selectedStarter]);
        gameState = 'exploring';
        startGame();
      }
      drawStarterSelection();
    } else if (gameState === 'exploring') {
      switch (e.key) {
        case 'ArrowUp': player.position.y--; break;
        case 'ArrowDown': player.position.y++; break;
        case 'ArrowLeft': player.position.x--; break;
        case 'ArrowRight': player.position.x++; break;
        case 'b': beginDemoBattle(); break;
      }
      draw();
    } else if (gameState === 'battle') {
      if (e.key.toLowerCase() === 'a') {
        const log = battleTurn(battleState);
        console.log(log);
        drawBattle();
      }
    }
  });
}

function draw() {
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0f0';
  ctx.font = '16px monospace';
  ctx.fillText('Exploring: Starter Town', 20, 30);
  ctx.fillText('Use arrow keys to move.', 20, 60);
  ctx.fillText('Press B to trigger battle.', 20, 90);
}

function autosaveLoop() {
  setInterval(() => {
    saveGame(player);
  }, 300000);
}

function beginDemoBattle() {
  const enemy = new BitMon('Rugger', 'Dark', 4);
  battleState = startBattle(player, enemy);
  gameState = 'battle';
  drawBattle();
}

function drawBattle() {
  const userMon = player.party[0];
  const enemyMon = battleState.enemy;
  renderBattleScreen(ctx, userMon, enemyMon);
}