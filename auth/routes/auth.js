const express = require("express");

const router = express.Router();
const auth = require("../controller/auth");
const validator = require("../controller/validator");

router.get("/login", auth.loginPage);

router.get("/logout", auth.logout);

router.post("/login", validator.email, validator.password, auth.loginProcess);

module.exports = router;
