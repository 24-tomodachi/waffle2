const { Request, Response } = require("express");
const RoomModel = require("../models/User");

const UserController = {
    /**
   * ユーザーの情報を更新する。
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
  }
  }
  
  module.exports = UserController
