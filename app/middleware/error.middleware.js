/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : it handles all the errors from controllers               
 * 
 * @file            : error.middleware.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const logger = require("../../config/logger");
const { CustomError } = require("../error-handler/custom-error");

/**
 * @description middleware which handles global error
 * @param {Object} error 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @returns 
 */
module.exports = (error, req, res, next) => {
  if (error instanceof CustomError) {
    logger.error(`${error.message}, error-code: ` + error.statusCode);
    return res.status(error.statusCode).json({ msg: error.message, status: error.statusCode });
  }
  logger.error(`${error.message}, error-code: ` + error.statusCode);
  return res.status(error.statusCode).json({
    message: error.message,
  });
};
