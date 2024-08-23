const mongoose = require("mongoose");

const dropSchema = mongoose.Schema(
  {
    total: { type: String, required: true },
    type: { type: [String], reuired: true },
    collectorID: { type: String, required: true },
  },
  { timestamps: true }
);

const Drop = mongoose.model("Drop", dropSchema);

module.exports = Drop;
