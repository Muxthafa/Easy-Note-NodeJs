const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const crypto = require('crypto')

//creation of schema for user collection
const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true, integer: true },
    address: String,
    phone: Number,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

/**
 * @description Query to create a User
 * @param {Object} userDetails
 * @param {callback} callback
 * @returns error or callback
 */
const createUser = (userDetails, callback) => {
  const user = new User({
    name: userDetails.name,
    age: userDetails.age,
    address: userDetails.address,
    phone: userDetails.phone,
    email: userDetails.email,
    password: userDetails.password,
  });
  // Save user in the database
  return user.save({}, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description Query to find all users
 * @param {callback} callback
 * @returns error or callback
 */
const findUsers = (callback) => {
  return User.find({}, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description Query to find one specific user
 * @param {String} id
 * @param {callback} callback
 * @returns error or callback
 */
const findSingleUser = (id, callback) => {
  return User.findById(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description Query to find and update the user
 * @param {Object} userDetails
 * @param {callback} callback
 * @returns error or data
 */
const findSingleUserAndUpdate = (userDetails, callback) => {
  return User.findByIdAndUpdate(
    userDetails.id,
    {
      name: userDetails.name,
      age: userDetails.age,
      address: userDetails.address,
      phone: userDetails.phone,
      email: userDetails.email,
    },
    { new: true },
    (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    }
  );
};

/**
 * @description Query to find and remove an userer id as a parameter
 * @param {String} id
 * @param {callback} callback
 * @returns
 */
const findAndRemove = (id, callback) => {
  return User.findByIdAndDelete(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description Query to search the email in the database
 * @param {String} email
 * @param {callback} callback
 * @returns
 */
const findEmail = (email, callback) => {
  return User.findOne({ email }, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description creates token if email id is found
 * @param {String} email 
 * @returns data or error
 */
const forgotPassword = (email) => {
  return User
    .findOne({ email: email })
    .then((data) => {
      if (!data) {
        throw "Email not found";
      } 
      else 
      {
        let token = crypto.randomBytes(20).toString('hex');
        data.resetPasswordToken = token;
        data.resetPasswordExpires = Date.now() + 3600000;
        return data.save()
        .then(data =>{
          return data;
        })
        .catch(err =>{
          throw err;
        })
        
      }
    })
    .catch((err) => {
      throw err;
    });
};

/**
 * @description if token is valid then resets password
 * @param {String} token 
 * @param {String} newPassword 
 * @returns  error or data
 */
const resetPass = (token, newPassword) => {
  return User
    .findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
    .then((data) => {
      if (!data) {
        throw "token not found";
      } else {
        encryptedPassword = bcrypt.hashSync(newPassword, 10);
        data.password = encryptedPassword
        data.resetPasswordToken = undefined
        return data
          .save()
          .then((data) => {
            return data;
          })
          .catch((err) => {
            throw err;
          });
      }
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  createUser,
  findUsers,
  findSingleUser,
  findSingleUserAndUpdate,
  findAndRemove,
  findEmail,
  forgotPassword,
  resetPass
};
