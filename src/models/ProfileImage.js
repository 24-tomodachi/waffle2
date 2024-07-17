const { decode } = require("base64-arraybuffer");
const supabase = require("../libs/supabase.js");
const path = require("path");
const fs = require("fs").promises;

const ProfileImageModel = {
  async upload(file) {
    const fileBase64 = decode(file.buffer.toString("base64"));
    const { error } = await supabase.storage
      .from('profile_images')
      .upload(`/uploads/${file.originalname}`, fileBase64, {
        contentType: file.mimetype,
      });
    if (error) {
      console.error("Error uploading profile image: " + error.message);
    }
  }
}

module.exports = ProfileImageModel;
