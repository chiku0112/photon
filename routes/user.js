const express = require("express");
const withAuth = require("../middlewares/withAuth");
const UserController = require('../controllers/User');
const router = express.Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/protected", withAuth, function (req, res) {
  res.send({ message: "Auth Ok!" });
});

module.exports = router;
