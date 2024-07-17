const { Request, Response } = require("express");
const UserModel = require("../models/User");
const fs = require('fs').promises;
const path = require('path');
const ProfileImageModel = require("../models/ProfileImage");
const { decode } = require("base64-arraybuffer");

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

    console.log(req.file);

    // TODO: S3 にアップロード
    ProfileImageModel.upload(req.file);

    UserModel.updateById(userId,{name,description});

    res.status(201).redirect("/rooms/select-mode/");
    }
  }

  module.exports = UserController
