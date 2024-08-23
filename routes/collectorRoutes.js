const router = require("express").Router();
const {
  registerCollector,
  loginCollector,
  deleteCollector,
  updateCollector,
  changePassword,
  collectorHistory,
} = require("../controllers/collectorController");

router.post("/register", registerCollector);
router.post("/login", loginCollector);
router.delete("/delete", deleteCollector);
router.patch("/update", updateCollector);
router.patch("/changePassword", changePassword);
router.get("/changePassword", collectorHistory);

module.exports = router;
