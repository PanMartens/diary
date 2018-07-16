const express = require('express');
const router = express.Router();
const register = require('../register');


router.post('/', register);

module.exports = router;