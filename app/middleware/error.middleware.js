const logger = require("../../config/logger");
const {CustomError} = require('../errors/custom-error')

//middleware which handles global error
module.exports = (error,req,res,next) =>{
  if(error instanceof CustomError){
    logger.error(`${error.message}, error-code: `+error.statusCode);
    return res.status(error.statusCode).json({ msg: error.message})
  }
    logger.error(`${error.message}, error-code: `+error.statusCode);
    return res.status(error.statusCode).json({
      message: error.message,
    })
}