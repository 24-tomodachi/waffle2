const UserModel = {
  /**
   * @param {string} name ユーザー名
   * @param {string} email メールアドレス
   * @param {string} password_hash パスワード
   * @returns {string} 作成したユーザーのID
   */
  create: async (name, email, password_hash) => {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { name, email, password_hash }
      ])
      .select('id')

    if (error) {
      throw new Error(`User creation failed: ${error.message}`);
    }
    return data[0].id;
  }
}

module.exports = UserModel;
