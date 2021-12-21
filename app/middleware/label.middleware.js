/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : Receives data from previous middleware in the label routes                
 * 
 * @file            : label.middleware.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 1-dec-2021
 * 
 **************************************************************************/

const { verifyToken } = require("../utility/user.jwt");
const { createCustomError } = require("../error-handler/custom-error");
const { decode } = require("jsonwebtoken");

const validateLabel = (req, res, next) => {
  //check if title is present
  if (!req.body.title) {
    return res.status(400).send({
      message: "Label title cannot be empty",
    });
  }

  //validate title name
  var pattern = new RegExp("(^[a-zA-z]+([\\s][a-zA-Z]+)*$)");
  if (!pattern.test(req.body.title)) {
    return res.status(400).send({
      message: "Label does not contain a valid title name",
    });
  } else {
    next();
  }
};

/**
 * @description function to verify user for authentication
 * @param {Object} req
 * @param {Object}  res
 * @param {Object} next
 * @returns
 */
const authorizeUser = (req, res, next) => {
  const headerAuth = req.headers.authorization || req.headers.token;
  if (!headerAuth) return res.status(500).send({ message: "Not authorized" });
  const token = headerAuth
  verifyToken(token, (error, data) => {
    if (error){
      return next(
        createCustomError(
          "Error occurred while authenticating the user.",
          500
        )
      );
    }  
    else{
      req.body.userId = data._id
      next()
    }
  });
};

module.exports = { validateLabel, authorizeUser };
