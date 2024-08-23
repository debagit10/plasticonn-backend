const router = require("express").Router();
const { drop } = require("../controllers/dropController");

router.post("/drop", drop);

module.exports = router;
