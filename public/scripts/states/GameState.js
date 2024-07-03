import GameObject from "../objects/GameObject.js";

export default class GameState {
  constructor() {
    this.objects = [];
  }

  registerObject(object) {
    if (object instanceof GameObject) {
      this.objects.push(object);
    }
  }

  registerObjects(objects) {
    objects.forEach((object) => {
      this.registerObject(object);
    });
  }

  findByClass(cls) {
    return this.objects.filter((object) => object instanceof cls);
  }

  isCollidingWith = (obj) => {
    const isXOverlapped = this.x < (obj.x + obj.width) &&
      (this.x + this.width) > obj.x ||
      obj.x < (this.x + this.width) &&
      (obj.x + obj.width) > this.x;

    const isYOverlapped = this.y < (obj.y + obj.height) &&
      (this.y + this.height) > obj.y ||
      obj.y < (this.y + this.height) &&
      (obj.y + obj.height) > this.y;

    return isXOverlapped && isYOverlapped;
  };
}
