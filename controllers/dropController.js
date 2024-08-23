const Drop = require("../models/dropModel");
const Center = require("../models/dropOffCenterModel");

const drop = async (req, res) => {
  const {
    body: dropData,
    query: { token },
  } = req;

  try {
    const center = await Center.findOne({ token });
    if (!center) {
      return res.status(404).json({ error: "Drop-off center not found" });
    }

    const drop = await Drop.create({
      ...dropData,
      centerID: center.centerID,
    });

    if (drop) {
      res.status(200).json({ success: "Drop data added successfully" });
    } else {
      res.status(500).json({ error: "Failed to add data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { drop };
