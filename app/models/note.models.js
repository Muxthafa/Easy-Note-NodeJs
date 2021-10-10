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

// Create a Note
const createNote = (title, content) => {
  const note = new Note({
    title: title || "Untitled Note",
    content: content,
  });
  // Save Note in the database
  return note.save().then().catch();
};

module.exports = { createNote, Note };
