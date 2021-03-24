const fs = require('fs');

exports.create = function(req, res) {
    let post = req.body;
    let title = post.title;
    let description = post.description;
    fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
        res.redirect(302, `/topic/${title}`);
    });
}

exports.update = function(req, res) {
    let post = req.body;
    let id = post.id;
    let title = post.title;
    let description = post.description;
    fs.rename(`./data/${id}`, `./data/${title}`, (error) => {
        fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
            res.redirect(302, `/topic/${title}`);
        });
    });
}

exports.delete = function(req, res) {
    let post = req.body;
    let id = post.id;
    fs.unlink(`./data/${id}`, (err) => {
        res.redirect(302, '/');
    })
}