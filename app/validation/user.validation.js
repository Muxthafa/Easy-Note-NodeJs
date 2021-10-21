const { userSchema } = require("./user.schema.js");

/**
 * @description middleware which validates user data against defined schema for user
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @returns 
 */
module.exports = (req, res, next) => {
  const value = userSchema.validate(req.body);
  if (value.error) {
    return res.json({ success: 0, message: value.error.message });
  }
  next();
};
