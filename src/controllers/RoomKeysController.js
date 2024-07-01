const { Request, Response } = require("express");
const RoomKeysModel = require("../models/RoomKeys");


const RoomKeysController = {
    /**
     * ルームに参加する。
     * @param {Request} req
     * @param {Response} res
     */
    create: async (req, res) => {
      const roomId = req.params.id;
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      await RoomKeysModel.create(userId,roomId);
    },

    /**
     * ルームKeysを更新する
     * @param {Request} req
     * @param {Response} res
     */
    update: async (req, res) => {
      const userId = req.userId;
      const return_at = req.newDate();
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      await RoomKeysModel.update(userId,return_at);
    },
  }


module.exports = RoomKeysController