const express = require('express');
const page = require('../controller/page');
const router = express.Router();
const log = require('log4js').getLogger('index');


router.get('/', (req, res) => {
    log.debug("I'm in the index module.");
    page.index(req, res);
});

module.exports = router;