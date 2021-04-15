const express = require("express");

const router = express.Router();
const page = require("../controller/page");

router.get("*", page.list);
router.get("/", page.index);
router.get("/login", page.login);
router.get("/signup", page.signup);

module.exports = router;
