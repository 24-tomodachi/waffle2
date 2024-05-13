const express = require('express');
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("auth/signin");
})

router.get("/signup", (req, res) => {
  res.render("auth/signup");
})

router.post("confirm_email", (req, res) => {
  res.render("auth/confirm_email");
})

module.exports = router;
