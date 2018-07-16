const express = require("express");
const router = express.Router();
const myConfessions = require("../myConfessions/myConfessions");

router.post("/", myConfessions);

module.exports = router;
