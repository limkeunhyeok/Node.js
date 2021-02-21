const express = require('express');
const router = express.Router();
const auth = require('../controller/index');

router.post('/register', auth.register);
router.get('/inquiry', auth.inquiry);
router.delete('/unregister', auth.unregister);

module.exports = router;