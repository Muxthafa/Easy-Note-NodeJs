const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

/**
 * Generates token for the user
 * @param data 
 * @returns object containing message&token
 */
const createToken = (data) => {
  if (!data)
    return {
      message: "enter the email",
    };
  const { _id, email } = data;

  const token = jwt.sign({ _id, email }, process.env.PRIVATE_KEY, {
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
