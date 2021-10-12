const mongoose = require("mongoose");
const dbConfig = require("../database.config.js");

const dbConnect = () => {
    //connection to mongoDB database
    mongoose
      .connect(dbConfig.url, {
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

  module.exports = dbConnect