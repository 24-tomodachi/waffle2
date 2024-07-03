import GameObject from "./GameObject.js";

export default class Player extends GameObject {
  constructor(x, y, width, height, imgPath) {
    super(x, y, width, height, imgPath);
    this.color = "red";
  }
}
