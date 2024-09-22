"use strict";

var express = require('express');

var router = express.Router();

var itemController = require('../controllers/itemController');

var verifyToken = require('../middleware/authMiddleware');

router.post('/users/register', itemController.registerUser);
router.get('/users/getAll', itemController.fetchAllUsers);
module.exports = router;