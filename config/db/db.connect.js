/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 * 
 * @description     : database connection setup               
 * 
 * @file            : db.connect.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbConnect = () => {

  let dbName;
  if(process.env.NODE_ENV == 'test'){
    dbName = process.env.MONGO_URL+process.env.TEST_HOST
  }else if(process.env.NODE_ENV == 'dev'){
    dbName = process.env.MONGO_URL+process.env.DEV_HOST
  }else{ 
    dbName = "mongodb+srv://musthafa:musthafa17@cluster0.tmk6l.mongodb.net/fundooNotes?retryWrites=true&w=majority"
  }

  //connection to mongoDB database
  mongoose
    .connect(dbName, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log("Could not connect to the database. Exiting now...", err);
      logger.error("error in connecting to database");
      process.exit();
    });
};

module.exports = dbConnect;
