import GameObject from "./GameObject.js";

export default class CollidableObject extends GameObject {
  constructor(x, y, width, height, imgPath) {
    super(x, y, width, height, imgPath);
  }
}
