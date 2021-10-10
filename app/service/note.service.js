const {createNote,Note} = require('../models/note.models.js');

const createNewNote = (title,content)=>{
    let note = createNote(title,content)    //function call to create a new note with the given title and content
    return note
}

//query to find all notes
const findAllNotes = () =>{
    return Note.find().then().catch()
}

//query to find a single note
const findNote = (findId) => {
    return Note.findById(findId).then().catch()
}

// Find note and update it with the request body
const updateNote = (findId,title,content) => {
    return Note.findByIdAndUpdate(findId,{title:title,content:content}, {new: true}).then().catch()
}

//query to delete a note
const deleteById = (findId) => {
    return Note.findByIdAndRemove(findId).then().catch()
}

module.exports = {createNewNote,findAllNotes,findNote,updateNote,deleteById}