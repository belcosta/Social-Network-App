const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");
//router       GET api/auth
//@desc        test router
//@access      Public

router.get("/", auth, async (req, res) => {
  try {
    //select('-password) → leave off the password on data
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route      POST api/auth
// @desc       Authenticate user and get token
//@access      Public

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    //if user already exists

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: `Invalid credentials` }] });
      }

      //compare() password given to the one from db → returns a Promise.
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ mag: `Invalid Credentials` }] });
      }
      //the message "Invalid Credentials" is given if (1) the user does not exists or (2) if the password is wrong. This is in order to avoid specifying the error to "hackers"
      // return jsonWebtoken

      const payload = {
        user: {
          //once mongoose is used, "_id" is not needed. Just "id" is enough
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
