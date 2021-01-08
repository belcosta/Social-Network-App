const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

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

module.exports = router;
