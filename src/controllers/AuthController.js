const User = require('../models/User');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;
const nodemailer = require('nodemailer');

const VerificationToken = require('../models/VerificationToken');

const AuthController = {
  signup: async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // emailが存在してたら処理を中断
    if (await User.findByEmail(email)) {
      return res.redirect("/auth/signup", { error: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt)

    const userId = await User.create(email, password_hash);

    // 認証トークン生成
    const verificationToken = uuidv4();
    VerificationToken.create(userId, verificationToken);

    // 認証用URL作成
    // TODO: baseURLを分離、環境ごとに変更できるようにする
    const verificationUrl = `localhost:3000/auth/verify_email?token=${verificationToken}`;

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
    res.status(201).redirect('/auth/confirm_email');
  },

  verifyEmail: async (req, res) => {
    const token = req.query.token;
    const verificationToken = await VerificationToken.findByToken(token);
    if(!verificationToken) {
      return res.status(400).redirect('/auth/verify_email', { error: 'Invalid token' });
    }

    // ユーザーを有効化する
    const user = await User.verify(verificationToken.user_id);
    if (!user) {
      return res.status(500).redirect('/auth/verify_email', { error: 'User not found' });
    }

    // メールアドレス確認完了ページにリダイレクトする
    res.status(200).redirect('/auth/completed_email');
  },
}

module.exports = AuthController;
