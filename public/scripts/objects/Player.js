import GameObject from "./GameObject.js";
import InteractionState from "../states/InteractionState.js";

export const SPEED = 3;

export default class Player extends GameObject {
  constructor(id, x, y, width, height, imgPath) {
    super(x, y, width, height, imgPath);
    this.id = id;
    this.interactionState = new InteractionState();
    this.color = "red";
  }

  update() {
    if (this.interactionState.getFlag("up")) {
      this.y -= SPEED;
    } else if (this.interactionState.getFlag("down")) {
      this.y += SPEED;
    } else if (this.interactionState.getFlag("left")) {
      this.x -= SPEED;
    } else if (this.interactionState.getFlag("right")) {
      this.x += SPEED;
    }
  }
}
