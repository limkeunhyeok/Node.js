const express = require("express");

const router = express.Router();
const page = require("../controller/page");
const process = require("../controller/process");

router.get("/create", page.create);
router.get("/update/:updateId", page.update);
router.post("/create", page.preCheck, process.create);
router.post("/update", page.preCheck, process.update);
router.post("/delete", page.preCheck, process.delete);
router.get("/:pageId", page.dataPage);

module.exports = router;
