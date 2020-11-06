const express = require("express");
var router = express.Router();
const verify = require("../middleware/tokenVerification");

/* GET index page */
router.get("/", verify, (req, res, next) => {
  res.json({ hello: "world" });
});

module.exports = router;
