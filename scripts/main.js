import { RegionManager } from './modules/region_manager.js';
import { EncounterManager } from './modules/region_encounter_hook.js';
import { drawMap } from './modules/map_renderer.js';
import { startBattle } from './modules/battle_manager.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player object with initial position
const player = {
  x: 2,
  y: 2
};

const regionManager = new RegionManager();
const encounterManager = new EncounterManager(regionManager);

// Draw initial region map
function drawGame() {
  drawMap(ctx, regionManager.currentRegion, player);
}

// Movement function
function movePlayer(dx, dy) {
  player.x += dx;
  player.y += dy;
  drawGame();

  const wildBitMon = encounterManager.checkForWildEncounter(player.x, player.y);
  if (wildBitMon) {
    startBattle(wildBitMon);
  }
}

// Key controls
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') movePlayer(0, -1);
  if (e.key === 'ArrowDown') movePlayer(0, 1);
  if (e.key === 'ArrowLeft') movePlayer(-1, 0);
  if (e.key === 'ArrowRight') movePlayer(1, 0);
});

// Initial draw
drawGame();