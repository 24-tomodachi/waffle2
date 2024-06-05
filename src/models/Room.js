const supabase = require('../libs/supabase');

const RoomModel = {
  /**
   * ルームを作成する
   * @param {string} name ルーム名
   * @param {number} userId 作成者
   * @returns {Object} 作成されたデータを返す
   * @throws {Error} DB操作に失敗した場合
   */
  create: async (name, userId) => {
    
  }
}

module.exports = RoomModel;