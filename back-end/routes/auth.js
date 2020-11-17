var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Token = require("../models/token");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* POST - Register a new user. */
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let hashPassword;

  try {
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(req.body.password, salt);
  } catch (err) {
    res.json({
      statusCode: res.status(400).statusCode,
      msg: "Error with generating password hash",
      result: err,
    });
  }

  const userObject = {
    username: req.body.username,
    password: hashPassword,
    email: req.body.email,
    name: req.body.name,
    surname: req.body.surname,
    description: req.body.description,
    age: req.body.age,
    gender: req.body.gender,
    profession: req.body.profession,
    role_id: 2,
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
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let validUser, user;
  try {
    user = await new User().where("email", req.body.email).fetch();
    validUser = await bcrypt.compare(req.body.password, user.toJSON().password);
  } catch (err) {
    res.json({
      statusCode: res.status(400).statusCode,
      msg: "Incorrect username or password",
    });
  }
  if (validUser) {
    const accessToken = generateAccessToken(user);
    createCookie(res, accessToken, "__act", process.env.ACT_COOKIE_EXPIRES);

    /* Check for existing refresh token */
    try {
      const refreshTokens = await new Token().fetchAll();

      rfToken = refreshTokens.find(
        (token) => token.toJSON().user_id === user.toJSON().id
      );

      /* Check refresh token validation
      TODO: Move to seperate service */
      if (rfToken != null) {
        try {
          jwt.verify(
            rfToken.toJSON().refresh_token,
            process.env.REFRESH_TOKEN_SECRET + user.toJSON().password
          );
          createCookie(
            res,
            rfToken.toJSON().refresh_token,
            "__rft",
            process.env.RFT_COOKIE_EXPIRES
          );
          res.json({
            statusCode: res.status(200).statusCode,
            msg: "Login successful",
          });
        } catch (err) {
          res.json({
            statusCode: res.status(400).statusCode,
            msg: "Refresh token expired",
          });
        }
      } else {
        try {
          const refreshToken = jwt.sign(
            { id: user.toJSON().id },
            process.env.REFRESH_TOKEN_SECRET + user.toJSON().password,
            {
              expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
            }
          );
          createCookie(
            res,
            refreshToken,
            "__rft",
            process.env.RFT_COOKIE_EXPIRES
          );
          await new Token().save({
            user_id: user.toJSON().id,
            refresh_token: refreshToken,
          });
          res.json({
            statusCode: res.status(200).statusCode,
            msg: "Login successful",
          });
        } catch (err) {
          res.json({
            statusCode: res.status(400).statusCode,
            msg: "Could not create refresh token",
          });
        }
      }
    } catch {
      res.json({
        statusCode: res.status(400).statusCode,
        msg: "Error while fetching refresh token",
      });
    }
  } else {
    res.json({
      statusCode: res.status(400).statusCode,
      msg: "Invalid user credentials",
    });
  }
});

/* POST - Create a new access token */
router.post("/access-token", async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return res.json({
      statusCode: res.status(401).statusCode,
      msg: "No refresh token",
    });
  }
  try {
    await new Token().where("refresh_token", refreshToken).fetch();
  } catch (err) {
    res.json({
      statusCode: res.status(403).statusCode,
      msg: "Refresh token not found",
    });
  }
  try {
    const userId = jwt.decode(refreshToken).id;
    const userObj = await new User().where("id", userId).fetch();
    const userPassword = userObj.toJSON().password;

    const user = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET + userPassword
    );
    const accessToken = generateAccessToken(user);
    createCookie(res, accessToken, "__act", process.env.ACCESS_TOKEN_EXPIRES);
    res.json({
      statusCode: res.status(200).statusCode,
      msg: "New access token generated",
    });
  } catch (err) {
    res.json({
      statusCode: res.status(403).statusCode,
      msg: "Could not generate access token",
      error: err,
    });
  }
});

/* DELETE - Invalidate refresh token */
router.delete("/invalidate", async (req, res) => {
  try {
    await new Token().where("refresh_token", req.body.token).destroy();
    res.json({
      statusCode: res.status(204).statusCode,
      msg: "Refresh token invalidated",
    });
  } catch (err) {
    res.json({
      statusCode: res.status(400).statusCode,
      msg: "Cannot invalidate token",
    });
  }
});

// TODO: Move this to sperate file
function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });
}

const createCookie = (res, token, name, expires) => {
  const cookieOption = {
    httpOnly: true,
    expires: new Date(Date.now() + expires * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production" ? true : false,
  };
  return res.cookie(name, token, cookieOption);
};

module.exports = router;
