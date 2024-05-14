const express = require('express');
const router = express.Router();

router.get("/:id", (req, res) => {
  // TODO: idを受け取って、ユーザーの詳細を表示する
  res.render("users/show");
})

router.get("/:id/edit", (req, res) => {
  // TODO: 本人以外は編集画面に遷移できないようにする
  res.render("users/edit");
})

module.exports = router;
