const mongoose = require("mongoose");

const dropSchema = mongoose.Schema(
  {
    type: { type: [String], required: true },
    location: { type: [Number], required: true },
    collectorID: { type: String, required: true },
    centerID: { type: String, required: true },
    condition: { type: String, required: true },
    accepted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Drop = mongoose.model("drop", dropSchema);

module.exports = Drop;
