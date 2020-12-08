const http = require('http');

var options = {
    host: "localhost",
    port: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
};

function request(cb, params) {
    var req = http.request(options, (res) => {
        var data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log(options, data);
            cb();
        });
    });

    if (params) {
        req.write(JSON.stringify(params));
    }

    req.end();
};

function board(callback) {
    board_post(() => {
        board_get(() => {
            board_update(() => {
                board_get(() => {
                    board_delete(() => {
                        board_get(callback);
                    });
                });
            });
        });
    });

    function board_post(cb) {
        options.method = "POST";
        options.path = "/board";
        request(cb, {
            writer: "LKH",
            post: "test"
        });
    };

    function board_get(cb) {
        options.method = "GET";
        options.path = "/board";
        request(cb);
    };

    function board_update(cb) {
        options.method = "PUT";
        options.path = "/board";
        request(cb, {
            writer: "LKH",
            post: "test good"
        });
    };

    function board_delete(cb) {
        options.method = "DELETE";
        options.path = "/board?writer=LKH";
        request(cb);
    };
};

console.log("============================ start ============================");
board(() => {
    console.log("============================ end ============================");
});