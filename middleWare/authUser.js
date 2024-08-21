const { verifyToken, decryptToken } = require("../config/token");

const authUser = (req, res) => {
  const encryptedToken = req.body;

  try {
    if (!encryptedToken) {
      res.status(400).json({ error: "No token" });
    } else {
      const decryptedToken = decryptToken(encryptedToken);
      console.log(decryptedToken);
      const verify = verifyToken(decryptedToken);
      res.json(verify);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = authUser;
