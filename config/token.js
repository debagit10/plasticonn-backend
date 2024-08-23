const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const generateToken = (email) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  // Payload as an object
  const payload = { email };

  try {
    return jwt.sign(payload, secretKey, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

const verifyToken = (encryptedToken) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    const decode = jwt.verify(encryptedToken, secretKey, {
      algorithms: ["HS256"],
    });
    return { valid: true, expired: false, decode };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return { valid: false, expired: true, decoded: null };
    } else {
      return { valid: false, expired: false, decoded: null };
    }
  }
};

const encryptToken = (token) => {
  const secretKey = process.env.CRYPTO_SECRET_KEY;

  if (!token) {
    return { error: "No token provided" };
  }

  try {
    const cipherText = CryptoJS.AES.encrypt(token, secretKey).toString();
    return { encryptedToken: cipherText };
  } catch (error) {
    console.error("Encryption error:", error);
    return { error: "Server error" };
  }
};

const decryptToken = (encryptedToken) => {
  try {
    const secretKey = process.env.CRYPTO_SECRET_KEY;

    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);

    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedToken) {
      throw new Error("Decryption produced an empty result");
    }

    return decryptedToken;
  } catch (error) {
    console.error("Decryption error:", error.message);
    throw new Error("Failed to decrypt token");
  }
};

module.exports = { generateToken, encryptToken, decryptToken, verifyToken };
