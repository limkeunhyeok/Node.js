const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const sanitize = require('sanitize-html');
const template = require('./lib/template');

const app = http.createServer((req, res) => {
    let _url = req.url;
    let queryData = url.parse(_url, true).query;
    let pathName = url.parse(_url, true).pathname;
    
    if(pathName === '/') {
        if(queryData.id === undefined) {
            fs.readdir('./data', (err, files) => {
                let title = 'Welcome';
                let description = 'Hello, Node.js';
                let filelist = template.List(files);
                let control = `<a href="/create">create</a>`;
                let body = `<h2>${title}</h2>${description}`;
                res.writeHead(200);
                res.end(template.HTML(title, body, filelist, control));
            });
        } else {
            fs.readdir('./data', (err, files) => {
                let filteredId = path.parse(queryData.id).base;
                fs.readFile(`./data/${filteredId}`, 'utf8', (err, data) => {
                    let title = queryData.id;
                    let sanitizedTitle = sanitize(title);
                    let sanitizedDescription = sanitize(data, {
                        allowedTags: ['h1']
                    });
                    let filelist = template.List(files);
                    let control = `
                        <a href="/create">create</a>
                        <a href="/update?id=${sanitizedTitle}">update</a>
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${sanitizedTitle}">
                            <input type="submit" value="delete">
                        </form>
                        `;
                    let body = `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`;
                    res.writeHead(200);
                    res.end(template.HTML(sanitizedTitle, body, filelist, control));    
                });
            });
        };
    } else if(pathName === '/create') {
        fs.readdir('./data', (err, files) => {
            let filelist = template.List(files);
            let title = 'WEB - create';
            let postBody = template.FORM('', '', 'create', '');
            res.writeHead(200);
            res.end(template.HTML(title, postBody, filelist, ''));
        })
    } else if(pathName === '/create_process') {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            let post = qs.parse(body);
            let title = post.title;
            let description = post.description;
            fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
                res.writeHead(302, {Location: `/?id=${title}`});
                res.end();        
            })
        });
    } else if(pathName === '/update') {
        fs.readdir('./data', (err, files) => {
            let filelist = template.List(files);
            let title = 'WEB - update';
            let filteredId = path.parse(queryData.id).base;
            let hidden = `<input type="hidden" name="id" value="${filteredId}">`
            fs.readFile(`./data/${filteredId}`, 'utf8', (err, data) => {
                let postBody = template.FORM(filteredId, data, 'update', hidden);
                res.writeHead(200);
                res.end(template.HTML(title, postBody, filelist, ''));
            });
        });
    } else if(pathName === '/update_process') {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            let post = qs.parse(body);
            let id = post.id;
            let title = post.title;
            let description = post.description;
            fs.rename(`./data/${id}`, `./data/${title}`, (err) => {
                fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
                    res.writeHead(302, {Location: `/?id=${title}`});
                    res.end();        
                });
            });
        });
    } else if(pathName === '/delete_process') {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            let post = qs.parse(body);
            let id = post.id;
            let filteredId = path.parse(id).base;
            fs.unlink(`./data/${filteredId}`, (err) => {
                res.writeHead(302, {Location: '/'});
                res.end();
            });
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    };  
});
app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});