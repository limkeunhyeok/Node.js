var async = require('async');
var crypto = require('crypto');
const passport = require('passport');
const User = require('../models/User');

exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
};

exports.logout = function(req, res) {
    req.logout();
    req.redirect('/');
};

exports.loginGet = function(req, res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('login', {
        title: 'Log in'
    });
};

exports.loginPost = function(req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Empty email not allowed').notEmpty();
    req.assert('password', 'Empty password not allowed').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
    
    let errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors);
        return res.redirect('/login');
    }

    passport.authenticate('local', (err, user, info) => {
        if (!user) {
            req.flash('error', info);
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            res.redirect('/');
        });
    })(req, res, next);
};

exports.signupGet = function(req, res) {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('signup', {
        title: 'Sign up'
    });
};

exports.signupPost = function(req, res, next) {
    req.assert('name', 'Empty name not allowed').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('email', 'Empty email is not allowed').notEmpty();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    let errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors);
        return res.redirect('/signup');
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            req.flash('error', { msg: 'The email is already taken.' });
            return res.redirect('/signup');
        }
        user = new User({
            name: req.body.user,
            email: req.body.email,
            password: req.body.password
        });
        user.save((err) => {
            req.login(user, (err) => {
                res.redirect('/');
            });
        });
    });
};

exports.accountGet = function(req, res) {
    res.render('profile', {
        title: 'My Account'
    });
};

exports.accountPut = function(req, res, next) {
    if ('password' in req.body) {
        req.assert('password', 'Password must be at least 4 characters long').len(4);
        req.assert('confirm', 'Passwords must match')
        .equals(req.body.password);
    } else {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('email', 'Empty email is not allowed').notEmpty();
        req.sanitize('email').normalizeEmail({ remove_dots: false });
    }

    let errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors);
        return res.redirect('/pages');
    }

    User.findById(req.user.id, (err, user) => {
        if ('password' in req.body) {
            user.password = req.body.password;
        } else {
            user.email = req.body.email;
            user.name = req.body.name;
        }
        
        user.save((err) => {
            if ('password' in req.body) {
                req.flash('success', { msg: 'Password changed.' });
            } else if (err && err.code === 11000) {
                req.flash('error', { msg: 'The email is already taken.' });
            } else {
                req.flash('success', { msg: 'Profile updated.' });
            }
            res.redirect('/account');
        });
    });
};

exports.accountDelete = function(req, res, next) {
    User.remove({ _id: req.user.id }, (err) => {
        req.logout();
        req.flash('info', { msg: 'Account deleted.' });
        res.redirect('/');
    });
};
