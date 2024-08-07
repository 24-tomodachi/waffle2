const User = require('../models/User');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid').v4;
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const VerificationToken = require('../models/VerificationToken');

const AuthController = {
  signup: async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // emailが存在してたら処理を中断
    if (await User.findByEmail(email)) {
      return res.status(400).render("auth/signup", {
        errorMessage: 'メールアドレスは既に存在します',
        email:email
       });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt)

    const userId = await User.create(email, password_hash, salt);

    // 認証トークン生成
    const verificationToken = uuidv4();
    VerificationToken.create(userId, verificationToken);

    // 認証用URL作成
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;
    const verificationUrl = `${baseUrl}/auth/verify_email?token=${verificationToken}`;

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

    // ログイン状態にする
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token);

    // サインアップ成功ページにリダイレクトする
    res.status(201).redirect('/auth/confirm_email');
  },

  signin: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // 認可処理
    const user = await User.findByEmail(email);
    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.status(400).render('auth/signin', {
        errorMessage: 'メールアドレスが存在しないか、'+ "\n"+ 'パスワードが間違っています。'
      });
    }

    // セッションを発行
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token);

    res.status(200).redirect('/rooms/select-mode?message=ログインしました');
  },

  verifyEmail: async (req, res) => {
    const token = req.query.token;
    // TODO: UUID のフォーマットに沿っているか、正規表現で確認する

    const verificationToken = await VerificationToken.findByToken(token);
    if (!verificationToken) {
      return res.status(400).render('auth/error_email');
    }

    // ユーザーを有効化する
    const user = await User.verify(verificationToken.user_id);

    // メールアドレス確認完了ページにリダイレクトする
    res.status(200).redirect('/auth/completed_email');
  },

  signout: (req, res) => {
    if(req.cookies.token) {
      res.clearCookie('token');
    }

    res.status(200).redirect('/auth/signin?message=ログアウトしました');

  }
}

module.exports = AuthController;
