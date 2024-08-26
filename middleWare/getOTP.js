const { generateOtp, storeOtp } = require("../config/otp");
const Collector = require("../models/collectorModel");
const DropOffCenter = require("../models/dropOffCenterModel");

const getOTP = async (req, res) => {
  const email = req.body;
  const collector = await Collector.findOne(email);
  const center = await DropOffCenter.findOne(email);

  if (!collector && !center) {
    res.status(401).json({ error: "Invalid email" });
  } else {
    const otp = generateOtp();

    const stored = await storeOtp(email.email, otp);
    res.json(stored);
  }
};

module.exports = getOTP;
