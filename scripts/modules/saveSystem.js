export function saveGame(player) {
  localStorage.setItem("bitmon_save", JSON.stringify(player));
}

export function loadGame() {
  const data = localStorage.getItem("bitmon_save");
  return data ? JSON.parse(data) : null;
}