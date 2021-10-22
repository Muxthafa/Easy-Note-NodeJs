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
const createNewNote = (title, content,userId, callback) => {
  createNote(title, content, userId,(error, data) => {
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
const updateNote = (findId, title, content, userId, callback) => {
  findSingleNoteAndUpdate(findId, title, content, userId, (error, data) => {
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
