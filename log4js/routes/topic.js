const express = require('express');
const page = require('../controller/page');
const processing = require('../controller/processing');
const router = express.Router();
const log = require('log4js').getLogger('topic');

// '/:pageId' 맨 앞에 있으면 먼저 실행되기 때문에 create와 update에서 undefined가 출력된다.
router.get('/create', (req, res) => {
    log.debug("I'm in the topic module.");
    page.create(req, res);
});
router.get('/update/:updateId', (req, res) => {
    log.debug("I'm in the topic module.");
    page.update(req, res);
});
router.post('/create_process', (req, res) => {
    log.debug("I'm in the topic module.");
    processing.create(req, res);
});
router.post('/update_process', (req, res) => {
    log.debug("I'm in the topic module.");
    processing.update(req, res);
});
router.post('/delete_process', (req, res) => {
    log.debug("I'm in the topic module.");
    processing.delete(req, res);
});
router.get('/:pageId', page.dataPage);

module.exports = router;