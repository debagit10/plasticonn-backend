const Collector = require("../models/collectorModel");
const { hashPassword } = require("../config/password");
const {
  generateToken,
  encryptToken,
  decryptToken,
} = require("../config/token");
const generateID = require("../config/generateID");

const registerUser = async (req, res) => {
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

module.exports = { registerUser };
