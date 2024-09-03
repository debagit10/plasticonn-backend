const { verifyToken, decryptToken } = require("../config/token");

const authUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const clientURL = process.env.CLIENT_URL;

  try {
    if (!token) {
      return res.redirect(clientURL); // Redirect to the landing page if no token is provided
    }

    const decryptedToken = decryptToken(token);
    const verificationResult = verifyToken(decryptedToken);

    if (verificationResult.error || verificationResult.valid === false) {
      return res.redirect(clientURL); // Redirect to the landing page if the token is invalid or expired
    }

    // Store the decrypted token in the req object so the next route can access it
    req.decryptedToken = decryptedToken;

    // Move to the next middleware or route
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.redirect(clientURL); // Redirect to the landing page if there's a server error
  }
};

module.exports = authUser;
