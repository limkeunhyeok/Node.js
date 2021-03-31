// husky는 최신 버전이 아닌 이전 버전, husky@4로 install 할 것
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const fs = require("fs");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const app = express();
const Response = require("./response/response");
const RESPONSE_CODE = require("./response/responseCode");
const indexRouter = require("./routes/index");
const topicRouter = require("./routes/topic");
const authRouter = require("./routes/auth");

app.use(helmet());
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get("*", (req, res, next) => {
  fs.readdir("./data", (err, files) => {
    req.list = files;
    next();
  });
});

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/topic", topicRouter);

app.use((req, res, next) => {
  const err = new Response(RESPONSE_CODE.SUCCESS, "Not Found!", null);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => res.status(err.status || 500).json(err));

app.listen(3010, () => {
  console.log("Example app listening on port 3010!");
});
