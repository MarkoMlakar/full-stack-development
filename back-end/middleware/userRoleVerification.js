/* Middleware function for route user role access control */
const User = require("../models/user");
const Role = require("../models/role");
const jwt = require("jsonwebtoken");
module.exports = function (roleValue) {
  return async (req, res, next) => {
    const { cookies } = req;
    const accessToken = cookies.__act;
    const userId = jwt.decode(accessToken).id;
    let userRole, role;
    try {
      userRole = await new User().where("id", userId).fetch();
      role = await new Role().where("user_role", roleValue).fetch();
    } catch (err) {
      res.status(401);
      return res.send("Access denied");
    }

    if (userRole.toJSON().id !== role.toJSON().id) {
      res.status(401);
      return res.send("Access denied");
    }
    next();
  };
};
