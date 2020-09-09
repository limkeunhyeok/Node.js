const express = require("express");
const router = express.Router();
const PageController = require('../controller/pageController');

router.get('/:pageId', (req, res, next) => {
    PageController.show(req, res, next);
});

module.exports = router;