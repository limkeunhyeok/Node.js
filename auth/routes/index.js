const express = require('express');
const router = express.Router();
const auth = require('../controller/authController');
const validator = require('../controller/validator');

router.post('/login',
    validator.email,
    validator.password,
    auth.login
);

module.exports = router;
