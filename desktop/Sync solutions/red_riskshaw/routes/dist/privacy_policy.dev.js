"use strict";

var express = require('express');

var router = express.Router();

var privacyPolicyController = require('../controllers/privacy_policy');

router.get('/getAll', privacyPolicyController.fetchAllPolicies);
router.post('/post', privacyPolicyController.createPolicy);
module.exports = router;