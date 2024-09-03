const router = require("express").Router();
const {
  drop,
  viewDrop,
  manageDrop,
} = require("../controllers/dropControllers");
const authUser = require("../middleWare/authUser");
const checkActiveAccount = require("../middleware/checkActiveAccount.js");

router.post("/add", authUser, checkActiveAccount, drop);
router.get("/view", authUser, checkActiveAccount, viewDrop);
router.patch("/manage", authUser, checkActiveAccount, manageDrop);

module.exports = router;
