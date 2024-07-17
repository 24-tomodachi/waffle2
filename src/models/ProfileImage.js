const { decode } = require("base64-arraybuffer");
const supabase = require("../libs/supabase.js");

const ProfileImageModel = {
  async upload(file) {
    const fileBase64 = decode(file.buffer.toString("base64"));
    const filename = `${Date.now()}.${file.mimetype.split("/")[1]}`;
    const filepath = `/icons/${filename}`;
    const { error } = await supabase.storage
      .from('profile_images')
      .upload(filepath, fileBase64, {
        contentType: file.mimetype,
      });
    if (error) {
      console.error("Error uploading profile image: " + error.message);
    }

    return filepath;
  }
}

module.exports = ProfileImageModel;
