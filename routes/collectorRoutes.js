const router = require("express").Router();
const {
  registerCollector,
  loginCollector,
  deleteCollector,
  updateCollector,
  changePassword,
  collectorHistory,
  collectorData,
} = require("../controllers/collectorController");
const authUser = require("../middleWare/authUser");
const checkActiveAccount = require("../middleWare/checkActiveAccount");

router.post("/register", registerCollector);
router.post("/login", loginCollector);
router.delete("/delete", authUser, checkActiveAccount, deleteCollector);
router.patch("/update", authUser, checkActiveAccount, updateCollector);
router.patch("/changePassword", authUser, checkActiveAccount, changePassword);
router.get("/history", authUser, checkActiveAccount, collectorHistory);
router.get("/userData", authUser, checkActiveAccount, collectorData);

module.exports = router;
