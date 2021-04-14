const axios = require('axios');

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

exports.create = async function (req, res) {
  const post = req.body;
  const { title, description } = post;
  const results = await postController("", "post", {
    title: title,
    body: description
  });
  res.redirect(302, `/topic/${results.value._id}`);
};

exports.update = async function (req, res) {
  const post = req.body;
  const { id, title, description } = post;
  await postController(id, "put", {
    title: title,
    body: description
  });
  res.redirect(302, `/topic/${id}`);
};

exports.delete = async function (req, res) {
  const post = req.body;
  const { id } = post;
  await postController(id, "delete", {});
  res.redirect(302, "/");
};
