module.exports = {
    isOwner: function (req, res) {
        if (req.session.isLogined) {
            return true;            
        } else {
            return false;
        };
    },
    statusUI: function (req, res) {
        let authStatusUI = '<a href="/auth/login">login</a>';
        if (this.isOwner(req, res)) {
            authStatusUI = `${req.session.nickname} | <a href="/auth/logout">logout</a>`
        }
        return authStatusUI;
    }
}