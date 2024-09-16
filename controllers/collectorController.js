const Collector = require("../models/collectorModel");
const Collect = require("../models/dropModel");
const { hashPassword, verifyPassword } = require("../config/password");
const { generateToken, encryptToken } = require("../config/token");
const generateID = require("../config/generateID");
const { verifyOtp } = require("../config/otp");

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
          userID: register._id,
        });
      } else {
        res.status(500).json({ error: "Registration failed " });
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

    if (user.deleted === true) {
      return res.status(404).json({ error: "Account deleted" });
    }

    const success = await verifyPassword(user.password, userData.password);

    if (!success) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken(user.email);

    await Collector.findByIdAndUpdate(user._id, { token });

    return res.status(200).json({
      success: "Login successful",
      token: encryptToken(token),
      userID: user._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteCollector = async (req, res) => {
  const token = req.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    const collector = await Collector.findOne({ token, deleted: false });
    if (!collector) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = await Collector.findOneAndUpdate(
      { email: collector.email },
      {
        deleted: true,
        deletedAt: new Date(), // Optional: store the deletion time
      },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ error: "Soft delete failed" });
    }

    res.status(200).json({ success: "Account successfully deleted" });
  } catch (error) {
    console.error("Error deleting collector:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateCollector = async (req, res) => {
  const token = req.token;
  const updatedData = req.body;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    const collector = await Collector.findOne({ token });
    if (!collector) {
      return res.status(404).json({ error: "User not found" });
    }

    const update = await Collector.findOneAndUpdate(
      { email: collector.email },
      updatedData,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation is run on updated data
      }
    );

    if (!update) {
      return res.status(400).json({ error: "Update failed" });
    }

    res
      .status(200)
      .json({ success: "Account successfully updated", data: update });
  } catch (error) {
    console.error("Error updating collector:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const collectorHistory = async (req, res) => {
  const token = req.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    const collector = await Collector.findOne({ token });
    if (!collector) {
      return res.status(404).json({ error: "Collector not found" });
    }

    const history = await Collect.find({ collectorID: collector.collectorID });

    if (history.length === 0) {
      return res.status(404).json({ error: "No collection history found" });
    }

    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching collector history:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const userDetails = req.body;
    const token = req.token;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or missing token" });
    }

    const collector = await Collector.findOne({ token });
    if (!collector) {
      return res.status(404).json({ error: "Collector not found" });
    }

    const verify = await verifyOtp(collector.email, userDetails.enteredOtp);

    if (verify.error) {
      return res.status(400).json({ error: verify.error });
    }

    if (verify.success) {
      const change = await Collector.findOneAndUpdate(
        { email: collector.email },
        {
          password: await hashPassword(userDetails.password),
        }
      );

      if (change) {
        return res
          .status(200)
          .json({ success: "Password changed successfully, go back to login" });
      } else {
        return res.status(500).json({ error: "Failed to change password" });
      }
    }
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const collectorData = async (req, res) => {
  try {
    const token = req.token;
    const user = await Collector.findOne({ token });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error displaying user data", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerCollector,
  loginCollector,
  deleteCollector,
  updateCollector,
  changePassword,
  collectorHistory,
  collectorData,
};
