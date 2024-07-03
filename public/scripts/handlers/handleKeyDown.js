export const handleKeyDown = (e) => {
  if (e.key === "ArrowUp" || e.key === "w") {
    interactionState.setFlag("up", true);
  } else if (e.key === "ArrowDown" || e.key === "s") {
    interactionState.setFlag("down", true);
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    interactionState.setFlag("left", true);
  } else if (e.key === "ArrowRight" || e.key === "d") {
    interactionState.setFlag("right", true);
  }
};
