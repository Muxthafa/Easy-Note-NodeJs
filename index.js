const express = require("express");
const app = express();

const logger = require("./config/logger");

const routesNote = require("./app/routes/note.routes.js");
const routesUser = require("./app/routes/user.routes.js");
const dbConnect = require("./config/db/db.connect.js")
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
app.use("/notes", routesNote);

//all requests starting with users in the URL are handled by routes
app.use("/users", routesUser);

//all requests apart from /notes handled here
app.all('*',(req,res,next)=>{
  const error = new Error("Requested URL not found")
  console.log("get error");
  error.code = 404
  next(error)
})

//middleware which handles global error
app.use((error,req,res,next) =>{
  logger.error("some error occured");
  const code = error.code || 500
  res.status(code).json({
    message: error.message,
  })
})

//server creation with port number 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
  dbConnect()
});
