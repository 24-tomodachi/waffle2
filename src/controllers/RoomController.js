import { Request, Response } from "express";
import RoomModel from "../models/Room.js";

const RoomController = {
  /**
   * ルームを作成する。
   * @param {Request} req
   * @param {Response} res
   */
  create: async (req, res) => {
    const { name } = req.body;
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const room = await RoomModel.create(name, userId);

    res.status(201).redirect("/rooms/" + room.id);
  },
};
