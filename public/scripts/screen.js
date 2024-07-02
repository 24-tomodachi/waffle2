import GameState from "./states/GameState.js";

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let obstacles;
let gameState;

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  obstacles.forEach((obstacle) => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
  window.requestAnimationFrame(draw);
}

const init = async () => {
  obstacles = await loadObstacles();
  gameState = new GameState();
  gameState.registerObjects(obstacles);
  draw();
}

const loadObstacles = async () => {
  const response = await fetch('/api/map');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

init();
