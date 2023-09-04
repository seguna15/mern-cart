const crypto = require("crypto");

const  generateRandomString = (length) => {
  return crypto.randomBytes(length).toString("hex");
}

module.exports =  secretKey = generateRandomString(32);

//module.exports = secretKey;

