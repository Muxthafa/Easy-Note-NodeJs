/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : routes for labels             
 * 
 * @file            : label.routes.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 1-dec-2021
 * 
 **************************************************************************/

const express = require("express");
const router = express.Router(); //middleware creates route handler

const labels = require("../controllers/label.controller.js");
const {
  validateLabel,
  authorizeUser,
} = require("../middleware/label.middleware.js");
const { error } = require("winston");

//create a new label
router.post("/", authorizeUser, validateLabel, labels.create);

//Retrieve all labels
router.get("/", authorizeUser, labels.findAll);

//Retrieve a single label with labelId
router.get("/:labelId", authorizeUser, labels.findOne);

//Update a label with labelId
router.put("/:labelId", authorizeUser, validateLabel, labels.update);

//Delete a label with labelId
router.delete("/:labelId", authorizeUser, labels.deleteOne);

module.exports = router; //exports the Router object
