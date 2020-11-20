const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const index = require('./routes/index');
const users = require('./routes/users');
const comments = require('./controller/comments');
const app = express();

app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

const config = require('./config/config');
mongoose.connect(config.url, {useNewUrlParser: true,  useUnifiedTopology: true});
mongoose.connection.on('error', () => {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

require('./config/passport')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'sometextgohere',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
        url: config.url,
        collection: 'session'
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/users', users);
app.get('/comments', comments.hasAuthorization, comments.list);
app.post('/comments', comments.hasAuthorization, comments.create);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err)
});

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

let server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port', server.address().port);
});
