const { generateOtp, storeOtp } = require("../config/otp");
const Collector = require("../models/collectorModel");

const getOTP = async (req, res) => {
  const email = req.body;
  const user = await Collector.findOne(email);

  if (!user) {
    res.status(401).json({ error: "Invalid email" });
  } else {
    const otp = generateOtp();

    const stored = await storeOtp(email.email, otp);
    res.json(stored);
  }
};

module.exports = getOTP;
