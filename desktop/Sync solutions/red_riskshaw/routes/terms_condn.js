const express = require('express');
const router = express.Router();
const termsController = require('../controllers/terms_condn');

router.get('/getAll', termsController.fetchAllTerms);
router.post('/post', termsController.createTerm);

module.exports = router;
