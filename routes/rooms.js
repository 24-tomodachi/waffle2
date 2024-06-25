const express = require('express');
const router = express.Router();
const RoomController = require("../src/controllers/RoomController");
const RoomModel = require('../src/models/Room');

router.get("/", RoomController.index);

router.get("/new", (req, res) => {
  res.render("rooms/new");
})

router.get("/select-mode", (req, res) => {
  res.render("rooms/select-mode");
})

router.get("/:id", async (req, res) => {
  // TODO: idを受け取って、部屋の詳細を表示する
  const room = await RoomModel.findById(req.params.id);
  res.render("rooms/show", { room });
})

router.post("/create", RoomController.create);
router.post("/join", RoomController.join);  

module.exports = router;
