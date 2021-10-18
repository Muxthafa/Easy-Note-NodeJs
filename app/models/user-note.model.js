const mongoose = require("mongoose");

//creation of schema for user note collection
const UserNoteSchema = mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    note: {type: mongoose.Schema.Types.ObjectId, ref: 'Note'},
  },
  {
    timestamps: true,
  }
);

const UserNote = mongoose.model("user-note", UserNoteSchema);

/* Creates a user note
 */
 const createUserNote = (userId,noteId, callback) => {
  const userNote = new UserNote({
    user: userId,
    note: noteId
  });
  // Save User Note in the database
  return userNote.save({}, (error, data) => {
    return error ? callback(error, null) : callback(null, data);
  });
};