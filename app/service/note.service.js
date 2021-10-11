const {
  createNote,
  findNotes,
  findSingleNote,
  findSingleNoteAndUpdate,
  findAndRemove,
} = require("../models/note.models.js");

/*function call to create a new note with the given title and content
 *returns a callback
 */
const createNewNote = (title, content, callback) => {
  createNote(title, content, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*query to find all notes
 *returns a callback
 */
const findAllNotes = (callback) => {
  findNotes((error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*query to find a single note
 *returns a callback
 */
const findNote = (findId, callback) => {
  findSingleNote(findId, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/* Find note and update it with the request body
 *returns a callback
 */
const updateNote = (findId, title, content, callback) => {
  findSingleNoteAndUpdate(findId, title, content, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*query to delete a note
 *returns a callback
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
