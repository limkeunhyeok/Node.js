const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swig = require('swig');

const index = require('./controllers/index');
const bands = require('./controllers/band');
const users = require('./controllers/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));

const swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.show);
app.get('/bands', bands.list);
app.get('/band/:id', bands.byId);
app.post('/bands', bands.create);
app.put('/bands/:id', bands.update);
app.delete('/band/:id', bands.delete);
app.get('/users', users.list);
app.post('/users', users.create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
