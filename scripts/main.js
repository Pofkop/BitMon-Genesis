
// main.js adjusted for 1024x1536 canvas support and title screen positioning

import { Player } from './modules/player.js';
import { BitMon } from './modules/bitmon.js';
import { saveGame, loadGame } from './modules/saveSystem.js';
import { QuestManager } from './modules/questSystem.js';
import { renderStarterSelection } from './ui/starterUI.js';
import { renderBattleScreen } from './ui/battleUI.js';
import { MapRenderer } from './ui/MapRenderer.js';
import { DialogueManager } from './ui/Dialogue.js';
import { RegionManager } from './modules/RegionManager.js';
import { REGION_MAPS } from './modules/bitmon_region_map.js';
import { startBattle, battleTurn } from './modules/battleSystem.js';
import { EncounterManager } from './modules/EncounterManager.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 1536;

let gameState = 'menu';
let player = new Player();
let questManager = new QuestManager();
let battleState = null;
let selectedMenu = 0;
let titleImage = new Image();
titleImage.src = 'assets/ui/title_screen.png';

let starterOptions = [
  new BitMon('Pofkop', 'Normal', 5),
  new BitMon('Vader', 'Dark', 5),
  new BitMon('DegenApe', 'Fighting', 5)
];
let selectedStarter = 0;

const regionManager = new RegionManager(ctx, REGION_MAPS, 'starter-room');
let mapRenderer = new MapRenderer(ctx, 60, regionManager.getCurrentMap(), regionManager.getNPCs());
let dialogue = new DialogueManager(ctx);
const encounterManager = new EncounterManager(regionManager);

titleImage.onload = () => drawMainMenu();

function drawMainMenu() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(titleImage, 0, 0, canvas.width, canvas.height);

  const options = ['Start', 'Load', 'Donate'];
  ctx.font = '32px monospace';
  ctx.fillStyle = '#0f0';
  options.forEach((opt, i) => {
    ctx.fillStyle = i === selectedMenu ? '#FFD700' : '#fff';
    ctx.fillText(opt, canvas.width / 2 - 40, 1100 + i * 50);
  });
}

function drawStarterSelection() {
  renderStarterSelection(ctx, starterOptions, selectedStarter);
}

function startGame() {
  draw();
  autosaveLoop();
}

function setupKeys() {
  document.addEventListener('keydown', (e) => {
    if (gameState === 'menu') {
      if (e.key === 'ArrowDown') selectedMenu = (selectedMenu + 1) % 3;
      if (e.key === 'ArrowUp') selectedMenu = (selectedMenu + 2) % 3;
      if (e.key === 'Enter') {
        if (selectedMenu === 0) {
          gameState = 'starter-select';
          drawStarterSelection();
        } else if (selectedMenu === 1) {
          const loaded = loadGame();
          if (loaded) {
            Object.assign(player, loaded);
            gameState = 'exploring';
            startGame();
            setupKeys();
          }
        } else if (selectedMenu === 2) {
          const address = '0xD0a271eAC0192531bb073F962C0Fb76d3054e082';
          navigator.clipboard.writeText(address);
          alert('Wallet address copied to clipboard!');
        }
      }
      drawMainMenu();
    } else if (gameState === 'starter-select') {
      if (e.key === 'ArrowLeft') selectedStarter = (selectedStarter + 2) % 3;
      if (e.key === 'ArrowRight') selectedStarter = (selectedStarter + 1) % 3;
      if (e.key === 'Enter') {
        player.addBitMon(starterOptions[selectedStarter]);
        gameState = 'exploring';
        startGame();
      }
      drawStarterSelection();
    } else if (gameState === 'exploring') {
      let moved = false;
      switch (e.key) {
        case 'ArrowUp': player.position.y--; moved = true; break;
        case 'ArrowDown': player.position.y++; moved = true; break;
        case 'ArrowLeft': player.position.x--; moved = true; break;
        case 'ArrowRight': player.position.x++; moved = true; break;
        case 'r': regionManager.transitionTo('genesis-grove'); break;
        case 'x': checkNPCInteraction(); break;
        case 'b': beginDemoBattle(); break;
      }

      if (moved) {
        const encounter = encounterManager.checkForWildEncounter(player.position);
        if (encounter) {
          battleState = startBattle(player, encounter);
          gameState = 'battle';
          drawBattle();
          return;
        }
      }

      mapRenderer.map = regionManager.getCurrentMap();
      mapRenderer.npcs = regionManager.getNPCs();
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
  mapRenderer.render();
  dialogue.render();
  regionManager.drawRegionLabel();
  ctx.fillStyle = '#0f0';
  ctx.font = '24px monospace';
  ctx.fillText('Use arrow keys to move. Press X near NPCs.', 40, 60);
  ctx.fillText('Press R to go to Genesis Grove.', 40, 100);
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

function checkNPCInteraction() {
  const npc = regionManager.getNPCs().find(n => n.x === player.position.x && n.y === player.position.y);
  if (npc) {
    dialogue.show(npc.text);
    setTimeout(() => {
      dialogue.hide();
      draw();
    }, 3000);
  }
}

setupKeys();
