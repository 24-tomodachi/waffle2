import GameState from "./states/GameState.js";
import CollidableObject from "./objects/CollidableObject.js";
import Player from "./objects/Player.js";
import { handleKeyDown } from "./handlers/handleKeyDown.js";
import { handleKeyUp } from "./handlers/handleKeyUp.js";
import imageMap from "./imageMap.js";

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

export let gameState;

export const SCREEN_WIDTH = canvas.width;
export const SCREEN_HEIGHT = canvas.height;

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameState.objects.forEach((object) => {
    object.update();
    if (!object.img) {
      ctx.fillStyle = object.color;
      ctx.fillRect(object.x, object.y, object.width, object.height);
    } else {
      ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    }
  });
  window.requestAnimationFrame(draw);
};


const registerEvents = () => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
}

export const initScreen = async () => {
  registerEvents();

  const obstacles = await loadObstacles();

  gameState = new GameState();
  gameState.registerObjects(obstacles);
  draw();
}

export const addPlayer = (socketId) => {
  const player = new Player(socketId, 0, 0, 30, 30,'https://btomwxhenxidjudolnzs.supabase.co/storage/v1/object/public/profile_images/icons/default.png');
  gameState.registerObject(player);
}

export const removePlayer = (socketId) => {
  gameState.objects = gameState.objects.filter((object) => object.id !== socketId);
}

export const setPlayerFlag = (socketId, flag, value) => {
  const player = getPlayer(socketId);
  player.interactionState.setFlag(flag, value);
}

export const getPlayer = (socketId) => {
  return gameState.objects.find((object) => object.id === socketId);
}

const getImagePath = (name) => {
  if (!name) return null;
  for (const [key, value] of Object.entries(imageMap)) {
    if (name.includes(key)) {
      return value;
    }
  }
  return null;  // 画像が見つからない場合のデフォルト値
};

const loadObstacles = async () => {
  const response = await fetch('/api/map');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const obstaclesJson = await response.json();
  console.log(obstaclesJson);
  
  return obstaclesJson.map((obstacle) => {
    const imgPath = getImagePath(obstacle.name);
    return new CollidableObject(obstacle.x, obstacle.y, obstacle.width, obstacle.height, imgPath);
  });
};
