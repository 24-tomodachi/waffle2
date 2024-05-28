const supabase = require('../../src/libs/supabase');
const User = require('../../src/models/User');

describe('User', () => {
  const email = 'hoge@example.com';
  const password_hash = 'password_hash';

  describe('User#create', () => {
    // 正常系
    it('正常なメールアドレスとパスワードのハッシュ値が与えられた場合、問題なく登録できるか', async () => {

      // 重複を避けるため、事前に削除
      const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('email', email);

      const id = await User.create(email, password_hash);
      expect(id).not.toBeNull();

      // 登録したデータを削除
      const { data: deleteData, deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
    });

    // TODO: 異常系
  });

  describe('User#findById', () => {
    // 正常系
    it('正常なIDが与えられた場合、問題なく検索できるか', async () => {
      const { data, error } = await supabase
        .from('users')
        .insert([
          { email, password_hash }
        ])
        .select('id')
        .single();

      const { id } = data;
      const user = await User.findById(id);
      expect(user).not.toBeNull();

      // 登録したデータを削除
      const { data: deleteData, deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
    });
  });

    describe('User#findByEmail', () => {
      // 正常系
      it('正常なメールアドレスが与えられた場合、問題なく検索できるか', async () => {
        const { data, error } = await supabase
          .from('users')
          .insert([
            { email, password_hash }
          ]);

        const user = await User.findByEmail(email);
        expect(user).not.toBeNull();

        // 登録したデータを削除
        const { data: deleteData, deleteError } = await supabase
          .from('users')
          .delete()
          .eq('id', user.id);
      })

      // TODO: 異常系
    })
  });
