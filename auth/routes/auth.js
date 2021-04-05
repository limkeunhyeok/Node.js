const express = require("express");

const router = express.Router();
const auth = require("../controller/auth");
const validator = require("../controller/validator");

module.exports = function(passport) {
    router.get("/login", auth.loginPage);
    router.get("/logout", (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });
    router.post("/login",
        validator.email,
        validator.password,
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: false,
            successFlash: false
        })
    );
    return router;
}