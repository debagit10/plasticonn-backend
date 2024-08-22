const router = require("express").Router();
const {
  registerCollector,
  loginCollector,
  deleteCollector,
  updateCollector,
  changePassword,
} = require("../controllers/collectorController");

router.post("/register", registerCollector);
router.post("/login", loginCollector);
router.delete("/delete", deleteCollector);
router.patch("/update", updateCollector);
router.post("/changePassword", changePassword);

module.exports = router;
