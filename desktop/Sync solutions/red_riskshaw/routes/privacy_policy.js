const express = require('express');
const router = express.Router();
const privacyPolicyController = require('../controllers/privacy_policy');

router.get('/getAll', privacyPolicyController.fetchAllPolicies);
router.post('/post', privacyPolicyController.createPolicy);

module.exports = router;
