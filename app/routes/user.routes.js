const express = require("express");
const router = express.Router(); //middleware creates route handler
const users = require("../controllers/user.controller.js");
const validate = require("../validation/user.validation.js");

//user login route
router.post("/login", users.login);

//create a new user
router.post("/", validate, users.create);

// Retrieve all users
router.get("/", users.findAll);

// Retrieve a single user with userId
router.get("/:userId", users.findOne);

// Update an user with userId
router.put("/:userId", validate, users.update);

//Delete an User with noteId
router.delete("/:userId", users.deleteOne);

//route implements forgot password link
router.post('/forgot-password', users.forgotUserPassword);

//allows reset password
router.post('/reset/:token', users.resetUserPassword);

module.exports = router; //exports the Router object
