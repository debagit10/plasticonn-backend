const router = require("express").Router();
const {
  registerCenter,
  loginCenter,
  deleteCenter,
  updateCenter,
  changePassword,
  dropHistory,
} = require("../controllers/dropOffCenterController");

router.post("/register", registerCenter);
router.post("/login", loginCenter);
router.delete("/delete", deleteCenter);
router.patch("/update", updateCenter);
router.patch("/changePassword", changePassword);
router.get("/history", dropHistory);

module.exports = router;
