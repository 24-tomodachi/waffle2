const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render("rooms/index");
})

router.get("/new", (req, res) => {
  res.render("rooms/new");
})

router.get("/:id", (req, res) => {
  // TODO: idを受け取って、部屋の詳細を表示する
  res.render("rooms/show");
})

module.exports = router;
