const secret = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

module.exports = {
  isOwner(req, res) {
    if (req.user) {
      return true;
    }
    return false;
  },
  statusUI(req, res) {
    let authStatusUI =
      '<a href="/login">login</a> | <a href="/signup">sign up</a>';
    if (this.isOwner(req, res)) {
      const token = req.user;
      const decoded = jwt.verify(token, secret);
      authStatusUI = `${decoded.nick} | <a href="/auth/logout">logout</a>`;
    }
    return authStatusUI;
  },
};
