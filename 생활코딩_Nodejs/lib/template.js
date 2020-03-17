const template = {
    HTML: (title, body, list, control) => {
        return `
            <!doctype html>
            <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                ${control}
                ${body}
                </body>
            </html>
        `
    },
    FORM: (postTitle, postDescription, action, hidden) => {
        return `
        <form action="/${action}_process" method="POST">
            ${hidden}
            <p><input type="text" name="title" placeholder="title" value="${postTitle}"></p>
            <p><textarea name="description" cols="30" rows="10" placeholder="description">${postDescription}</textarea></p>
            <p><input type="submit"></p>
        </form>
        `
    },
    List: (files) => {
        let list = '<ul>';
        let i = 0;
        while(i < files.length) {
            list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
            i += 1;
        };
        list += '</ul>';
        return list;
    }
}

module.exports = template;