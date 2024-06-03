const supabase = require('../lib/supabase');
const { create } = require('./User');

const VerificationTokenModel = {
  /**
   * @param {string} userId ユーザーID
   * @param {string} token 認証トークン
   * @returns {Object} 作成したトークンのデータ
   * @throws {Error} DB操作に失敗した場合
   */
}
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
}
