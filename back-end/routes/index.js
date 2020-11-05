const express = require("express");
var router = express.Router();

/* GET index page */
router.get("/", function(req, res, next) {
  res.json({ hello: "world" });
});

module.exports = router;
