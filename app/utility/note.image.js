
const multer = require('multer');


const fileStorageEngine = multer.diskStorage({
  destination:(req,file,callback) => {
    callback(null,"uploads/")
  },
  filename:(req,file,callback) => {
    callback(null,Date.now()+"-"+file.originalname)
  }
})

const upload = multer({ storage: fileStorageEngine}).single('image')

const handleImage = (req,res, callback) => {

    upload(req,res,(error)=>{
        if(error){
          callback(error,null)
        }else{
          callback(null,true)
        }
      })
}

module.exports ={ handleImage }
