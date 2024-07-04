import GameObject from "./GameObject.js";
import { interactionState } from "../screen.js";

export const SPEED = 3;

export default class Player extends GameObject {
  constructor(id, x, y, width, height, imgPath) {
    super(x, y, width, height, imgPath);
    this.id = id;
    this.color = "red";
  }

  update() {
    if (interactionState.getFlag("up")) {
      this.y -= SPEED;
    } else if (interactionState.getFlag("down")) {
      this.y += SPEED;
    } else if (interactionState.getFlag("left")) {
      this.x -= SPEED;
    } else if (interactionState.getFlag("right")) {
      this.x += SPEED;
    }
  }
}
