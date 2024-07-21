const { decode } = require("base64-arraybuffer");
const supabase = require("../libs/supabase.js");

const ProfileImageModel = {
  async upload(file) {
    const fileBase64 = decode(file.buffer.toString("base64"));
    const filename = `${Date.now()}.${file.mimetype.split("/")[1]}`;
    const filepath = `/icons/${filename}`;

    var { data, error } = await supabase.storage
      .from('profile_images')
      .upload(filepath, fileBase64, {
        contentType: file.mimetype,
      });
    if (error) {
      console.error("Error uploading profile image: " + error.message);
      return null;
    }

    var { data, error } = await supabase.storage
      .from('profile_images')
      .getPublicUrl(filepath);
    if (error) {
      console.error("Error getting public URL: " + error.message);
      return null;
    }

    return data.publicUrl;
  }
}

module.exports = ProfileImageModel;
