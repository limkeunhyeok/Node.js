const path = require("path");
const fs = require("fs");
const sanitizeHTML = require("sanitize-html");
const template = require("../lib/template");
const auth = require("../lib/auth");

exports.index = function (req, res) {
  const title = "Welcome";
  const list = template.list(req.list);
  const control = `<a href="/topic/create">create</a>`;
  const statusUI = auth.statusUI(req, res);
  const body = `
        <h2>${title}</h2> Hello, Node.js
        <img src="/images/hello.jpeg" style="width:300px; display:block; margin-top:10px;">`;
  const html = template.HTML(title, list, control, body, statusUI);
  res.send(html);
};

exports.create = function (req, res) {
  const title = "WEB - Create";
  const list = template.list(req.list);
  const control = "";
  const statusUI = auth.statusUI(req, res);
  const body = template.form("create", "", "", "");
  const html = template.HTML(title, list, control, body, statusUI);
  res.send(html);
};

exports.update = function (req, res) {
  const filteredId = path.parse(req.params.updateId).base;
  fs.readFile(`./data/${filteredId}`, "utf8", (err, description) => {
    const title = req.params.updateId;
    const list = template.list(req.list);
    const control = "";
    const hidden = `<input type="hidden" name="id" value="${title}">`;
    const statusUI = auth.statusUI(req, res);
    const body = template.form(
      "update",
      hidden,
      `value="${title}"`,
      description
    );
    const html = template.HTML(title, list, control, body, statusUI);
    res.send(html);
  });
};

exports.dataPage = function (req, res, next) {
  const filteredId = path.parse(req.params.pageId).base;
  fs.readFile(`./data/${filteredId}`, "utf8", (err, description) => {
    if (err) {
      next(err);
    } else {
      const title = req.params.pageId;
      const sanitizedTitle = sanitizeHTML(title);
      const sanitizedDescription = sanitizeHTML(description, {
        allowedTags: ["h1"],
      });
      const list = template.list(req.list);
      const control = `
                <a href="/topic/create">create</a>
                <a href="/topic/update/${sanitizedTitle}">update</a>
                <form action="/topic/delete" method="post">
                    <input type="hidden" name="id" value="${sanitizedTitle}">
                    <input type="submit" value="delete">
                </form>`;
      const statusUI = auth.statusUI(req, res);
      const body = `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`;
      const html = template.HTML(sanitizedTitle, list, control, body, statusUI);
      res.send(html);
    }
  });
};

 exports.preCheck = function(req, res, next) {
   if (!auth.isOwner(req, res)) {
     res.redirect(302, "/");
     return false;
   }
   next();
 }