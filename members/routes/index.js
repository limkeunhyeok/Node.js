const express = require('express');
const router = express.Router();
const memberManagement = require('../controller/membersController');
const validator = require('../controller/validator');

router.get('/members', memberManagement.getMembersList);
router.post('/register', validator.email, validator.password, memberManagement.register);
router.post('/inquiry', validator.email, memberManagement.inquiry);
router.delete('/unregister', validator.email, memberManagement.unregister);

module.exports = router;