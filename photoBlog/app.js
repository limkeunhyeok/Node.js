const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const log4js = require('log4js');
const favicon = require('serve-favicon')
const contentsRouter = require('./routes/contentsRouter');
const app = express();
log4js.configure(__dirname + '/config/log_config.json');
const log = log4js.getLogger('app');

app.use(helmet());

app.use(compression());

app.use(log4js.connectLogger(log4js.getLogger('http'), { level: "auto" }));

app.use('/images', express.static(__dirname + '/public/images'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/public/static'));

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views/page'),
    path.join(__dirname, 'views/partials')
]);

app.set('layout', 'layout');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/contents', contentsRouter);

app.use((req, res, next) => {
    if(!(res.headersSent)) {
        let err = new Error('Not Found!');
        err.status = 404;
        next(err);
    };
});

app.use((err, req, res, next) => {
    log.error("Something went wrong: ", err);
    res.status(err.status || 500);
    res.render('error', {err: err});
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});