export default class InteractionState {
  constructor() {
    this.interactFlags = {
      up: false,
      down: false,
      left: false,
      right: false
    };
  }

  /**
   * 特定のフラグが立っているかを取得する。
   * @param {string} flag フラグ名
   * @returns {boolean} フラグが立っているか
   */
  getFlag(flag) {
    if (this.interactFlags.hasOwnProperty(flag)) {
      return this.interactFlags[flag];
    } else {
      throw new Error(`Flag "${flag}" is not defined.`);
    }
  }

  /**
   * フラグを更新する。
   * @param {string} flag フラグ名
   * @param {boolean} value フラグの値
   */
  setFlag(flag, value) {
    if (this.interactFlags.hasOwnProperty(flag)) {
      this.interactFlags[flag] = value;
    } else {
      throw new Error(`Flag "${flag}" is not defined.`);
    }
  }
}
