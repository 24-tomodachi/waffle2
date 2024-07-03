export const handleKeyUp = (e) => {
  if (e.key === "ArrowUp" || e.key === "w") {
    interactionState.setFlag("up", false);
  } else if (e.key === "ArrowDown" || e.key === "s") {
    interactionState.setFlag("down", false);
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    interactionState.setFlag("left", false);
  } else if (e.key === "ArrowRight" || e.key === "d") {
    interactionState.setFlag("right", false);
  }
}
