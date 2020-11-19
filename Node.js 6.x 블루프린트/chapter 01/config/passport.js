const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        if (email) {
            email = email.toLowerCase();
            process.nextTick(() => {
                User.findOne({'local.email': email}, (err, user) => {
                    if (err) {
                        return done(err);
                    } else if (!user) {
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
                    } else if (!user.validPassword(password)) {
                        return done(null, false, req.flash('loginMessage', 'Wohh! Wrong password'));
                    } else {
                        return done(null, user);
                    }
                });
            });
        }
    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        if (email) {
            email = email.toLowerCase();
            process.nextTick(() => {
                if (!req.user) {
                    User.findOne({'local.email': email}, (err, user) => {
                        if (err) {
                            return done(err);
                        } else if (user) {
                            return done(null, false, req.flash('signupMessage', 'Wohh! the email is already taken.'));
                        } else {
                            let newUser = new User();
                            newUser.local.name = req.body.name;
                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(password);
                            newUser.save((err) => {
                                if (err) {
                                    throw err;
                                }
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    return done(null, req.user);
                }
            });
        }
    }));
};