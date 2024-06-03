const User = require('../models/User');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;
const nodemailer = require('nodemailer');

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

    // 認証トークン生成
    const verificationToken = uuidv4();
    // TODO: DB に保存

    // 認証用URL作成
    // TODO: baseURLを分離、環境ごとに変更できるようにする
    const verificationUrl = `localhost:3000/auth/verify-email?token=${verificationToken}`;

    // メール送信
    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS
      }
    })
    await mailTransporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: '<waffle> メールアドレスの確認',
      text: `
      こちらは waffle の認証用メールです。
      以下のURLをクリックして、アカウント登録を完了させてください。
      ${verificationUrl}
      `
    })

    // サインアップ成功ページにリダイレクトする
    res.status(201).redirect('/auth/confirm-email');
  }
}

module.exports = AuthController;
