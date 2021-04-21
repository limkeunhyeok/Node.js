const { check, validationResult } = require("express-validator");
const logger = require("log4js").getLogger("validator");
const Response = require("../response/response");
const RESPONSE_CODE = require("../response/responseCode");

exports.email = [
  check("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  function (req, res, next) {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      err.status = 400;
      next(new Response(RESPONSE_CODE.FAIL, "Invalid email", err));
    } else {
      logger.debug("Email validation complete!");
      next();
    }
  },
];

exports.password = [
  check("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15"),
  function (req, res, next) {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      err.status = 400;
      next(new Response(RESPONSE_CODE.FAIL, "Invalid password", err));
    } else {
      logger.debug("Password validation complete!");
      next();
    }
  },
];
