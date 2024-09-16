const { files, pics } = require("../controllers/uploadController");
const { uploadFiles, uploadPics } = require("../upload");
const router = require("express").Router();

router.post("/file", uploadFiles, files);
router.post("/pics", uploadPics, pics);

module.exports = router;
