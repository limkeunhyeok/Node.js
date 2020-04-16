const express = require('express');
const router = express.Router();
const upload = require('../controller/upload');

/* Create new image */
router.post('/', upload.single('userFile'), (req, res, next) => {
  res.send(req.file);
  console.log(req.file);
});

module.exports = router;