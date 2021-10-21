const {
  createNewNote,
  findAllNotes,
  findNote,
  updateNote,
  deleteById,
} = require("../service/note.service.js");
const logger = require("../../config/logger");
const { createCustomError } = require("../error-handler/custom-error");

/**
 * @description handles request response for creating a Note
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const create = (req, res, next) => {
  let title = req.body.title;
  let content = req.body.content;
  createNewNote(title, content, (error, data) => {
    if (error) {
      return next(
        createCustomError("Error occurred while creating the Note.", 500)
      );
    }
    res.status(200).json({
      message: "created note successfully",
      createdNote: {
        request: {
          type: "GET",
          url: "http://localhost:3000/notes/" + data._id,
        },
      },
    });
  });
};

/**
 * @description handles request response for retrieving all notes from the database.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const findAll = (req, res, next) => {
  findAllNotes((error, data) => {
    if (error) {
      return next(
        createCustomError("Error occurred while fetching all notes", 500)
      );
    }
    if (!data) {
      res.status(404).send({
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

/**
 * @description handles request response for finding a single note with a noteId
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const findOne = (req, res, next) => {
  let id = req.params.noteId;
  findNote(id, (error, data) => {
    if (error) {
      return next(createCustomError(`no note found with id: ${id}`, 500));
    }
    if (!data) {
      res.status(404).send({
        message: "no data found",
      });
    }
    res.status(200).send({ Note: data });
  });
};

/**
 * @description handles request response for updating a note identified by the noteId in the request
 * @param {Object} req
 * @param {Object} res
 */
const update = (req, res) => {
  let id = req.params.noteId;
  let title = req.body.title;
  let content = req.body.content;
  updateNote(id, title, content, (error, data) => {
    if (error) {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id (catch)" + id,
        });
      }
      return next(error);
    }
    if (!data) {
      res.status(404).send({
        message: "no data found",
      });
    }
    res.status(200).send({ Note: data });
  });
};

/**
 * @description handles request response for deleting a note with the specified noteId in the request
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const deleteOne = (req, res, next) => {
  let id = req.params.noteId;
  deleteById(id, (error, data) => {
    if (error) {
      return next(
        createCustomError(`could not delete the note with id: ${id}`, 500)
      );
    }
    if (!data) {
      res.status(404).send({
        message: "no data found",
      });
    }
    res.status(200).send({ Note: data });
  });
};

module.exports = { create, findAll, findOne, update, deleteOne };
