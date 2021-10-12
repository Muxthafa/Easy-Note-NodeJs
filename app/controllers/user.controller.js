const {
    createNewUser,
    findAllUsers,
    findUser,
    updateUser,
    deleteById,
  } = require("../service/user.service.js");
  const logger = require("../../config/logger");
  
  /* Creates an user
   *request,response&next as parameters
   *handles the request made on route
   */
  const create = (req, res,next) => {
    let name = req.body.name
    let age = req.body.age
    let address = req.body.address
    let phone = req.body.phone
    let email = req.body.email
    createNewUser(name,age,address,phone,email, (error, data) => {
        if (error) 
            return next(error)
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
        return next(error)
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
        return next(error)
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
  const update = (req, res) => {
    let id = req.params.userId;
    let name = req.body.name
    let age = req.body.age
    let address = req.body.address
    let phone = req.body.phone
    let email = req.body.email
    updateUser(id, name,age,address,phone, email, (error, data) => {
      if (error) {
        if (error.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id (catch)" + id,
          });
        }
        return next(error)
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
        return next(error)
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