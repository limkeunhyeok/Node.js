const fs = require("fs");

exports.create = function (req, res) {
  const post = req.body;
  const { title } = post;
  const { description } = post;
  fs.writeFile(`./data/${title}`, description, "utf8", (err) => {
    res.redirect(302, `/topic/${title}`);
  });
};

exports.update = function (req, res) {
  const post = req.body;
  const { id } = post;
  const { title } = post;
  const { description } = post;
  fs.rename(`./data/${id}`, `./data/${title}`, (error) => {
    fs.writeFile(`./data/${title}`, description, "utf8", (err) => {
      res.redirect(302, `/topic/${title}`);
    });
  });
};

exports.delete = function (req, res) {
  const post = req.body;
  const { id } = post;
  fs.unlink(`./data/${id}`, (err) => {
    res.redirect(302, "/");
  });
};
