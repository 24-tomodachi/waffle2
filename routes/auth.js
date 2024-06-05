const express = require('express');
const router = express.Router();
const User = require('../src/models/User');
const bcrypt = require('bcrypt');

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

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt)

  User.create(email, password_hash);
  
  // サインアップ成功ページにリダイレクトする
  res.redirect('/');
});


router.get("/confirm_email", (req, res) => {
  res.render("auth/confirm_email");
})

router.get("/completed_email", (req, res) => {
  res.render("auth/completed_email");
})

router.get("/room-choice", (req, res) => {
  res.render("auth/room-choice");
})

module.exports = router;
