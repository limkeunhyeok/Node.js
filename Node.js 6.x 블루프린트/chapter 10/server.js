const express = require('express');
const path = require('path');
const logger = require('morgan');
const compression = require('compression');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const swig = require('swig');

dotenv.load();

const home = require('./controllers/home');
const user = require('./controllers/user');

require('./config/passport');

const app = express();

mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', () => {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views/pages'));

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride('_method'));
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', home.index);
app.get('/account', user.ensureAuthenticated, user.accountGet);
app.put('/account', user.ensureAuthenticated, user.accountPut);
app.delete('/account', user.ensureAuthenticated, user.accountDelete);
app.get('/signup', user.signupGet);
app.post('/signup', user.signupPost);
app.get('/login', user.loginGet);
app.post('/login', user.loginPost);
app.get('/logout', user.logout);

if (app.get('env') === 'production') {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.sendStatus(err.status || 500);
    });
}

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;