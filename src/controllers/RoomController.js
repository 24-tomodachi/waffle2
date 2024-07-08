const { Request, Response } = require("express");
const RoomModel = require("../models/Room");
const RoomKeysController = require("./RoomKeysController");
const RoomKeysModel = require("../models/RoomKeys");

const RoomController = {
  /**
   * ルームを作成する。
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {
    const { name, description } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const room = await RoomModel.create(name, userId, description);

    res.status(201).redirect("/rooms/" + room.id);
  },

  /**
   * ルームから退出する。
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const returned_at = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await RoomModel.update(userId,returned_at);

    res.status(201).redirect("/rooms/select-mode/");
  },
  /**
   * すべてのルームを表示する。
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req, res) => {
    const rooms = await RoomModel.findAll();
    res.render("rooms/index", { rooms });
  },

  join: async (req, res) => {
    const roomId = req.params.id;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

   // 既に参加していて、退出していないか確認
   const existingRoomKey = await RoomKeysModel.findByUserIdAndRoomId(userId, roomId);
   if (existingRoomKey && !existingRoomKey.returned_at) {
    return res.redirect(`/rooms/${roomId}`);
   } else {
    // RoomKeysControllerのcreateメソッドを呼び出し
   RoomKeysController.create(req, res);
   return res.redirect(`/rooms/${roomId}`);
   }
 },

  leave: async(req, res) => {
    const roomId = req.params.id;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // RoomKeysControllerのupdateメソッドを呼び出し
    RoomKeysController.update(req, res);

    res.redirect('/rooms/select-mode');
  }
}

module.exports = RoomController
