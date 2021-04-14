const axios = require("axios");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const LocalStategy = require("passport-local").Strategy;

const secret = process.env.SECRET_KEY;

function createToken (payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {
      expiresIn: "7d",
    }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

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
        const url = `http://localhost:3010/member/${username}`;
        const { data } = await axios.get(url);
        if (data.code === 1) {
          return done(null, false);
        } else if (data.value.password !== password) {
          return done(null, false);
        }
        const payload = {
          nick: data.value.nick,
        };
        const token = await createToken(payload);
        return done(null, token);
      }
    )
  );
  passport.use("local-signup", new LocalStategy(
    {
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    async (req, username, password, done) => {
      const url = "http://localhost:3010/member";
      const data = {
        email: username,
        password: password,
        nick: req.body.nick
      };
      const results = await axios.post(url, data);
      if (results.data.code === 1) {
        return done(null, false);
      }
      const payload = {
        nick: results.data.value.nick,
      };
      const token = await createToken(payload);
      return done(null, token);
    }
  ))
  return passport;
};
