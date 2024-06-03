const AuthController = {
  signup: async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // emailが存在してたら処理を中断
    if (await User.findByEmail(email)) {
      return res.redirect("/auth/signup");
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt)

    User.create(email, password_hash);

    // サインアップ成功ページにリダイレクトする
    res.redirect('/auth/confirm-email');
  }
}

module.exports = AuthController;
