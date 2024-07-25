const { Request, Response } = require("express");
const UserModel = require("../models/User");
const ProfileImageModel = require("../models/ProfileImage");

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

    // TODO: 画像が空の場合に対応
    ProfileImageModel.upload(req.file)
      .then(filepath => {
        // TODO: userカラムにfilepathを保存
        UserModel.updateById(userId, { name, description, icon_path: filepath });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      });

    res.status(201).redirect("/rooms/select-mode/");
  },

  /**
 * ユーザーの情報を更新する。
 * @param {Request} req
 * @param {Response} res
 */
 updateByBy : async (req, res) => {
    const { name, description } = req.body;
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // TODO: 画像が空の場合に対応
    ProfileImageModel.upload(req.file)
      .then(filepath => {
        // TODO: userカラムにfilepathを保存
        UserModel.updateById(userId, { name, description, icon_path: filepath });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      });

    res.status(201).redirect("/rooms/");
  }
}

module.exports = UserController
