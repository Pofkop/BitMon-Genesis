export function startBattle(player, enemy) {
  console.log("Battle start!");
  return { turn: 0, player, enemy };
}

export function battleTurn(state) {
  const active = state.player.party[0];
  const target = state.enemy;
  const damage = active.attack(target);
  return `${active.name} hits ${target.name} for ${damage} damage!`;
}