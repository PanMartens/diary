const express = require("express");
const router = express.Router();
const changeConfession = require("../changeConfession/changeConfession");

router.post("/", changeConfession);

module.exports = router;
