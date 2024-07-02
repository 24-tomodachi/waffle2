const express = require('express');
const router = express.Router();

router.get('/map', (req, res) => {
  res.json(obstacles);
});

module.exports = router;
