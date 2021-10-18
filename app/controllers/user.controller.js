const {
    createNewUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteById,
  } = require("../service/user.service.js");
  const logger = require("../../config/logger");
  const {createCustomError} = require('../errors/custom-error')
  
  /* Creates an user
   *request,response&next as parameters
   *handles the request made on route
   */
  const create = (req, res,next) => {
    let userDetails = {
     name: req.body.name,
     age: req.body.age,
     address: req.body.address,
     phone: req.body.phone,
     email: req.body.email,
    }
    
    createNewUser(userDetails, (error, data) => {
      if (error) 
        return next(createCustomError("Some error occurred while creating the User.",500))
      res.status(200).json({
        message: "created user successfully",
        createdUser: {
            name: data.name,
            age: data.age,
            address: data.address,
            phone: data.phone,
            email: data.email,
          _id: data.id,
          request: {
            type: "GET",
            url: "http://localhost:3000/users/" + data._id,
          },
        },
      });
    });
  };
  
  /* Retrieve and return all users from the database.
   *request,response&next as parameters
   *handles the request made on route
   */
  const findAll = (req, res, next) => {
    findAllUsers((error, data) => {
      if (error) {
        return next(createCustomError("Some error occurred while fetching all the Users.",500))
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
  
  /* Find a single user with a userId
   *request,response&next as parameters
   *handles the request made on route
   */
  const findOne = (req, res, next) => {
    let id = req.params.userId;
    findUser(id, (error, data) => {
      if (error) {
        return next(createCustomError(`error occured while fetching user data with id ${id}`,500))
      }
      if (!data) {
        return res.status(404).send({
          message: "no data found",
        });
      }
      res.send({ User: data });
    });
  };
  
  /* Update a user identified by the userId in the request
   *request&response as parameters
   *handles the request made on route
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
        return next(createCustomError("Some error occurred while Updating the user.",500))
      }
      if (!data) {
        return res.status(500).send({
          message: "no data found",
        });
      }
      res.send({ User: data });
    });
  };
  
  /* Delete a user with the specified userId in the request
   *request&response as parameters
   *handles the request made on route
   */
  const deleteOne = (req, res,next) => {
    let id = req.params.userId;
    deleteById(id, (error, data) => {
      if (error) {
        return next(createCustomError(`could not delete the user with is ${id}`,500))
      }
      if (!data) {
        return res.status(404).send({
          message: "no data found",
        });
      }
      res.send({ User: data });
    });
  };
  
  module.exports = { create, findAll, findOne,update, deleteOne}; 