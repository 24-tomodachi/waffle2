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
      const roomId = req.params.id;
      const userId = req.userId;
      const returned_at = new Date().toISOString();
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
       // ここでユーザーIDとルームIDを基にroom_keysテーブルのエントリを取得
    const roomKeys = await RoomKeysModel.findByUserIdAndRoomId(userId, roomId);
    console.log(roomKeys); // デバッグ用にログ出力
    // 取得したエントリのうち、returned_atがnullのものを更新
    for (const roomKey of roomKeys) {
      if (roomKey.returned_at === null) {
        await RoomKeysModel.update(roomKey.id, { returned_at });
        break; // 最初のnullのエントリを更新したらループを抜ける
      }
    }
      res.redirect('/rooms/select-mode');
    },
  }


module.exports = RoomKeysController