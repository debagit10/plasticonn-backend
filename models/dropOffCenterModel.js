const mongoose = require("mongoose");

const dropOffCenterSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    person: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    operatingHours: { type: String, required: true },
    centerID: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: false,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    deleted: { type: Boolean, default: false },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const DropOffCenter = mongoose.model("DropOffCenter", dropOffCenterSchema);

module.exports = DropOffCenter;
