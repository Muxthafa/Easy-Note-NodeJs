const mongoose = require("mongoose");

//creation of schema for user collection
const UserSchema = mongoose.Schema(
  {
    name: {type:String, required: true},
    age: {type:Number, required:true, integer: true},
    address: String,
    phone: Number,
    email: {type:String, required:true, unique: true}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

/* Creates a User
 *with given name,age,address,phone &email
 */
const createUser = (userDetails,callback) => {
    const user = new User({
      name: userDetails.name,
      age:userDetails.age,
      address: userDetails.address,
      phone: userDetails.phone,
      email: userDetails.email
    });
    // Save user in the database
    return user.save({}, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  /*find all users
 *returns a callback
 */
const findUsers = (callback) => {
    return User.find({}, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  /*find one specific user
 *user id as a paramter
 *returns a callback
 */
const findSingleUser = (id, callback) => {
    return User.findById(id, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };
  
  /*find and update user
 *name,age,address,phone &email as parameters
 *returns a callback
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

  /*find and remove an user
 *user id as a parameter
 *returns a callback
 */
const findAndRemove = (id, callback) => {
    return User.findByIdAndDelete(id, (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    });
  };

  module.exports = {createUser,findUsers,findSingleUser,findSingleUserAndUpdate,findAndRemove}