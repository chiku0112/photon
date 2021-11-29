const jwt = require("jsonwebtoken");
const secret = require("../config/keys").jwtSecret;
const User = require("../models/User.js");

const withAuth = function (req, res, next) {
  console.log(req.cookies);
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send({message: "Unauthorized: No token provided"});
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        console.log(err)
        res.status(401).send({message: "Unauthorized: Invalid token"});
      } else {
        req.email = decoded.email;
        const { email } = req;
        User.findOne({ email }, function(err,user){
          if (err) {
            console.error(err);
            res.status(500).json({
              error: "Internal error please try again",
            });
          }
          console.log(user.userType);
          req.user = user;
          next();
        });
  
      }
    });
  }
};

module.exports = withAuth;
