const { verifyToken, decryptToken } = require("../config/token");

const authUser = (req, res) => {
  const {
    body: { encryptedToken },
  } = req;

  try {
    if (!encryptedToken) {
      return res.status(400).json({ error: "No token provided" });
    }

    const decryptedToken = decryptToken(encryptedToken);
    // Consider removing or sanitizing this log in production

    const verificationResult = verifyToken(decryptedToken);

    if (verificationResult.error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    res.status(200).json({ success: verificationResult });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = authUser;
