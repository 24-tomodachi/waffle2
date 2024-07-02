import GameState from "./states/GameState.js";
import GameObject from "./objects/GameObject.js";

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

let gameState;

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameState.objects.forEach((object) => {
    if (!object.img) {
      ctx.fillStyle = object.color;
      ctx.fillRect(object.x, object.y, object.width, object.height);
    } else {
      ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    }
  });
  window.requestAnimationFrame(draw);
}

const init = async () => {
  const obstaclesJson = await loadObstacles();
  const obstacles = obstaclesJson.map((obstacle) => {
    return new GameObject(obstacle.x, obstacle.y, obstacle.width, obstacle.height, obstacle.imgPath);
  });

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
