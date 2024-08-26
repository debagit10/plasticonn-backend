const Drop = require("../models/dropModel");
const Collector = require("../models/collectorModel");
const Center = require("../models/dropOffCenterModel");

const drop = async (req, res) => {
  const { body: collectData, token: token } = req;

  try {
    const collector = await Collector.findOne({ token });

    if (!collector) {
      return res.status(404).json({ error: "Collector not found" });
    }

    const newCollect = await Drop.create({
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

const manageDrop = async (req, res) => {
  const { dropID, status } = req.body;

  const token = req.token;

  try {
    const center = await Center.findOne({ token });
    if (!center) {
      return res.status(404).json({ error: "Drop-off center not found" });
    }

    const drop = await Drop.findById(
      dropID,
      { accepted: status },
      { new: true, runValidators: true }
    );

    if (drop) {
      res.status(200).json(drop);
    } else {
      res.status(500).json({ error: "No data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const viewDrop = async (req, res) => {
  const { dropID } = req.body;
  const token = req.token;

  try {
    const collector = await Collector.findOne({ token });
    const center = await Center.findOne({ token });

    // if (!collector && !center) {
    //   return res.status(404).json({ error: "Collector not found" });
    // } else if (!center) {
    //   return res.status(404).json({ error: "Center not found" });
    // }

    if (!collector && !center) {
      return res.status(404).json({ error: "User not found" });
    }

    const drop = await Drop.findById(dropID);
    if (!drop) {
      return res.status(404).json({ error: "Drop not found" });
    }
    return res.status(200).json(drop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { drop, viewDrop, manageDrop };
