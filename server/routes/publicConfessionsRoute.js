const express = require("express");
const router = express.Router();
const publicConfessions = require("../publicConfessions/publicConfessions");

router.post("/", publicConfessions);

module.exports = router;
