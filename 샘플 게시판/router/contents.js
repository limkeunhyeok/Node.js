const express = require("express");
const router = express.Router();
const contentsController = require("../controllers/contentsController");

router.get('/', contentsController.read);

router.put('/', contentsController.update);

router.post('/', contentsController.create);

router.delete('/', contentsController.delete);

module.exports = router;