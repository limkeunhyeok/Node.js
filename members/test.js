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

// Postman으로 get 또는 delete 메서드로 요청을 보낼 때,
// req.body에 json 데이터를 함께 보내는 것이 가능하나
// 여기선 왜인지 안됨. 이유는 모름
function members(callback) {
    getMembersList(() => {
        register(() => {
            inquiry(() => {
                unregister(callback);
            })
        })
    })

    function getMembersList(cb) {
        opts.method = 'GET';
        opts.path = '/members';
        request(null, cb);
        console.log('---------- membersList ----------');
    }

    function register(cb) {
        opts.method = 'POST';
        opts.path = '/members';
        request({
            email: 'LKH@mail.com',
            password: 'asd123456',
            nick: 'LKH'
        }, cb);
        console.log('---------- register ----------');
    }

    function inquiry(cb) {
        opts.method = 'GET';
        opts.path = '/members';
        request({
            email: 'LKH@mail.com'
        }, cb);
        console.log('---------- inquiry ----------');
    }

    function unregister(cb) {
        opts.method = 'DELETE';
        opts.path = '/members';
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