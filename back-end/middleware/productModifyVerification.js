/* Middleware function for route user role access control */
const User = require("../models/user");
const Role = require("../models/role");
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const { cookies, product } = req;
  const accessToken = cookies.__act;
  const userId = jwt.decode(accessToken).id;
  console.log(userId);
  console.log(product.toJSON().user_id);
  if (userId !== product.toJSON().user_id) {
    res.status(401);
    return res.send("Access denied");
  }
  next();
};
