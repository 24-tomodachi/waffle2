export class Room {
  /**
   * ルームidをもとに、ルームを検索する。
   * @param {string} id ルームid
   * @returns {Object} ルーム
   */
  static  async findById(id) {
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
