const supabase = require("../libs/supabase.js");
const path = require("path");

const ProfileImageModel = {
  async upload(file) {
    const { error } = await supabase.storage
      .from('profile_images')
      .upload(`/uploads/${file.originalname}`, path.join(__dirname, "../../public/uploads/", file.originalname));
    if (error) {
      console.error("Error uploading profile image: " + error.message);
    }
  }
}

module.exports = ProfileImageModel;
