const { Request, Response } = require("express");
const UserModel = require("../models/User");
const fs = require('fs').promises;
const path = require('path');
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

    // TODO: 画像は変更しない場合にも対応
    console.log(req.file);
    let profilePicturePath, tempPath;
    if (req.file) {
      tempPath = req.file.path;
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
    console.log(req.file);
    await ProfileImageModel.upload(req.file);

    // TODO: upload が終わったらサーバ上から削除
    if (tempPath) {
      await fs.unlink(tempPath);
    }

    await UserModel.updateById(userId,{name,description});

    res.status(201).redirect("/rooms/select-mode/");
    }
  }

  module.exports = UserController
