const axios = require("axios");

const opts = {
  url: "http://localhost:3000/post",
};

const data = {
  title: 'Test',
  body: 'Test is ...'
};

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

async function post(option, method, data) {
  option.method = method;
  option.data = data;
  console.log(
    `------------------------------ ${option.method} ------------------------------`
  );
  try {
    const res = await test(option);
    console.log(res.data);
  } catch (error) {
    console.log(error.response.data);
  }
}

(async function () {
  // 게시글 조회
  await post(opts, 'get', {});

  // 게시글 등록
  await post(opts, 'post', data);
  
  // 게시글 조회
  await post(opts, 'get', {});

  // 게시글 수정
  data.body = 'Test is good';
  await post(opts, 'put', data);

  // 게시글 조회
  await post(opts, 'get', {});

  // 게시글 삭제
  await post(opts, 'delete', data);

  // 게시글 조회
  await post(opts, 'get', {});
})();