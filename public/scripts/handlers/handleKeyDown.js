import { gameState } from "../screen.js";
import { socket, roomId } from "../main.js";
import { Reaction } from "../objects/Reaction.js";

export const handleKeyDown = (e) => {
  const player = gameState.objects.find((object) => object.id === socket.id);

  if (e.key === "ArrowUp" || e.key === "w") {
    emitSetFlag("up", true);
    player.interactionState.setFlag("up", true);
  } else if (e.key === "ArrowDown" || e.key === "s") {
    emitSetFlag("down", true);
    player.interactionState.setFlag("down", true);
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    emitSetFlag("left", true);
    player.interactionState.setFlag("left", true);
  } else if (e.key === "ArrowRight" || e.key === "d") {
    emitSetFlag("right", true);
    player.interactionState.setFlag("right", true);
  }

  if (e.key >= "0" && e.key <= "9") {
    const reaction = new Reaction(player, `/image/reaction${e.key}.svg`);
    gameState.objects.push(reaction);
  }
};

const emitSetFlag = (flag, value) => {
  socket.emit("setFlag", { roomId, socketId: socket.id, flag: flag, value: value });
};
