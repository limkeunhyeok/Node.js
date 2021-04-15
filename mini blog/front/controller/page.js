const path = require("path");
const sanitizeHTML = require("sanitize-html");
const template = require("../lib/template");
const auth = require("../lib/auth");
const Service = require("./index");

const postService = new Service("http://localhost:3020/post/");

exports.list = async function (req, res, next) {
  const results = await postService.request("", "get", {});
  req.list = results.value;
  next();
};

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

exports.update = async function (req, res) {
  const filteredId = path.parse(req.params.updateId).base;
  const results = await postService.request(filteredId, "get", {});
  const { title, body } = results.value;
  const list = template.list(req.list);
  const control = "";
  const hidden = `<input type="hidden" name="id" value="${filteredId}">`;
  const statusUI = auth.statusUI(req, res);
  const post = template.form("update", hidden, `value="${title}"`, body);
  const html = template.HTML(title, list, control, post, statusUI);
  res.send(html);
};

exports.dataPage = async function (req, res) {
  const filteredId = path.parse(req.params.pageId).base;
  const results = await postService.request(filteredId, "get", {});
  const { title, body } = results.value;
  const sanitizedTitle = sanitizeHTML(title);
  const sanitizedDescription = sanitizeHTML(body, {
    allowedTags: ["h1"],
  });
  const list = template.list(req.list);
  const control = `
            <a href="/topic/create">create</a>
            <a href="/topic/update/${filteredId}">update</a>
            <form action="/topic/delete" method="post">
                <input type="hidden" name="id" value="${filteredId}">
                <input type="submit" value="delete">
            </form>`;
  const statusUI = auth.statusUI(req, res);
  const post = `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`;
  const html = template.HTML(sanitizedTitle, list, control, post, statusUI);
  res.send(html);
};

exports.login = function (req, res) {
  const title = "Login";
  const list = template.list(req.list);
  const statusUI = auth.statusUI(req, res);
  const control = `
        <form action="/auth/login" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="submit" value="login"></p>
        </form>`;
  const html = template.HTML(title, list, control, "", statusUI);
  res.send(html);
};

exports.signup = function (req, res) {
  const title = "register";
  const list = template.list(req.list);
  const statusUI = auth.statusUI(req, res);
  const control = `
        <form action="/auth/signup" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="text" name="nick" placeholder="nick"></p>
            <p><input type="submit" value="sign up"></p>
        </form>`;
  const html = template.HTML(title, list, control, "", statusUI);
  res.send(html);
};
