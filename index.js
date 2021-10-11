const express = require("express");
const app = express();
const mongoose = require("mongoose");

const logger = require("./config/logger");
const dbConfig = require("./config/database.config.js");
const routes = require("./app/routes/note.routes.js");

/*
 *middleware function
 *it parses incoming post requests
 */
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

//all requests starting with notes in the URL are handled by routes
app.use("/notes", routes);

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

//server creation with port number 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
  dbConnect();
});
