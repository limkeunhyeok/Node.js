const path = require('path');
const fs = require('fs');
const sanitizeHTML = require('sanitize-html');
const template = require('../lib/template');
const auth = require('../lib/auth');

exports.index = function(req, res) {
    let title = 'Welcome';
    let list = template.list(req.list);
    let control = `<a href="/topic/create">create</a>`;
    let body = `
        <h2>${title}</h2> Hello, Node.js
        <img src="/images/hello.jpeg" style="width:300px; display:block; margin-top:10px;">`;
    let html = template.HTML(title, list, control, body, auth.statusUI(req, res));
    res.send(html);
}

exports.create = function(req, res) {
    let title = 'WEB - Create';
    let list = template.list(req.list);
    let control = '';
    let body = template.form('create', '', '', '');
    let html = template.HTML(title, list, control, body);
    res.send(html);
}

exports.update = function(req, res) {
    let filteredId = path.parse(req.params.updateId).base;
    fs.readFile(`./data/${filteredId}`, 'utf8', (err, description) => {
        let title = req.params.updateId;
        let list = template.list(req.list);
        let control = '';
        let hidden = `<input type="hidden" name="id" value="${title}">`
        let body = template.form('update', hidden, `value="${title}"`, description);
        let html = template.HTML(title, list, control, body);
        res.send(html);
    });
}

exports.dataPage = function(req, res, next) {
    let filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`./data/${filteredId}`, 'utf8', (err, description) => {
        if(err) {
            next(err);
        } else {
            let title = req.params.pageId;
            let sanitizedTitle = sanitizeHTML(title);
            let sanitizedDescription = sanitizeHTML(description, {
                allowedTags: ['h1']
            });
            let list = template.list(req.list);
            let control = `
                <a href="/topic/create">create</a>
                <a href="/topic/update/${sanitizedTitle}">update</a>
                <form action="/topic/delete_process" method="post">
                    <input type="hidden" name="id" value="${sanitizedTitle}">
                    <input type="submit" value="delete">
                </form>`;
            let body = `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`;
            let html = template.HTML(sanitizedTitle, list, control, body);
            res.send(html);
        };
    });
}