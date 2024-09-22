const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login',  authController.login);

module.exports = router;
