const argon2 = require("argon2");

const hashPassword = async (password) => {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  return await argon2.verify(password, hashedPassword);
};

module.exports = { hashPassword, verifyPassword };
