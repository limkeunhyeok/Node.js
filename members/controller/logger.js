const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');

const MyLogger = function(name) {
    this.name = name;
    this.log = require('log4js').getLogger(this.name);
}

MyLogger.prototype.debugging = function(req, res, next) {
    let url = req.url;
    let msg = '';

    switch (url) {
        case '/members':
            msg = 'getMembersList';
            break;
        case '/register':
            msg = 'register';
            break;
        case '/inquiry':
            msg = 'inquiry';
            break;
        case '/unregister':
            msg = 'unregister';
            break;
        default:
            let err = new Response(RESPONSE_CODE.SUCCESS, 'Not Found!', null);
            err.status = 404;
            next(err);
            return;
    }
    this.log.debug(msg);
    next();
}

module.exports = MyLogger;