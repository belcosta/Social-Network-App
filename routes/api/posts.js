const express = require("express");
const router = express.Router();

//router       GET api/posts
//@desc        test router
//@access      Public

router.get("/", (req, res) => res.send("Post router"));

module.exports = router;
