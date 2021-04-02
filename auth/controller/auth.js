// 참고 https://im-developer.tistory.com/167
const axios = require("axios");

const Response = require("../response/response");
const RESPONSE_CODE = require("../response/responseCode");
const template = require("../lib/template");

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
    const url = "http://localhost:3000/login";
    const { email, password } = req.body;
    const { data } = await axios.post(url, {
        email,
        password
    });
    res.cookie("user", data.value.token);
    return res.redirect(302, "/");
  } catch (err) {
    return next(new Response(RESPONSE_CODE.FAIL, "fail", err));
  }
};

exports.logout = function (req, res) {
  res.clearCookie("user");
  return res.redirect(302, "/");
};
