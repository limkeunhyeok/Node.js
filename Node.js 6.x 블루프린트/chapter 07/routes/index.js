const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Socket.io chat application',
        lead: 'Insert your user name and start talk'
    });
});

module.exports = router;