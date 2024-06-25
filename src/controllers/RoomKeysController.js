const { Request, Response } = require("express");
const RoomKeysModel = require("../models/RoomKeys");


const RoomKeysController = {
    /**
     * ルームに参加する。
     * @param {Request} req
     * @param {Response} res
     */
    create: async (req, res) => {
      const  { roomId } = req.body;
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const roomKeys = await RoomKeysModel.create(userId,roomId);
      res.status(201).json({ roomKeys });

    },
}

module.exports = RoomKeysController