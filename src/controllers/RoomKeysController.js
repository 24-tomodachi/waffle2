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
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      await RoomKeysModel.create(userId,roomId);
    },
}

module.exports = RoomKeysController