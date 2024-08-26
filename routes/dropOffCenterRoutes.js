const router = require("express").Router();
const {
  registerCenter,
  loginCenter,
  deleteCenter,
  updateCenter,
  changePassword,
  dropHistory,
} = require("../controllers/dropOffCenterController");
const authUser = require("../middleWare/authUser");
const checkActiveAccount = require("../middleWare/checkActiveAccount");

router.post("/register", registerCenter);
router.post("/login", loginCenter);
router.delete("/delete", authUser, checkActiveAccount, deleteCenter);
router.patch("/update", authUser, checkActiveAccount, updateCenter);
router.patch("/changePassword", authUser, checkActiveAccount, changePassword);
router.get("/history", authUser, checkActiveAccount, dropHistory);

module.exports = router;
