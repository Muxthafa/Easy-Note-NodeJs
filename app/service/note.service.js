const {
  createNote,
  findNotes,
  findSingleNote,
  findSingleNoteAndUpdate,
  findAndRemove,
} = require("../models/note.models.js");

/**
 * function call to create a new note with the given title and content
 * @param title 
 * @param content 
 * @param callback 
 */
const createNewNote = (title, content, callback) => {
  createNote(title, content, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * find all notes
 * @param callback 
 */
const findAllNotes = (callback) => {
  findNotes((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * find a single note
 * @param findId 
 * @param callback 
 */
const findNote = (findId, callback) => {
  findSingleNote(findId, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * Find note and update it with the request body
 * @param findId 
 * @param title 
 * @param content 
 * @param callback 
 */
const updateNote = (findId, title, content, callback) => {
  findSingleNoteAndUpdate(findId, title, content, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * delete a note
 * @param findId 
 * @param callback 
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
