require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cluster = require("cluster");

const app = express();
const postRouter = require("./routes/index");
const Response = require("./response/response");
const RESPONSE_CODE = require("./response/responseCode");

mongoose.connect(process.env.DB_URL, {
  dbName: "nodejs",
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", () => {
  console.error("MongoDB Connection Error.");
});

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", postRouter);

app.use((req, res) => {
  res.status(404).json(new Response(RESPONSE_CODE.FAIL, "Not found!", null));
});

if (cluster.isMaster) {
  cluster.fork();
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
}
