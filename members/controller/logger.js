const log4js = require("log4js");
const Response = require("../response/response");
const RESPONSE_CODE = require("../response/responseCode");

const MyLogger = function (name) {
  this.name = name;
  this.log = log4js.getLogger(this.name);
};

MyLogger.prototype.debugging = function (req, res, next) {
  const { url } = req;
  const err = new Response(RESPONSE_CODE.SUCCESS, "Not Found!", null);
  let msg = "";

  switch (url) {
    case "/members":
      msg = "getMembersList";
      break;
    case "/register":
      msg = "register";
      break;
    case "/inquiry":
      msg = "inquiry";
      break;
    case "/unregister":
      msg = "unregister";
      break;
    case "/login":
      msg = "login";
      break;
    default:
      err.status = 404;
      next(err);
      return;
  }
  this.log.debug(msg);
  next();
};

module.exports = MyLogger;
