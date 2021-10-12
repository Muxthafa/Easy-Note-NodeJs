const mongoose = require("mongoose");

//creation of schema for user collection
const UserSchema = mongoose.Schema(
  {
    name: {type:String, required: true},
    age: {type:Number, required:true, integer: true},
    address: String,
    phone: Number,
    email: String
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

/* Creates a User
 *with given name,age,address,phone &email
 */
const createUser = (name, age, address,phone,email,callback) => {
    const user = new User({
      name: name,
      age:age,
      address:address,
      phone:phone,
      email:email
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
const findSingleUserAndUpdate = (id,name, age, address,phone,email, callback) => {
    return User.findByIdAndUpdate(
      id,
      { name: name, age: age, address:address, phone:phone, email:email},
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