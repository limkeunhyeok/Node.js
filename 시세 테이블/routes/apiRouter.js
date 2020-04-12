const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiControllers');
const log = require('log4js').getLogger('apiRouter');

router.get('/', (req, res) => {
    log.debug("I'm in the apiRouter module.")
    apiController.getPrices(req, res);
});

module.exports = router;