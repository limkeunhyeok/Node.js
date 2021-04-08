const express = require('express');
const router = express.Router();
const post = require('../controller/postController');

router.get('/post', post.read);
router.post('/post', post.create);
router.put('/post', post.update);
router.delete('/post', post.delete);

module.exports = router;