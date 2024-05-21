const express = require('express');
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("auth/signin");
})

router.get("/signup", (req, res) => {
  res.render("auth/signup");
})

router.post("/signup", (req, res) => {
  // 新しいユーザーをデータベースに作成する
  

  // サインアップ成功ページにリダイレクトする
  res.redirect('/');
});


router.get("/confirm_email", (req, res) => {
  res.render("auth/confirm_email");
})

module.exports = router;
