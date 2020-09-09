const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(helmet());

app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/fonts", express.static(__dirname + "/public/fonts"));
app.use("/images", express.static(__dirname + "/public/images"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/vendor", express.static(__dirname + "/public/vendor"));

app.set("view engine", "ejs");
app.set("views", [
    path.join(__dirname, "views/pages"),
    path.join(__dirname, "views/partials")
]);

app.set("layout", "layout");
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("*", (req, res, next) => {
    fs.readdir("./views/pages", (err, files) => {
        req.list = files;
        next();
    });
});

app.get("/", (req, res) => {
    res.render('index');
});

const pageRouter = require('./routes/pageRouter');

app.use("/", pageRouter);

app.use((req, res, next) => {
    if (!(res.headersSent)) {
        let err = new Error("Something Broke");
        err.status = 500;
        next(err);
    };
});

app.use((err, req, res, next) => {
    res.render('error', {err: err});
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});