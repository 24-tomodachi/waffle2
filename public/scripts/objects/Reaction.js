import GameObject from "./GameObject.js";

export class Reaction extends GameObject {
  constructor(player, imgPath) {
    super(player.x + player.width / 2, player.y - player.height / 2, 30, 30, imgPath);
    this.player = player;
  }

  update() {
    this.x = this.player.x;
    this.y = this.player.y - this.player.height;
  }
}
