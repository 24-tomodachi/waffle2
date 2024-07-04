import { gameState } from "../screen.js";
import { socket } from "../main.js";

export const handleKeyUp = (e) => {
  const player = gameState.objects.find((object) => object.id === socket.id);

  if (e.key === "ArrowUp" || e.key === "w") {
    emitSetFlag("up", false);
    player.interactionState.setFlag("up", false);
  } else if (e.key === "ArrowDown" || e.key === "s") {
    emitSetFlag("down", false);
    player.interactionState.setFlag("down", false);
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    emitSetFlag("left", false);
    player.interactionState.setFlag("left", false);
  } else if (e.key === "ArrowRight" || e.key === "d") {
    emitSetFlag("right", false);
    player.interactionState.setFlag("right", false);
  }
}

const emitSetFlag = (flag, value) => {
  socket.emit("setFlag", { socketId: socket.id, flag: flag, value: value });
};