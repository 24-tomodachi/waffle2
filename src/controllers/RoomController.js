const { Request, Response } = require("express");
const RoomModel = require("../models/Room");

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
   * すべてのルームを表示する。
   * @param {Request} req
   * @param {Response} res
   */
  index: async (req, res) => {
    const rooms = await RoomModel.findAll();
    res.render("rooms/index", { rooms });
  },
}

module.exports = RoomController
