const Collect = require("../models/collectModel");
const Collector = require("../models/collectorModel");

const collect = async (req, res) => {
  const collectData = req.body;

  const token = req.query;

  try {
    const collector = await Collector.findOne({ token: token });
    const collectorID = collector.collectorID;

    const collect = await Collect.create({
      ...collectData,
      collectorID,
    });

    if (collect) {
      res.status(200).json({ success: "Successfully added" });
    } else {
      res.status(500).json({ error: "Failed to add" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { collect };
