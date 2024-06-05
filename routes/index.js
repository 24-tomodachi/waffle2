var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // TODO: LPあってもよさそう
  res.redirect('/auth/signup');
});

module.exports = router;
