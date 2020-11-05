var express = require("express");
var router = express.Router();

const db = require("../models/user");

/* Basic CRUD operations */

/* GET - Get all Users. */
router.get("/", function(req, res, next) {
  db.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* GET - Get User by ID. */
router.get("/:id", function(req, res, next) {
  db.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* POST - Add new User */
router.post("/add", function(req, res, next) {
  db.addUser(req.body)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* PUT - Update User */
router.put("/update", function(req, res, next) {
  db.updateUser(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* DELETE - Delete User */
router.delete("/delete/:id", function(req, res, next) {
  db.deleteUser(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
