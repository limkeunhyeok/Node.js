const express = require("express");

const router = express.Router();
const page = require("../controller/page");
const process = require("../controller/process");

router.get("/create", page.create);
router.get("/update/:updateId", page.update);
router.post("/create", process.create);
router.post("/update", process.update);
router.post("/delete", process.delete);
router.get("/:pageId", page.dataPage);

module.exports = router;
