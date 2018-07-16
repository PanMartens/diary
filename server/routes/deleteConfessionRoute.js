const express = require("express");
const router = express.Router();
const deleteConfession = require("../deleteConfession/deleteConfession");

router.post("/", deleteConfession);

module.exports = router;
