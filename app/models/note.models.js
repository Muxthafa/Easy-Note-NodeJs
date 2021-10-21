const mongoose = require("mongoose");

//creation of schema for note collection
const NoteSchema = mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

/**
 * @description Query to create a note
 * @param {String} title
 * @param {String} content
 * @param {callback} callback
 * @returns
 */
const createNote = (title, content, callback) => {
  const note = new Note({
    title: title || "Untitled Note",
    content: content,
  });
  // Save Note in the database
  return note.save({}, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description Query to find all notes
 * @param {callback} callback
 * @returns error or callback
 */
const findNotes = (callback) => {
  return Note.find({}, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description Query to find one specific note
 * @param {String} id
 * @param {callback} callback
 * @returns error or callback
 */
const findSingleNote = (id, callback) => {
  return Note.findById(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * @description Query to find and update note
 * @param {String} id
 * @param {String} title
 * @param {String} content
 * @param {callback} callback
 * @returns
 */
const findSingleNoteAndUpdate = (id, title, content, callback) => {
  return Note.findByIdAndUpdate(
    id,
    { title: title, content: content },
    { new: true },
    (error, data) => {
      return error ? callback(error, null) : callback(null, data);
    }
  );
};

/**
 * @description Query to find and remove a note
 * @param {String} id
 * @param {callback} callback
 * @returns
 */
const findAndRemove = (id, callback) => {
  return Note.findByIdAndDelete(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

module.exports = {
  createNote,
  findNotes,
  findSingleNote,
  findSingleNoteAndUpdate,
  findAndRemove,
};
