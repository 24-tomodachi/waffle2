import GameObject from "./GameObject.js";
import InteractionState from "../states/InteractionState.js";

export const SPEED = 3;
const SCREEN_WIDTH = 1000; // ゲーム画面の幅
const SCREEN_HEIGHT = 420; // ゲーム画面の高さ

export default class Player extends GameObject {
  constructor(id, x, y, width, height, imgPath) {
    super(x, y, width, height, imgPath);
    this.id = id;
    this.interactionState = new InteractionState();
    this.color = "red";
  }

  update() {
    if (this.interactionState.getFlag("up")) {
      if (this.y - SPEED >= 0) { // 上端に達していない場合のみ移動
        this.y -= SPEED;
      }
    } else if (this.interactionState.getFlag("down")) {
      if (this.y + this.height + SPEED <= SCREEN_HEIGHT) { // 下端に達していない場合のみ移動
        this.y += SPEED;
      }
    } else if (this.interactionState.getFlag("left")) {
      if (this.x - SPEED >= 0) { // 左端に達していない場合のみ移動
        this.x -= SPEED;
      }
    } else if (this.interactionState.getFlag("right")) {
      if (this.x + this.width + SPEED <= SCREEN_WIDTH) { // 右端に達していない場合のみ移動
        this.x += SPEED;
      }
    }
  }
}
