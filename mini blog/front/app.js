// husky는 최신 버전이 아닌 이전 버전, husky@4로 install 할 것
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const log4js = require("log4js");
const cluster = require("cluster");

const Response = require("./response/response");
const RESPONSE_CODE = require("./response/responseCode");

const log = log4js.getLogger("app");
const app = express();

log4js.configure(`${__dirname}/config/logConfig.json`);

app.use(helmet());
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

const passport = require("./lib/passport")(app);
const indexRouter = require("./routes/index");
const topicRouter = require("./routes/topic");
const authRouter = require("./routes/auth")(passport);

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/topic", topicRouter);

app.use((req, res, next) => {
  const err = new Response(RESPONSE_CODE.FAIL, "Not Found!", null);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  log.error(err.message);
  res.status(err.status || 500).json(err);
});

if (cluster.isMaster) {
  cluster.fork();
  cluster.on("exit", (worker, code, signal) => {
    log.info(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const port = process.env.PORT;
  app.listen(port, () => {
    log.info(`Example app listening on port ${port}!`);
  });
}
