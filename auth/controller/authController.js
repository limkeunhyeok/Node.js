// 참고 https://im-developer.tistory.com/167
const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');
const axios = require('axios');
const template = require('../lib/template');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

function createToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {
            expiresIn: '7d'
        }, (error, token) => {
            if (error) reject(error);
            resolve(token);
        })
    })
}

exports.login = function (req, res) {
    let title = 'Login';
    let list = template.list(req.list);
    let control = `
        <form action="/auth/loginProcess" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="submit" value="login"></p>
        </form>`;
    let html = template.HTML(title, list, control, '');
    res.send(html);
};

exports.loginProcess = async function(req, res, next) {
    try {
        let url = 'http://localhost:3000/members';
        let {email, password} = req.body;
        let {data} = await axios.get(url, {
            data: {
                email:email
            }
        });
        
        if (!data.value) {
            // 일치하는 이메일이 없을 때
            next(new Response(RESPONSE_CODE.SUCCESS, data.message, null));
        } else if (data.value[0].password !== password) {
            // 해당 이메일과 비밀번호가 일치하지 않을 때
            next(new Response(RESPONSE_CODE.FAIL, 'password err', null));
        }
        let payload = {
            id: data.value[0].id,
            nick: data.value[0].nick
        };
        let token = await createToken(payload);
        res.cookie('user', token);
        console.log('?????');
        console.log(token);
        return res.redirect(302, '/');
    } catch (err) {
        next(new Response(RESPONSE_CODE.FAIL, 'fail', err));
    }
}

exports.logout = function(req, res) {
    res.clearCookie('user');
    return res.redirect(302, '/');
}