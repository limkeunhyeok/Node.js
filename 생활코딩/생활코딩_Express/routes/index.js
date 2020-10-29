const express = require('express');
const page = require('../controller/page');
const template = require('../lib/template');
const router = express.Router();

router.get('/', page.index);

module.exports = router;