const path = require("path");
const sanitizeHTML = require("sanitize-html");
const template = require("../lib/template");
const auth = require("../lib/auth");
const axios = require("axios");

function apiCall(option) {
  return new Promise((resolve, reject) => {
    axios(option)
      .then((results) => {
        resolve(results);
      }).catch((err) => {
        reject(err);
      });
  })
}

async function postController(postId, method, data) {
  const option = {};
  option.url = `http://localhost:3020/post/${postId}`;
  option.method = method;
  option.data = data;
  try {
    const res = await apiCall(option);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

exports.list = async function(req, res, next) {
  const results = await postController("", "get", {});
  req.list = results.value;
  next()
}

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
  const results = await postController(filteredId, "get", {});
  const { title, body } = results.value;
  const list = template.list(req.list);
  const control = "";
  const hidden = `<input type="hidden" name="id" value="${filteredId}">`;
  const statusUI = auth.statusUI(req, res);
  const post = template.form(
    "update",
    hidden,
    `value="${title}"`,
    body
  );
  const html = template.HTML(title, list, control, post, statusUI);
  res.send(html);
};

exports.dataPage = async function (req, res, next) {
  const filteredId = path.parse(req.params.pageId).base;
  const results = await postController(filteredId, "get", {});
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

// exports.preCheck = function (req, res, next) {
//   if (!auth.isOwner(req, res)) {
//     res.redirect(302, "/");
//     return false;
//   }
//   return next();
// };
