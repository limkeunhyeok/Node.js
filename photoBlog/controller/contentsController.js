const fs = require('fs');
const multer = require('multer');
const RESPONSE_CODE = require('../response/responseCode');
const Response = require('../response/response');


class ContentsController {
    constructor () {
        this.storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, 'public/images/gallery/');
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            }
        });
        this.upload = multer({ storage: this.storage });
    };
    
    getImageList (req, res, next) {
        fs.readdir('public/images/gallery', (err, files) => {
            if (err) {
                err.status = 500;
                next(err);
            } else {
                res.status(200).json((new Response(RESPONSE_CODE.SUCCESS, "Success!", files)).value());
                return files
            };
        });
    }; 
};

module.exports = new ContentsController();