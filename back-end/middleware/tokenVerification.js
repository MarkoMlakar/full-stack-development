const jwt = require("jsonwebtoken");

/* Middleware function for route access control */
module.exports = function (req, res, next) {
  const { cookies } = req;
  const accessToken = cookies.__act;
  if (accessToken == null)
    return res.status(401).send("Access Denied. Please sign in.");

  try {
    const verified_access_token = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = verified_access_token;
    next();
  } catch (err) {
    res.json({
      statusCode: res.status(403).statusCode,
      msg: "Permission denied",
    });
  }
};
