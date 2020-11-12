// socket.io namespace 예제
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ex_index2.html');
});

// Namespace 1번
const nsp1 = io.of('/nsp1');
// connection을 받으면, news 이벤트에 hello 객체를 담아 보낸다
nsp1.on('connection', (socket) => {
    nsp1.emit('news', {
        hello: "Someone connected at nsp1"
    });
});

// Namespace 2번
const nsp2 = io.of('/nsp2');
// connection을 받으면, news 이벤트에 hello 객체를 담아 보낸다
nsp2.on('connection', (socket) => {
    nsp2.emit('news', {
        hello: "Someone connected at nsp2"
    });
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message:', msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Example app listening on port 3000!!');
});