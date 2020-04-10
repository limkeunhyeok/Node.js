const dbHelper = require("../utils/dbHelper");
const Response = require("../models/response");
const RESPONESE_CODE = require("../enum/responseCode");

class ContentsController {
    read(req, res) {
        dbHelper.query("SELECT * FROM my_contents", function(error, results, fields){
            if (error) throw error;
            res.status(200).json((new Response(RESPONESE_CODE.SUCCESS, "Success Read", results).value()));
        });
    };

    update(req, res) {
        if (!req.body.title || !req.body.contents || !req.body.writer){
            res.status(400).json((new Response(RESPONESE_CODE.FAIL, "Update Failed", null).value()));
            return;
        };
        dbHelper.query(`UPDATE my_contents SET Title='${req.body.title}', Contents='${req.body.contents}', Writer='${req.body.writer}', CreateDate=now(), ViewCount=0 WHERE ContentNo = '${req.body.contentNo}'`,
            function(error, results, fields){
                res.status(200).json((new Response(RESPONESE_CODE.SUCCESS, "Success Update", results).value()));
            });
    };

    create(req, res) {
        if (!req.body.title || !req.body.contents || !req.body.writer){
            res.status(400).json((new Response(RESPONESE_CODE.FAIL, "Invalid Parameters", null).value()));
            return;
        };

        dbHelper.query(`INSERT INTO my_contents VALUES ('${req.body.contentNo}', '${req.body.title}', '${req.body.contents}', '${req.body.writer}', now(), 0)`, 
            function(error, results, fields){
                if(error) {
                    res.status(500).json((new Response(RESPONESE_CODE.FAIL, "DB Operation Failure", null).value()));
                    console.log(error);
                    return;
                };
                res.status(200).json((new Response(RESPONESE_CODE.SUCCESS, "Success Create", results).value()));
            });
    };

    delete(req, res) {
        if (!req.body.contentNo) {
            res.status(400).json((new Response(RESPONESE_CODE.FAIL, "Delete Failed", null).value()));
            return;
        };
        dbHelper.query(`DELETE FROM my_contents WHERE contentNo='${req.body.contentNo}'`, function(error, results, fields){
            res.status(200).json((new Response(RESPONESE_CODE.SUCCESS, "Success Delete", results).value()));
        });
    };
};

module.exports = new ContentsController();