const mongoose = require("mongoose");

const collectSchema = mongoose.Schema(
  {
    type: { type: [String], required: true },
    location: { type: [Number], required: true },
    collectorID: { type: String, required: true },
    centerID: { type: String, required: true },
    condition: { type: String, required: true },
  },
  { timestamps: true }
);

const Collect = mongoose.model("collect", collectSchema);

module.exports = Collect;
