const express = require("express");
const router = express.Router(); //middleware creates route handler
const multer = require('multer');
const { error } = require("winston");

const fileStorageEngine = multer.diskStorage({
  destination:(req,file,callback) => {
    callback(null,"uploads/")
  },
  filename:(req,file,callback) => {
    callback(null,Date.now()+"-"+file.originalname)
  }
})

const upload = multer({ storage: fileStorageEngine}).single('image')

const notes = require("../controllers/note.controller.js");
const {
  validateNote,
  authorizeUser,
} = require("../middleware/note.middleware.js");

router.post('/image',authorizeUser, (req,res,next)=> {
  upload(req,res,(error)=>{
    if(error){
      console.log(error);
      res.status(400).send(error)
    }else{
      console.log(req.file);
      res.status(200).send(req.file)
    }
  }
)})
//create a new note
router.post("/", authorizeUser, validateNote, notes.create);

//Retrieve all Notes
router.get("/", authorizeUser, notes.findAll);

//Retrieve a single Note with noteId
router.get("/:noteId", authorizeUser, notes.findOne);

//Update a Note with noteId
router.put("/:noteId", authorizeUser, validateNote, notes.update);

//Delete a Note with noteId
router.delete("/:noteId", authorizeUser, notes.deleteOne);

module.exports = router; //exports the Router object
