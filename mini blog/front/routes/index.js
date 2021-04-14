const express = require("express");

const router = express.Router();
const page = require("../controller/page");

router.get("*", page.list);
router.get("/", page.index);

module.exports = router;
