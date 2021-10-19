const {createUser,findUsers,findSingleUser,findSingleUserAndUpdate,findAndRemove,findEmail} = require("../models/user.model.js")
const {createToken} = require('../utility/user.jwt')

/**
 * create a new user
 * @param userDetails 
 * @param callback 
 */
 const createNewUser = (userDetails, callback) => {
    createUser(userDetails, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

/**
 * find all the users
 * @param callback 
 */
const findAllUsers = (callback) => {
    findUsers((error, data) => {
      console.log(data);
      return error ? callback(error, null) : callback(null, data);
    });
  };

/**
 * find a single user
 * @param findId 
 * @param callback 
 */
const findUser = (findId, callback) => {
    findSingleUser(findId, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

/**
 * Find user and update it with the request body
 * @param userDetails 
 * @param callback 
 */
const updateUser = (userDetails, callback) => {
    findSingleUserAndUpdate(userDetails, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

/**
 * deletes an user by passing the userId
 * @param findId 
 * @param callback 
 */
const deleteById = (findId, callback) => {
    findAndRemove(findId, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

/**
 * find the email exists or not
 * creates token if the email is resent
 * @param email 
 * @param callback 
 */
const findUserEmail = (email, callback) => {
  findEmail(email , (error,data) => {
    return error ? callback(error, null) : callback(null, createToken(data));
  })
}

module.exports = {createNewUser,findAllUsers,findUser,updateUser,deleteById,findAndRemove, findUserEmail}