const router = require("express").Router();
const {
  registerCenter,
  loginCenter,
  deleteCenter,
  updateCenter,
  changePassword,
} = require("../controllers/dropOffCenterController");

router.post("/register", registerCenter);
router.post("/login", loginCenter);
router.delete("/delete", deleteCenter);
router.patch("/update", updateCenter);
router.patch("/changePassword", changePassword);

module.exports = router;
