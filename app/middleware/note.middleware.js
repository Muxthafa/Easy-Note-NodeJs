const { verifyToken } = require("../utility/user.jwt");
const { createCustomError } = require("../error-handler/custom-error");
const validateNote = (req, res, next) => {
  //check if content is present
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty (handled by middleware)",
    });
  }

  //validate title name
  var pattern = new RegExp("(^[a-zA-z]+([\\s][a-zA-Z]+)*$)");
  if (!pattern.test(req.body.title)) {
    return res.status(400).send({
      message: "Note a valid title name",
    });
  } else {
    next();
  }
};

/**
 * @description function to verify user for authentication
 * @param {Object} req
 * @param {Object}  res
 * @param {Object} next
 * @returns
 */
const authorizeUser = (req, res, next) => {
  const headerAuth = req.headers.authorization || req.headers.token;
  if (!headerAuth) return res.status(500).send({ message: "Not authorized" });
  const token = headerAuth.split(" ")[1];
  verifyToken(token, (error, data) => {
    if (error)
      return next(
        createCustomError(
          "Some error occurred while authenticating the user.",
          500
        )
      );
    else next();
  });
};

module.exports = { validateNote, authorizeUser };
