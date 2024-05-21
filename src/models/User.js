const supabase = require('../libs/supabase');

const UserModel = {
  /**
   * @param {string} email メールアドレス
   * @param {string} password_hash パスワード
   * @returns {string} 作成したユーザーのID
   * @throws {Error} ユーザー作成に失敗した場合
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
  }
}

module.exports = UserModel;
