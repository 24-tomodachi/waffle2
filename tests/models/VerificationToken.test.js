const uuidv4 = require('uuid').v4;
const supabase = require('../../src/libs/supabase');
const VerificationToken = require('../../src/models/VerificationToken');

describe('VerificationToken', () => {

  describe('VerificationToken#create', () => {
    it('データの新規登録が正常に行えるか', async () => {
      const userId = 1;
      const token = uuidv4();

      // delete before
      const { data, error } = await supabase
        .from('verification_tokens')
        .delete()
        .eq('user_id', userId);

      // act
      const verificationToken = await VerificationToken.create(userId, token);
      expect(verificationToken).not.toBeNull();

      // delete after
      const { data: deleteData, deleteError } = await supabase
        .from('verification_tokens')
        .delete()
        .eq('user_id', verificationToken.user_id);
    });
  });

  describe('VerificationToken#findByToken', () => {
    it('トークンを用いた検索が正常に行えるか', async () => {
      const userId = 1;
      const token = "00000000-0000-0000-0000-000000000001";
      const { data, error } = await supabase
        .from('verification_tokens')
        .insert([
          { user_id: userId, token }
        ])
        .select('*')
        .single();

      const verificationToken = await VerificationToken.findByToken(token);
      expect(verificationToken).not.toBeNull();
    });
  });
});
