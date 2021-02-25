const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');
const pool = require('../utils/pool');
const query = require('../utils/query');

async function getEmailInfo(req, res) {
    let { email } = req.body;
    try {
        let rows = await pool.query(query.getEmailInfo, [email]);
        return rows[0]
    } catch (err) {
        return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'DB Error!', err));
    }
}

exports.getMembersList = async function(req, res) {
    try {
        let rows = await pool.query(query.getMembersList);
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Search successfully!', rows[0]));
    } catch (err) {
        return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'DB Error!', err));
    }
}

exports.register = async function(req, res) {
    let { email, password, nick } = req.body;
    try {
        let rows = await getEmailInfo(req, res);
        if (!rows.length) {
            await pool.query(query.register, [email, password, nick]);
            return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Successfully register!', null));
        }
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Email already registered.', null));
    } catch (err) {
        return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'DB Error!', err));
    }
}


exports.inquiry = async function(req, res) {
    try {
        let rows = await getEmailInfo(req, res);
        if (rows.length) {
            return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Inquiry sent successfully!', rows));
        }
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Unregistered email', null))
    } catch (err) {
        return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'DB Error!', err));
    }
}

exports.unregister = async function(req, res) {
    let { email } = req.body;
    try {
        let rows = await getEmailInfo(req, res);
        if (rows.length) {
            await pool.query(query.unregister, [email]);
            return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Successfully unregister!', null));
        }
        return res.status(200).json(new Response(RESPONSE_CODE.SUCCESS, 'Unregistered email', null));
    } catch (err) {
        return res.status(500).json(new Response(RESPONSE_CODE.FAIL, 'DB Error!', err));
    }
}