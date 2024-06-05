const supabase = require('../libs/supabase');

const RoomModel = {
  /**
   * 新しくルームを作成する。
   * @param {String} name
   * @param {String} description
   */
  create: async (name, userId, description="") => {
    const { data, error } = await supabase
    .from('rooms')
    .insert([
        { name, user_id:userId, description }
    ])
    .select('*');

    // ↑↑↑ ここに処理を書く
  }
}

module.exports = RoomModel;