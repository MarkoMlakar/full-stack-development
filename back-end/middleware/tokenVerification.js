const jwt = require("jsonwebtoken");

/* Middleware function for route access control */
module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.json({
      statusCode: res.status(400).statusCode,
      msg: "Invalid Token",
    });
  }
};
