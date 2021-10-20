const bcrypt = require('bcrypt');

/**
 * Encrypts the password using hash and salt(10 characters)
 * @param password 
 * @param callback 
 */
const bcryptPass = (password, callback) => {
    bcrypt.hash(password,10, (err,hash) => {
        if(err){
            callback(err,null)
        }else{
            return callback(null,hash)
        }
    })
}

/**
 * checks if the entered password is true
 * @param password 
 * @param passwordHash 
 * @param callback 
 */
const verifyPass = (password,passwordHash, callback) => {
    bcrypt.compare(password,passwordHash, (err,result) => {
        if(err){
            callback(err,null)
        }else{
            return result? callback(null,true) : callback('Invalid Password')
        }
    })
}
module.exports = {bcryptPass, verifyPass}