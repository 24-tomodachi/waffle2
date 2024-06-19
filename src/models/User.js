const supabase = require('../libs/supabase');

const UserModel = {
  // TODO: return するデータをid => すべてに変更
  /**
   * @param {string} email メールアドレス
   * @param {string} password_hash パスワード
   * @param {string} salt ソルト
   * @returns {string} 作成したユーザーのID
   * @throws {Error} DB操作に失敗した場合
   */
  create: async (email, password_hash, salt) => {
    const { data, error } = await supabase
      .from('users')
      .insert([
        { email, password_hash, salt }
      ])
      .select('id');

    if (error) {
      throw new Error(`User creation failed: ${error.message}`);
    }
    return data[0].id;
  },


  /**
   * ユーザーを id で検索する。
   * 存在しない場合は null を返す。
   * @param {string} id ユーザーID
   * @returns {Object} ユーザー情報
   */
  findById: async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id);

    if (error) {
      throw new Error(`User search failed: ${error.message}`);
    }
    return data[0];
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
  },

  /**
   * ユーザーを有効化する。
   * @param {string} id ユーザーID
   * @returns {Object} 更新したユーザー情報
   */
  verify: async (id) => {
    const { data, error } = await supabase
      .from('users')
      .update({ is_verified: true })
      .eq('id', id)
      .select('*');

    if (error) {
      throw new Error(`User activation failed: ${error.message}`);
    }
    return data[0];
  },

  /**
     * Idをもとにユーザ情報を更新する。
     * @param {number} id ユーザID
     * @param {Object} updateData 更新するユーザ情報
     * @returns {Object} 更新されたデータ
     */
    updateById: async (id, updateData) => {
      const { data,error} = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select();

      if (error) {
        throw new Error(`User creation failed: ${error.message}`);
    }
    return data[0];
    }
  }

module.exports = UserModel;

