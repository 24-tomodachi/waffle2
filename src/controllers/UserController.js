const { Request, Response } = require("express");
const UserModel = require("../models/User");

const UserController = {
    /**
   * ユーザーの情報を更新する。
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { name, description } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
      }

    await UserModel.updateById(userId,{name,description});

    res.status(201).redirect("/rooms/select-mode/");
    }
  }
  
  module.exports = UserController
