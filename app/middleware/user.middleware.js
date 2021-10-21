module.exports = (req, res, next) => {
  //name validation
  let nameRegex = new RegExp("^[A-Z][a-zA-Z]{2,}");
  if (!nameRegex.test(req.body.name)) {
    return res.status(400).send({
      message:
        "First letter of name must be in uppercase and should be minimum of length 3",
    });
  }

  //age validation
  if (req.body.age < 1 || req.body.age > 100) {
    return res.status(400).send({
      message: "Enter correct age",
    });
  }

  //phone number validation
  let phoneRegex = new RegExp("^([0-9]{0,3}?)[  ]?([234789]{1})([0-9]{9})$");
  if (!phoneRegex.test(req.body.phone)) {
    return res.status(400).send({
      message: "Enter a valid phone number",
    });
  }

  //email validation
  let emailRegex = new RegExp(
    "^[a-zA-Z0-9-_+]+(\\.?[a-zA-Z0-9-_]+)@[a-zA-Z0-9-_]+\\.[a-zA-Z]{2,}(\\.?[a-zA-Z-_]+)$"
  );
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).send({
      message: "Enter a valid email ID",
    });
  }
  next();
};
