import { gameState } from "../screen.js";
import { socket } from "../main.js";

export const handleKeyUp = (e) => {
  const player = gameState.objects.find((object) => object.id === socket.id);

  if (e.key === "ArrowUp" || e.key === "w") {
    player.interactionState.setFlag("up", false);
  } else if (e.key === "ArrowDown" || e.key === "s") {
    player.interactionState.setFlag("down", false);
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    player.interactionState.setFlag("left", false);
  } else if (e.key === "ArrowRight" || e.key === "d") {
    player.interactionState.setFlag("right", false);
  }
}
