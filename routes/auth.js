const express = require('express');
const router = express.Router();
const AuthController = require('../src/controllers/AuthController');

router.get("/signin", (req, res) => {
  res.render("auth/signin");
})

router.post("/signin", AuthController.signin);

router.get("/signup", (req, res) => {
  res.render("auth/signup", { errorMessage: null, email: '' });
})

router.post("/signup", AuthController.signup);

router.get("/confirm_email", (req, res) => {
  res.render("auth/confirm_email");
})

router.get("/verify_email", AuthController.verifyEmail);

router.get("/completed_email", (req, res) => {
  res.render("auth/completed_email");
})

router.get("/signout", AuthController.signout)

module.exports = router;
