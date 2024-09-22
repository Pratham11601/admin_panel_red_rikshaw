const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const verifyToken = require('../middleware/authMiddleware');


router.post('/users/register', itemController.registerUser);

router.get('/users/getAll',itemController.fetchAllUsers);   

module.exports = router;
