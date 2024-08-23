const router = require("express").Router();
const { collect } = require("../controllers/collectController");

router.post("/collect", collect);

module.exports = router;
