const express = require('express');
const { route } = require('.');
const router = express.Router();
const auth = require('../controller/authController');
const validator = require('../controller/validator');

router.get('/login', auth.login);

router.get('/logout', auth.logout);

router.post('/loginProcess',
    validator.email,
    validator.password,
    auth.loginProcess
);

module.exports = router;
