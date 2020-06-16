module.exports = {
    HTML: (title, list, control, body, authStatusUI = '<a href="/auth/login">login</a>') => {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>WEB3 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    ${authStatusUI}
                    <h1><a href="/">WEB<a></h1>
                    ${list}
                    ${control}
                    ${body}
                </body>
            </html>
            `
    },
    list: (files) => {
        let list = '<ul>';
        for(var i = 0; i < files.length; i++) {
            list += `<li><a href="/topic/${files[i]}">${files[i]}</a></li>`;
        };
        list += '</ul>';
        return list;
    },
    form: (action, hidden, value, description) => {
        return `
        <form action="/topic/${action}_process" method="post">
            ${hidden}
            <p><input type="text" name="title" placeholder="title" ${value}></p>
            <p><textarea name="description" placeholder="description">${description}</textarea></p>
            <p><input type="submit"></p>
        </form>`
    }
}