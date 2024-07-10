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
    console.log(userId);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await UserModel.updateById(userId, { name, description });

    res.status(201).redirect("/rooms/select-mode/");
  },

  handleImageChange:async (event) => {
    const file = event.target.files[0];
    const filePath = `profile-images/${file.name}`;
    const { error } = await supabase.storage
        .from('profile_images')
        .upload(filePath, file);

    if (error) {
        console.error('Upload error:', error.message);
    } else {
        console.log('File uploaded successfully:', filePath);
        document.getElementById('image-path').value = filePath;
    }
}
};

module.exports = UserController;
