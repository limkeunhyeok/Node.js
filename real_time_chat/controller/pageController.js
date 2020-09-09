const path = require("path");

function PageController() {};

PageController.prototype.show = function(req, res, next) {
    let filteredId = path.parse(req.params.pageId).base;
    let pageName = filteredId + '.ejs';

    if (req.list.indexOf(pageName) !== -1) {
        res.render(pageName);
        return;
    } else {
        let err = new Error("Not Found!");
        err.status = 404;
        next(err);
    };
}

module.exports = new PageController();