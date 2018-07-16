const express = require("express");
const router = express.Router();
const setNewUserData = require("../userDataChange/setNewData");

router.post("/", setNewUserData);

module.exports = router;
