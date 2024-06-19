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
}

module.exports = RoomKeysModel;