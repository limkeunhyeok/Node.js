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

async function member(email, method, data) {
  const option = {};
  option.url = `http://localhost:${port}/member/${email}`;
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
    email: "john@mail.com",
    password: "password",
    nick: "john",
  };

  // 회원 전체 조회
  await member("", "get", {});

  // 회원 등록
  await member("", "post", data);

  // 해당 회원 조회
  await member("john@mail.com", "get", {});

  // 해당 회원 삭제
  await member("john@mail.com", "delete", {});
})();
