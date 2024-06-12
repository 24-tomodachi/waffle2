const supabase = require('../libs/supabase');

const RoomModel = {
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
     * @param {string} id ルームID
     * @param {Object} data 更新するルーム情報
     * @returns {boolean} 更新に成功したか
     */
    update: async (id, data) => {
      // ↓↓↓ ここに処理を書く ↓↓↓
  
      // ↑↑↑ ここに処理を書く ↑↑↑
    }
  }

module.exports = RoomModel;

