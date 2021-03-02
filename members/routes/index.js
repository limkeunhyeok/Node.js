const express = require('express');
const router = express.Router();
const memberManagement = require('../controller/membersController');
const validator = require('../controller/validator');
const MyLogger = require('../controller/logger');
const logger = new MyLogger('members');

router.all('/*', (req, res, next) => {
    logger.debugging(req, res, next);
});

router.get('/members',
    memberManagement.getMembersList
);

router.post('/register',
    validator.email,
    validator.password,
    memberManagement.register
);

router.post('/inquiry',
    validator.email,
    memberManagement.inquiry
);

router.post('/unregister',
    validator.email,
    memberManagement.unregister
);

module.exports = router;