import GameObject from "./GameObject.js";

export class Reaction extends GameObject {
  constructor(player, x, y, imgPath) {
    super(x, y, 100, 100, imgPath);
    this.player = player;
  }

  update() {
    this.x = this.player.x + this.player.width / 2;
    this.y = this.player.y - this.player.height / 2;
  }
}
