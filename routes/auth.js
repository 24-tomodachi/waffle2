const express = require('express');
const router = express.Router();
const User = require('../src/models/User');

router.get("/signin", (req, res) => {
  res.render("auth/signin");
})

router.get("/signup", (req, res) => {
  res.render("auth/signup");
})

router.post("/signup", async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  // emailが存在してたら処理を中断
  if(await User.findByEmail(email)) {
    return res.redirect("/auth/signup");
  }
  // サインアップ成功ページにリダイレクトする
  res.redirect('/');
});


router.get("/confirm_email", (req, res) => {
  res.render("auth/confirm_email");
})

module.exports = router;
