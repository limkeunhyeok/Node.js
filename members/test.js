const { json } = require('body-parser');
const http = require('http');

var opts = {
    host: 'localhost',
    port: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
};

function request(params, callback) {
    var req = http.request(opts, (res) => {
        var data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', (chunk) => {
            console.log(opts);
            console.log(JSON.parse(data));
            callback();
        });
    });

    if (params) {
        req.write(JSON.stringify(params));
    }

    req.end();
}

function members(callback) {
    getMembersList(() => {
        register(() => {
            inquiry(() => {
                getMembersList(() => {
                    unregister(() => {
                        getMembersList(callback);
                    });
                });
            });
        });
    });

    function getMembersList(cb) {
        opts.method = 'GET';
        opts.path = '/members';
        request(null, cb);
        console.log('---------- membersList ----------');
    }

    function register(cb) {
        opts.method = 'POST';
        opts.path = '/register';
        request({
            email: 'LKH@mail.com',
            password: 'asd123456',
            nick: 'LKH'
        }, cb);
        console.log('---------- register ----------');
    }

    function inquiry(cb) {
        opts.method = 'POST';
        opts.path = '/inquiry';
        request({
            email: 'LKH@mail.com'
        }, cb);
        console.log('---------- inquiry ----------');
    }

    function unregister(cb) {
        opts.method = 'POST';
        opts.path = '/unregister';
        request({
            email: 'LKH@mail.com'
        }, cb);
        console.log('---------- unregister ----------');
    }
}

console.log('========== start ==========');
members(() => {
    console.log('========== end ==========');
});