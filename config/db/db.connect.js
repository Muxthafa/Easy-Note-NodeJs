const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbConnect = () => {
  //connection to mongoDB database
  mongoose
    .connect(process.env.MONGO_URL, {
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
