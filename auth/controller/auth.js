// 참고 https://im-developer.tistory.com/167
const axios = require("axios");

const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

const Response = require("../response/response");
const RESPONSE_CODE = require("../response/responseCode");
const template = require("../lib/template");

function createToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: "7d",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}

exports.loginPage = function (req, res) {
  const title = "Login";
  const list = template.list(req.list);
  const control = `
        <form action="/auth/login" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="submit" value="login"></p>
        </form>`;
  const html = template.HTML(title, list, control, "");
  res.send(html);
};

exports.loginProcess = async function (req, res, next) {
  try {
    const url = "http://localhost:3000/members";
    const { email, password } = req.body;
    const { data } = await axios.get(url, {
      data: {
        email,
      },
    });

    if (!data.value) {
      return next(new Response(RESPONSE_CODE.SUCCESS, data.message, null));
    }
    if (data.value[0].password !== password) {
      return next(new Response(RESPONSE_CODE.FAIL, "password err", null));
    }
    const payload = {
      id: data.value[0].id,
      nick: data.value[0].nick,
    };
    const token = await createToken(payload);
    res.cookie("user", token);
    return res.redirect(302, "/");
  } catch (err) {
    return next(new Response(RESPONSE_CODE.FAIL, "fail", err));
  }
};

exports.logout = function (req, res) {
  res.clearCookie("user");
  return res.redirect(302, "/");
};
