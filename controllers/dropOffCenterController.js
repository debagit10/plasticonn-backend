const DropOffCenter = require("../models/dropOffCenterModel");
const { hashPassword, verifyPassword } = require("../config/password");
const {
  generateToken,
  encryptToken,
  decryptToken,
} = require("../config/token");
const generateID = require("../config/generateID");
const { verifyOtp } = require("../config/otp");

const registerCenter = async (req, res) => {
  const centerData = req.body;

  const centerExists = await DropOffCenter.findOne({
    email: centerData.email,
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
    const center = await DropOffCenter.findOne({ email: userData.email });

    if (!center) {
      return res.status(401).json({ error: "Center does not exist" });
    }

    const success = await verifyPassword(center.password, center.password);

    if (!success) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken(center.email);

    await Collector.findByIdAndUpdate(center._id, { token });

    return res
      .status(200)
      .json({ success: "Login successful", token: encryptToken(token) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteCenter = async (req, res) => {
  const centerData = req.query;

  try {
    const center = await DropOffCenter.findOneAndDelete({
      email: centerData.email,
    });
    if (!center) {
      res.status(404).json({ error: "Center not found" });
    } else {
      res.status(200).json({ success: "Account successfully deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateCenter = async (req, res) => {
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

const changePassword = async (req, res) => {
  const centerDetails = req.body;

  const verify = await verifyOtp(centerDetails.email, centerDetails.enteredOtp);

  if (verify.error) {
    res.status(400).json({ error: verify.error });
  }

  if (verify.success) {
    const change = await DropOffCenter.findOneAndUpdate(
      { email: userDetails.email },
      {
        password: await hashPassword(centerDetails.password),
      }
    );
    if (change) {
      // await clearOtp(userDetails.email);

      res
        .status(200)
        .json({ success: "Password changed successfully, go back to login" });
    }
  }
};

module.exports = {
  registerCenter,
  loginCenter,
  deleteCenter,
  updateCenter,
  changePassword,
};
