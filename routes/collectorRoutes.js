const router = require("express").Router();
const { registerUser } = require("../controllers/collectorController");

router.post("/register", registerUser);

module.exports = router;
