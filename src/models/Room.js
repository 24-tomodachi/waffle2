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
    const { data, error } = await supabase
    .from('rooms')
    .insert([
        { name, userId }
    ])
    .select('*');

    if (error) {
        throw new Error(`Room creation failed: ${error.message}`);
      }
      return data[0];
  },
  
}

module.exports = RoomModel;