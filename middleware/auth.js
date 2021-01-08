const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //Verify token
  try {
    //verify() function decodes token and return an object. This object contains another object called "user" which contains the _id from MongoDB
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user; //→ req.user contains the id from mongoDb Object.
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
