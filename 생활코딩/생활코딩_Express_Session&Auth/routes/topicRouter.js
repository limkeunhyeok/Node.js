const express = require('express');
const page = require('../controller/page');
const process = require('../controller/process');
const router = express.Router();

router.get('/create', page.create);
router.get('/update/:updateId', page.update);
router.post('/create_process', process.create);
router.post('/update_process', process.update);
router.post('/delete_process', process.delete);
router.get('/:pageId', page.dataPage);

module.exports = router;