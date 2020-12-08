const express = require('express');
const router = express.Router();
const board = require('../controller/board');

router.get('/', board.read);
router.post('/', board.create);
router.put('/', board.update);
router.delete('/', board.delete);

module.exports = router;