const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const plasticonnUserPics = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "plasticonn users' pics",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const plasticonnUserFiles = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "plasticonn users' files",
    allowedFormats: ["pdf", "docx", "txt"],
  },
});

module.exports = { plasticonnUserFiles, plasticonnUserPics };
