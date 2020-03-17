const express = require('express');
const page = require('../controller/page');
const process = require('../controller/process');
const router = express.Router();

// '/:pageId' 맨 앞에 있으면 먼저 실행되기 때문에 create와 update에서 undefined가 출력된다.
router.get('/create', page.create);
router.get('/update/:updateId', page.update);
router.post('/create_process', process.create);
router.post('/update_process', process.update);
router.post('/delete_process', process.delete);
router.get('/:pageId', page.dataPage);

module.exports = router;