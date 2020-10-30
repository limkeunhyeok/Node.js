const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const getConnection = require('../utils/db');

router.get('/', (req, res, next) => {
    var response = {
        key: req.body.key,
        errorcode: 0,
        errormessage: "success"
    };
    getConnection((conn) => {
        conn.query("select * from goods;", (error, results, fields) => {
            if (error || results.length == 0) {
                response.errorcode = 1;
                response.errormessage = error ? error : "no data";
            } else {
                response.results = results;
            }
            res.status(200).end(JSON.stringify(response));
        });
        conn.release();
    });
});

router.post('/', (req, res, next) => {
    var response = {
        key: req.body.key,
        errorcode: 0,
        errormessage: "success"
    };
    if (req.body.name == null || req.body.category == null || req.body.price == null || req.body.description == null) {
        response.errorcode = 1;
        response.errormessage = "Invalid Parameters";
        res.status(200).end(JSON.stringify(response));
    } else {
        getConnection((conn) => {
            conn.query("insert into goods(name, category, price, description) values(?, ?, ?, ?);"
                , [req.body.name, req.body.category, req.body.price, req.body.description]
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
    if (req.query.id == null) {
        response.errorcode = 1;
        response.errormessage = "Invalid Parameters";
        res.status(200).end(JSON.stringify(response));
    } else {
        getConnection((conn) => {
            conn.query("delete from goods where id = ?"
                , [req.body.id]
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
})

module.exports = router;