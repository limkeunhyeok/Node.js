require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const log4js = require("log4js");
const cluster = require("cluster");
const members = require("./routes/index");
const Response = require("./response/response");
const RESPONSE_CODE = require("./response/responseCode");

const app = express();
const log = log4js.getLogger("app");

log4js.configure(`${__dirname}/config/logConfig.json`);

app.use(helmet());
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", members);
app.use((req, res, next) => {
  const err = new Response(RESPONSE_CODE.FAIL, "Not Found!", null);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json(err);
  log.error(err);
});

if (cluster.isMaster) {
  cluster.fork();

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(3000, () => {
    log.info("Example app listening on port 3000!");
    console.log("Example app listening on port 3000!");
  });
}
