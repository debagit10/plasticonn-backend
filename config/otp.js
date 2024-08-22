const otpGenerator = require("otp-generator");
const Otp = require("../models/otpModel");
const Collector = require("../models/collectorModel");
const DropOffCenter = require("../models/dropOffCenterModel");

const generateOtp = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  return otp;
};

const storeOtp = async (email, otp) => {
  const expiresIn = 0.5 * 60 * 1000; // OTP expires in 5 minutes
  const expiresAt = new Date(Date.now() + expiresIn);

  // Remove existing OTP for this email if it exists
  await Otp.findOneAndDelete({ email });

  // Store new OTP
  const otpEntry = new Otp({ email, otp, expiresAt });
  await otpEntry.save();

  return otpEntry;
};

// Verify OTP
const verifyOtp = async (email, otp) => {
  const userExists = await Collector.findOne({ email });
  const centerExists = await DropOffCenter.find({ email });
  const otpEntry = await Otp.findOne({ email });

  if (!userExists || !centerExists) {
    return { error: "Invalid email" };
  }

  if (otpEntry.otp !== otp) {
    return { error: "Invalid OTP" };
  }

  if (new Date() > otpEntry.expiresAt) {
    return { error: "OTP expired" };
  }

  return { success: "OTP verified" };
};

module.exports = { generateOtp, storeOtp, verifyOtp };
