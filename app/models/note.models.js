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
 * Query to create a note
 * @param title 
 * @param content 
 * @param callback 
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
 * Query to find all notes
 * @param callback 
 * @returns 
 */
const findNotes = (callback) => {
  return Note.find({}, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * Query to find one specific note
 * @param id 
 * @param callback 
 * @returns 
 */
const findSingleNote = (id, callback) => {
  return Note.findById(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/**
 * Query to find and update note
 * @param id 
 * @param title 
 * @param content 
 * @param callback 
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
 * Query to find and remove a note
 * @param id 
 * @param callback 
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
