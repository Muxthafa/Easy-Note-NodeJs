const {createNewNote,findAllNotes,findNote,updateNote,deleteById} =require('../service/note.service.js')

// Create a Note
const create = (req,res) => {
    let title = req.body.title || "Untitled Note"
    let content = req.body.content
    var newNote =  createNewNote(title,content)

    newNote.then(result => {
        res.status(200).json({
            message: 'created note successfully',
            createdNote: {
                title : req.body.title,
                content: req.body.content,
                _id: req.body.id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/notes/'+result._id
                }
            }    
        })
    }).catch(err => {
        res.status(500).send({
        message: err.message || "Some error occurred while creating the Note."
        });
    })
}

// Retrieve and return all notes from the database.
const findAll = (req,res) => {
    let notes = findAllNotes()
    notes.then(result => {
        const response = {
            count: result.length,
            Notes: result.map(note =>{
                return {
                    title: note.title,
                    content: note.content,
                    _id: note._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/notes/'+note._id
                    }
                }
            })
        }
        res.status(200).json(response)
    }).catch(err => {
        res.status(500).send({
        message: err.message || "Some error occurred while creating the Note."
        });
    })
}

// Find a single note with a noteId
const findOne = (req,res) => {
    let id = req.params.noteId
    let oneNote = findNote(id)
    oneNote.then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + id
            });            
        }
        res.send({Note:note})
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + id
            });                
        }
            return res.status(500).send({
                message: "Error retrieving note with id " + id
        });
    });
}

// Update a note identified by the noteId in the request
const update = (req,res) => {
    let id = req.params.noteId
    let title= req.body.title
    let content= req.body.content
    let oneNote = updateNote(id,title,content)
    oneNote.then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + id
            });            
        }
        res.send({Note:note})
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + id
            });                
        }
            return res.status(500).send({
                message: "Error updating note with id " + id
        });
    });
}

// Delete a note with the specified noteId in the request
const deleteOne = (req,res) => {
    let id = req.params.noteId
    let oneNote = deleteById(id)
    oneNote.then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + id
            });            
        }
        res.send({Note:note})
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + id
            });                
        }
            return res.status(500).send({
                message: "Error deleting note with id " + id
        });
    });
}

module.exports = {create,findAll,findOne,update,deleteOne}