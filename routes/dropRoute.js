const router = require("express").Router();
const {
  drop,
  viewDrop,
  manageDrop,
} = require("../controllers/dropControllers");
const authUser = require("../middleWare/authUser");
//const checkActiveAccount = require("../middleWare/checkActiveAccount");

router.post("/add", authUser, drop);
router.get("/view", authUser, viewDrop);
router.patch("/manage", authUser, manageDrop);

module.exports = router;
