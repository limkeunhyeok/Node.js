// 참고 https://im-developer.tistory.com/167
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
