const express = require("express");
const router = express.Router();
const newConfession = require("../userConfessions/newConfession");

router.post("/", newConfession);

module.exports = router;
