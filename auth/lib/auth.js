const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken')

module.exports = {
    isOwner: function (req, res) {
        let token = req.cookies;
        return Object.keys(token).length !== 0
    },
    statusUI: function (req, res) {
        let authStatusUI = '<a href="/auth/login">login</a>';
        if (this.isOwner(req, res)) {
            let token = req.cookies;
            let decoded = jwt.verify(token.user, secret);
            authStatusUI = `${decoded.nick} | <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    }
}
