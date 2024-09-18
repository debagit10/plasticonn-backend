const DropOffCenter = require("../models/dropOffCenterModel");
const Drop = require("../models/dropModel");
const { hashPassword, verifyPassword } = require("../config/password");
const { generateToken, encryptToken } = require("../config/token");
const generateID = require("../config/generateID");
const { verifyOtp } = require("../config/otp");

const registerCenter = async (req, res) => {
  const centerData = req.body;

  const centerExists = await DropOffCenter.findOne({
    email: centerData.email,
    deleted: false,
  });

  try {
    if (!centerExists) {
      const register = await DropOffCenter.create({
        ...centerData,
        password: await hashPassword(centerData.password),
        token: generateToken(centerData.email),
        centerID: generateID(8),
      });

      if (register) {
        res.status(201).json({
          success: "Registration successful",
          token: encryptToken(register.token),
          userID: register._id,
        });
      } else {
        res.status(500).json({ error: "Registration failed" });
      }
    } else {
      res.status(409).json({ info: "Center with this email exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginCenter = async (req, res) => {
  const userData = req.body;

  try {
    const center = await DropOffCenter.findOne({
      $or: [{ email: userData.email }, { centerID: userData.centerID }],
    });

    if (!center) {
      return res.status(401).json({ error: "Center does not exist" });
    }

    if (center.deleted === true) {
      return res.status(404).json({ error: "Account deleted" });
    }

    const success = await verifyPassword(center.password, userData.password);

    if (!success) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken(center.email);

    await DropOffCenter.findByIdAndUpdate(center._id, { token });

    return res.status(200).json({
      success: "Login successful",
      token: encryptToken(token),
      userID: center._id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteCenter = async (req, res) => {
  const token = req.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    const center = await DropOffCenter.findOne({ token, deleted: false });
    if (!center) {
      return res.status(404).json({ error: "Center not found" });
    }

    const user = await DropOffCenter.findOneAndUpdate(
      { email: center.email },
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
const updateCenter = async (req, res) => {
  const token = req.token;
  const updatedData = req.body;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    const center = await DropOffCenter.findOne({ token });
    if (!center) {
      return res.status(404).json({ error: "Center not found" });
    }

    const update = await DropOffCenter.findOneAndUpdate(
      { email: center.email },
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

const changePassword = async (req, res) => {
  try {
    const userDetails = req.body;
    const token = req.token;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid or missing token" });
    }

    const center = await DropOffCenter.findOne({ token });
    if (!center) {
      return res.status(404).json({ error: "Center not found" });
    }

    const verify = await verifyOtp(center.email, userDetails.enteredOtp);

    if (verify.error) {
      return res.status(400).json({ error: verify.error });
    }

    if (verify.success) {
      const change = await DropOffCenter.findOneAndUpdate(
        { email: center.email },
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

const dropHistory = async (req, res) => {
  const token = req.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    const dropOffCenter = await DropOffCenter.findOne({ token });
    if (!dropOffCenter) {
      return res.status(404).json({ error: "Drop-off center not found" });
    }

    const history = await Drop.find({ centerID: dropOffCenter.centerID });

    if (history.length === 0) {
      return res.status(400).json({ error: "No drop history found" });
    }

    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const dropOffCenterData = async (req, res) => {
  try {
    const token = req.token;
    const user = await DropOffCenter.findOne({ token });
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

const getAllCenters = async (req, res) => {
  try {
    const token = req.token;
    if (token) {
      const centers = await DropOffCenter.find({ deleted: false });
      if (!centers) {
        res.status(404).json({ error: "Centers not found" });
      } else {
        res.status(200).json(centers);
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error getting centers", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerCenter,
  loginCenter,
  deleteCenter,
  updateCenter,
  changePassword,
  dropHistory,
  dropOffCenterData,
  getAllCenters,
};
