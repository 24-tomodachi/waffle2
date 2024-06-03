const express = require('express');
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("auth/signin");
})

router.get("/signup", (req, res) => {
  res.render("auth/signup");
})

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
