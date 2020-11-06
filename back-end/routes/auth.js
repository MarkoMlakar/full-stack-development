var express = require("express");
var router = express.Router();
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res, next) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  let userObject = {
    username: req.body.username,
    password: hashPassword,
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    description: req.body.description,
    age: req.body.age,
    gender: req.body.gender,
    profession: req.body.profession,
  };

  try {
    await new User().save(userObject);
    res.json({
      status: true,
      msg: "User successfully registered",
    });
  } catch (err) {
    res.json({
      statusCode: res.status(400).statusCode,
      msg: "Error while registering new user",
      result: err,
    });
  }
});

module.exports = router;
