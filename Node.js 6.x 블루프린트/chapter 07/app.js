const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const app = express();
const http = require('http').Server(app);
const env = process.env.NODE_ENV || 'development';

app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
    });
});

module.exports = app;

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + server.address().port);
});

const io = require('socket.io')(http);
let userList = [];
let connections = [];

io.on('connection', (socket) => {
    connections.push(socket);
    console.log('Connected:', connections.length);

    socket.on('disconnect', (data) => {
        if (socket.username) {
            userList.splice(userList.indexOf(socket.username), 1);
            updateUsernames();
        }

        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected:', connections.length);
    });

    socket.on('send message', (data) => {
        io.emit('new message', {
            msg: data,
            user: socket.username
        });
    });

    socket.on('new user', (data, callback) => {
        callback(!!data);
        socket.username = data;
        userList.push(socket.username);
        updateUsernames();
    });

    function updateUsernames() {
        io.emit('get userList', userList);
    };
})