const supabase = require('../libs/supabase');

const RoomKeysModel = {
    /**
     * @param {string} userId ユーザーid
     * @param {string} roomId ルームid
     * @return {Object}　挿入したデータ
     * @throws {Error} DB操作に失敗した場合
     */
    create: async (userId,roomId) => {
        const { data, error } = await supabase
          .from('room_keys')
          .insert([
            {user_id: userId,room_id: roomId}
          ])
          .select('*');
    
        if (error) {
          throw new Error(`RoomKeys creation failed: ${error.message}`);
        }
        return data[0];
      },

      /**
   * ルームKeysを更新する。
   * @param {number} id ID
   * @param {Object} updateData 更新する情報
   * @returns {Object} 更新されたデータ
   *  @throws {Error} ルームの作成に失敗した場合
   */
  update: async (id, updateData) => {
    const { data, error } = await supabase
      .from('room_keys')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      throw new Error(`RoomKeys creation failed: ${error.message}`);
    }
    return data[0];
  },

  /**
   * ユーザーIDとルームIDを基にroom_keysテーブルのエントリを検索する
   * @param {string} userId ユーザーID
   * @param {string} roomId ルームID
   * @returns {Object} 検索されたデータ
   * @throws {Error} 検索に失敗した場合
   */
  findByUserIdAndRoomId: async (userId, roomId) => {
    const { data, error } = await supabase
      .from('room_keys')
      .select('*')
      .eq('user_id', userId)
      .eq('room_id', roomId);

    if (error) {
      throw new Error(`Room key search failed: ${error.message}`);
    }
    return data;
  },

}

module.exports = RoomKeysModel;