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
   * @param {Object} where 条件を格納したオブジェクト
   * @param {Object} updateData 更新する情報
   * @returns {Object} 更新されたデータ
   *  @throws {Error} ルームの作成に失敗した場合
   */
  update: async (where, updateData) => {
    const { data, error } = await supabase
      .from('room_keys')
      .update(updateData)
      .match(where)
      .select();

    if (error) {
      throw new Error(`RoomKeys update failed: ${error.message}`);
    }
    return data[0];
  },
  
  /**
   * ユーザーIDとルームIDでRoomKeyを検索する。
   * @param {string} userId ユーザーID
   * @param {string} roomId ルームID
   * @returns {Object|null} RoomKey情報
   */
  findByUserIdAndRoomId: async (userId, roomId) => {
    const { data, error } = await supabase
      .from('room_keys')
      .select('*')
      .eq('user_id', userId)
      .eq('room_id', roomId);

    if (error) {
      throw new Error(`RoomKey search failed: ${error.message}`);
    }
    return data[0];
  }
}

module.exports = RoomKeysModel;