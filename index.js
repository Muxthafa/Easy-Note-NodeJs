const express = require("express");
const app = express();

const routesNote = require("./app/routes/note.routes.js");
const routesUser = require("./app/routes/user.routes.js");
const errorHandler = require("./app/middleware/error.middleware.js");
const {createCustomError} = require('./app/errors/custom-error')
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
  next(createCustomError(`Requested URL route ${req.url} is not found`,404))
})

//express middleware global error handler
app.use(errorHandler)

//server creation with port number 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
  dbConnect()
});
