/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : get the request, response object from note routes               
 * 
 * @file            : note.controller.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const {
  createNewNote,
  findAllNotes,
  findNote,
  updateNote,
  deleteById,
} = require("../service/note.service.js");
const logger = require("../../config/logger");
const { createCustomError } = require("../error-handler/custom-error");
const { handleImage } = require('../utility/note.image.js')

/**
 * @description handles request response for creating a Note
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const create = (req, res, next) => {
  let title = req.body.title;
  let content = req.body.content;
  let color = req.body.color;
  let userId = req.body.userId
  createNewNote(title, content,color, userId ,(error, data) => {
    if (error) {
      return next(
        createCustomError("Error occurred while creating the Note.", 500)
      );
    }
    logger.info(`Created a new note ${data._id}`);
    return res.status(200).json({
      message: "created note successfully",
      createdNote: {
        request: {
          type: "POST",
          url: "http://localhost:3000/notes/"
        },
        Note: data,
      },
      
    });
  });
};

/**
 * @description handles request response for uploading image
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
 const image = (req, res, next) => {
    handleImage(req,res, (error, data) => {
      if(error){
        res.status(400).send(error)
      }else{
        res.status(200).send(req.file)
      }
    })
};

/**
 * @description handles request response for retrieving all notes from the database.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const findAll = (req, res, next) => {
  findAllNotes(req.body.userId,(error, data) => {
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
    logger.info(`responded with all notes`)
    const response = {
      count: data.length,
      Notes: data.map((note) => {
        return {
          title: note.title,
          content: note.content,
          _id: note._id,
          isTrash: note.isTrash,
          color: note.color,
          image: note.image,
          userId: note.userId,
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
  let userId = req.body.userId
  findNote(userId,id, (error, data) => {
    if (error) {
      return next(createCustomError(`no note found with id: ${id}`, 500));
    }
    if (!data) {
      res.status(404).send({
        message: "no data found",
      });
    }
    logger.info(`responded with the note ${data._id}`)
    res.status(200).send({ Message: "Note found!!!",Note: data });
  });
};

/**
 * @description handles request response for updating a note identified by the noteId in the request
 * @param {Object} req
 * @param {Object} res
 */
const update = (req, res, next) => {
  let id = req.params.noteId;
  let title = req.body.title;
  let content = req.body.content;
  let isTrash = req.body.isTrash;
  let color = req.body.color;
  let image = req.body.image;
  let userId = req.body.userId;
  updateNote(id, title, content, color, image,userId, isTrash,(error, data) => {
    if (error) {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id (catch)" + id,
        });
      }
      return next(createCustomError(`no note found with id: ${id}`, 500));
    }
    
    if (!data) {
     return res.status(404).send({
        message: "no data found",
      });
    }
    logger.info(`Updated the note ${data._id}`)
    return res.status(200).send({ Message: "Note updated successfully",Note: data });
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
  let userId = req.body.userId
  deleteById(id, userId, (error, data) => {
    if (error) {
      return next(
        createCustomError(`could not delete the note with id: ${id}`, 500)
      );
    }
    if (!data) {
     return res.status(404).send({
        message: "no note found",
      });
    }
    logger.info(`deleted the note ${data._id}`)
    return res.status(200).send({ message: "Note deleted successfully", Note: data });
  });
};

module.exports = { create, findAll, findOne, update, deleteOne, image };
