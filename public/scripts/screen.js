import GameState from "./states/GameState.js";
import GameObject from "./objects/GameObject.js";
import Player from "./objects/Player.js";
import { handleKeyDown } from "./handlers/handleKeyDown.js";
import { handleKeyUp } from "./handlers/handleKeyUp.js";

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

export let gameState;
export let interactionState;

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

const registerEvents = () => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}

const init = async () => {
  registerEvents();

  const obstaclesJson = await loadObstacles();
  const obstacles = obstaclesJson.map((obstacle) => {
    return new GameObject(obstacle.x, obstacle.y, obstacle.width, obstacle.height, obstacle.imgPath);
  });

  gameState = new GameState();
  gameState.registerObject(new Player(0, 0, 10, 10));
  gameState.registerObjects(obstacles);

  interactionState = new InteractionState();
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
