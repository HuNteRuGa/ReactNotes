const crypto = require("crypto");

module.exports = {
  getSalt: length => {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, length);
  },
  encryptPassword: (salt, password) => {
    return crypto
      .createHmac("sha512", salt)
      .update(password)
      .digest("hex");
  }
};
