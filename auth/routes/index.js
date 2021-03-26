const express = require('express');
const router = express.Router();
const auth = require('../controller/authController');
const validator = require('../controller/validator');
const page = require('../controller/page')


router.get('/', page.index);

module.exports = router;
