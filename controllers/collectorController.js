const Collector = require("../models/collectorModel");
const { hashPassword, verifyPassword } = require("../config/password");
const {
  generateToken,
  encryptToken,
  decryptToken,
} = require("../config/token");
const generateID = require("../config/generateID");

const registerCollector = async (req, res) => {
  const userData = req.body;

  try {
    const userExists = await Collector.findOne({ email: userData.email });

    if (!userExists) {
      const register = await Collector.create({
        ...userData,
        password: await hashPassword(userData.password),
        token: generateToken(userData.email),
        collectorID: generateID(8),
      });

      if (register) {
        res.status(201).json({
          success: "Registration successful",
          token: encryptToken(register.token),
        });
      } else {
        res.status(500).json({ error: "Registration failed" });
      }
    } else {
      res.status(409).json({ info: "User with this email exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginCollector = async (req, res) => {
  const userData = req.body;

  try {
    const user = await Collector.findOne({ email: userData.email });

    if (!user) {
      return res.status(401).json({ error: "User does not exist" });
    }

    const success = await verifyPassword(user.password, userData.password);

    if (!success) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken(user.email);

    await Collector.findByIdAndUpdate(user._id, { token });

    return res
      .status(200)
      .json({ success: "Login successful", token: encryptToken(token) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteCollector = async (req, res) => {
  const userData = req.query;

  try {
    const user = await Collector.findOneAndDelete({ email: userData.email });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ success: "Account successfully deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateCollector = async (req, res) => {
  const email = req.query;
  const updatedData = req.body;

  try {
    const update = await Collector.findOneAndUpdate(email, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!update) {
      return res.status(404).json({ error: "Update failed" });
    }
    res.status(200).json({ success: "Account successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerCollector,
  loginCollector,
  deleteCollector,
  updateCollector,
};
