/* eslint-disable no-underscore-dangle */
require("dotenv").config();

const axios = require("axios");

const port = process.env.PORT;

function test(option) {
  return new Promise((resolve, reject) => {
    axios(option)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function post(postId, method, data) {
  const option = {};
  option.url = `http://localhost:${port}/post/${postId}`;
  option.method = method;
  option.data = data;
  console.log(
    `------------------------------ ${option.method} ------------------------------`
  );
  try {
    const res = await test(option);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
}

(async function () {
  const data = {
    title: "Test",
    body: "Test is ...",
  };

  // 게시글 조회
  await post("", "get", {});

  // 게시글 등록
  const result = await post("", "post", data);
  const postId = result.value._id;

  // 게시글 조회
  await post(postId, "get", {});

  // 게시글 수정
  data.body = "Test is good";
  await post(postId, "put", data);

  // 게시글 삭제
  await post(postId, "delete", data);

  // 게시글 조회
  await post("", "get", {});
})();
