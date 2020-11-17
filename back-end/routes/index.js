const express = require("express");
const { verify } = require("jsonwebtoken");
var router = express.Router();
const verifyToken = require("../middleware/tokenVerification");
const verifyRole = require("../middleware/userRoleVerification");
/* GET index page */
router.get("/", (req, res) => {
  res.json({ hello: "world" });
});

router.get("/admin", verifyToken, verifyRole("admin"), (req, res) => {
  res.json({ hello: "admin" });
});

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ hello: "auth user" });
});

module.exports = router;
