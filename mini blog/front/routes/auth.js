const express = require("express");

const router = express.Router();
const validator = require("../controller/validator");

module.exports = function (passport) {
  router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });
  router.post("*", validator.email, validator.password);
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/auth/login",
      failureFlash: false,
      successFlash: false,
    })
  );
  router.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/auth/signup",
      failureFlash: false,
      successFlash: false,
    })
  );
  return router;
};
