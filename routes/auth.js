const express = require('express');
const router = express.Router();
const AuthController = require('../src/controllers/AuthController');

router.get("/signin", (req, res) => {
  res.render("auth/signin");
})

router.get("/signup", (req, res) => {
  res.render("auth/signup");
})

router.post("/signup", AuthController.signup);


router.get("/confirm_email", (req, res) => {
  res.render("auth/confirm_email");
})

router.get("/verify_email", AuthController.verifyEmail);

router.get("/completed-email", (req, res) => {
  res.render("auth/completed_email");
})

module.exports = router;
