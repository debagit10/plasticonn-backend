const Collector = require("../models/collectorModel");
const DropOffCenter = require("../models/dropOffCenterModel");

const checkActiveAccount = async (req, res, next) => {
  const token = req.decryptedToken;
  const collector = await Collector.findOne({ token });
  const dropOffCenter = await DropOffCenter.findOne({ token });

  if (collector) {
    if (collector.deleted === true)
      return res.status(404).json({ error: "Account not found or deleted" });
  } else {
    if (dropOffCenter) {
      if (dropOffCenter.deleted === true)
        return res.status(404).json({ error: "Account not found or deleted" });
    }
  }

  if (!collector && !dropOffCenter) {
    return res.status(404).json({ error: "Not found" });
  }

  req.token = token;
  next();
};

module.exports = checkActiveAccount;
