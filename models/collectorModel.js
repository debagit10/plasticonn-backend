const mongoose = require("mongoose");

const collectorSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    idNumber: { type: Number, required: true },
    password: { type: String, required: true },
    collectorID: { type: String, required: true, unique: true },
    pic: {
      type: String,
      required: false,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    deleted: { type: Boolean, default: false },
    token: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Collector = mongoose.model("Collector", collectorSchema);

module.exports = Collector;
