const axios = require("axios");

const opts = {
  url: "",
  method: "",
  data: {},
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

async function auth(option) {
  console.log(
    `------------------------------ ${option.method} ------------------------------`
  );
  try {
    const res = await test(option);
    console.log(res.status, res.statusText);
  } catch (error) {
    console.log(error.response.data);
  }
}

(async function () {
  // 로그인
  opts.url = "http://localhost:3010/auth/login";
  opts.method = "post";
  opts.data = {
    email: "test@mail.com",
    password: "testPassword",
  };
  await auth(opts);

  // logiut
  opts.url = "http://localhost:3010/auth/logout";
  opts.method = "get";
  await auth(opts);
})();
