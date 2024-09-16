const { files, pics } = require("../controllers/uploadController");
//const { uploadFiles, uploadPics } = require("../middleware/uploadMiddleWare");
const router = require("express").Router();

router.post("/file", files);
router.post("/pics", pics);

module.exports = router;
