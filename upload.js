const multer = require("multer");
const {
  plasticonnUserPics,
  plasticonnUserFiles,
} = require("../config/cloudinary");

const picture = multer({ storage: plasticonnUserPics }).single("image");
const file = multer({ storage: plasticonnUserFiles }).single("file");

const uploadPics = (req, res, next) => {
  picture(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // If the file was uploaded successfully, it will be available in req.file
    next();
  });
};

const uploadFiles = (req, res, next) => {
  file(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    next();
  });
};

module.exports = { uploadFiles, uploadPics };
