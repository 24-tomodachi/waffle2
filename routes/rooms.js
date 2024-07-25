const express = require('express');
const router = express.Router();
const RoomController = require("../src/controllers/RoomController");
const RoomModel = require('../src/models/Room');
const UserModel = require('../src/models/User');
const RoomKeysController = require('../src/controllers/RoomKeysController');

router.get("/", RoomController.index);

router.get("/new", (req, res) => {
  res.render("rooms/new");
})

router.get('/select-mode', (req, res) => {
  const message = req.query.message;
  console.log(message);
  res.render('rooms/select-mode', { message });
});

router.get("/:id", async (req, res) => {
  // TODO: idを受け取って、部屋の詳細を表示する
  console.log(req);
  const room = await RoomModel.findById(req.params.id);
  const user = await UserModel.findById(req.userId);
  res.render("rooms/show", { room,user });
})

router.post("/create", RoomController.create);
router.get("/join/:id", RoomController.join); 

router.post("/update", RoomController.update);
router.get("/leave/:id", RoomController.leave);

module.exports = router;
