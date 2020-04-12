const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const apiRouter = require('./routes/apiRouter');
const app = express();
log4js.configure(__dirname + '/config/log_config.json');

const log = log4js.getLogger('app');

app.use(helmet());

app.use(log4js.connectLogger(log4js.getLogger('http'), {level: "auto"}));

app.use('/js', express.static(__dirname + '/node_modules/bootstarp/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});
app.use('/api', apiRouter);

app.use((req, res, next) => {
    if (!res.headersSent) {
        let err = new Error('Not Found');
        err.status = 404;
        // res.status(404).send('Sorry cant find that!');
        next(err);
    }
});

app.use((err, req, res, next) => {
    log.error("Something went wrong:", err);
    res.status(err.status || 500);
    res.render('error', {err: err})
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!!');
});