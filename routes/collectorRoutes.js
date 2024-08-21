const router = require("express").Router();
const {
  registerCollector,
  loginCollector,
  deleteCollector,
  updateCollector,
} = require("../controllers/collectorController");

router.post("/register", registerCollector);
router.post("/login", loginCollector);
router.delete("/delete", deleteCollector);
router.patch("/update", updateCollector);

module.exports = router;
