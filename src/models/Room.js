const supabase = require('../libs/supabase');

const RoomModel = {
  /**
   * ルームを作成する
   * @param {string} name ルーム名
   * @param {number} userId 作成者
   * @param {string} [discription=""] ルーム概要
   * @returns {Object} 作成されたデータを返す
   * @throws {Error} DB操作に失敗した場合
   */
  create: async (name, userId, description="") => {
    const { data, error } = await supabase
    .from('rooms')
    .insert([
        { name, user_id:userId, description }
    ])
    .select('*');

    if (error) {
        throw new Error(`Room creation failed: ${error.message}`);
      }
      return data[0];
  }
}

module.exports = RoomModel;