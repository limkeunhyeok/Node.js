const express = require('express');
const router = express.Router();
const feed = require('../feed/xml2jsFeed');

router.post('/', feed.getData);

module.exports = router;