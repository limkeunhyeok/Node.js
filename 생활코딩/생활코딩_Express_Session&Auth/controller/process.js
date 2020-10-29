const fs = require('fs');
const auth = require('../lib/auth');
const { response } = require('express');

class Process {
    create (req, res) {
        if (!auth.isOwner(req, res)) {
            res.redirect('/');
            return false;
        };
        let post = req.body;
        let title = post.title;
        let description = post.description;
        fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
            res.redirect(302, `/topic/${title}`);
        });
    };

    update (req, res) {
        if (!auth.isOwner(req, res)) {
            res.redirect('/');
            return false;
        };
        let post = req.body;
        let id = post.id;
        let title = post.title;
        let description = post.description;
        fs.rename(`./data/${id}`, `./data/${title}`, (error) => {
            fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
                res.redirect(302, `/topic/${title}`);
            });
        });
    };

    delete (req, res) {
        if (!auth.isOwner(req, res)) {
            res.redirect('/');
            return false;
        };
        let post = req.body;
        let id = post.id;
        fs.unlink(`./data/${id}`, (err) => {
            res.redirect(302, '/');
        });
    };
};

module.exports = new Process();