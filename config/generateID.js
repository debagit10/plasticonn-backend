const generateID = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * characters.length);
    id += characters[random];
  }
  return id;
};

module.exports = generateID;
