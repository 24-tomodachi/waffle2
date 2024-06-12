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
     * @returns {Object} 更新されたデータ
     */
    update: async (id, data) => {
    const { data, error } = await supabase
    .from('rooms')
    .update(data)
    .eq('id', id)
    .select();

    if (error) {
        throw new Error(`Room creation failed: ${error.message}`);
    }
    return data[0];
    }
  }

module.exports = RoomModel;

