var express = require("express");
var router = express.Router();
const User = require("../models/user");
const verifyRole = require("../middleware/userRoleVerification");
const verifyToken = require("../middleware/tokenVerification");
/* GET - Get all Users. */
router.get("/", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    let data = await new User().fetchAll();
    res.json(data);
  } catch (err) {
    res.json({
      status: false,
      msg: "Error while fetching users",
      result: err,
    });
  }
});

// /* GET - Get User by ID. */
router.get("/:id", async (req, res) => {
  try {
    // TODO: Add access token to database so the user can only view personal info
    let user = await new User().where("id", req.params.id).fetch();
    res.json(user);
  } catch (err) {
    res.json({
      status: false,
      msg: "Error while fetching user",
      result: err,
    });
  }
});

// /* PUT - Update User */
router.put(
  "/update/:id",
  verifyToken,
  verifyRole("admin"),
  async (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        throw new Error("Parameter is not of type number");
      }
      let updateUser = await new User({
        id: req.params.id,
      }).save(req.body);
      res.json({
        status: true,
        msg: "User successfully updated",
        result: updateUser.toJSON(),
      });
    } catch (err) {
      res.json({
        status: false,
        msg: "Error while updating user",
        result: err,
      });
    }
  }
);

// /* DELETE - Delete User */
router.delete(
  "/delete/:id",
  verifyToken,
  verifyRole("admin"),
  async (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        throw new Error("Parameter is not of type number");
      }
      let deleteUser = await new User({
        id: req.params.id,
      }).destroy();
      res.json({
        status: true,
        msg: "User successfully deleted",
        result: deleteUser.toJSON(),
      });
    } catch (err) {
      res.json({
        status: false,
        msg: "Error while deleting user",
        result: err,
      });
    }
  }
);

module.exports = router;
