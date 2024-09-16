const { files, pics } = require("../controllers/uploadController");
const { uploadFiles, uploadPics } = require("../middleware/upload.js");
const router = require("express").Router();

router.post("/file", uploadFiles, files);
router.post("/pics", uploadPics, pics);

module.exports = router;
