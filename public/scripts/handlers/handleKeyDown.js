import { gameState } from "../screen.js";
import { socket } from "../main.js";

export const handleKeyDown = (e) => {
  const player = gameState.objects.find((object) => object.id === socket.id);

  if (e.key === "ArrowUp" || e.key === "w") {
    player.interactionState.setFlag("up", true);
  } else if (e.key === "ArrowDown" || e.key === "s") {
    player.interactionState.setFlag("down", true);
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    player.interactionState.setFlag("left", true);
  } else if (e.key === "ArrowRight" || e.key === "d") {
    player.interactionState.setFlag("right", true);
  }
};
