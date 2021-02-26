require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const members = require('./routes/index');
const Response = require('./response/response');
const RESPONSE_CODE = require('./response/responseCode');
const log4js = require('log4js');
const log = log4js.getLogger('app');

log4js.configure(__dirname + '/config/logConfig.json');

app.use(helmet());
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use('/', members);
app.use((req, res, next) => {
    let err = new Response(RESPONSE_CODE.SUCCESS, 'Not Found!', null);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    log.error(err);
    res.status(err.status || 500).json(err);
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});