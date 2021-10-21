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
 * @returns error or data
 */
const createNewNote = (title, content, callback) => {
  createNote(title, content, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description find all notes
 * @param {callback} callback
 * @returns error or data
 */
const findAllNotes = (callback) => {
  findNotes((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description find a single note
 * @param {String} findId
 * @param {callback} callback
 */
const findNote = (findId, callback) => {
  findSingleNote(findId, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description Find note and update it with the request body
 * @param {String} findId
 * @param {String} title
 * @param {String} content
 * @param {callback} callback
 */
const updateNote = (findId, title, content, callback) => {
  findSingleNoteAndUpdate(findId, title, content, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description delete a note
 * @param {String} findId
 * @param {callback} callback
 */
const deleteById = (findId, callback) => {
  findAndRemove(findId, (error, data) => {
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
