"use strict";

var express = require('express');

var router = express.Router();

var termsController = require('../controllers/terms_condn');

router.get('/getAll', termsController.fetchAllTerms);
router.post('/post', termsController.createTerm);
module.exports = router;