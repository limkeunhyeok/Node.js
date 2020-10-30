const express = require('express');
const router = express.Router();
const getConnection = require('../utils/db');

router.get('/', (req, res, next) => {
    var response = {
        key: req.body.key,
        errorcode: 0,
        errormessage: "success"
    };

    if (req.query.userid == null) {
        response.errorcode = 1;
        response.errormessage = "Invalid Parameters";
        res.status(200).end(JSON.stringify(response));
    } else {
        getConnection((conn) => {
            conn.query("select id, goodsid, date from purchases where userid = (?);"
                , [req.query.userid]
                , (error, results, fields) => {
                    if (error) {
                        response.errorcode = 1;
                        response.errormessage = error;
                    } else {
                        response.results = results;
                    }
                    res.status(200).end(JSON.stringify(response));
                });
            conn.release();
        });
    }
});

router.post('/', (req, res, next) => {
    var response = {
        key: req.body.key,
        errorcode: 0,
        errormessage: "success"
    };
    if (req.body.userid == null || req.body.goodsid == null) {
        response.errorcode = 1;
        response.errormessage = "Invalid Parameters";
        res.status(200).end(JSON.stringify(response));
    } else {
        getConnection((conn) => {
            conn.query("insert into purchases(userid, goodsid) values(? ,? )"
                , [req.body.userid, req.body.goodsid]
                , (error, results, fields) => {
                    if (error) {
                        response.errorcode = 1;
                        response.errormessage = error;                    
                    } 
                    res.status(200).end(JSON.stringify(response));
                });
            conn.release();
        });
    }
});

module.exports = router;