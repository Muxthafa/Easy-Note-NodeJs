/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : get the user details and passes it to validation function                
 * 
 * @file            : user.validation.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

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
