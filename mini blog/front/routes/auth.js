const express = require("express");

const logger = require("log4js").getLogger("auth");

const router = express.Router();
const validator = require("../controller/validator");

module.exports = function (passport) {
  router.get("/logout", (req, res) => {
    req.session.destroy();
    logger.info("User logout");
    res.redirect("/");
  });
  router.post("*", validator.email, validator.password);
  router.post(
    "/login",
    (req, res, next) => {
      logger.info("User login");
      next();
    },
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: false,
      successFlash: false,
    })
  );
  router.post(
    "/signup",
    (req, res, next) => {
      logger.info("User signup");
      next();
    },
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/signup",
      failureFlash: false,
      successFlash: false,
    })
  );
  return router;
};
