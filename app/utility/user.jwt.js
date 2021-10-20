const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

/**
 * Generates token for the user
 * @param data 
 * @returns object containing message&token
 */
const createToken = (email,id) => {
  const token = jwt.sign({ id, email }, process.env.PRIVATE_KEY, {
    expiresIn: "1d",
  });
  return {
    message: "Auth successful",
    token: token,
  };
};

/**
 * Verifies the token to authorize user
 * @param token 
 * @param callback 
 */
const verifyToken = (token, callback) => {
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    return err ? callback(err, null) : callback(null, decoded);
  });
};

module.exports = { createToken, verifyToken };
