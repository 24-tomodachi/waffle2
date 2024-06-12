const supabase = require('../libs/supabase');

const RoomModel = {
  /**
   * ルームを作成する。
   * @param {string} name ルーム名
   * @param {string} userId ユーザーid
   * @param {string} [description=""] ルームの説明
   * @returns {Object} 作成したルーム
   * @throws {Error} ルームの作成に失敗した場合
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
    },
    /**
     * ルーム情報を更新する。
     * @param {number} id ルームID
     * @param {Object} updateData 更新するルーム情報
     * @returns {Object} 更新されたデータ
     */
    update: async (id, updateData) => {
    const { data, error } = await supabase
    .from('rooms')
    .update(updateData)
    .eq('id', id)
    .select();

    if (error) {
        throw new Error(`Room creation failed: ${error.message}`);
    }
    return data[0];
    }
  }
    },

  /**
   * ルームidをもとに、ルームを検索する。
   * @param {string} id ルームid
   * @returns {Object} ルーム
   * @throws {Error} ルームの検索に失敗した場合
   */
  findById: async(id) => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id);

    if (error) {
      throw new Error(`Room search failed: ${error.message}`);
    }
    return data[0];
  }
}

module.exports = RoomModel;

