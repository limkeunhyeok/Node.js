const express = require("express");

const router = express.Router();
const member = require("../controller/membersController");

router.get('/member', member.findAll);
router.get('/member/:email', member.findOneByEmail)
router.post('/member', member.create);
router.delete('/member', member.deleteAll);
router.delete('/member/:email', member.deleteByEmail);

module.exports = router;
