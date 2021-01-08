const express = require("express");
const router = express.Router();

//router       GET api/auth
//@desc        test router
//@access      Public

router.get("/", (req, res) => res.send("auth "));

module.exports = router;
