const express = require('express');
const router = express.Router();
const getConnection = require('../utils/db');

router.get('/', (req, res, next) => {
    var response = {
        key: req.body.key,
        errorcode: 0,
        errormessage: "success"
    };
    if (req.query.username == null || req.query.password == null) {
        response.errorcode = 1;
        response.errormessage = "Invalid Parameters";
        res.status(200).end(JSON.stringify(response));
    } else {
        getConnection((conn) => {
            conn.query("select id from members where username = (?) and password = (?);"
                , [req.query.username, req.query.password]
                , (error, results, fields) => {
                    if (error || results.length == 0) {
                        response.errorcode = 1;
                        response.errormessage = error ? error : "invalid password";
                    } else {
                        response.userid = results[0].id;
                    }
                    res.status(200).end(JSON.stringify(response));
                });
            conn.release();
        });
    }
})

router.post('/', (req, res, next) => {
    var response = {
        key: req.body.key,
        errorcode: 0,
        errormessage: "success"
    };
    if (req.body.username == null || req.body.password == null) {
        response.errorcode = 1;
        response.errormessage = "Invalid Parameters";
        res.status(200).end(JSON.stringify(response));
    } else {
        getConnection((conn) => {
            conn.query("insert into members(username, password) values(?, ?);"
                , [req.body.username, req.body.password]
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

router.delete('/', (req, res, next) => {
    var response = {
        key: req.body.key,
        errorcode: 0,
        errormessage: "success"
    };
    if (req.query.username == null) {
        response.errorcode = 1;
        response.errormessage = "Invalid Parameters";
        res.status(200).end(JSON.stringify(response));
    } else {
        getConnection((conn) => {0
            conn.query("delete from  members where username = (?);"
                , [req.query.username]
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