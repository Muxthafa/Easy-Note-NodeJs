/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : Creates the token, verifies the token using jwt                
 * 
 * @file            : user.jwt.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

/**
 * @description Generates token for the user
 * @param {Object} data
 * @returns object containing message&token
 */
const createToken = (data) => {
  const token = jwt.sign({ email: data.email , _id: data._id}, process.env.PRIVATE_KEY, {
    expiresIn: "1d",
  });
  return token
};

/**
 * @description Verifies the token to authorize user
 * @param {String} token
 * @param {callback} callback
 */
const verifyToken = (token, callback) => {
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    return err ? callback(err, null) : callback(null, decoded);
  });
};

module.exports = { createToken, verifyToken };
