const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

module.exports = {
  register: function (req, res) {
    const { email, password, name, userType } = req.body;
    const user = new User({ email, password, name, userType });
    user.save(function (err, doc) {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        const payload = { email };
        const token = jwt.sign(payload, "secret", {
          expiresIn: "365d",
        });
        res.cookie("token", token, { httpOnly: true }).json({ token, user });
      }
    });
  },
  login: function (req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, function (err, user) {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Internal error please try again",
        });
      } else if (!user) {
        res.status(401).json({
          error: "Incorrect email or password",
        });
      } else {
        user.isCorrectPassword(password, function (err, same) {
          if (err) {
            res.status(500).json({
              error: "Internal error please try again",
            });
          } else if (!same) {
            res.status(401).json({
              error: "Incorrect email or password",
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, "secret", {
              expiresIn: "365d",
            });
            res.cookie("token", token, { httpOnly: true }).json({ token, user });
          }
        });
      }
    });
  }
};
