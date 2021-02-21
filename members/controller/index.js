const dbHelper = require('../model/dbHelper');
const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');

exports.register = function(req, res) {
    if (req.body.email === null || req.body.password === null) {
        return res.send(new Response(RESPONSE_CODE.FAIL, 'Invalid parameters', null));
    }
    dbHelper.query(
        `INSERT INTO members (email, password, nick) values ('${req.body.email}', '${req.body.password}', '${req.body.nick}')`,
        function(error, results, fields) {
            if (error) {
                return res.send(new Response(RESPONSE_CODE.FAIL, 'DB Error', error));
            }
            return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Successfully register!', null));
        }
    );
}

exports.inquiry = function(req, res) {
    if (req.query.email === null) {
        return res.send(new Response(RESPONSE_CODE.FAIL, 'Invalid email', null));
    }
    dbHelper.query(
        `SELECT id, password FROM members WHERE email='${req.query.email}'`,
        function(error, results, fields) {
            if (error) {
                return res.send(new Response(RESPONSE_CODE.FAIL, 'DB Error', error));
            }
            return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Inquiry sent successfully!', results));
        }
    );
}

exports.unregister = function(req, res) {
    if (req.query.email === null) {
        return res.send(new Response(RESPONSE_CODE.FAIL, 'Invalid email', null));
    }
    dbHelper.query(
        `DELETE FROM members WHERE email = '${req.query.email}'`,
        function(error, results, fields) {
            if (error) {
                return res.send(new Response(RESPONSE_CODE.FAIL, 'DB Error', error));
            }
            return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Successfully unregister!', null));
        }
    );
}