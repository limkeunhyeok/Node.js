const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

module.exports = {
  isOwner(req, res) {
    const token = req.cookies;
    return Object.keys(token).length !== 0;
  },
  statusUI(req, res) {
    let authStatusUI = '<a href="/auth/login">login</a>';
    if (this.isOwner(req, res)) {
      const token = req.cookies;
      const decoded = jwt.verify(token.user, secret);
      authStatusUI = `${decoded.nick} | <a href="/auth/logout">logout</a>`;
    }
    return authStatusUI;
  },
};
