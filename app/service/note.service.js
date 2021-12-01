/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : get the values from the controller and process them for the notes in fundo notes                
 * 
 * @file            : note.service.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 1-2-2019
 * 
 **************************************************************************/

const {
  createNote,
  findNotes,
  findSingleNote,
  findSingleNoteAndUpdate,
  findAndRemove,
} = require("../models/note.models.js");

/**
 * @description extracting details to create a new note in the model
 * @param {String} title
 * @param {String} content
 * @param {callback} callback
 * @param {String} userId
 * @returns error or data
 */
const createNewNote = (title, content,color,userId, callback) => {
  createNote(title, content, color,userId,(error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description find all notes
 * @param {callback} callback
 * @param {String} userId
 * @returns error or data
 */
const findAllNotes = (userId,callback) => {
  findNotes(userId,(error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description find a single note
 * @param {String} userId
 * @param {String} findId
 * @param {callback} callback
 */
const findNote = (userId,findId, callback) => {
  findSingleNote(userId,findId, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description Find note and update it with the request body
 * @param {String} findId
 * @param {String} title
 * @param {String} content
 * @param {String} userId
 * @param {callback} callback
 */
const updateNote = (findId, title, content, color,image,userId, isTrash, callback) => {
  findSingleNoteAndUpdate(findId, title, content, color,image,userId,isTrash, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description delete a note
 * @param {String} findId
 * @param {String} userId
 * @param {callback} callback
 */
const deleteById = (findId, userId,callback) => {
  findAndRemove(findId, userId,(error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

module.exports = {
  createNewNote,
  findAllNotes,
  findNote,
  updateNote,
  deleteById,
};
