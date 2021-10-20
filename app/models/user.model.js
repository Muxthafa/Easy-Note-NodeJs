const mongoose = require("mongoose");

//creation of schema for user collection
const UserSchema = mongoose.Schema(
  {
    name: {type:String, required: true},
    age: {type:Number, required:true, integer: true},
    address: String,
    phone: Number,
    email: {type:String, required:true, unique: true},
    password : { type: String , required: true}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

/**
 * Query to create a User
 * @param userDetails 
 * @param callback 
 * @returns 
 */
const createUser = (userDetails,callback) => {
    const user = new User({
      name: userDetails.name,
      age:userDetails.age,
      address: userDetails.address,
      phone: userDetails.phone,
      email: userDetails.email,
      password: userDetails.password
    });
    // Save user in the database
    return user.save({}, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

/**
 * Query to find all users
 * @param callback 
 * @returns 
 */
const findUsers = (callback) => {
    return User.find({}, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

/**
 * Query to find one specific user
 * @param id 
 * @param callback 
 * @returns 
 */
const findSingleUser = (id, callback) => {
    return User.findById(id, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };
  
/**
 * Query to find and update the user
 * @param userDetails 
 * @param callback 
 * @returns 
 */
const findSingleUserAndUpdate = (userDetails, callback) => {
    return User.findByIdAndUpdate(
      userDetails.id,
      { name: userDetails.name, age: userDetails.age, address: userDetails.address, phone: userDetails.phone, email: userDetails.email},
      { new: true },
      (error, data) => {
        return error ? callback(error, null) : callback(null, data);
      }
    );
  };

/**
 * Query to find and remove an userer id as a parameter
 * @param id 
 * @param callback 
 * @returns 
 */
const findAndRemove = (id, callback) => {
    return User.findByIdAndDelete(id, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  /**
   * Query to search the email in the database
   * @param email 
   * @param callback 
   * @returns 
   */
const findEmail = (email, callback) => {
    return User.findOne({email}, (error,data) => {
      return error ? callback(error, null) : callback(null, data);
    })
}

module.exports = {createUser,findUsers,findSingleUser,findSingleUserAndUpdate,findAndRemove, findEmail}