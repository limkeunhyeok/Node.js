const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');
const pool = require('../utils/pool');
const query = require('../utils/query');

async function getEmailInfo(req, res, next) {
    let { email } = req.body;
    try {
        let lows;
        if (email === '@') {
            rows = await pool.query(query.getMembersList);
        } else {
            rows = await pool.query(query.getEmailInfo, [email]);
        }
        return rows[0]
    } catch (err) {
        next(new Response(RESPONSE_CODE.FAIL, 'DB Error!', err));
    }
}

// exports.getMembersList = async function(req, res, next) {
//     try {
//         let rows = await pool.query(query.getMembersList);
//         return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Search successfully!', rows[0]));
//     } catch (err) {
//         next(new Response(RESPONSE_CODE.FAIL, 'DB Error!', err));
//     }
// }

exports.register = async function(req, res, next) {
    let { email, password, nick } = req.body;
    try {
        let rows = await getEmailInfo(req, res, next);
        if (!rows.length) {
            await pool.query(query.register, [email, password, nick]);
            return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Successfully register!', null));
        }
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Email already registered.', null));
    } catch (err) {
        next(new Response(RESPONSE_CODE.FAIL, 'DB Error!', err));
    }
}


exports.inquiry = async function(req, res, next) {
    try {
        let { email } = req.body;
        let rows = await getEmailInfo(req, res, next);
        if (email === '@') {
            return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Search successfully!', rows));
        } else if (rows.length) {
            return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Inquiry sent successfully!', rows));
        }
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Unregistered email', null))
    } catch (err) {
        next(new Response(RESPONSE_CODE.FAIL, 'DB Error!', err));
    }
}

exports.unregister = async function(req, res, next) {
    let { email } = req.body;
    try {
        let rows = await getEmailInfo(req, res, next);
        if (rows.length) {
            await pool.query(query.unregister, [email]);
            return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Successfully unregister!', null));
        }
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Unregistered email', null));
    } catch (err) {
        next(new Response(RESPONSE_CODE.FAIL, 'DB Error!', err));
    }
}