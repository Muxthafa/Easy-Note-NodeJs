const express = require("express");
const router = express.Router(); //middleware creates route handler

const notes = require("../controllers/note.controller.js");
const {
  validateNote,
  authorizeUser,
} = require("../middleware/note.middleware.js");

//create a new note
router.post("/", authorizeUser, validateNote, notes.create);

//Retrieve all Notes
router.get("/", authorizeUser, notes.findAll);

//Retrieve a single Note with noteId
router.get("/:noteId", authorizeUser, notes.findOne);

//Update a Note with noteId
router.put("/:noteId", authorizeUser, validateNote, notes.update);

//Delete a Note with noteId
router.delete("/:noteId", authorizeUser, notes.deleteOne);

module.exports = router; //exports the Router object
