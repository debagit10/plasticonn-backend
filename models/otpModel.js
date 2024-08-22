const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
