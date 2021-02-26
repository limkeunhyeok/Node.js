const express = require('express');
const router = express.Router();
const memberManagement = require('../controller/membersController');
const validator = require('../controller/validator');
const log = require('log4js').getLogger('members');

router.get('/members',
    (req, res, next) => {
        log.debug('getMembersList');
        next();
    },
    memberManagement.getMembersList
);

router.post('/register',
    (req, res, next) => {
        log.debug('register');
        next();
    },
    validator.email,
    validator.password,
    memberManagement.register
);

router.post('/inquiry',
    (req, res, next) => {
        log.debug('inquiry');
        next();
    },
    validator.email,
    memberManagement.inquiry
);

router.post('/unregister',
    (req, res, next) => {
        log.debug('unregister');
        next();
    },
    validator.email,
    memberManagement.unregister
);

module.exports = router;