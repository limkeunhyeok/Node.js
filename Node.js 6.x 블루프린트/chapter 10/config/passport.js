const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: 'email' },
    (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
            console.log('check: ', user)
            if (!user) {
                return done(null, false, {msg: 'The email: ' + email + ' is already taken.'});
            }
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) {
                    return done(null, false, {msg: 'Invalid email or password'});
                }
                return done(null, user);
            });
        });
    }
));