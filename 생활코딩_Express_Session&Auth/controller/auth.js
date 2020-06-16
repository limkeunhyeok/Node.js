const template = require('../lib/template');
const { response } = require('express');

const authData = {
    email: 'asd@email.com',
    password: '1111',
    nickname: 'LKH'
};

class Auth {
    login(req, res) {
        let title = 'Login';
        let list = template.list(req.list);
        let control = `
            <form action="/auth/login_process" method="post">
                <p><input type="text" name="email" placeholder="email"></p>
                <p><input type="password" name="password" placeholder="password"></p>
                <p><input type="submit" value="login"></p>
            </form>`;
        let html = template.HTML(title, list, control, '');
        res.send(html);
    };

    login_process(req, res) {
        let post = req.body;
        let email = post.email;
        let password = post.password;
        if (email === authData.email && password === authData.password) {
            req.session.isLogined = true;
            req.session.nickname = authData.nickname;
            req.session.save(() => {
                res.redirect(302, '/');
            });
        } else {
            res.send('Who?');
        };
    };

    logout(req, res) {
        req.session.destroy((err) => {
            res.redirect(302, '/');
        });
    };
};

module.exports = new Auth();