export class User {
  /**
   * ユーザーを作成する。
   * @param {string} name ユーザー名
   * @param {string} email メールアドレス
   * @param {string} password_hash パスワード
   * @returns {string} 作成したユーザーのID
   */
  static async create(name, email, password_hash) {
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
