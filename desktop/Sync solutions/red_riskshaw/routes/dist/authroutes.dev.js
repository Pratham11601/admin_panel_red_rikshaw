"use strict";

var express = require('express');

var router = express.Router();

var authController = require('../controllers/auth');

var authMiddleware = require('../middleware/authMiddleware');

router.post('/login', authController.login);
module.exports = router;