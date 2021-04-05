const { default: axios } = require('axios');

module.exports = function(app) {
    const passport = require('passport');
    const LocalStategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new LocalStategy({
            usernameField: "email",
            passwordField: "password"
        }, async function(username, password, done) {
            const url = "http://localhost:3000/login";
            const { data } = await axios.post(url, {
                email: username,
                password: password
            });
            if (data.code == 1) {
                return done(null, false);
            } else {
                return done(null, data.value.token);
            }
        }
    ));
    return passport;
}