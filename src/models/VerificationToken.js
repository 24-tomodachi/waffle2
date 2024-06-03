const supabase = require('../lib/supabase');
const { create } = require('./User');

const VerificationToken = {
  /**
   * @param {string} userId ユーザーID
   * @param {string} token 認証トークン
   * @returns {Object} 作成したトークンのデータ
   * @throws {Error} DB操作に失敗した場合
   */
  create: async (userId, token) => {
    const { data, error } = await supabase
      .from('verification_tokens')
      .insert([
        { user_id: userId, token }
      ])
      .select('id');

    if (error) {
      throw new Error(`Verification token creation failed: ${error.message}`);
    }
    return data[0];
  },

  /**
   * トークンから検索する。
   * 存在しない場合は null を返す。
   * @param {string} token 認証トークン
   * @returns {Object} トークンのデータ
   * @throws {Error} DB操作に失敗した場合
   */
  findByToken: async (token) => {
    const { data, error } = await supabase
      .from('verification_tokens')
      .select('*')
      .eq('token', token);

    if (error) {
      throw new Error(`Verification token search failed: ${error.message}`);
    }
    return data[0];
  },
}

module.exports = VerificationToken;
