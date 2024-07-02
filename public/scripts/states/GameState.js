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
}
