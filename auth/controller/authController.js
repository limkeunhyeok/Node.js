// 참고 https://im-developer.tistory.com/167
const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');
const axios = require('axios');
const jwt = require('jsonwebtoken');

exports.login = async function(req, res, next) {
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
            next(new Response(RESPONSE_CODE.SUCCESS, 'password err', null));
        }
        let token = jwt.sign({
            id: data.value[0].id
        }, 'keyboard cat');
        res.cookie('user', token);
        console.log('?????');
        console.log(res.session);
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'success', data));
    } catch (err) {
        next(new Response(RESPONSE_CODE.FAIL, 'fail', err));
    }
}