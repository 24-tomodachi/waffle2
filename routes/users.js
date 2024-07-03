const express = require('express');
const router = express.Router();
const UserModel = require('../src/models/User');

router.get("/day1", (req, res) => {
  res.render("users/day1");
});

router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render("users/show", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get("/:id/edit", (req, res) => {
  // TODO: 本人以外は編集画面に遷移できないようにする
  res.render("users/edit");
});

module.exports = router;