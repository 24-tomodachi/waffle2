const express = require('express');
const router = express.Router();
const UserModel = require('../src/models/User');
const UserController = require("../src/controllers/UserController");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

router.get("/:id/edit", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.render("users/edit", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post("/update", upload.single('profile-picture'), UserController.update);

module.exports = router;
