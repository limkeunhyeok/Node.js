require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();
const postRouter = require("./routes/index");

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

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/", postRouter);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
