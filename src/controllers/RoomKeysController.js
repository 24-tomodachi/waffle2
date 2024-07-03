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
      const room_id = req.params.id;
      const user_id = req.userId;
      const returned_at = new Date().toISOString();
     
        await RoomKeysModel
        .update({room_id,user_id}, { returned_at })
    }
  }


module.exports = RoomKeysController