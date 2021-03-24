const axios = require("axios");

const opts = {
  url: "http://localhost:3000/members",
};

function test(option) {
  return new Promise((resolve, reject) => {
    .then((result) => {
        axios(option)
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

async function members(option) {
  try {
    const res = await test(option);
    console.log(
      `------------------------------ ${option.method} ------------------------------`
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

(async function () {
  // 회원 전체 조회
  opts.method = "get";
  await members(opts);

  // 회원 등록
  opts.method = "post";
  opts.data = {
    email: "LKH@mail.com",
    password: "asd123456",
    nick: "LKH",
  };
  await members(opts);

  // 해당 회원 조회
  opts.method = "get";
  opts.data = {
    email: "LKH@mail.com",
  };
  await members(opts);

  // 해당 회원 삭제
  opts.method = "delete";
  opts.data = {
    email: "LKH@mail.com",
  };
  await members(opts);
})();
