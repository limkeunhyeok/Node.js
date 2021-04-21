const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStategy = require("passport-local").Strategy;
const logger = require("log4js").getLogger("passport");

const Service = require("../controller/index");

const memberService = new Service("http://localhost:3010/member/");

const secret = process.env.SECRET_KEY;

function createToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) {
          logger.error(err);
          reject(err);
        }
        logger.debug("Create token!");
        resolve(token);
      }
    );
  });
}

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    logger.debug("serializeUser:", user);
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    logger.debug("deserializeUser:", user);
    done(null, user);
  });

  passport.use(
    new LocalStategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (username, password, done) => {
        logger.debug("LocalStrategy: login");
        const { code, value } = await memberService.request(
          username,
          "get",
          {}
        );
        if (code === 1) {
          done(null, false);
        }
        bcrypt
          .compare(password, value.password)
          .then(async (res) => {
            logger.debug("Password comparison");
            if (!res) {
              done(null, false);
            }
            const payload = {
              nick: value.nick,
            };
            const token = await createToken(payload);
            done(null, token);
          })
          .catch((err) => done(null, false));
      }
    )
  );
  passport.use(
    "local-signup",
    new LocalStategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        logger.debug("LocalStrategy: signup");
        bcrypt
          .hash(password, 10)
          .then(async (hash) => {
            logger.debug("Password hashing");
            const data = {
              email: username,
              password: hash,
              nick: req.body.nick,
            };
            const { code, value } = await memberService.request(
              "",
              "post",
              data
            );
            if (code === 1) {
              return done(null, false);
            }
            const payload = {
              nick: value.nick,
            };
            const token = await createToken(payload);
            return done(null, token);
          })
          .catch((err) => done(null, false));
      }
    )
  );
  return passport;
};
