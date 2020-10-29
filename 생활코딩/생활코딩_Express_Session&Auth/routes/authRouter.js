const express = require('express');
const auth = require('../controller/auth');
const router = express.Router();

router.get('/login', auth.login);
router.post('/login_process', auth.login_process);
router.get('/logout', auth.logout);

module.exports = router;