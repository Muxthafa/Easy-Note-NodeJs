const {createUser,findUsers,findSingleUser,findSingleUserAndUpdate,findAndRemove} = require("../models/user.model.js")

/*function call to create a new user
 *returns a callback
 */
 const createNewUser = (name, age, address,phone,email, callback) => {
    createUser(name, age, address,phone,email, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

/*query to find all the users
 *returns a callback
 */
const findAllUsers = (callback) => {
    findUsers((error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  /*query to find a single user
 *returns a callback
 */
const findUser = (findId, callback) => {
    findSingleUser(findId, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  /* Find user and update it with the request body
 *returns a callback
 */
const updateUser = (findId, name, age,address,phone,email, callback) => {
    findSingleUserAndUpdate(findId, name,age,address,phone, email, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  /*query to delete an user
 *returns a callback
 */
const deleteById = (findId, callback) => {
    findAndRemove(findId, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  module.exports = {createNewUser,findAllUsers,findUser,updateUser,deleteById,findAndRemove}