/**
 * CustomError extends the error class
 * overrides the parent error class message
 */
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * @description method with parameters overrites the Error class message
 * @param {Object} message 
 * @param {integer} statusCode 
 * @returns 
 */
const createCustomError = (message, statusCode) => {
  return new CustomError(message, statusCode);
};

module.exports = { createCustomError, CustomError };
