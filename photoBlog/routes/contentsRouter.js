const express = require('express');
const router = express.Router();
const contentsController = require('../controller/contentsController');
const log = require('log4js').getLogger('contentsRouter');

router.post('/', (req, res, next) => {
    log.debug("I'm in the contentsRouter module.")
    contentsController.getImageList(req, res, next);
});

router.post('/upload', contentsController.upload.single('userFile'), (req, res, next) => {
    res.redirect(302, '/');
});

module.exports = router;