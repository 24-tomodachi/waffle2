const supabase = require('../libs/supabase');

const Roomkeys = {
    /**
     * @param {string} userId ユーザーid
     * @param {string} roomId ルームid
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
          throw new Error(`Room_keys creation failed: ${error.message}`);
        }
        return data[0];
      },
}