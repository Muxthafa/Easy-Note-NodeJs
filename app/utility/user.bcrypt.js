const bcrypt = require("bcrypt");

/**
 * @description Encrypts the password using hash and salt(10 characters)
 * @param {String} password
 * @param {callback} callback
 */
const bcryptPass = (password, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      callback(err, null);
    } else {
      return callback(null, hash);
    }
  });
};

/**
 * @description checks if the entered password is true
 * @param {String} password
 * @param {String} passwordHash
 * @param {callback} callback
 */
const verifyPass = (password, passwordHash, callback) => {
  bcrypt.compare(password, passwordHash, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      return result ? callback(null, true) : callback("Invalid Password");
    }
  });
};
module.exports = { bcryptPass, verifyPass };
