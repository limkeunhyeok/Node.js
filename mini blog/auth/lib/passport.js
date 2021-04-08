const axios = require("axios");
const passport = require("passport");
const LocalStategy = require("passport-local").Strategy;

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new LocalStategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (username, password, done) => {
        const url = "http://localhost:3000/login";
        const { data } = await axios.post(url, {
          email: username,
          password,
        });
        if (data.code === 1) {
          return done(null, false);
        }
        return done(null, data.value.token);
      }
    )
  );
  return passport;
};
