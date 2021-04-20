require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cluster = require("cluster");
const log4js = require("log4js");

const postRouter = require("./routes/index");
const Response = require("./response/response");
const RESPONSE_CODE = require("./response/responseCode");

const log = log4js.getLogger("app");
const app = express();

mongoose.connect(process.env.DB_URL, {
  dbName: "nodejs",
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", () => {
  log.error("MongoDB Connection Error.");
});

log4js.configure(`${__dirname}/config/logConfig.json`);

app.use(helmet());
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", postRouter);

app.use((req, res) => {
  log.error("Not found!");
  res.status(404).json(new Response(RESPONSE_CODE.FAIL, "Not found!", null));
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
