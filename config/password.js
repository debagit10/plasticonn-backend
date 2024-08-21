const argon2 = require("argon2");

const hashPassword = async (password) => {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
};

const verifyPassword = async (hashedPassword, password) => {
  return await argon2.verify(hashedPassword, password);
};

module.exports = { hashPassword, verifyPassword };
