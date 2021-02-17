const express = require('express');
const router = express.Router();
const apiCrawler = require('../crawler/apiCrawler');

router.post('/start', apiCrawler.start);
router.get('/stop', apiCrawler.stop);
router.get('/stat', apiCrawler.stat);

module.exports = router;