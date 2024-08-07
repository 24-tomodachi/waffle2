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

  removeObject(object) {
    this.objects = this.objects.filter((obj) => obj !== object);
  }

  findByClass(cls) {
    return this.objects.filter((object) => object instanceof cls);
  }
}
