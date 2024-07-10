const { Request, Response } = require("express");
const UserModel = require("../models/User");
const fs = require('fs').promises;
const path = require('path');

const UserController = {
    /**
   * ユーザーの情報を更新する。
   * @param {Request} req
   * @param {Response} res
   */
  update: async (req, res) => {
    const { name, description } = req.body;
    const userId = req.userId;
    console.log(userId);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // TODO: 画像は変更しない場合にも対応
    let profilePicturePath = null;
    if (req.file) {
      console.log(req.file);
      const tempPath = req.file.path;
      const targetPath = path.join(__dirname, "../../public/uploads/", req.file.originalname);

      try {
        await fs.rename(tempPath, targetPath);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "File upload failed" });
      }

      profilePicturePath = `/uploads/${req.file.originalname}`;
    }

    // TODO: S3 にアップロード
    // TODO: upload が終わったらサーバ上から削除

    await UserModel.updateById(userId,{name,description});

    res.status(201).redirect("/rooms/select-mode/");
    }
  }

  module.exports = UserController
