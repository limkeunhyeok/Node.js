const logger = require("log4js").getLogger("process");

const Service = require("./index");

const postService = new Service("http://localhost:3020/post/");

exports.create = async function (req, res) {
  const post = req.body;
  const { title, description } = post;
  const results = await postService.request("", "post", {
    title,
    body: description,
  });
  logger.debug("Create post!");
  res.redirect(302, `/topic/${results.value._id}`);
};

exports.update = async function (req, res) {
  const post = req.body;
  const { id, title, description } = post;
  await postService.request(id, "put", {
    title,
    body: description,
  });
  logger.debug("Update post!");
  res.redirect(302, `/topic/${id}`);
};

exports.delete = async function (req, res) {
  const post = req.body;
  const { id } = post;
  await postService.request(id, "delete", {});
  logger.debug("Delete post!");
  res.redirect(302, "/");
};
