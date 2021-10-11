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

/* Creates a Note
 *with given title and content
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

/*find all notes
 *returns a callback
 */
const findNotes = (callback) => {
  return Note.find({}, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*find one specific note
 *note id as a paramter
 *returns a callback
 */
const findSingleNote = (id, callback) => {
  return Note.findById(id, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};

/*find and update note
 *id,title&content as paramters
 *returns a callback
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

/*find and remove a note
 *note id as a parameter
 *returns a callback
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
