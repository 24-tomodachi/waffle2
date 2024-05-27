const supabase = require('../libs/supabase');

const UserModel = {
  /**
   * @param {string} email メールアドレス
   * @param {string} password_hash パスワード
   * @returns {string} 作成したユーザーのID
   * @throws {Error} DB操作に失敗した場合
   */
  create: async (email, password_hash) => {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { email, password_hash }
      ])
      .select('id')
      .single();

    if (error) {
      throw new Error(`User creation failed: ${error.message}`);
    }
    return data.id;
  },

  /**
   * ユーザーを email で検索する。
   * 存在しない場合は null を返す。
   * @param {string} email メールアドレス
   * @returns {Object} ユーザー情報
   * @throws {Error} DB操作に失敗した場合
   */
  findByEmail: async (email) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (error) {
      throw new Error(`User search failed: ${error.message}`);
    }
    return data[0];
  }

}

module.exports = UserModel;
