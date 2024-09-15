const mongoose = require("mongoose");

const dropSchema = mongoose.Schema(
  {
    type: { type: [String], required: true },
    location: { type: [Number], required: true },
    collectorID: { type: String, required: true },
    centerID: { type: String, required: true },
    condition: { type: String, required: true },
    accepted: { type: String, default: "pending" },
    status: { type: Boolean, default: false },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Drop = mongoose.model("drop", dropSchema);

module.exports = Drop;
