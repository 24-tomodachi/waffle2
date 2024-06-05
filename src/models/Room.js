const supabase = require('../libs/supabase');

const RoomModel = {
  /**
   * 新しくルームを作成する。
   * @param {string} name　ルーム名
   * @param {int} userId　作成者
   * @param {string} [description=""] ルーム概要
   * @returns {string} 作成したユーザーのid
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