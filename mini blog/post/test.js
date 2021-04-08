const axios = require("axios");

const opts = {
  url: "http://localhost:3000/post",
};

function test(option) {
  return new Promise((resolve, reject) => {
    axios(option)
      .then((result) => {
        axios(option);
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function post(option) {
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
  opts.method = "get";
  await post(opts);

  // 게시글 등록
  opts.method = "post";
  opts.data = {
    title: 'Test',
    body: 'Test is ...'
  };
  await post(opts);

  // 게시글 조회
  opts.method = "get";
  await post(opts);

  // 게시글 수정
  opts.method = "put";
  opts.data = {
    title: 'Test',
    body: 'Test is good'
  };
  await post(opts);

  // 게시글 조회
  opts.method = "get";
  await post(opts);

  // 게시글 삭제
  opts.method = "delete";
  opts.data = {
    title: 'Test',
    body: 'Test is good'
  };
  await post(opts);

  // 게시글 조회
  opts.method = "get";
  await post(opts);
})();