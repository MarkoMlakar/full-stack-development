var express = require("express");
var router = express.Router();

const db = require("../models/user");

/* Basic CRUD operations */

/* GET - Get all Users. */
router.get("/", function(req, res, next) {
  res.json(db.findAll());
});

/* GET - Get User by ID. */
router.get("/:id", function(req, res, next) {
  res.json(db.findById(req.params.id));
});

/* POST - Create new User */
router.post("/create", function(req, res, next) {
  res.json(db.addUser(req.body));
});

/* PUT - Update User */
router.put("/update", function(req, res, next) {
  res.json(db.updateUser(req.body));
});

/* DELETE Delete User */
router.delete("/delete/:id", function(req, res, next) {
  res.json(db.deleteUser(req.params.id));
});

module.exports = router;
