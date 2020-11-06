var express = require("express");
var router = express.Router();
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* POST - Register a new user. */
router.post("/register", async (req, res, next) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let salt, hashPassword;

  try {
    salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(req.body.password, salt);
  } catch (err) {
    res.json({
      statusCode: res.status(400).statusCode,
      msg: "Error with generating password hash",
      result: err,
    });
  }

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

/* POST - User login */
router.post("/login", async (req, res, next) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const user = await new User().where("email", req.body.email).fetch();
    const validUser = await bcrypt.compare(
      req.body.password,
      user.toJSON().password
    );

    if (validUser) {
      const token = jwt.sign(
        { id: user.toJSON().id },
        process.env.TOKEN_SECRET
      );
      res.header("auth-token", token).send(token);
    } else {
      res.json({
        statusCode: res.status(400).statusCode,
        msg: "Incorrect username or password",
      });
    }
  } catch (err) {
    res.json({
      statusCode: res.status(400).statusCode,
      msg: "Incorrect username or password",
    });
  }
});

module.exports = router;
