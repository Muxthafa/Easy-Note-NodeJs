const {
    createNewUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteById,
    findUserEmail
  } = require("../service/user.service.js");
  const logger = require("../../config/logger");
  const {createCustomError} = require('../error-handler/custom-error')
  
 /**
  * authenticates the user
  * @param req 
  * @param res 
  * @param next 
  */
  const login = (req,res,next) => {
    const {email,password} = req.body
    findUserEmail(email,password, (error,data) =>{
      if (error) {
        return next(createCustomError(error,500))
      }
      res.send({ message });
    })
  }

  /**
   * Creates an user
   * @param req 
   * @param res 
   * @param next 
   */
  const create = (req, res,next) => {
    let userDetails = {
     name: req.body.name,
     age: req.body.age,
     address: req.body.address,
     phone: req.body.phone,
     email: req.body.email,
     password: req.body.password
    }
    
    createNewUser(userDetails, (error, data) => {
      if (error) 
        return next(createCustomError("Error occurred while creating the User.",404))
      res.status(200).json({
        message: `created user ${data.name} successfully`,
        request: {
            type: "GET",
            url: "http://localhost:3000/users/" + data._id,
          },
      });
    });
  };

  /**
   * Retrieve and return all users from the database.
   * @param req 
   * @param res 
   * @param next 
   */
  const findAll = (req, res, next) => {
    findAllUsers((error, data) => {
      if (error) {
        return next(createCustomError("Error occurred while fetching all the Users.",404))
      }
      if (!data) {
        res.status(404).send({
          message: "no data found",
        });
      }
      const response = {
        count: data.length,
        Notes: data.map((user) => {
          return {
            name: user.name,
            age: user.age,
            address: user.address,
            phone: user.phone,
            email: user.email,
            password: user.password,
          _id: user.id,
            request: {
              type: "GET",
              url: "http://localhost:3000/users/" + user._id,
            },
          };
        }),
      };
      logger.info("responded with all notes");
      res.status(200).json(response);
    });
  };
  
  /**
   * Find a single user with a userId
   * @param req 
   * @param res 
   * @param next 
   */
  const findOne = (req, res, next) => {
    let id = req.params.userId;
    findUser(id, (error, data) => {
      if (error) {
        return next(createCustomError(`Error occured while fetching user data with id ${id}`,404))
      }
      if (!data) {
        return res.status(404).send({
          message: "no data found",
        });
      }
      res.send({ User: data });
    });
  };
  
  /**
   * Update a user identified by the userId in the request
   * @param req 
   * @param res 
   * @param next 
   */
  const update = (req, res,next) => {
    let userDetails = {
      id: req.params.userId,
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
     }
    updateUser(userDetails, (error, data) => {
      if (error) {
        if (error.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id" +userDetails.id,
          });
        }
        return next(createCustomError("Error occurred while Updating the user.",404))
      }
      if (!data) {
        return res.status(500).send({
          message: "no data found",
        });
      }
      res.send({ User: data });
    });
  };
  
  /**
   * Delete a user with the specified userId in the request
   * @param req 
   * @param res 
   * @param next 
   */
  const deleteOne = (req, res,next) => {
    let id = req.params.userId;
    deleteById(id, (error, data) => {
      if (error) {
        return next(createCustomError(`could not delete the user with is ${id}`,404))
      }
      if (!data) {
        return res.status(404).send({
          message: "no data found",
        });
      }
      res.send({ User: data });
    });
  };
  
  module.exports = { create, findAll, findOne,update, deleteOne, login}; 