const {
  createNewNote,
  findAllNotes,
  findNote,
  updateNote,
  deleteById,
} = require("../service/note.service.js");
const logger = require("../../config/logger");

/* Creates a Note
 *request&response as parameters
 *handles the request made on route
 */
const create = (req, res) => {
  let title = req.body.title || "Untitled Note";
  let content = req.body.content;
  createNewNote(title, content, (error, data) => {
    if (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Note.",
      });
    }
    res.status(200).json({
      message: "created note successfully",
      createdNote: {
        title: data.title,
        content: data.content,
        _id: data.id,
        request: {
          type: "GET",
          url: "http://localhost:3000/notes/" + data._id,
        },
      },
    });
  });
};

/* Retrieve and return all notes from the database.
 *request&response as parameters
 *handles the request made on route
 */
const findAll = (req, res) => {
  findAllNotes((error, data) => {
    if (error) {
      logger.error("Some error occurred while creating the Note");
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    }
    if (!data) {
      res.status(500).send({
        message: "no data found",
      });
    }
    const response = {
      count: data.length,
      Notes: data.map((note) => {
        return {
          title: note.title,
          content: note.content,
          _id: note._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/notes/" + note._id,
          },
        };
      }),
    };
    logger.info("responded with all notes");
    res.status(200).json(response);
  });
};

/* Find a single note with a noteId
 *request&response as parameters
 *handles the request made on route
 */
const findOne = (req, res) => {
  let id = req.params.noteId;
  findNote(id, (error, data) => {
    if (error) {
      logger.error("note not found with id");
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id (catch)" + id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + id,
      });
    }
    if (!data) {
      res.status(500).send({
        message: "no data found",
      });
    }
    res.send({ Note: data });
  });
};

/* Update a note identified by the noteId in the request
 *request&response as parameters
 *handles the request made on route
 */
const update = (req, res) => {
  let id = req.params.noteId;
  let title = req.body.title;
  let content = req.body.content;
  updateNote(id, title, content, (error, data) => {
    if (error) {
      logger.error("note not found with id");
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id (catch)" + id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + id,
      });
    }
    if (!data) {
      res.status(500).send({
        message: "no data found",
      });
    }
    res.send({ Note: data });
  });
};

/* Delete a note with the specified noteId in the request
 *request&response as parameters
 *handles the request made on route
 */
const deleteOne = (req, res) => {
  let id = req.params.noteId;
  deleteById(id, (error, data) => {
    if (error) {
      logger.error("note not found with id");
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id (catch)" + id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + id,
      });
    }
    if (!data) {
      res.status(500).send({
        message: "no data found",
      });
    }
    res.send({ Note: data });
  });
};

module.exports = { create, findAll, findOne, update, deleteOne };
