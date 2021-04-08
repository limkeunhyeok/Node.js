const fs = require("fs");

exports.create = function (req, res) {
  const post = req.body;
  const { title, description } = post;
  fs.writeFile(`./data/${title}`, description, "utf8", (err) => {
    if (err) throw err;
    res.redirect(302, `/topic/${title}`);
  });
};

exports.update = function (req, res) {
  const post = req.body;
  const { id, title, description } = post;
  fs.rename(`./data/${id}`, `./data/${title}`, (error) => {
    if (error) throw error;
    fs.writeFile(`./data/${title}`, description, "utf8", (err) => {
      if (err) throw err;
      res.redirect(302, `/topic/${title}`);
    });
  });
};

exports.delete = function (req, res) {
  const post = req.body;
  const { id } = post;
  fs.unlink(`./data/${id}`, (err) => {
    if (err) throw err;
    res.redirect(302, "/");
  });
};
