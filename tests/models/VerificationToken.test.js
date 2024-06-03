const uuidv4 = require('uuid').v4;
const supabase = require('../../src/libs/supabase');
const VerificationToken = require('../../src/models/VerificationToken');

describe('VerificationToken', () => {

  describe('VerificationToken#create', () => {
    it('should create a verification token successfully', async () => {
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
        .eq('id', verificationToken.id);
    });
  });

  describe('VerificationToken#findByToken', () => {
    it('should find a verification token by token successfully', async () => {
      const userId = 1;
      const token = "00000000-0000-0000-0000-000000000001";
      const { data, error } = await supabase
        .from('verification_tokens')
        .insert([
          { user_id: userId, token }
        ])
        .select('id')
        .single();

      const { id } = data;
      const verificationToken = await VerificationToken.findByToken(token);
      expect(verificationToken).not.toBeNull();

      const { data: deleteData, deleteError } = await supabase
        .from('verification_tokens')
        .delete()
        .eq('id', id);
    });
  });
});
