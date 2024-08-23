const Collect = require("../models/collectModel");
const Collector = require("../models/collectorModel");

const collect = async (req, res) => {
  const {
    body: collectData,
    query: { token },
  } = req;

  try {
    const collector = await Collector.findOne({ token });
    if (!collector) {
      return res.status(404).json({ error: "Collector not found" });
    }

    const newCollect = await Collect.create({
      ...collectData,
      collectorID: collector.collectorID,
    });

    if (newCollect) {
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
