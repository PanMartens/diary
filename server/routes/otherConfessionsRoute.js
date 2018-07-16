const express = require("express");
const router = express.Router();
const getOtherConfessions = require("../otherConfessions/otherConfessions");

router.get("/", getOtherConfessions);

module.exports = router;
