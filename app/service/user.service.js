const {
  createUser,
  findUsers,
  findSingleUser,
  findSingleUserAndUpdate,
  findAndRemove,
  findEmail,
  forgotPassword,
  resetPass
} = require("../models/user.model.js");
const { createToken } = require("../utility/user.jwt");
const { bcryptPass, verifyPass } = require("../utility/user.bcrypt.js");
const bcrypt = require("bcrypt");
const {sendMail} = require('../utility/nodemailer')

/**
 * @description extracting details to create a new user in the model
 * @param {Object} userDetails
 * @param {callback} callback
 * @returns error or data
 */
const createNewUser = (userDetails, callback) => {
  bcryptPass(userDetails.password, (err, hash) => {
    if (err) {
      callback(err, null);
    } else {
      userDetails = { ...userDetails, password: hash };
      createUser(userDetails, (error, data) => {
        return error ? callback(error, null) : callback(null, data);
      });
    }
  });
};

/**
 * @description find all the users
 * @param {callback} callback
 * @returns error or data
 */
const findAllUsers = (callback) => {
  findUsers((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description extracting id to find user
 * @param {String} findId
 * @param {callback} callback
 * @returns error or data
 */
const findUser = (findId, callback) => {
  findSingleUser(findId, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description extracting user details to update user info
 * @param {Object} userDetails
 * @param {callback} callback
 * @returns error or data
 */
const updateUser = (userDetails, callback) => {
  findSingleUserAndUpdate(userDetails, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description extracting user id to delete an user by passing the userId
 * @param {String} findId
 * @param {callback} callback
 * @returns error or data
 */
const deleteById = (findId, callback) => {
  findAndRemove(findId, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description extracting details to create a token
 * @param {String} email
 * @param {String} password
 * @param {callback} callback
 * @returns error or data
 */
const findUserEmail = (email, password, callback) => {
  findEmail(email, (error, data) => {
    if (data) {
      verifyPass(password, data.password, (error, result) => {
        if (error) {
          callback(error, null);
        } else {
          let token = createToken(data);
          return callback(null, token);
        }
      });
    } else {
      callback("error", null);
    }
  });
};

/**
 * @description extracts details to send the mail
 * @param {String} email 
 * @returns error or data
 */
const forgotPass = (email) =>{
  return forgotPassword(email)
  .then(data => {
    let token = data.resetPasswordToken
    return sendMail(data.email,token)
    .then(data =>{
      data.token = token
      return data
    })
    .catch(err =>{
      throw err
    })
  })
  .catch(err => {
    throw err
  })
}

/**
 * @description extracts details to reset password
 * @param token 
 * @param password 
 * @returns error or data
 */
const resetPassword = (token,password) =>{
  return resetPass(token,password)
  .then(data => {
    return data;
  })
  .catch(err => {
    throw err;
  })
}

module.exports = {
  createNewUser,
  findAllUsers,
  findUser,
  updateUser,
  deleteById,
  findAndRemove,
  findUserEmail,
  forgotPass,
  resetPassword
};
