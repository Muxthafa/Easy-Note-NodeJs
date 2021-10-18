/*
*CustomError extends the error class
*overrides the parent error class message
*/ 
class CustomError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (message, statusCode) => {
    return new CustomError(message,statusCode)
}

module.exports = {createCustomError,CustomError}