const dbHelper = require('../model/dbHelper');
const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');

function emailCheck(req, res, callback) {
    dbHelper.query(
        `SELECT * FROM members WHERE email = '${req.body.email}'`,
        function(error, results, fields) {
            if (error) {
                return res.send(new Response(RESPONSE_CODE.FAIL, 'DB Error', error));
            }
            return callback(results)
        }
    )
}

exports.list = function(req, res) {
    dbHelper.query(
        `SELECT * FROM members`,
        function(error, results, fields) {
            if (error) {
                return res.send(new Response(RESPONSE_CODE.FAIL, 'DB error', error));
            }
            return res.send(new Response(RESPONSE_CODE, 'Search successfully!', results));
        }
    );
}

exports.register = function(req, res) {
    emailCheck(req, res, function(results) {
        if (!results.length) {
            dbHelper.query(
                `INSERT INTO members (email, password, nick) values ('${req.body.email}', '${req.body.password}', '${req.body.nick}')`,
                function(error, results, fields) {
                    if (error) {
                        return res.send(new Response(RESPONSE_CODE.FAIL, 'DB Error', error));
                    }
                    return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Successfully register!', null));
                }
            );
        } else {
            return res.send(new Response(RESPONSE_CODE.FAIL, 'Email already registered.', null))
        }
    });
}

exports.inquiry = function(req, res) {
    emailCheck(req, res, function(results) {
        if (results.length) {
            return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Inquiry sent successfully!', results));
        } else {
            return res.send(new Response(RESPONSE_CODE.FAIL, 'Unregistered email', null))
        }
    });
}

exports.unregister = function(req, res) {
    emailCheck(req, res, function(results) {
        if (results.length) {
            dbHelper.query(
                `DELETE FROM members WHERE email = '${req.query.email}'`,
                function(error, results, fields) {
                    if (error) {
                        return res.send(new Response(RESPONSE_CODE.FAIL, 'DB Error', error));
                    }
                    return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Successfully unregister!', null));
                }
            );
        } else {
            return res.send(new Response(RESPONSE_CODE.FAIL, 'Unregistered email', null))        
        }
    });
}